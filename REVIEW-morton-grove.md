# Morton Grove wave — review checklist

Context: Morton Grove had 1 pre-existing listing (Morton Grove Senior Center
— Family and Senior Services) but no `/city/morton-grove` hub page. This
wave adds 1 verified venue, clearing the bar, and adds Morton Grove to
`lib/cities.ts` for the first time. This is the last commit in
`multi-area-wave-7`, so it also carries the CITIES entries for all 5 areas
covered this wave.

## New listings added (1)

### 1. Morton Grove Public Library — Adult Services
- **sourceUrl:** https://www.mgpl.org/
- Homebound delivery, Healthy Living programs, career resources, museum passes, Crafting for Charity, book discussions — confirmed directly.
- **Verify:** nothing flagged. A Park District senior-specific page was searched for but not confirmable with enough detail to include (only a general "senior membership rate" mention turned up) — not added, rather than assert thin/unconfirmed content.

## Other changes (this commit)

- `lib/cities.ts` — this is the last commit in `multi-area-wave-7`, so it carries new CITIES entries for all 5 areas: **Hillside, La Grange, Western Springs, Palos Park, and Morton Grove**.

## How to review (should take ~5 min)

1. Open the `sourceUrl` above and re-check facts.
2. Visit https://www.chicagoactiveseniors.com/city/morton-grove after deploy to confirm both listings render correctly.
