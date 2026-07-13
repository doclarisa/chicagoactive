import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { categoryLabel } from "@/lib/categories";

const COST_LABELS: Record<string, string> = {
  FREE: "Free",
  LOW_COST: "$",
  PAID: "$$",
};

export default async function ListingDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = await prisma.listing.findUnique({ where: { slug } });

  if (!listing) notFound();

  const days = Array.isArray(listing.days) ? (listing.days as string[]) : [];

  return (
    <main style={{ padding: 32, fontFamily: "sans-serif" }}>
      <h1>{listing.name}</h1>
      <p>{listing.description}</p>
      <p>
        {categoryLabel(listing.category)} — {listing.neighborhood ? `${listing.neighborhood}, ` : ""}
        {listing.county} County
      </p>
      <p>Cost: {COST_LABELS[listing.cost]}</p>
      {days.length > 0 && (
        <p>
          {days.join(", ")}
          {listing.time ? ` — ${listing.time}` : ""}
        </p>
      )}
      {listing.sourceUrl && (
        <p>
          <a href={listing.sourceUrl} target="_blank" rel="noopener noreferrer">
            Source / current schedule
          </a>
        </p>
      )}
    </main>
  );
}
