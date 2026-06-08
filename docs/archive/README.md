# Archive

**`catalog-2026-06-pre-portfolio.json`** — Kustom Garment's product catalog *before* the
devs' portfolio-driven rework (commit `aeca302`). This was our earlier PMS seed (the
~26 placeholder/interim archetypes). Superseded by the 13 portfolio-driven archetypes
now in `catalog.json` + PocketBase.

Kept for reference / recovery. To restore it into PocketBase you'd copy it over
`src/data/products/catalog.json` and re-run `scripts/sync-pms.mjs` (this would replace
the current 13 — don't do it casually).
