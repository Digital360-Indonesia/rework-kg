# KG PMS — Product Management System (PocketBase-backed)

**Started:** 2026-06-03 · **Owner:** Manager-Lord (Claudy) + Lord-Shipwright (infra)
**Goal:** Move the product catalog (currently `src/data/products/catalog.json`) into **PocketBase** so Araya manages products, fabrics, styles, decorations, photos, prices, and details himself via an admin UI — instead of hand-edited JSON.

## Decisions (locked 2026-06-03)
- **Backend:** PocketBase on the VPS (already running at `/pb/`, systemd, 127.0.0.1:8090).
- **Admin:** PocketBase built-in admin (`/pb/_/`) for v1. Custom UI later if wanted.
- **Publish model:** **Manual "Publish" button.** Edit freely in PB (draft); click Publish → triggers a rebuild that fetches the latest from PB → deploys. No auto-deploy on every save (keeps a review gate).
- **Photos:** stored IN PocketBase (native file upload), served from `/pb/api/files/...`.
- **Site stays static** (`output: 'static'`). Build fetches PB at build time and assembles the existing catalog shape via an adapter → minimal rewiring of pages/customizer.
- **Safety:** build ALONGSIDE `catalog.json` (behind a flag). Live site untouched until PB is proven; cut over only when verified. PB changes are additive — do NOT touch the existing `/checklist` (briefs) collections.

## Schema (PocketBase collections)
Mirrors the current `catalog.json`, normalized. Relations in **bold**.

- **garment_types**: name, slug(unique), placements(json[]), size_run(json[])
- **colors**: name, slug, hex, sort_order
- **fabrics** (library): name, slug, **allowed_garment_types**(rel→garment_types, multi), delta_per_pc(num), tier(select budget/standard/premium), weave, **colors**(rel→colors, multi), description, swatch_image(file)
  - NEW vs current: a fabric can allow MANY types ("Drill" → jaket+wearpack), vs current one-type-per-entry. Migration merges by name (decide during Phase 1).
- **styles** (library, normalized from garment_types.style_options): **garment_type**(rel), attribute(text e.g. "Collar"), name, illustration(file/text), desc, suggested, sort_order
- **decorations** (library, from decoration_types): name, slug, size_class(select), technique(select embroidery/screen-print/dtf), add_on_per_pc(num), **suitable_garment_types**(rel, multi) — NEW (the "shirt → not screen-print" rule)
- **products** (from archetypes): name, slug(unique), segment(select business/community/campus/personal), **garment_type**(rel), badge, positioning, description, care, rating(num), reviews(num), price_min/price_max/base_price_per_pc(num), price_note, hide_price(bool), **default_fabric**(rel), **default_color**(rel), **upgrade_fabrics**/**downgrade_fabrics**(rel multi), locked_spec(json), default_decoration(json [{type,placement,size}]), photos(file, max 4), hidden(bool)
- **settings** (singleton): pricing_rules(json [{min_qty,max_qty,multiplier}]), global config

API rules: **public READ** on all PMS collections (build fetches them); writes admin-only.

## Data flow
1. Araya edits in PocketBase admin (`/pb/_/`).
2. Clicks **Publish** → triggers GitHub Action (`repository_dispatch`/webhook with token).
3. Action builds: a build-time loader fetches `/pb/api/collections/*/records`, assembles a `catalog`-shaped object (adapter), Astro builds static, rsync deploys, Cloudflare purge.

## Roadmap (each phase keeps the live site up)
1. **Schema + provision** ← *current.* Shipwright creates the PB collections per schema; Manager-Lord designs the migration + seeds the 26 products + fabrics/colors/decorations/styles from `catalog.json`.
2. **Build reads PB** — build-time PB loader + catalog adapter, behind a flag (parallel to JSON).
3. **Publish trigger** — the manual Publish → rebuild webhook (Shipwright).
4. **Cut over** — pages/PDP/customizer read PB; retire `catalog.json`.
5. **Libraries polish** — styles + decorations management, per-type rules in admin.

## Status log
- 2026-06-03: Charter created. Decisions locked. Phase 1 kicked off — Shipwright provisioning PB schema; migration design in progress.
- 2026-06-03 (Lord-Shipwright) — **Phase 1 provisioning DONE.** All 7 PMS collections live in PocketBase (PB v0.38.1) on the VPS, additive, checklist data proven intact.
  - **Backup (pre-change):** `/home/fabrikgroup/pocketbase/pb_backups/pb_data-pre-pms-20260603-064158.tar.gz` (672 MB, gzip-verified, contains data.db + auxiliary.db + storage). SHA256 `16060ed3…112463`.
  - **Integrity proof:** `briefs` = 12 records and `uploads` = 44 records — **identical before and after**. `_superusers` = 1 (untouched). New PMS tables all created empty (0 rows).
  - **How it was created (durable + reproducible):** a single JS migration `pb_migrations/1779800000_created_pms_collections.js` (owned by `fabrikgroup`), applied via `pocketbase migrate up` and recorded in the `_migrations` table → automigrate skips it on restart (no re-run/wipe). PocketBase lives entirely under `/home/fabrikgroup/pocketbase/` with its own systemd unit; **not** templated by HestiaCP, so a panel regen won't touch it. **NOTE for Manager-Lord:** this migration file lives ONLY on the server right now. If you want it version-controlled, copy it into the repo (e.g. `pocketbase/pb_migrations/`) — ask Shipwright to fetch it.
  - **Collections + key relations created:** `garment_types`(slug uniq), `colors`(slug uniq), `fabrics`(slug uniq; `allowed_garment_types`→garment_types multi, `colors`→colors multi, `tier` select budget/standard/premium, `swatch_image` file×1), `styles`(`garment_type`→garment_types single), `decorations`(slug uniq; `technique` select embroidery/screen-print/dtf, `size_class` select, `suitable_garment_types`→garment_types multi), `products`(slug uniq; `garment_type` single, `default_fabric`/`default_color` single, `upgrade_fabrics`/`downgrade_fabrics`→fabrics multi, `segment` select, **`photos` file×4**, `locked_spec`/`default_decoration` json), `settings`(json pricing_rules/config). All fields/types/uniques verified against schema.
  - **API rules:** every PMS collection = **public list+view (read)**, create/update/delete = **superuser only**. Verified live: `curl` list on each returns HTTP 200 `{items:[]}`; unauth POST to products → **403 "Only superusers can perform this action."** (no record created). Checklist `briefs` rules NOT touched.
  - **Admin access:** `https://dev.kustomgarment.com/pb/_/` (HTTP 200). A superuser already exists for `ara***@gmail.com` → **Araya logs in with his existing PocketBase admin password — no new account, no secret created.** If he's forgotten it, reset on the server: `cd /home/fabrikgroup/pocketbase && sudo -u fabrikgroup ./pocketbase superuser update <email> <newpass>` (he runs this himself; do not put a password in the repo).

