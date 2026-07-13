import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { categoryStyle } from "@/lib/categoryStyles";
import CategoryBadge from "@/components/CategoryBadge";
import CostBadge from "@/components/CostBadge";

export default async function ListingDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = await prisma.listing.findUnique({ where: { slug } });

  if (!listing) notFound();

  const days = Array.isArray(listing.days) ? (listing.days as string[]) : [];
  const style = categoryStyle(listing.category);

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/directory"
        className="text-base font-semibold text-flag-blue-ink no-underline hover:underline"
      >
        ← Back to directory
      </Link>

      <div
        className={`mt-4 flex h-40 items-center justify-center rounded-card ${style.tint} text-6xl`}
        aria-hidden="true"
      >
        {style.icon}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <CategoryBadge category={listing.category} />
        <CostBadge cost={listing.cost} />
      </div>

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        {listing.name}
      </h1>

      <p className="mt-2 text-lg text-ink-muted">
        {listing.neighborhood ? `${listing.neighborhood}, ` : ""}
        {listing.county} County
      </p>

      <p className="mt-6 text-lg leading-relaxed text-ink">{listing.description}</p>

      {days.length > 0 && (
        <p className="mt-4 text-lg font-semibold text-ink">
          {days.join(", ")}
          {listing.time ? ` — ${listing.time}` : ""}
        </p>
      )}

      {listing.sourceUrl && (
        <a
          href={listing.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-pill bg-flag-blue-ink px-6 text-base font-bold text-white no-underline"
        >
          Source & current schedule →
        </a>
      )}
    </main>
  );
}
