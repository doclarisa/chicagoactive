# Country Club Hills — wave-17 review

Existing listing: OAK Senior Program — The Oaks of Country Club Hills (already in DB, unchanged).

## New listing

### Country Club Hills Fitness Center — Senior Citizen Membership
- Source: https://countryclubhills.org/parks-rec-home/facilities/fitness-center/
- Fetched directly — hours, equipment list, and pricing tiers all confirmed.
- Senior Citizen (55+) membership: $80/year or $38/quarter, vs. $106-130/year for regular adult (18+) — a self-directed gym-access offering, genuinely distinct from OAK's organized social/recreational program at a different building (4709 W. 179th St. vs. City Hall's lower level).
- Same parent organization (City of Country Club Hills Parks & Rec Dept) as the existing OAK listing, but the directory already has precedent for treating a district's senior fitness membership as separate from its senior center listing (see Marengo Park District Senior Fitness Center Membership).

## Dropped
- Bremen Township Senior Services: already in DB, filed under Oak Forest (its true address, 15350 S. Oak Park Ave). Confirmed via direct grep of prisma/seed.ts before researching further — would have been a false "new" candidate.
- Rich Township Senior Center (Shirley J. Green): already in DB, filed under Park Forest (its true address, 297 Liberty Dr). Same check, same result.
- Grande Prairie Public Library: true address is 3479 W. 183rd St., Hazel Crest, not Country Club Hills, despite the city's own page pointing residents to it. Also no recurring senior program found — only a single one-off "Senior Alert" event. Fails both the true-address rule and the no-one-off-events rule.
- Country Club Hills Historical Commission / Cultural Arts Commission: government advisory boards that meet monthly, not public-facing venues residents attend.
- YMCA: no branch located in Country Club Hills.
- Community college lifelong-learning: no campus physically located in Country Club Hills (Prairie State is Chicago Heights, Moraine Valley is Palos Hills, South Suburban is South Holland).
- Country Club Hills Community Recreation Center (adult swim/tennis/boxing): fetched directly; no senior-specific pricing, schedule, or eligibility distinct from general adult programming or the Fitness Center listing above.

## Flagged for a future data-fix pass (not touched this wave)
The city's own current pages show the OAK program is now based at the "Resource Center," 19001 S. Cicero Ave, Tue-Fri 10am-3pm, membership $12/yr resident-$24/yr non-resident — not "4200 West Main Street, lower level of City Hall" as the existing DB listing states. Worth a quick manual re-verify and address correction on that listing.
