# Kustom Garment Product Customizer — v1 Specification

**Document version:** 1.0
**Date:** 23 May 2026
**Prepared for:** Lord-Manager (lead build agent)
**Project lead:** Arayas
**Scope:** Kustom Garment website rework — product catalog + configurator system

---

## 1. EXECUTIVE SUMMARY

### What we are building

A product-led custom garment ordering experience that replaces the existing "konveksi-style" generic product listing. Each product becomes a **named archetype** with an opinionated default specification, fabric-forward identity, and a guided customization flow. Inspired by Proper Cloth's archetype-driven catalog, but adapted to:

- Indonesian custom-garment market reality (made-by-order, no ready stock)
- Multi-segment buyer base (Business, Community, Campus)
- Hybrid online configurator + WhatsApp finalization flow

### Strategic positioning

Kustom Garment occupies a market gap:
- **Below:** Traditional konveksi (Cititex, generic) — ready-stock blank + DTF, no brand identity, race-to-bottom pricing
- **Above:** Big-brand bulk order (Uniqlo, The Executive) — premium but rigid, limited customization

Kustom Garment wins by being **premium-feel, fully made-by-order, with online configurator experience that no Indonesian konveksi competitor currently offers.**

### What V1 ships

- **20 product archetypes** across 3 segments (Business 12, Community 4, Campus 4)
- **Configurator** with 4 active customization dimensions: Fabric, Color, Decoration, Size/Quantity
- **Locked default style spec** per archetype (collar, cuff, pocket, etc — displayed but not user-editable in v1)
- **PDF spec sheet download** for customer to share/discuss
- **WhatsApp CTA** for order finalization, price confirmation, and edge-case requests

### What V1 explicitly defers

- Personal segment archetypes (delayed to v1.5 — Individu buyer data shows strong demand for Kaos/Jaket; reassess after v1 launch)
- User-editable style options (collar, cuff, pocket, etc — currently locked to defaults)
- Visual mockup rendering (PDF download is spec sheet only, not rendered preview)
- Pants and other garment categories beyond the 6 in scope

---

## 2. INFORMATION ARCHITECTURE

### Site flow

```
Homepage
  └─ CTA → Category Page (1 of 4 segments)
       └─ Product List (archetypes filtered by segment)
            └─ Product Detail Page
                 └─ Configurator (Fabric → Color → Decoration → Size → Summary)
                      └─ PDF Download + WhatsApp CTA
```

### Segment categories

| Segment | Target buyer | Coverage in v1 |
|---------|--------------|----------------|
| **Business** | Corporate HR, company event PIC, operational managers, service managers | Full (6 product types) |
| **Community** | Event committees, organizations, communities | Kemeja, Polo, Kaos, Jaket (no Rompi/Wearpack) |
| **Campus** | Student organizations, himpunan, class committees | Kemeja, Polo, Kaos, Jaket, Rompi (no Wearpack) |
| **Personal** | Individual buyers, premium/lifestyle | **Skipped in v1** — reassess for v1.5 based on data |

### Category page structure

Each segment category page shows:
- Segment hero copy (positioning relevant to buyer type)
- Filtered product archetype grid
- Reference customer case studies / past work (optional, content-dependent)

---

## 3. PRODUCT ARCHETYPE MATRIX

Total v1 launch: **20 archetypes**

| Garment | Business | Community | Campus |
|---------|----------|-----------|--------|
| **Kemeja** | Boardroom Shirt, Launching Shirt, Field Operation Shirt, Service Shirt | Crew Field Shirt | Campus Drill Workshirt, Standard Issue Workshirt |
| **Polo** | Office Polo | Heavyweight Field Polo | Pique Student Polo |
| **Kaos** | Brand Merch Tee | The Event Tee | Combed Class Tee |
| **Jaket** | Office Bomber, Corporate Drill Jacket, Event Windbreaker, Varsity Classic | Trail Windbreaker | Fleece Varsity |
| **Rompi** | Field Utility Vest, Fleece Vest | — | Standard Issue Vest |
| **Wearpack** | Industrial Wearpack | — | — |

---

## 4. CONFIGURATOR LOGIC — V1 SCOPE

### Active customization (customer can change)

