# Berwyn wave — review checklist

Context: Berwyn already had a live `/city/berwyn` page with 2 listings
(Berwyn Park District Active Adult Programs, Club 55 at North Berwyn Park
District). This wave adds 2 more verified venues to the existing page.

## New listings added (2)

### 1. Berwyn Public Library — Senior Services
- **sourceUrl:** https://berwynlibrary.org/
- Free weekly Senior Yoga (60+), tablet lending (60+, 3-week loan), Home Delivery (no age restriction) — all individually confirmed via specific library pages (Senior Yoga event page, Home Delivery page), but the library's dedicated `/seniors/` summary page 404'd for me directly, so `sourceUrl` points at the homepage rather than that page.
- **Verify:** nothing else flagged.

### 2. Berwyn Historical Society Museum
- **sourceUrl:** https://berwynhistoricalsociety.org/museum/
- Free admission confirmed directly. **Caught a conflict:** an initial search summary said the museum was open "Saturday and Sunday 9am-1pm," but the official page I actually fetched says "First Saturday of every month, 10am-2pm." Went with the directly-fetched page rather than the search summary.

## How to review (should take ~10 min)

1. Open each `sourceUrl` above and re-check facts, especially the Historical Society Museum's hours (two different hours claims existed; I used the one I fetched myself).
2. Visit https://www.chicagoactiveseniors.com/city/berwyn after deploy to confirm all 4 listings render correctly.
