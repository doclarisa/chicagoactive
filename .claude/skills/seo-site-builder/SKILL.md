---
name: seo-site-builder
description: >
  Build websites and web pages engineered to rank #1 or #2 on Google for targeted keywords.
  Use this skill whenever the user wants to: create or redesign a website, write SEO-optimized
  content, build landing pages, improve Google rankings, set up local SEO, write meta tags or
  structured data, plan a content strategy, audit an existing site for SEO, or asks anything
  about getting found on Google search. Also trigger when building any page with React/HTML
  if the domain is competitive (e-commerce, local business, SaaS, service providers). This
  skill covers both the technical and content sides of SEO from page one.
---

# SEO Site Builder

A complete playbook for building websites that rank #1–#2 on Google. Covers technical
foundations, on-page optimization, content strategy, local SEO, and ongoing maintenance.

---

## Phase 0 — Before Writing a Line of Code

### 1. Keyword Research First (Always)

Never build a page without knowing its target keyword. For each page:

```
Primary keyword:   1 phrase (3–6 words), 100–10,000 monthly searches
Secondary keywords: 3–5 related phrases (use in H2s, body copy)
LSI keywords:      10–20 conceptually related terms (sprinkle naturally)
Search intent:     Informational / Navigational / Commercial / Transactional
```

**Tools to recommend to user (free):**
- Google Search Console (after launch — essential)
- Google Keyword Planner (free with Google Ads account)
- Ubersuggest (3 free searches/day)
- AnswerThePublic (question-based keywords)
- Google autocomplete + "People Also Ask" (always free, always current)

**Keyword Selection Rules:**
- For new sites: target long-tail (4–6 words), lower competition keywords first
- Monthly search volume sweet spot for new sites: 100–2,000
- For established sites: go after head terms (1–3 words), 2,000–50,000 searches
- Check: does the top result answer the intent well? If not, you can beat it.

### 2. Competitor SERP Analysis

Before building, have the user Google their target keyword and analyze top 3 results:

```
□ What content format dominates? (article, product page, list, video)
□ Average word count of top 3 pages
□ Do they have schema markup? (check with Google's Rich Results Test)
□ Page speed of competitors (PageSpeed Insights)
□ How many backlinks? (use Ahrefs free checker or Moz Link Explorer)
□ Is a featured snippet present? If yes, what format? (paragraph, list, table)
```

**If a featured snippet exists**, structure your answer to steal it:
- Paragraph snippet → write a 40–60 word direct answer near the top
- List snippet → use a numbered or bulleted list with 5–8 items
- Table snippet → build an HTML table with clear headers

---

## Phase 1 — Technical SEO Foundation

Read `references/technical-seo.md` for full implementation details.

### Quick Checklist (implement before launch)

```
□ HTTPS enabled (SSL certificate installed)
□ Mobile-responsive design (Google mobile-first indexing)
□ Core Web Vitals passing: LCP < 2.5s, FID < 100ms, CLS < 0.1
□ XML sitemap at /sitemap.xml, submitted to Google Search Console
□ robots.txt at /robots.txt (don't accidentally block Googlebot)
□ Canonical tags on every page (prevent duplicate content)
□ 301 redirects set up for any changed URLs
□ No broken links (404s hurt rankings)
□ Structured data / Schema markup (see Phase 3)
□ Open Graph + Twitter Card meta tags
□ Favicon (trust signal)
```

### URL Structure Rules

```
✅ Good: /dissolvable-grocery-bags/
✅ Good: /blog/pva-bags-vs-plastic/
❌ Bad:  /page?id=42
❌ Bad:  /category/subcategory/product/item/bag-123
```

- Use hyphens, not underscores
- Keep URLs under 60 characters
- Include primary keyword in URL
- Never change a URL after Google has indexed it (unless you 301 redirect)

### Page Speed (Critical — Google weights this)

For React/HTML artifacts, always:
1. Lazy-load images below the fold (`loading="lazy"`)
2. Use `<link rel="preload">` for hero image and main font
3. Minimize render-blocking JS (defer non-critical scripts)
4. Compress images: WebP format, max 100KB for most images
5. Use a CDN (Cloudflare free tier works)

Target: PageSpeed score ≥ 90 on mobile.

---

## Phase 2 — On-Page SEO (Per Page)

Every page needs these elements optimized. Read `references/on-page-seo.md` for templates.

### The SEO Content Formula (per page)

