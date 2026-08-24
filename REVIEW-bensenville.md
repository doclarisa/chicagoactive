# Bensenville — wave-17 review

Existing listing: Bensenville Heritage Center Senior Programs (already in DB, unchanged).

## New listings

### Bensenville Park District — Young at Heart
- Source: https://www.bvilleparks.org/programs/young-at-heart/
- bvilleparks.org returned 403 on every direct fetch attempt — program details (Oak Room drop-in fee $0.50-$1, trip pricing like Puttshack ~$65-70, Field of Dreams ~$45-50) come from search-indexed summaries, not a direct read. Flagged via qualityNote.
- One search snippet suggested "21 and older" eligibility, which reads as a likely scraping error — every comparable nearby park district program (Buffalo Grove's Club 50, Wood Dale's Senior Club, Addison's Active Adults & Senior Club 55+) is age-restricted to 50+/55+. Not stated as fact in the listing; flagged to call and confirm (630-766-5900) before treating as strictly senior-only.
- Genuinely distinct organization and building (Deer Grove Leisure Center) from the Village's Heritage Center program — no overlap concern.

### Bensenville Community Public Library — Adult & Senior Programs
- Source: https://www.bensenville.gov/1275/Programs — chosen over the library's own domain (benlib.org), which also returned 403 on every attempt, because the Village's own page (which fetched cleanly) lists these same programs under a "Library Programs" heading.
- WITS Workout is the clearly senior-targeted program; Movie Club and Technology Tuesdays read as general-audience, so the listing leads with WITS Workout and mentions the others as additional library programming rather than treating all three as age-restricted.
- Venue ambiguity: unclear whether WITS Workout is delivered at the library building or at the Heritage Center, since both appear on the same Village program page — flagged via qualityNote, not resolved.
- **Name-collision note:** "WITS Workout" already exists in the DB as a listing under East Hazel Crest (run by Thornton Public Library / East Hazel Crest Library District, 115 E. Margaret St, Thornton, IL). Confirmed via direct DB query these are two unrelated library districts ~30 miles apart independently running the same licensed national program — not a duplicate. Called out explicitly in both listings' qualityNote so it doesn't read as a copy-paste error.

## Considered, not included

### Community Dining Center at Castle Towers — DuPage Senior Citizens Council
- Search-only (dupageseniorcouncil.org also blocks fetch). A congregate lunch site inside a private independent-living apartment building (Castle Towers), operated by a countywide nonprofit, not Bensenville-specific. Unclear whether it's genuinely open to any Bensenville senior walking in vs. primarily serving building residents, and reads as a meals/nutrition service rather than an activity venue. Weakest of the leads found — left out.

## Dropped
- York Township Senior Center: true address is 1502 S. Meyers Road, Lombard, IL (fetch-confirmed) — already a built hub, belongs there not here.
- Addison Township senior services: true address 401 N. Addison Road, Addison, IL (fetch-confirmed); also not really "activities" — its senior programs are property-tax exemptions and financial assistance, out of directory scope regardless of city.
- "Bensenville Senior Citizens Club / Monty's" (703 S York Rd): turns out to be an occasional off-site venue the Heritage Center uses for its December luncheon (fetch-confirmed via bensenville.gov/838/Senior-Monthly-Luncheons), not an independent club — already covered by the existing Heritage Center listing.
