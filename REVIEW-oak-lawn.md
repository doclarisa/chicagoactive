# Oak Lawn wave — review checklist

Context: Oak Lawn had 1 pre-existing listing (Oak Lawn Park District Senior
Programs) but no `/city/oak-lawn` hub page. This wave adds 2 verified venues,
clearing the bar, and adds Oak Lawn to `lib/cities.ts` for the first time.
This is the last commit in `multi-area-wave-4`, so it also carries the CITIES
entries for all 5 areas covered this wave.

## New listings added (2)

### 1. Oak Lawn Public Library — Adult Services
- **sourceUrl:** https://www.olpl.org/using-the-library/adult-services
- Tech Help, digital access (Hoopla/Libby), AgeOptions-funded Chromebook lending and tech training for 60+ — confirmed directly.
- **Note:** a "Local History Room" (small museum on the library's 2nd floor) turned up in research but wasn't confirmed on the Adult Services page itself I fetched — left out rather than asserted, since I couldn't verify its current status/hours directly.
- **Verify:** dementia-care kits mentioned in earlier search results weren't confirmed on the specific page I fetched — not included in the description.

### 2. Oak Lawn Senior Center
- **sourceUrl:** https://www.oaklawn-il.gov/residents/senior_center/index.php
- Village-run, Memorial Activity Center, exercise classes, arts & crafts, monthly box lunch with exact pricing — confirmed directly, including the fact that the center recently relocated (new address/phone reflected here).
- **Verify:** address only geocoded to street-level precision, not a rooftop match — marked `geoPrecision: "approximate"`.

## Other changes (this commit)

- `lib/cities.ts` — this is the last commit in `multi-area-wave-4`, so it carries new CITIES entries for all 5 areas: **Northbrook, Northfield, Glenview, River Forest, and Oak Lawn** — all five were missing from the index despite having listings, so all five hub pages would have 404'd before this branch.

## How to review (should take ~10 min)

1. Open each `sourceUrl` above and re-check facts.
2. Consider whether the Local History Room at the library is worth a follow-up verification pass.
3. Visit https://www.chicagoactiveseniors.com/city/oak-lawn after deploy to confirm all 3 listings render correctly.
