# Vernon Hills wave — review checklist

Context: Vernon Hills had 1 pre-existing listing (Vernon Hills Park
District Pickleball) but no `/city/vernon-hills` hub page. This wave adds
1 verified venue, clearing the bar, and adds Vernon Hills to
`lib/cities.ts` for the first time. This is the last commit in
`multi-area-wave-11`, so it also carries the CITIES entries for all 5
areas built this wave.

## New listings added (1)

### 1. Cook Memorial Public Library — Aspen Drive Library
- **sourceUrl:** https://www.cooklib.org/about/who-we-are/locations-hours/
- Aspen Drive Library is a physically separate branch (701 Aspen Dr, Vernon Hills) from the Cook Park Library branch added this same wave for Libertyville (413 N Milwaukee Ave, Libertyville) — same library district, two distinct buildings/addresses in two different cities. Flagged clearly on both entries via `qualityNote` to avoid reading as an accidental duplicate.
- **Verify:** nothing else flagged.

## Dropped this wave

- **Vernon Township Senior Services** — researched as a strong Vernon Hills candidate (SHIP counseling, Benefits Check Up, Medicare Plan Finder, SNAP/medical assistance), but its true address is **3050 N Main Street, Buffalo Grove, IL** — not Vernon Hills. Per the site's "true address" convention, this org's listing belongs to Buffalo Grove's own bar-clearing, not Vernon Hills'. Not added this wave; worth reconsidering for a future Buffalo Grove wave.

## How to review (should take ~5 min)

1. Open the `sourceUrl` above and re-check facts.
2. Visit https://www.chicagoactiveseniors.com/city/vernon-hills after deploy to confirm both listings render correctly.
