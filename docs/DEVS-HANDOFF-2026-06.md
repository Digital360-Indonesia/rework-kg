# Devs handoff — product rework (June 2026)

> Read this before touching products, the catalog, or the deploy.

---

## TL;DR — the 1 thing you need to know

1. **The single source of truth is `catalog.json`.** Edit there → build → deploy. There is no PocketBase integration and no CI auto-deploy.

---

## 1) What this rework did

- Every **portfolio client (156)** is now its **own product** — its own page (`/<segment>/<slug>`), real photo gallery, unique description, rating, "diproduksi untuk X klien", fabric care + how-it-feels, and its own configurator.
- Products are **distributed into segments** by client-name pattern: **business 108 · campus 37 · community 11 · personal 0** (topi excluded from customizer). Stored as `segment` on each item in `portfolio.json`.
- The **customizer is built FROM the scraped portfolio** (`kg_portfolio_data.md`), not invented. Per-garment axes (Kerah / Saku / Lengan / Placket / Manset / Resleting / Furing / Scotlite / Kombinasi Warna / …) with `single`/`multi` select, each option carrying an illustration image from the md. **Variations are locked to the garment type** — every product of a type offers its type's full axis set.
- **`Bahan` is NOT a customizer axis** — fabric lives in the Fabric section / fabric picker.
- **Topi** has no customizer (intentional) → its button is "Kustom via WhatsApp".

## 2) Deploy — manual only

- **Deploy with `bash deploy.sh`** from a machine that can `ssh kg-vps`. It does a clean build (`rm -rf dist` → `npm run build`) then `rsync --checksum` to the VPS.
- **No CI auto-deploy.** The GitHub Actions workflow was removed (runner couldn't reach VPS on :22, and partial rsync on timeout kept reverting fixes).
- **Future option:** self-hosted runner, pull-based deploy, or SSH tunnel if auto-deploy is needed later.

## 3) Data model + routes

- **`src/data/portfolio.json`** — the 156 products. Each item now has: `segment`, `spec` (its real curated config, keyed by axis), `rating`, `reviews`, `produced_count`, `heroImageLocal2` (hover image), plus the original `pdpSlug` (its template archetype).
- **`src/data/products/catalog.json`** — `garment_types[].style_options` (per-garment axes + option `illustration`s) and `style_options`-parallel **`style_select`** (`single`/`multi`); the 13 `archetypes` (templates, used for pricing/fabrics/decoration in the configurator).
- **`src/data/fabric-content.json`** — per-fabric `care` + `feel` (how-it-feels), consistent per material.
- **Routes:**
  - `src/pages/[segment]/[slug].astro` — product page (image-left / detail-right, read-only design summary, fabric/care/feel, → Custom Sekarang).
  - `src/pages/[segment]/[slug]/custom.astro` — the per-item configurator (seeded with the product's real config + photos; variations = the garment type's full set).
  - `src/pages/business|community|campus|personal.astro` — category pages, filter `portfolio.json` items by `segment`.
- Source for descriptions / specs / option images: **`kg_portfolio_data.md`** (scraped portfolio) + the client image folders in `public/images/portfolio/<client>/`.

## 4) How to edit products

1. Edit `src/data/products/catalog.json` (fabrics, style options, pricing, archetypes).
2. Edit `src/data/portfolio.json` (per-client products, segments, specs).
3. Edit `src/data/fabric-content.json` (fabric care + feel descriptions).
4. `npm run build` → verify.
5. `bash deploy.sh` → push to live.

## 5) Follow-ups (TODO)

- [ ] Style-option **illustrations are remote** `portfolio.kustomgarment.com` URLs (66% of options matched an image; the rest fall back to the name label). Consider downloading them into `public/` + improving the name→image match.
- [ ] Orphaned `/produk/<archetype>` pages still build (the old archetype PDPs) — safe to remove.
- [ ] `personal` segment is empty; topi products have no customizer (both intentional for now).
