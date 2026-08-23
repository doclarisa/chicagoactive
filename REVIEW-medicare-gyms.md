# Medicare Fitness Benefit Gyms — Review (v2: lobby + deep re-research + tiers)

This supersedes the original single-page, single-tier build. Three changes shipped
in this pass: (A) the Fitness category became a routing lobby, (B) the gym roster
grew from ~10 to 79 via a systematic multi-agent research sweep, (C) every gym is
now sorted into one of three honest confidence tiers instead of one mixed list.

## Phase A — Fitness lobby

`/category/pickleball-fitness` (`components/FitnessLobby.tsx`, wired into
`app/category/[category]/page.tsx`) is now a 4-card router, not a listing grid:

- 💪 **Medicare Fitness Benefit Gyms** — live count (`79+ gyms`, computed from
  `TOTAL_GYM_COUNT`) → `/guides/medicare-fitness-gyms`. Live.
- 🏓 **Indoor Pickleball & Courts** — Coming soon, no link.
- 🧘 **Gentle Yoga & Tai Chi** — Coming soon, no link.
- 🏊 **Water Aerobics & Senior Swim** — Coming soon, no link.

The 7 listings previously shown flat on this page (Des Plaines Prairie Lakes
Fitness, Elmhurst YMCA, McGaw YMCA, North Suburban YMCA, Vernon Hills Pickleball,
West Cook YMCA, Wheaton Pickleball) are not stranded: Wheaton Pickleball and Des
Plaines Prairie Lakes Fitness are now Tier 1 gym entries (the latter newly found
in this pass, cross-linked via `existingListingSlug`); all 7 remain individually
indexed, in the sitemap, and reachable via `/directory?category=pickleball-fitness`
(verified: returns "7 results").

## Phase B — Research method

Four parallel research agents ran the sweep: one per county cluster (Cook; DuPage
+ Lake; Will + Kane + McHenry) plus one dedicated to chain-level sourcing across
the whole metro (LA Fitness, Planet Fitness, XSport, CFX/Charter Fitness, Anytime
Fitness, Esporta, YMCA). Three of the four failed or stalled on the first attempt
(API error / 600s stall with no output) and were resumed via a follow-up message;
all four ultimately completed.

