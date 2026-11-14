// intro is a hand-written, category-level paragraph (same spirit as
// lib/cities.ts's per-city intro) -- real descriptions of what's actually
// in each category, not fabricated stats. The page itself appends the
// live, computed count/cost breakdown after this, so numbers never go
// stale here. day-trips-near-chicago permanently redirects to the Day
// Trips guide (see next.config.ts) and pickleball-fitness is a lobby/
// router page rather than a listing grid, so neither needs one.
export const CATEGORIES = [
  {
    slug: "park-district-55-programs",
    label: "Park District 55+ Programs",
    intro:
      "Illinois park districts run dedicated 55+ or \"active adult\" programming separate from their general recreation catalog — usually a named club or center with its own fitness classes, card groups, day trips, and a membership or punch-card system. Quality varies a lot by town: some run a single weekly coffee hour, others operate a full activity center with a woodshop and a travel program.",
  },
  {
    slug: "senior-center-events",
    label: "Senior Center Events",
    intro:
      "These are senior centers and township offices across Chicagoland running their own in-house calendar — card games, fitness classes, bingo, day trips, and the kind of low-key drop-in socializing that doesn't need a special occasion. Many are run by a township government rather than a park district, so eligibility and cost rules vary by municipality.",
  },
  {
    slug: "library-classes",
    label: "Library Classes",
    intro:
      "Public libraries turn out to be one of the densest sources of free senior programming in the region — tech help, chair yoga, book clubs, genealogy research, and the occasional surprise like a chess club or a D&D night. Most require nothing more than a library card, and many welcome non-residents too.",
  },
  {
    slug: "walking-hiking-groups",
    label: "Walking & Hiking Groups",
    intro:
      "Forest preserve districts, park districts, and a few independent clubs run organized walking and hiking groups at a range of paces — some are brisk fitness walks, others are slow nature rambles built around birdwatching or photography. Nearly all are free and don't require any fitness test to join.",
  },
  { slug: "pickleball-fitness", label: "Pickleball & Fitness" },
  {
    slug: "museum-senior-days",
    label: "Museum Senior Days",
    intro:
      "Most Chicagoland museums and attractions offer some kind of senior price break — a flat discount, a specific day with free or reduced admission, or both. A few are genuinely free to enter year-round. Exact savings and eligibility ages vary enough between venues that it's worth checking each listing rather than assuming.",
  },
  { slug: "day-trips-near-chicago", label: "Day Trips Near Chicago" },
  {
    slug: "arts-culture",
    label: "Arts & Culture",
    intro:
      "Historical societies, art centers, and community theaters across the region run adult classes, docent-led tours, and member events, many of them free or built around a modest suggested donation. This is also where the area's local-history museums live — small, volunteer-run, and often overlooked.",
  },
  { slug: "friendly-visitors-phone-buddies", label: "Friendly Visitors & Phone Buddies" },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export function categoryLabel(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}
