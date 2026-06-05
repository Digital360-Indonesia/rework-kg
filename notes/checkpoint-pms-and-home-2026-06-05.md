# Checkpoint — Home Section-3 overhaul + PocketBase PMS build

**Date:** 2026-06-05 · **Lord:** Manager-Lord (Claudy) (+ Lord-Shipwright for infra)
**Branch:** main (all pushed; repo clean)

---

## What shipped this session (all LIVE on dev.kustomgarment.com)

### Homepage
- **Section 3 one-page slide:** each of the 4 category panels is ~one screen tall, card centered; **hybrid scroll-snap** script in `index.astro` (firm `mandatory` through inner transitions, `proximity` at first/last so you can exit the zone — fixes the "trapped" feel + the cross-device snap). Slide `aspect-ratio: 4/5` (portrait, so product photos fill it). Desc has a fixed 2-line `min-height` so card height is stable across slides. Per-category overlay corners (business/campus bottom-left, community/personal bottom-right).
- **Section-3 product slider concept** (all 4 categories): each slide = **unique product name (title)** + grayed **`<Garment> by <Client>`** subhead (Personal = garment only) + short desc. Copy written from the real client photos; language pass to proper-casual ID (buat→untuk, anget→hangat, nggak→tidak, gampang→mudah, merch→merchandise). Section-3 right images → `hs3-1..4.webp` (39 old WhatsApp placeholders deleted).
- **Section 2 cards:** removed hover hairline (1px image bleed + GPU layer), scaled hover flat-lay to fill; **no zoom** on the Section-3 right image hover.
- **Reels (earlier):** posters + per-tile lazy attach (killed the 26MB burst lag).
- **Removed** the global back-to-top button.
- **Mobile images feature:** every major media area (homepage hero slides, category heroes, Section-3 right images, scene gallery) has an **optional "Gambar mobile"** field in Sveltia — empty = desktop image responsive (default), set = phones (≤1023px) use it via `<picture>`. Homepage hero wired to `hsmv-1..4.webp`.
- **Back-button "stuck orange" bug fixed:** `pageshow(persisted)` handler resets the page-transition curtain on bfcache restore.

### Campus page
- Hero reworked to **full-bleed right / full-height** (the source is a 1600×400 panorama).
- Client-logo strip added under Community + Campus heroes (shared `ClientLogos.astro`, CMS-managed).

### Category → product → customizer
- **Hid the 23 old placeholder archetypes** (reversible `hidden:true`), **generated 26 real archetypes** from the Section-3 showcase products. Each carries its real client photo + name + desc, maps to a garment_type → auto-gets a PDP + the full customizer (fabric/color/decoration, +Style/collar for kemeja). Business/community/campus grids list them; **price hidden** (`hide_price`); personal kept as lookbook (its products exist as pages, ungridded).

### PocketBase PMS — **Phases 1–4 COMPLETE, live, self-serve** (see `notes/pms-charter.md` for full detail)
- 7 collections (garment_types, colors, fabrics, styles, decorations, products, settings) on the VPS PocketBase; **seeded** 26 products + photos + 22 fabrics + libraries. Checklist data proven intact (backup taken).
- Build reads PB via `src/data/products/pms-adapter.mjs` + `catalog-source.mjs` (flag `PMS_SOURCE=pb`, **auto-falls-back to catalog.json**). `deploy.yml` builds with `PMS_SOURCE=pb` → live site is PocketBase-sourced.
- **Self-serve:** edit at `/pb/_/` → click **"Terbitkan ke situs live"** at `/pb/publish` → `repository_dispatch` rebuilds + deploys.
- **Global infra agent created:** `~/.claude/agents/shipwright.md` (Lord-Shipwright, reusable in any project).

---

## Decision log (the *why*)
- **PMS = PocketBase, not Sveltia.** Araya chose the DB-backed PMS over extending the git-CMS. Relations (fabric/style/decoration tied to garment *type*, not product) + a real admin made PocketBase fit; the static site fetches PB at build via an adapter so pages/customizer needed no rewiring.
- **Manual "Publish" model** (not auto-on-save): static site needs a rebuild trigger; a button gives a draft/review gate matching Araya's localhost-review habit.
- **catalog.json kept as fallback** (not deleted) so a PB outage at build can't break the site.
- **PMS_SOURCE flag + JSON fallback** = safe parallel migration; live site never went down during cutover.
- **Section-3 slide 4/5 (not 16/9):** product photos are portrait; 16/9 left them tiny. (The "dev looks different from localhost" confusion was a stale-build perception; the real fix was the aspect ratio.)
- **Hybrid snap (not pure mandatory/proximity):** mandatory traps a mid-page snap zone at its edges; proximity alone felt too soft. JS flips the container between them by scroll position.

---

## Parked follow-ups (next session / for awareness)
1. **Deploy connectivity (real caveat):** GitHub-runner → Hostinger VPS SSH/rsync **intermittently times out** (some runner IP ranges blackholed by Hostinger's network/DDoS layer; VPS itself is fine + allows all on :22). Hardened with pinned host keys + rsync retry, but a fully-blocked runner still needs a re-run. **Durable fix = a self-hosted GitHub runner on the VPS** (build+deploy on the box, no network hop) — recommended, ~1 Shipwright session. NOTE: repeated re-runs *escalate* Hostinger's rate-limit; let it cool ~30–60 min between attempts.
2. **Cloudflare purge secrets** still unset (`CLOUDFLARE_ZONE_ID` + `CLOUDFLARE_API_TOKEN`) — the purge step red-X's; non-blocking (new files are fresh URLs; HTML is DYNAMIC).
3. **PB migration file** lives only on the server (`pb_migrations/1779800000_created_pms_collections.js`) — copy into repo (`pocketbase/pb_migrations/`) for version control; fold the widened select values (tier mid/top, technique screen_print/patch/individual_name, etc.) into it.
4. **Personal page** has no product grid (lookbook) — decide later if it should list its 5 products.
5. **Sveltia "Halaman Produk" CMS** is now superseded by the PMS for products — devs/Araya should edit products in PocketBase, not catalog.json.

## Incoming
- **Araya's devs are doing SEO + other updates.** They push to the same repo (auto-deploys, builds from PocketBase). Tell them: products live in PocketBase now (not catalog.json); deploys may need a re-run on the network blip.
