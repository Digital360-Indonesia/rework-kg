---
# Kustom Garment — design tokens (source of truth)
# NOTE: the build's live tokens are the Tailwind v4 @theme block in src/styles/global.css.
# This file documents them in the standard rework-web DESIGN.md format; keep the two in sync.
brand: Kustom Garment
colors:
  accent: "#ff4c00"         # KG orange — the signature, bold & energetic
  accent-light: "#ff6b2c"
  accent-dark: "#d63e00"
  primary: "#1a1a1a"        # near-black ink — headings/text/primary buttons
  primary-light: "#2a2a2a"
  primary-dark: "#0a0a0a"
  secondary: "#4a4a4a"      # neutral grays
  secondary-light: "#6a6a6a"
  secondary-dark: "#3a3a3a"
  whatsapp: "#25D366"
  whatsapp-dark: "#128C7E"
  bg: "#FFFFFF"
  bg-soft: "#f5f5f5"        # light panel
typography:
  heading: "SF Pro Display"  # self-hosted (Bold + Semibold present; Regular/Medium NOT loaded → 400 falls back)
  body: "SF Pro Display"
  fallback: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
rounded: mixed              # sharp corners are intentional in places ("lancip") — don't default to rounded
spacing: editorial
components:
  buttons: near-black primary; orange accent for CTA arrows/emphasis; pill or sharp per section
  cards: photo-led, restrained; orange accents only where intentional (checkmarks, CTA arrows)
mood: bold · professional · editorial · energetic
---

# Kustom Garment — brand study

**One line:** the broad, professional konveksi brand — custom apparel for **business / community / campus / personal**, Surabaya & Indonesia, no minimum order, free design. (The big sibling; Level Garment is the youth/student-focused one.)

## Segment
- **Wide market:** corporate/business wear, community & team jerseys, campus/angkatan merch, personal/retail. B2B + community + individual. Real clients span PT-level corporates (Cakratek, Thai Union, Barata, Adda) to universities and personal buyers.

## Voice & tone
- **Marketing-grade, idiomatic Indonesian** — reads like a confident brand, not a feature list. Defendable claims only (no invented stats). **Never the word "operator"** (use partner/mitra/tim/klinik/fasilitas). EN bits feel like marketing.

## Visual identity
- **Color:** **orange `#ff4c00`** is the signature — used with discipline (primary text/buttons in near-black `#1a1a1a`; orange for per-product accents, CTA arrows, checkmarks — not everywhere). Cream/light-navy for "soft" sections, near-black for chrome/CTAs.
- **Type:** **SF Pro Display** self-hosted (Bold + Semibold loaded; Regular/Medium .woff2 still NEEDED — `font-weight:400` falls back to Semibold; use the system stack where true Regular is required).
- **Corners:** mixed — **sharp ("lancip") is sometimes the answer**; don't default to rounded.
- **Feel:** bold, editorial, motion-forward (one-page slides, scroll-snap, reels, the product customizer + PocketBase PMS).

## Stack note
- Astro 5 static · **Tailwind v4 via `@theme` in `global.css`** (not tailwind.config) · self-hosted SF Pro · GSAP available (most motion is CSS/IntersectionObserver). Products are driven by the **PocketBase PMS** (`PMS_SOURCE=pb`), catalog.json as fallback.

> Standard rework-web DESIGN.md — UI work reads these tokens. Orange is the accent, near-black the ink, SF Pro the type. (Contrast: Level Garment = purple `#AF7AD5` + Inter, playful/youth.)
