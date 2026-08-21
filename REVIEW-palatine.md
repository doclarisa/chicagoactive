# Palatine wave — review checklist

Context: Palatine had 1 pre-existing listing (Palatine Township Senior
Citizens Council) but no `/city/palatine` hub page. This wave adds 2 verified
venues, clearing the bar, and adds Palatine to `lib/cities.ts` for the first
time.

## New listings added (2)

### 1. Palatine Library District — Adult Services
- **sourceUrl:** https://www.palatinelibrary.org/museums-and-attractions
- Chair Yoga, Museum Adventure Pass, Explore More Illinois — confirmed directly, including Main Library hours.
- **Verify:** nothing flagged, but the Main Library address (700 N. North Court) only geocoded to street-level precision, not a rooftop match — marked `geoPrecision: "approximate"` rather than overstating distance precision on the city page.

### 2. Clayson House Museum
- **sourceUrl:** https://www.palatineparks.org/facilities/clayson-house-museum-library/
- 1890s home museum run by Palatine Park District with the Palatine Historical Society, hours confirmed directly.
- **Caught and avoided an error:** an earlier search result claimed the Palatine Historical Society was "housed in the 1864 Palatine Station" — this turned out to be a mix-up with the actual Palatine Metra train station (a different, unrelated building). Went with the Park District's own page instead, which clearly identifies Clayson House as the Historical Society's real venue.
- **Verify:** general-admission cost isn't stated on the official page — marked "Verify — see official site" rather than guessing; used `FREE` as the best-available placeholder for a small local house museum of this type, but that's an assumption, not a confirmed fact.

## How to review (should take ~10 min)

1. Open each `sourceUrl` above and re-check facts, especially Clayson House's admission cost.
2. Visit https://www.chicagoactiveseniors.com/city/palatine after deploy to confirm all 3 listings render correctly.
