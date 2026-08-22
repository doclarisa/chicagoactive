# Day Trips from Chicago — review checklist

## 2026-08-22, v4: hub-and-spoke categorization (final page map)

Pure restructure — no new research, every organizer/sourceUrl/cost/Verify
flag carried over unchanged from the v3 data. Split the single 80-organizer
page into a hub plus 5 spokes, per the categorization logic: geographic
organizers (park districts, townships) sliced **by county**; commercial
tour companies are not geographic and get their **own single page**.

### Final page map

| Page | URL | Contents |
|---|---|---|
| Hub | `/guides/day-trips-from-chicago` | Landing page: intro, 2 choice cards, county-card row (counts), tour-companies card, self-guided section (13, direction-grouped) |
| Cook County spoke | `/day-trips/cook-county` | 32 organizers (16 Park Districts, 16 Townships & Senior Centers) |
| DuPage County spoke | `/day-trips/dupage-county` | 16 organizers (12 Park Districts, 4 Townships & Senior Centers) |
| Lake County spoke | `/day-trips/lake-county` | 14 organizers (7 Park Districts, 7 Townships & Senior Centers) |
| Other Chicagoland Areas spoke | `/day-trips/other-areas` | 13 organizers (10 Park Districts, 3 Townships & Senior Centers) — Will (5) + Kane (5) + Kendall (1) + McHenry (2) folded together |
| Commercial tour companies | `/day-trips/tour-companies` | 5 companies (Road Scholar, Jones Travel, Cardinal Buses, Mayflower Tours, Diamond Tours), not county-sliced |

**80 organizers total** (32+16+14+13+5), verified by direct count against
the data file after adding the `county` field — matches the pre-existing
total exactly, confirming nothing was lost or duplicated in the split.

### Why Will/Kane/Kendall/McHenry were folded together

Each is under the ~8-organizer threshold on its own (5, 5, 1, 2
respectively) — a standalone page for any of them would read as
near-empty. Rather than force each into a different "nearest" county
(which would scatter them inconsistently and confuse the geography), all
four were combined into one "Other Chicagoland Areas" spoke, still
sub-headed by type (Park Districts / Townships & Senior Centers) same as
the other three spokes, so the page reads coherently rather than as a
grab-bag.

### County assignment — how it was determined, and confidence level

- **58 of the 75 geographic organizers already existed as DB Listing
  rows** (from earlier area-research waves) — their county came directly
  from that row's own `county` field, queried fresh, not guessed or
  recalled from memory.
- **The remaining 17** (newly researched in the prior v3 pass, no existing
  DB listing) had their county assigned from the city already established
  during that research (e.g., Elmhurst Park District → Elmhurst → DuPage).
  None were uncertain enough to flag — every one of the 17 has an
  unambiguous single-county city.
- **No organizer's county assignment is flagged as uncertain.** The one
  county with genuine geographic complexity — Aurora, home to Fox Valley
  Park District, which spans Kane/DuPage/Will/Kendall counties — was
  assigned to Kane County (Aurora's largest/primary county and where the
  park district is headquartered), consistent with how the site has
  already been treating Aurora elsewhere (`lib/cities.ts` files it under
  Kane).

### Technical notes

- Added `County` type and `county?: County` field to `OrganizedTripProvider`
  (`lib/organizedTrips.ts`) — populated for all 75 geographic entries via
  a one-time script (58 from DB lookup) plus 17 manual edits (already-known
  cities); intentionally `undefined` for the 5 tour-company entries, which
  aren't geographic.
- Added `COUNTY_SPOKES` config (4 spokes, each listing which `County`
  values fold into it) plus `countySpokeSlugForCounty()` and
  `countySpokeBySlug()` helpers — single source of truth used by the hub's
  county cards, the spoke page itself, the sitemap, and every `/city` hub's
  cross-link.
- New dynamic route `app/day-trips/[spoke]/page.tsx` (4 static params) plus
  a separate static route `app/day-trips/tour-companies/page.tsx` — two
  different page shapes because the task explicitly wants the commercial
  page to read as a different kind of option, not a 5th spoke.
- Extracted `components/OrganizedTripProviderCard.tsx` from the hub's old
  inline `ProviderCard` function so all 5 pages that render an organizer
  card (4 spokes + commercial) share one implementation.
- `app/city/[citySlug]/page.tsx`'s day-trips cross-link now resolves each
  city's own `county` field through `countySpokeSlugForCounty()` — a
  Naperville (DuPage) reader lands on the DuPage spoke, a Grayslake (Lake)
  reader lands on the Lake spoke, a St. Charles (Kane) or Yorkville
  (Kendall) reader lands on Other Chicagoland Areas. Verified live for one
  city in each of the 4 buckets.
- `app/sitemap.ts` now includes all 5 new URLs (4 spokes + commercial),
  reusing `COUNTY_SPOKES` so it can't drift out of sync with the actual
  page set.
