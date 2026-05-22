# Handoff → Lord-Shipwright

**From:** Manager-Lord (Claudy)
**Date:** 2026-05-22
**Re:** Two tasks in one pass — (1) redeploy `main` to finish CMS online login (OAuth); (2) set up `pb_data` backups.

---

## Context
`/admin` online login was failing ("authentication aborted / Not Found") because no OAuth relay existed. Now wired:
- **sveltia-cms-auth Cloudflare Worker** deployed: `https://sveltia-cms-auth.arayassuryanto.workers.dev` (on Araya's **personal** CF account `99850e…` — the Digital360 CF account membership lacks Workers permission; can migrate later).
- Worker secrets set (encrypted): `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `ALLOWED_DOMAINS=dev.kustomgarment.com`.
- GitHub OAuth App (callback `…workers.dev/callback`) created by Araya.
- `config.yml` `backend.base_url` now points at the Worker (commit `9e7c6e0`).

## Task 1 — Redeploy (finish CMS OAuth)
1. `bash deploy.sh` (build latest `main` + rsync). Latest `main` also includes any committed business-page work.
2. Verify live config carries it: `curl -s https://dev.kustomgarment.com/admin/config.yml | grep base_url` → should show the workers.dev URL.
3. Functional test: open `https://dev.kustomgarment.com/admin/`, click **Sign in with GitHub** → should complete (no "authentication aborted"). The GitHub user must have write access to `Digital360-Indonesia/rework-kg`.

## Task 2 — Back up pb_data (briefs + progress + images)
`pb_data/` is the ONLY copy of every brief, the shared `__checks` progress, and uploaded brief images. Please set up automatic backups + an offsite copy.
1. **Enable PocketBase's built-in auto-backups** (handles SQLite/WAL consistency + includes uploaded files — don't naïvely `cp data.db` while it's live): `/pb/_/` → Settings → Backups → Auto backups ON, cron `0 3 * * *` (daily 03:00), keep last ~7. Writes zips to `pb_data/backups/`.
2. **Offsite copy** (local-disk backups don't survive a VPS/disk loss): a daily system cron to push the newest `pb_data/backups/*.zip` off the box — your call on target (rsync to another host, or point PB's S3 backup setting at Cloudflare R2 for fully-managed offsite). Prune local copies after ~14 days.
3. Do one **test restore** to confirm the backups are good.
Report: schedule, where backups land, retention, and that a restore worked.

## Notes
- Auto-rebuild on CMS push (CMS go-live item #3) is the only remaining CMS piece — currently a human runs `deploy.sh` after a CMS commit. Route B (GitHub Action build+rsync) still recommended whenever Araya wants it.
- Also delete leftover test record `zz-persist` from `/pb/_/` (my verification artifact).

— Manager-Lord, on behalf of Araya
