# Handoff → Manager-Lord

**From:** Claudy (summoned session, 2026-05-21 afternoon)
**Re:** VPS deploy done; CMS admin go-live is decision-blocked on Araya.

---

## TL;DR
`https://dev.kustomgarment.com` is **live** with the real Astro build (was a placeholder). Deploy is now a one-command pipeline. Next requested work — making the `/admin` CMS functional for the team — is **paused awaiting Araya's call** on two forks (GitHub + publish route). Nothing committed to git; repo is still local + uncommitted on `main`.

## Done this session
1. **SSH access established.** Araya can `ssh kg-vps` passwordless (alias in `~/.ssh/config`). Hostinger VPS, `72.61.214.241` / `srv1187723.hstgr.cloud`, HestiaCP at `:8083`, Cloudflare in front. Working key is `~/.ssh/id_ed25519_new` (not `id_ed25519` — that one's denied).
2. **Mapped the pre-provisioned hosting.** Devs had set up the folder, `dist/` subfolder, nginx vhost, Cloudflare — but only placeholder files ("Aku araya"). nginx doc-root = `/home/fabrikgroup/web/dev.kustomgarment.com/public_html/dist` (HestiaCP user `fabrikgroup`).
3. **Deployed the real site.** Built locally (26 pages, 82 MB) and rsynced into `dist/`. Verified: HTTP 200, correct title, real HTML on server.
4. **Deploy pipeline.** `rework-kg/deploy.sh` → `astro build` then `rsync -avz --delete dist/ kg-vps:.../dist/`. Redeploy = `bash deploy.sh`. (This is **model A** — build-on-Mac + rsync.)
5. **Memory + notes.** Saved `project_kg_vps_deploy.md` to Claudy memory; wrote `checkpoint-2026-05-21-vps-deploy.md` (full infra map + decision log).

## In flight / blocked — needs Araya
Making `/admin` (Sveltia CMS) work for the team. The CMS commits edits to GitHub, so it needs three things; I put the decision to Araya and am waiting:
- **(1) GitHub repo** — code is local-only; must be pushed. Gating question: does Araya have a GitHub account, or do the devs own git? (Unanswered.)
- **(2) Login/OAuth** — Sveltia auth helper (Cloudflare Worker). One-time.
- **(3) Auto-publish route** — the open fork:
  - **Route A — Cloudflare Pages** (Claudy's rec): host auto-builds on commit; repoint `dev.kustomgarment.com` DNS off the VPS to Pages. Least to maintain. *Trade-off: site stops using the VPS.*
  - **Route B — keep VPS + GitHub Actions:** Actions builds on commit and rsyncs to the VPS (reuses the key + `deploy.sh`). Keeps the devs' setup. *Trade-off: more moving parts.*

`config.yml` is already well-formed (collections: settings/homepage/categories/blog); only `backend.repo: OWNER/REPO` is a placeholder blocking go-live.

## Important context for Manager-Lord
- **No lord-charter.md exists** in this project — Claudy ran free-form, not under a charter scope. If the lord system is meant to be active here, the charter still needs creating.
- **Two-agent boundary from the morning still holds** (per `checkpoint-2026-05-21.md`): page agent owns `src/pages/*`; Claudy owns `src/data/*`, components, layout, `global.css`, `public/admin/*`, media. This session only touched deploy tooling (`deploy.sh`, `~/.ssh/config`) + notes — no collision.
- **Nothing is committed.** Repo is uncommitted on `main`. Whoever does the GitHub push (step 1 above) should review the working tree first.

## Recommended next action
Get Araya's answer on GitHub (account vs devs) and publish route, then execute step 1→3 in order. Step 1 (GitHub repo) is shared by both routes, so it's safe to start regardless of the route choice.

— Claudy, on behalf of Araya