1. **Fabric** — default per archetype, with upgrade/downgrade options
2. **Color** — within fabric availability; preset palettes per archetype
3. **Decoration** — type (embroidery/screen printing), placement, size; multiple decorations stackable
4. **Size & Quantity** — fill quantity per size from standard size run

### Locked specification (display only, not user-editable in v1)

Each archetype has a pre-defined default for:
- Collar style
- Cuff style
- Front / Placket
- Pocket configuration
- Yoke
- Bottom Hem
- Sleeve length

Displayed on product page as **"What's Included"** spec list. If customer wants to change locked spec, **WhatsApp CTA** handles it: *"Need a different collar/cuff/pocket configuration? Discuss via WhatsApp."*

### Configurator flow (per product detail page)

1. **Product hero** — name, description, default spec list, photography
2. **Step 1: Fabric** — show default, expandable for upgrade/downgrade options, brief fabric explainer
3. **Step 2: Color** — palette grid based on selected fabric availability
4. **Step 3: Decoration** — add decoration(s) by selecting type + placement + size
5. **Step 4: Size & Quantity** — size run with qty input per size
6. **Step 5: Summary** — final spec recap, estimated price range, CTA: [Download PDF Spec] + [Continue via WhatsApp]

---

## 5. PRICING MODEL

### Display strategy

- **Per-pc price range** displayed at all times (anchor psychology)
- Range adjusts dynamically as customer changes fabric, decoration, quantity
- **Total estimate** shown in Summary step after quantity entered
- Final price confirmation happens in WhatsApp — configurator price is **estimate**, not binding quote
- Disclaimer text near price: *"Estimasi harga. Konfirmasi akhir via WhatsApp setelah review spec."*

### Quantity multiplier (universal, applied to base price)

| Quantity | Multiplier vs base |
|----------|---------------------|
| 24-30 pcs (MOQ) | +15% (small batch surcharge) |
| 31-50 pcs | base price |
| 51-100 pcs | -5% |
| 101-200 pcs | -10% |
| 200+ pcs | -15% (or "Request Quote" override) |

### Decoration add-on pricing (flat per pc, universal across all garments)

| Decoration | Add-on per pc |
|------------|---------------|
| Bordir small (logo dada, ≤6cm) | +Rp 12.000 |
| Bordir medium (≤12cm) | +Rp 20.000 |
| Bordir large (back full / ≤25cm) | +Rp 35.000 |
| Sablon 1-3 warna small | +Rp 8.000 |
| Sablon 1-3 warna large | +Rp 18.000 |
| Sablon 4+ warna | +Rp 25.000 |
| Patch jahit | +Rp 15.000 |
| Nama individu (bordir) | +Rp 8.000 |
| Nama individu (sablon) | +Rp 5.000 |

Multiple decorations stack additively.

### Pricing principle for HPP calibration

Base price ranges in this spec are **conservative-to-high** intentionally. Better to come in **under expectation** during WhatsApp finalization than to overpromise on the web. Trust > apparent cheapness.

---

## 6. ARCHETYPE DETAIL SPECIFICATIONS

### Notation
- **Default** = pre-selected option shown to customer when product page loads
- **Upgrade/Downgrade** = alternative options customer can select
- **Locked** = displayed in spec but not user-editable in v1
- **Decoration default** = pre-suggested placement, customer can modify

---

### 6.1 KEMEJA (7 archetypes)

#### 6.1.1 Boardroom Shirt (Business)

**Positioning:** Daily corporate office uniform, premium-feel, slim formal cut

| Field | Value |
|-------|-------|
| Default fabric | Nagata |
| Upgrade options | Unione Drill, Texmoda |
| Downgrade options | American Drill |
| Color palette | White, Light Blue, Navy + custom (subject to fabric availability) |
| Locked: Collar | Regular Spread |
| Locked: Cuff | Standard Single Button |
| Locked: Front | Standard Placket |
| Locked: Pocket | None |
| Locked: Yoke | Standard |
| Locked: Hem | Straight (tucked) |
| Locked: Sleeve | Long |
| Decoration default | Left chest bordir small logo |
| Price range (base, per pc at 50 pcs) | Rp 95.000 – 130.000 |

---

#### 6.1.2 Launching Shirt (Business)

**Positioning:** Premium event/launching shirt, fabric naik kelas, modern dressy

