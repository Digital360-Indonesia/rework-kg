# Homepage Sections Documentation

## Static Clone Reference
- **Source**: `assets-source/kg-static-clone/kustomgarment.com/index.html`
- **Screenshot**: `docs/screenshots/desktop/homepage.png`
- **Astro Component**: `src/pages/index.astro`

---

## Section 1: Hero (Value Props + Banner)
**Component**: `src/components/sections/Hero.astro`
**Static Clone Lines**: 162-263

### Structure
- **Value Props (Desktop Only)**: 3-column grid with icon cards
  - **Kualitas Premium**: Jaminan garansi kualitas premium dalam setiap pemesanan
  - **Bikin Baju Gercep**: Dimanapun dan kapanpun nikmati kemudahan bikin baju secara mudah
  - **Customer Support**: Team Customer Support kami akan siap membantu kebutuhan Anda
- **Banner Image**: Full-width banner linking to WhatsApp
  - Image: `/images/hero/no-min-order-banner.webp`
  - Size: 2000x766px
  - Alt: "No Minimum Order - Desain Bebas, Tanpa Minimal Order"

### Technical Details
- Icons: SVG (FontAwesome style)
- Background: #ffffff
- GSAP fade-in animation on load
- Responsive: Hidden on mobile (value props only)

---

## Section 2: Client Logo Slider
**Component**: `src/components/sections/ClientSlider.astro`
**Static Clone Lines**: 264-280

### Structure
- **Carousel**: Auto-scrolling infinite loop slider
- **Client Logos**: 13 total
  - Order: Klien 6, 2, 1, 5, 3, 11, 9, 7, 8, 10, 4, 12, 13
  - Path: `/images/clients/klien-{n}.png`
  - Grayscale on load, color on hover
  - Max height: 60px (mobile), 90px (tablet), 100px (desktop)

### Technical Details
- Library: Swiper.js
- Autoplay: 2000ms delay, pause on hover
- Loop: Infinite
- Slides: 3 (mobile), 5 (tablet), 8 (desktop)
- Space between: 8px (mobile), 12px (tablet), 20px (desktop)

---

## Section 3: Category Cards
**Component**: `src/components/sections/CategoryCards.astro`
**Static Clone Lines**: 281-371

### Structure
- **Heading**: "Pilihan Kategori"
- **Grid**: 4 category cards
  1. **Business** → `/business/`
     - Image: `/images/categories/business.webp` (400x521px)
  2. **Community** → `/community/`
     - Image: `/images/categories/community.webp` (400x521px)
  3. **Campus** → `/campus/`
     - Image: `/images/categories/campus.webp` (400x521px)
  4. **Personal** → `/personal/`
     - Image: `/images/categories/personal.webp` (400x521px)
- **CTA Button**: "Selengkapnya" → `/produk/`

### Technical Details
- Grid: 2 columns (mobile), 4 columns (tablet+)
- Gap: 1rem (mobile), 2rem (tablet+)
- Hover: Scale image + slide up overlay
- GSAP scroll-triggered animation

---

## Section 4: Bulk Order
**Component**: `src/components/sections/BulkOrder.astro`
**Static Clone Lines**: 372-422

### Structure
- **Layout**: Centered content with white card
- **Heading**: "Pembelian Jumlah Besar"
- **Description**: Nikmati penawaran spesial untuk pembelian dalam jumlah besar hanya di tempat kami. Dapatkan harga grosir, pelayanan prioritas, dan kemudahan proses transaksi untuk kebutuhan usaha maupun komunitas Anda.
- **CTA Button**: "Pesan Sekarang" → WhatsApp

### Technical Details
- Background: #f9fafb (light gray)
- Card: White with shadow
- Button: #0066cc primary color
- Max width: 800px
- GSAP scroll-triggered animation

---

## Section 5: Benefits
**Component**: `src/components/sections/Benefits.astro`
**Static Clone Lines**: 423-498

