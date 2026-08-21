# Calumet City wave — review checklist

Context: Calumet City had 1 pre-existing listing (Thornton Township Senior
Services / Calumet City Senior Center) but no `/city/calumet-city` hub
page. This wave adds 1 verified-but-thin venue, clearing the bar, and adds
Calumet City to `lib/cities.ts` for the first time. This is the last
commit in `multi-area-wave-9`, so it also carries the CITIES entries for
all 3 areas built this wave.

## New listings added (1)

### 1. Calumet Memorial Park District — Senior Programs
- **sourceUrl:** https://www.mycmpd.com/
- **This is the thinnest-sourced listing in the wave — read the qualityNote before trusting it as fully verified.** Confirmed: this is a real, separate organization from Thornton Township (different address, different phone, own REC1 registration catalog with a "Senior Programs" section and "Senior Fitness" search results). Not confirmed: specific class names, days/times, or costs — every fetch of the district's own program pages returned only navigation, not content.
- **Verify:** call 708-868-2530 or check the REC1 catalog directly before publishing any specific class claims beyond "the district runs senior/fitness programming."

## Dropped this wave (see main session report for full reasoning)

- **Elmwood Park** — the only lead (Josie's Room / Josette LaFrambois Senior Center) is ambiguously the same Village senior division as the pre-existing "Elmwood Park Village Senior's Club" listing; couldn't confirm genuine distinctness.
- **Hickory Hills** — its library district (Green Hills Public Library) already exists in the DB under Palos Hills; its only other lead matched the pre-existing Senior Taskforce listing exactly.

## How to review (should take ~10 min — this wave needs more scrutiny than usual)

1. Open the `sourceUrl` above; if possible, call to confirm actual senior program specifics before treating this listing as fully settled.
2. Visit https://www.chicagoactiveseniors.com/city/calumet-city after deploy to confirm both listings render correctly.
