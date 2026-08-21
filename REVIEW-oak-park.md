# Oak Park wave — review checklist

Context: Oak Park already had a live `/city/oak-park` page with 3 listings
(Park District of Oak Park Lifelong Learning, Senior Citizens' Center of Oak
Park and River Forest, Oak Park Township Senior Services). This wave adds 4
new venues to the existing `Listing` model — same process as Evanston, same
architecture, no new routes/models. Entries were added directly to
`prisma/seed.ts` this time (not a separate one-off script) so seed and
production stay in sync going forward.

## New listings added (4)

### 1. Oak Park Public Library — Older Adults Services
- **sourceUrl:** https://www.oppl.org/use-your-library/older-adults/
- Weekly Zoom Chair Yoga, home delivery for 60+/limited-mobility cardholders, one-on-one tech help (Learning Lab), named Older Adult Services Librarian — all confirmed on the official page.
- **Verify:** nothing flagged — this source was unusually complete.

### 2. Oak Park Conservatory
- **sourceUrl:** https://oakparkconservatory.org/admission/
- Free admission (Park District of Oak Park), $5 suggested donation, Tue-Sun 10am-4pm — confirmed.
- **Taxonomy note:** filed under `museum-senior-days` as the closest "attraction you visit" bucket, even though it's not senior-discount-specific (same tension we just resolved for Block Museum in Evanston, in the opposite direction — there was nowhere better to put it). Flagging for your next taxonomy pass; a broader "attractions" category might fit both this and OPRF Museum better than either `museum-senior-days` or `arts-culture`.

### 3. Oak Park River Forest Museum
- **sourceUrl:** https://oprfmuseum.org/plan-your-visit
- $5 resident / $7 non-resident / $3 student admission, Wed-Sat 1-5pm, Mon-Tue by appointment — confirmed.
- **Taxonomy note:** same as above — filed under `museum-senior-days` despite no confirmed senior-specific rate; it's a genuine museum, just not one with an age discount.
- **Verify:** accessibility info not found on the fetched page.

### 4. West Cook YMCA — Healthy Aging Program
- **sourceUrl:** https://www.westcookymca.org/programs/fitness/healthy-aging-programs
- Confirmed: dedicated 62+ program (unlike McGaw's broken equivalent page, this one loaded real content), group fitness, free chronic-disease-prevention programs, UnitedHealthcare/AARP discounted memberships.
- **Verify:** facility hours — a third-party aggregator (Yelp) listed specific hours, but I couldn't confirm them on westcookymca.org directly, so I left `hours` blank rather than cite an unverified source. Worth adding once confirmed. Membership cost itself also isn't published.

## Dropped from this wave (not added)

- **Frank Lloyd Wright Home & Studio** — official site (flwright.org) shows $24-38 tickets with no age-based discount ("all guests, regardless of age, must have a ticket"), contradicting third-party aggregator claims of a senior rate. Also doesn't fit the site's free/low-cost mission at that price point.

## Other changes

- `lib/cities.ts` — extended the Oak Park intro with a second sentence covering all 4 new venues.
- `prisma/seed.ts` — entries added directly this time, with explicit `city`/`citySlug`/`lastVerified` (matching the pattern established during the Evanston reconciliation pass).

## How to review (should take ~15 min)

1. Open each `sourceUrl` above and re-check facts against the live page.
2. Confirm West Cook YMCA's hours directly and add them if you have them.
3. Decide on the two taxonomy notes (Oak Park Conservatory / OPRF Museum category fit) — same open question as Evanston's Block Museum/Art Center, now doubled. Might be worth a single pass to design a proper "attractions" vs. "senior-discount days" split across both cities' worth of entries.
4. Visit https://www.chicagoactiveseniors.com/city/oak-park after deploy to confirm all 7 listings render correctly on mobile.
