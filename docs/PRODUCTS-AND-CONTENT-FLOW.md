# Kustom Garment — products & content flow (READ THIS FIRST)

> ⚠️ **June 2026 update — partially superseded.** The live build currently sources from
> **`catalog.json`, NOT PocketBase** (`PMS_SOURCE=pb` is off), and products are now the
> 156 portfolio clients. **Read `docs/DEVS-HANDOFF-2026-06.md` first** — it explains the
> PocketBase bypass, the broken CI deploy, and the new per-item product model.

> For everyone (devs + AI agents) touching products, the catalog, or site content.
> KG runs **two managed systems**. Editing the wrong place = your change won't go live.

---

## TL;DR

| You want to change… | Edit here | How it goes live |
|---|---|---|
| **A product** (name, price, badge, photos, fabric, description) | **PocketBase PMS** → `https://dev.kustomgarment.com/pb/_/` | click **Terbitkan** at `/pb/publish` → rebuilds + deploys |
| **Homepage content / section media / images** | **Sveltia CMS** → `/admin` | save in CMS → auto-deploys |
| **Technical config** (fabric specs, style options, pricing rules, garment types) | `src/data/products/catalog.json` (code) | edit → run the **sync** (below) → push |

**The single most important rule:** the live build sources **products from PocketBase**, NOT from `catalog.json`. Set in `.github/workflows/deploy.yml` → `PMS_SOURCE=pb`. So **editing `catalog.json` alone does NOT update the live products** — you must sync it into PocketBase (below).

---

## 1) Products = PocketBase PMS

- **Live source of truth:** PocketBase. At build time, `src/data/products/catalog-source.mjs` sees `PMS_SOURCE=pb` and loads the catalog from PocketBase via `src/data/products/pms-adapter.mjs`. (If PocketBase is unreachable, it falls back to the committed `catalog.json` so the site never breaks.)
- **Edit a product (no code):** PocketBase admin `https://dev.kustomgarment.com/pb/_/` → `products` collection. Fields: name, slug, segment, garment_type, badge, rating, reviews, price_min/max, base_price_per_pc, price_note, hide_price, default_fabric, default_color, upgrade/downgrade_fabrics, locked_spec (json), default_decoration (json), **gallery (json — static image paths)**, description, care.
- **Publish:** after editing, open `https://dev.kustomgarment.com/pb/publish` → **Terbitkan ke situs live** → fires a GitHub `repository_dispatch` → the deploy rebuilds from PocketBase + ships. (~1–2 min.)
- **Product images / gallery:** stored as **static paths** (e.g. `/images/portfolio/<client>/<img>.webp`) in the product's `gallery` field — the images live in `public/images/portfolio/...` in the repo. We do **not** upload product images into PocketBase.

## 2) Authoring/bulk catalog = `catalog.json` + the sync script

`src/data/products/catalog.json` is the **authored source** for the whole catalog shape: `garment_types` (with `style_options`), `fabrics`, `colors`, `decoration_types`, `pricing_rules`, and the `archetypes` (products). The portfolio-driven catalog the devs built lives here.

To push `catalog.json` INTO PocketBase (so it goes live), run the **sync** — it upserts every collection to match the file and deletes anything no longer in it (so PocketBase ends up matching `catalog.json` 1:1):

```bash
# from repo root, with a PocketBase superuser:
PB_EMAIL='you@gmail.com' PB_PASSWORD='your-pb-admin-password' node scripts/sync-pms.mjs
```

⚠️ The sync **overwrites** PocketBase from `catalog.json`. So pick ONE workflow and don't mix:
- **Bulk / structural changes** (new fabrics, style options, pricing, many products) → edit `catalog.json`, run the sync. This is the devs' lane.
- **One-off product tweaks** (a price, a badge) → edit directly in the PocketBase admin + publish. Do NOT also re-sync, or your admin edit gets overwritten by `catalog.json`.

## 3) Content & media = Sveltia CMS

Homepage sections, hero/section media, copy blocks, etc. are managed in **Sveltia** at `/admin` (config in `public/admin/config.yml`). Saving in Sveltia commits + auto-deploys. This is **separate** from products — don't put product data here.

---

## Deploy notes
- Push to `main` **or** the `/pb/publish` button → GitHub Action builds with `PMS_SOURCE=pb` → rsyncs to the VPS. The runner→VPS rsync **intermittently times out** (network blip) — if a deploy fails on "Set up deploy key" / rsync, just **re-run the failed job**; it's not a code problem.
- After adding a dependency, run `npm install` and **commit the updated `package-lock.json`** — otherwise `npm ci` fails the build (this has bitten us).

## The 30-second mental model
```
catalog.json  ──(scripts/sync-pms.mjs)──▶  PocketBase  ──(build, PMS_SOURCE=pb)──▶  live site
   (authoring)                              (live source +                          dev.kustomgarment.com
   fabrics/styles/pricing/products          no-code edits via /pb/_/)
                                            publish: /pb/publish

Sveltia /admin ──(save = commit)──▶ auto-deploy   (homepage content + media, separate)
```
*(Future: a custom PMS dashboard on top of PocketBase will replace the raw admin for nicer no-code product editing — PocketBase stays the backend.)*
