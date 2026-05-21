# Checkpoint — Kustom Garment redesign (rework-kg)

**Date:** 2026-05-20
**Branch:** `main` (working directly; not yet committed — all changes still in working tree)
**Dev server:** `npm run dev` → http://localhost:4321/
**Scope this session:** Full visual redesign of the homepage, top → down, replacing the WordPress-migration look with a modern custom design.

---

## Brand foundation (locked)

- **Accent / brand orange:** `#ff4c00` (replaced the old `#f97316`). Lives in `src/styles/global.css` `@theme` as `--color-accent` (+ `-light` `#ff6b2c`, `-dark` `#d63e00`).
- **Typeface:** SF Pro Display, self-hosted from `public/fonts/`. Have **Bold (700)** + **Semibold (600)** only. Still need **Regular (400)** + **Medium (500)** woff2 for body copy. EULA risk acknowledged & accepted by Araya — do not re-litigate.
- **Tailwind:** v4. Config is the `@theme` block in `src/styles/global.css`, **NOT** `tailwind.config.mjs` (that file is stale v3 dead code — ignore it).
- **Palette direction:** white → gray → black + orange accent.

---

## Sections built (homepage, top → bottom)

1. **Header** — `src/components/sections/Header.astro` (rewritten)
   - Left logo, nav (Business/Community/Campus/Personal, uppercase + bold + tracked, 15px), pill search bar (posts to `/search` — page doesn't exist yet), orange "Hubungi Kami →" CTA. Mobile: hamburger → right drawer with search + nav. Height 88px. Sticky, white, bottom border.
2. **Hero** — `src/components/sections/Hero.astro` (rewritten)
   - IG-story-style banner slider. Rounded `1.75rem`, NOT full-bleed (96rem max wrap). Aspect `16/7.15` desktop, `4/5` mobile. Story-style progress bars on top, auto-advance 5s, glass prev/next arrows (small, blurred), whole slide is a link. **No text overlays** (text will live inside the banner art). Does NOT pause on hover. Pauses when off-screen. Images = `public/images/placeholder/theme-image-*.png` (heavy ~3MB PNGs — placeholders).
3. **Ticker** — `src/components/sections/Ticker.astro` (new)
   - LED-style marquee. Orange `#ff4c00` bg, white bold uppercase text, `-webkit-text-stroke` for extra heft. 8 perks in EN: NO MINIMUM ORDER · BULK ORDER · FREE DESIGN · FREE CONSULTATION · PICKUP & DELIVERY · PREMIUM QUALITY · CUSTOMER SUPPORT · MADE IN INDONESIA. Scrolls left, does NOT pause on hover. `prefers-reduced-motion` respected.
4. **CategoryCards** — `src/components/sections/CategoryCards.astro` (rewritten)
   - 5 portrait cards: BUSINESS · COMMUNITY · CAMPUS · PERSONAL · ACTIVEWEAR. Aspect 4:5, gray frame, 2.5rem desktop gap. Hover: `sample-slide.png` slides **down from top** over 820ms (expo-out) + card lift + label turns orange. Mobile = horizontal scroll-snap. ACTIVEWEAR uses a placeholder image (no real photo yet).
5. **CategoryShowcase ×4** — `src/components/sections/CategoryShowcase.astro` (new) + `src/data/categories.ts`
   - Split layout: gray product-carousel panel on one side, lifestyle image on the other. **Alternating** layout (Business: slider left / Community: slider right / Campus: left / Personal: right) via `reverse` prop + `.is-reverse` order swap (desktop only).
   - Carousel: 5 products, 52% slide width, aspect 4:3, peek both sides. **Infinite loop** via 2 clone slides each end (so peeks always match → silent jump invisible). Auto-advance 5s where the **active dot fills like a progress bar**. Click any slide → centers it. Title + desc inside the panel, **fade-slide animate** on change (380ms). Panel stretches to match right image (`min-height: 44rem`).
   - Right side: lifestyle image (`sample-section3a/b/c/d.webp`) + eyebrow + title + Shop CTA.
6. **Scroll-snap** — native CSS (FINAL approach)
   - `html { scroll-snap-type: y proximity; scroll-padding-top: 88px }` (desktop only) + `.showcase { scroll-snap-align: center; scroll-snap-stop: always }`.
   - Page-by-page snap through the 4 showcases, centered, one at a time, header-aware. Free scroll everywhere else. No JS.

---

## Decision log (the WHY)

- **Native CSS scroll-snap beat JS scroll-hijack.** First attempt (`ShowcaseSnap.astro`, now deleted) used `wheel` + `preventDefault`. It fought the browser → endless edge cases (trackpad inertia double-jumps, "stuck", too-sensitive boundaries, header-offset centering). Rewrote ~4×. Native scroll-snap solved all of it in ~15 lines of CSS and felt right immediately. **Lesson: don't hijack scroll; let the browser snap.**
- **2 clones per side (not 1) for the carousel loop.** With 1 clone the *center* product matched across the silent jump but the *peek* slides didn't → visible flicker. 2 clones each side makes center + both peeks identical before/after the jump → truly seamless.
- **`data-title`/`data-desc` selector bug.** Slides AND the copy elements both had those attributes, so `querySelector('[data-title]')` grabbed the first *slide* and overwrote its `<img>` with text. Fixed by selecting `.copy-title` / `.copy-desc` by class. **Lesson: don't reuse data-attr names across storage + target elements.**
- **Auto-advance wraps forward, not backward.** From product 5 → scroll forward into the next-clone, then silent-jump to real slot 1. Scrolling backward across 4 slides felt janky.
- **SF Pro self-hosted despite EULA** — Araya's explicit call for the look; Inter was offered as the license-safe alternative and declined.
- **Placeholder filenames have spaces** (`sample-section3a1 1.png`) — referenced URL-encoded as `%201`.

---

## Not done yet / next steps

- **Sections below the showcases are still WordPress-era** and visually mismatched: Pembelian Jumlah Besar (bulk order), Benefits (4 cards), Portfolio banner slider, Favorit Kustomers (TikTok videos), Final CTA. These are next to redesign.
- **Images are placeholders & heavy.** Hero PNGs ~3MB each; showcase products are PNG. Convert to optimized webp + use `<Image>` before any real deploy.
- **Per-category products.** All 4 showcases currently share the same 5 product photos/copy (`sharedProducts` in `categories.ts`). B/C/D have only the right-side lifestyle image — need real product carousels per category.
- **Search** posts to `/search` (no page). Either build it or make the bar visual-only.
- **BaseLayout still loads Montserrat** from Google Fonts (`src/layouts/BaseLayout.astro`) — wasted bytes now that we're on SF Pro. Strip it.
- **Dead CSS** left in `src/pages/index.astro` `<style>` (old `.value-props-*`, `.client-slider-*`, `.category-section`, etc.) — clean up when redesigning the lower sections.
- **Footer** still WP-era; many links collapse to `/care/`.
- **SF Pro Regular/Medium** still missing for body weights.
- **Nothing committed** — all work is in the working tree on `main`. Decide commit/branch strategy (per Araya's rule: don't auto-promote to main; work on a feature branch). Currently editing main directly — worth branching before commit.

---

## Update — later same day (2026-05-20, session cont.)

**Sections added/finished since the above:**
- **SceneGallery** (`src/components/sections/SceneGallery.astro`) — editorial masonry, 6 use-case scenes (mixed portrait/landscape, staggered columns). Headline "Apparel custom untuk [flipping word]" — orange last word rotates (komunitas/bisnis/event/tim/jualan/merch/OOTD-mu) every 2.2s. Each scene: image + Bahasa caption; hover = title+desc turn orange + a **cursor-following CTA pill** appears after **1.5s dwell** (e.g. "Kustom OOTD sekarang →"), links to WA. No zoom.
- **SocialProof → social wall** (`src/components/sections/SocialProof.astro`) — REPLACED the testimonial-grid idea. 3 rows of **@kustomgarment reels** scrolling in alternating directions (left/right/left), pure marquee (no pause on hover). Headline "Langsung dari @kustomgarment" — the **@handle is a link to IG with a neon-flicker hover**. Each item: hover shows IG-logo overlay, click → that specific reel. `DMXwOC7SNbU` is positioned row-2 middle and plays at 0.8× (it's the best one).
  - **All 26 reels are real, downloaded videos** via `yt-dlp` (works without auth) → `public/videos/ig-<code>.mp4`. Compressed with ffmpeg to 480px/no-audio/faststart (142MB → ~28MB). Trimmed 2.5s off the end of each (closing bumper) except `DMXwOC7SNbU`; `DNqBEAISg9D` had a longer 2.7s black tail so it was cut at 17.7s (blackdetect-verified clean). 17 leftover reel thumbnails sit unused in `public/images/social/` (kept in case some revert to image).
  - Videos: muted/loop/playsinline, **play only while in viewport** (IntersectionObserver on transformed positions) so not all 26 run at once.
- **Footer** (`src/components/sections/Footer.astro`) — fully redesigned, non-generic: **orange `#ff4c00` bg**, near-black text (white = hover pop), editorial "Yuk wujudkan →" WA CTA (underline-draw), minimal meta (Studio address/phone/email, 4 category links, 3 socials), and a **giant outlined "KUSTOM GARMENT" wordmark that fills black on hover**. Reduced height.
- **All old WordPress sections REMOVED** from `index.astro` (Pembelian Jumlah Besar, Benefits/4-perks, portfolio banner slider, Favorit Kustomers videos, Kustom Sekarang final CTA) + the dead `<style>` block + unused `valueProps`/`clientLogos` arrays.

**Current homepage order:** Header → Ticker → Hero → CategoryCards → 4× CategoryShowcase → SceneGallery → SocialProof (social wall) → Footer.

**Scroll-snap (the showcases):** native CSS `scroll-snap-type: y proximity` + `scroll-snap-align: center` + `scroll-snap-stop: always` + `scroll-padding-top: 88px` (desktop only). The JS `SchowcaseSnap` hijack approach was abandoned/deleted — native won.

**Open / next:** footer fine-tune if needed; `/search` page still doesn't exist (header search posts to it); Montserrat still loaded in BaseLayout (strip); SF Pro Regular/Medium still missing; per-category real products for the showcases; real per-reel links already wired (all point to their own reel ✓). Consider optimizing hero PNGs (~3MB each) to webp.

---

## File map (this session)

**New:** `Ticker.astro`, `CategoryShowcase.astro`, `src/data/categories.ts`
**Rewritten:** `Header.astro`, `Hero.astro`, `CategoryCards.astro`
**Edited:** `src/styles/global.css` (fonts, color, scroll-snap), `src/pages/index.astro` (wired new sections, removed WP hero/value-props/client-slider)
**Deleted:** `ShowcaseSnap.astro` (abandoned JS scroll-hijack)
