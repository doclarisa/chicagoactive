# Prospect Heights wave — review checklist

Context: Prospect Heights had 1 pre-existing listing (Active Adults —
Prospect Heights Park District) but no `/city/prospect-heights` hub page.
This wave adds 2 verified venues, clearing the bar, and adds Prospect
Heights to `lib/cities.ts` for the first time. This is the thinnest of the
5 areas in this wave — see below.

## New listings added (2)

### 1. Prospect Heights Public Library — Adult Services
- **sourceUrl:** https://www.phpl.info/services/adults
- Book clubs (Pages from the Past), tech classes via The Lab, homebound delivery, tax assistance, passport processing — confirmed directly.
- **Verify:** nothing flagged.

### 2. Wheeling Township — Senior and Disability Services (Arlington Heights, IL — not Prospect Heights)
- **sourceUrl:** https://www.prospect-heights.il.us/345/Senior-and-Disability-Services
- Confirmed directly, including an explicit statement that these services are administered by Wheeling Township, not the City of Prospect Heights itself. Medical Van, Dial-A-Bus, Meals on Wheels, free SHIP counseling, RTA fare help, driver safety courses, eligibility (60+ seniors, 18+ disability).
- True Arlington Heights address used (`citySlug: "arlington-heights"`, which already exists in `CITIES`) rather than a Prospect Heights address — this surfaces as a standalone listing / possible "Nearby" entry rather than a Prospect Heights-native one.

## Considered and dropped

- **A Prospect Heights-specific museum or free attraction** — none found. It's a small town without its own historical society or museum that I could verify; nearby options (Rolling Meadows, Mount Prospect, Wheeling) are covered as their own areas' listings rather than stretched to cover Prospect Heights too.
- **A Prospect Heights-specific YMCA** — no dedicated branch found in the city itself.

## Other notes

- Only 2 Prospect Heights-native listings total (Park District + Library) plus the Wheeling Township one tagged elsewhere — thinner than the other 4 areas in this wave. This reflects what I could actually verify, not a shortcut; a further pass specifically targeting Prospect Heights (e.g. confirming whether Wheeling Township's Village Green programs or a nearby park district serve the city) could turn up more later.

## How to review (should take ~10 min)

1. Open each `sourceUrl` above and re-check facts.
2. Visit https://www.chicagoactiveseniors.com/city/prospect-heights after deploy to confirm the 3 listings render correctly.
