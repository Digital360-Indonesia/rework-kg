# CMS — Sveltia setup (Kustom Garment)

Git-based CMS so the admin team edits all site content without code. Edits commit to the repo → site rebuilds. No backend/database to maintain.

## Content model (where content lives)

All editable content is externalized into JSON the components import:

| File | Drives | Status |
|---|---|---|
| `src/data/site-config.json` | Header nav + CTA, contact, socials, **footer** (tagline, info links, legal, descriptor) | ✅ wired |
| `src/data/home.json` | Homepage: ticker, hero slides, scene gallery, social wall (reels), end-CTA banner | ✅ wired |
| `src/data/categories.json` | Homepage category showcases (business/community/campus/personal). `categories.ts` is now a typed wrapper around it. | ✅ wired |
| `src/pages/about.astro`, `partnership.astro`, `faq.astro` | content hardcoded in frontmatter objects | ⏳ to externalize (after page agent finishes, to avoid conflicts) |
| `src/pages/business|community|campus|personal.astro` | content in frontmatter objects | ⏳ to externalize |
| `src/content/blog/` | Blog posts (markdown) | ✅ collection defined |

Components that read the model: `Ticker`, `Hero`, `SceneGallery`, `SocialProof`, `EndCta`, `Footer`, `Header`.

## Admin

- Entry: `public/admin/index.html` (loads Sveltia from CDN) + `public/admin/config.yml`.
- Dev URL: `http://localhost:4321/admin/index.html` (Astro dev doesn't resolve `/admin/`; production hosts do → `/admin/`).
- Collections defined: **Pengaturan Situs** (site-config.json), **Homepage** (home.json), **Kategori** (categories.json), **Blog** (src/content/blog).

## Go-live checklist

1. **Push the repo to GitHub.** Set `backend.repo` in `config.yml` to `<owner>/<name>`.
2. **Auth:** Sveltia supports GitHub directly; set up a GitHub OAuth app (or a small OAuth worker on Cloudflare/Netlify). Admins log in with GitHub.
3. **Build hook:** host on Netlify / Vercel / Cloudflare Pages so a commit from the CMS triggers a rebuild + deploy.
4. **Local editing now (no GitHub):** open `http://localhost:4321/admin/index.html` in **Chrome/Edge**, click **"Work with Local Repository"** → grant access to the repo folder. Sveltia edits the files directly via the File System Access API; the dev server hot-reloads. (Fallback for non-Chromium browsers: `npx decap-server`.)
5. **Media:** uploads go to `public/images/uploads/` (set in config). Consider an external media library later for heavy media.

## Media / image strategy (important for a CMS-driven site)

Astro's build-time image optimization (`astro:assets` / `<Image>`) only applies to images **imported in code** from `src/`. Files in `public/` — including everything an admin uploads via the CMS (`public/images/uploads/`) — are served **as-is, unoptimized**. So without a strategy, the admin team uploading phone photos / screenshots will bloat the site over time.

**Current state:** homepage placeholder PNGs were converted to webp (1920×960 PNGs ~3 MB each → ~150–340 KB webp; 13 MB → ~0.9 MB total). `home.json` points to the `.webp`. Originals kept (other pages still reference some).

**Recommended approach for uploads (pick at go-live, ties to host):**
- **Cloudflare Pages + Cloudflare Images / `/cdn-cgi/image`** — on-the-fly resize/format/quality on any image URL. Best "set and forget" for admin uploads. (Leans toward choosing Cloudflare Pages as the host.)
- **Netlify Image CDN** (`/.netlify/images?url=…`) — same idea if hosting on Netlify.
- **Build-step compression** — a small `sharp` script that compresses `public/images/uploads/` before build (host-agnostic, but caps at build quality, no responsive variants).
- Sveltia's image widget can also enforce a max upload size; set that as a first guardrail regardless.

TODO at go-live: wire whichever host's image CDN, and (optionally) add a `sharp` pre-build compress for `uploads/`.

## Next phases (remaining externalization)

- Move `categories.ts` → `categories.json` + Sveltia collection.
- Externalize about / partnership / faq / the 4 category pages into per-page JSON + collections.
- Reels social-wall row editing UX (nested lists) — works but could be friendlier.
- Decide media strategy for the 26 reel videos (keep in repo vs external).

## AI later (per Araya)

Because content is structured git files, AI tooling can draft/translate/generate copy + banners and commit them → CMS reflects it. No need to modify Sveltia. Not locked in — a custom AI admin could be built on the same files later.
