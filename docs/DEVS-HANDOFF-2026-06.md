# Devs handoff — product rework (June 2026)

> Read this before touching products, the catalog, PocketBase, or the deploy.
> Pairs with `docs/PRODUCTS-AND-CONTENT-FLOW.md` — but **note the build-source change below, which reverses part of that doc.**

---

## TL;DR — the 3 things that will bite you

1. **The live build now sources from `catalog.json`, NOT PocketBase.** `PMS_SOURCE=pb` is **OFF** in `.github/workflows/deploy.yml`. So **editing a product in the PocketBase admin will NOT appear on the live site** right now. (Why: see §2.)
2. **The CI auto-deploy is broken** (GitHub runner can't reach the VPS on :22). Deploy with **`bash deploy.sh`** from a machine that can SSH the VPS. (Why + details: §3.)
3. **Products are now the 156 portfolio clients**, each its own page at `/<segment>/<slug>`, with a customizer at `/<segment>/<slug>/custom`. The 13 archetypes are now just **templates**. (Data model: §4.)

---

## 1) What this rework did

- Every **portfolio client (156)** is now its **own product** — its own page (`/<segment>/<slug>`), real photo gallery, unique description, rating, "diproduksi untuk X klien", fabric care + how-it-feels, and its own configurator.
- Products are **distributed into segments** by client-name pattern: **business 108 · campus 37 · community 11 · personal 0** (topi excluded from customizer). Stored as `segment` on each item in `portfolio.json`.
- The **customizer is built FROM the scraped portfolio** (`kg_portfolio_data.md`), not invented. Per-garment axes (Kerah / Saku / Lengan / Placket / Manset / Resleting / Furing / Scotlite / Kombinasi Warna / …) with `single`/`multi` select, each option carrying an illustration image from the md. **Variations are locked to the garment type** — every product of a type offers its type's full axis set.
- **`Bahan` is NOT a customizer axis** — fabric lives in the Fabric section / fabric picker.
- **Topi** has no customizer (intentional) → its button is "Kustom via WhatsApp".

## 2) PocketBase — why it's bypassed, and how to re-enable it properly

`PMS_SOURCE=pb` was turned **off** because the PB-sourced build produced **empty customizers** (every product fell back to a WhatsApp-only button). Two gaps:

- **PB is stale** vs `catalog.json` — the last `scripts/sync-pms.mjs` run was before the customizer was finalized (Bahan removed, illustrations added, axes recurated).
- **The adapter is incomplete** — `src/data/products/pms-adapter.mjs` `styleOptionsFor()` doesn't carry the per-option **`illustration`** or the per-axis **`style_select`** (single/multi). So even a fresh sync wouldn't fully reproduce the catalog.

**To re-enable PB as the live source (do all of these, then flip `PMS_SOURCE` back to `pb`):**
1. `PB_EMAIL=… PB_PASSWORD=… node scripts/sync-pms.mjs` to push current `catalog.json` → PB.
2. Extend **`scripts/sync-pms.mjs`** to also write each style's `illustration` and each garment's `style_select`.
3. Extend **`pms-adapter.mjs`** `styleOptionsFor()` / `garment_types` mapping to read back `illustration` + `style_select`.
4. Verify a non-kemeja product (e.g. `/business/pt-pjb/custom`) shows all its axes after a `PMS_SOURCE=pb npm run build`.

Until then, **`catalog.json` is the single source of truth** — edit there, no sync needed.

## 3) Deploy — CI is down, use deploy.sh

- **GitHub Actions deploy FAILS** every run: the runner can't open SSH to the VPS (`connect to host …:22: Connection timed out`, all retries). It's a network path issue (Hostinger blackholing the runner IPs), **not the build**.
- ⚠️ **Gotcha:** the run is marked *failed*, but its rsync **ships files before timing out** — so a failed CI run can still partially overwrite the live `dist`. This is what kept reverting fixes.
- **Deploy manually:** `bash deploy.sh` (now does `rm -rf dist` → clean build → `rsync --checksum`). Run it from a machine that can `ssh kg-vps`.
- **Durable fix (infra, TODO):** self-hosted runner, OR pull-based deploy (VPS builds itself on a webhook), OR a tunnel for SSH. Until then CI deploy should arguably be disabled so it stops shipping partial builds.

## 4) Data model + routes

- **`src/data/portfolio.json`** — the 156 products. Each item now has: `segment`, `spec` (its real curated config, keyed by axis), `rating`, `reviews`, `produced_count`, `heroImageLocal2` (hover image), plus the original `pdpSlug` (its template archetype).
- **`src/data/products/catalog.json`** — `garment_types[].style_options` (per-garment axes + option `illustration`s) and `style_options`-parallel **`style_select`** (`single`/`multi`); the 13 `archetypes` (templates, used for pricing/fabrics/decoration in the configurator).
- **`src/data/fabric-content.json`** — per-fabric `care` + `feel` (how-it-feels), consistent per material.
- **Routes:**
  - `src/pages/[segment]/[slug].astro` — product page (image-left / detail-right, read-only design summary, fabric/care/feel, → Custom Sekarang).
  - `src/pages/[segment]/[slug]/custom.astro` — the per-item configurator (seeded with the product's real config + photos; variations = the garment type's full set).
  - `src/pages/business|community|campus|personal.astro` — category pages, filter `portfolio.json` items by `segment`.
- Source for descriptions / specs / option images: **`kg_portfolio_data.md`** (scraped portfolio) + the client image folders in `public/images/portfolio/<client>/`.

## 5) Follow-ups (TODO)

- [ ] Re-enable PocketBase as live source — sync + adapter for `illustration` + `style_select` (§2), then flip `PMS_SOURCE=pb`.
- [ ] Fix the CI deploy connectivity, or disable the CI deploy so it stops partial-shipping (§3).
- [ ] Style-option **illustrations are remote** `portfolio.kustomgarment.com` URLs (66% of options matched an image; the rest fall back to the name label). Consider downloading them into `public/` + improving the name→image match.
- [ ] Orphaned `/produk/<archetype>` pages still build (the old archetype PDPs) — safe to remove.
- [ ] `personal` segment is empty; topi products have no customizer (both intentional for now).
