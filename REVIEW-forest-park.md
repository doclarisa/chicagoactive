# Forest Park wave — review checklist

Context: Forest Park already had a live `/city/forest-park` page with 2
listings (Howard Mohr Community Center Senior Citizens Club, Park District
of Forest Park Active Adults & Seniors). This wave adds 1 more verified
venue to the existing page.

## New listings added (1)

### 1. Forest Park Public Library — Adult Services
- **sourceUrl:** https://www.fppl.org/category/adult/
- AARP Driver Safety Course covered for residents with a library card, home delivery, genealogy tools, job-seeker resources, tax preparation help — all confirmed directly.
- **Verify:** nothing flagged.

## Other changes (this commit)

- `lib/cities.ts` — this is the last commit in the `multi-area-wave-3` branch, so it also carries the CITIES-array changes for all 5 areas covered this wave: **Des Plaines** added for the first time (previously had 2 listings but no hub page, so `/city/des-plaines` would 404), and **Schaumburg, Barrington, Berwyn, Forest Park** each get their existing intro extended by one sentence naming the new venues.

## How to review (should take ~10 min)

1. Open the `sourceUrl` above and re-check facts.
2. Visit https://www.chicagoactiveseniors.com/city/forest-park after deploy to confirm all 3 listings render correctly.
