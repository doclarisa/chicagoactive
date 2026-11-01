import { notFound } from "next/navigation";
import Link from "next/link";
import { getPublishedListingsSafe } from "@/lib/db";
import { activityPageBySlug } from "@/lib/activityPages";
import { COUNTY_CELLS, countyCellBySlugs, countyCellsFor, chicagoCellByTag } from "@/lib/activityCounties";
import ListingCard from "@/components/ListingCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { itemListSchema } from "@/lib/schema";

export function generateStaticParams() {
  return COUNTY_CELLS.map((c) => ({ slug: c.activitySlug, county: c.countySlug }));
}

// cell.h1 already says "X for Seniors in Y County" -- same free/count/year
// formula as the metro-level /activities/[slug] page above it.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; county: string }>;
}) {
  const { slug, county } = await params;
  const cell = countyCellBySlugs(slug, county);
  if (!cell) return {};

  const all = await getPublishedListingsSafe();
  const tagged = all.filter(
    (l) =>
      l.county === cell.county &&
      l.citySlug !== "chicago" &&
      Array.isArray(l.activities) &&
      (l.activities as string[]).includes(cell.tag),
  );
  const count = tagged.length;
  const freeCount = tagged.filter((l) => l.cost === "FREE").length;
  const freePrefix = count === 0 ? "" : freeCount === count ? "Free " : freeCount > 0 ? "Free & Low-Cost " : "";
  const year = new Date().getFullYear();
  const countSuffix = count > 0 ? ` — ${count} Listing${count === 1 ? "" : "s"}` : "";
  const title = `${freePrefix}${cell.h1} (${year})${countSuffix}`;
  const description = `Free and low-cost ${cell.h1.toLowerCase()} — real listings, not a metro-wide sample.`;
  return {
    title,
    description,
    alternates: { canonical: `/activities/${cell.activitySlug}/${cell.countySlug}` },
    openGraph: { title, description },
  };
}

export default async function ActivityCountyPage({
  params,
}: {
  params: Promise<{ slug: string; county: string }>;
}) {
  const { slug, county } = await params;
  const cell = countyCellBySlugs(slug, county);
  if (!cell) notFound();

  const activityPage = activityPageBySlug(cell.activitySlug);

  const all = await getPublishedListingsSafe();
  const listings = all.filter((l) => l.county === cell.county && l.citySlug !== "chicago");
  const tagged = listings.filter(
    (l) => Array.isArray(l.activities) && (l.activities as string[]).includes(cell.tag),
  );

  // No-orphans mesh: same activity in other qualifying counties, including
  // Chicago's dedicated /chicago/[tag] cell when one exists for this tag.
  const siblingCounties = countyCellsFor(cell.activitySlug).filter(
    (c) => c.countySlug !== cell.countySlug,
  );
  const chicagoSibling = chicagoCellByTag(cell.tag);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      {tagged.length > 0 && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              itemListSchema(tagged.map((l) => ({ name: l.name, path: `/${l.slug}` }))),
            ),
          }}
        />
      )}
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Directory", path: "/directory" },
          ...(activityPage
            ? [{ name: activityPage.h1, path: `/activities/${activityPage.slug}` }]
            : []),
          { name: `${cell.county} County`, path: `/activities/${cell.activitySlug}/${cell.countySlug}` },
        ]}
      />

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        {cell.h1}
      </h1>

      <p className="mt-4 text-lg leading-relaxed text-ink">{cell.intro}</p>

      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tagged.map((l) => (
          <li key={l.id}>
            <ListingCard listing={l} />
          </li>
        ))}
      </ul>

      {(siblingCounties.length > 0 || chicagoSibling) && (
        <section className="mt-14 border-t border-flag-blue-tint-2 pt-6">
          <h2 className="text-xl font-extrabold tracking-tight text-ink">
            {activityPage?.h1.split(" in ")[0] ?? "This activity"} in other counties
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {chicagoSibling && (
              <li>
                <Link
                  href={`/chicago/${cell.tag}`}
                  className="inline-flex min-h-10 items-center rounded-pill border border-flag-blue-tint-2 bg-white px-4 text-base font-semibold text-flag-blue-ink no-underline hover:bg-flag-blue-tint"
                >
                  Chicago
                </Link>
              </li>
            )}
            {siblingCounties.map((c) => (
              <li key={c.countySlug}>
                <Link
                  href={`/activities/${c.activitySlug}/${c.countySlug}`}
                  className="inline-flex min-h-10 items-center rounded-pill border border-flag-blue-tint-2 bg-white px-4 text-base font-semibold text-flag-blue-ink no-underline hover:bg-flag-blue-tint"
                >
                  {c.county} County
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
