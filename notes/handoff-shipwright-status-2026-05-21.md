# Handoff → Manager-Lord (status)

**From:** Lord-Shipwright
**Date:** 2026-05-21 (evening)
**Re:** ✅ Redeploy done (checklist editor + favicon live). ✅ PocketBase live at `/pb/` (shared briefs working). ⚠ New Page-Builder WIP still not deployed. Optional: Cloudflare cache rule + pb_data backup.

> **UPDATE (evening):** PocketBase task is now COMPLETE — see the section below + `checkpoint-shipwright-pocketbase-2026-05-21.md`.
>
> **UPDATE 2:** Redeployed `9d70e3d` (Page-Builder's now-committed Business palette/product-grid refactor) — clean tree, used `deploy.sh` directly. Verified: `/business/` 200 with new palette live (Maroon/Olive/Khaki/Sage on-disk), `/`+`/checklist/`+`/admin/` still 200. Also cleaned up the leftover `zz-mgr-verify` PB record (briefs back to 0). The Page-Builder-WIP warning below is now RESOLVED.

---

## ✅ Task: redeploy `main` (your `handoff-to-shipwright-deploy`) — DONE
- Confirmed your commit-hygiene fix landed: HEAD = `889e50e` = `origin/main`, Business hero + images committed (`cf4c0ad`, `372025d`). Thank you.
- **Deployed committed-only.** When I went to deploy, the shared working tree had a *fresh* uncommitted change — `M src/pages/business.astro` (36/30 lines: a color-palette refactor `const C{}` + product-grid changes, clearly Page-Builder mid-flight, different from the now-committed hero edit). I did **not** ship it. Built `889e50e` in an **isolated `git worktree`** (node_modules symlinked) and rsynced that, so the live site = exactly the committed build and Page-Builder's WIP stayed untouched in the tree.
- **Verified live:** `/`, `/checklist/index.html`, `/business/`, `/admin/index.html` → 200. Favicon deployed (`/images/logos/favicon-kg.png`, 6800 B) → 200. (Favicon cache caveat noted — CF/browser cache it hard; hard-refresh to see the new mark.)
- Noted: checklist briefs are **localStorage per-browser** in this build (your expectation-setting acknowledged) — which is exactly what the PocketBase task below changes.

## ⚠ For Page-Builder / you
`src/pages/business.astro` has uncommitted WIP (color palette + product grid). It's **live-excluded** until committed. When it's ready, commit + ping me and I'll redeploy (or it rides the next deploy).

## ✅ Task: stand up PocketBase (`handoff-shipwright-pocketbase`) — DONE & smoke-tested
**Live at `https://dev.kustomgarment.com/pb/`. Shared `/checklist` briefs work now** — deployed app already has `PB='/pb'`, no rebuild needed. Full detail + decision log: `checkpoint-shipwright-pocketbase-2026-05-21.md`. Summary:
- PocketBase **v0.38.1**, systemd `pocketbase` (`127.0.0.1:8090`, enabled, restart-always). Collections **`briefs`** (item unique, html) + **`uploads`** (image ≤5 MB) with open v1 API rules.
- nginx **`location ^~ /pb/`** via HestiaCP-safe custom include (`nginx.conf_pocketbase`); `^~` so the static-regex doesn't 404 the admin-UI assets. Reloaded with **zero regression** (`/`, `/business/`, `/checklist/` still 200).
- Smoke test green: create → read-back (`totalItems:1`) → delete (204), through Cloudflare. Superuser creds **relayed to Araya directly** (not in repo).
- **Cloudflare cache-bypass rule = OPTIONAL, not blocking.** Confirmed it runs without it (CF doesn't cache the extensionless API or writes by default). Gave Araya the rule to add as a safety-net only — no CF access needed from me after all.
- **Follow-up offered to Araya:** daily `pb_data` backup cron (it's the single copy of all briefs) — awaiting yes.

— Lord-Shipwright, on behalf of Araya
