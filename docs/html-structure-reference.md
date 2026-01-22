# HTML Structure Reference - KustomGarment.com

## Purpose
This document provides the HTML structure reference for converting kustomgarment.com to Astro.

## File Information
- **Source**: ./assets-source/kg-static-clone/kustomgarment.com/index.html
- **Framework**: WordPress with Elementor Page Builder
- **Total Size**: ~96KB (35939 tokens)

---

## Global Technologies & Libraries

### CSS Frameworks
- **Elementor Frontend**: Main page builder framework
- **Elementor Pro Widgets**: Advanced button, icon box, image carousel
- **BDT UIKit**: Advanced UI components
- **Swiper**: Carousel/slider library
- **Google Fonts**: Montserrat (loaded via CSS)
- **SF Pro Display**: Custom Apple font (uploaded locally)

### JavaScript Libraries
- **jQuery**: 3.7.1
- **jQuery Migrate**: For legacy plugin support
- **Elementor Frontend/Pro Scripts**
- **Google Analytics**: GT-P3N69BKF
- **Google Tag Manager**: GTM-P4XD34L7
- **WordPress Emojis**: Native emoji support

### WordPress Plugins Detected
- Yoast SEO (schema markup, meta tags)
- Elementor 3.28.3 (page builder)
- Elementor Pro (advanced widgets)
- BDT Advanced Button (custom button widget)

---

## Page Structure (Homepage)

```
<!doctype html>
<html lang="en-US">
<head>
  <!-- Meta tags, SEO, CSS, JS -->
</head>
<body class="home wp-singular page-template-default page page-id-36 ...">
  <!-- Google Tag Manager (noscript) -->

  <!-- Header/Navigation -->
  <div id="wrapper-navbar" class="uicore uicore-navbar ...">

  <!-- Main Content -->
  <main>

    <!-- Hero/Banner Section -->
    <section class="elementor-section elementor-element-459b258">

    <!-- Client Logo Slider -->
    <section class="elementor-section elementor-element-5a60ec4">

    <!-- Category Cards (4 columns) -->
    <section class="elementor-section elementor-element-056c55f">
      <!-- 4 Category Images with Links -->
      <!-- section4-1: Business -->
      <!-- section4-2: Community -->
      <!-- section4-3: Campus -->
      <!-- section4-4: Personal -->

    <!-- Bulk Order Section (No Minimum Order) -->
    <section class="elementor-section elementor-element-284739b">
      <!-- Banner image + text + CTA button -->

    <!-- Benefits Section (4 columns) -->
    <section class="elementor-section elementor-element-dcb3bfc">
      <!-- 4 Benefit Icons with descriptions -->
      <!-- section6-1: Harga Bersahabat -->
      <!-- section6-2: Team Profesional -->
      <!-- section6-3: Pick Up/Delivery -->
      <!-- section6-4: Invoice & Pajak -->

    <!-- TikTok Videos Section -->
    <section class="elementor-section elementor-element-07ac3ad">
      <!-- 4 TikTok video embeds -->
      <!-- tiktok_1.mp4, tiktok_2.mp4, tiktok_3.mp4, tiktok_4.mp4 -->

    <!-- Footer -->
    <footer>

  </main>
</body>
</html>
```

---

## Section Details

### 1. Header/Navigation
**Location**: Line ~108
**CSS Classes**: `uicore-navbar uicore-sticky ui-smart-sticky`
**Key Features**:
- Sticky navigation on scroll
- Mobile hamburger menu
- Logo: `kg-logo.png`
- Links: Business, Community, Campus, Personal, Produk

**Structure**:
```html
<div id="wrapper-navbar" class="uicore uicore-navbar uicore-section uicore-box uicore-h-classic uicore-sticky ui-smart-sticky">
  <div class="uicore-header-wrapper">
    <!-- Logo -->
    <!-- Navigation Links -->
    <!-- Mobile Menu Toggle -->
  </div>
</div>
```

---

### 2. Hero Section
**Elementor ID**: `elementor-element-459b258`
**Layout**: Full width
**Content**: Banner image (if present)
**Background**: Classic (solid color)