| Field | Value |
|-------|-------|
| Default fabric | Unione Drill |
| Upgrade options | Texmoda |
| Downgrade options | Nagata |
| Color palette | Customer-chosen (event branding-driven) |
| Locked: Collar | Cutaway |
| Locked: Cuff | Double Button |
| Locked: Front | Hidden Placket |
| Locked: Pocket | None |
| Locked: Yoke | Standard |
| Locked: Hem | Straight |
| Locked: Sleeve | Long |
| Decoration default | Left chest bordir small + event date sleeve (optional) |
| Price range | Rp 115.000 – 155.000 |

---

#### 6.1.3 Field Operation Shirt (Business)

**Positioning:** Business workwear for operational/field teams, durable

| Field | Value |
|-------|-------|
| Default fabric | American Drill |
| Upgrade options | Nagata, Unione Drill |
| Downgrade options | Ribstop |
| Color palette | Navy, Khaki, Olive, Grey |
| Locked: Collar | Regular Spread |
| Locked: Cuff | Standard Single Button |
| Locked: Front | Standard Placket |
| Locked: Pocket | 2 Chest + Flap |
| Locked: Yoke | Split Back Yoke |
| Locked: Hem | Straight |
| Locked: Sleeve | Long |
| Decoration default | Left chest bordir + back medium logo |
| Price range | Rp 105.000 – 140.000 |

---

#### 6.1.4 Service Shirt (Business)

**Positioning:** Lightweight breathable shirt for frontliner/service crew

| Field | Value |
|-------|-------|
| Default fabric | Ribstop |
| Upgrade options | Nagata |
| Downgrade options | Texmoda |
| Color palette | Customer brand color |
| Locked: Collar | Regular Spread |
| Locked: Cuff | Standard Single Button |
| Locked: Front | Standard Placket |
| Locked: Pocket | 1 Chest Pocket |
| Locked: Yoke | Standard |
| Locked: Hem | Curved (untucked-friendly) |
| Locked: Sleeve | Short |
| Decoration default | Left chest bordir + name tag right chest |
| Price range | Rp 80.000 – 110.000 |

---

#### 6.1.5 Crew Field Shirt (Community)

**Positioning:** Community/event crew shirt, relaxed, durability-focused

| Field | Value |
|-------|-------|
| Default fabric | American Drill |
| Upgrade options | Nagata, Unione Drill |
| Color palette | Customer-chosen (community color) |
| Locked: Collar | Regular Spread |
| Locked: Cuff | Standard Single Button |
| Locked: Front | Standard Placket |
| Locked: Pocket | 2 Chest + Flap |
| Locked: Yoke | Split Back Yoke |
| Locked: Hem | Straight |
| Locked: Sleeve | Long |
| Decoration default | Back large logo + left chest small + name patch |
| Price range (at 30 pcs) | Rp 95.000 – 125.000 |

---

#### 6.1.6 Campus Drill Workshirt (Campus)

**Positioning:** Campus org workshirt, fabric-forward branding, casual & approachable

| Field | Value |
|-------|-------|
| Default fabric | American Drill |
| Upgrade options | Nagata, Unione Drill |
| Color palette | Customer-chosen (himpunan color) |
| Locked: Collar | Regular Spread |
| Locked: Cuff | Standard Single Button |
| Locked: Front | Standard Placket |
| Locked: Pocket | 2 Chest + Flap |
| Locked: Yoke | Split Back Yoke |
| Locked: Hem | Straight |
| Locked: Sleeve | Long |
| Decoration default | Back large logo + left chest patch + sleeve org name |
| Price range (at 30 pcs) | Rp 85.000 – 115.000 |

---

#### 6.1.7 Standard Issue Workshirt (Campus)

**Positioning:** Campus org formal/uniform feel, heritage military-inspired

| Field | Value |
|-------|-------|
| Default fabric | **Unione Drill** *(adjusted from Nagata based on data — Sekolah dominates Unione Drill orders)* |
| Upgrade options | Nagata |
| Downgrade options | American Drill |
| Color palette | Navy, Khaki, Olive (military palette) |
| Locked: Collar | Regular Spread |
| Locked: Cuff | Standard Single Button |
| Locked: Front | Standard Placket |
| Locked: Pocket | 2 Chest + Flap |
| Locked: Yoke | Split Back Yoke |
| Locked: Hem | Straight |
| Locked: Sleeve | Long |
| Decoration default | Left chest bordir org logo + name tag right chest + sleeve flag |
| Price range (at 30 pcs) | Rp 95.000 – 125.000 |

