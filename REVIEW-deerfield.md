# Deerfield wave — review checklist

Context: Deerfield had 1 pre-existing listing (Patty Turner Senior Center,
Deerfield Park District) but no `/city/deerfield` hub page. This wave adds
1 verified venue, clearing the bar, and adds Deerfield to `lib/cities.ts`
for the first time.

## New listings added (1)

### 1. West Deerfield Township Senior Services
- **sourceUrl:** https://westdeerfieldtownship.org/senior-health-services/
- Fetched directly and confirmed: Hospital Taxi ($4.25/one-way trip to Highland Park Hospital), Senior Call daily check-in for homebound residents, Going Places medical transportation, free ACA enrollment counseling.
- Confirmed genuinely distinct from the existing Patty Turner Center listing — different operator (township government vs. Park District), different address, no overlap.
- **Verify:** exact eligibility requirements, costs beyond the $4.25 taxi coupon, and office hours weren't stated on the fetched page — flagged in `registration`.

## How to review (should take ~5 min)

1. Open the `sourceUrl` above and re-check facts.
2. Visit https://www.chicagoactiveseniors.com/city/deerfield after deploy to confirm both listings render correctly.