---

### 3. Client Logo Slider
**Elementor ID**: `elementor-element-5a60ec4`
**Library**: Elementor Image Carousel (likely Swiper-based)
**Images**: 13 client logos (Klien_1 through Klien_13)
**Thumbnail Location**: `wp-content/uploads/elementor/thumbs/`
**Image Format**: PNG with optimized thumbnails
**File Naming**: `20250412-Klien_{1-13}-r544x...png`

**Structure**:
```html
<section class="elementor-section elementor-element-5a60ec4">
  <div class="elementor-container">
    <div class="elementor-element elementor-widget-image-carousel">
      <!-- 13 Client Logos in carousel -->
      <!-- Images: 20250412-Klien_1.png through 20250412-Klien_13.png -->
    </div>
  </div>
</section>
```

---

### 4. Category Cards
**Elementor ID**: `elementor-element-056c55f`
**Layout**: 4 columns (25% each)
**Content**: 4 category images with links

| Category | Image File | Link |
|----------|-----------|------|
| Business | `20250412-section4-1.webp` | `/business/` |
| Community | `20250412-section4-2.webp` | `/community/` |
| Campus | `20250412-section4-3.webp` | `/campus/` |
| Personal | `20250412-section4-4.webp` | `/personal/` |

**Structure**:
```html
<section class="elementor-section elementor-element-056c55f">
  <div class="elementor-container">
    <h2>Category Heading</h2>
    <div class="elementor-row">
      <div class="elementor-col-25">
        <a href="/business/">
          <img src="20250412-section4-1.webp" />
        </a>
      </div>
      <!-- 3 more columns -->
    </div>
    <a href="/produk/" class="btn">Lihat Semua Produk</a>
  </div>
</section>
```

---

### 5. Bulk Order Section
**Elementor ID**: `elementor-element-284739b`
**Layout**: Boxed (centered)
**Content**: Banner image + Heading + Text + CTA Button
**Image**: `20250414-section5-1-scaled.webp`
**CTA Link**: WhatsApp (via API)

**Structure**:
```html
<section class="elementor-section elementor-element-284739b">
  <div class="elementor-container">
    <div class="elementor-row">
      <!-- Left: Text content -->
      <div class="elementor-col-33">
        <h2>No Minimum Order</h2>
        <p>Desain bebas, pesan satuan bisa!</p>
        <a href="https://api.whatsapp.com/..." class="btn">
          Pesan Sekarang
        </a>
      </div>
      <!-- Right: Image -->
      <div class="elementor-col-66">
        <img src="20250414-section5-1-scaled.webp" />
      </div>
    </div>
  </div>
</section>
```

---

### 6. Benefits Section
**Elementor ID**: `elementor-element-dcb3bfc`
**Layout**: 4 columns (25% each)
**Content**: 4 benefit icons with title and description

| Benefit | Image File | Title |
|---------|-----------|-------|
| Harga Bersahabat | `section6-1.webp` | Harga Bersahabat |
| Team Profesional | `section6-2.webp` | Team Profesional |
| Pick Up/Delivery | `section6-3.webp` | Pick Up/Delivery |
| Invoice & Pajak | `section6-4.webp` | Invoice & Pajak |

**Structure**:
```html
<section class="elementor-section elementor-element-dcb3bfc">
  <div class="elementor-container">
    <h2>Kenapa Pilih Kami?</h2>
    <div class="elementor-row">
      <div class="elementor-col-25">
        <img src="section6-1.webp" />
        <h3>Harga Bersahabat</h3>
        <p>Competitive pricing for all orders</p>
      </div>
      <!-- 3 more columns -->
    </div>
  </div>
</section>
```

---

### 7. TikTok Videos Section
**Elementor ID**: `elementor-element-07ac3ad`
**Layout**: Full width background with boxed content
**Content**: 4 TikTok video embeds in 4 columns
**Video Files**:
- `20250412-tiktok_1.mp4` (989KB)
- `20250412-tiktok_2.mp4` (2.4MB)
- `20250412-tiktok_3.mp4` (1.9MB)
- `20250412-tiktok_4.mp4` (1.6MB)

