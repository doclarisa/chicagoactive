# Niles wave — review checklist

Context: Niles already had 1 live listing (Niles Senior Center) but no `/city/niles`
hub page — it fell under Stage 2 Wave 1's "2+ own listings" bar and stayed
filter-only on `/directory`. This wave adds 2 more verified venues, clearing
that bar, so `/city/niles` is now a real page (added to `lib/cities.ts`'s
`CITIES` array in this same wave — see the multi-area-wave summary for that
diff).

## New listings added (2)

### 1. Niles-Maine District Library — Adult Services
- **sourceUrl:** https://www.nileslibrary.org/services/services-for/adults
- Book discussions, tech classes, maker workshops, Chair Yoga for Adults, homebound delivery, and Museum Adventure Pass access — all confirmed on the official adults page.
- **Verify:** nothing flagged.
- **Note:** the page does not name any age-specific (55+/60+) programming — described honestly as general adult services plus homebound delivery, not oversold as senior-specific.

### 2. Niles Historical and Cultural Center
- **sourceUrl:** https://www.vniles.com/891/Historical-Society
- **Verify:** the Historical Society's own dedicated site (nileshistoricalandculturalcenter.org) blocked my fetch attempts (403 on every page I tried — likely bot protection). I could only confirm the organization's existence, name, and address via the Village of Niles' official directory page, which is what I used as `sourceUrl`. Free admission and specific hours (multiple independent secondary sources cite "Mon/Wed/Fri/Sat 11am-3pm") were **not** directly verified by me and are marked "Verify — see official site" in the listing rather than asserted. Worth a phone call or a retry once the site is reachable.

## Considered and dropped

- **Niles Park District** — no dedicated senior/55+ program found; their programs navigation has no senior category (unlike Skokie/Oak Park/Evanston, Niles centralizes senior programming through the Village's own Senior Center rather than the Park District).
- **Niles Family Fitness Center / "Exercise Classes" page** — this turned out to be the same Niles Senior Center's own fitness offerings (1000 Civic Center Drive, right next to the existing listing's 999 Civic Center Drive address), not a separate venue. Adding it would have duplicated the existing "Niles Senior Center" listing.
- **North Suburban YMCA** — already added as a Skokie-wave "nearby" listing (Northbrook); did not duplicate here even though it's roughly similar distance from Niles, to avoid listing the same venue under two different areas' review files. It's a single DB row, reachable from `/directory` and any city page within its real radius.

## Other changes

- `lib/cities.ts` — added Niles to the `CITIES` array for the first time (previously missing entirely, so `/city/niles` would have 404'd despite having a listing). Intro names all 3 Niles-native venues (existing Niles Senior Center + these 2 new ones).

## How to review (should take ~10 min)

1. Open each `sourceUrl` above and re-check facts.
2. Try fetching nileshistoricalandculturalcenter.org yourself (browsers may get through where automated fetches were blocked) and confirm hours/admission; update the listing if you get through.
3. Visit https://www.chicagoactiveseniors.com/city/niles after deploy to confirm all 3 listings render correctly.
