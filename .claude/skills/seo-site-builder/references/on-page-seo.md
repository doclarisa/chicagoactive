# On-Page SEO Templates

## Homepage

**Goal:** Rank for brand name + 1 broad category keyword.

```
Title:       [Brand] — [Primary Category] | [City or "Nationwide"]
Meta Desc:   [Brand] [what you do] for [target customer]. [Benefit]. [CTA].
H1:          [What You Do] for [Target Customer]
First 50px:  Clear value proposition + primary CTA button
Sections:    What we offer / Why us (3–4 bullets) / Social proof / CTA
Schema:      Organization + WebSite + LocalBusiness (if local)
```

Example (DissolveUSA):
```
Title:       DissolveUSA — PVA Dissolvable Grocery Bags | Wholesale & DTC
Meta Desc:   PVA dissolvable grocery bags that dissolve in water. No microplastics, 
             no landfill. Wholesale for stores, direct-to-consumer packs. Free samples.
H1:          Dissolvable Grocery Bags That Simply Disappear
```

---

## Product / Category Page

**Goal:** Rank for "[product name]" or "buy [product]" transactional keyword.

```
Title:       Buy [Product] — [Key Benefit] | [Brand]
Meta Desc:   [Product] from [Brand]. [Spec or benefit]. Ships in [time]. [Price signal].
H1:          [Product Name] (matches what people search for)
Must have:   Price, availability, shipping info, product photos, reviews
Schema:      Product + Offer + AggregateRating
Above fold:  Product image, H1, price, buy button — all visible without scrolling
```

**Content sections to include:**
1. Product description (primary keyword in first sentence)
2. Key features (bulleted, scannable)
3. Technical specifications (table format)
4. "Who it's for" section
5. FAQ (5–8 questions, use FAQPage schema)
6. Reviews/testimonials (with dates)

---

## Blog / Article Page

**Goal:** Rank for informational keywords ("how," "what," "best," "vs," "why").

```
Title:       [Keyword as Question or Statement] (2026) | [Brand]
Meta Desc:   [Answer the question in 1 sentence]. [Why read more]. 
H1:          [Same as or close variant of title]
Intro:       First 100 words must answer the question directly (Google featured snippets)
Structure:   H2 → H3 hierarchy; one idea per section
Word count:  Match top competitor + 10–20% more depth
Schema:      Article + BreadcrumbList + FAQPage (if FAQs included)
```

**Article intro formula:**
```
[Direct answer to the question in 1–2 sentences.]
[Why this matters / context.]
[What this article covers — set expectations.]
```

**SEO content checklist per article:**
```
□ Primary keyword in H1, first 100 words, 1 H2, meta description, URL, title tag
□ Secondary keywords in 3–4 H2 headings
□ Images: 1 per 300–500 words, all with keyword-rich alt text
□ Internal links: 2–4 to related content
□ External links: 1–2 to authoritative sources
□ Table of contents for articles over 1,500 words
□ "Last updated" date visible on page
□ Author bio if E-E-A-T matters for this topic
```

---

## FAQ Page

**Goal:** Capture "People Also Ask" boxes and voice search queries.

```
Title:       Frequently Asked Questions About [Topic] | [Brand]
H1:          [Topic] FAQ
Format:      One H2 per question (word-for-word how people search it)
Answers:     40–60 words for paragraph snippets; 5–8 items for list snippets
Schema:      FAQPage (each Q&A pair)
```

**FAQPage schema template:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Are PVA bags safe for the environment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "PVA (polyvinyl alcohol) bags are non-toxic and break down into water, CO₂, 
                 and biomass. They contain no microplastics and leave no toxic residue. Under 
                 aerobic conditions, PVA biodegrades within weeks per ASTM D5511 testing."
      }
    }
  ]
}
```

---

## Location / Service Area Page (Local SEO)

**Goal:** Rank for "[service] in [city]" or "[service] near me."

```
Title:       [Service] in [City, State] | [Brand]
Meta Desc:   [Brand] provides [service] in [City]. [Differentiator]. Call [phone].
H1:          [Service] in [City, State]
Must have:   NAP (name, address, phone), embedded Google Map, local testimonials
Mention:     City name 4–6x naturally; nearby neighborhoods; local landmarks
Schema:      LocalBusiness (or subtype) with geo coordinates
CTA:         Phone number clickable on mobile; contact form
```

**Page structure:**
1. H1 with city + service
2. Short intro (what you do, who you serve in this city)
3. Services offered (list or cards)
4. Why choose us (local-specific reasons)
5. Service area map or list of neighborhoods
6. Local testimonials (with city/neighborhood mentioned)
7. Contact / booking section
8. Embedded Google Map

---

## Landing Page (Ads / Campaign)

**Goal:** Convert; secondary goal is rank for specific campaign keyword.

```
Title:       [Offer] — [Benefit] | [Brand]
No nav:      Remove header navigation (reduces exit points)
One CTA:     Every element leads to ONE action
Above fold:  Headline + subheadline + CTA — no scrolling required
Trust:       Logos, certifications, review count near CTA
Schema:      Organization + Offer or Event
Speed:       This page must load in < 2s (critical for paid traffic quality score)
```

---

## About Page

**Goal:** E-E-A-T signal for Google; trust for visitors. Not usually a high-traffic page.

```
Title:       About [Brand] — [Mission Statement] | [Brand]
H1:          About [Brand]
Sections:    Founding story, mission, team bios with credentials, press mentions
Schema:      Organization + Person (for team members)
Images:      Real photos of team (not stock) — huge trust signal
```

---

## Content Length Reference

| Page Type | Minimum | Target | When to Go Longer |
|---|---|---|---|
| Homepage | 500 words | 800–1,200 | Never; keep focused |
| Product page | 300 words | 600–1,000 | Complex products |
| Blog article | 800 words | 1,500–2,500 | Competitive keywords |
| Pillar page | 2,000 words | 3,000–5,000 | Always |
| FAQ page | 500 words | 1,000–2,000 | More questions = more snippets |
| Location page | 400 words | 600–900 | Multiple nearby cities |
