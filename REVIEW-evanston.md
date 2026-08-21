# Evanston wave — review checklist

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
- **sourceUrl:** https://www.nssc.org/respite-for-the-caregiver
- This is a Northfield-based nonprofit, ~4.6 miles from Evanston's listing centroid, so it surfaces on `/city/evanston` under "Nearby" rather than as an Evanston-native listing (`citySlug: "northfield"` — honest per the site's no-fabricated-city rule).
- **Verify:** Their own site confirms Evanston residents are eligible for caregiver/respite services specifically. I did NOT find first-party confirmation that *all* NSSC programs (classes, fitness, lifelong learning) are open to Evanston residents — eligibility is noted as varying by program in the listing copy, and `ageEligibility`/`registration` are marked "Verify — see official site." Worth a call to confirm the general-program eligibility before promoting this copy further.

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
