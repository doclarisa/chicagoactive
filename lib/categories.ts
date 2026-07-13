export const CATEGORIES = [
  { slug: "park-district-55-programs", label: "Park District 55+ Programs" },
  { slug: "senior-center-events", label: "Senior Center Events" },
  { slug: "library-classes", label: "Library Classes" },
  { slug: "walking-hiking-groups", label: "Walking & Hiking Groups" },
  { slug: "pickleball-fitness", label: "Pickleball & Fitness" },
  { slug: "museum-senior-days", label: "Museum Senior Days" },
  { slug: "day-trips-near-chicago", label: "Day Trips Near Chicago" },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export function categoryLabel(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}