---

### 6.2 POLO (3 archetypes)

**Universal locked spec for all Polo:**
- Collar: Standard polo collar (ribbed)
- Placket: 2-3 button placket
- Sleeve: Short
- Hem: Side-slit
- Cuff: Ribbed

---

#### 6.2.1 Office Polo (Business)

**Positioning:** Daily corporate polo, slim modern fit

| Field | Value |
|-------|-------|
| Default fabric | Lacoste 24s |
| Upgrade options | Lacoste 30s |
| Downgrade options | Lacoste 18s |
| Color palette | Navy, White, Black, Grey, Maroon |
| Decoration default | Left chest bordir small logo |
| Price range (at 50 pcs) | Rp 75.000 – 100.000 |

---

#### 6.2.2 Heavyweight Field Polo (Community)

**Positioning:** Durable polo for crew/event, structured feel

| Field | Value |
|-------|-------|
| Default fabric | **Lacoste 24s** *(adjusted from Lacoste 18s — data shows 18s dominated by 3 corporate mega-orders, 24s is true workhorse)* |
| Upgrade options | Lacoste 18s (heavier, for high-volume orders) |
| Color palette | Customer-chosen |
| Decoration default | Back medium logo + left chest small |
| Price range (at 30 pcs) | Rp 80.000 – 105.000 |

---

#### 6.2.3 Pique Student Polo (Campus)

**Positioning:** Campus org polo, fabric-forward identity (Lacoste pique)

| Field | Value |
|-------|-------|
| Default fabric | Lacoste 24s |
| Upgrade options | Lacoste 30s |
| Downgrade options | Lacoste 18s |
| Color palette | Customer-chosen (himpunan color) |
| Decoration default | Left chest bordir + sleeve org name |
| Price range (at 30 pcs) | Rp 70.000 – 95.000 |

---

### 6.3 KAOS (3 archetypes)

**Universal locked spec for all Kaos:**
- Neckline: Crew neck
- Sleeve: Short
- Cut: Standard fit
- Hem: Straight

---

#### 6.3.1 Brand Merch Tee (Business)

**Positioning:** Premium-feel merchandise/giveaway tee

| Field | Value |
|-------|-------|
| Default fabric | Combed 30s |
| Upgrade options | Combed 20s (heavy) |
| Downgrade options | Combed 24s |
| Color palette | Black, White, Navy, Grey, Heather |
| Decoration default | Left chest small sablon + back small logo |
| Price range (at 50 pcs) | Rp 55.000 – 80.000 |

---

#### 6.3.2 The Event Tee (Community)

**Positioning:** Event/community tee, sablon-friendly, full identity expression

| Field | Value |
|-------|-------|
| Default fabric | Combed 24s |
| Upgrade options | Combed 30s |
| Downgrade options | Soft PE |
| Color palette | Customer-chosen |
| Decoration default | Back large sablon + front center medium |
| Price range (at 50 pcs) | Rp 45.000 – 70.000 |

---

#### 6.3.3 Combed Class Tee (Campus)

**Positioning:** Campus class/angkatan tee, identity-driven

| Field | Value |
|-------|-------|
| Default fabric | **Combed 30s** *(adjusted from Combed 24s — data shows Sekolah dominates Combed 30s)* |
| Upgrade options | Combed 20s |
| Downgrade options | Combed 24s |
| Color palette | Customer-chosen (class color) |
| Decoration default | Back large sablon (class name + year) + front center small |
| Price range (at 30 pcs) | Rp 45.000 – 70.000 |

---

### 6.4 JAKET (6 archetypes)

Note: Jaket locked spec varies significantly per archetype (vs Polo/Kaos which share universal spec).

---

#### 6.4.1 Office Bomber (Business)

**Positioning:** Modern corporate bomber, light-medium weight

