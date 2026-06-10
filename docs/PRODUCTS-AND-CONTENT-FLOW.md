# Kustom Garment — products & content flow

> For everyone (devs + AI agents) touching products, the catalog, or site content.

---

## TL;DR

| You want to change… | Edit here | How it goes live |
|---|---|---|
| **A product** (fabric, style, pricing, archetypes) | `src/data/products/catalog.json` | edit → `npm run build` → `bash deploy.sh` |
| **A portfolio item** (client products, segments, specs) | `src/data/portfolio.json` | edit → `npm run build` → `bash deploy.sh` |
| **Fabric care/feel** | `src/data/fabric-content.json` | edit → `npm run build` → `bash deploy.sh` |
| **Homepage content / section media / images** | **Sveltia CMS** → `/admin` | save in CMS → auto-deploys |

**The single most important rule:** `catalog.json` is the **single source of truth**. Edit it, build, deploy. No PocketBase, no sync, no intermediate step.

---

## 1) Products = catalog.json

- **Source of truth:** `src/data/products/catalog.json`. The build reads it directly via `src/data/products/catalog-source.mjs`.
- **Edit a product:** edit the JSON file in the repo. No admin UI — direct file editing.
- **Deploy:** `bash deploy.sh` (clean build + rsync to VPS). No CI auto-deploy — manual only.

## 2) Content & media = Sveltia CMS

Homepage sections, hero/section media, copy blocks, etc. are managed in **Sveltia** at `/admin` (config in `public/admin/config.yml`). Saving in Sveltia commits + auto-deploys. This is **separate** from products — don't put product data here.

---

## Deploy notes
- Deploy manually with `bash deploy.sh` — no CI auto-deploy (GitHub Actions workflow removed).
- After adding a dependency, run `npm install` and **commit the updated `package-lock.json`** — otherwise `npm ci` fails the build.

## The 30-second mental model
```
catalog.json + portfolio.json + fabric-content.json  ──(npm run build)──▶  dist/  ──(bash deploy.sh)──▶  live site
      (edit in repo)                                                                                      dev.kustomgarment.com

Sveltia /admin ──(save = commit)──▶ auto-deploy   (homepage content + media, separate)
```
