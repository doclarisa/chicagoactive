# Norridge wave — review checklist

Context: Norridge had 1 pre-existing listing (Senior Programs — Norridge
Park District) but no `/city/norridge` hub page. This wave adds 1 verified
venue, clearing the bar, and adds Norridge to `lib/cities.ts` for the first
time. This is the last commit in `multi-area-wave-8`, so it also carries the
CITIES entries for all 4 areas built this wave.

## New listings added (1)

### 1. Seniors Assistance Center
- **sourceUrl:** https://www.agingcareconnections.org/sac-welcome/ (sac-il.org redirects here — SAC is "now part of Aging Care Connections")
- Fetched directly and confirmed: home-delivered and dine-in meals (Rocco Vino's, Harwood Heights), caregiver support groups, Memory Café sessions, enrichment activities for learning and fitness. Serves Norridge, Harwood Heights, and unincorporated Norwood Park Township.
- **Verify:** no pricing/cost info stated on the official page — `cost` set to LOW_COST as a reasonable default for a meals/services nonprofit, but flagged "Verify — costs/eligibility not stated" in `registration`.

## Dropped this wave

- **Matteson** — no second verifiable venue found, so it stays in the backlog (1 pre-existing listing, no `CITIES` entry). Checked: Village of Matteson's own senior resources page only lists referral links (AARP, senior living, Rich Township, Young 60 Plus Club), not a distinct Village-run program; Matteson Area Public Library's only senior-adjacent service (homebound delivery) is the same org as the existing listing; Matteson's Recreational Services Dept has no senior-specific programming confirmed. **Young 60 Plus Club** was considered and explicitly dropped — its own site titles it "Adult Day Services for Seniors," i.e. a paid adult day-care/supervision model, not a free/low-cost drop-in activity center, out of scope for this directory's mission (same reasoning as dropping Cantata Adult Life Services in wave-5). Rich Township Senior Center already exists in the DB under Park Forest and legitimately covers Matteson as a Rich Township municipality — not re-added to avoid a duplicate.

## How to review (should take ~5 min)

1. Open the `sourceUrl` above and re-check facts.
2. Visit https://www.chicagoactiveseniors.com/city/norridge after deploy to confirm both listings render correctly.
