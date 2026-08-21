# Orland Park wave — review checklist

Context: Orland Park had 1 pre-existing listing (Orland Township Senior
Services) but no `/city/orland-park` hub page. This wave adds 1 verified
venue, clearing the bar, and adds Orland Park to `lib/cities.ts` for the
first time.

## New listings added (1)

### 1. Orland Park Public Library — Seniors and Home Delivery Services
- **sourceUrl:** https://www.orlandparklibrary.org/seniors-and-home-delivery-services/
- Memory Café (with Pathlight Senior Services), Dementia Caregiver Support Group, book clubs, technology classes, and Home Delivery for homebound cardholders.
- **Verify:** orlandparklibrary.org blocked automated verification (403 on every WebFetch attempt). Content is sourced from consistent search-result summaries of the library's own program pages, not a direct fetch — flagged via `qualityNote`.

## How to review (should take ~5 min)

1. Open the `sourceUrl` above and re-check facts directly in a browser (the fetch tool couldn't reach it, but a human browser likely can).
2. Visit https://www.chicagoactiveseniors.com/city/orland-park after deploy to confirm both listings render correctly.