| Field | Value |
|-------|-------|
| Default fabric | Mikro NS |
| Upgrade options | Taslan |
| Downgrade options | Despo |
| Color palette | Navy, Black, Grey, Maroon |
| Locked: Closure | Zipper front |
| Locked: Cuff | Ribbed cuff & hem |
| Locked: Hood | None |
| Locked: Lining | Standard inner lining |
| Decoration default | Left chest bordir + back medium logo |
| Price range (at 30 pcs) | Rp 145.000 – 195.000 |

---

#### 6.4.2 Corporate Drill Jacket (Business)

**Positioning:** Heavyweight workwear jacket for operational team

| Field | Value |
|-------|-------|
| Default fabric | American Drill |
| Upgrade options | Unione Drill, Nagata |
| Color palette | Navy, Khaki, Olive, Grey |
| Locked: Closure | Button front |
| Locked: Cuff | Standard cuff |
| Locked: Hood | None |
| Locked: Pocket | 2 chest + 2 side pockets |
| Decoration default | Left chest bordir + back large logo |
| Price range (at 30 pcs) | Rp 165.000 – 215.000 |

---

#### 6.4.3 Event Windbreaker (Business)

**Positioning:** Lightweight water-resistant jacket for outdoor company event

| Field | Value |
|-------|-------|
| Default fabric | Taslan |
| Downgrade options | Despo |
| Color palette | Customer brand color |
| Locked: Closure | Half-zip or full-zip pullover |
| Locked: Hood | With drawstring |
| Locked: Cuff | Elastic cuff & hem |
| Locked: Weight | Lightweight, packable |
| Decoration default | Front left chest small + back large sablon |
| Price range (at 30 pcs) | Rp 125.000 – 175.000 |

---

#### 6.4.4 Varsity Classic (Business)

**Positioning:** Premium varsity-style jacket for corporate, structured heritage feel

| Field | Value |
|-------|-------|
| Default fabric | Drill body + Mikro NS sleeves (classic varsity) |
| Upgrade options | Fleece body, Wool-blend body |
| Color palette | Navy/cream, Black/cream, Maroon/cream + custom combos |
| Locked: Closure | Button front |
| Locked: Cuff | Ribbed cuff, collar, hem |
| Locked: Lining | Standard inner lining |
| Decoration default | Left chest patch + back large bordir/patch |
| Price range (at 30 pcs) | Rp 195.000 – 275.000 |

---

#### 6.4.5 Trail Windbreaker (Community)

**Positioning:** Community/event outdoor jacket, light & water-resistant

| Field | Value |
|-------|-------|
| Default fabric | Despo |
| Upgrade options | Taslan |
| Color palette | Customer-chosen |
| Locked: Closure | Half-zip pullover |
| Locked: Hood | With drawstring |
| Locked: Cuff | Elastic cuff & hem |
| Locked: Weight | Packable |
| Decoration default | Back large sablon + front left chest |
| Price range (at 30 pcs) | Rp 115.000 – 160.000 |

---

#### 6.4.6 Fleece Varsity (Campus)

**Positioning:** Signature campus varsity, fleece body, distinctly Campus identity

| Field | Value |
|-------|-------|
| Default fabric | Fleece body + American Drill sleeves |
| Upgrade options | Premium fleece body, Faux leather sleeves |
| Color palette | Customer-chosen (himpunan color combo) |
| Locked: Closure | Button front |
| Locked: Cuff | Ribbed cuff, collar, hem |
| Locked: Sleeves | Contrast sleeves |
| Locked: Hood | None |
| Decoration default | Back large patch/bordir + left chest small + sleeve name |
| Price range (at 30 pcs) | Rp 175.000 – 235.000 |

---

### 6.5 ROMPI (3 archetypes)

---

#### 6.5.1 Field Utility Vest (Business)

**Positioning:** Operational/field vest, multi-pocket, structured

| Field | Value |
|-------|-------|
| Default fabric | Peles |
| Upgrade options | Nagata |
| Downgrade options | American Drill |
| Color palette | Navy, Khaki, Olive, Grey |
| Locked: Closure | Button or zipper front |
| Locked: Pocket | Multi-pocket (4-6 utility pockets) |
| Locked: Collar | Standard collar |
| Decoration default | Left chest bordir + back medium logo |
| Price range (at 30 pcs) | Rp 125.000 – 170.000 |

---

#### 6.5.2 Fleece Vest (Business)

