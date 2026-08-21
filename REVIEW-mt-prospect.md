# Mount Prospect wave — review checklist

Context: Mount Prospect had 1 pre-existing listing (Mt. Prospect Park District
Senior Programming) but no `/city/mt-prospect` hub page. This wave adds 3
verified venues, clearing the bar, and adds Mount Prospect to `lib/cities.ts`
for the first time.

## New listings added (3)

### 1. Mount Prospect Public Library — Adult Services
- **sourceUrl:** https://mppl.org/web-resources/community/
- Tech/computer classes, book discussions, homebound delivery, Museum Adventure Pass, Explore More Illinois — confirmed directly.
- **Verify:** nothing flagged.

### 2. Village of Mount Prospect — Senior Services
- **sourceUrl:** https://www.mountprospect.org/departments/human-services/senior-citizen-programming
- **Verify:** mountprospect.org blocked every WebFetch attempt (403, likely bot protection — same issue hit on Niles' historical society site last wave). The description (Senior Hub, Fit 4 Life seated exercise, Senior Game Day, free home-safety assessments) is built from search-result text that reads as genuine quoted page content, but I could not personally re-confirm it on the live page myself. `registration` is marked "Verify — see official site" for the current schedule. Worth a direct check before treating this as fully confirmed.

### 3. Mount Prospect Historical Society — Dietrich Friedrichs House Museum
- **sourceUrl:** https://www.mtphist.org/tour-appointment-calendar/
- Free Wednesday hourly tours (10am-2pm, booking required) and 2nd-Sunday open house (11:30am-1:30pm, no appointment) — confirmed directly, including the $5 suggested donation and ADA-accessible Education Center.
- **Verify:** nothing flagged.

## How to review (should take ~10 min)

1. Open each `sourceUrl` above and re-check facts, especially #2 (Village Senior Services — I could not fetch this page myself).
2. Try fetching mountprospect.org yourself; if you get through, confirm the Senior Hub/Fit 4 Life/Senior Game Day details and current schedule.
3. Visit https://www.chicagoactiveseniors.com/city/mt-prospect after deploy to confirm all 4 listings render correctly.
