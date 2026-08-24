# Hazel Crest — wave-17 review

Existing listing: Village of Hazel Crest Senior Center (already in DB, unchanged).

## New listings

### Hazel Crest Park District — Seniors (60+) Program & Fitness Center
- Source: https://hazelcrest.recdesk.com/
- Partial fetch verification — address (2600 171st Street), phone (708-335-1500), and email confirmed directly. The registration system is JS-rendered, so specific program names/schedules/prices didn't load via fetch; existence of a "Seniors (60+)" category and a "Senior Monthly Fitness" membership product is confirmed via the district's own indexed listing titles, not a direct read of specifics.
- Genuinely distinct government body and building from the Village Senior Center.
- Note: initial search results associated "Bid Whist / Keno / Chess" with this Park District listing, but those activities were confirmed via fetch to belong to the existing Village Senior Center (villageofhazelcrest.org), not the Park District — not attributed to this new listing.

### South Suburban Genealogical & Historical Society
- Source: https://ssghs.org/contact/
- Fetched directly — address, hours, fee structure, and program list all confirmed.
- Shares a street address (3000 W. 170th Pl.) with the existing Village Senior Center listing — co-located in the same building/complex, but a distinct, independent nonprofit with its own hours and mission. Flagged via qualityNote so it doesn't read as a duplicate.
- Not age-restricted (open to the public), but historical/genealogical societies are already in-scope per this directory's established categories (arts-culture).

## Considered, not included

### Grande Prairie Public Library — Adult Services
- Fetched directly — address, hours, and services confirmed. Only "Book-A-Librarian" (standing one-on-one appointment for research/tech help) is a recurring service; visible senior-labeled programming ("Senior Alert: Avoiding Online Scams") is a one-off event. General-audience, not age-restricted. Weaker than the other two finds — left out to avoid padding.

## Dropped
- Bremen Township Senior Services (15350 S. Oak Park Ave, Oak Forest) and Rich Township Senior Center (297 Liberty Dr, Park Forest): both already in the DB under their true-address cities — confirmed before researching further, not re-added.
- South Suburban College: true address is South Holland, and no ongoing senior-specific programming was found on its own site regardless.
- YMCA: no branch located in or near Hazel Crest (nearest is West Cook YMCA in Oak Park — too far to treat as a Hazel Crest listing).
- Illinois Black History Museum: describes itself as a "mobile organization" with no physical address or senior-discount info on its own site — too unverifiable to list.
