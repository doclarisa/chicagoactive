# Northfield wave — review checklist

Context: Northfield had a data problem, not just a coverage gap — see the
separate "Fix duplicate North Shore Senior Center" commit earlier in this
branch, which found and merged two duplicate listings for the same
organization before this wave started. After that fix, Northfield had 1
listing and no `/city/northfield` hub page. This wave adds 1 verified venue,
clearing the bar, and adds Northfield to `lib/cities.ts` for the first time.

## New listings added (1)

### 1. Winnetka-Northfield Public Library District — Northfield Branch
- **sourceUrl:** https://www.wnpld.org/events-partners
- Confirmed directly: a 17+ year partnership with North Shore Senior Center (facilitating book clubs there, donating books), plus Northfield branch address/hours.
- **Note:** the page didn't name senior-specific programming exclusive to the Northfield branch beyond the NSSC partnership — described honestly as general library service plus that specific confirmed partnership, not oversold as a dedicated senior program.
- **Verify:** nothing else flagged.

## Considered and dropped

- **Northfield Park District** — checked their site directly; no senior/55+/older-adult programming mentioned (general youth/family recreation only). Consistent with the note on their own government page that Northfield residents actually belong to one of three different park districts — Northfield, Winnetka, or Glenview — depending on address, so there's no single "Northfield Park District senior program" to point to.

## How to review (should take ~10 min)

1. Open the `sourceUrl` above and re-check facts.
2. Visit https://www.chicagoactiveseniors.com/city/northfield after deploy to confirm North Shore Senior Center now appears exactly once (not twice) and the new library listing renders correctly.
