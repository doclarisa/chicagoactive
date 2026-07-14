// Each of the 7 directory categories gets its own distinct hue so they're
// easy to tell apart at a glance — stronger color-coding helps 55+ readers
// scan faster than two alternating tints did. Site chrome (header, footer,
// CTAs) stays strictly blue/white/red; this palette is scoped to category
// badges/tiles/icons only. Icons are decorative placeholders for real
// photos, which the directory doesn't have sourced yet (see
// lib/categories.ts for why fabricated stock photos were avoided).
type CategoryStyle = { icon: string; tint: string; ink: string };

const GREEN: CategoryStyle = { icon: "", tint: "bg-cat-green-tint", ink: "text-cat-green-ink" };
const ORANGE: CategoryStyle = { icon: "", tint: "bg-cat-orange-tint", ink: "text-cat-orange-ink" };
const BLUE: CategoryStyle = { icon: "", tint: "bg-flag-blue-tint", ink: "text-flag-blue-ink" };
const TEAL: CategoryStyle = { icon: "", tint: "bg-cat-teal-tint", ink: "text-cat-teal-ink" };
const PINK: CategoryStyle = { icon: "", tint: "bg-cat-pink-tint", ink: "text-cat-pink-ink" };
const PURPLE: CategoryStyle = { icon: "", tint: "bg-cat-purple-tint", ink: "text-cat-purple-ink" };
const AMBER: CategoryStyle = { icon: "", tint: "bg-cat-amber-tint", ink: "text-cat-amber-ink" };

export const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  "park-district-55-programs": { ...GREEN, icon: "🌳" },
  "senior-center-events": { ...ORANGE, icon: "🎈" },
  "library-classes": { ...BLUE, icon: "📚" },
  "walking-hiking-groups": { ...TEAL, icon: "🥾" },
  "pickleball-fitness": { ...PINK, icon: "🏓" },
  "museum-senior-days": { ...PURPLE, icon: "🏛️" },
  "day-trips-near-chicago": { ...AMBER, icon: "🚌" },
};

export function categoryStyle(slug: string): CategoryStyle {
  return CATEGORY_STYLES[slug] ?? BLUE;
}
