# Kustom Garment Product Customizer — Spec Addendum #1

**Document version:** 1.0
**Date:** 23 May 2026
**Prepared for:** Lord-Manager
**Companion to:** kustom-garment-product-customizer-spec.md (v1.0)
**Purpose:** Close 6 gaps identified by Lord-Manager analysis; enable Phase-0 vertical slice build

---

## PREAMBLE — Working Values Principle

Per project lead direction: values in this addendum are **working defaults**, not real-world calibrated final values. Ship the engine with these, visualize the full flow, then iterate based on what visualization reveals + operational team input.

This is intentional. Building with sensible placeholders > waiting for perfect data. Structural design is foundation work; data calibration is iteration work.

---

## 1. UNIVERSAL DEFAULT COLOR PALETTE

**Decision:** Single universal color palette applied to ALL fabrics across ALL products in v1. Color-fabric availability matrix deferred to v1.5 after visualization phase reveals real demand patterns.

### v1 Color Palette (10 colors, applies universally)

| Color Name | Hex | Typical Use Context |
|------------|-----|---------------------|
| White | #FFFFFF | Universal base, dressy shirts |
| Black | #1A1A1A | Universal base, premium |
| Navy | #1B2A4E | Corporate, campus, most common |
| Khaki | #8B7355 | Workwear-leaning |
| Olive | #4A5D3A | Workwear, military |
| Grey | #6B7280 | Neutral universal |
| Maroon | #6B1F2E | Campus/corporate accent |
| Light Blue | #A8C5E0 | Corporate dressy |
| Cream | #F5E6D3 | Premium, varsity contrast |
| Orange Safety | #FF6B1A | Wearpack, safety |

**Configurator behavior:**
- All 10 colors shown for every product
- Customer can select 1 color (or 2 for contrast products like Varsity Classic, Fleece Varsity)
- "Custom color" option below palette → opens text input field → WhatsApp confirmation required

**Post-launch iteration:**
- Track which colors customer pick per archetype
- v1.5: curate per-fabric availability matrix based on data + operations input

---

## 2. FABRIC DELTA PRICING (working values)

**Formula application:** `fabricAdjustedPrice = basePrice + fabric.deltaPerPc`

Mid-tier fabric per garment type = base reference (delta = 0).

### KEMEJA

| Fabric | Delta per pc | Tier |
|--------|--------------|------|
| Ribstop | -Rp 8.000 | Budget |
| American Drill | -Rp 5.000 | Standard |
| Unione Drill | Rp 0 | **Mid (reference)** |
| Nagata | +Rp 8.000 | Premium |
| Texmoda | +Rp 20.000 | Top premium |

### POLO

| Fabric | Delta per pc | Tier |
|--------|--------------|------|
| Lacoste 18s | -Rp 5.000 | Heavy-duty bulk |
| Lacoste 20s | -Rp 3.000 | Standard |
| Lacoste 24s | Rp 0 | **Mid (reference)** |
| Lacoste 30s | +Rp 10.000 | Premium light |

### KAOS

| Fabric | Delta per pc | Tier |
|--------|--------------|------|
| Soft PE | -Rp 10.000 | Budget |
| Combed 20s | -Rp 3.000 | Heavy basic |
| Combed 24s | Rp 0 | **Mid (reference)** |
| Combed 30s | +Rp 8.000 | Premium light |

### JAKET

| Fabric | Delta per pc | Tier |
|--------|--------------|------|
| Despo | -Rp 15.000 | Budget windbreaker |
| Mikro NS | -Rp 5.000 | Light standard |
| Taslan | Rp 0 | **Mid (reference)** |
| American Drill | +Rp 10.000 | Heavy structured |
| Unione Drill | +Rp 15.000 | Premium structured |
| Nagata | +Rp 20.000 | Premium dressy |
| Fleece body + Drill sleeves | +Rp 35.000 | Varsity construction |
| Premium fleece / Wool blend | +Rp 60.000 | Top premium |
| Faux leather sleeves (upgrade only) | +Rp 25.000 | Varsity accent |

### ROMPI

| Fabric | Delta per pc | Tier |
|--------|--------------|------|
| American Drill | -Rp 8.000 | Budget |
| Unione Drill | -Rp 3.000 | Standard |
| Peles | Rp 0 | **Mid (reference)** |
| Nagata | +Rp 10.000 | Premium |
| Standard fleece | +Rp 15.000 | Indoor comfort |
| Premium fleece blend | +Rp 30.000 | Top premium |

### WEARPACK

| Fabric | Delta per pc | Tier |
|--------|--------------|------|
| American Drill | -Rp 10.000 | Budget |
| Nagata | Rp 0 | **Mid (reference)** |
| Tropical | +Rp 15.000 | Heat-resistant |

---

## 3. PRICING FORMULA — DETERMINISTIC

