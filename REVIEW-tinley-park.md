# Tinley Park wave — review checklist

Context: Tinley Park had 1 pre-existing listing (STARS Senior Drop-In Center)
but no `/city/tinley-park` hub page. This wave adds 2 verified venues,
clearing the bar, and adds Tinley Park to `lib/cities.ts` for the first time.

## New listings added (2)

### 1. Tinley Park Public Library — Dementia-Friendly & Adult Services
- **sourceUrl:** https://www.tplibrary.org/services/dementia-friendly/
- Monthly Memory Café, Memory Care Collection, Alzheimer's Association-partnered workshops, AgeOptions grant funding, Stitch Club Project — all confirmed directly.
- **Verify:** nothing flagged.

### 2. Tinley Park Historical Society
- **sourceUrl:** https://tinleyparkhistoricalsociety.org/
- **Verify:** tinleyparkhistoricalsociety.org blocked every WebFetch attempt (403) across multiple page paths. Hours (Wed 10am-2pm, 1st Sunday 1-3pm, 2nd Thursday 6-8pm, plus farmers-market-season Saturdays) came from a search summary that quoted the page's own text consistently across multiple independent search results, giving reasonable confidence, but I could not personally re-confirm it live. Admission cost wasn't explicitly stated anywhere I found — used `FREE`, consistent with how every other small local historical society in this project has turned out, but that's an inference, not a confirmed fact.

## How to review (should take ~10 min)

1. Open each `sourceUrl` above and re-check facts, especially the Historical Society (I could not fetch this page myself).
2. Visit https://www.chicagoactiveseniors.com/city/tinley-park after deploy to confirm all 3 listings render correctly.
