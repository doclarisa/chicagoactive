# Glencoe wave — review checklist

Context: Glencoe had 1 pre-existing listing (Chicago Botanic Garden —
Senior Tuesday Discount, a regional attraction that happens to sit just
inside Glencoe) but no `/city/glencoe` hub page. This wave adds 1 verified,
Glencoe-native venue, clearing the bar, and adds Glencoe to
`lib/cities.ts` for the first time.

## New listings added (1)

### 1. Village of Glencoe — Older Adult Services
- **sourceUrl:** https://www.villageofglencoe.org/government/departments/public_safety/older_adult_services.php
- Fetched directly and confirmed: Senior Services Officers, wellbeing checks, home safety surveys, House Watch program, KNOXBox recommendations; Family Service of Glencoe's older-adult consultations, "Assistance for Seniors" property-tax/rent grants, Vibrant Living discussion group.
- **Verify:** page states services are "primarily targeted at residents 65 and older" — recorded as `ageEligibility`, not asserted as a hard cutoff.

## How to review (should take ~5 min)

1. Open the `sourceUrl` above and re-check facts (this one fetched cleanly, no hedging needed).
2. Visit https://www.chicagoactiveseniors.com/city/glencoe after deploy to confirm both listings render correctly.
