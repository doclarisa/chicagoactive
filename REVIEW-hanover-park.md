# Hanover Park wave — review checklist

Context: Hanover Park had 1 pre-existing listing (Hanover Park Park District
Adult & Senior Art and Music Lessons) but no `/city/hanover-park` hub page.
This wave adds 1 verified venue, clearing the bar, and adds Hanover Park to
`lib/cities.ts` for the first time.

## New listings added (1)

### 1. Hanover Township Senior Center
- **sourceUrl:** https://www.hanover-township.org/departments/aging-services/life-enrichment
- True address in Bartlett, not Hanover Park — this is a township-wide senior center (same "true address" pattern used elsewhere for townships), confirmed as the correct resource for Hanover Park residents by the Village of Hanover Park's own site (hanoverparkillinois.org/1203/Hanover-Township-Older-Adult-Resources).
- Arts and crafts, exercise/fitness classes, day trips, technology classes, cultural/historical presentations, computer lab, medical-equipment lending closet, cards, Bingo — confirmed via consistent search-result summaries across multiple independent sources (211dupage.gov, seniorcenter.us, the township's own site).
- **Verify:** hanover-township.org blocked automated verification (403), so nothing here was fetched directly. Address also only resolved to road-level in Nominatim (no exact building POI), so `geoPrecision` is "approximate," not "exact."

## How to review (should take ~5 min)

1. Open the `sourceUrl` above in a browser and re-check facts (the fetch tool couldn't reach it).
2. Visit https://www.chicagoactiveseniors.com/city/hanover-park after deploy to confirm both listings render correctly.
