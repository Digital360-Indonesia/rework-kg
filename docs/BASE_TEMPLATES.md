# Base Template Definitions — Portfolio-Driven Catalog

**Date**: 2026-06-06
**Scope**: Business segment, 12 produk
**Customizer scope**: Kemeja only (phase 1)

---

## Keputusan Desain

1. **12 produk business** (down dari 49 archetype, banyak duplikat)
2. Setiap produk punya **base portfolio item** — foto real, spek real
3. **Segment mapping**: portfolio items ditandai segment berdasarkan nama client
4. **Image**: download ke lokal
5. **Locked spec** di-replace dengan komponen portfolio real (bukan istilah English generic)

---

## Produk 1: Kemeja Corporate Formal

| Field | Value |
|---|---|
| **Slug** | `kemeja-corporate-formal` |
| **Nama** | Kemeja Corporate Formal |
| **Base Portfolio** | #1 LINKQU & LINKITA (slug: `linkqu-linkita`) |
| **Alasan** | Lengkap 9 sections, Taipan Tropical + Kerah Sapit + saku + anci — kemeja formal paling representatif |
| **Garment Type** | kemeja |
| **Segment** | business |

**Locked Spec (from portfolio)**:
```json
{
  "Bahan": "Taipan Tropical",
  "Bordir": "Bordir Komputer",
  "Kerah": "Kerah Sapit",
  "Variasi": ["Emblem Velcro", "Ampil Kancing", "Anci Pundak"],
  "Saku": "Saku Floi Segi 6 Tertutup",
  "Lengan": "Lengan Pendek"
}
```

**Gallery (8 images from portfolio)**:
- Hero image
- Taipan Tropical close-up
- Bordir Komputer detail
- Emblem Velcro
- Kerah Sapit
- Ampil Kancing
- Anci Pundak
- Saku Floi Segi 6 Tertutup

