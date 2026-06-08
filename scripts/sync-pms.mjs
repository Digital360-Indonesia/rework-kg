/**
 * Sync PocketBase PMS to match src/data/products/catalog.json EXACTLY.
 * (Re-seed for the devs' new portfolio-driven catalog: 7 garment types, 33 fabrics,
 * 10 colors, 9 decorations, normalized styles, pricing rules, 13 archetypes.)
 *
 * vs the old one-time seed: this also (a) stores `gallery` as STATIC paths in a
 * json field instead of uploading images to PB (the 864 webp are already static
 * assets in the repo), and (b) DELETES any record whose slug is no longer in the
 * catalog, so PB ends up matching the catalog 1:1 (no stale old products).
 *
 * Needs a PocketBase superuser. Run from repo root:
 *   PB_EMAIL='you@gmail.com' PB_PASSWORD='your-pb-admin-password' node scripts/sync-pms.mjs
 *   (optional PB_URL, default https://dev.kustomgarment.com/pb)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PB = (process.env.PB_URL || 'https://dev.kustomgarment.com/pb').replace(/\/$/, '');
const EMAIL = process.env.PB_EMAIL, PASSWORD = process.env.PB_PASSWORD;
if (!EMAIL || !PASSWORD) { console.error('Set PB_EMAIL and PB_PASSWORD env vars.'); process.exit(1); }

const catalog = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/products/catalog.json'), 'utf8'));
let token = '';
const headers = () => ({ 'Content-Type': 'application/json', Authorization: token });

async function auth() {
  const r = await fetch(`${PB}/api/collections/_superusers/auth-with-password`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identity: EMAIL, password: PASSWORD }),
  });
  if (!r.ok) throw new Error(`auth failed: ${r.status} ${await r.text()}`);
  token = (await r.json()).token;
  console.log('✓ authenticated');
}

// ensure products has a `gallery` json field (idempotent)
async function ensureGalleryField() {
  const r = await fetch(`${PB}/api/collections/products`, { headers: headers() });
  const col = await r.json();
  const fields = col.fields || col.schema || [];
  if (fields.some((f) => f.name === 'gallery')) { console.log('✓ gallery field exists'); return; }
  fields.push({ name: 'gallery', type: 'json', required: false, options: { maxSize: 0 } });
  const u = await fetch(`${PB}/api/collections/products`, { method: 'PATCH', headers: headers(), body: JSON.stringify({ fields }) });
  console.log(u.ok ? '✓ added gallery field' : `✗ gallery field: ${u.status} ${await u.text()}`);
}

async function upsert(col, uniqueVal, data) {
  const q = `${PB}/api/collections/${col}/records?perPage=1&filter=(slug='${String(uniqueVal).replace(/'/g, "\\'")}')`;
  const found = (await (await fetch(q, { headers: headers() })).json()).items?.[0];
  if (found) {
    const r = await fetch(`${PB}/api/collections/${col}/records/${found.id}`, { method: 'PATCH', headers: headers(), body: JSON.stringify(data) });
    if (!r.ok) throw new Error(`${col} patch ${uniqueVal}: ${r.status} ${await r.text()}`);
    return found.id;
  }
  const r = await fetch(`${PB}/api/collections/${col}/records`, { method: 'POST', headers: headers(), body: JSON.stringify(data) });
  if (!r.ok) throw new Error(`${col} create ${uniqueVal}: ${r.status} ${await r.text()}`);
  return (await r.json()).id;
}

// delete records in `col` whose slug is NOT in keepSlugs
async function cleanup(col, keepSlugs) {
  const list = (await (await fetch(`${PB}/api/collections/${col}/records?perPage=500`, { headers: headers() })).json()).items || [];
  let removed = 0;
  for (const rec of list) {
    if (!keepSlugs.has(rec.slug)) {
      const r = await fetch(`${PB}/api/collections/${col}/records/${rec.id}`, { method: 'DELETE', headers: headers() });
      if (r.ok) removed++;
    }
  }
  if (removed) console.log(`  cleaned ${removed} stale ${col}`);
}

async function main() {
  await auth();
  await ensureGalleryField();

  const gtId = {}, colId = {}, fabId = {};
  const styleSlug = (g, attr, name) => `${g}-${attr}-${name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  for (const g of catalog.garment_types) gtId[g.id] = await upsert('garment_types', g.id, { name: g.name, slug: g.id });
  await cleanup('garment_types', new Set(catalog.garment_types.map((g) => g.id)));
  console.log(`✓ garment_types: ${catalog.garment_types.length}`);

  for (const c of catalog.colors) colId[c.id] = await upsert('colors', c.id, { name: c.name, slug: c.id, hex: c.hex, sort_order: c.sort_order || 0 });
  await cleanup('colors', new Set(catalog.colors.map((c) => c.id)));
  console.log(`✓ colors: ${catalog.colors.length}`);

  for (const f of catalog.fabrics) {
    fabId[f.id] = await upsert('fabrics', f.id, {
      name: f.name, slug: f.id, allowed_garment_types: gtId[f.garment_type] ? [gtId[f.garment_type]] : [],
      tier: f.tier || 'standard', colors: (f.colors || []).map((c) => colId[c]).filter(Boolean),
      description: f.description || '',
    });
  }
  await cleanup('fabrics', new Set(catalog.fabrics.map((f) => f.id)));
  console.log(`✓ fabrics: ${catalog.fabrics.length}`);

  const allGt = Object.values(gtId);
  for (const d of catalog.decoration_types) {
    await upsert('decorations', d.id, {
      name: d.name, slug: d.id, technique: d.technique, size_class: d.size_class,
      add_on_per_pc: d.add_on_per_pc || 0, suitable_garment_types: allGt,
    });
  }
  await cleanup('decorations', new Set(catalog.decoration_types.map((d) => d.id)));
  console.log(`✓ decorations: ${catalog.decoration_types.length}`);

  const keepStyles = new Set();
  for (const g of catalog.garment_types) {
    const so = g.style_options || {};
    for (const attr of Object.keys(so)) {
      const opts = so[attr] || [];
      for (let i = 0; i < opts.length; i++) {
        const o = opts[i], slug = styleSlug(g.id, attr, o.name);
        keepStyles.add(slug);
        await upsert('styles', slug, { slug, garment_type: gtId[g.id], attribute: attr, name: o.name, illustration: o.illustration || '', desc: o.desc || '', suggested: o.suggested || '', sort_order: i });
      }
    }
  }
  await cleanup('styles', keepStyles);
  console.log(`✓ styles: ${keepStyles.size}`);

  {
    const data = { pricing_rules: catalog.pricing_rules || [], config: {} };
    const list = (await (await fetch(`${PB}/api/collections/settings/records?perPage=1`, { headers: headers() })).json()).items || [];
    if (list.length) await fetch(`${PB}/api/collections/settings/records/${list[0].id}`, { method: 'PATCH', headers: headers(), body: JSON.stringify(data) });
    else await fetch(`${PB}/api/collections/settings/records`, { method: 'POST', headers: headers(), body: JSON.stringify(data) });
    console.log('✓ settings (pricing_rules)');
  }

  const archetypes = catalog.archetypes.filter((a) => !a.hidden);
  for (const p of archetypes) {
    await upsert('products', p.slug, {
      name: p.name, slug: p.slug, segment: p.segment, garment_type: gtId[p.garment_type] || '',
      badge: p.badge || '', positioning: p.positioning || '', description: p.description || '', care: p.care || '',
      rating: p.rating || 0, reviews: p.reviews || 0,
      price_min: p.price_min || 0, price_max: p.price_max || 0, base_price_per_pc: p.base_price_per_pc || 0,
      price_note: p.price_note || '', hide_price: !!p.hide_price,
      default_fabric: fabId[p.default_fabric] || '', default_color: colId[p.color_default] || '',
      upgrade_fabrics: (p.upgrade_fabrics || []).map((x) => fabId[x]).filter(Boolean),
      downgrade_fabrics: (p.downgrade_fabrics || []).map((x) => fabId[x]).filter(Boolean),
      locked_spec: p.locked_spec || {}, default_decoration: p.default_decoration || [],
      gallery: p.gallery || [], hidden: false,
    });
  }
  await cleanup('products', new Set(archetypes.map((a) => a.slug)));
  console.log(`✓ products: ${archetypes.length}`);

  console.log('\nDone — PocketBase now matches catalog.json. Verify: https://dev.kustomgarment.com/pb/_/');
}

main().catch((e) => { console.error('\n✗', e.message); process.exit(1); });