- No orphan pages: every spoke is linked from the hub (county-card row)
  and from its sibling spokes ("Nearby areas" row); the commercial page is
  linked from the hub and from every spoke's "Nearby areas" row.
- No duplicate keyword targeting: confirmed the pre-existing, unrelated
  `/activities/senior-day-trips/[county]` route (an activity-tag×county
  cell for filtering the free directory by the "day-trips" activity tag)
  is a different feature with different intent from the new
  `/day-trips/[county]` organizer-directory spokes — different URL
  namespace, no collision, not something this pass touched.

### How to review (~15 min)

1. Visit `/guides/day-trips-from-chicago` — confirm 4 county cards with
   correct counts (32/16/14/13), a visually separate tour-companies card
   (5), and the self-guided section still works.
2. Visit each of the 4 spoke pages — confirm sub-group counts sum to the
   page total, and "Nearby areas" links to the other 3 + tour companies.
3. Visit `/day-trips/tour-companies` — confirm all 5 companies render,
   Road Scholar's affiliate CTA still works, the others link plainly.
4. Visit a `/city/*` page in each of the 4 county buckets (e.g. Naperville,
   Grayslake, St. Charles, Yorkville) — confirm each links to the right
   spoke.
5. Check `/sitemap.xml` for all 5 new URLs.

---

## 2026-08-22, v3: consolidate + restructure + deep re-research

Live page (at the time): `/guides/day-trips-from-chicago` was the sole
canonical page; `/category/day-trips-near-chicago` 301/308-redirects here
(the redirect is unchanged by v4 above).

Three phases, each committed separately on `day-trips-v3`:

Three phases, each committed separately on `day-trips-v3`:

### Phase A — Consolidated to one canonical page

`/category/day-trips-near-chicago` (only ever had 2 listings) now permanently
redirects (`next.config.ts`, 308) to `/guides/day-trips-from-chicago`. Removed
from `generateStaticParams` in `app/category/[category]/page.tsx` and from
`app/sitemap.ts` so it's never offered as a second indexable URL. Main-nav
"Day Trips" already pointed to the guide from an earlier pass. Verified live:
redirect returns `308 Permanent Redirect` with the correct `Location` header.

### Phase B — Restructured for clarity

