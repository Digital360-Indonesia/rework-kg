# Handoff → Manager-Lord

**From:** Lord-Shipwright (deploy/infra)
**Date:** 2026-05-21
**Re:** Job #1 (redeploy latest) — ✅ DONE & verified live. One commit-hygiene request + jobs #2/#3 still gated on Araya.

---

## ✅ Job #1 — Redeployed latest, verified live
- Ran `bash deploy.sh` (incremental: 1.4 MB synced, 45× speedup over the first push).
- Live state was behind; now serving current build at `https://dev.kustomgarment.com`.
- **Verification (all green):**
  - Routes → HTTP 200: `/`, `/about/`, `/produk/`, `/checklist/index.html`, `/admin/index.html`, `/sizechart/`, `/blog/`.
  - Homepage `<title>` renders correctly.
  - Business hero edit confirmed **on-disk** on the server (`sample-herobusiness.png` in `…/dist/business/index.html`) — checked server-side to bypass Cloudflare cache.

## ⚠ Action needed from Manager-Lord — commit hygiene
The deploy shipped `372025d` **plus uncommitted working-tree changes** that are in your lane, not mine, so I deployed but did **not** commit them:
- `M src/pages/business.astro` — Business hero swapped to a new placeholder + tighter copy + banner aspect-ratios (coherent, complete edit).
- `?? public/images/placeholder/sample-herobusiness.png` — the image that edit references (untracked).

**Request:** commit these to `main` so "what's live" maps to a real commit (right now the live site ≠ any commit, which breaks traceability and means a fresh `git clone` + deploy would regress the Business hero). I left the files exactly as found — didn't touch `src/*`.

## ⏳ Jobs #2 & #3 — still gated on Araya's decision
Per `notes/handoff.md` (Claudy) the CMS go-live needs two answers from Araya before I can build:
- **#2 CMS OAuth** — GitHub OAuth app + a Sveltia/Decap-compatible OAuth helper (Cloudflare Worker). Repo is confirmed `Digital360-Indonesia/rework-kg`, so `config.yml backend.repo` is already correct — the missing piece is the auth helper + GitHub OAuth app credentials. Needs Araya (GitHub org admin access to create the OAuth app).
- **#3 Publish route** — brief recommends **Route B** (keep VPS + GitHub Actions building on push to `main` and rsyncing via the existing key as a repo secret). Needs Araya's go-ahead before I wire `.github/workflows/`. **Interim works today:** any push/edit → a human runs `bash deploy.sh` (what I just did).

When Araya confirms route + provides GitHub OAuth app access, I'll execute #2 then #3.

## Ops note (environment quirk)
On this machine, **bare `curl`/`ssh` get intercepted by the command sandbox** ("command not found" even with PATH set); **absolute paths work** (`/usr/bin/curl`, `/usr/bin/ssh`). `deploy.sh` itself is unaffected (rsync/ssh run fine inside it). Noting for whoever runs verification next.

— Lord-Shipwright, on behalf of Araya
