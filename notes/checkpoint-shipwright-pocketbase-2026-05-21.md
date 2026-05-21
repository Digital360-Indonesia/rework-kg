# Checkpoint — Lord-Shipwright: PocketBase live at /pb/

**Date:** 2026-05-21 (evening)
**Status:** ✅ DONE & smoke-tested. One optional step left for Araya (Cloudflare cache rule). Manager-Lord: it's **live at `/pb/`** — shared briefs work now, no rebuild needed.

---

## What's running
- **PocketBase v0.38.1** at `/home/fabrikgroup/pocketbase/`. systemd unit `pocketbase.service` (`User=fabrikgroup`, `ExecStart=… serve --http=127.0.0.1:8090`, `Restart=always`, **enabled** — survives reboot). Bound to localhost only; reachable solely via the nginx proxy.
- **Data:** `/home/fabrikgroup/pocketbase/pb_data/` — ⚠ **the only copy of the briefs. Needs a backup** (see follow-up).
- **Superuser:** created. Credentials **relayed to Araya directly** (deliberately NOT written in this repo note). Admin UI: `https://dev.kustomgarment.com/pb/_/`.

## Collections (public API rules per Araya's open v1 model)
- **`briefs`** (base): `item` (text, required, **unique index**), `html` (text), `created`/`updated` (autodate). Rules: List/View/Create/Update = public `""`, Delete = locked (admin only).
- **`uploads`** (base): `file` (single, **≤5 MB**, MIME `image/jpeg,png,gif,webp,svg+xml`). Rules: Create + View = public, List/Update/Delete = locked.

## nginx (HestiaCP-safe)
- Added `/home/fabrikgroup/conf/web/dev.kustomgarment.com/nginx.conf_pocketbase` — picked up by the vhost's existing `include …/nginx.conf_*;` glob, so a **HestiaCP panel rebuild won't clobber it**.
- Block: `location ^~ /pb/ { proxy_pass http://127.0.0.1:8090/; … }`.
  - **`^~`** (vs the brief's plain `/pb/`) is deliberate: stops the vhost's static-file regex `location ~* \.(js|css|…)$` from hijacking the PB admin-UI assets and 404-ing them.
  - Trailing slash on `proxy_pass` strips `/pb/` → `/pb/api`→`/api`, `/pb/_/`→`/_/`.
  - `X-Forwarded-Proto https` set explicitly: CF is **Flexible SSL** here (origin listens on :80 only, no `.ssl.conf`), so origin sees http but the real client is https.
- `nginx -t` passed (only pre-existing `ssl_stapling` warns on other domains), reloaded with zero regression — `/`, `/business/`, `/checklist/` still 200.

## Smoke test (through Cloudflare) — all green
`/pb/api/health` 200 · `/pb/_/` 200 · POST a brief → read back (`totalItems:1`) → deleted (204). Deployed checklist app has `PB='/pb'`, builds `${PB}/api/...` at runtime → shared briefs functional now.

## ⏳ Left for Araya (optional, instructions given in chat)
**Cloudflare cache-bypass rule for `/pb/*`.** Not strictly required (CF doesn't cache the extensionless API by default — smoke test passed without it), but recommended as a safety net against any future "cache everything" rule. I lack CF dashboard/API access, so Araya adds it.

## Follow-up (not blocking)
- **Back up `pb_data/`.** Suggest a daily cron: `sqlite3`-safe copy or `pocketbase` backup API → tar to `/home/fabrikgroup/backups/` (+ optional offsite). Can wire on request.
- Open write rules = anyone with the link can edit/wipe briefs (5 MB image-only cap limits upload abuse). Araya accepted for v1; a passcode / Cloudflare Access can be added later.

— Lord-Shipwright, on behalf of Araya