Added two prominent choice cards immediately after the intro (🚌 "Let someone
else drive" / 🚗 "Drive yourself"), each anchor-linking down to its section
(`#organized`, `#self-guided`) instead of presenting a wall of text first.
Every group heading ("Park District senior trips (45)") and region heading
now computes its count live from `.length` on the data array — verified in
rendered output, not hardcoded.

### Phase C — Deep re-research: 9 → 80 organizers

Systematic sweep of Cook, DuPage, Lake, Will, McHenry, and Kane counties.

**Final counts:**
| Group | Count |
|---|---|
| Park District senior trips | 45 |
| Township & senior center trips | 30 |
| Guided tour companies | 5 |
| **Total organizers** | **80** |
| Self-guided destinations (unchanged) | 13 |

This exceeds the brief's "roughly 40-70" target. Rather than trim verified,
real entries to land inside that range, all 80 were kept — every one traces
to an official source or an already-verified DB Listing (see dedup below),
so the overage reflects genuine coverage, not padding. No organizer was
included on a passing mention alone; the DB-sourced bulk entries were only
pulled from listings where `activities` explicitly includes `"day-trips"` or
category is `day-trips-near-chicago`, tags applied during area-research waves
specifically because trip programming was confirmed at the time.

**Where research came from:**
- **9 richly-detailed originals** (kept from the prior pass): Bolingbrook,
  Crystal Lake, Wood Dale, Rolling Meadows, St. Charles Park Districts;
  Forest Park (Howard Mohr), Maine Township, Orland Township, Hanover
  Township.
- **17 newly-researched this pass**, each with fresh WebSearch/WebFetch
  verification and full enrichment: Elmhurst, Downers Grove, Wheaton,
  Schaumburg, Elk Grove, Park District of Oak Park, Oak Lawn,
  Homewood-Flossmoor, Glen Ellyn, Lombard Park Districts; Joliet, Plainfield
  Park Districts; Fox Valley Park District (Aurora), Batavia Park District;
  Waukegan Park District, Waukegan Township (Patricia A. Jones Center);
  Tinley Park Senior Center.
- **49 bulk-imported from the DB**, generated directly from already-verified
  `Listing` rows built up across this session's 15 earlier area-research
  waves (name, sourceUrl, phone, residency requirement all trace to that
  row). This is the majority of the growth — see "Dedup" below.
- **5 tour companies** (up from 3): Road Scholar, Jones Travel, Cardinal
  Buses (unchanged from prior pass) plus **Mayflower Tours** and **Diamond
  Tours** (new, both hedged — see Verify flags).

**Counties where coverage is genuinely thin** (confirmed after actively
searching, not just where research stopped early):
- **Kendall County: 1 organizer** (Oswego Senior & Community Center). Fresh
  searches for Yorkville- and Oswego-area park district trip programs didn't
  turn up additional confirmed programs beyond what was already in the DB.
- **McHenry County: 2 organizers** (both Crystal Lake Park District
  listings). Searches for Woodstock (SOAR@Dorr — already in the DB, not
  duplicated), Cary, Algonquin, and Huntley didn't surface additional
  confirmed trip-specific programs.
- **Will and Kane Counties: 5 organizers each** — moderate, not thin, but
  smaller than Cook/DuPage/Lake. Genuine new finds in both (Joliet,
  Plainfield, Batavia, Fox Valley/Aurora) suggest more exist; this reflects
  time spent, not an exhausted county.

### Dedup — how it was applied at this scale

Every one of the 75 local (non-tour-company) organizers was checked against
the DB before being written. The 49 "bulk" entries **are** DB Listings — they
were pulled directly from rows already created during 15 earlier
area-research waves this session, each carrying `existingListingSlug` back
to that row. The 9 originals and 17 newly-researched entries were checked by
name against the DB; all 9 originals already existed (cross-linked, as
before). Of the 17 new, **none were already in the DB** — confirmed via
name search before writing — so all 17 are genuinely new standalone entries
with no existing listing to cross-link.

### Cost — the "never default to Free" rule

Every bulk-imported entry's `cost` field is deliberately `"Varies — see
current schedule"`, regardless of what the source Listing's `cost` enum says
(often `FREE`, since that describes general membership, not a specific
trip's fee). This was a deliberate choice, not an oversight — see the code
comment in `lib/organizedTrips.ts` above the bulk-entries block. No entry
anywhere in the file has `cost: "Free"`.

### Every "Verify" flag (all `verifyNotes` in the data)

- **Schaumburg Park District**: whether trips use the district's own bus or
  a charter service wasn't confirmed.
- **Homewood-Flossmoor Park District**: day-trip specifics weren't itemized
  on official pages beyond general adult/senior programming.
- **Waukegan Park District**: senior-specific trip details weren't itemized;
  trips exist as part of broader all-ages programming.
- **Mayflower Tours**: their branding centers on multi-day "Motorcoach
  Holiday" tours — did not confirm whether any single-day Chicago-area
  excursions are currently offered.
- **Diamond Tours**: confirmed they tour *to* Chicago as a destination for
  national groups; did not confirm they run Chicago-*departure* day trips
  for local seniors specifically — likely more relevant as a national
  option than a local one.
- Plus all `verifyNotes` carried over unchanged from the 9 original entries
  (Bolingbrook cost/departure, Wood Dale departure, Rolling Meadows 2022
  pricing, Forest Park membership fee/departure, MaineStreamers departure,
  Orland Township non-resident eligibility, Hanover Township costs).

### Affiliate-swap placeholders

Only **Road Scholar** carries a `bookingUrl` / `AffiliateLink` CTA — it's
the only one of the 5 tour companies with an existing placeholder in
`lib/affiliates.ts` (`AFFILIATES.roadScholar.url`, tagged `// AFFILIATE:
replace with Road Scholar link`). Jones Travel, Cardinal Buses, Mayflower
Tours, and Diamond Tours have no known affiliate program, so per the brief
("never hide a good option because it doesn't pay us") they're listed in
full with a plain link to their own site — no CTA styling difference, no
affiliate tag. Park district and township trips are correctly never
affiliate-tagged.

### Technical notes

- `app/guides/day-trips-from-chicago/page.tsx` unchanged in overall
  structure from the prior pass (still the static route that wins over
  `/guides/[slug]`) — only the intro/choice-card markup and dynamic count
  expressions changed.
- `lib/organizedTrips.ts` grew from ~200 to ~1,300 lines. All 80 entries
  live in a single `ORGANIZED_TRIP_PROVIDERS` array — the page's existing
  `.filter(p => p.group === group)` logic groups them for rendering, so
  array order doesn't affect the rendered grouping.
- Self-guided destinations (`lib/dayTrips.ts`, 13 entries) were **not**
  touched this pass — Section 2 is unchanged from the prior version.

### How to review (~20 min given the scale)

1. Spot-check 5-10 of the 49 bulk entries in `lib/organizedTrips.ts` against
   their `existingListingSlug` — confirm the cross-linked page's own
   `sourceUrl`/`phone` match what was pulled.
2. Visit `/guides/day-trips-from-chicago` after deploy — confirm both choice
   cards scroll to the right section, all group/region counts render, and a
   sample of "See full listing on our site" links resolve (200, not 404).
3. Visit `/category/day-trips-near-chicago` directly — confirm it redirects
   to the guide (not a 404 or a stale cached page).
4. When ready to monetize for real: search `AFFILIATE:` across the repo —
   only Road Scholar has a swap-ready placeholder.

---

## 2026-08-22, prior pass: full rebuild — organized group trips now lead

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
