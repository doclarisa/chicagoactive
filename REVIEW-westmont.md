# Westmont wave — review checklist

Context: Westmont had 1 pre-existing listing (Westmont Park District
Senior Programs) but no `/city/westmont` hub page. This wave adds 1
verified venue, clearing the bar, and adds Westmont to `lib/cities.ts` for
the first time.

## New listings added (1)

### 1. Westmont Public Library — Senior Services
- **sourceUrl:** https://westmontlibrary.org/services/
- Monthly homebound delivery, monthly dementia-friendly presentations (confirmed via two separate Village of Westmont news posts, spring and summer series), large-print books, vision-impaired computer equipment — confirmed via consistent search-result summaries.
- **Verify:** westmontlibrary.org blocked automated verification (403) on every attempt. Exact schedule for the dementia-friendly series wasn't confirmed beyond "monthly."

## Dropped this wave

- **Burr Ridge** — no genuinely distinct second venue found. The Village's own senior page is pure referral, pointing to DuPage Township (Bolingbrook, already a built hub) and Downers Grove Township (Downers Grove, already a built hub) — re-adding either here would duplicate an existing listing under a different city. Its library service is split between Hinsdale Public Library (already used as Hinsdale's own listing) and Indian Prairie Library District — no Burr-Ridge-native option found.
- **Lockport** — no genuinely distinct second venue found. Lockport Township's senior page is mostly a referral list (Meals on Wheels, transportation, housing links) plus one seasonal LIHEAP meeting (3rd Friday, Oct-May) and monthly outreach hours held at a different city's library branch (Crest Hill, not Lockport). White Oak Library's own Lockport branch page had no confirmable senior-specific programming beyond a generic Adult Services contact.

## How to review (should take ~5 min)

1. Open the `sourceUrl` above and re-check facts (the fetch tool couldn't reach it).
2. Visit https://www.chicagoactiveseniors.com/city/westmont after deploy to confirm both listings render correctly.
