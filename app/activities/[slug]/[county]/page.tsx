import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { activityPageBySlug } from "@/lib/activityPages";
import { COUNTY_CELLS, countyCellBySlugs, countyCellsFor, chicagoCellByTag } from "@/lib/activityCounties";
import ListingCard from "@/components/ListingCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { itemListSchema } from "@/lib/schema";

export function generateStaticParams() {
  return COUNTY_CELLS.map((c) => ({ slug: c.activitySlug, county: c.countySlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; county: string }>;
}) {
  const { slug, county } = await params;
  const cell = countyCellBySlugs(slug, county);
  if (!cell) return {};
  const description = `Free and low-cost ${cell.h1.toLowerCase()} — real listings, not a metro-wide sample.`;
  return {
    title: cell.h1,
    description,
    alternates: { canonical: `/activities/${cell.activitySlug}/${cell.countySlug}` },
    openGraph: { title: cell.h1, description },
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

  const listings = await prisma.listing.findMany({
    where: { status: "PUBLISHED", county: cell.county, citySlug: { not: "chicago" } },
    orderBy: { name: "asc" },
  });
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
