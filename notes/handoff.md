# Handoff → Lord-Page-Builder

**From:** Manager-Lord (Claudy)
**Date:** 2026-05-30
**Topic:** Section-3 (homepage) product-slider copywriting — all 4 categories

> (Supersedes the 2026-05-21 VPS-deploy handoff — that work is all done: dev.kustomgarment.com is live, GitHub Route B auto-deploy is wired, CMS `/admin` is functional.)

---

## The task

Homepage **Section 3** (`CategoryShowcase`) has, per category, a left-side **product slider**. Each slide reads as a real garment category credited to a real client:

```
<Garment category>      ← header (.copy-title) — MUST be a real category, NOT an invented name
by PT <Client>          ← small grayed subhead (.copy-by)
<product description>   ← desc (.copy-desc)
```

**Important (Araya's correction):** do NOT invent product names. The title = the real garment category that the category page filters by — for business: **Kemeja / Polo / Kaos / Jaket / Rompi / Wearpack**. Use each segment's own catalog garment_types. The client/company is the variable gray subhead (`by PT …`); leave it blank if there's no creditable client. Drop the client *logos* — credit in text only.

STRUCTURE IS ALREADY IMPLEMENTED by Manager-Lord: `categories.json` products now use `{ image, title, client, description }`; the component renders the gray `by <client>` subhead; CMS exposes **Jenis produk** + **Klien** fields. You only supply copy values.

## Split of work (lane-aware)

- **Page-Builder (you):** draft + refine the COPY only — for each slide: header (product name + garment word), the `by PT …` subhead, and the description. Deliver as a markdown table per category in `notes/section3-copy-proposal.md` (create it). Do NOT edit `src/data/*` or components — that's Manager-Lord's lane.
- **Manager-Lord:** implements the structure — adds the subhead line to `CategoryShowcase.astro` (small, grayed, between title and desc), adds the `client`/`by` field to `categories.json` + the CMS schema, and pastes your approved copy into the data.

## Business — DONE (live template to copy)

Manager-Lord already wired business as the pattern. Final shape:

| Photo (client)     | Title (garment) | Subhead (gray)              | Desc |
|--------------------|-----------------|-----------------------------|------|
| CAKRATEK           | Kaos            | by PT Cakratek Buana Amerta | Cotton combed 24s, sablon plastisol tajam. Dipakai harian tim, adem dan nggak gampang pudar. |
| HYUNDAI GOWA       | Kemeja          | by Hyundai Gowa             | Kemeja kerja ringan buat frontliner bengkel. Bordir logo rapi, adem dipakai seharian. |
| FERRARI / Shell    | Kemeja          | (blank — confirm client)    | American oxford, potongan formal slim. Rapi buat seragam kantor & event. |
| PORSCHE            | Polo            | by Porsche                  | Pique adem, potongan slim modern. Bordir logo dada — berkelas tapi tetap santai. |
| THAI UNION         | Wearpack        | by PT Thai Union            | Drill kuat, opsi reflektif. Tahan banting buat tim lapangan & produksi. |
| BARATA             | Rompi           | by PT Barata Indonesia      | Rompi multi-kantong, drill tebal. Praktis buat tim operasional di lapangan. |
| ADDA MITRA GLOBAL  | Jaket           | by PT Adda Mitra Global     | Jaket drill korporat, tebal & rapi. Kesan formal buat outer perusahaan. |

**Your job:** produce the same shape for **community / campus / personal** — title = that segment's garment categories (check the category page / catalog `archetypes` per segment), client = real creditable company or blank. Open flag Araya must still close on business: slide 3 (Ferrari/Shell) client.

## Source material

- Current slider data: `src/data/categories.json` → `<category>.products[]` (each has `image`, `title`, `description`). Business has 7 items; image filenames = client names.
- Real catalog to draw product names/specs from: `src/data/products/catalog.json` → `archetypes[]` filtered by `segment`. Each has `name`, `garment_type`, `positioning`, `price_min` — good seed for headers + descriptions. (13 business archetypes available.)

## Copy rules (Araya's standing prefs — enforce)

- **Idiomatic Indonesian**, everyday speech — not Google-Translate. EN bits feel like marketing, not feature lists.
- **Defendable claims only** — no invented stats/percentages. Only credit clients KG actually served.
- **Never the word "operator"** — use partner / mitra / tim / klinik / fasilitas.
- Keep descriptions tight (≈1–2 lines) — the slot is small.
- Localize: Indonesian company names (PT X), IDR, local context.

## Next

1. Wait for Araya to lock the Business table.
2. Produce community / campus / personal tables in `notes/section3-copy-proposal.md`, same shape (use catalog products per segment).
3. Hand back to Manager-Lord to implement structure + data.

— Manager-Lord, acting on behalf of Araya
