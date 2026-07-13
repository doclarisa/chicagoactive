// Soft tints stay within the brand palette (blue/red family only — no
// rainbow) while still telling categories apart at a glance. Icons are
// decorative placeholders for real photos, which the directory doesn't
// have sourced yet (see lib/categories.ts for why fabricated stock photos
// of real organizations were avoided).
type CategoryStyle = { icon: string; tint: string; ink: string };

const BLUE: CategoryStyle = { icon: "", tint: "bg-flag-blue-tint", ink: "text-flag-blue-ink" };
const RED: CategoryStyle = { icon: "", tint: "bg-star-red-tint", ink: "text-star-red-ink" };

export const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  "park-district-55-programs": { ...BLUE, icon: "🌳" },
  "senior-center-events": { ...RED, icon: "🎈" },
  "library-classes": { ...BLUE, icon: "📚" },
  "walking-hiking-groups": { ...BLUE, icon: "🥾" },
  "pickleball-fitness": { ...RED, icon: "🏓" },
  "museum-senior-days": { ...BLUE, icon: "🏛️" },
  "day-trips-near-chicago": { ...RED, icon: "🚌" },
};

export function categoryStyle(slug: string): CategoryStyle {
  return CATEGORY_STYLES[slug] ?? BLUE;
}
