# Schaumburg wave — review checklist

Context: Schaumburg already had a live `/city/schaumburg` page with 2 listings
(Memory Café at the Township library, Schaumburg Park District Senior
Center). This wave adds 2 more verified venues to the existing page — this
one was already a working hub, not a "clear the bar" fix like most of this
branch's other cities.

## New listings added (2)

### 1. Schaumburg Township District Library — Adult Services
- **sourceUrl:** https://www.schaumburglibrary.org/programguide
- General adult programming confirmed (job skills, digital literacy, book clubs, cultural events, 1,000+ programs/year), plus the library's stated service area.
- **Verify:** nothing flagged, though this is a broader companion listing to the already-live Memory Café entry from the same library system — not a duplicate (different, more general scope), but worth a glance to make sure the two read as complementary rather than redundant on the page.

### 2. Village of Schaumburg Senior Center — The Barn
- **sourceUrl:** https://www.villageofschaumburg.com/residents/senior-citizen-programs
- **Verify:** villageofschaumburg.com blocked every WebFetch attempt (403). The description (daily meals, sign-up-by-day-or-month, welcomes seniors from multiple nearby communities) is built from search-result text with a specific address and phone that reads as genuine page content, but I could not personally re-confirm it live. `registration` is marked "Verify — see official site" for current costs/schedule. This is a genuinely different entity from Schaumburg Township's senior services (already covered under Hoffman Estates in an earlier wave) — the Village and the Township are separate government layers, confirmed via the distinct address (231 S Civic Drive vs. the Township's 1 Illinois Blvd, Hoffman Estates).
- Address only geocoded to street-level precision, not a rooftop match — marked `geoPrecision: "approximate"`.

## How to review (should take ~10 min)

1. Open each `sourceUrl` above and re-check facts, especially #2 (The Barn — I could not fetch this page myself).
2. Try fetching villageofschaumburg.com yourself; if you get through, confirm current meal/activity costs.
3. Visit https://www.chicagoactiveseniors.com/city/schaumburg after deploy to confirm all 4 listings render correctly.
