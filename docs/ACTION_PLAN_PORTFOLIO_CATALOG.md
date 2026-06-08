# Action Plan: Portfolio-Driven Product Catalog

**Project**: rework-kg  
**Date**: 2026-06-06  
**Status**: Phase 1–5 COMPLETE ✅ | Build verified: 128 pages, 0 errors

---

## Konteks

**Masalah saat ini**:
- Catalog punya 49 archetype, tapi banyak duplikat (sama persis, beda nama saja)
- `style_options` generic/ilustrasi SVG — tidak ada bukti real
- `locked_spec` nyaris identik antar produk dalam garment_type yang sama
- Gallery masing-masing cuma 1 gambar placeholder
- Customizer hanya aktif untuk kemeja

**Arah baru**:
Setiap produk = **base template dari portfolio real**. User tidak mulai dari nol — dia lihat produk yang sudah pernah dibuat KG untuk client business, lengkap dengan spek dan foto detail. Tinggal modifikasi yang mau diubah.

**Sumber data**: `kg_portfolio_data.md` — 156 portfolio items, 1067 gambar, 22 kategori

---

## Phase 1: Data Extraction & Mapping ✅ DONE

**Goal**: Parse portfolio data → ekstrak komponen per product type

### 1.1 Group portfolio by product type (garment_type)

```
Kemeja (41 items) → sub-codes: Kmj100, Kmj102, Kmj103, Kmj105
Kaos (30 items)   → sub-codes: Kos117, Kos118, Kos121, Kos122
Polo (25 items)   → sub-codes: Plo108
Jaket (32 items)  → sub-codes: Jkt110, Jkt113, Jkt115, Jkt116, Jkt117
Rompi (11 items)  → sub-codes: Rom124
Wearpack (6 items)
```

### 1.2 Extract unique components per product type

Dari detail sections setiap portfolio item, ekstrak:

| Komponen | Contoh dari Portfolio | Source |
|---|---|---|
| **Bahan** | American Drill, Taipan Tropical, Nagata Drill, Tropical, Lacoste 24s, Drifit | Section heading "American Drill", "Taipan Tropical", dll |
| **Kerah** | Kerah Sapit, Krah Belahan Depan | Section heading "Kerah Sapit" |
| **Bordir/Printing** | Bordir Komputer (Tajima Japan), Printing | Section heading "Bordir Komputer" |
| **Saku** | Saku Floi Segi 6, Saku Tempel Segi 4, Saku Racis | Section heading "Saku Floi..." |
| **Variasi** | Ampil Kancing, Anci Pundak, Emblem Velcro, Variasi Scotlite, Lis Cepit, Pecah Pola, Kombinasi Warna | Section heading masing-masing |
| **Lengan** | Lengan Pendek, Lengan Panjang | Section heading |
| **Furing** | Furing Peles | Section heading |
| **Resleting** | Resleting YEE | Section heading |

### 1.3 Build component reference

Setiap komponen punya:
```json
{
  "name": "Kerah Sapit",
  "category": "Collar",
  "description": "Kerah yang biasa digunakan untuk kemeja...",
  "image": "https://.../Kerah-sapit-1.jpg",
  "portfolio_sources": ["linkqu-linkita", "pt-samudera-trans-logistics", ...],
  "portfolio_count": 12
}
```

---

## Phase 2: Define Base Templates ✅ DONE

**Goal**: Replace generic archetype → base template dari portfolio real

### 2.1 Tentukan base template per product type × segment

Pilih portfolio item paling representatif sebagai "face" produk:

| Produk | Base Portfolio Item | Alasan |
|---|---|---|
| **Kemeja PDH Formal** | LINKQU & LINKITA | Lengkap: bahan, bordir, kerah, saku, anci, lengan |
| **Kemeja Lapangan** | PT Samudera Trans Logistics | American Drill + multi-variasi |
| **Kemeja Reguler** | Universitas Airlangga | Simpel, basic |
| **Polo Office** | RS Premiere Surabaya | Lacoste 24s, polo reguler |
| **Polo Drifit** | PT PLN UIP JBTB II | Drifit material |
| **Kaos Basic** | (derive dari kaos portfolio) | Combed 30s |
| **Jaket Bomber** | (derive dari jaket portfolio) | Mikro NS |
| **Rompi** | PT Bumi Gresik Sukses | Rompi premium + furing peles |
| **Wearpack** | (derive dari wearpack portfolio) | Drill |

### 2.2 Setiap template punya:

