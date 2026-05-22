# Checkpoint — Manager-Lord: shared checklist (briefs + progress) live

**Date:** 2026-05-21 (evening)
**Status:** ✅ DONE & verified cross-device by Araya. The `/checklist` page's brief notes **and** done-checkbox progress now sync across devices via PocketBase.

---

## What shipped (commits on `main`)
- `cf4c0ad` — checklist brief editor reworked: always-editable inline, auto-save, easy image upload (button/drag/paste), **free drag-resize images** (8 handles: edges = one axis, corners = aspect scale), **resizable tables** (drag column borders; hover ＋/− to add/remove rows & cols). New favicon. Self-contained (no CDN deps).
- `889e50e` — briefs storage moved off localStorage to **PocketBase** at same-origin `/pb` (Shipwright stood up PB). Images upload to PB `uploads`, editor stores URL. localStorage kept as offline fallback.
- `9d70e3d` — Page-Builder's business page refactor (separate lane).
- `19fe101` — **fixed cross-device sync** (the bug Araya hit): see below.

## The sync bug & fix (19fe101)
Araya opened the checklist on a 2nd device → nothing synced. Two causes:
1. The ✓ **done-checkbox progress** was still localStorage (never moved to PB).
2. Briefs written **before** PB went live were stuck in the first browser's localStorage.

Fix (app-only, `public/checklist/index.html`):
- Progress now persists to PB as a `__checks` record (JSON map) in the existing `briefs` collection. Saves on toggle, loads on open + on tab refocus, merged across devices.
- Old local briefs auto-migrate up (bulk on first load, guarded by `kg-brief-migrated`; + per-item on open).
- On open the **server copy wins**; offline falls back to localStorage.

## Architecture (for whoever advances this)
- **Backend:** PocketBase on the VPS, same-origin `/pb/` (see [[project-kg-pocketbase]] memory + `checkpoint-shipwright-pocketbase-2026-05-21.md`).
- **`briefs` collection:** one record per checklist item (`item` unique, `html`) + one special `item="__checks"` record holding the progress JSON.
- **`uploads` collection:** image files (≤5 MB), public create/view.
- **Client:** `pbLoad`/`pbSave` (upsert by item id), `pbSaveQueued` (serialize per id → no duplicate-create race), `pbUpload`. localStorage = offline cache.

## Decision log (the *why*)
- **PocketBase over Supabase/Cloudflare:** Araya chose self-hosted to own the data; we already have the VPS + Shipwright. Single binary, low ops.
- **Open read/write (no auth) for v1:** Araya's call — internal tool, speed over gating. Risk accepted (anyone with the link can edit/wipe; 5 MB image-only cap limits upload abuse). Passcode / Cloudflare Access is the later upgrade.
- **Same-origin `/pb/` (not a subdomain):** avoids CORS entirely; nginx `location ^~ /pb/` reverse-proxies to `127.0.0.1:8090`.
- **Progress stored in `briefs` as `__checks` (not a new collection):** zero extra schema/Shipwright work; the checklist never queries that id as an item so it's invisible in the UI.
- **localStorage kept as fallback + server-wins-on-open + auto-migrate:** never lose edits offline; old local-only briefs become shared without manual export.
- **Inline editor, not the CMS:** Araya explicitly rejected CMS-backed briefs (Sveltia Path A) and the File System Access folder-pick — wanted Notion-like editing right in the checklist.

## To make it more advanced (future)
- **Realtime:** PocketBase SSE `subscribe` on `briefs` so edits/checks appear live without tab refocus.
- **Access control:** passcode or Cloudflare Access in front of `/checklist` + tighter PB rules, if spam/abuse appears.
- **Per-item progress record** (instead of one `__checks` JSON) if concurrent editing grows — avoids last-write-wins clobber.
- **Attribution/history:** who edited a brief / who checked an item (PB auth + a field).

## Pending (awaiting Araya)
- `pb_data` **backup cron** — recommended; it's now the only copy of briefs **and** progress.
- Cloudflare cache-bypass rule for `/pb/*` — optional safety net.
- Leftover test record `item="zz-persist"` to delete from `/pb/_/` (asked Shipwright).

— Manager-Lord, on behalf of Araya
