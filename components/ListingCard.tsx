import Link from "next/link";
import { categoryStyle } from "@/lib/categoryStyles";
import CategoryBadge from "./CategoryBadge";
import CostBadge from "./CostBadge";

type ListingCardData = {
  id: string;
  slug: string;
  name: string;
  category: string;
  neighborhood: string | null;
  county: string;
  cost: string;
  days: unknown;
};

export default function ListingCard({ listing }: { listing: ListingCardData }) {
  const style = categoryStyle(listing.category);
  const days = Array.isArray(listing.days) ? (listing.days as string[]) : [];

  return (
    <Link
      href={`/${listing.slug}`}
      className="flex h-full flex-col gap-3 rounded-card bg-card p-5 no-underline shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md"
    >
      <div
        className={`flex h-24 items-center justify-center rounded-card ${style.tint} text-4xl`}
        aria-hidden="true"
      >
        {style.icon}
      </div>
      <CategoryBadge category={listing.category} />
      <h2 className="text-lg font-bold leading-snug text-ink">{listing.name}</h2>
      <p className="text-base text-ink-muted">
        {listing.neighborhood ? `${listing.neighborhood}, ` : ""}
        {listing.county} County
        {days.length > 0 ? ` · ${days.join("/")}` : ""}
      </p>
      <div className="mt-auto pt-1">
        <CostBadge cost={listing.cost} />
      </div>
    </Link>
  );
}
