# Skokie wave — review checklist

Context: Skokie already had a live `/city/skokie` page with 2 listings (Skokie
Park District Active Adults, Skokie Public Library Adult Learners). Same
process and architecture as Evanston/Oak Park — `Listing` model, no new
routes/models. Entries added directly to `prisma/seed.ts` (learned from the
Evanston drift — seed and production stay in sync from the start).

**Addendum (multi-area-wave pass):** added a 5th Skokie-native listing, Skokie
Heritage Museum & Historic Log Cabin (see below) — found while re-checking
Skokie against the 8-12 target from a later task doc. Total Skokie-native
listings now 7 (2 original + 5 from this wave).

## New listings added (5 in Skokie + 1 nearby)

### 0. Skokie Heritage Museum & Historic Log Cabin
- **sourceUrl:** https://www.skokieparks.org/skokie-heritage-museum/
- Free admission, run by Skokie Park District/Skokie Historical Society — 1887 firehouse with fire-history exhibit, c. 1847 log cabin by appointment, community garden. Address, hours, and accessibility details all confirmed directly on the official page.
- **Verify:** nothing flagged.
- **Taxonomy:** filed under `arts-culture` per your instruction to use that category for museums/galleries (not `museum-senior-days`).

### 1. Oakton College Emeritus Program
- **sourceUrl:** https://www.oakton.edu/academics/continuing-education/emeritus-program.php
- Weekly lectures/courses for adults 55+, Skokie campus (7701 Lincoln Ave) confirmed on the official page.
- **Verify:** exact tuition — not published in one place, noted in `registration`.
- **Taxonomy note:** filed under `senior-center-events` — none of the 8 categories cleanly fit "community college continuing-ed lecture series"; this is the closest "55+ program" bucket. `operatorType: "community-college"` carries the real signal.

### 2. Village of Skokie — Senior and Disability Services
- **sourceUrl:** https://www.skokie.org/1544/Senior-and-Disability-Services
- Free AARP tax help, benefit access assistance, SHIP Medicare counseling, Senior Reassurance check-in calls, transportation services — all confirmed on the official page. Address matches Skokie Village Hall.
- **Verify:** nothing flagged — this source was complete.

### 3. Mather's — More Than a Café (Skokie)
- **sourceUrl:** https://www.mather.com/programs-old/skokie
- Weekday lunch for 60+, $3 suggested donation, drop-in, at the Ethical Humanist Society building — confirmed.
- **Verify:** the source page mentioned Mather closed neighborhood programs during COVID and promised reopening updates by email; I found no evidence on the page itself that this location is currently closed, and the page presents current-tense operating details, so I've treated it as active. Worth a phone call to confirm before publicizing further.

### 4. Devonshire Cultural Center
- **sourceUrl:** https://www.skokieparks.org/devonshire-cultural-center/
- Dance, culinary, fine arts, and theatre classes for adults, run by Skokie Park District — confirmed.
- **Note:** no senior-specific (55+/60+) programming is named on the official page — this is general adult programming, described that way rather than implying a senior discount that isn't there. Filed under the new `arts-culture` category, per your instruction.
- **Verify:** exact class tuition not published in one place.

### 5. North Suburban YMCA — Active Older Adults (Northbrook, IL — not Skokie)
- **sourceUrl:** https://www.nsymca.org/programs-classes/health-fitness/active-older-adults
- Genuinely well-documented Active Older Adults program (Chair Yoga, Balance for Walking, Enhance Your Fitness for arthritis, Parkinson's Exercise Plus, and more) — much more complete than McGaw's equivalent page was.
- True address used (2705 Techny Rd, Northbrook), `citySlug: "northbrook"` — no fabricated Skokie address.
- **Heads up:** I expected this to surface on `/city/skokie`'s "Nearby, within 6 miles" section, but the actual distance from Skokie's listing centroid comes out to roughly 7.9 miles — just outside the radius. It won't cross-link from the Skokie page, but it's still a real, correctly-tagged standalone listing reachable via `/directory` and its own page.

## Existing listings already covering Skokie (not touched)

- **Skokie Park District Active Adults** and **Skokie Public Library Adult Learners** — both already live, no changes made.
- **North Shore Senior Center** (Northfield) and **Niles Senior Center** (Niles) already surface on `/city/skokie` under "Nearby" via the existing radius mechanism — no new listing needed. On NSSC eligibility specifically: their own "Programs & Services" page doesn't name Skokie or Niles Township explicitly (it lists 4 townships + City of Evanston elsewhere on their site), so I did not add or imply a Skokie-specific eligibility claim beyond what's already in that listing's copy.

## Dropped from this wave (not added)

- **Illinois Holocaust Museum & Education Center** — its Skokie building is currently closed for renovations; the museum is only operating from a downtown Chicago location (360 N. State St.) right now. Listing it with a Skokie address would have been wrong, and the actual open location isn't in or near Skokie in the way "reachable in Skokie" implies. Worth revisiting once the Skokie building reopens.
- **North Shore Center for the Performing Arts** — a third-party search snippet claimed a senior ticket discount, but the venue's own FAQ page didn't confirm it (no senior pricing mentioned at all). Per the source-of-truth rule, dropped rather than published on an unconfirmed claim.

## Other changes

- `lib/cities.ts` — extended the Skokie intro with a second sentence naming the 4 Skokie-native additions (Oakton Emeritus, Mather's, Village of Skokie, Devonshire). North Suburban YMCA left out since it's not actually in Skokie.
- `/areas` needed no code change — it already renders dynamically off `lib/cities.ts`, and Skokie was already in that list.
- No new scripts left behind — entries went straight into `prisma/seed.ts`, matching the Oak Park pattern.

## How to review (should take ~15 min)

1. Open each `sourceUrl` above and re-check facts against the live page.
2. Call Mather's (847-644-6071) to confirm the Skokie café is still running before this gets more visibility.
3. Visit https://www.chicagoactiveseniors.com/city/skokie after deploy to confirm all 6 Skokie-native listings render correctly on mobile.
