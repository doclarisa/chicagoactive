# Elmhurst wave — review checklist

Context: Elmhurst had 1 pre-existing listing (Elmhurst Park District Senior
Program) but no `/city/elmhurst` hub page. This wave adds 2 verified
venues, clearing the bar, and adds Elmhurst to `lib/cities.ts` for the
first time.

## New listings added (2)

### 1. Elmhurst YMCA — Senior Programs
- **sourceUrl:** https://www.ymcachicago.org/elmhurst/
- Chair Yoga and other senior-focused fitness classes — confirmed via two independent search-result summaries with consistent address/phone.
- **Verify:** ymcachicago.org and ymca.org both blocked automated verification (403) on every attempt. Class schedule/membership costs flagged "Verify — see official site."

### 2. Elmhurst Public Library — Senior Services
- **sourceUrl:** https://www.elmhurstpubliclibrary.org/
- Fetched directly and confirmed: Homebound Delivery, Caregiver's Corner collection, technology-learning help.
- **Verify:** specific class names/schedules for Technology Learning weren't itemized on the fetched homepage — kept the description to what was directly confirmed.

## How to review (should take ~10 min)

1. Open both `sourceUrl`s above and re-check facts (especially #1, which the fetch tool couldn't reach).
2. Visit https://www.chicagoactiveseniors.com/city/elmhurst after deploy to confirm all 3 listings render correctly.
