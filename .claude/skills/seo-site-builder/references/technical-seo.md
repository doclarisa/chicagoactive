# Technical SEO Reference

## robots.txt (default safe template)

```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

**Never accidentally block:**
- `/wp-admin/` blocking can prevent indexing of public pages
- `/api/` if your front-end routes through it
- CSS/JS files (Googlebot needs them to render pages)

## XML Sitemap

For static sites, include every indexable URL:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2026-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/dissolvable-grocery-bags/</loc>
    <lastmod>2026-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
```

Submit at: search.google.com/search-console → Sitemaps

## Core Web Vitals Fixes

### LCP (Largest Contentful Paint) — must be < 2.5s
LCP is usually the hero image or largest text block.

**Fixes:**
```html
<!-- Preload hero image -->
<link rel="preload" as="image" href="/images/hero.webp" fetchpriority="high">

<!-- Use WebP format -->
<picture>
  <source srcset="hero.webp" type="image/webp">
  <img src="hero.jpg" alt="Dissolvable grocery bag dissolving in water" width="800" height="450">
</picture>

<!-- For above-fold images: DON'T use loading="lazy" -->
<!-- For below-fold: DO use loading="lazy" -->
<img src="product.webp" loading="lazy" alt="...">
```

### CLS (Cumulative Layout Shift) — must be < 0.1
CLS happens when elements move as the page loads (images without dimensions, ads).

**Fixes:**
```html
<!-- Always specify width and height on images -->
<img src="bag.webp" width="400" height="300" alt="...">

<!-- Reserve space for dynamic content with CSS -->
.ad-container { min-height: 90px; }

<!-- Don't inject content above existing content -->
```

### FID / INP (Interaction to Next Paint) — must be < 200ms
Slow JS execution blocks responsiveness.

**Fixes:**
- Defer non-critical JS: `<script src="analytics.js" defer></script>`
- Avoid large JS bundles — code split where possible
- Move heavy computation to Web Workers

## Canonical Tags

Every page must declare its canonical URL to prevent duplicate content:

```html
<!-- On every page, in <head> -->
<link rel="canonical" href="https://example.com/exact-page-url/">

<!-- For paginated content -->
<link rel="canonical" href="https://example.com/blog/">  <!-- page 1 only -->
<!-- Pages 2+ have their own canonical, not page 1's -->

<!-- For product variants (same product, different color) -->
<!-- All variants point to the main product URL -->
<link rel="canonical" href="https://example.com/products/pva-bag/">
```

## 301 Redirects

Use when changing URLs or merging pages. In Netlify `_redirects` file:
```
/old-page/    /new-page/    301
/product      /products/    301
```

In `.htaccess` (Apache):
```apache
Redirect 301 /old-page/ https://example.com/new-page/
```

In `vercel.json`:
```json
{
  "redirects": [
    { "source": "/old", "destination": "/new", "permanent": true }
  ]
}
```

## Google Search Console Setup

1. Go to search.google.com/search-console
2. Add property → URL prefix → enter full site URL
3. Verify via HTML tag method (paste in `<head>`) or domain DNS record
4. Submit sitemap
5. Check weekly for: Coverage errors, Manual actions, Core Web Vitals

**Key reports to monitor:**
- Performance → which queries bring traffic (sort by impressions, fix low CTR pages)
- Coverage → fix "Excluded" pages that should be indexed
- Core Web Vitals → fix pages failing LCP/CLS/INP
- Links → see who links to you (backlink profile)

## Indexability Checklist

Before launch, verify:
```
□ No <meta name="robots" content="noindex"> on pages you want indexed
□ robots.txt doesn't block CSS, JS, or image directories
□ Pages load without JavaScript errors (Googlebot sees what the browser sees)
□ All pages return HTTP 200 (not 404, 302, or 500)
□ Site loads on mobile without horizontal scroll
□ No intrusive interstitials (pop-ups that block content) on mobile
```
