# Checkpoint — 2026-05-21 (CMS + pages + media)

**Branch:** `main` (uncommitted, greenfield — fine per Araya).
**Dev server:** `npm run dev` → http://localhost:4321/

Continues from `checkpoint-2026-05-20.md` (homepage redesign + sections). This session: more pages, the CMS content layer, and media optimization. Work is split across **two agents** — see "Coordination" below.

## Pages status
| Page | State | By |
|---|---|---|
| `index` (home) | ✅ redesigned + CMS-wired | Claudy |
| `about`, `partnership`, `faq` | ✅ built (not yet CMS-externalized) | Claudy |
| `business`, `community`, `campus`, `personal` | ✅ category pages (first bg agent), now being refined | agent |
| `produk` | ✅ product-types hub (real `images/products/*` photos, WA deep-links) | other-terminal agent |
| `sizechart` | ✅ tabbed real measurements | other-terminal agent |
| `blog/index`, `blog/[slug]` | ✅ restyled off WP theme | other-terminal agent |
| `katalog-jersey-baseball`, `care`, `portfolio` | ⏳ pending (agent paused on asset/scope questions) | other-terminal agent |

Decisions on the paused 3 (relay to the page agent): **katalog-jersey** → use placeholders + TODO, don't stall. **care** → make it "Cara Pemesanan / How to Order". **portfolio** → point nav to existing `portfolio.kustomgarment.com` (skip on-site page) or a light 6-photo gallery.

## CMS (Sveltia, git-based) — content layer
Goal: admin team edits all content, no code. Edits commit to repo → rebuild.

**Wired (editable now):**
- `src/data/site-config.json` — header nav, contact, socials, **footer** (Footer + Header read it).
- `src/data/home.json` — ticker, hero slides, scene gallery, social wall (reels), end-CTA (Ticker/Hero/SceneGallery/SocialProof/EndCta read it).
- `src/data/categories.json` — homepage category showcases + products. `categories.ts` is now a typed wrapper around it (CategoryShowcase unchanged).
- Blog = existing Astro content collection (`src/content/blog`).

**Admin:** `public/admin/index.html` (Sveltia from CDN) + `public/admin/config.yml`. Collections: Pengaturan Situs, Homepage, Kategori, Blog. Dev URL `http://localhost:4321/admin/index.html` (prod hosts resolve `/admin/`). **Local editing validated by Araya** (Chromium → "Work with Local Repository"; even tested an image upload → `public/images/uploads/`). No proxy needed (`@sveltia/cms-proxy-server` doesn't exist; Sveltia uses File System Access API).

**Still to externalize (deferred until page agent finishes those files):** about/partnership/faq + the 4 category pages (content currently in their frontmatter objects, CMS-ready shape). The page agent must NOT touch `src/data/*`.

## Media / perf
- Homepage placeholder PNGs (4× 1920×960 ~3 MB + banner) → webp via `cwebp -q 80`. **13 MB → ~0.9 MB.** `home.json` repointed to `.webp`; PNG originals kept (other pages still ref them).
- **Open:** CMS-upload optimization strategy (see `notes/cms-setup.md` → "Media / image strategy") — pick at go-live; leans toward Cloudflare Pages + its image CDN.

## CMS go-live (needs Araya's accounts)
1. Push repo to GitHub → set `backend.repo` in `config.yml`.
2. GitHub OAuth for admin login.
3. Deploy host (Cloudflare Pages / Netlify / Vercel) that rebuilds on push.
4. Wire host image CDN for uploads.
Full checklist in `notes/cms-setup.md`.

## Coordination (two agents, no collisions)
- **Page agent** (other terminal, Araya-directed): owns `src/pages/*` only. Brief = `notes/page-builder-brief.md`.
- **Claudy** (this session): owns `src/data/*`, homepage components, `BaseLayout`, `global.css`, `public/admin/*`, media.
- Cross-needs are noted, not done. Boundary held all session.

## Next
- Page agent: finish katalog/care/portfolio + refine category pages.
- Claudy: once pages settle → externalize remaining page content into CMS; help execute go-live; wire upload image-CDN.