### Structure
- **Grid**: 4 benefit cards
  1. **Harga Bersahabat**
     - Icon: `/images/benefits/harga-bersahabat.webp`
     - Description: Dapatkan harga eksklusif dengan pembelian jumlah besar
  2. **Team Profesional**
     - Icon: `/images/benefits/team-profesional.webp`
     - Description: Konsultasi langsung sesuai kebutuhan dengan team berpengalaman kami
  3. **Pick Up or Delivery**
     - Icon: `/images/benefits/pickup-delivery.webp`
     - Description: Opsi pengiriman atau pengambilan barang di lokasi
  4. **Invoice & Pajak**
     - Icon: `/images/benefits/invoice-pajak.webp`
     - Description: Tersedia invoice dan faktur pajak

### Technical Details
- Grid: 2 columns (mobile), 4 columns (tablet+)
- Background: #f9fafb (card), #ffffff (section)
- Icon size: 70px (mobile), 80px (tablet), 100px (desktop)
- GSAP scroll-triggered animation with stagger

---

## Section 6: Video Portfolio
**Component**: `src/components/sections/VideoPortfolio.astro`
**Static Clone Lines**: 513-588

### Structure
- **Heading**: "Favorit Kustomers"
- **Subheading**: Berbagai model siap menginspirasi pilihan kustom
- **Grid**: 4 TikTok-style videos
  - Order: tiktok-4, tiktok-3, tiktok-2, tiktok-1 (matching static clone)
  - Path: `/videos/tiktok-{n}.mp4`
  - Aspect ratio: 9:16 (vertical)
  - Autoplay: muted, loop, playsinline
  - Custom play/pause controls

### Technical Details
- Background: Gradient purple (#667eea to #764ba2)
- Grid: 2 columns (mobile), 4 columns (tablet+)
- Video controls: Play/pause button (bottom-right of each card)
- Preload: metadata
- GSAP scroll-triggered animation

---

## Section 7: Final CTA
**Component**: `src/components/sections/FinalCTA.astro`
**Static Clone Lines**: 589-623

### Structure
- **Layout**: Centered content
- **Heading**: "Kustom Sekarang"
- **Description**: Kami berkomitmen untuk kualitas terbaik! Untuk informasi lebih lanjut tentang produk dan layanan custom kami, jangan ragu untuk menghubungi tim kami kapan saja
- **CTA Button**: "Hubungi Kami" → WhatsApp

### Technical Details
- Background: #ffffff with gradient overlay
- Button: Gradient #0066cc to #0052a3, pill-shaped
- Button animation: Shine effect on hover
- Max width: 800px
- GSAP scroll-triggered animation

---

## Global Styles

### Colors
- Primary: `#0066cc`
- Primary Dark: `#0052a3`
- Text Dark: `#333333`
- Text Medium: `#666666`
- Background Light: `#f9fafb`
- White: `#ffffff`

### Typography
- Font Family: System fonts (will use SF Pro Display if loaded)
- Heading Weights: 600, 700
- Body Weight: 400, 500

### Spacing
- Section Padding: 3-5rem (mobile), 4-6rem (desktop)
- Container Max Width: 800px (narrow), 1200px (grid), 1400px (full)
- Side Padding: 1.5rem

### Animations
- GSAP ScrollTrigger for scroll animations
- Fade-in, slide-up, and scale effects
- Stagger for grids
- Duration: 0.5-0.7s
- Ease: power2.out

---

## Assets Summary

### Images
| Path | Usage | Count |
|------|-------|-------|
| `/images/hero/` | Hero banner | 1 |
| `/images/clients/` | Client logos | 13 |
| `/images/categories/` | Category cards | 4 |
| `/images/benefits/` | Benefit icons | 4 |
| `/images/logos/` | Logo | 1 |

### Videos
| Path | Usage | Count |
|------|-------|-------|
| `/videos/` | Portfolio videos | 4 |

---

## WhatsApp Integration
All CTA buttons link to WhatsApp with:
- Number: `PUBLIC_WHATSAPP_NUMBER` (default: 6285161202499)
- Message: Custom per section
- Format: `https://wa.me/{number}?text={message}`

---

## Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: ≥ 1024px