```
Title Tag:        Primary keyword + brand | 50–60 characters
Meta Description: Primary keyword + benefit + CTA | 150–160 characters
H1 Tag:           Primary keyword (exact or close variant) — ONE per page
H2 Tags:          Secondary keywords + question variants (3–6 per page)
H3 Tags:          Subtopics under H2s
Body Copy:        Primary keyword in first 100 words; 1–2% keyword density
Images:           Alt text with keyword; descriptive filename (pva-bag.webp not img001.webp)
Internal links:   Link to 2–3 related pages using keyword-rich anchor text
External links:   1–2 links to authoritative sources (.gov, .edu, major publications)
Word count:       Match or beat top competitor (usually 1,200–3,000 for informational)
```

### Title Tag Formula

```
[Primary Keyword] - [Secondary Benefit] | [Brand Name]

Examples:
"Dissolvable Grocery Bags | PVA Bags That Dissolve in Water | DissolveUSA"
"PVA Water-Soluble Bags for Stores | Wholesale Pricing | DissolveUSA"
"Best Eco Grocery Bags 2026 — No Microplastics | DissolveUSA"
```

### Meta Description Formula

```
[Primary keyword used naturally] + [specific benefit] + [call to action].

Example:
"DissolveUSA's PVA dissolvable grocery bags dissolve completely in water — 
no microplastics, no landfill. Order wholesale or direct. Free samples available."
```

### Content Quality Rules (E-E-A-T)

Google ranks pages by Experience, Expertise, Authoritativeness, Trustworthiness:

- **Experience**: Include first-person observations or case-study data when possible
- **Expertise**: Cite specific facts, studies, certifications, technical specs
- **Authoritativeness**: Link to authoritative sources; earn backlinks from authoritative sites
- **Trustworthiness**: Clear contact info, privacy policy, return policy, SSL, reviews

---

## Phase 3 — Schema Markup (Structured Data)

Schema markup helps Google understand your page and can earn rich results (star ratings,
FAQs, product info directly in search results). Use JSON-LD format, placed in `<head>`.

Read `references/schema-templates.md` for copy-paste templates.

### Which Schema to Use

| Page Type | Schema Type | Rich Result |
|---|---|---|
| Product/shop page | Product + Offer | Price, availability, stars |
| Blog/article | Article | Date, author, headline |
| FAQ content | FAQPage | Expandable Q&A in SERP |
| Local business | LocalBusiness | Map pack, hours, phone |
| How-to guide | HowTo | Steps shown in SERP |
| Review page | Review / AggregateRating | Star ratings |
| Homepage (service) | Organization + WebSite | Sitelinks search box |

### Minimum Required for Any Business Site

Always implement these three on every site:
1. `Organization` schema on homepage
2. `WebSite` schema with `SearchAction` on homepage  
3. `BreadcrumbList` on inner pages

---

## Phase 4 — Content Strategy (How to Stay #1)

One great page gets you ranked. A content cluster keeps you there.

### Pillar + Cluster Model

```
PILLAR PAGE (2,000–4,000 words)
│   Target: main head keyword ("dissolvable grocery bags")
│   Covers the topic broadly
│
├── CLUSTER PAGE 1 (1,000–1,500 words)
│   Target: long-tail variant ("pva bags vs compostable bags")
│
├── CLUSTER PAGE 2
│   Target: ("are dissolvable bags safe for environment")
│
├── CLUSTER PAGE 3
│   Target: ("wholesale dissolvable bags for grocery stores")
│
└── CLUSTER PAGE 4
    Target: ("how to use dissolvable grocery bags")
```

All cluster pages link back to the pillar. Pillar links out to clusters.
Google sees the site as authoritative on the entire topic.

### Content Calendar for New Sites

```
Months 1–2: Build pillar page + 3 cluster pages
Months 3–4: Add 2 more clusters; write 2 FAQ pages
Month 5:    First "linkable asset" (data, tool, or guide others will cite)
Month 6+:   1 new piece of content per week minimum
```

### Content That Gets Backlinks (Domain Authority Builder)

Links from other sites are the #1 ranking factor after content. Content types that
earn links organically:

1. **Original data / studies** ("We tested 5 PVA bag brands — here's what happened")
2. **Free tools** (Bag dissolve time calculator, eco packaging cost comparison)
3. **Comprehensive guides** (2,500+ words, cited by journalists and bloggers)
4. **Infographics** (visual data others embed with a link back)
5. **"Best of" lists** that rank competitors fairly (builds goodwill + links)