**Related portfolio items** (41 kemeja items):
- PT Samudera Trans Logistics (#2), Universitas Airlangga (#3), DISHUB SURABAYA (#24), Kementrian PUPR (#145), PT Pertamina Patra Niaga (#94), dll

---

## Produk 2: Kemeja Lapangan

| Field | Value |
|---|---|
| **Slug** | `kemeja-lapangan` |
| **Nama** | Kemeja Lapangan |
| **Base Portfolio** | #2 PT Samudera Trans Logistics (slug: `pt-samudera-trans-logistics`) |
| **Alasan** | American Drill (tahan lama), multi-variasi (11 sections) — cocok untuk lapangan/operasional |
| **Garment Type** | kemeja |
| **Segment** | business |

**Locked Spec (from portfolio)**:
```json
{
  "Bahan": "American Drill",
  "Bordir": "Bordir Komputer",
  "Kerah": "Kerah Sapit",
  "Variasi": ["Anci Pundak", "Ampil Kancing", "Kombinasi Warna", "Scotlite", "Lis Cepit"],
  "Saku": "Saku Floi",
  "Lengan": "Lengan Pendek"
}
```

**Gallery (5 images)**: Hero + American Drill + Bordir + Kerah + Saku

---

## Produk 3: Kemeja Reguler

| Field | Value |
|---|---|
| **Slug** | `kemeja-reguler` |
| **Nama** | Kemeja Reguler |
| **Base Portfolio** | #3 Universitas Airlangga (slug: `universitas-airlangga`) |
| **Alasan** | Nagata Drill, simpel, spec minimal — template basic untuk kemeja |
| **Garment Type** | kemeja |
| **Segment** | business |

**Locked Spec (from portfolio)**:
```json
{
  "Bahan": "Nagata Drill",
  "Bordir": "Bordir Komputer",
  "Kerah": "Kerah Sapit",
  "Variasi": ["Anci Pundak"],
  "Saku": "Saku Floi Segi 6 Tertutup",
  "Lengan": "Lengan Panjang",
  "Extra": "Variasi Belahan Samping"
}
```

**Gallery (8 images)**: Hero + Nagata Drill + Bordir + Kerah + Anci + Saku + Lengan + Belahan

---

## Produk 4: Polo Office

| Field | Value |
|---|---|
| **Slug** | `polo-office` |
| **Nama** | Polo Office |
| **Base Portfolio** | #4 RS Premiere Surabaya (slug: `rs-premiere-surabaya`) |
| **Alasan** | Lacoste 24s, standar polo untuk office — lengkap 6 sections |
| **Garment Type** | polo |
| **Segment** | business |

**Locked Spec (from portfolio)**:
```json
{
  "Bahan": "Lacoste 24s",
  "Bordir": "Bordir Komputer",
  "Kerah": "Manset Krah",
  "Lengan": "Ujung Lengan Manset Pita",
  "Variasi": ["Stole dan Kancing"]
}
```

**Gallery (5 images)**: Hero + Lacoste 24s + Bordir + Kerah + Stole

---

## Produk 5: Polo Drifit

| Field | Value |
|---|---|
| **Slug** | `polo-drifit` |
| **Nama** | Polo Drifit |
| **Base Portfolio** | #5 PT PLN UIP JBTB II (slug: `pt-pln-uip-jbtb-ii`) |
| **Alasan** | Satu-satunya polo drifit yang punya enough sections untuk showcase |
| **Garment Type** | polo |
| **Segment** | business |

**Locked Spec (from portfolio)**:
```json
{
  "Bahan": "Drifit",
  "Printing": "Printing",
  "Kerah": "Variasi Krah dan Kancing",
  "Lengan": "Lengan Finishing Deck"
}
```

**Gallery (2 images)**: Hero + Drifit

---

## Produk 6: Kaos Brand Tee

| Field | Value |
|---|---|
| **Slug** | `kaos-brand-tee` |
| **Nama** | Kaos Brand Tee |
| **Base Portfolio** | #21 QUERENCIA (slug: `querencia`) |
| **Alasan** | Cotton Combed 30s + Sablon Plastisol — kombinasi paling umum, simpel |
| **Garment Type** | kaos |
| **Segment** | business |

**Locked Spec (from portfolio)**:
```json
{
  "Bahan": "Cotton Combed 30s",
  "Sablon": "Sablon Plastisol"
}
```

**Gallery (2 images)**: Hero + Sablon Plastisol

---

## Produk 7: Kaos Premium

| Field | Value |
|---|---|
| **Slug** | `kaos-premium` |
| **Nama** | Kaos Premium |
| **Base Portfolio** | #45 SCETCH (slug: `scetch`) |
| **Alasan** | Cotton Combed 24s (lebih tebal) + Sablon DTF Glossy — premium variant |
| **Garment Type** | kaos |
| **Segment** | business |

**Locked Spec (from portfolio)**:
```json
{
  "Bahan": "Cotton Combed 24s",
  "Sablon": "Sablon DTF Finishing Glossy"
}
```

---

## Produk 8: Jaket Bomber

| Field | Value |
|---|---|
| **Slug** | `jaket-bomber` |
| **Nama** | Jaket Bomber |
| **Base Portfolio** | #8 BMF ASO Telkom (slug: `bmf-aso-telkom`) |
| **Alasan** | Fleece PE + Manset Strip + Kancing — bomber classic KG style |
| **Garment Type** | jaket |
| **Segment** | business |

**Locked Spec (from portfolio)**:
```json
{
  "Bahan": "Fleece PE",
  "Bordir": "Bordir Komputer",
  "Manset": "Manset Variasi Strip",
  "Saku": "Saku Racis"
}
```

**Gallery (3 images)**: Hero + Fleece + Bordir

---

## Produk 9: Jaket Outdoor

| Field | Value |
|---|---|
| **Slug** | `jaket-outdoor` |
| **Nama** | Jaket Outdoor |
| **Base Portfolio** | #31 Shell Dupak Surabaya (slug: `shell-dupak-surabaya`) |
| **Alasan** | Taslan + Furing Drifit — jaket untuk outdoor/lapangan, berbeda dari bomber |
| **Garment Type** | jaket |
| **Segment** | business |

**Locked Spec (from portfolio)**:
```json
{
  "Bahan": "Taslan",
  "Furing": "Furing Drifit",
  "Sablon": "Sablon DTF",
  "Saku": "Saku Racis",
  "Kancing": "Kancing Cetekan Plastik"
}
```

---

## Produk 10: Jaket Varsity

| Field | Value |
|---|---|
| **Slug** | `jaket-varsity` |
| **Nama** | Jaket Varsity |
| **Base Portfolio** | #91 PT HM Sampoerna (slug: `pt-hm-sampoerna`) |
| **Alasan** | Varsity + Fleece CVC + Resleting YKK — varsity premium, item mewah |
| **Garment Type** | jaket |
| **Segment** | business |

**Locked Spec (from portfolio)**:
```json
{
  "Bahan": "Varsity + Fleece CVC",
  "Bordir": "Bordir Komputer",
  "Resleting": "Resleting Terbaik YKK",
  "Kerah": "Kerah Custom"
}
```

---

## Produk 11: Rompi

| Field | Value |
|---|---|
| **Slug** | `rompi-corporate` |
| **Nama** | Rompi Corporate |
| **Base Portfolio** | #6 PT Bumi Gresik Sukses (slug: `pt-bumi-gresik-sukses`) |
| **Alasan** | American Drill + Furing Peles + Resleting + Saku + Pecah Pola — rompi paling lengkap |
| **Garment Type** | rompi |
| **Segment** | business |

**Locked Spec (from portfolio)**:
```json
{
  "Bahan": "American Drill",
  "Furing": "Furing Peles",
  "Bordir": "Bordir Komputer",
  "Resleting": "Resleting Plastik YEE",
  "Saku": "Saku Tempel Segi 4 Tertutup",
  "Variasi": ["Pecah Pola"]
}
```

---

## Produk 12: Wearpack

| Field | Value |
|---|---|
| **Slug** | `wearpack-industrial` |
| **Nama** | Wearpack Industrial |
| **Base Portfolio** | #55 PT. PJB (slug: `pt-pjb`) |
| **Alasan** | Paling lengkap: 12 sections, multi-saku, scotlite, airflow — showcase wearpack full |
| **Garment Type** | wearpack |
| **Segment** | business |

**Locked Spec (from portfolio)**:
```json
{
  "Bahan": "Nagata Drill",
  "Bordir": "Bordir Komputer",
  "Resleting": "Resleting Terbaik YKK",
  "Saku": ["Saku Tempel 2 Posisi"],
  "Variasi": ["Ampil Velcro", "Scotlite Lengan 3cm", "Scotlite Celana 5cm", "Velcro Lengan", "Airflow"],
  "Extra": "Karet Belakang"
}
```

---

## Segment Mapping Rules

Portfolio items akan di-map ke segment berdasarkan nama client:

| Segment | Pattern | Contoh |
|---|---|---|
| **business** | Nama mengandung "PT", "Tbk", "RS", "Bank", brand korporat | PT PLN, Shell, Sampoerna, Pertamina |
| **campus** | Nama mengandung "Universitas", "SMA", "Politeknik", "MBI", "ITS", "UNAIR" | Universitas Airlangga, SMA Kemala Bhayangkari |
| **community** | Nama mengandung "Komunitas", "Suporter", "Choir", "AIESEC", "AR Rohmah" | Komunitas Guru Penggerak, UBAYA CHOIR |
| **government** | Nama mengandung "Kementrian", "DISHUB", "BPS", "Pemerintah", "Direktorat" | Kementrian PUPR, DISHUB Surabaya |

> **Catatan**: Segment mapping ini untuk filter social proof di PDP. Semua portfolio items tetap muncul sebagai bukti, tapi bisa di-filter per segment.

---

## Sub-code Pattern Analysis

Dari 41 kemeja items, sub-code muncul dengan pattern:

| Sub-code | Frequency | Bahan Utama | Notes |
|---|---|---|---|
| Kmj100 | 15 items | Campuran (Taipan, Nagata, American) | Sepertinya "standard" variant |
| Kmj105 | 16 items | Campuran | Sering paired dengan Kmj100 |
| Kmj102 | 5 items | Campuran | Jarang sendirian |
| Kmj103 | 6 items | Taipan, Nagata, non-Drill | Banyak yang non-Drill fabric |

**Sementara**: Sub-code tidak punya perbedaan spec yang konsisten. Kemungkinan batch/warna. **Tidak dijadikan basis template terpisah.**

---

## Open Questions Resolved

1. ~~Sub-code mapping~~ → Tidak ada perbedaan spec konsisten, skip sebagai differentiator
2. ~~Template count~~ → 12 produk (target 10-15 tercapai)
3. ~~Segment filter~~ → Mapping manual berdasarkan nama client
4. ~~Image hosting~~ → Download lokal
5. ~~Customizer scope~~ → Kemeja only untuk phase 1
