# Brookfield wave — review checklist

Context: Brookfield had 1 pre-existing listing (Brookfield Zoo Chicago —
Senior Admission & Free Days) but no `/city/brookfield` hub page. This wave
adds 1 verified venue, clearing the bar, and adds Brookfield to
`lib/cities.ts` for the first time.

## New listings added (1)

### 1. Linda Sokol Francis Brookfield Library — Services for Seniors
- **sourceUrl:** https://www.lsfbrookfieldlibrary.org/seniors
- **Verify:** lsfbrookfieldlibrary.org blocked the WebFetch attempt (403). The description (senior fitness classes, Medicare/health workshops, AgeOptions grant funding, home delivery) is built from a search-result summary that reads as genuine page content, but I could not personally re-confirm it live. Worth a direct check.

## Considered and dropped

- **"Riverside Township Senior Services"** as a separate Brookfield listing — this appears to be the same organization already covering Riverside (and by extension Brookfield, per its own service-area description) under the existing "Riverside Township Senior Citizens Society" listing. Not duplicated here, per the same discipline used for the River Forest/Oak Park Township situation last wave.
- **Cantata Adult Life Services** — a senior living community (independent/assisted living, skilled rehab) rather than a program or activity for the site's audience of independent active adults 55+ — out of scope for this directory.

## How to review (should take ~5 min)

1. Open the `sourceUrl` above and re-check facts — I could not fetch this page myself.
2. Visit https://www.chicagoactiveseniors.com/city/brookfield after deploy to confirm both listings render correctly.
