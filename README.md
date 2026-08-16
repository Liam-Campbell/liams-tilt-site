# FUTURE EQUIPMENT — Excavator Tilt Attachments & Digger Buckets NZ

Production-ready, high-performance static website for **FUTURE EQUIPMENT** (New Zealand), built with **Astro**, **TypeScript**, and modern responsive CSS, engineered for deployment to **Cloudflare Pages** from GitHub.

> **Primary Line**: *Built to fit. Built to work.*  
> **Positioning**: Practical, direct and highly capable attachment manufacturing for New Zealand digger owners, contractors, landscapers and earthmoving operators.

---

## 🛠️ Technology Stack

- **Framework**: [Astro 5.x](https://astro.build/) (Static Site Generation mode)
- **Language**: TypeScript (`strict` configuration)
- **Styling**: Vanilla CSS with custom properties / design tokens (no Tailwind or heavy CSS runtime)
- **Media & Assets**: High-resolution WebP imagery, minimal valid MP4 hero video loop, SVG favicons
- **SEO & Sitemaps**: `@astrojs/sitemap`, Open Graph metadata, Twitter Cards, Schema.org `LocalBusiness` JSON-LD
- **Security & Headers**: Cloudflare Pages `_headers` (CSP, HSTS, X-Frame-Options, cache lifetime policies)

---

## 📁 Repository Structure

```
├── public/
│   ├── _headers                     # Cloudflare Pages security & caching headers
│   ├── favicon.svg                  # Vector brand icon
│   ├── robots.txt                   # Search crawler directives referencing sitemap
│   ├── images/
│   │   ├── hero-tilts-poster.webp   # Eagerly loaded hero background poster
│   │   ├── hero-tilts-poster.jpg    # Fallback raster poster
│   │   ├── og-image.webp            # Open Graph social sharing image (1200x630)
│   │   ├── og-image.jpg             # JPEG Open Graph fallback
│   │   ├── products/                # High-res product thumbnail crops
│   │   └── gallery/                 # Genuine in-action site photographs
│   └── media/
│       └── hero-tilts.mp4           # Decorative background video loop
├── src/
│   ├── components/
│   │   ├── Header.astro             # Sticky header, phone callout, accessible mobile drawer
│   │   ├── Hero.astro               # Full-screen hero, video & motion controller
│   │   ├── ProductCard.astro        # Standardized engineering specification cards
│   │   ├── QuoteForm.astro          # Interactive quote builder with fitment guide
│   │   └── Footer.astro             # Service area, nationwide freight, contact details
│   ├── layouts/
│   │   └── BaseLayout.astro         # SEO head, schema markup, skip link, layout shell
│   ├── pages/
│   │   ├── index.astro              # Homepage
│   │   ├── tilts.astro              # Hydraulic tilt hitches & tilt buckets
│   │   ├── buckets.astro            # Wide mud, trenching, & rock buckets
│   │   ├── custom-builds.astro      # Root rakes, tilt grapples, & bespoke builds
│   │   ├── gallery.astro            # In-action field & workshop photo gallery
│   │   ├── about.astro              # Maker ethos & engineering standards
│   │   ├── quote.astro              # Fitment quote request page
│   │   └── 404.astro                # Custom accessible 404 page
│   └── styles/
│       └── global.css               # Design system tokens, typography, reset, accessibility
├── astro.config.mjs                 # Astro configuration with static output & sitemap
├── package.json                     # Dependencies & build scripts
├── tsconfig.json                    # Strict TypeScript configuration
└── README.md                        # Documentation & deployment guide
```

---

## 🚀 Local Development

### Prerequisites
- Node.js 18.17.0, 20.x, or 22.x
- npm 9.x or 10.x

### Setup & Run

1. **Clone repository and navigate to root**:
   ```bash
   git clone <repo-url>
   cd liams-tilts
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:4321` in your browser.

4. **Build production bundle**:
   ```bash
   npm run build
   ```
   Generates static output in the `dist/` directory.

5. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## ☁️ Cloudflare Pages Deployment Guide

This project is configured for static hosting on **Cloudflare Pages** connected to GitHub.

### Step-by-Step Instructions

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "feat: complete Future Equipment static Astro website"
   git push origin main
   ```

2. **Open Cloudflare Dashboard**:
   - Go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
   - Select your repository (`liams-titls` or `future-equipment`).

3. **Configure Build Settings**:
   - **Project name**: `future-equipment` (or your preferred project name)
   - **Production branch**: `main`
   - **Framework preset**: `Astro` (or `None`)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`

4. **Environment Variables** (Optional):
   - Under **Environment variables**, set `NODE_VERSION` to `22.0.0` or `20.0.0`.

5. **Deploy**:
   - Click **Save and Deploy**. Cloudflare will build the site and deploy to a `*.pages.dev` subdomain.

---

## ♿ Accessibility & Performance Features

- **Respects `prefers-reduced-motion`**: Visitors with reduced-motion preferences receive the static poster image immediately without video playback.
- **Accessible Motion Toggle**: High-contrast "Pause motion / Play motion" button with dynamic `aria-label` and `aria-pressed` states.
- **Connection & Device Awareness**: Does not autoplay heavy video on slow cellular connections (`2g`/`3g`) or when `Save-Data` is enabled.
- **Zero Cumulative Layout Shift (CLS)**: Explicit aspect ratios and image dimensions provided for all media.
- **Keyboard Navigation**: Skip-to-content link, logical tab indexes, escape key listeners on mobile drawer, and high-contrast `:focus-visible` rings (`#F26422`).
- **Semantic HTML5**: Native `<header>`, `<nav>`, `<main>`, `<article>`, `<table>`, and `<footer>` elements.
- **Content Rules**: Strictly separates tilt hitches, tilt buckets, and custom attachments without confusing terminology or inventing engineering specifications.
