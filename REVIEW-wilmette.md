# Wilmette wave — review checklist

Context: Wilmette already had 1 live listing (Mallinckrodt Community Center)
but no `/city/wilmette` hub page — same situation as Niles, below Stage 2
Wave 1's "2+ own listings" bar. This wave adds 3 more verified venues,
clearing that bar (CITIES entry added in the same lib/cities.ts commit that
covers Niles and Park Ridge — see the multi-area-wave summary).

## New listings added (3)

### 1. Wilmette Public Library — Accessibility & Home Delivery Services
- **sourceUrl:** https://www.wilmettelibrary.info/services/accessibility
- Home delivery for homebound patrons, large-print collection, ScanEZ magnification station, hearing loop in the auditorium, loanable wheelchairs/walkers, Library of Things (magnifiers, light-therapy lamps), and a connection to the free statewide Illinois Talking Book Program — all confirmed on the official accessibility page.
- **Verify:** nothing flagged.
- **Framing note:** the library's general "Let's Learn Together" adult-programs page didn't name any dedicated older-adult programming when I checked it, and a specific "Introduction to eBooks for Older Adults" result I found was a one-off dated event listing, not an evergreen program — per the evergreen-only rule, I didn't cite that. This listing is built entirely around the accessibility/home-delivery infrastructure instead, which is confirmed and ongoing.

### 2. Wilmette History Museum
- **sourceUrl:** https://wilmettehistory.org/visit-us/
- Free admission, Mon-Thu + Sun 1-4:30pm (closed Fri-Sat), wheelchair accessible with a transporter wheelchair on request, free parking — all confirmed directly.
- **Verify:** nothing flagged.

### 3. Wilmette Police Senior Call-In Program
- **sourceUrl:** https://www.wilmette.gov/341/Senior-Services
- A free daily wellness check-in program for independent seniors (call 6-10am; officer follow-up if you don't call in), confirmed on the official page.
- **Verify:** the page itself notes the police station is at a **temporary** address (3220 Big Tree Lane) during what looks like a relocation/construction period. Rather than publish an address likely to go stale, I marked `address` as "Verify — see official site" instead of asserting the temporary one. Worth updating once the department is back at its permanent home.

## Other changes

- `lib/cities.ts` — added Wilmette to the `CITIES` array for the first time. Intro names all 4 Wilmette-native venues (existing Mallinckrodt + these 3 new ones).

## How to review (should take ~10 min)

1. Open each `sourceUrl` above and re-check facts.
2. Visit https://www.chicagoactiveseniors.com/city/wilmette after deploy to confirm all 4 listings render correctly.
3. Check whether the police department has moved back to a permanent address, and update the Call-In Program listing if so.
