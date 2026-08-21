# Homewood wave — review checklist

Context: Homewood had 1 pre-existing listing (Adult & Senior VIP Programs —
Homewood-Flossmoor Park District) but no `/city/homewood` hub page. This wave
adds 2 verified venues, clearing the bar, and adds Homewood to
`lib/cities.ts` for the first time. This is the last commit in
`multi-area-wave-5`, so it also carries the CITIES entries for all 5 areas
covered this wave.

## New listings added (2)

### 1. Homewood Public Library — Adults & Seniors
- **sourceUrl:** https://www.homewoodlibrary.org/age-groups/adults-seniors/
- Home delivery, senior discounts info, laptop lending, Northstar Digital Literacy classes — confirmed directly. Genealogy/mahjong/crafting groups were referenced in the site's navigation and confirmed via a secondary search rather than the specific page content shown, so kept general in the description rather than asserting specific current offerings.
- **Verify:** nothing else flagged.

### 2. Village of Homewood — Senior Services
- **sourceUrl:** https://www.village.homewood.il.us/community/senior-resources
- **Verify:** village.homewood.il.us blocked the WebFetch attempt (403). The description (service coordinators, care coordinators, Senior Advisory Committee) is built from a search-result summary that reads as genuine page content, but I could not personally re-confirm it live. Address/phone/hours came from a separate, successfully-fetched Village Hall listing page, not the Senior Services page itself — worth confirming these apply to Senior Services specifically.

## Other changes (this commit)

- `lib/cities.ts` — this is the last commit in `multi-area-wave-5`, so it carries new CITIES entries for all 5 areas: **Tinley Park, Palos Heights, Riverside, Brookfield, and Homewood** — all five were missing from the index despite having listings.

## How to review (should take ~10 min)

1. Open each `sourceUrl` above and re-check facts, especially #2 (Village Senior Services — I could not fetch this page myself, and address/hours were sourced from a related but different page).
2. Visit https://www.chicagoactiveseniors.com/city/homewood after deploy to confirm all 3 listings render correctly.
