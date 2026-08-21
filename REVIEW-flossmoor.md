# Flossmoor wave — review checklist

Context: Flossmoor had 1 pre-existing listing (Senior Bagels & Bingo —
Flossmoor Public Library) but no `/city/flossmoor` hub page. This wave adds 1
verified venue, clearing the bar, and adds Flossmoor to `lib/cities.ts` for
the first time.

## New listings added (1)

### 1. Flossmoor Public Library — Adult Services
- **sourceUrl:** https://www.flossmoorlibrary.org/programs/
- Gentle yoga (18+), Microsoft Excel Fundamentals class, AgeOptions-backed senior programming — confirmed directly, distinct from the existing Senior Bagels & Bingo entry (same library, different program angle).
- **Verify:** nothing flagged.

## Considered and dropped

- **Village of Flossmoor "Senior Services"** — this page turned out to be a referral/resource directory pointing to the Homewood-Flossmoor Park District (already covered under the existing Homewood listing, which will surface as "Nearby" for Flossmoor) and to Rich Township Senior Center — which **already exists** in the DB (added in an earlier wave, tagged Park Forest). Adding either again here would have duplicated existing content, so neither was re-added.

## How to review (should take ~5 min)

1. Open the `sourceUrl` above and re-check facts.
2. Visit https://www.chicagoactiveseniors.com/city/flossmoor after deploy to confirm both listings render correctly.
