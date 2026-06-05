# Handoff — next pickup

**From:** Manager-Lord (Claudy)
**Date:** 2026-06-05
**State:** repo clean + fully pushed (main). Live site healthy, **PocketBase-sourced**. Session checkpoint: `notes/checkpoint-pms-and-home-2026-06-05.md`. PMS detail: `notes/pms-charter.md`.

## TL;DR
The big build this session is **DONE & LIVE**: the PocketBase **PMS** (Phases 1–4) + the homepage Section-3 overhaul + the category→product→customizer wiring. Araya manages products at `/pb/_/` and publishes via the **Terbitkan** button at `/pb/publish`. **Araya's devs are now doing SEO + other updates** — we pause here and wait for them.

## What the devs (and next-me) MUST know
1. **Products live in PocketBase now, not `catalog.json`.** Build runs `PMS_SOURCE=pb`; `catalog.json` is only a fallback. Edit products/fabrics/styles/decorations/photos/prices in PocketBase admin (`/pb/_/`), publish with `/pb/publish`. SEO/meta/layout work is separate and unaffected.
2. **Deploys can intermittently fail** on a GitHub-runner→VPS network timeout — just **re-run the failed Action** (and don't hammer re-runs back-to-back; Hostinger rate-limits — wait ~30–60 min). Live site is unaffected when a deploy fails.

## Parked follow-ups (when Araya wants them)
- **Self-hosted GitHub runner on the VPS** — the durable fix for the deploy-connectivity flakiness (build+deploy on the box, no runner→VPS hop). ~1 Lord-Shipwright session. Recommended.
- **Cloudflare purge secrets** (`CLOUDFLARE_ZONE_ID` + `CLOUDFLARE_API_TOKEN`) still unset — purge step red-X's, non-blocking.
- **Copy the PB migration file into the repo** (`pocketbase/pb_migrations/`) for version control + fold the widened select values into it (ask Shipwright to fetch it from the box).
- **Personal page** = lookbook (no product grid); decide later if it should list its 5 products.

## Active rituals / scope
- Lord-charter active (`notes/lord-charter.md`): Manager-Lord owns components/data/CMS/git; Lord-Shipwright owns VPS/CI/PocketBase/Cloudflare; Page-Builder owns `src/pages/*`.
- No-auto-push: changes stay on localhost until Araya's explicit go (CMS/PMS saves are the exception). Deploys build from PocketBase.

— Manager-Lord, acting on behalf of Araya
