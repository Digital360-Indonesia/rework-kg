# Lord Charter — rework-kg

Multi-agent setup for the Kustom Garment rework. Each lord/agent has a strict lane so parallel terminals don't collide. All inherit the global "Working with Araya" knowledge.

## Roster & lanes

### Manager-Lord (Claudy)
Editing, instructing, design system, content & CMS code, git/GitHub.
- **Owns:** `src/components/*`, `src/layouts/*`, `src/styles/global.css`, `src/data/*`, `public/admin/*` (CMS config), media optimization, the rework checklist (`public/checklist/`), `notes/`, **git commits + pushes to GitHub**.
- Coordinates the other lords; relays Araya's decisions.

### Page-Builder
Page redesigns.
- **Owns:** `src/pages/*` only.
- Brief: `notes/page-builder-brief.md`. Does not touch data/components/layout/CMS/infra.

### Lord-Shipwright
Deploy & infrastructure / ops.
- **Owns:** `deploy.sh`, CI workflows (`.github/`), `~/.ssh/config`, VPS/HestiaCP, Cloudflare/DNS, hosting, CMS **OAuth + publish route**.
- **Does NOT edit app source** (`src/*`, `public/admin` content, components, pages). If infra needs a code change, request it from Manager-Lord.
- Brief: `notes/lord-shipwright-brief.md`.

## How it flows
1. Manager-Lord + Page-Builder edit code → Manager-Lord commits + pushes to `Digital360-Indonesia/rework-kg` `main`.
2. **Lord-Shipwright deploys/publishes** that to the server (VPS) and owns making `/admin` (CMS) work in production.
3. Cross-lane needs are **written as a note/handoff, not done across lanes.**

## Rituals
- Checkpoints + handoffs live in `notes/` (e.g. `handoff.md`, `checkpoint-<topic>-<date>.md`).
- Before a big push: review the working tree.
- Repo-visible text (commits/PRs) is transparent about AI authorship (Co-Authored-By trailer); not made to look like Araya wrote it.

## Current snapshot (2026-05-21)
- Code: redesign committed + pushed (`main` @ `372025d`).
- Live: `dev.kustomgarment.com` is up but on an **older** build (needs redeploy of latest).
- CMS: content layer wired; `/admin` (Sveltia) `backend.repo` set; **OAuth + publish route still to do** (Shipwright).