---

## Phase 5 — Local SEO (if business has a physical location or service area)

### Google Business Profile (mandatory)

1. Claim/verify at business.google.com
2. Fill every field: description (750 chars), hours, website, phone, photos (10+ images)
3. Select correct primary category + up to 9 secondary categories
4. Add products/services with descriptions and prices
5. Post weekly (Google Posts — like social media for your GBP)
6. Respond to every review within 24 hours

### NAP Consistency

Name, Address, Phone must be **identical** everywhere online:
- Your website footer
- Google Business Profile
- Yelp, Bing Places, Apple Maps, Facebook
- Industry directories
- Local chamber of commerce

Use the `local-citations-auditor` skill to find all citation directories to claim.

### Local On-Page Signals

```html
<!-- In every page footer -->
<address>
  <span itemprop="name">DissolveUSA</span>
  <span itemprop="streetAddress">123 Main St</span>
  <span itemprop="addressLocality">Chicago</span>,
  <span itemprop="addressRegion">IL</span>
  <span itemprop="postalCode">60601</span>
  Phone: <span itemprop="telephone">(312) 555-0100</span>
</address>
```

Create a dedicated "service area" page for each city you serve if B2B.

---

## Phase 6 — Ongoing SEO Maintenance

### Monthly Tasks (takes ~2 hours/month)

```
□ Google Search Console: check for crawl errors, manual actions, coverage issues
□ Check ranking for 10 target keywords (note any drops — investigate immediately)
□ Review top 5 landing pages in GA4: is bounce rate increasing?
□ Add/update 1–2 pages of content
□ Respond to any new reviews (Google, Yelp, etc.)
□ Check for broken links (free: Screaming Frog, 500 URL limit)
□ Monitor Core Web Vitals in Search Console
```

### Ranking Drop Response Protocol

If a page drops 5+ positions:
1. Check Search Console for manual actions or coverage issues
2. Check if competitor updated their page (look at cache dates)
3. Check if Google algorithm update happened (moz.com/google-algorithm-change-history)
4. Review if your content still matches search intent
5. Add more depth: longer word count, more examples, updated data, FAQs

---

## Quick Reference — HTML Template

When building any page, use this SEO-optimized HTML structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- PRIMARY SEO TAGS -->
  <title>Primary Keyword — Secondary Benefit | Brand Name</title>
  <meta name="description" content="150–160 char description with keyword + CTA.">
  <link rel="canonical" href="https://example.com/page-url/">
  
  <!-- OPEN GRAPH (social sharing + trust signal) -->
  <meta property="og:title" content="Same as title tag">
  <meta property="og:description" content="Same as meta description">
  <meta property="og:image" content="https://example.com/images/og-image.jpg">
  <meta property="og:url" content="https://example.com/page-url/">
  <meta property="og:type" content="website">
  
  <!-- SCHEMA MARKUP -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Brand Name",
    "url": "https://example.com",
    "logo": "https://example.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-XXX-XXX-XXXX",
      "contactType": "sales"
    }
  }
  </script>
  
  <!-- PERFORMANCE -->
  <link rel="preload" as="image" href="/images/hero.webp">
</head>
<body>
  <!-- ONE H1, contains primary keyword -->
  <h1>Primary Keyword in Natural Language</h1>
  
  <!-- FIRST 100 WORDS: answer the search intent directly -->
  <p>Direct, clear answer to what the user is looking for. Use primary keyword
  in the first sentence. No fluff — Google checks if the first paragraph
  matches the title.</p>
  
  <!-- H2s: secondary keywords, questions from "People Also Ask" -->
  <h2>Secondary Keyword or Question</h2>
  <!-- content -->
  
  <h2>Another Secondary Topic or FAQ Question</h2>
  <!-- content -->
  
  <!-- INTERNAL LINKS: 2–3 to related pages -->
  <!-- IMAGES: all with descriptive alt text -->
  <!-- CALL TO ACTION: clear and above the fold -->
</body>
</html>
```

---

## Reference Files

- `references/technical-seo.md` — Full technical setup: robots.txt, sitemap, redirects, Core Web Vitals fixes
- `references/on-page-seo.md` — Content templates for 8 common page types (homepage, product, blog, FAQ, etc.)
- `references/schema-templates.md` — Copy-paste JSON-LD schema for 10 schema types
- `references/link-building.md` — Outreach templates and link-building strategies for new domains
