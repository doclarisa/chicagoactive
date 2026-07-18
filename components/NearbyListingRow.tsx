import Link from "next/link";

// Lightweight radius-fill row — name, operator context, distance, link only.
// Deliberately NOT a full ListingCard: own listings are a page's substance,
// nearby listings are secondary, so dense-cluster suburbs sharing a radius
// pool (Oak Park/Berwyn/Forest Park) don't read as near-duplicates of
// each other.
export default function NearbyListingRow({
  name,
  slug,
  city,
  distanceLabel,
}: {
  name: string;
  slug: string;
  city: string;
  distanceLabel: string;
}) {
  return (
    <Link
      href={`/${slug}`}
      className="flex items-center justify-between gap-3 rounded-card bg-card px-4 py-3 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-sm"
    >
      <span className="text-base font-semibold text-ink">
        {name}
        <span className="ml-2 font-normal text-ink-muted">— {city}</span>
      </span>
      <span className="shrink-0 text-sm font-semibold text-ink-muted">{distanceLabel}</span>
    </Link>
  );
}