**Positioning:** Indoor office layering vest, fleece comfort, smart-casual

| Field | Value |
|-------|-------|
| Default fabric | Standard fleece |
| Upgrade options | Premium fleece blend |
| Color palette | Black, Navy, Grey, Heather |
| Locked: Closure | Zipper front |
| Locked: Pocket | 2 side pockets |
| Locked: Hood | None |
| Decoration default | Left chest bordir (small logo) |
| Decoration limitations | Limited placements due to fleece texture |
| Price range (at 30 pcs) | Rp 135.000 – 175.000 |

---

#### 6.5.3 Standard Issue Vest (Campus)

**Positioning:** Campus org formal vest, uniform-feel, badge-friendly

| Field | Value |
|-------|-------|
| Default fabric | **Unione Drill** *(adjusted from Nagata based on data — Sekolah dominates Unione Drill for Rompi)* |
| Upgrade options | Nagata |
| Downgrade options | American Drill |
| Color palette | Navy, Khaki, Olive |
| Locked: Closure | Button front |
| Locked: Pocket | 2 chest + 2 side pockets |
| Locked: Collar | Standard collar |
| Decoration default | Left chest bordir org + name tag right + sleeve org name |
| Price range (at 30 pcs) | Rp 115.000 – 155.000 |

---

### 6.6 WEARPACK (1 archetype)

---

#### 6.6.1 Industrial Wearpack (Business)

**Positioning:** Heavy-duty industrial coverall, full coverage, durability-focused

| Field | Value |
|-------|-------|
| Default fabric | Nagata |
| Upgrade options | Tropical (heat-resistant variant) |
| Downgrade options | American Drill |
| Color palette | Navy, Orange (safety), Khaki, Grey |
| Locked: Construction | One-piece coverall |
| Locked: Closure | Zipper front |
| Locked: Sleeve | Long |
| Locked: Pocket | Multi-pocket |
| Locked: Collar | Standard collar |
| Decoration default | Left chest bordir company logo + back large bordir/sablon |
| Price range (at 30 pcs) | Rp 175.000 – 235.000 |

---

## 7. SIZE STRUCTURE

### Default size run (universal)

S, M, L, XL, XXL (+XXXL available on request)

Customer fills quantity per size in configurator. Total quantity calculates against quantity multiplier (Section 5).

### Size guide

- Link to size guide accessible from product detail page and configurator size step
- Per-garment-type size guide (Kemeja measurements differ from Jaket, etc) — to be detailed by photography/content team
- Custom sizing requests handled via WhatsApp

---

## 8. OUTPUT: PDF SPEC SHEET

### Contents (v1 — text-based spec sheet, no visual rendering)

When customer clicks "Download PDF Spec":

1. **Header:** Kustom Garment logo, archetype name, date
2. **Customer info:** Name, email, WhatsApp (collected at download step)
3. **Product specification:**
   - Archetype name + positioning line
   - Selected fabric
   - Selected color
   - Decoration list with placement
   - Size & quantity breakdown
   - Locked style spec (collar, cuff, etc — displayed for reference)
4. **Pricing estimate:**
   - Per-pc range
   - Total range estimate
   - Disclaimer: "Estimasi harga. Konfirmasi akhir via WhatsApp."
5. **Next steps:**
   - QR code → WhatsApp link with pre-filled message containing spec summary
   - Or direct WhatsApp number with copy-paste-ready spec text

### Technical implementation

