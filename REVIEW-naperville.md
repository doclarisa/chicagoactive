# Naperville wave — review checklist

Context: Naperville had 1 pre-existing listing (Naperville Park District
Active Adults) but no `/city/naperville` hub page. This wave adds 1
verified venue, clearing the bar, and adds Naperville to `lib/cities.ts`
for the first time.

## New listings added (1)

### 1. Naperville Public Library — Senior Tech Club
- **sourceUrl:** https://www.naperville-lib.org/185/Book-Clubs
- Senior Tech Club (cloud storage to AI), adult book clubs (Criminal Spines, Great Decisions, Readers' Rendezvous), lecture series — confirmed via consistent search-result summaries of the library's own pages across its three branches.
- **Verify:** nothing flagged beyond the usual search-summary caveat; no direct fetch of the library's own page succeeded, but multiple independent sources agree.

## Dropped this wave

- **Naperville Senior Center** (napervilleseniorcenter.com) — deliberately excluded. Direct fetch confirmed this is a **paid adult day-care and memory-care program** ($155/day, 7:30am-5:30pm, RN-supervised, minimum 2 days/week commitment), not a free/low-cost drop-in activity center. Same out-of-scope reasoning as Young 60 Plus Club (Matteson, wave-8) and Cantata Adult Life Services (Brookfield, wave-5).

## How to review (should take ~5 min)

1. Open the `sourceUrl` above and re-check facts.
2. Visit https://www.chicagoactiveseniors.com/city/naperville after deploy to confirm both listings render correctly.
