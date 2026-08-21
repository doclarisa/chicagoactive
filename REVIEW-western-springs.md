# Western Springs wave — review checklist

Context: Western Springs already had a live listing (Western Springs Senior
Center) but no `/city/western-springs` hub page. This wave adds 2 verified
venues, clearing the bar, and adds Western Springs to `lib/cities.ts` for the
first time.

## New listings added (2)

### 1. Thomas Ford Memorial Library
- **sourceUrl:** https://www.fordlibrary.org/
- Mah Jongg meetups, Western Springs Writers' Society, book clubs, museum passes, and a Village-partnered Social Worker at the Library — confirmed directly.
- **Verify:** nothing else flagged.

### 2. Water Tower Museum (Western Springs Historical Society)
- **sourceUrl:** https://westernspringshistory.org/visit/tower-museum/
- Free, Saturdays 10am-noon, three floors of local history plus a Children's Museum — confirmed directly.
- **Verify:** nothing flagged.

## Caught before it happened

- **Nearly duplicated "Western Springs Senior Center"** — initial research turned up rich detail on a Village-run senior center (mahjong, scrabble, canasta, Tai Chi) that looked like a strong new candidate. A name-collision precheck against the whole DB caught that it **already exists** as a listing (added in an earlier wave), so it was not re-added. This is exactly the check introduced after the North Shore Senior Center duplicate a few waves back — it worked as intended here.

## How to review (should take ~5 min)

1. Open each `sourceUrl` above and re-check facts.
2. Visit https://www.chicagoactiveseniors.com/city/western-springs after deploy to confirm all 3 listings render correctly (and only 3 — no duplicate senior center card).
