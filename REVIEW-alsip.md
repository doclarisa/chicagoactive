# Alsip — wave-16 review

Existing listing: Worth Township Senior Center (already in DB, unchanged).

## New listings

### Alsip Park District — Alsip Senior Club
- Source: https://www.alsipparks.org/mc-events/the-alsip-senior-club-5/
- Fetched directly. 2nd/4th Monday, noon-3pm, bingo and socializing at the Apollo Recreation Center.
- No fee listed for the Club itself. The Park District's wider Adult/Senior Programs section links to a downloadable brochure that wasn't accessible — not used, flagged via `qualityNote`.
- Address confirmed via Nominatim: exact house-level match, 12521 S. Kostner Ave, Alsip.

### Alsip-Merrionette Park Public Library District — Adult Services
- Source: https://alsipmerrionetteparklibrary.info/adults/adult-programs (address confirmed via https://alsipmerrionetteparklibrary.info/about-us)
- Fetched directly. Dated/rotating sessions rather than a fixed weekly slate: AARP Smart Driver course ($20/$25), SilverSneakers-certified Fall Chair Yoga, AgeOptions benefits enrollment (SNAP/Medicaid/Medicare Savings Program/Extra Help).
- Only `yoga` tagged from ACTIVITIES vocabulary — driver-safety and benefits-enrollment content doesn't map to an existing activity tag, left untagged for those rather than force-fit.
- Address confirmed via Nominatim: resolved to the library's own building.

## Dropped
- YMCA: a phone number for "YMCA Alsip" surfaced only on a third-party aggregator (city-data.com); ymcachicago.org blocked fetch and no official page could confirm a branch physically in Alsip. Not used.