**Structure**:
```html
<section class="elementor-section elementor-element-07ac3ad">
  <div class="elementor-container">
    <h2>Lihat Hasil Karya Kami</h2>
    <div class="elementor-row">
      <div class="elementor-col-25">
        <video src="20250412-tiktok_1.mp4" />
      </div>
      <!-- 3 more videos -->
    </div>
  </div>
</section>
```

**Note**: Videos may be embedded using custom HTML widgets or video widgets

---

### 8. Footer
**Location**: End of body
**Content**: 4-column layout with:
- Company info
- Quick links
- Products
- Contact/Social

**Social Links**:
- Instagram: `@kustomgarment`
- TikTok: `@kustomgarment_id`
- YouTube: Channel ID `UCWF7_jTvwOqI6a2YjwJ1nKg`
- WhatsApp: `6285161202499`

---

## CSS Classes Reference

### Elementor Core Classes
- `.elementor-section`: Section container
- `.elementor-container`: Inner container (max-width constrained)
- `.elementor-row`: Flexbox row for columns
- `.elementor-col-{number}`: Column width (e.g., `elementor-col-25` = 25%)
- `.elementor-widget-{type}`: Widget-specific classes

### Theme Classes (Affirm Theme)
- `.uicore-navbar`: Navigation bar
- `.uicore-sticky`: Sticky positioning
- `.ui-smart-sticky`: Smart sticky (shows/hides on scroll)
- `.uicore-section`: Section wrapper
- `.uicore-box`: Boxed layout
- `.uicore-h-classic`: Classic header style

### Custom Widget Classes
- `.bdt-advanced-button`: Custom button widget
- `.elementor-widget-icon-box`: Icon box widget
- `.elementor-widget-image-carousel`: Image carousel

---

## JavaScript Data & Settings

### Google Analytics
```javascript
window.dataLayer = window.dataLayer || [];
gtag('config', 'GT-P3N69BKF');
```

### Elementor Settings
- CSS Print Method: External
- Google Fonts: Enabled
- Font Display: Swap
- Lazy Loading: Enabled for images

---

## Image Optimization Notes

### Responsive Images
WordPress generates multiple sizes:
- Full size: Original upload
- Medium: 300px wide
- Large: 1024px wide
- Thumbnail: 150px square

### Lazy Loading
All images have `loading="lazy"` and `decoding="async"` attributes

### WebP Format
Most images use WebP format for better compression

---

## Conversion Notes for Astro

1. **Remove Elementor Dependencies**: The Elementor classes and data attributes can be removed or replaced with custom CSS
2. **Replace jQuery**: Modern vanilla JavaScript or Alpine.js can replace jQuery functionality
3. **Carousel Options**: Consider using Swiper.js or similar for the logo slider
4. **Video Embed**: Use HTML5 `<video>` tags with proper controls
5. **Sticky Header**: Implement using CSS `position: sticky` or Intersection Observer API
6. **Mobile Menu**: Implement custom JavaScript or use a lightweight library
7. **Lazy Loading**: Keep `loading="lazy"` on images
8. **Fonts**: Include SF Pro Display fonts locally, use Google Fonts for Montserrat
9. **Optimize CSS**: Extract only necessary CSS, remove unused Elementor styles

---

## Assets Map

| Original Path | Astro Path |
|---------------|------------|
| `/wp-content/uploads/2022/03/kg-logo.png` | `/images/logos/kg-logo.png` |
| `/wp-content/uploads/elementor/thumbs/20250412-Klien_*.png` | `/images/clients/klien-*.png` |
| `/wp-content/uploads/2025/04/20250412-section4-*.webp` | `/images/categories/*.webp` |
| `/wp-content/uploads/elementor/thumbs/section6-*.webp` | `/images/benefits/*.webp` |
| `/wp-content/uploads/2025/04/20250412-tiktok_*.mp4` | `/videos/tiktok-*.mp4` |
| `/wp-content/uploads/2025/04/SF-Pro-Display-*.woff2` | `/fonts/*.woff2` |