```
Step 1: Base Price per pc
  basePrice = archetype.basePricePerPc

Step 2: Apply Fabric Delta
  fabricAdjustedPrice = basePrice + fabric.deltaPerPc

Step 3: Apply Quantity Multiplier
  qtyAdjustedPrice = fabricAdjustedPrice × quantityMultiplier
  
  Quantity Multiplier tiers:
    24-30 pcs   → 1.15   (small batch surcharge)
    31-50 pcs   → 1.00   (base)
    51-100 pcs  → 0.95
    101-200 pcs → 0.90
    200+ pcs    → 0.85   (or "Request Quote" override)

Step 4: Add Decorations (per pc)
  decorationTotal = Σ(decoration.addOnPerPc) 
                    for each selected decoration

Step 5: Final per pc
  finalPerPc = qtyAdjustedPrice + decorationTotal

Step 6: Display Range (per pc)
  rangeLow  = finalPerPc × 0.90
  rangeHigh = finalPerPc × 1.10

Step 7: Total Estimate
  totalLow  = rangeLow  × totalQty
  totalHigh = rangeHigh × totalQty
```

### What the ±10% range represents
- Color complexity variations (some colors require dye lot adjustments)
- Decoration artwork complexity (within size class)
- Finishing detail variations
- Buffer for honest final-quote adjustment via WhatsApp

### Display strategy
- **Product page:** show per-pc range, update real-time as fabric/decoration changes
- **Summary step:** show per-pc range + total range, after quantity entered
- **Disclaimer:** "Estimasi harga. Konfirmasi akhir via WhatsApp setelah review spec."

---

## 4. ARCHETYPE BASE PRICE REFERENCE

Mid-point of price range from main spec §6 = `basePricePerPc` for formula.

| Archetype | Base Price Mid-point (per pc) |
|-----------|-------------------------------|
| Boardroom Shirt | Rp 112.500 |
| Launching Shirt | Rp 135.000 |
| Field Operation Shirt | Rp 122.500 |
| Service Shirt | Rp 95.000 |
| Crew Field Shirt | Rp 110.000 |
| Campus Drill Workshirt | Rp 100.000 |
| Standard Issue Workshirt | Rp 110.000 |
| Office Polo | Rp 87.500 |
| Heavyweight Field Polo | Rp 92.500 |
| Pique Student Polo | Rp 82.500 |
| Brand Merch Tee | Rp 67.500 |
| The Event Tee | Rp 57.500 |
| Combed Class Tee | Rp 57.500 |
| Office Bomber | Rp 170.000 |
| Corporate Drill Jacket | Rp 190.000 |
| Event Windbreaker | Rp 150.000 |
| Varsity Classic | Rp 235.000 |
| Trail Windbreaker | Rp 137.500 |
| Fleece Varsity | Rp 205.000 |
| Field Utility Vest | Rp 147.500 |
| Fleece Vest | Rp 155.000 |
| Standard Issue Vest | Rp 135.000 |
| Industrial Wearpack | Rp 205.000 |

---

## 5. DECORATION PLACEMENT MATRIX

Per garment type, available placement options for customer to choose from.

| Garment | Available Placements |
|---------|----------------------|
| **Kemeja** | Left chest, Right chest, Back center, Sleeve Left, Sleeve Right, Collar, Name tag right chest |
| **Polo** | Left chest, Right chest, Back upper, Sleeve Left, Sleeve Right, Collar |
| **Kaos** | Left chest, Right chest, Back center, Back upper, Front center, Sleeve Left, Sleeve Right |
| **Jaket** | Left chest, Right chest, Back center, Back upper, Sleeve Left, Sleeve Right |
| **Rompi** | Left chest, Right chest, Back center, Name tag right chest |
| **Wearpack** | Left chest, Right chest, Back center, Sleeve Left, Sleeve Right, Name tag right chest |

### Decoration size classes (universal)

| Size class | Dimension constraint |
|-----------|----------------------|
| Small | ≤6cm |
| Medium | ≤12cm |
| Large | ≤25cm |

Size class drives decoration add-on pricing (see main spec §5 decoration table).

### Configurator decoration step behavior

1. Customer clicks "Add Decoration"
2. Select decoration type (bordir / sablon / patch / nama individu)
3. Select placement from garment-specific list
4. Select size class (small / medium / large)
5. Optional: notes field for color count, artwork file upload (or "kirim artwork via WhatsApp")
6. Add-on price added to per-pc calculation
7. Customer can add multiple decorations; stack additively

---

## 6. PDF GENERATION — DEFERRED

**Decision:** PDF spec sheet download deferred from v1 launch to **Phase 3 or post-launch sub-phase.**

### Rationale
- WhatsApp pre-filled message (main spec §9) already carries full structured spec
- PDF adds server-side complexity (WeasyPrint Python service on VPS)
- Customer journey: configurator → WhatsApp works end-to-end without PDF
- Faster v1 launch = more discipline, faster validation, lower surface area

