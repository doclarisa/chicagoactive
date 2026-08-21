# Des Plaines wave — review checklist

Context: Des Plaines had 2 pre-existing listings (Center of Concern, GENCenter)
but no `/city/des-plaines` hub page — same silent-404 gap as Niles/Wilmette/
Rolling Meadows/etc. in earlier waves. This wave adds 3 verified venues,
clearing the bar further, and adds Des Plaines to `lib/cities.ts` for the
first time (that change lands in the last commit of this branch, alongside
the other 4 cities' intro updates).

## New listings added (3)

### 1. Des Plaines Public Library — Adult Services
- **sourceUrl:** https://www.dppl.org/about/departments
- Readers' Services (books, e-readers, tablet lending), Reference Services (tech classes, research help), Outreach Delivery — confirmed directly.
- **Verify:** nothing flagged.

### 2. Des Plaines History Center
- **sourceUrl:** https://www.desplaineshistory.org/visit
- Free Visitor & Education Center, $5 guided Kinder House Museum tours by appointment — confirmed directly, including the accessibility caveat (Kinder House itself has stairs, not wheelchair-accessible).
- **Caught a conflict:** an initial search summary gave different hours than the page I actually fetched (e.g. claimed Tuesday 12-8pm, Saturday closed). Went with what I personally verified on the official page (Mon-Fri 10am-4pm, 2nd Sunday 10am-2pm) rather than the unconfirmed search summary.

### 3. Des Plaines Park District — Prairie Lakes Fitness
- **sourceUrl:** https://www.dpparks.org/memberships-personal-training/
- Free walking-track access for residents 55+ with a membership card, confirmed directly, including general fitness membership pricing.
- **Verify:** nothing flagged.

## How to review (should take ~10 min)

1. Open each `sourceUrl` above and re-check facts.
2. Visit https://www.chicagoactiveseniors.com/city/des-plaines after deploy to confirm all 5 listings render correctly.
