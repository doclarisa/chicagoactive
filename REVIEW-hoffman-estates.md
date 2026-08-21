# Hoffman Estates wave — review checklist

Context: Hoffman Estates had 1 pre-existing listing (Schaumburg Township
Disability & Senior Services) but no `/city/hoffman-estates` hub page. This
wave adds 3 verified venues, clearing the bar, and adds Hoffman Estates to
`lib/cities.ts` for the first time.

## New listings added (3)

### 1. Hoffman Estates Park District — 50+ Active Adults Center
- **sourceUrl:** https://www.heparks.org/programs-sports/50-active-adults/senior-center/
- **Verify:** heparks.org blocked my direct fetch attempt (403). The description (daily hot lunch, bingo, cards, Wii bowling, walking club, ceramics/crochet, ~$5/month membership, Triphahn Center address) is built from search-result text that reads as genuine quoted page content, but I could not personally re-confirm it live. `registration` is marked "Verify — see official site" for the current schedule/exact fees. Worth a direct check.

### 2. Palatine Library District — North Hoffman Branch
- **sourceUrl:** https://www.palatinelibrary.org/visit-branches
- A real, separate branch location of the Palatine Library District (already added as its own Palatine-native listing earlier in this wave) physically inside Hoffman Estates. Address confirmed via geocoding match on the exact building.
- **Verify:** branch-specific hours weren't confirmed — the general district's Adult Services programming (confirmed under the Palatine listing) is described as accessible from this branch, but I didn't assert specific North Hoffman hours I hadn't verified.

### 3. Salvation Army Central Territory Museum
- **sourceUrl:** https://sacentralmuseum.org/visit/
- Free, open to the public (confirmed: "open to Salvation Army members, researchers and the public"), Mon-Fri 9am-3pm, guided tours by appointment — confirmed directly.
- **Verify:** nothing flagged.

## Existing listing note (not changed)

- **Schaumburg Township Disability & Senior Services** (pre-existing, `citySlug: "hoffman-estates"`) — while researching this area, I noticed the org's own eligibility language reads as scoped to "Schaumburg Township residents" without explicitly naming Hoffman Estates, even though Schaumburg Township does geographically include part of Hoffman Estates. I didn't touch this pre-existing listing (out of scope for this wave — only adding new venues), but flagging the ambiguity here in case it's worth a closer look.

## How to review (should take ~10 min)

1. Open each `sourceUrl` above and re-check facts, especially #1 (Park District — I could not fetch this page myself).
2. Visit https://www.chicagoactiveseniors.com/city/hoffman-estates after deploy to confirm all 4 listings render correctly.