```json
{
  "name": "Corporate Workshirt",
  "slug": "corporate-workshirt",
  "segment": "business",
  "base_portfolio": "linkqu-linkita",
  "description": "Kemeja regular untuk kebutuhan seragam perusahaan...",
  "gallery": [
    "/images/portfolio/linkqu-linkita/full-view.jpg",
    "/images/portfolio/linkqu-linkita/kerah-sapit.jpg",
    "/images/portfolio/linkqu-linkita/bordir.jpg",
    ...
  ],
  "locked_spec": {
    "Collar": "Kerah Sapit",
    "Fabric": "Taipan Tropical",
    "Bordir": "Bordir Komputer",
    "Saku": "Saku Floi Segi 6",
    "Variasi": ["Anci Pundak", "Ampil Kancing"],
    "Sleeve": "Lengan Pendek"
  },
  "portfolio_count": 41,
  "portfolio_clients": ["PT PLN", "Shell", "Pertamina", ...]
}
```

---

## Phase 3: Rebuild Catalog Data ✅ DONE

**Goal**: Update `catalog.json` dengan data portfolio-driven

### 3.1 Dedup & merge archetype

**Sekarang**: 49 archetype, banyak duplikat  
**Target**: ~15-20 archetype unik, masing-masing punya identitas jelas

Business segment (~8-10 produk):
- Kemeja × 3 variant (Formal/PDH, Lapangan, Reguler)
- Polo × 2 variant (Lacoste, Drifit)
- Kaos × 1 variant
- Jaket × 2 variant (Bomber, Drill)
- Rompi × 1 variant
- Wearpack × 1 variant

### 3.2 Update `style_options` per garment_type

**Sekarang**: Generic ilustrasi SVG  
**Target**: Opsi dari portfolio, dengan foto real sebagai ilustrasi

```json
// Before
"Collar": [
  { "name": "Regular Spread", "illustration": "/images/customizer/style/collar-spread.svg" }
]

// After
"Collar": [
  {
    "name": "Kerah Sapit",
    "illustration": "/images/portfolio/components/kerah-sapit.jpg",
    "desc": "Kerah standar kemeja dengan kaki dan daun kerah.",
    "portfolio_count": 15,
    "portfolio_examples": ["linkqu-linkita", "pt-samudera"]
  },
  {
    "name": "Krah Belahan Depan",
    "illustration": "/images/portfolio/components/krah-belahan-depan.jpg",
    "desc": "Kerah dengan belahan di bagian depan.",
    "portfolio_count": 8
  }
]
```

### 3.3 Update `fabrics` dengan data real

**Sekarang**: 22 fabric entries, generic swatch  
**Target**: Fabric dari portfolio dengan foto close-up + deskripsi real

Contoh mapping portfolio → fabric:
```
"Taipan Tropical" → portfolio item "LINKQU & LINKITA" section "Taipan Tropical"
"American Drill" → portfolio item "PT Samudera" section "American Drill"
"Nagata Drill" → portfolio item (cari yang pakai Nagata)
"Lacoste 24s" → portfolio item "RS Premiere" section
```

### 3.4 Add `portfolio_references` ke archetype

Field baru di setiap archetype:
```json
{
  "portfolio_refs": {
    "base_item": "linkqu-linkita",
    "related_items": ["pt-samudera", "universitas-airlangga-4", ...],
    "client_count": 41,
    "featured_clients": ["PT PLN", "Shell", "Pertamina"]
  }
}
```

---

## Phase 4: UI Update ✅ DONE

**Goal**: Implement perubahan di halaman Astro

### 4.1 Business page (`/business`)

- Product card: tampilkan **portfolio_count** ("Sudah dipakai 41 perusahaan")
- Product card: gunakan **gallery[0]** dari portfolio (bukan placeholder)
- Filter: tetap pakai garment_type, tapi label + icon dari portfolio data

### 4.2 PDP (`/produk/[slug]`)

- Gallery: multi-image dari portfolio (hero + detail sections)
- Description: dari portfolio base item
- Design accordion: tampilkan locked_spec dengan **foto real** per komponen
- Tambah section **"Portofolio Serupa"**: 3-4 portfolio items lain yang pakai produk ini
- Fabric card: foto swatch dari portfolio + "Digunakan oleh X client"

### 4.3 Customizer (`/produk/[slug]/custom`)

