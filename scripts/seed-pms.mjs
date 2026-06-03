#!/usr/bin/env node
/**
 * Seed PocketBase PMS from src/data/products/catalog.json  (Phase 1 — one-time migration).
 *
 * Idempotent by slug: re-running updates existing records instead of duplicating.
 * Needs PocketBase superuser auth (writes are admin-only). Run from repo root:
 *
 *   PB_EMAIL='you@gmail.com' PB_PASSWORD='your-pb-admin-password' node scripts/seed-pms.mjs
 *
 * Optional: PB_URL (default https://dev.kustomgarment.com/pb)
 *
 * Defaults (safe, refine later in the admin):
 *   - fabrics kept 1:1 with their current garment_type (allowed_garment_types = [that type]).
 *     Merge same-fabric-across-types in the admin afterward if you want a true shared library.
 *   - decorations: suitable_garment_types = all 6 types (refine per rules in admin).
 *   - only the 26 visible products are seeded (hidden placeholders skipped).
 */
import fs from 'node:fs';
import path from 'node:path';

const PB = (process.env.PB_URL || 'https://dev.kustomgarment.com/pb').replace(/\/$/, '');
const EMAIL = process.env.PB_EMAIL, PASSWORD = process.env.PB_PASSWORD;
if (!EMAIL || !PASSWORD) { console.error('Set PB_EMAIL and PB_PASSWORD env vars.'); process.exit(1); }

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const catalog = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/products/catalog.json'), 'utf8'));

let token;
const headers = () => ({ Authorization: token, 'Content-Type': 'application/json' });

async function auth() {
  const r = await fetch(`${PB}/api/collections/_superusers/auth-with-password`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identity: EMAIL, password: PASSWORD }),
  });
  if (!r.ok) throw new Error('Auth failed: ' + r.status + ' ' + (await r.text()));
  token = (await r.json()).token;
  console.log('✓ authenticated');
}

// upsert by slug-ish unique field; returns the record id
async function upsert(col, uniqueField, uniqueVal, data) {
  const q = `${PB}/api/collections/${col}/records?perPage=1&filter=(${uniqueField}='${String(uniqueVal).replace(/'/g, "\\'")}')`;
  const found = await (await fetch(q, { headers: headers() })).json();
  if (found.items && found.items.length) {
    const id = found.items[0].id;
    const r = await fetch(`${PB}/api/collections/${col}/records/${id}`, { method: 'PATCH', headers: headers(), body: JSON.stringify(data) });
    if (!r.ok) throw new Error(`update ${col}/${uniqueVal}: ${r.status} ${await r.text()}`);
    return id;
  }
  const r = await fetch(`${PB}/api/collections/${col}/records`, { method: 'POST', headers: headers(), body: JSON.stringify(data) });
  if (!r.ok) throw new Error(`create ${col}/${uniqueVal}: ${r.status} ${await r.text()}`);
  return (await r.json()).id;
}

