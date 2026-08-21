# Evanston wave — review checklist

**Update (follow-up pass):** three fixes applied after the initial wave, all live:
1. Added a new `arts-culture` category (`lib/categories.ts`, `lib/categoryStyles.ts`, new indigo color token) and re-filed Block Museum of Art and Evanston Art Center under it — `museum-senior-days` now holds only real senior-discount museum listings (Cantigny, Chicago Botanic Garden, Adler, Art Institute, Brookfield Zoo).
2. Fixed a real bug: Evanston Art Center's and McGaw YMCA's `activities` field had been written as a JSON string instead of a native array, which silently excluded both from their `/activities/[slug]` tag pages (`Array.isArray()` was false). Both now appear correctly on `/activities/art-classes-for-seniors` and `/activities/pickleball-for-seniors`.
3. Reconciled `prisma/seed.ts` with the live production DB — it was missing 160 of 198 live listings (drift that predates this wave, not something the Evanston work caused). All 198 are now in seed.ts with their real production field values, including the 4 Evanston venues. `scripts/add-evanston-wave.ts` was deleted since its data is now captured in seed.ts. One pre-existing loose end found during reconciliation, not fixed: `chicago-regional-senior-centers` still exists in seed.ts (referenced by `CITY_OVERRIDES`) but has no matching live DB row — unrelated to this wave, flagging for awareness.

**Correction (2026-08-24):** the original Evanston wave created a duplicate — "North Shore Senior Center" already existed in the DB from the original Stage 1 seed (slug `north-shore-senior-center`) under a name I didn't check for before creating a second row (`north-shore-senior-center-northfield`). Found and merged into the original during a later wave; the duplicate slug is deleted. If anything elsewhere references `north-shore-senior-center-northfield`, it's gone — the canonical slug is `north-shore-senior-center`.

Context: Evanston already had a live `/city/evanston` page (Stage 2 Wave 1) with
3 listings. Rather than building a separate `/areas/evanston` section on a new
data model (as the original task doc proposed), this wave adds 4 new venues to
the **existing** `Listing` model/city-page system, per your go-ahead in this
session. No new routes, models, or migrations — same architecture as every
other city.

## New listings added (4)

### 1. Block Museum of Art
- **sourceUrl:** https://www.blockmuseum.northwestern.edu/visit/
- Free admission + free parking, hours, address, phone all directly confirmed on that page.
- **Verify:** `accessibility` field — the site references Northwestern's general accessibility page but I didn't pull specifics; confirm and fill in.
- **Taxonomy note:** filed under category `museum-senior-days` (closest existing bucket — it's not a senior-specific discount day, just free for everyone). No better category exists in `lib/categories.ts`.

### 2. Evanston Art Center
- **sourceUrl:** https://www.evanstonartcenter.org/school/dept/adult-classes-department
- 7 adult class departments, financial aid/payment plans, address confirmed.
- **Verify:** exact class tuition (not published in one place — noted as "Verify — see official site" in the `registration` field), `hours`, `phone`, `accessibility` — none were on the fetched page.
- **Taxonomy note:** same category (`museum-senior-days`) used as the closest fit — Evanston Art Center isn't a museum, and there's no "arts/culture classes" category yet. Flagging in case you'd rather add one.

### 3. McGaw YMCA
- **sourceUrl:** https://www.mcgawymca.org/programs/sports/pickleball/
- Pickleball (6 indoor courts, weekday/evening/weekend open-play windows), members-only, confirmed.
- **Verify:** Their own "Active Older Adults" program page (mcgawymca.org/programs/fitness/aoa/) is currently broken/empty on their site — I could not confirm what that program actually includes, so `ageEligibility` and general `hours` are marked "Verify — see official site." Worth a follow-up once their page is fixed, or a phone call.
- Membership cost itself also isn't published — flagged as `cost: PAID` with no dollar figure.

### 4. North Shore Senior Center (Northfield, IL — not Evanston)
- **sourceUrl:** https://www.nssc.org/lifelong-learning-programs/membership/ (updated 2026-08-21 — was previously the narrower caregiver/respite page)
- This is a Northfield-based nonprofit, ~4.6 miles from Evanston's listing centroid, so it surfaces on `/city/evanston` under "Nearby" rather than as an Evanston-native listing (`citySlug: "northfield"` — honest per the site's no-fabricated-city rule).
- **Resolved:** the original listing hedged on eligibility ("varies by program, Verify — see official site"). Re-checked directly on NSSC's own membership page, which states plainly: "There are no age or residency requirements to become a member. All are welcome!" — $90/year individual, $170/year couple. Description and `ageEligibility`/`registration` fields updated accordingly; no longer needs verification.
- **Bug fixed:** `activities` had the same string-not-array bug as McGaw/Evanston Art Center below, missed in the first fix pass. Now corrected.

## Dropped from this wave (not added)

- **Fleetwood-Jourdain Community Center** — its own official page (cityofevanston.org) has no distinct senior programming; it explicitly refers seniors to Levy Senior Center, which is already a listing. Adding it would have been a duplicate.
- **"City of Evanston Parks & Rec 55+ programming"** as its own listing — Levy Senior Center already *is* that program; no separate offering found.

## Other changes

- `lib/cities.ts` — extended the Evanston intro with a second sentence covering the 4 new venues (Evanston Art Center, Block Museum, McGaw YMCA). Original sentence (Levy/Library/Ridgeville) untouched.
- `prisma/seed.ts` — **not** updated. It was already out of sync with production (Levy Senior Center and Ridgeville Park District are live in the DB but aren't in seed.ts either), so I followed the existing precedent rather than partially fixing drift that predates this wave. Flagging in case you want a follow-up task to reconcile seed.ts with the live DB.
- `scripts/add-evanston-wave.ts` — the one-off script used to upsert these 4 rows (same pattern as `scripts/check-db-tmp.ts`). Left in the repo, untracked-by-convention but not gitignored — your call whether to commit it or delete it.

## How to review (should take ~15 min)

1. Open each `sourceUrl` above and re-check the facts in that listing's description against the live page.
2. For each "Verify — see official site" flag, either fill in the real value or leave it (it already reads honestly as unconfirmed).
3. Decide on the two taxonomy notes (Block Museum / Evanston Art Center category fit) — keep as-is, or ask for a new `arts-culture` category.
4. Visit https://www.chicagoactiveseniors.com/city/evanston after deploy to confirm all 7 listings render correctly on mobile.