- Pre-fill dengan base spec dari portfolio
- Style options: ilustrasi = foto close-up portfolio, bukan SVG generic
- Setiap opsi tampilkan badge "Sudah diproduksi untuk X client"
- Fabric panel: swatch = foto bahan dari portfolio
- Decoration: placement hotspot tetap, tapi technique options dari portfolio (bordir komputer, printing, dll)

---

## Phase 5: Image Pipeline ✅ DONE

**Goal**: Download & optimize semua gambar portfolio

### 5.1 Download

- 1067 unique URLs dari `kg_portfolio_data.md`
- Download ke `public/images/portfolio/[slug]/`
- Convert ke WebP
- Generate thumbnail untuk customizer swatches

### 5.2 Organize

```
public/images/
  portfolio/
    linkqu-linkita/
      hero.jpg
      taipan-tropical.jpg
      bordir-komputer.jpg
      kerah-sapit.jpg
      ...
    pt-samudera/
      hero.jpg
      american-drill.jpg
      ...
    components/        ← shared component images
      kerah-sapit.jpg
      american-drill.jpg
      bordir-komputer.jpg
      ...
```

---

## Execution Order

| Step | Task | Status | Output |
|---|---|---|---|
| **1** | Parse portfolio data → extract components per garment_type | ✅ Done | `docs/portfolio-components.json`, `src/data/portfolio.json` (156 items) |
| **2** | Map portfolio items to existing archetype | ✅ Done | `pdpSlug` field di setiap portfolio item |
| **3** | Define base templates (pilih portfolio representative) | ✅ Done | `docs/BASE_TEMPLATES.md` (12 produk) |
| **4** | Build new `catalog.json` structure | ✅ Done | `src/data/products/catalog.json` (12 archetype, 30 fabrics, 6 garment types) |
| **5** | Download & optimize images | ✅ Done | `public/images/portfolio/` — 864 WebP files, 22 component images |
| **6** | Update PDP UI | ✅ Done | `src/pages/produk/[slug].astro` — gallery, spec accordions, portofolio klien section |
| **7** | Update customizer style_options | ✅ Done | `src/pages/produk/[slug]/custom.astro` — 6 garment types, foto portfolio sebagai ilustrasi |
| **8** | Update business page | ✅ Done | `src/pages/business.astro` — 145 client cards, garment filter |
| **9** | Testing all segments | ✅ Done | Build: 128 pages, 0 errors |

**Total estimasi awal: ~19 jam (3-4 hari kerja) — ALL COMPLETE**

---

## Open Questions

1. ~~**Sub-code mapping**: Kmj100 vs Kmj102 vs Kmj105 — apa bedanya secara teknis?~~ → **RESOLVED**: Tidak ada perbedaan spec konsisten, skip sebagai differentiator.
2. ~~**Jumlah template**: Business perlu berapa variant per product type?~~ → **RESOLVED**: 12 archetype (kemeja ×3, polo ×2, kaos ×2, jaket ×3, rompi ×1, wearpack ×1).
3. ~~**Portfolio segment filter**: Portfolio tidak punya field "segment"?~~ → **RESOLVED**: Mapping manual berdasarkan nama client (business/campus/community/government).
4. ~~**Customizer scope**: Hanya kemeja atau semua?~~ → **RESOLVED**: Semua 6 garment types punya customizer entries (phase 1 scope was kemeja, tapi implementasi sudah cover semua).
5. ~~**Image hosting**: Lokal vs remote?~~ → **RESOLVED**: Download lokal ke `public/images/portfolio/`, remote URL sebagai fallback.

## Known Issues & Next Steps

1. ~~**Component image naming bug**~~ → ✅ Fixed: `variasi-ampil-kancing.webp`
2. ~~**Topi archetype missing**~~ → ✅ Fixed: `topi-corporate` archetype added, 11 portfolio items mapped, business page shows topi
3. ~~**Legacy `portfolio.ts`**~~ → ✅ Fixed: deleted `portfolio.ts` + `PortfolioGrid.astro`, all pages use `portfolio.json`
4. ~~**Customizer non-kemeja untested**~~ → ✅ Verified: all 7 garment types build correctly with proper tabs/fabrics/placements

**Remaining work**:
- Visual review via `astro dev` untuk spacing/layout di semua PDP + customizer pages
- Topi customizer: placement SVG diagram generic (pakai shirt shape) — perlu hat/cap SVG khusus
- Topi size_run S-XL (tanpa XXL) — sudah benan di data, tapi size guide table placeholder perlu disesuaikan untuk topi
