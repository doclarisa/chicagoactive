# Itasca wave — review checklist

Context: Itasca had 1 pre-existing listing (Itasca Senior Club) but no
`/city/itasca` hub page. This wave adds 2 verified venues, clearing the bar,
and adds Itasca to `lib/cities.ts` for the first time.

## New listings added (2)

### 1. Itasca Community Library — Adult Services
- **sourceUrl:** https://www.itascalibrary.org/services/
- Crafters Anonymous (drop-in craft group), iPad Basics, an Illinois Chess Association-affiliated chess club, one-on-one research help, notary/passport services.
- **Verify:** exact current days/times for Crafters Anonymous, iPad Basics, and the chess club weren't confirmable on a live page during research (the adult-programs sub-page 404'd) — confirm via the library's events calendar. The library shares a municipal-complex address with Itasca Village Hall (confirmed via geocoding — same building, not an error).

### 2. Itasca Historical Depot Museum
- **sourceUrl:** https://www.itascaparkdistrict.com/171/Itasca-Historical-Depot-Museum
- Restored 1873 train depot + 1939 caboose, run by the Itasca Park District. Open Tue & Thu 10am-3pm year-round, plus seasonal hours April-October.
- **Verify:** admission cost not stated on the source page — likely free/nominal, unconfirmed. Address didn't geocode to a rooftop-precision POI — marked `geoPrecision: "approximate"`.

## Excluded

- **Addison Township — Senior Information / Senior Learning Series** — real, and Itasca residents are eligible, but its true physical address is **401 N. Addison Road, Addison, IL** — not Itasca. Per this site's true-address convention, this belongs on Addison's own page (already a built hub), not Itasca's. Also mostly a government tax-benefits office rather than a recreational program — the one recreational piece (occasional Senior Learning Series lectures) isn't a confirmed recurring schedule. Not added anywhere this wave; flagged as a possible future Addison enrichment lead.

## How to review

1. Open each sourceUrl above and re-check facts.
2. Visit https://www.chicagoactiveseniors.com/city/itasca after deploy to confirm all 3 listings render correctly.
