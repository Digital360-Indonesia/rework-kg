# Checkpoint — Homepage polish + Section-3 one-page slide

**Date:** 2026-05-29
**Lord:** Manager-Lord (Claudy)
**Branch:** main

---

## What shipped (pushed, live on dev.kustomgarment.com)

1. **PDP polish + CMS for category pages** (`6734b33`)
   - "How It Feels" (Style Mode bar) + "Fabric / Material" cards inside the PDP right rail
   - "Lihat juga" recommended section (4 siblings from same segment)
   - Style tab hidden in customizer for non-Kemeja (no editable `style_options`)
   - All 23 catalog products → grey SVG placeholders (one per garment type)
   - Sveltia CMS "Halaman Kategori" collection (business/community/campus/personal) —
     hero + media (clients/lookbook) only; product grid excluded (catalog-driven)

2. **IG-reels lag fix** (`74ee630`)
   - 26 reels each get a 280px JPG **poster** (~25KB; 612KB total) → first frame paints instantly
   - mp4 sources moved to `data-src`, attached only when a tile crosses the viewport
     (per-tile IntersectionObserver) — no more 26MB cold burst
   - Off-screen wall pauses ALL videos + the marquee animation
   - Removed the "skeleton-until-all-loaded" gate (posters made it unnecessary)

## What's locked locally (NOT yet pushed — awaiting Araya's go)

3. **Campus hero rework** (`src/pages/campus.astro`)
   - Source image is 1600×400 panorama; old slot was `aspect-ratio: 4/5` → cropped to a sliver
   - Desktop: full-bleed split, image hugs the right viewport edge, fills section height
   - Section height = `calc(100svh - 4rem)` so the hero fills the first screen
   - Mobile: aspect `5/2` panoramic (friendly to the wide source)

4. **Section-3 height tuning** (`CategoryShowcase.astro`) — LOCKED, "this the best"
   - slide `aspect-ratio` 4/3 → **16/9**
   - left-panel padding `2.5rem` → **2rem** (desktop)
   - dots `margin-top` 2.25rem → **1rem**
   - copy `padding-top` 3.25rem → **2.25rem**
   - (Card height is driven by the LEFT side, not the right — see decision log)

5. **Section-3 one-page slide** (`global.css` + `CategoryShowcase.astro` + `index.astro`) — LOCKED, "the best moves"
   - Each `.showcase` is now `min-height: calc(100svh - 88px)`, card centered inside (`display:flex; align-items:center`)
   - `scroll-snap-align: center` → **start** (deterministic; card-in-full-screen reads as centered)
   - **Hybrid snap script** in `index.astro`: firm `mandatory` through inner transitions
     (1→2, 2→3, 3→4), soft `proximity` at panels 1 & 4 so you can scroll OUT without being trapped

---

## Decision log (the *why*)

- **Reels: posters over a global skeleton.** The old code burst-loaded all 26 mp4s (~26MB) the
  moment the wall neared the viewport, then hid the mess behind a shimmer until the slowest
  decoded. Posters let each tile paint instantly and defer the heavy mp4 to per-tile intersection.
  Cheaper, simpler, and no "wait for the slowest of 26" gate. (Cross-device: the burst was the
  "lag on other machines" cause.)

- **Section-3 height: the RIGHT card never drove the height.** Spent several rounds nudging
  `.showcase-right { min-height }` with zero visible effect — because the grid row takes the
  *taller* cell, and the right cell is an absolutely-positioned image (intrinsic height 0). It
  follows the LEFT cell. The real levers were on the left: slide aspect-ratio, panel padding,
  dots margin, copy padding. **Lesson: when a size knob does nothing, find which cell actually
  drives the row before turning it again.**

- **One-page slide: `mandatory` traps mid-page; hybrid fixes it.** `scroll-snap-type: y mandatory`
  on `<html>` gives the firm one-panel-per-screen feel, but a snap zone in the *middle* of a
  free-scrolling page traps at its edges — panel 1 has no snap point above, panel 4 none below, so
  the browser yanks you back. Pure `proximity` never traps but felt too soft ("just like before").
  Araya's own insight — "first & last like the soft version, 2-3 like the firm version" — maps
  exactly to the mechanism: only the outermost snap points trap. Solution: a tiny scroll listener
  flips the container `mandatory` ↔ `proximity` based on whether `scrollY` is strictly between the
  first and last panels' snap positions. Firm inside, free at the ends.

- **Why full-height panels were the prerequisite.** Earlier `proximity` was unreliable across
  devices because the panels were SHORT (~350px) — 2-3 shared a screen, so `center` snap was
  ambiguous and only caught on trackpads. Making each panel a full screen is what made *any* snap
  reliable; the hybrid then tunes the feel.

- **CMS scope for category pages: hero + media only.** Product grid stays catalog-driven
  (`catalog.json`, its own management later) — exposing it in Sveltia too would create two sources
  of truth. Each page's hero shape differs (business/community/campus/personal), so 4 distinct
  field schemas.

---

## State

- Pushed: `74ee630` (origin/main then advanced by Sveltia auto-commits to `91bc82a`)
- Local uncommitted: `campus.astro`, `CategoryShowcase.astro`, `index.astro`, `global.css`
- Build: green (exit 0)
- **Next:** push items 3-5 on Araya's go (no-auto-push rule). Then: CategoryCards hover-image
  framing pass (item 4 from the earlier home-lag findings report — deferred).
