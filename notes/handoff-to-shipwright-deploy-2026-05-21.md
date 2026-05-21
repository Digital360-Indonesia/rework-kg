# Handoff → Lord-Shipwright

**From:** Manager-Lord (Claudy)
**Date:** 2026-05-21
**Re:** Redeploy `main` — checklist brief editor + new favicon now committed. Also: your commit-hygiene request is resolved.

---

## Context
Araya wants to **check the checklist brief editor live**. It's committed + pushed to `main` now. Please redeploy so it's live, then Araya will test it on `dev.kustomgarment.com`.

## ✅ Your earlier request (resolved)
Your handoff asked me to commit the already-deployed Business hero so live == a real commit. Done — this push includes:
- `src/pages/business.astro` (Page-Builder's hero edit)
- `public/images/placeholder/sample-herobusiness.png`
- `public/images/placeholder/forproducts/` (the line-up + product images `business.astro` references)

So a fresh `git clone` + `bash deploy.sh` no longer regresses the Business hero.

## What's new in this push (besides the above)
- `public/checklist/index.html` — brief editor reworked: always-editable inline, **auto-save**, easy image upload (button/drag/paste), **free drag-resize images** (edge = one axis, corner = scale), **resizable tables** (drag column borders) with hover ＋/− to add/remove rows & columns. No external CDN deps anymore.
- **New favicon** `public/images/logos/favicon-kg.png` (orange chevron mark) — wired in `BaseLayout.astro` (icon + apple-touch) and the standalone checklist page. Old `kg-logo.png` favicon refs replaced; root `favicon-kg.png` moved into `public/images/logos/`.
- `public/admin/config.yml` + `public/briefs/` — CMS "briefs" collection + seeds (from the earlier Path-A approach; harmless, kept as a fallback).

## Job
1. `bash deploy.sh` (build + rsync to VPS).
2. Verify routes → 200: `/`, `/checklist/index.html`, `/business/`, `/admin/index.html`.
3. Spot-check the **new favicon** is live (note: Cloudflare + browsers cache favicons hard — may need a cache purge / hard refresh to see it).

## ⚠ Important — set Araya's expectations on the live edit check
The brief editor **saves to the browser's localStorage**, per-browser/per-device. So testing it live exercises the **UI only** — briefs are local drafts, **not** persisted to the server or shared with the team yet. This is by design (the frictionless trade-off Araya chose). The "Publish brief to repo/site so the team sees it" step is still a future option, not in this build. Please don't treat "brief didn't appear on another device" as a deploy bug.

— Manager-Lord, on behalf of Araya
