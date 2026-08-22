# Day Trips from Chicago — review checklist

Live page: `/guides/day-trips-from-chicago`

## 2026-08-22, full rebuild: organized group trips now lead

This is a structural rebuild per explicit direction: the page previously mixed
free/paid/self-guided content together. It's now split by visitor intent —
Section 1 for "drive me" (organized group trips, first because it's the
priority/revenue section), Section 2 for "I'll drive myself" (self-guided
destinations, kept from the prior version, not discarded).

## Section 1 — Organized group trips (`lib/organizedTrips.ts`)

Three sub-groups, ordered by who runs them, per the brief:

### Park District senior trips (5)

| Organizer | Cross-links to existing listing | sourceUrl |
|---|---|---|
| Bolingbrook Park District — Adult Trips | `/bolingbrook-park-district-adult-trips` | bolingbrookparks.org/programs/trips/ |
| Crystal Lake Park District — Day Trips | `/crystal-lake-park-district-day-trips` | crystallakeparks.org/active-adults |
| Wood Dale Park District — Adult & Senior Trips | `/wood-dale-park-district-senior-programs-trips` | wdparks.org/programs/adult-senior-trips/ |
| Rolling Meadows Park District — Adult Activity Center | `/adult-activity-center-rolling-meadows-park-district` | rmparks.org/adult-activity-center |
| St. Charles Park District — Active Adult Center | `/st-charles-park-district-active-adult-center` | stcparks.org/aac/ |

### Township & senior center trips (4)

| Organizer | Cross-links to existing listing | sourceUrl |
|---|---|---|
| Howard Mohr Community Center — Senior Citizens Club (**Forest Park, the seed**) | `/howard-mohr-community-center-senior-citizens-club` | forestpark.net/dfp/departments/community-center/ |
| Maine Township — MaineStreamers | `/maine-township-mainestreamers` | mainetown.com/departments/mainestreamers/ |
| Orland Township — Senior Trips | `/orland-township-senior-services` | orlandtownship.org/senior-trips/ |
| Hanover Township — Senior Center | `/hanover-township-senior-center` | hanover-township.org/departments/aging-services/life-enrichment |

### Guided tour companies (3)

| Operator | New or existing? | sourceUrl |
|---|---|---|
| Road Scholar | New (national, no local DB listing) | roadscholar.org |
| Jones Travel | New (regional, no local DB listing) | jonestravel.com/senior-travel.html |
| Cardinal Buses | New (regional, no local DB listing) | cardinalbuses.com |

**Total: 12 organized-trip providers**, within the 8-15 target.

### DEDUP — how it was applied

All 9 local organizers (park districts + townships/senior centers) were
checked against the DB by name **before** writing anything. All 9 already
existed as Listing rows from earlier area-research waves this session — so
**zero new standalone local entries were created**. Each provider card links
to its existing listing ("See full listing on our site →", verified live —
all 9 return 200) in addition to the organization's own trip-program page.
Only the 3 tour companies are wholly new content, since they're
national/regional operators with no local DB presence to begin with.

### Road Scholar — verified, not assumed

The brief named Road Scholar as an example "day/short excursion" company.
Direct research (roadscholar.org, travelstride.com) confirmed their
programs — including Chicago-area ones — are **multi-day only**, shortest
around 3 days with lodging included. This is stated plainly in their card
rather than misrepresenting them as a day-trip operator. They're still
included, correctly framed, since they're a legitimate, well-known
affiliate opportunity for this audience.

### Every "Verify" flag in Section 1

- **Bolingbrook Park District**: exact per-trip cost and departure point weren't published generally.
- **Wood Dale Park District**: departure point not stated; cost examples found are from past trips.
- **Rolling Meadows Park District**: membership pricing found dates to 2022 — confirm current rates.
- **Howard Mohr Community Center (Forest Park)**: membership fee and exact departure point not confirmed.
- **Maine Township MaineStreamers**: per-trip departure location not stated.
- **Orland Township**: some trips appear resident-priced based on past examples — confirm non-resident eligibility.
- **Hanover Township**: trip costs and eligibility not confirmed on official pages — call ahead.
- **Road Scholar**: confirmed NOT a day-trip provider (see above) — flagged explicitly rather than silently included as one.

### Affiliate note

Road Scholar's card includes a "Explore trips →" CTA using
`AFFILIATES.roadScholar.url` (the existing placeholder from
`lib/affiliates.ts`), tagged `// AFFILIATE: replace with Road Scholar link`.
Jones Travel and Cardinal Buses are **not** wired as affiliate CTAs — no
known affiliate program for either, so their cards link straight to their
own sites. Park district and township trips are correctly **not**
affiliate-tagged at all, per the brief ("free value that builds trust").

## Section 2 — Self-guided destinations (`lib/dayTrips.ts`)

All 13 destinations kept from the prior build, re-grouped by direction
instead of a flat list, per the brief:

- **North — Wisconsin & the North Shore (7)**: Milwaukee, Lake Geneva,
  Racine, Kenosha, Chicago Botanic Garden, Long Grove, Volo Auto Museum
- **West — Fox Valley & Galena (4)**: Galena, Geneva & St. Charles, The
  Morton Arboretum, Naper Settlement & the Naperville Riverwalk
- **South — Indiana Dunes & Starved Rock (2)**: Starved Rock State Park,
  Indiana Dunes National Park

All original sourcing, verify flags, and affiliate booking-link placeholders
(Milwaukee, Lake Geneva, Morton Arboretum, Naper Settlement, Volo Auto
Museum → all still `// AFFILIATE: replace with Viator/GetYourGuide link
once signed up`) are unchanged from the previous version — see git history
for the original per-destination research if needed.

## Interest tags — deferred, per the brief

Both `DayTrip` (`lib/dayTrips.ts`) and `OrganizedTripProvider`
(`lib/organizedTrips.ts`) now have a `tags?: string[] | null` field,
intentionally left `null`/unset everywhere. **No filter UI was built** —
there isn't enough volume yet to avoid near-empty buckets, per the brief.
This is the hook for a future theme-filter pass once more organizers and
destinations are added.

## Technical notes

- `app/guides/day-trips-from-chicago/page.tsx` remains a **static route**
  that takes precedence over the generic `/guides/[slug]` template (used
  by the other two thin affiliate guides, untouched). Confirmed at build
  time: only one HTML file is emitted for this path.
- The page went back to a synchronous Server Component — the previous
  version added a live Prisma query for a flat 57-org list, which this
  rebuild replaces with the curated, fully-enriched 9-org cross-link
  approach above. No DB query needed for this version.
- `lib/dayTripOperators.ts` (from the prior iteration) was deleted — Jones
  Travel and Cardinal Buses now live in `lib/organizedTrips.ts` alongside
  Road Scholar and the local organizers.
- Nav, homepage section, and every `/city` hub cross-link from the prior
  build are untouched and reverified working.
- `/category/day-trips-near-chicago`'s exit-ramp link (added in a prior
  session) is untouched and still points here correctly.

## How to review (~15 min)

1. Check the Section 1 provider table above against `lib/organizedTrips.ts`.
2. Visit `/guides/day-trips-from-chicago` after deploy — confirm both
   sections render, the 9 "See full listing on our site" links resolve,
   and the Road Scholar CTA opens correctly.
3. Confirm a couple of Section 2 destination cards still render correctly
   under their new North/West/South headings.
4. When ready to monetize for real: search `AFFILIATE:` across the repo
   for every spot needing a real tracking link.
