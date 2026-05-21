# Page Builder Brief — Kustom Garment redesign

You are building/redesigning pages for the **Kustom Garment** website (Indonesian custom-apparel / konveksi brand). You inherit the global "Working with Araya" knowledge automatically (it's in `~/.claude/CLAUDE.md`). This file is the **project-specific** bridge: design system, patterns, guardrails, and your job list. Read it fully before writing code.

A teammate (Claudy, "the manager") is simultaneously building the **CMS / content layer** — so stay in your lane (see Guardrails) to avoid conflicts.

---

## 0. Setup
- Repo: `/Volumes/rays-memory/foldered/coding/rework-web-project/rework-kg`
- Dev server is usually already running at **http://localhost:4321/**. If not: `npm run dev`. Don't start a second one.
- Stack: **Astro 5 static**, **React 19** (rarely needed), **Tailwind v4**, SF Pro Display (self-hosted). Working branch: **`main`** (greenfield, pre-launch — committing direct to main is fine here; commit only when Araya asks).

## 1. Read these first (absorb the design language)
- `src/layouts/BaseLayout.astro` — wrap EVERY page: `<BaseLayout title=… description=…>`. Includes Header + Footer.
- `src/pages/about.astro`, `src/pages/partnership.astro`, `src/pages/faq.astro` — **canonical examples** of the redesign's structure, animation, and CSS. Match this quality/style.
- `src/pages/business.astro` (+ community/campus/personal) — category-page pattern.
- `src/components/sections/*` — the homepage component library (Hero, Ticker, CategoryCards, CategoryShowcase, SceneGallery, SocialProof, EndCta, Footer, Header).
- `src/styles/global.css` — Tailwind v4 `@theme` tokens.
- `notes/checkpoint-2026-05-20.md` — full history + decision log.

## 2. Design system (NON-NEGOTIABLE)
- **Accent: brand orange `#ff4c00`** — the ONLY accent color. Use `--color-accent` / `text-accent` / `bg-accent` or the literal hex. Everything else: white, near-black `#1a1a1a`, grays (`#6b7280`, `#f4f4f4`, `#ececec`).
- **Font: `var(--font-sans)`** (SF Pro Display). Headings `font-weight: 700`, `letter-spacing: -0.02em`, big editorial sizes via `clamp()`. We only have weights 600 + 700 self-hosted — don't rely on 400/500/800/900.
- **NO conventional boxed buttons.** This whole site avoids them. CTAs are **big editorial text links** with an orange underline-draw on hover + an orange `→` that nudges right. Copy the `.ab-cta` / `.pt-cta` pattern exactly.
- **Tailwind v4**: config is `@theme` in `global.css`. **Ignore `tailwind.config.mjs`** (stale/dead).
- Rounded cards/images (`border-radius: 1–1.5rem`), `object-fit: cover`.
- Respect `prefers-reduced-motion` on every animation (disable transforms/animation).
- Copy: **idiomatic Indonesian** (not Google-translate), occasional English accents. Marketing voice, not feature lists. No the word "operator". Quantitative copy targets ("max 2 lines") are hard constraints.

## 3. Reusable patterns (steal these — they're already in the codebase)
- **Editorial CTA link** → `.ab-cta` in `about.astro` (underline `::after` scaleX on hover + arrow `translateX`).
- **Scroll-reveal** → `.reveal` + IntersectionObserver (`.in` class) in `about.astro` / `partnership.astro`. Use `transition-delay` for stagger.
- **Card → orange fill on hover** → `.pt-card` in `partnership.astro`.
- **Horizontal slider with peek** → `.pt-collab-row` in `partnership.astro` (flex + overflow-x + scroll-snap + edge bleed).
- **Marquee** → `.pt-track` (partnership logos) or `Ticker.astro` / `SocialProof.astro` (duplicate items, CSS translateX keyframes).
- **Accordion** → `faq.astro` (native `<details>` + animated `+`/`×` marker, one-open-at-a-time JS).
- **Count-up stats / 3D mouse-tilt** → `about.astro`.
- **Image crossfade on hover** → `EndCta.astro`. **Cursor-following label** + **flip word** → `SceneGallery.astro`.

## 4. Content model / CMS rules (important)
The site is moving to a git CMS (Sveltia). Keep new pages **CMS-ready**:
- Put ALL page content (copy, image paths, lists) in **structured objects in the page frontmatter** (`const hero = {…}`, `const products = [...]`) — never scatter strings inline in the markup.
- Don't invent new shared data files or edit `src/data/*.json` / `src/data/categories.ts` (the manager owns those). If a page should pull from shared data, note it — don't wire it yourself yet.

## 5. Guardrails (avoid conflicts with the CMS work)
- **Only edit files under `src/pages/`** (the page files in your job list). Plus you may CREATE a new page-specific component under `src/components/` if truly needed — but prefer self-contained pages like about/partnership.
- **Do NOT edit**: `src/data/*` , `src/components/sections/Header.astro`, `Footer.astro`, `Hero.astro`, `Ticker.astro`, `SceneGallery.astro`, `SocialProof.astro`, `EndCta.astro`, `CategoryShowcase.astro`, `CategoryCards.astro`, `global.css`, `BaseLayout.astro`, `public/admin/*`. If one needs changing, **write a note for the manager instead**.
- Images: reuse existing placeholders in `public/images/` (`categories/`, `placeholder/theme-image-*.png`, `placeholder/sample-section3*`). Product shots `placeholder/sample-section3a1 1.png`…`a5 1.png` (space → URL-encode `%201`). WhatsApp base: `https://wa.me/6285161202499?text=` + encoded message.
- **Verify every page** with `curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/<route>` (expect 200) and eyeball rendered HTML. Check the dev server output for errors.

## 6. JOB LIST (remaining pages — all WP-era, need full redesign)
Priority order:
1. **`produk.astro`** — products overview / catalog landing. The "Selengkapnya" hub. Show all product types (T-Shirt, Polo, Kemeja, Jaket, Hoodie, Wearpack, Jersey, Totebag, etc.) as an editorial grid; link to categories; CTA. ~3-4 sections.
2. **`sizechart.astro`** — size chart. Make it clean + usable: tabbed or sectioned size tables per product type, on-brand styling. Tables can stay tables but styled (orange headers, clean borders). Keep it genuinely useful.
3. **`katalog-jersey-baseball.astro`** — jersey/baseball catalog. Visual catalog of jersey styles/templates; gallery + CTA.
4. **`care.astro`** — currently a WP catch-all (about/terms/contact/FAQ dumped together). Decide with Araya: likely becomes a "Cara Pemesanan / How to Order" or a contact page. Confirm scope before building.
5. **`blog/index.astro`** + **`blog/[slug].astro`** — blog list + post. Align typography/layout to the design system (the blog content collection already exists; don't change its schema, just restyle the templates).
6. **`portfolio/index.astro`** — portfolio gallery. Note: there's an external `portfolio.kustomgarment.com`; confirm whether this page stays or just redirects.

Also available if Araya asks: **refine the 4 category pages** (business/community/campus/personal) — they're first-pass drafts.

## 7. How Araya works (project-relevant recap)
- Terse, EN/ID mixed. Corrections are redirects, not critiques — adjust fast.
- Iterates in small increments ("a bit more", "lower again") and explores then reverts ("revert back try it") — keep changes easy to undo, ship one nudge per turn.
- References (screenshots/links) are the primary brief — extract intent, adapt to our brand, don't copy.
- Expects options + a recommendation when you ask exploratory questions.
- Verify after every change (curl + eyeball). Don't claim done without checking.

## 8. Done criteria per page
200 status, no console/build errors, matches the design system (orange-only accent, SF Pro, editorial CTAs, no boxed buttons, scroll-reveal, reduced-motion), content in frontmatter objects, responsive (mobile → desktop), and it *feels* like the same brand as about/partnership/faq.
