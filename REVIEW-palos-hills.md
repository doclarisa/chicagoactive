# Palos Hills wave — review checklist

Context: Palos Hills had 1 pre-existing listing (39ers Club & Horizons Club at
Palos Hills Community Center) but no `/city/palos-hills` hub page. This wave
adds 2 verified venues, clearing the bar, and adds Palos Hills to
`lib/cities.ts` for the first time.

## New listings added (2)

### 1. Green Hills Public Library District — Adult Services
- **sourceUrl:** https://www.greenhillslibrary.org/adult-services/
- Doorside Delivery, Career Online High School, Book Match service, digital local-history archive — confirmed directly.
- **Verify:** nothing flagged.

### 2. Palos Historical Society (Palos Park, IL — not Palos Hills)
- **sourceUrl:** https://www.palospark.org/281/Palos-Historical-Society
- Free, founded 1957, by-appointment access only — confirmed directly. True Palos Park address used (`citySlug: "palos-park"`, not fabricated as Palos Hills).
- **Note:** the geocoded coordinates for this address matched a POI labeled "Palos Park Public Library" rather than a distinct "Palos Historical Society" point — likely because the Society's stated address is on or very near the library building. The address itself is exactly what the Society's own official page states, so I used it as given rather than guessing at a different location.
- **Verify:** an earlier search summary claimed different hours (Tuesdays 9am-1pm) than the official page I actually fetched (by appointment only) — used the directly-fetched version.

## How to review (should take ~10 min)

1. Open each `sourceUrl` above and re-check facts.
2. Visit https://www.chicagoactiveseniors.com/city/palos-hills after deploy to confirm all 3 listings render correctly.
