# La Grange wave — review checklist

Context: La Grange had 1 pre-existing listing (La Grange Area Historical
Society / Vial House Museum, added last wave with its true La Grange
address) but no `/city/la-grange` hub page. This wave adds 2 verified
venues, clearing the bar, and adds La Grange to `lib/cities.ts` for the
first time. Note: La Grange is a separate municipality from La Grange Park
(already its own area) — same name pattern, different towns, different
library systems.

## New listings added (2)

### 1. Park District of La Grange — Senior Programs
- **sourceUrl:** https://pdlg.org/our-programs/senior-programs
- **Verify:** pdlg.org blocked the WebFetch attempt (403). Weekly Pinochle, Senior Socials with bingo, day trips, and the 10% 55+ discount are sourced from a search-result summary that reads as genuine page content, but I could not personally re-confirm it live. `registration` is marked "Verify — see official site."

### 2. La Grange Public Library — Adult Services
- **sourceUrl:** https://lagrangelibrary.org/welcome/
- Confirmed directly, including the explicit distinction from the separately-run La Grange Park Public Library (different domain, different district).
- **Verify:** nothing else flagged.

## How to review (should take ~10 min)

1. Open each `sourceUrl` above and re-check facts, especially #1 (I could not fetch this page myself).
2. Visit https://www.chicagoactiveseniors.com/city/la-grange after deploy to confirm all 3 listings render correctly.
