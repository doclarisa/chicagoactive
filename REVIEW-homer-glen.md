# Homer Glen wave — review checklist

Context: Homer Glen had 1 pre-existing listing (Adults & Seniors Programs
at Homer Township Public Library) but no `/city/homer-glen` hub page.
This wave adds 1 verified venue, clearing the bar, and adds Homer Glen to
`lib/cities.ts` for the first time. This is the last commit in
`multi-area-wave-13`, so it also carries the CITIES entries for all 5
areas built this wave.

## New listings added (1)

### 1. Homer Township Senior Services — Founders Activity Center
- **sourceUrl:** https://homertownship.com/senior-services/
- Bingo, 2nd Tuesday of the month, doors 11:45am / game at noon — confirmed via consistent search-result summaries. **Important distinction, dedup-checked:** "Homer Township" here is the actual township government, a separate entity from "Homer Township Public Library District" (the pre-existing listing) — same geographic name, two independently-run organizations. Confirmed via a whole-DB name search before writing this listing.
- **Verify:** homertownship.com blocked automated verification (403) on every attempt. Only the Bingo schedule was confirmed with specifics — the full activity list at Founders Activity Center could not be verified beyond that. Flagged via `qualityNote`.

## How to review (should take ~5 min)

1. Open the `sourceUrl` above and re-check facts (the fetch tool couldn't reach it).
2. Visit https://www.chicagoactiveseniors.com/city/homer-glen after deploy to confirm both listings render correctly.