### Publish-trigger (Phase 3) — feasibility CONFIRMED, recommended design
Goal: a manual "Publish" in PB admin → triggers the existing GitHub Action to rebuild + deploy. The existing deploy workflow (`.github/workflows/deploy.yml`) already supports `workflow_dispatch` and runs on push to `main`; we add a `repository_dispatch` trigger so an external call can fire it.
- **Recommended path: a `pb_hooks` route on PocketBase** (`$http.send` is available in v0.38.1; `routerAdd` + `$apis.requireSuperuserAuth()` confirmed present). Steps for Phase 3:
  1. Add `repository_dispatch: { types: [pms-publish] }` to the `on:` block of `deploy.yml` (repo change — Manager-Lord's lane).
  2. Create `/home/fabrikgroup/pocketbase/pb_hooks/publish.pb.js`: `routerAdd("POST", "/pms-publish", handler, $apis.requireSuperuserAuth())` → handler does `$http.send({ url: "https://api.github.com/repos/Digital360-Indonesia/rework-kg/dispatches", method: "POST", headers: { Authorization: "Bearer "+$os.getenv("GH_DISPATCH_PAT"), "Accept":"application/vnd.github+json", "User-Agent":"kg-pms" }, body: JSON.stringify({ event_type: "pms-publish" }) })`. Protected by superuser auth so only a logged-in admin can fire it.
  3. The "Publish" button: simplest v1 = a tiny static admin page (or a bookmarklet/`fetch`) that POSTs to `/pb/pms-publish` with the admin's auth token. (PB admin UI can't add custom buttons natively in v0.38, so a small companion page is cleanest.)
  - **Secret Araya must provide (Phase 3):** a **fine-grained GitHub PAT** scoped to ONLY the `Digital360-Indonesia/rework-kg` repo with **Contents: read** + **Actions: read/write** (Actions:write is what allows dispatching). Stored as an env var on the systemd unit (`Environment=GH_DISPATCH_PAT=…` via a root-only drop-in, or an `EnvironmentFile` with `chmod 600`) — **never in the repo**. No Cloudflare token needed here (the existing workflow already purges CF).
  - Alternative (no PB hook): a Cloudflare Worker or a tiny protected URL that calls the same dispatch API. The pb_hooks route is preferred because it reuses the existing PB auth (the admin is already logged in) and keeps the PAT on the box, not at the edge.
