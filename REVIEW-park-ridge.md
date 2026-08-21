# Park Ridge wave — review checklist

Context: Park Ridge already had a live `/city/park-ridge` page with 2 listings
(Maine Township MaineStreamers, Park District Active Adult Activities). This
wave adds 3 more verified venues to the existing page.

## New listings added (3)

### 1. Park Ridge Public Library — Adult Services
- **sourceUrl:** https://www.parkridgelibrary.org/adults/
- Doorstep Delivery (home delivery), book clubs, a writers group, and Museum Pass access — confirmed on the official adults page.
- **Verify:** the page referenced art lectures, music, cooking demos, and senior outreach in earlier search summaries, but I could not confirm those specifics directly on the page itself, so the listing only includes what I actually verified (Doorstep Delivery, book clubs, writers group, museum passes).

### 2. Park Ridge History Center
- **sourceUrl:** https://www.parkridgehistorycenter.org/visit-us/
- Run by the Park Ridge Historical Society out of the 1908 Solomon Cottage in Prospect Park. Hours (2nd & 4th Saturdays, 11am-1pm, April-November) came from a search summary that quoted the page directly; my own attempt to fetch the Visit Us page directly returned truncated/unusable content, so I could not personally re-confirm it word for word.
- **Verify:** general-admission cost specifically — search results showed a mix of "$10/adult for guests" language that reads as event-specific pricing, not a clear everyday admission fee, so `registration` is marked "Verify — see official site" rather than asserting a number.

### 3. Center of Concern (Des Plaines, IL — not Park Ridge)
- **sourceUrl:** https://centerofconcern.org/about-us/
- A well-documented nonprofit serving Maine Township (which includes Park Ridge, Des Plaines, Niles, Glenview, Morton Grove, and Rosemont) — case management, telephone reassurance, Senior Companion Program, Memory Café, grocery delivery, chore help, SHIP counseling — all confirmed on the official About Us page.
- True Des Plaines address used, `citySlug: "des-plaines"` (Des Plaines is not in `CITIES`, so this surfaces via `/directory` and its own page rather than a dedicated hub — same treatment as North Suburban YMCA and North Shore Senior Center in earlier waves).
- **Verify:** program-specific eligibility (income limits, etc.) — not detailed on the About page, marked "Verify — see official site."

## Considered and dropped

- **A Park Ridge-based YMCA** — no dedicated YMCA branch found in Park Ridge itself; general search results pointed to the same North Suburban YMCA (Northbrook) and YMCA of Metro Chicago programs already covered elsewhere, with no Park Ridge-specific location confirmed. Not duplicated here.

## Other changes

- `lib/cities.ts` — extended Park Ridge's existing intro with a second sentence naming the Library and History Center. (Center of Concern, being outside Park Ridge, isn't named in the intro — same convention as other "nearby" venues in prior waves.) This is bundled with the Niles and Wilmette `CITIES` additions in one commit at the end of this branch.

## How to review (should take ~10 min)

1. Open each `sourceUrl` above and re-check facts, especially History Center's hours (I could not personally re-verify the exact hours text) and general-admission cost.
2. Visit https://www.chicagoactiveseniors.com/city/park-ridge after deploy to confirm all 5 listings render correctly.
