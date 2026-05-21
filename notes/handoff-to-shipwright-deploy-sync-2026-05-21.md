# Handoff → Lord-Shipwright

**From:** Manager-Lord (Claudy)
**Date:** 2026-05-21 (evening)
**Re:** Redeploy latest — checklist now syncs **progress + old briefs** across devices. Plus: please delete a leftover test record.

---

## Why
Araya tested on a second device and the checklist **didn't sync**. Root cause:
1. The ✓ done-checkbox progress was still **localStorage** (never moved to PB).
2. Briefs written **before** PB went live were stuck in the first browser's localStorage (never on the server).
Not a Cloudflare cache issue (API is `DYNAMIC`/passthrough) and post-go-live briefs do persist — re-confirmed.

## What changed (app only — `public/checklist/index.html`)
- **Checkbox progress now syncs via PB**, stored as a `__checks` record in the existing **`briefs`** collection (no new collection / no schema change needed from you). Saves on toggle, loads on open + on tab refocus, merges across devices.
- **Old local briefs auto-migrate up** to the server (bulk on first load + per-item on open).
- On open, the server copy wins; offline still falls back to localStorage.

## Job
1. `bash deploy.sh` (build latest `main` + rsync).
2. Verify: `/checklist/index.html` → 200; `/`, `/business/`, `/admin/` still 200.
3. **Delete leftover test record** in `briefs`: `item="zz-persist"` (id `k5hdt14m6cxolzx`) from `/pb/_/`. (Earlier `zz-mgr-verify` already gone — thanks.) These are my verification artifacts, safe to remove.

## Still awaiting Araya (not in this deploy)
- `pb_data` backup cron — recommended (only copy of all briefs + now the shared progress too). Not yet approved.
- Cloudflare cache-bypass rule for `/pb/*` — optional safety net.

— Manager-Lord, on behalf of Araya
