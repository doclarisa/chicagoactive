# Northbrook wave — review checklist

Context: Northbrook had 2 pre-existing listings (North Suburban YMCA — Active
Older Adults, Northbrook Park District Senior Center) but no `/city/northbrook`
hub page — the same silent-404 gap found repeatedly in earlier waves. This
wave adds 2 verified venues, clearing the bar, and adds Northbrook to
`lib/cities.ts` for the first time.

## New listings added (2)

### 1. Northbrook Public Library — Adult Services
- **sourceUrl:** https://northbrook.info/visit/events/adults2
- Dedicated Senior Services and Outreach librarian, tech help, home delivery, Museum Adventure Pass — confirmed directly, including address and phone.
- **Verify:** nothing flagged.

### 2. Northbrook Historical Society Museum
- **sourceUrl:** https://www.northbrookhistory.org/hours-and-location/
- Free, housed in the "Northfield Inn" building, 1st Sunday of the month 2-4pm plus by appointment — confirmed directly.
- **Caught and corrected an address conflict:** an initial search summary conflated this museum's address with a separate "Hope-Union Heritage Center Archives" location (1812 Chapel Court). The official page clearly separates the two — the museum itself is at 1776 Walters Avenue, which is what's used here.

## How to review (should take ~10 min)

1. Open each `sourceUrl` above and re-check facts.
2. Visit https://www.chicagoactiveseniors.com/city/northbrook after deploy to confirm all 4 listings render correctly.
