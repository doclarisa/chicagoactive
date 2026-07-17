// Demand-side activity tags — what searchers type, not what our org-chart
// categories describe. A tag with 0 listings is not clutter; it's a gap
// register showing what this niche needs that we can't yet answer.
// Only ever applied to a listing when a fetched sourceUrl documents it —
// never inferred because an operator type "probably" offers it.
export const ACTIVITIES = [
  { slug: "pickleball", label: "Pickleball" },
  { slug: "swimming", label: "Swimming" },
  { slug: "water-aerobics", label: "Water Aerobics" },
  { slug: "fitness-classes", label: "Fitness Classes" },
  { slug: "strength-training", label: "Strength Training" },
  { slug: "yoga", label: "Yoga" },
  { slug: "tai-chi", label: "Tai Chi" },
  { slug: "walking-groups", label: "Walking Groups" },
  { slug: "hiking", label: "Hiking" },
  { slug: "tennis", label: "Tennis" },
  { slug: "golf", label: "Golf" },
  { slug: "art-classes", label: "Art Classes" },
  { slug: "ceramics", label: "Ceramics" },
  { slug: "music-chorus", label: "Music & Chorus" },
  { slug: "dance", label: "Dance" },
  { slug: "computer-classes", label: "Computer Classes" },
  { slug: "tech-help", label: "Tech Help" },
  { slug: "cards-games", label: "Cards & Games" },
  { slug: "bingo", label: "Bingo" },
  { slug: "book-clubs", label: "Book Clubs" },
  { slug: "gardening", label: "Gardening" },
  { slug: "languages", label: "Languages" },
  { slug: "day-trips", label: "Day Trips" },
  { slug: "lifelong-learning", label: "Lifelong Learning" },
  { slug: "congregate-meals", label: "Congregate Meals" },
  { slug: "social-clubs", label: "Social Clubs" },
] as const;

export type ActivitySlug = (typeof ACTIVITIES)[number]["slug"];

export function activityLabel(slug: string): string {
  return ACTIVITIES.find((a) => a.slug === slug)?.label ?? slug;
}