### Re-introduction trigger
Add PDF when one of these happens:
- Customer feedback consistently requests downloadable spec
- Sales team finds WhatsApp text format insufficient for internal handoff
- Brand maturity requires "polished deliverable" perception

---

## 7. BRAND COLOR CORRECTION

**Correct value:** `#ff4c00`

**Previous typo:** `#ff4b00` (main spec §8)

Apply correction to:
- Configurator brand color tokens
- Future PDF brand tokens (when PDF re-introduced)
- Any asset documentation derived from main spec

---

## 8. POCKETBASE DATA MODEL — RECOMMENDED COLLECTIONS

Based on Lord-Manager's architecture recommendation (PocketBase as catalog backbone), suggested collection structure:

### `archetypes`
| Field | Type | Notes |
|-------|------|-------|
| id | auto | |
| name | text | "Boardroom Shirt" |
| slug | text | URL-friendly: "boardroom-shirt" |
| garment_type | relation → garment_types | |
| segment | enum | business / community / campus / personal |
| positioning | text | One-liner description |
| base_price_per_pc | number | Mid-point reference |
| default_fabric | relation → fabrics | |
| upgrade_fabrics | relation → fabrics (multi) | |
| downgrade_fabrics | relation → fabrics (multi) | |
| locked_spec | json | {collar, cuff, front, pocket, yoke, hem, sleeve, etc} |
| default_decoration | json | [{type, placement, size}] |
| hero_image | file | |
| gallery_images | file (multi) | |
| sort_order | number | |
| active | bool | |

### `fabrics`
| Field | Type | Notes |
|-------|------|-------|
| id | auto | |
| name | text | "Nagata" |
| garment_type | relation → garment_types | |
| delta_per_pc | number | Pricing delta |
| tier | enum | budget / standard / mid / premium / top |
| description | text | For tooltip in configurator |
| swatch_image | file | Optional fabric swatch photo |

### `colors`
| Field | Type | Notes |
|-------|------|-------|
| id | auto | |
| name | text | "Navy" |
| hex | text | "#1B2A4E" |
| sort_order | number | |

### `decoration_types`
| Field | Type | Notes |
|-------|------|-------|
| id | auto | |
| name | text | "Bordir small" |
| size_class | enum | small / medium / large |
| technique | enum | embroidery / screen_print / patch / individual_name |
| add_on_per_pc | number | |

### `garment_types`
| Field | Type | Notes |
|-------|------|-------|
| id | auto | |
| name | text | "Kemeja" |
| placements | json | ["Left chest", "Right chest", ...] |
| size_run | json | ["S", "M", "L", "XL", "XXL"] |

### `pricing_rules`
| Field | Type | Notes |
|-------|------|-------|
| id | auto | |
| min_qty | number | |
| max_qty | number | |
| multiplier | number | 1.15, 1.00, 0.95, etc |

---

## 9. PHASE-0 VERTICAL SLICE — RECOMMENDED TARGET

**Recommended archetype:** Boardroom Shirt (Business / Kemeja)

### Rationale
- Mid-complexity (5 fabric options including upgrade/downgrade)
- Simple decoration default (left chest small)
- Clean color palette mapping (corporate colors well-defined)
- Business segment = most data-rich for validation
- Quick win for stakeholder demo

### Phase-0 scope
1. Seed `archetypes`, `fabrics`, `colors`, `decoration_types`, `garment_types`, `pricing_rules` in PocketBase with Boardroom Shirt data
2. Build product detail page reading from PB
3. Build 4-step configurator (Fabric → Color → Decoration → Size/Qty → Summary)
4. Implement pricing formula
5. Generate WhatsApp link with pre-filled message
6. Test end-to-end on localhost

### Success criteria
- Configurator updates per-pc range correctly on every fabric change
- Decoration stacking calculates correctly
- WhatsApp link opens with structured message including all selections
- No JS errors, mobile-responsive

---

## 10. OPEN QUESTIONS REMAINING

For Lord-Manager to surface after Phase-0 build, or for project lead to address:

1. **Custom color text input UX** — how to handle "Custom color" selection cleanly without breaking color grid pattern?
2. **Decoration artwork file upload** — accept in configurator, or defer to WhatsApp entirely for v1?
3. **Multiple decoration limit** — cap at 3? 5? Unlimited? (UX consideration)
4. **Mobile configurator flow** — accordion vs full-screen steps? Decide before Phase-1 generalization.
5. **Quote request override for 200+ pcs** — UI treatment? Different CTA?
6. **Save & continue later** — should customer be able to save configuration for later? (defer to v1.5 likely)

---

**END OF ADDENDUM #1**

*Working values established; visualization and operational calibration to follow post-launch. Ship the engine, prove the flow, iterate the data.*
