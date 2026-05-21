# Handoff → Manager-Lord (from the Page-Builder agent)

**From:** Page-Builder agent (the `src/pages/*` lane, per `notes/page-builder-brief.md`)
**Date:** 2026-05-21
**Re:** Scope clarification + page-work status. Deploy/CMS decisions belong to you, not me.

---

## Why this note exists (the mix-up)
Araya was talking to **this** terminal — the page-builder agent — but addressed it as if it were the **Manager-Lord**, and asked it to read the deploy handoff (`notes/handoff.md`) written by the earlier summoned Claudy. I read it and reported it back, but **deploy / VPS / CMS are manager scope, not the page-builder's.** This note re-routes that topic to you and records exactly what I did and did not touch, so nothing is ambiguous.

## Recap of the earlier Claudy handoff (so it's all in one place)
Per `notes/handoff.md` + `notes/checkpoint-2026-05-21-vps-deploy.md`:
- **`dev.kustomgarment.com` is live** with the real Astro build (was a placeholder).
- **Deploy pipeline:** `rework-kg/deploy.sh` = `astro build` + `rsync` to the VPS (`ssh kg-vps`, HestiaCP user `fabrikgroup`, doc-root `…/public_html/dist`). Redeploy = `bash deploy.sh`. (Model A: build-on-Mac + rsync.)
- **CMS `/admin` (Sveltia) go-live is blocked on three of Araya's decisions** — all manager-level:
  1. **GitHub repo** — code is local-only, must be pushed. Owner = Araya or the devs?
  2. **OAuth login** — Sveltia auth helper (Cloudflare Worker), one-time.
  3. **Publish route** — Route A (Cloudflare Pages, auto-build on commit, DNS off the VPS; Claudy's rec) vs Route B (keep VPS + GitHub Actions rsync).
- **Nothing is committed to git** — repo is uncommitted on `main`. Review the working tree before any push.
- **No `lord-charter.md` exists** in this project.

→ **These three decisions are yours (Manager-Lord) / Araya's. The page-builder did not act on any of them.**

## Did the page-builder edit anything about the deploy/CMS topic? — NO
On the manager-scope topic, my actions were **read-only**:
- Read `handoff.md` and `checkpoint-2026-05-21-vps-deploy.md`.
- Ran `curl` checks (localhost + the live site) to compare versions.
- **Did NOT** run `deploy.sh`, **did NOT** commit to git, **did NOT** touch `deploy.sh`, `public/admin/*`, `~/.ssh/config`, CMS config, infra, `global.css`, `BaseLayout`, `components/*`, or `src/data/*`.

## What the page-builder actually changed this session (my lane only)
All edits are under `src/pages/` per the brief's guardrails:
1. **`produk.astro`** — full redesign (was WP-era). Product hub + category links + WA CTAs. ✅ live.
2. **`sizechart.astro`** — full redesign. 6 tabbed size tables (real KG-published measurements) + measure guide. ✅ live.
3. **`blog/index.astro`** + **`blog/[slug].astro`** — restyled off the WP "uicore" theme to the design system; content-collection logic + schema untouched. ✅ live.
4. **`business.astro`** — new banner hero (placeholder wide image — needs a real landscape team photo), customer-logo slider, category-peek row, hero text-size reduction. ✅ live **except** the latest text-size tweak (needs one `deploy.sh` run to go live).

**Working-tree note for whoever does the GitHub push:** the many *other* modified/untracked files in `git status` (`global.css`, `BaseLayout`, `components/sections/*`, `src/data/*`, `deploy.sh`, `public/admin/`, `public/videos/*`, `notes/`, root screenshots) are from the **earlier Claudy sessions**, not this one.

## Still open on the page side (page scope — I'll continue these with Araya, not you)
- **katalog-jersey-baseball** — blocked: the KG jersey catalog PDF + jersey photos were never migrated (only Level Garment assets exist in the sibling repo).
- **care.astro** — scope decision pending (How-to-Order vs contact).
- **portfolio/index** — decision pending (gallery vs redirect to portfolio.kustomgarment.com).
- **Type scale** — proposed a shared scale (Display/H2/H3/CTA/Lead). Long-term it should live as `--fs-*` tokens in `global.css` `@theme` — **that's a manager edit** (global.css is your file). Flagging for you to add when convenient; until then the page-builder uses the literal `clamp()` values as a convention.

— Page-Builder agent, on behalf of Araya