- Use WeasyPrint (HTML → PDF) — consistent with existing Fabrik Group tooling
- Template-based, dynamic content from configurator state
- Branded with Kustom Garment colors (bright orange #ff4b00)

### V2 future enhancement

Visual mockup PDF (logo placement rendered on product silhouette) — deferred to v2 after configurator + spec sheet proven.

---

## 9. WHATSAPP HANDOFF FLOW

### Pre-filled WhatsApp message format

When customer clicks "Continue via WhatsApp" from Summary or PDF:

```
Halo Kustom Garment, saya ingin order:

Product: [Archetype Name]
Bahan: [Selected Fabric]
Warna: [Selected Color]
Dekorasi:
- [Decoration 1 with placement]
- [Decoration 2 with placement]
Quantity: [Total pcs]
- S: [qty]
- M: [qty]
- L: [qty]
- XL: [qty]
- XXL: [qty]

Estimasi harga (dari web): Rp [range] / pc

Mohon konfirmasi final price dan availability. Terima kasih!
```

### Team SOP

Sales team receives WhatsApp with full spec → confirms availability, adjusts price if needed, processes order. No need to re-collect basic info — configurator already captured intent.

---

## 10. DATA-DRIVEN ADJUSTMENTS LOG

Based on 2025 order data analysis, the following defaults were adjusted from initial assumptions:

| Archetype | Original Default | Adjusted To | Rationale |
|-----------|------------------|-------------|-----------|
| Standard Issue Workshirt | Nagata | Unione Drill | Sekolah dominates Unione Drill kemeja orders (53 orders, top kategori) |
| Heavyweight Field Polo | Lacoste 18s | Lacoste 24s (18s as upgrade) | Lacoste 18s actually 3 corporate mega-orders, not Community workhorse |
| Combed Class Tee | Combed 24s | Combed 30s | Sekolah top kategori for Combed 30s (15 orders), not 24s |
| Standard Issue Vest | Nagata | Unione Drill | Sekolah dominates Unione Drill rompi orders |

### Strategic insight not actioned in v1

**Individu (Personal) segment is top kategori for Combed 24s Kaos, Taslan Jaket, and American Drill Jaket.** Significant demand exists. Personal segment intentionally deferred to v1.5 to maintain v1 launch discipline, but Lord-Manager should be aware: post-launch, Personal segment archetypes (Essential Tee, City Layer) are strong priority.

---

## 11. IMPLEMENTATION PRIORITIES & SEQUENCING

### Phase 1: Foundation (parallel-eligible)
1. Database schema for archetypes (fabric options, color palettes, locked spec, decoration defaults, pricing)
2. Configurator state management
3. Product detail page template
4. Category page template (filter by segment)

### Phase 2: Configurator UI
1. Fabric selection step
2. Color selection step (fabric-dependent)
3. Decoration selection step (multi-add)
4. Size/quantity step
5. Summary step with dynamic pricing

### Phase 3: Output & handoff
1. PDF spec sheet generation (WeasyPrint)
2. WhatsApp link generation with pre-filled message
3. Customer info capture form

### Phase 4: Content population
1. Per-archetype copy (positioning, default spec list, fabric explainer)
2. Per-archetype photography (default + key fabric/color variants)
3. Size guides per garment type

### Phase 5: Launch QA
1. Configurator end-to-end testing per archetype (20 flows)
2. Pricing calculation validation
3. PDF output validation
4. WhatsApp link integrity check

---

## 12. OPEN QUESTIONS / DEFERRED DECISIONS

For Lord-Manager to surface or for Arayas to decide:

1. **Photography asset readiness** — does each archetype need real product photo before launch, or can stock/illustration suffice for v1? Affects launch timeline significantly.
2. **Color palette specification** — palettes listed in archetype specs are illustrative; final palettes need fabric supplier confirmation.
3. **Per-archetype copy** — positioning lines included in this spec are working drafts; final marketing copy to be developed alongside or after build.
4. **Configurator analytics tracking** — what events to log for v1.5 data-driven optimization? (Recommend: fabric upgrade rate per archetype, decoration mix, qty distribution, abandonment step)
5. **Mobile vs desktop priority** — configurator is multi-step; mobile experience needs careful flow design. Mobile-first vs desktop-first?

---

## 13. POST-V1 ROADMAP (informational)

### v1.5 (target: 4-6 weeks after v1 launch)
- Personal segment archetypes: Essential Tee, City Layer, optionally Atelier Linen
- User-editable style options (collar, cuff, pocket toggles) for select archetypes
- Configurator analytics dashboard for fabric/decoration mix insights

### v2 (target: 3-6 months after v1)
- Visual mockup PDF rendering (logo placement on product silhouette)
- Online quote-to-order flow (skip WhatsApp for repeat customers)
- Pants and additional garment categories
- Customer portal for repeat orders / saved configurations

---

**END OF SPECIFICATION**

*Prepared by Arayas in collaboration with master control. All defaults grounded in 2025 Kustom Garment order data. Adjustments and refinements expected as Lord-Manager surfaces implementation realities.*