async function main() {
  await auth();

  // 1) garment_types
  const gtId = {};
  for (const g of catalog.garment_types) {
    gtId[g.id] = await upsert('garment_types', 'slug', g.id, {
      name: g.name, slug: g.id, placements: g.placements || [], size_run: g.size_run || [],
    });
  }
  console.log(`✓ garment_types: ${Object.keys(gtId).length}`);

  // 2) colors
  const colId = {};
  for (const c of catalog.colors) {
    colId[c.id] = await upsert('colors', 'slug', c.id, { name: c.name, slug: c.id, hex: c.hex, sort_order: c.sort_order || 0 });
  }
  console.log(`✓ colors: ${Object.keys(colId).length}`);

  // 3) fabrics  (allowed_garment_types = [current type]; colors resolved)
  const fabId = {};
  for (const f of catalog.fabrics) {
    fabId[f.id] = await upsert('fabrics', 'slug', f.id, {
      name: f.name, slug: f.id, allowed_garment_types: gtId[f.garment_type] ? [gtId[f.garment_type]] : [],
      delta_per_pc: f.delta_per_pc || 0, tier: f.tier || 'standard', weave: f.weave || '',
      colors: (f.colors || []).map((c) => colId[c]).filter(Boolean),
      description: f.description || '', // swatch_image is a file — set in admin (svg lives in /public)
    });
  }
  console.log(`✓ fabrics: ${Object.keys(fabId).length}`);

  // 4) decorations (suitable = all types by default)
  const allGt = Object.values(gtId);
  for (const d of catalog.decoration_types) {
    await upsert('decorations', 'slug', d.id, {
      name: d.name, slug: d.id, size_class: d.size_class || '', technique: d.technique || 'embroidery',
      add_on_per_pc: d.add_on_per_pc || 0, suitable_garment_types: allGt,
    });
  }
  console.log(`✓ decorations: ${catalog.decoration_types.length}`);

  // 5) styles (normalized from garment_types.style_options)
  let styleCount = 0;
  for (const g of catalog.garment_types) {
    const so = g.style_options || {};
    for (const attr of Object.keys(so)) {
      const opts = so[attr] || [];
      for (let i = 0; i < opts.length; i++) {
        const o = opts[i];
        await upsert('styles', 'slug', `${g.id}-${attr}-${o.name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'), {
          slug: `${g.id}-${attr}-${o.name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          garment_type: gtId[g.id], attribute: attr, name: o.name,
          illustration: o.illustration || '', desc: o.desc || '', suggested: o.suggested || '', sort_order: i,
        });
        styleCount++;
      }
    }
  }
  console.log(`✓ styles: ${styleCount}`);

  // 6) settings (pricing rules) — singleton (list-or-create, no assumed unique field)
  {
    const data = { pricing_rules: catalog.pricing_rules || [], config: {} };
    const list = await (await fetch(`${PB}/api/collections/settings/records?perPage=1`, { headers: headers() })).json();
    if (list.items && list.items.length) {
      await fetch(`${PB}/api/collections/settings/records/${list.items[0].id}`, { method: 'PATCH', headers: headers(), body: JSON.stringify(data) });
    } else {
      await fetch(`${PB}/api/collections/settings/records`, { method: 'POST', headers: headers(), body: JSON.stringify(data) });
    }
    console.log('✓ settings');
  }

  // 7) products (visible only) — relations resolved; photos uploaded via multipart
  const visible = catalog.archetypes.filter((a) => !a.hidden);
  let pCount = 0, photoFails = 0;
  for (const p of visible) {
    const base = {
      name: p.name, slug: p.slug, segment: p.segment, garment_type: gtId[p.garment_type] || '',
      badge: p.badge || '', positioning: p.positioning || '', description: p.description || '', care: p.care || '',
      rating: p.rating || 0, reviews: p.reviews || 0,
      price_min: p.price_min || 0, price_max: p.price_max || 0, base_price_per_pc: p.base_price_per_pc || 0,
      price_note: p.price_note || '', hide_price: !!p.hide_price,
      default_fabric: fabId[p.default_fabric] || '', default_color: colId[p.color_default] || '',
      upgrade_fabrics: (p.upgrade_fabrics || []).map((x) => fabId[x]).filter(Boolean),
      downgrade_fabrics: (p.downgrade_fabrics || []).map((x) => fabId[x]).filter(Boolean),
      locked_spec: p.locked_spec || {}, default_decoration: p.default_decoration || [], hidden: false,
    };
    const id = await upsert('products', 'slug', p.slug, base);

    // upload photos (gallery files) via multipart PATCH
    const files = (p.gallery || []).slice(0, 4).map((g) => decodeURIComponent(path.join(ROOT, 'public', g)));
    const fd = new FormData();
    let attached = 0;
    for (const fp of files) {
      if (!fs.existsSync(fp)) { photoFails++; continue; }
      const buf = fs.readFileSync(fp);
      fd.append('photos', new Blob([buf]), path.basename(fp));
      attached++;
    }
    if (attached) {
      const r = await fetch(`${PB}/api/collections/products/records/${id}`, { method: 'PATCH', headers: { Authorization: token }, body: fd });
      if (!r.ok) { console.warn(`  photo upload ${p.slug}: ${r.status}`); photoFails++; }
    }
    pCount++;
  }
  console.log(`✓ products: ${pCount} (photo issues: ${photoFails})`);
  console.log('\nDone. Verify in the admin: https://dev.kustomgarment.com/pb/_/');
}

main().catch((e) => { console.error('\n✗', e.message); process.exit(1); });
