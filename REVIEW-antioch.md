# Antioch wave — review checklist

Context: Antioch had 1 pre-existing listing (Antioch Township Senior
Services) but no `/city/antioch` hub page. This wave adds 2 verified venues,
clearing the bar, and adds Antioch to `lib/cities.ts` for the first time.

## New listings added (2)

### 1. Lakes Region Historical Society — Schoolhouse Museum
- **sourceUrl:** https://antiochhistory.org/
- 1892 schoolhouse, free local history covering Antioch and the Chain O'Lakes area. Open Sat 11am-3pm, April-November. Fetched directly, no access issues.
- **Verify:** admission cost not stated — likely free/donation-based, unconfirmed.

### 2. Antioch Public Library District — Fireside Fridays
- **sourceUrl:** https://apld.info/newsletter/newsletter-text-only/
- Free monthly drop-in social (coffee, pastries, open conversation with the library's Executive Director), first Friday of the month, 10-11am.
- **Verify — sourcing caveat:** apld.info blocked every direct fetch attempt (403) on the root page, calendar, adult-programs page, and this newsletter page. This listing is sourced entirely from a search-engine-cached snippet of the exact URL, not a direct read. Worth confirming the page loads normally in a browser before treating specifics as settled. Not senior-specific — open to all ages, included as a low-key social format well-suited to older adults, same as other general-audience library programs already on the site.

## Flag for a future dedicated check (not resolved this wave)

The research agent surfaced a possible **address discrepancy on the existing
listing**: "Antioch Township Senior Services" is in the DB at 1275 Main
Street, but multiple sources (a Village of Antioch press release and several
third-party listings) describe the "Antioch Senior Center" / "Dolly Spiering
Community Center" as being at 817 Holbek Drive, with the Village's own Parks
Dept. running non-senior programming from that same building while the
Township runs the senior programming. This may be the same facility under two
address references, or a genuine data issue — didn't touch the existing row
without a dedicated verification pass. Worth checking directly before the
next wave that touches Antioch.

## How to review

1. Open each sourceUrl above and re-check facts.
2. Visit https://www.chicagoactiveseniors.com/city/antioch after deploy to confirm all 3 listings render correctly.
