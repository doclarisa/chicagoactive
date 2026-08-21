# River Forest wave — review checklist

Context: River Forest had 1 pre-existing listing (River Forest Public Library
Adults & Seniors Programs) but no `/city/river-forest` hub page. This wave
adds 2 verified venues, clearing the bar, and adds River Forest to
`lib/cities.ts` for the first time.

## New listings added (2)

### 1. River Forest Park District — Adult Variety Programs
- **sourceUrl:** https://rfparks.com/adult-variety
- Bridge (3 levels), Improv for Adults, Basic Photography for DSLR Cameras — confirmed directly.
- **Verify:** exact costs and current schedule aren't published on the program page — noted in `registration`.

### 2. Trailside Museum of Natural History
- **sourceUrl:** https://fpdcc.com/places/locations/trailside-museum-natural-history/
- Free, run by the Forest Preserves of Cook County — live native animals, Thatcher Woods trails, accessibility details (all-terrain wheelchairs) — all confirmed directly on the Forest Preserves' own page.
- **Verify:** nothing flagged.

## Considered and dropped

- **"Oak Park River Forest Township Senior Services"** — turned up in research (Zumba Gold, Tai Chi, Line Dancing classes) via riverforesttownship.org, but its own page attributes the classes to "Oak Park River Forest Township Senior Services" specifically, not "River Forest Township" alone. Given the DB already has an "Oak Park Township Senior Services" listing under a distinctly different name, I couldn't confirm whether this is the same organization under a fuller name or a genuinely separate joint program — rather than risk creating another duplicate (see the North Shore Senior Center fix earlier in this branch), I left it out. Worth a careful look in a future pass to resolve which it is.

## How to review (should take ~10 min)

1. Open each `sourceUrl` above and re-check facts.
2. If you can clarify whether "Oak Park River Forest Township Senior Services" is the same org as the existing "Oak Park Township Senior Services" listing or a separate one, that'll unblock adding it properly.
3. Visit https://www.chicagoactiveseniors.com/city/river-forest after deploy to confirm all 3 listings render correctly.
