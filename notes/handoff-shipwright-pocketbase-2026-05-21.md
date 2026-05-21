# Handoff → Lord-Shipwright

**From:** Manager-Lord (Claudy)
**Date:** 2026-05-21
**Re:** Stand up **PocketBase** on the VPS so the rework checklist's brief notes are shared across the team (not per-browser localStorage).

---

## Why
The `/checklist` page now has an inline brief editor (text, drag-resize images, tables). Araya wants the briefs **shared** (anyone who opens the page reads/writes the same data) and self-hosted on our VPS. App code is already wired to talk to PocketBase at the **same-origin path `/pb/`** (so no CORS). It falls back to localStorage when `/pb` is unreachable, so nothing is set up = no breakage, just not shared yet.

**Access model (Araya's choice): open — anyone with the link can read/write.** No auth gate for v1. (We can add a passcode / Cloudflare Access later.)

## What the app expects from you
A reachable PocketBase with two collections and **public** API rules, proxied at `https://dev.kustomgarment.com/pb/`.

### 1. Install + run PocketBase (systemd, bound to localhost)
- Download latest stable linux_amd64 from `github.com/pocketbase/pocketbase/releases` into e.g. `/home/fabrikgroup/pocketbase/`.
- Bind to **127.0.0.1:8090** (only nginx reaches it). systemd unit:
  ```ini
  [Unit]
  Description=PocketBase
  After=network.target
  [Service]
  Type=simple
  User=fabrikgroup
  WorkingDirectory=/home/fabrikgroup/pocketbase
  ExecStart=/home/fabrikgroup/pocketbase/pocketbase serve --http=127.0.0.1:8090
  Restart=always
  [Install]
  WantedBy=multi-user.target
  ```
- `systemctl enable --now pocketbase`. Data persists in `pb_data/` (back this up — it's the briefs).
- First run: create the admin (superuser) account; you'll use it to define collections + reach `/pb/_/` admin UI.

### 2. nginx reverse proxy at `/pb/` (HestiaCP custom include for dev.kustomgarment.com)
```nginx
location /pb/ {
    proxy_pass http://127.0.0.1:8090/;   # trailing slash strips the /pb/ prefix
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Connection '';
    proxy_buffering off;                  # SSE/realtime friendly
    client_max_body_size 10m;            # image uploads
}
```
So `/pb/api/...` → PocketBase `/api/...`, and the admin UI is at `/pb/_/`.

### 3. Cloudflare — bypass cache for the API
Add a cache rule: `dev.kustomgarment.com/pb/*` → **Bypass cache** (it's a dynamic API; cached GETs would serve stale briefs).

### 4. Create the collections (admin UI at `/pb/_/`)
**Collection `briefs`** (base):
- `item` — Plain text, **required**, **unique** (one record per checklist item id, e.g. `g-nav`).
- `html` — Plain text (no max). Holds the brief's HTML.
- **API rules → all PUBLIC except delete:** List, View, Create, Update = empty string `""` (public). Delete = leave locked (admin only).

**Collection `uploads`** (base):
- `file` — File, single, **Max size 5 MB**, **MIME types `image/*`**.
- **API rules:** Create = `""`, View = `""` (so uploaded images are publicly served). List/Update/Delete = locked.

(If you prefer, I can hand you a `pb_schema.json` to import instead of clicking — ask.)

### 5. Smoke test (server-side; bypasses Cloudflare cache)
```bash
# create a brief
/usr/bin/curl -s -X POST https://dev.kustomgarment.com/pb/api/collections/briefs/records \
  -H 'Content-Type: application/json' -d '{"item":"smoke","html":"<p>hi</p>"}'
# read it back
/usr/bin/curl -s "https://dev.kustomgarment.com/pb/api/collections/briefs/records?filter=(item='smoke')"
```
Expect JSON with the record. Delete the smoke record from the admin UI after.

## When done
- Tell me it's live at `/pb/` — I'll confirm `PB='/pb'` in `public/checklist/index.html` (already set) and we redeploy the page.
- The app needs **no rebuild for PB** beyond what's already committed; once PB answers at `/pb/`, expanding a checklist item loads the shared brief and edits sync for everyone.

## Notes / risks (acknowledged)
- Open write rules = anyone with the URL can edit/wipe briefs and upload images (5MB image-only cap limits abuse). Araya accepted this for v1.
- Back up `pb_data/` — it's the only copy of the briefs.

— Manager-Lord, on behalf of Araya
