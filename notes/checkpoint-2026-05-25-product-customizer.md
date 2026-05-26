# Checkpoint — 2026-05-25 (Product customizer)

**Branch:** `main` (uncommitted). **Dev:** `npm run dev` → http://localhost:4321/
**Status:** ALL customizer work is **localhost-only / UNPUSHED** (per [[feedback_no_auto_push]] — push only on Araya's explicit go).

Built a Phase-0 **product customizer** (single product page + "Custom Sekarang" configurator) modeled on Proper Cloth, adapted to KG brand + the WhatsApp-finalization sales flow. Reviewed tab-by-tab with Araya; all 6 tabs approved.

## Files (all NEW/untracked unless noted)
- `src/data/products/catalog.json` — Phase-0 catalog (shaped for the planned PocketBase collections). garment_types (kemeja: placements, size_run, style_options), fabrics (now incl. `weave` + `colors`), colors (10), decoration_types (9), pricing_rules (qty tiers), archetypes (`boardroom-shirt`).
- `src/pages/produk/[slug].astro` — single product page (gallery + rail + accordions; "Hubungi via WhatsApp" + "Custom Sekarang").
- `src/pages/produk/[slug]/custom.astro` — the configurator (all the work below).
- `public/images/customizer/fabric/*.svg` — 5 generated weave swatches.
- `public/images/customizer/style/*.svg` — style option line-art icons.
- `src/layouts/BaseLayout.astro` (MODIFIED) — added `noCurtain` + `noFooter` props.
- `notes/decoration-concepts.md` — both decoration concepts + restore code for the backup one.

## Tabs — state
| Tab | Done | Notes |
|---|---|---|
| Fabric | ✅ | static swatch grid (weave SVGs), hover name **below** (outside), ⓘ click → **info bubble** popover, pinned detail bar (name·tier·price + bars) |
| Color | ✅ | **dynamic per fabric**: filtered to fabric's `colors`, swatches **weave-textured** (CSS) per fabric `weave`; custom-color input; tone label (Terang/Netral/Gelap) |
| Style | ✅ | list → per-attribute illustrated grid; **slide-push** nav (overlay, single push any distance; list↔detail horizontal, rail↔rail vertical mirroring rail position); left quick-switch rail |
| Decoration | ✅ | **garment placement map** (shirt SVG + clickable hotspots, Front/Back, animated technique chooser bubble). Row-card concept = backup in notes. |
| Size | ✅ | **Fit** (Slim·Regular·Relaxed) + **Length** (Short·Regular·Tall) — **locked to Regular** (others shown disabled + "segera hadir"); qty grid; **"Panduan ukuran" modal** (size chart) |
| Summary | ✅ | grouped recap (Spesifikasi/Style/Dekorasi/Ukuran) + **orange** price card (est/pc + total) + pinned WhatsApp CTA; WA message carries full spec |

Shared: fit-screen (no page scroll desktop, panels scroll internally); bottom bar now **white** (was black); select micro-interactions (✓ spring, card press, detail-bar pulse) — all respect reduced-motion.

## Decision log (the non-obvious WHY)
- **Customizer `<style>` is `is:global`.** Much of the panel is JS-rendered via innerHTML; Astro **scoped styles don't reach JS-injected nodes** (this caused the decoration cards to render unstyled / giant-icon). Global is safe — only ships on this route, all selectors are `.cz-/.fab-/.col-/.st-/.deco-/.sm-/.sz-` specific.
- **Static HTML + class toggle, NOT innerHTML rebuild,** for swatch grids — rebuilding re-loaded every `<img>` each interaction = flicker. Fabric/Color are fully static; only state classes toggle.
- **Style nav = overlay push** (two panes animate, others hidden) so a far jump (Collar→Pocket) is one clean push, not a flick through every in-between pane.
- **Decoration = placement map** (Araya picked it over row-cards for the "e-commerce customization" feel). Row-card concept fully preserved in `notes/decoration-concepts.md` as a 3-block restore.
- **Fabric swatches are generated SVGs and STAY that way** (Araya's call): crisp at any zoom, ~400 B, recolorable, fine for a quote tool. NOT to be replaced with photos. ribstop fixed to a real ripstop grid (was graph-paper).
- **Color depends on fabric** (real konveksi stock model) + **swatches show the weave** (CSS overlay tinted via `var(--c)`, follows fabric `weave`) — no per-color images.
- **Fit/Length locked to Regular for now** — options shown (disabled) to signal the future feature; real Slim/Relaxed/Short/Tall deltas are a later wiring.

## Pricing (client-side, deterministic)
base_price_per_pc + fabric delta → × qty multiplier (pricing_rules) + decoration add-ons → est /pc, shown as ±10% range. Final price confirmed via WhatsApp.

## TODO / later (not blocking)
- **Real data:** fabric `colors` lists are PLACEHOLDER (set real stock availability); size-chart cm are placeholders.
- **Map polish:** hotspot positions approximate (`PLACE_MAP` x/y % in custom.astro frontmatter); shirt is placeholder SVG → swap for precise kemeja art; key `PLACE_MAP` by garment_type later.
- **Scale:** wire category lists → product pages; replicate across the other archetypes; migrate catalog → PocketBase + admin (Phase-1). Editable-style-with-mockup-render = v2 (needs assets). Weave-recipe generator (twill/ripstop/oxford/sateen × color) when more fabrics land.

## Next
- Fill real per-fabric color availability + size chart.
- Then: category→product wiring, more products, PocketBase migration.
- Push when Araya says (→ Route B auto-deploys to dev.kustomgarment.com).

## Update (same session) — funnel wired (browsable)
- **2 more business archetypes** added to catalog.json: `field-workshirt`, `oxford-buttondown` (both garment_type kemeja → reuse the customizer fully). Business now has 3 products.
- **New component `src/components/sections/ProductLineup.astro`** — catalog-driven, segment-filtered grid (image/badge/rating/price range) → `/produk/[slug]`. Renders nothing if no matching products (safe to drop anywhere).
- Placed on **`business.astro`** (`<ProductLineup segment="business" />`, above the existing sample shop) and **`produk.astro`** (no segment = all archetypes, above the product-type hub). Existing sample grids left intact (additive).
- Funnel now clickable end-to-end: category/produk → product card → product page → "Custom Sekarang" → customizer → WhatsApp. All routes 200.
- **Still TODO:** other category pages (campus/community/personal) need archetypes for their segments (would need non-kemeja garment_types) before adding the lineup there. Could also make the sample shop grids catalog-driven later.

See memory [[project_kg_customizer]] for the durable summary.
