# La Grange Park wave — review checklist

Context: La Grange Park had 1 pre-existing listing (Prime Time Club & Pinochle
Club 55+, Community Park District) but no `/city/la-grange-park` hub page.
This wave adds 3 verified venues, clearing the bar, and adds La Grange Park to
`lib/cities.ts` for the first time. This is the last commit in
`multi-area-wave-6`, so it also carries the CITIES entries for all 4 areas
covered this wave.

## New listings added (3)

### 1. La Grange Park Public Library — Adult Services
- **sourceUrl:** https://www.lplibrary.org/adults/
- Book clubs, Mango Languages, Library of Things, 17-museum pass program — confirmed directly. Writing groups and Community Assisted Rides mentioned in earlier search results weren't confirmed on the fetched page, so left out.
- **Verify:** nothing else flagged.

### 2. Proviso Township — Senior Services (Hillside, IL — not La Grange Park)
- **sourceUrl:** https://www.provisotownship.gov/senior-services
- Free Senior Ride Program, congregate meals ($3), Meals on Wheels, Community Assisted Rides, Handyman Service ($5/visit) — confirmed directly. True Hillside address used (`citySlug: "hillside"`), since Proviso Township's office is physically in Hillside, not La Grange Park.
- **Verify:** the address only geocoded to a general road, not a rooftop-precise match — marked `geoPrecision: "approximate"`.

### 3. La Grange Area Historical Society (Vial House Museum) (La Grange, IL — not La Grange Park)
- **sourceUrl:** https://lagrangehistory.org/about-us/
- **Verify:** lagrangehistory.org returned truncated content on every fetch attempt, so hours/admission/accessibility are sourced from a search-result summary rather than a page I could personally read in full. True La Grange address used (`citySlug: "la-grange"`) — La Grange and La Grange Park are two separate, adjacent Illinois municipalities, and this venue is confirmed to be in the former, not the latter.

## Considered and dropped

- **Olympia Fields** — originally part of this batch of 5, but after checking the Village's own site and general searches, no second verifiable Olympia-Fields-specific venue turned up beyond the existing Park District listing (the town's library service comes from Park Forest, already represented there). Rather than force a weak or duplicate addition, Olympia Fields stays at 1 listing and remains in the backlog for a future pass — genuinely thin, not a shortcut.

## Other changes (this commit)

- `lib/cities.ts` — this is the last commit in `multi-area-wave-6`, so it carries new CITIES entries for the 4 areas that actually cleared the bar this wave: **Flossmoor, Palos Hills, Evergreen Park, and La Grange Park**.

## How to review (should take ~10 min)

1. Open each `sourceUrl` above and re-check facts, especially #3 (I could not fully read this page myself).
2. Visit https://www.chicagoactiveseniors.com/city/la-grange-park after deploy to confirm all 4 listings render correctly.
