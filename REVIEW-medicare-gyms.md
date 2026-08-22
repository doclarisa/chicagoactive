# Medicare Fitness Benefit Gyms — Review

Guide: `/guides/medicare-fitness-gyms` (static route, single consolidated page — not
a hub-and-spoke tree, per the mid-build correction: "build it under Pickleball &
Fitness, not a separate entry"). No main-nav link added. Reached via the
`pickleball-fitness` category's exit-ramp card and cross-links from Day Trips /
directly.

Data: `lib/medicareGyms.ts`. Card component: `components/MedicareGymCard.tsx`.
Schema helper added: `localBusinessSchema()` in `lib/schema.ts` (ExerciseGym type).

## Full-card gyms (10) — grouped by county on the page

| Gym | County | Area | SilverSneakers | Renew Active | Silver&Fit | Source |
|---|---|---|---|---|---|---|
| Crestwood Recreation & Wellness Center | Cook | Crestwood | **verified** | **verified** | verify | [crestwoodfitness.com](https://crestwoodfitness.com/memberships/silver-sneakers-renew-active/) |
| The CORE Fitness & Aquatic Complex (Lemont Park District) | Cook | Lemont | **verified** | verify | verify | [Patch](https://patch.com/illinois/lemont/lemont-core-offers-silversneakers-program-for-senior-citizens) — dedup, existing listing |
| Chicago Ridge Park District — Senior Programs | Cook | Chicago Ridge | **verified** | verify | verify | [chicagoridgeparks.com](https://chicagoridgeparks.com/seniors/) — dedup, existing listing |
| LA Fitness — South Loop / Canal St | Cook | Chicago | **verified** | verify | verify | [lafitness.com](https://www.lafitness.com/Pages/clubhome.aspx?clubid=405) |
| CFX (Charter Fitness) — Pulaski Corridor | Cook | Chicago | **verified** | verify | verify | [medicareplanfinder.com roundup](https://www.medicareplanfinder.com/medicare/silversneakers-locations-chicago-il/) |
| Active Adults at Prisco Community Center (Fox Valley Park District) | Kane | Aurora | **verified** | **verified** | verify | [foxvalleyparkdistrict.org](https://www.foxvalleyparkdistrict.org/programs-events/active-adults/) — dedup, existing listing |
| Dellwood Park Community Center (Golden Age Club) | Will | Lockport | **verified** | verify | verify | [lockportpark.org](https://www.lockportpark.org/dpcc-adult-programs/) — dedup, existing listing |
| Wheaton Park District — Central Athletic Complex | DuPage | Wheaton | **verified** | verify | verify | [wheatonparkdistrict.com](https://wheatonparkdistrict.com/programs/pickleball/) — dedup, existing listing |
| LA Fitness — Naperville | DuPage | Naperville | **verified** | verify | verify | [lafitness.com](https://www.lafitness.com/Pages/FindClub.aspx?namecityzip=Naperville) |
| Edward-Elmhurst Health & Fitness | DuPage | Woodridge | verify | verify | verify | [eehealth.org](https://www.eehealth.org/services/fitness/) — real facility, program acceptance unconfirmed |

Per-county counts on the live page: **Cook 5, DuPage 3, Will 1, Kane 1.**

Dedup: 5 of the 10 (Lemont, Chicago Ridge, Fox Valley/Prisco, Dellwood, Wheaton)
already existed as directory Listings — cross-linked via `existingListingSlug`
rather than duplicated.

## Lighter-weight list (10 gyms, name + address only)

Sourced entirely from a single third-party SilverSneakers-location roundup
(medicareplanfinder.com) — real named addresses, but no independently confirmed
pool/senior-class/Renew Active/Silver&Fit detail, so these got a lighter card, not
a full enriched one: 2x Anytime Fitness, 2x Blink Fitness, Fitness 19, Retro
Fitness Irving Park, Gottlieb Health & Fitness Center, Lawndale Christian Fitness
Center, Hyde Park JCC, Pilsen Fitness.

## Program-acceptance gaps (flagged, not guessed)

- **Silver&Fit**: no gym in Chicagoland could be confirmed as a Silver&Fit
  participant from local sourcing — every entry above marks it "verify." The page
  tells readers to use the official Silver&Fit locator directly.
- **CFX/Charter Fitness Renew Active & Silver&Fit**: CFX's own FAQ page appears
  (via search-result summary) to claim acceptance of both, but the page itself
  returned HTTP 403 to direct fetch — left as "verify" rather than "verified"
  since I couldn't read the primary source myself.
- **Edward-Elmhurst Health & Fitness**: real, current facility; no program
  confirmation found at all — included only as a "verify everything" entry
  because it's a legitimate medically-based fitness center in a county (DuPage)
  where coverage was otherwise thin.

## Dropped entirely

- **XSport Fitness**: multiple Chicago Yelp listings show "CLOSED" as of the
  2025–2026 timeframe searched; no confirmed-open location with program detail
  found. Left off the page rather than risk sending someone to a closed gym — a
  one-line mention in "other chains" points readers to xsportfitness.com to check
  directly.
- **Generic YMCA branches**: real, documented industry volatility (BCBS
  Minnesota dropping SilverSneakers at YMCA of the North / Life Time Fitness
  effective Jan 1, 2026) plus no confirmed current status for Chicago-area
  branches (McGaw YMCA, Oak Park River Forest YMCA) — turned into an explicit
  trust-building callout on the page instead of a guess either way.
- **Esporta Fitness, Planet Fitness (as full entries)**: chain-level
  participation is documented but no Chicago-specific address/enrichment was
  verified — mentioned in a lightweight "other chains" paragraph only, not given
  full cards.

## Enrichment gaps (per entry, already marked "Verify — see official site" on the page)

- Accessibility (elevator, ground-floor, mobility notes) — not confirmed for any
  entry; field omitted rather than guessed.
- Parking — not confirmed for any entry; field omitted rather than guessed.
- Senior-specific class schedules — only included where a source named a
  specific class (Crestwood's paid add-on classes noted as unscheduled; Dellwood's
  SilverSneakers Classic Stretch; Fox Valley's 25+ weekly classes; LA Fitness
  South Loop's aqua aerobics/yoga/low-impact classes).

## SEO / build

- BreadcrumbList JSON-LD + one `ExerciseGym` (LocalBusiness-family) JSON-LD per
  gym, verified fields only (name, address if known, source URL).
- `lib/categoryGuideMap.ts`: `pickleball-fitness` now points to
  `medicare-fitness-gyms` (was `hobby-fitness-gear-for-active-seniors`, which
  stays reachable via `walking-hiking-groups` and a direct cross-link from this
  new page, so it isn't orphaned).
- `lib/guides.ts`: new `medicare-fitness-gyms` entry, `offers: []` (no affiliate
  links on this page — gyms rarely have affiliate programs, and the brief said
  not to fake one).
- Sitemap picks the new guide up automatically via the existing `GUIDES.map(...)`
  loop in `app/sitemap.ts` — no separate edit needed.
- No main-nav link added (explicit correction from the user mid-build).
- `npx tsc --noEmit`: clean. `npm run lint`: 0 errors (pre-existing warning
  pattern only, same as every other page in the repo). `npm run build`: succeeds;
  confirms the static route `app/guides/medicare-fitness-gyms/page.tsx` overrides
  `app/guides/[slug]/page.tsx` for the exact path, same as Day Trips.
- Verified locally against `next start`: header nav has only Home/Areas/Directory;
  the guide page returns 200 with the correct H1 and JSON-LD; the
  `/category/pickleball-fitness` page and an individual pickleball-fitness listing
  (`/wheaton-park-district-pickleball`) both render the exit-ramp card pointing to
  `/guides/medicare-fitness-gyms`.
