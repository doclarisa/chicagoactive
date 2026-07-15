# Schema Markup Templates (JSON-LD)

Place all schema inside `<script type="application/ld+json">` in the `<head>`.
Test any schema at: search.google.com/test/rich-results

---

## 1. Organization (every homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "DissolveUSA",
  "url": "https://www.dissolveusa.com",
  "logo": "https://www.dissolveusa.com/images/logo.png",
  "description": "Importer and distributor of PVA dissolvable grocery bags for US retailers.",
  "foundingDate": "2026",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-XXX-XXX-XXXX",
    "contactType": "sales",
    "areaServed": "US",
    "availableLanguage": "English"
  },
  "sameAs": [
    "https://www.instagram.com/dissolveusa",
    "https://www.linkedin.com/company/dissolveusa",
    "https://www.facebook.com/dissolveusa"
  ]
}
```

---

## 2. LocalBusiness (if physical location or service area)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "DissolveUSA",
  "image": "https://www.dissolveusa.com/images/storefront.jpg",
  "url": "https://www.dissolveusa.com",
  "telephone": "+1-XXX-XXX-XXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "Chicago",
    "addressRegion": "IL",
    "postalCode": "60601",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 41.8781,
    "longitude": -87.6298
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "09:00",
      "closes": "17:00"
    }
  ],
  "priceRange": "$$",
  "servesCuisine": null
}
```

---

## 3. Product (e-commerce product pages)

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Standard PVA Dissolvable Grocery Bags (100-pack)",
  "image": [
    "https://example.com/images/pva-bag-front.webp",
    "https://example.com/images/pva-bag-dissolving.webp"
  ],
  "description": "PVA water-soluble grocery bags. Dissolve in hot water. Rain-resistant. No microplastics. EN13432 certified. 12x20 inch T-shirt style. Pack of 100.",
  "sku": "PVA-STD-100",
  "brand": {
    "@type": "Brand",
    "name": "DissolveUSA"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://example.com/products/standard-pva-bag-100/",
    "priceCurrency": "USD",
    "price": "29.99",
    "priceValidUntil": "2027-12-31",
    "itemCondition": "https://schema.org/NewCondition",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "DissolveUSA"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "47"
  }
}
```

---

## 4. FAQPage (FAQ sections or pages)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Are PVA dissolvable bags safe for the environment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. PVA (polyvinyl alcohol) bags break down into water, CO₂, and biomass with no microplastics or toxic residue. They are non-toxic to humans, animals, and aquatic life. Dissolution requires sufficient water temperature (varies by grade: cold, warm, or hot water dissolving)."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take for a PVA bag to dissolve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dissolution time depends on water temperature. Hot-water-soluble grade: 2–5 minutes in 60°C+ water. Warm-water grade: 5–15 minutes in 30–40°C water. Cold-water grade: dissolves at room temperature. In rain or humidity, bags remain intact for normal use."
      }
    }
  ]
}
```

---

## 5. Article / BlogPosting

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "PVA Bags vs Compostable Bags: What's the Difference?",
  "image": "https://example.com/images/pva-vs-compostable.webp",
  "author": {
    "@type": "Person",
    "name": "Jane Smith",
    "url": "https://example.com/about/jane-smith/"
  },
  "publisher": {
    "@type": "Organization",
    "name": "DissolveUSA",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/images/logo.png"
    }
  },
  "datePublished": "2026-03-01",
  "dateModified": "2026-06-01",
  "description": "PVA and compostable bags look similar but behave very differently. Learn which is better for the environment and for your store."
}
```

---

## 6. HowTo (step-by-step guides)

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Dispose of a PVA Dissolvable Bag",
  "description": "PVA bags can be safely disposed of at home by dissolving them in water.",
  "totalTime": "PT5M",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Fill a sink or bowl with hot water",
      "text": "Use water at 60°C or hotter. A kettle works well.",
      "position": 1
    },
    {
      "@type": "HowToStep",
      "name": "Submerge the bag",
      "text": "Place the PVA bag fully in the water. Hold it under the surface.",
      "position": 2
    },
    {
      "@type": "HowToStep",
      "name": "Watch it dissolve",
      "text": "The bag will dissolve within 2–5 minutes, leaving only water.",
      "position": 3
    }
  ]
}
```

---

## 7. BreadcrumbList (inner pages)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Products",
      "item": "https://example.com/products/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Standard PVA Grocery Bag",
      "item": "https://example.com/products/standard-pva-bag/"
    }
  ]
}
```

---

## 8. WebSite (homepage — enables sitelinks search box)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://example.com/",
  "name": "DissolveUSA",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://example.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

---

## Stacking Multiple Schemas

You can include multiple schemas on one page by using an array:

```json
[
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DissolveUSA"
    // ... organization schema
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://example.com"
    // ... website schema
  }
]
```

Or use separate `<script>` tags — both are valid.