**Major finding from the chain-sourcing agent:** XSport Fitness and Esporta
Fitness no longer exist as independent brands in Chicagoland. Fitness
International (LA Fitness's parent) acquired XSport in July 2024 and Esporta in
April 2025, rebranding both to LA Fitness. Several former XSport addresses closed
outright afterward (e.g. 5515 W Irving Park Rd, Portage Park). Surviving
former-XSport/Esporta addresses are folded into the LA Fitness Tier 2 entry;
closed ones are excluded.

**Second major finding:** Planet Fitness has no national SilverSneakers
agreement — multiple independent sources agree on this. Any Chicago-area Planet
Fitness accepting SilverSneakers is an individual franchise decision, not a chain
policy. Planet Fitness addresses are therefore in Tier 3 (reported, unconfirmed),
not treated as a Tier 2 broad participant, correcting the framing from the first
build of this guide.

## Phase C — Tier definitions & final counts

| Tier | Meaning | Count |
|---|---|---|
| 1 — Verified | Confirmed on the gym's own site, an official finder, or a dedicated news article specifically about that location | **21 gyms** |
| 2 — High confidence | A chain documentably participates broadly (sourced), real addresses, not individually verified | **37 locations across 4 chains** |
| 3 — Reported, unconfirmed | Named on a third-party roundup with a real address, nothing else confirms it | **21 gyms** |
| **Total** (`TOTAL_GYM_COUNT`) | | **79** |

By county (`countyCounts()`): Cook 55, DuPage 13, Will 4, Kane 4, Lake 2, McHenry
1, Kendall 0. Spoke totals: Cook County spoke 55, DuPage County spoke 13, Other
Areas spoke (Lake + Will + Kane + McHenry + Kendall) 11. These numbers come
directly from the data file (`lib/medicareGyms.ts`), not hand-typed — the code is
the source of truth if this file and the live page ever drift.

### Tier 1 — Verified (21), by county

**Cook (8):** Crestwood Recreation & Wellness Center (SS+RA, warm pool),
Lemont Park District — The CORE (SS, sourced via a dedicated Patch article since
the district's own site blocked fetches), Chicago Ridge Park District (SS), Oak
Lawn Racquet/Fitness/Gymnastics Center (**SS+RA+Silver&Fit — all three**, the
strongest single source found), Des Plaines Prairie Lakes Community Center
(SS+RA, cross-linked to an existing listing), La Grange Fitness/Park District of
La Grange (SS+RA, search-cache sourced — recommend a live-page check), Bernard
Horwich JCC (SS via J-Fit pass), Bernard Weinger JCC Northbrook (SS, weakest
source — 2012 corroboration, flagged to re-verify).

**DuPage (6):** 4500 Fitness/Downers Grove Park District (SS+RA), Woodridge Park
District ARC (SS+RA), Ackerman Sports & Fitness Center/Glen Ellyn Park District
(SS, cache-sourced), Oak Brook Park District Family Recreation Center (SS+RA,
excludes the Tennis Center), Fort Hill Activity Center/Naperville Park District
(SS), Wheaton Park District Central Athletic Complex (SS, pre-existing).

**Will (3):** Dellwood Park Community Center/Golden Age Club (SS, pre-existing),
Bolingbrook Park District Lifestyles Fitness Center (SS+RA, independently
corroborated by two separate research agents), Prairie Fit Fitness
Center/Plainfield Park District (SS).

**Kane (3):** Fox Valley Park District/Prisco Community Center (SS+RA,
pre-existing), Dundee Township Park District — Rakow Center & Randall Oaks
(SS+RA, dual-location with a warm pool — comparable to the Crestwood benchmark),
Golden Corridor Family YMCA — Taylor Branch, Elgin (SS).

**Lake (1):** Lake Forest Fitness Center (SS+RA).

**McHenry / Kendall (0):** No Tier 1 match found in either county despite a
targeted sweep (Crystal Lake, Woodstock, Algonquin, Cary, Huntley all checked) —
reported honestly as thin rather than padded.

### Tier 2 — High confidence (4 chains, 37 locations)

- **LA Fitness** — SilverSneakers only (own class-locator page); Renew Active/
  Silver&Fit are aggregator-only claims, not chain-confirmed. 15 addresses across
  Cook, DuPage, Kane. Includes several former XSport/Esporta addresses now
  operating as LA Fitness.
- **CFX (Charter Fitness)** — SilverSneakers + Renew Active + Silver&Fit, the
  strongest all-three-programs chain source (cfxfit.com/insurance-memberships/,
  page blocked direct fetch so sourced from its own indexed content). 15
  addresses across Cook, DuPage, Will, Lake.
- **Anytime Fitness** — SilverSneakers only, sourced from a 2012 Healthways
  partnership announcement reaffirmed on the chain's own social channels, with an
  explicit franchise-variability caveat (100% franchised model). 6 addresses
  across Cook, DuPage. One previously-known address (Arlington Heights) dropped
  as closed.
- **VASA Fitness** — SilverSneakers + Silver&Fit, sourced from the chain's own
  insurance page. 1 address (Crystal Lake, McHenry — the only McHenry entry on
  the whole page).

### Tier 3 — Reported, unconfirmed (21)

Mostly Planet Fitness (12 addresses — deliberately here and not Tier 2, see
above), plus Blink Fitness (2), Fitness 19, Retro Fitness Irving Park, Gottlieb
Health & Fitness Center, Lawndale Christian Fitness Center, Hyde Park JCC, Pilsen
Fitness, and Pav YMCA (an independent Berwyn-Cicero YMCA association, distinct
from YMCA of Metro Chicago). All Cook County. Source: a single third-party
SilverSneakers-location roundup (medicareplanfinder.com). This section is a
to-do list by design — entries graduate to Tier 1 as they're individually
confirmed, or get dropped if a check turns up negative.

## Dropped entirely (no tier)

- **Edward-Elmhurst Health & Fitness** (Woodridge, DuPage) — real, operating
  medically-based fitness center; no source at all confirms any program
  acceptance. Listing it anywhere would be a guess.
- **XSport Fitness, Esporta Fitness** — brands defunct in this market (see Phase
  B); not listed as chains. Surviving addresses live under LA Fitness instead.
- **YMCA of Metro Chicago and most independent associations** (McCormick, Lake
  View, South Side YMCA, Fox Valley Family YMCA) — real facilities, but no
  source confirms current program acceptance, and the sector has documented
  2025–2026 SilverSneakers-contract volatility (BCBS Minnesota dropping YMCA of
  the North, effective Jan 1, 2026). Surfaced as an explicit trust-building
  callout on both the hub and spoke pages instead of guessing either way. (Pav
  YMCA, a distinct independent association, is the one exception — it's Tier 3
  via the third-party roundup.)

## Phase D — Structure & SEO

- Hub: `/guides/medicare-fitness-gyms` — 3-program explainer, tier explainer,
  YMCA volatility callout, county cards with live counts → spokes, cross-links to
  Day Trips and the Fitness lobby.
- Spokes: `/gyms/cook-county` (55: Verified 8, High confidence 26, Reported 21),
  `/gyms/dupage-county` (13: Verified 6, High confidence 7), `/gyms/other-areas`
  (11: Verified 7, High confidence 4 — Lake, Will, Kane, McHenry, Kendall
  combined; none individually crosses the ~8-gym threshold). Cook and DuPage both
  earned their own spoke this pass — DuPage crossed 8 gyms once Phase B research
  landed (it didn't in the original single-page build).
- BreadcrumbList JSON-LD on hub and spokes; `ExerciseGym`-typed LocalBusiness
  JSON-LD on every Tier 1 gym only (Tier 2/3 entries don't get LocalBusiness
  markup — their data isn't individually verified enough to assert as fact to
  search engines).
- `app/sitemap.ts` updated with the 3 new `/gyms/[spoke]` routes.
- `lib/categoryGuideMap.ts` unchanged from the prior build (`pickleball-fitness`
  → `medicare-fitness-gyms`) — still correct since the lobby still exit-ramps
  into this guide.

## Build verification

- `npx tsc --noEmit`: clean. `npm run lint`: 0 errors (pre-existing
  `react/no-danger` warning pattern only, same as every other page in the repo).
  `npm run build`: succeeds, generates all 3 `/gyms/[spoke]` static paths plus the
  static `/guides/medicare-fitness-gyms` override.
- Verified against `next start`: lobby renders 4 cards with the correct live gym
  count; hub renders with correct county-card counts (Cook 55, DuPage 13, Other
  Areas 11 — matching the spoke pages exactly); each spoke page's Tier
  1/2/3 section counts match the underlying data (Cook: Verified 8, High
  confidence 26, Reported 21; DuPage: Verified 6, High confidence 7; Other Areas:
  Verified 7, High confidence 4); `/directory?category=pickleball-fitness` still
  returns all 7 original listings, confirming no orphans.

## Honest gaps / what to verify next

- Several Tier 1 sources were confirmed via search-engine-cached snippets rather
  than a direct successful fetch (site blocked automated access): Ackerman
  Sports & Fitness Center, La Grange Fitness, Bolingbrook Lifestyles Fitness
  Center, Prairie Fit Fitness Center, Bernard Horwich/Weinger JCC, CFX's
  insurance-memberships page. Each has a `verifyNotes` entry in the data file
  flagging this — worth a live re-check pass.
- McHenry and Kendall counties remain thin (0 Tier 1 gyms in McHenry, 1 Tier 2
  location; 0 in Kendall entirely) despite a dedicated research pass — this
  reflects genuinely sparse public sourcing in those counties, not a shortcut.
- Tier 3's 22 entries are the priority to-do list for the next research pass —
  each needs a call or a direct site visit to graduate to Tier 1 or get dropped.
- LA Fitness's own store locator blocked automated access, so its 15-address
  Tier 2 list is a verified partial sample of a larger real footprint, not
  exhaustive — noted on the page itself via `closedLocationsNote`.
