/**
 * Phase 2 — PMS adapter.
 * Fetches the PocketBase PMS collections at build time and assembles the SAME
 * shape the site already consumes from catalog.json — so pages/PDP/customizer
 * need no rewiring; only the data source changes.
 *
 * Used behind a flag (see src/data/products/catalog-source.mjs). Falls back to
 * the JSON catalog if PB is empty/unreachable, so the build never breaks.
 */
const DEFAULT_PB = 'https://dev.kustomgarment.com/pb';

const fileUrl = (base, col, rec, field) =>
  rec[field] ? `${base}/api/files/${col}/${rec.id}/${rec[field]}` : null;

// group normalized style records back into garment_types[].style_options
function styleOptionsFor(styles, gtId) {
  const out = {};
  const sgt = (x) => (Array.isArray(x.garment_type) ? x.garment_type[0] : x.garment_type);
  for (const s of styles.filter((x) => sgt(x) === gtId).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))) {
    (out[s.attribute] = out[s.attribute] || []).push({
      name: s.name, illustration: s.illustration || '', desc: s.desc || '', suggested: s.suggested || '',
    });
  }
  return out;
}

export async function loadCatalogFromPB(base = process.env.PB_URL || DEFAULT_PB) {
  base = base.replace(/\/$/, '');
  const get = (col, extra = '') =>
    fetch(`${base}/api/collections/${col}/records?perPage=500${extra}`)
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((j) => j.items || []);

  const [gts, colors, fabrics, styles, decos, products, settings] = await Promise.all([
    get('garment_types'), get('colors'), get('fabrics'), get('styles'), get('decorations'),
    get('products'), get('settings'),
  ]);

  if (!products.length) throw new Error('PMS: products collection is empty — not seeded yet.');

  const gtSlug = Object.fromEntries(gts.map((g) => [g.id, g.slug]));
  const fabSlug = Object.fromEntries(fabrics.map((f) => [f.id, f.slug]));
  const colSlug = Object.fromEntries(colors.map((c) => [c.id, c.slug]));
  // PocketBase relations: multi → array, single → string. Normalize both.
  const asArr = (v) => (Array.isArray(v) ? v : v ? [v] : []);
  const one = (v) => (Array.isArray(v) ? v[0] : v) || null;
  const map = (ids, lut) => asArr(ids).map((id) => lut[id]).filter(Boolean);

  return {
    garment_types: gts.map((g) => ({
      id: g.slug, name: g.name, placements: g.placements || [], size_run: g.size_run || [],
      style_options: styleOptionsFor(styles, g.id),
    })),
    colors: colors.map((c) => ({ id: c.slug, name: c.name, hex: c.hex, sort_order: c.sort_order || 0 })),
    fabrics: fabrics.map((f) => ({
      id: f.slug, name: f.name,
      garment_type: map(f.allowed_garment_types, gtSlug)[0] || null,
      allowed_garment_types: map(f.allowed_garment_types, gtSlug),
      delta_per_pc: f.delta_per_pc || 0, tier: f.tier || 'standard', weave: f.weave || '',
      colors: map(f.colors, colSlug), description: f.description || '',
      swatch_image: fileUrl(base, 'fabrics', f, 'swatch_image'),
    })),
    decoration_types: decos.map((d) => ({
      id: d.slug, name: d.name, size_class: d.size_class, technique: d.technique,
      add_on_per_pc: d.add_on_per_pc || 0,
      suitable_garment_types: map(d.suitable_garment_types, gtSlug),
    })),
    pricing_rules: settings[0]?.pricing_rules || [],
    archetypes: products.map((p) => ({
      slug: p.slug, name: p.name, garment_type: gtSlug[one(p.garment_type)] || null, segment: p.segment,
      badge: p.badge || null, positioning: p.positioning || '', rating: p.rating || 0, reviews: p.reviews || 0,
      price_min: p.price_min || 0, price_max: p.price_max || 0, base_price_per_pc: p.base_price_per_pc || 0,
      price_note: p.price_note || '', hide_price: !!p.hide_price,
      default_fabric: fabSlug[one(p.default_fabric)] || null, color_default: colSlug[one(p.default_color)] || null,
      upgrade_fabrics: map(p.upgrade_fabrics, fabSlug), downgrade_fabrics: map(p.downgrade_fabrics, fabSlug),
      locked_spec: p.locked_spec || {}, default_decoration: p.default_decoration || [],
      description: p.description || '', care: p.care || '',
      gallery: (Array.isArray(p.gallery) && p.gallery.length)
        ? p.gallery
        : (p.photos || []).map((fn) => `${base}/api/files/products/${p.id}/${fn}`),
      hidden: !!p.hidden,
    })),
  };
}
