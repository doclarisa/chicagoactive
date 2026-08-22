# Day Trips from Chicago — review checklist

Live page: `/guides/day-trips-from-chicago`

## 2026-08-22 update: restructured to lead with organized group trips

The first version of this page led with self-guided destinations. Corrected
per feedback: the actual ask was organized group day trips — who runs them,
how to join, typical cost, residency/membership requirements, and where to
book — as "the high-value, low-effort-for-the-traveler, monetizable core."
The page now leads with that. What changed:

- **New "Organized group day trips" section, now first on the page**, with
  two tiers:
  1. **Motorcoach tour companies** (`lib/dayTripOperators.ts`) — Jones
     Travel and Cardinal Buses, both verified as real, senior-focused
     operators serving the Chicago region. **Road Scholar was NOT added
     here** — direct research confirmed their Chicago-area programs are
     multi-day only (5-6 day itineraries with lodging), not single-day
     excursions, despite the brief's example. Kept in its own "Guided
     multi-day trips" section further down with corrected, honest copy
     ("this one is multi-day only, not a day-trip provider like the
     companies above") rather than misrepresenting it as a day-trip option.
  2. **Local park districts & senior centers (57 organizations)** — pulled
     **live from the Listing table** via a Prisma query in the page itself
     (`activities` contains `"day-trips"` OR `category ===
     "day-trips-near-chicago"`), not hand-copied into a static file. This
     was a deliberate architecture choice: 78 raw matches turned up across
     15 waves of area-building this session, and re-typing all of them into
     a static array would immediately drift out of sync as new areas ship.
     Querying live means this list updates automatically. Each card shows
     what the existing Listing data actually captures — operator type, cost
     tier (FREE/LOW_COST/PAID), residency requirement when known
     (`residentRequired` is `null` for many, so nothing is asserted when
     it's not been verified) — and links to that org's own program page as
     "Current schedule," never a specific dated departure.
  3. Chicago's 16 DFSS Regional/Satellite Senior Centers are **excluded
     from the individual list and folded into one combined line** instead
     ("find your neighborhood center →") — they share one generic "Life
     Enrichment Activities" description with no distinguishing per-center
     trip program, the same judgment call already made for the `/chicago`
     hub page earlier in this project (see `lib/activityCounties.ts`'s
     `day-trips×Chicago` non-page decision).
- The original 13-destination self-guided guide is **kept**, not deleted —
  it's still genuinely useful, verified content — but demoted to a "Prefer
  to plan it yourself?" section after the organized-trips content.
- Evergreen discipline applied throughout: no specific trip dates anywhere
  (an "October casino run" would go stale) — every entry points to the
  organizer's own live schedule/calendar instead.

## What this replaces (original build)

`/guides/day-trips-from-chicago` already existed before this task, as a thin,
deliberately deindexed 2-link affiliate stub (Viator + Road Scholar), with a
code comment saying it should "stay out of the index until Stage 5 rebuilds
these with real recommendations." This task **is** that rebuild — the URL is
unchanged, but it's now a static route (`app/guides/day-trips-from-chicago/page.tsx`)
that takes precedence over the generic `/guides/[slug]` template, with real
content and `robots: index: true`. The `lib/guides.ts` entry for this slug is
kept (with an updated `title`) only because `app/[slug]/page.tsx`'s
category-page exit ramp (`CATEGORY_GUIDE_MAP["day-trips-near-chicago"]`) reads
`title`/`exitRampPrompt` from it — that cross-link still needs a title to show.

## 13 destinations, every sourceUrl

| Destination | sourceUrl |
|---|---|
| Starved Rock State Park | https://dnr.illinois.gov/parks/park.starvedrock.html |
| Milwaukee | https://amtrakhiawatha.com/ |
| Galena | https://www.visitgalena.org/ |
| Lake Geneva | https://www.cruiselakegeneva.com/ |
| Indiana Dunes National Park | https://www.nps.gov/indu/ |
| The Morton Arboretum | https://mortonarb.org/visit-the-arboretum/ |
| Chicago Botanic Garden | https://www.chicagobotanic.org/ |
| Long Grove | https://www.longgrove.org/ |
| Geneva & St. Charles | https://www.geneva.il.us/894/Geneva-Attractions |
| Racine | https://racinedowntown.com/ |
| Kenosha | https://www.visitkenosha.com/things-to-do/attractions/harborpark/ |
| Naper Settlement & the Naperville Riverwalk | https://www.napersettlement.org/8/Visit |
| Volo Auto Museum | https://volocars.com/ |

Every field (driving time/miles, train line + trip time, cost, senior discount,
walking/accessibility, best time, food) was sourced from the official site
above, a state/city tourism site, or Metra/Amtrak directly — see
`lib/dayTrips.ts` for the exact wording per field. Nothing was estimated.

## Every "Verify" flag

- **Starved Rock**: 2026 trail-improvement construction may limit access to
  some canyon trails — check dnr.illinois.gov before visiting.
- **Galena**: Ulysses S. Grant Home State Historic Site admission cost wasn't
  confirmed on official pages.
- **Lake Geneva**: exact current cruise ticket price wasn't confirmed —
  cruiselakegeneva.com states a senior discount applies but not the base fare.
- **The Morton Arboretum**: exact adult general-admission ticket price wasn't
  confirmed — search results referenced group-rate and "$2 off online"
  pricing but not the individual walk-up adult rate.
- **Kenosha**: Kenosha Public Museum / Civil War Museum admission costs
  weren't confirmed on official pages (Wisconsin public museums are
  frequently free, but this wasn't verified for these two specifically —
  don't assume free without checking).
- **Volo Auto Museum**: no on-site restaurant — the nearest confirmed option
  (Fox Lake Family Restaurant) is about 5 miles away, not walkable.

## Candidates from the brief that were NOT dropped, with a caveat

- **Galena's drive time (2h49m) exceeds "roughly 2 hours."** Kept because the
  brief explicitly named it as a strong candidate and it's a genuinely
  popular, real destination — but this is flagged directly in the trip's own
  blurb and cost/time fields ("the longest drive on this list"), not hidden.

Nothing else from the brief's candidate list was dropped — all 12 named
candidates made it in (Geneva and St. Charles combined into one entry per
the brief's own grouping), plus Kenosha added as a 13th for variety
alongside Racine.

## Every affiliate-link-swap spot

All marked with `// AFFILIATE: replace with Viator/GetYourGuide link once
signed up` in `lib/dayTrips.ts` (via each trip's `bookingUrl` field) and
`app/guides/day-trips-from-chicago/page.tsx` (where `bookingUrl` renders):

1. Milwaukee → currently links to `mam.org/visit/` (Milwaukee Art Museum's
   own ticket page)
2. Lake Geneva → currently links to `cruiselakegeneva.com/public-tours/`
   (Cruise Lake Geneva's own booking page)
3. The Morton Arboretum → currently links to `tickets.mortonarb.org/admission`
   (the Arboretum's own ticket page)
4. Naper Settlement → currently links to `napersettlement.org/8/Visit`
   (Naper Settlement's own visit page)
5. Volo Auto Museum → currently links to `volocars.com/plan-your-visit`
   (the museum's own visit-planning page)

Plus one more, in the "Guided & multi-day trips" section at the bottom of
the page:

6. **Road Scholar** block — reuses the existing `AFFILIATES.roadScholar`
   placeholder from `lib/affiliates.ts` (already marked as a placeholder URL
   with a comment; not modified by this task beyond reuse).

No real affiliate IDs, tracking codes, or commission terms were invented
anywhere — every link above goes to the destination's own official site for
now, exactly as instructed.

## Technical notes for whoever reviews the diff

- New file: `lib/dayTrips.ts` (the `DayTrip` type + all 13 entries).
- New file: `app/guides/day-trips-from-chicago/page.tsx` — a **static**
  route, which Next.js resolves ahead of the sibling dynamic
  `app/guides/[slug]/page.tsx` for this exact path. Confirmed at build time:
  only one HTML file was emitted for this path
  (`.next/server/app/guides/day-trips-from-chicago.html`), and it contains
  the new rich content, not the old generic template. The other two guides
  (`online-learning-after-60`, `hobby-fitness-gear-for-active-seniors`)
  still render through the generic `[slug]` template unchanged.
- Edited: `lib/schema.ts` — added `touristAttractionSchema()`, a minimal
  `TouristAttraction` JSON-LD helper using only verified fields (name,
  description, source URL, state). One `<script>` block per destination,
  plus one `BreadcrumbList` for the page itself.
- Edited: `lib/guides.ts` — updated the `title`/`exitRampPrompt` on the
  existing `day-trips-from-chicago` entry so the category-page exit ramp
  (`app/[slug]/page.tsx`, via `CATEGORY_GUIDE_MAP`) shows accurate copy. The
  entry's `offers`/`intro` fields are now dead data (unused now that the
  static route owns rendering) but kept so the `Guide` type stays valid.
- Edited: `components/Header.tsx` — added a "Day Trips" nav link.
- Edited: `app/page.tsx` — added a homepage section linking to the guide.
- Edited: `app/city/[citySlug]/page.tsx` — added a "See day trips from
  Chicago" cross-link on every city hub page (applies to all cities, not
  just Naperville — the brief's Naperville mention read as illustrative,
  not exclusive).
- Sitemap: no manual edit needed — `app/sitemap.ts` already loops over the
  `GUIDES` array, and the entry was kept (see above), so
  `/guides/day-trips-from-chicago` is included automatically.

## How to review (~15 min)

1. Skim `lib/dayTrips.ts` against the sourceUrl table above.
2. Visit `/guides/day-trips-from-chicago` after deploy — check all 13 cards
   render, the 6 "Book a tour" buttons open the right official pages, and
   the Road Scholar block at the bottom works.
3. Confirm the nav "Day Trips" link, the homepage section, and a couple of
   `/city/*` pages all link through correctly.
4. When ready to monetize for real: search `AFFILIATE:` across the repo to
   find every spot that needs a real tracking link swapped in.
