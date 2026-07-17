// operatorType is a FACET (filterable on /directory), never a landing page.
// Nobody searches "park district" — they search the activity. This exists
// so a searcher can narrow results, not so it can anchor a URL.
export const OPERATOR_TYPES = [
  { slug: "park-district", label: "Park District" },
  { slug: "senior-center", label: "Senior Center" },
  { slug: "library", label: "Library" },
  { slug: "museum", label: "Museum / Attraction" },
  { slug: "community-college", label: "Community College" },
  { slug: "forest-preserve", label: "Forest Preserve District" },
  { slug: "nonprofit", label: "Nonprofit" },
  { slug: "city-agency", label: "City / Township Agency" },
] as const;

export type OperatorTypeSlug = (typeof OPERATOR_TYPES)[number]["slug"];

export function operatorTypeLabel(slug: string): string {
  return OPERATOR_TYPES.find((o) => o.slug === slug)?.label ?? slug;
}
