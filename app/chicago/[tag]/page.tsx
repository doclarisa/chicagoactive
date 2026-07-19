import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { CHICAGO_CELLS, chicagoCellByTag, countyCellsFor } from "@/lib/activityCounties";
import { ACTIVITY_PAGES } from "@/lib/activityPages";
import ListingCard from "@/components/ListingCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { itemListSchema } from "@/lib/schema";

export function generateStaticParams() {
  return CHICAGO_CELLS.map((c) => ({ tag: c.tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const cell = chicagoCellByTag(tag);
  if (!cell) return {};
  const description = `Free and low-cost ${cell.h1.toLowerCase()} — DFSS neighborhood senior centers plus citywide programs.`;
  return {
    title: cell.h1,
    description,
    alternates: { canonical: `/chicago/${cell.tag}` },
    openGraph: { title: cell.h1, description },
  };
}

export default async function ChicagoActivityPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const cell = chicagoCellByTag(tag);
  if (!cell) notFound();

  const listings = await prisma.listing.findMany({
    where: { status: "PUBLISHED", citySlug: "chicago" },
    orderBy: { name: "asc" },
  });
  const tagged = listings.filter(
    (l) => Array.isArray(l.activities) && (l.activities as string[]).includes(cell.tag),
  );

  const dfssCount = tagged.filter((l) => l.neighborhoodSlug !== "").length;
  const citywide = tagged.filter((l) => l.neighborhoodSlug === "");

  // Mesh: same activity in the suburban counties that also cleared the
  // 8+ gate, if the activity has a metro page whose public slug we can
  // link through.
  const activityPage = ACTIVITY_PAGES.find((a) => a.tag === cell.tag);
  const siblingCounties = activityPage ? countyCellsFor(activityPage.slug) : [];

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
          { name: "Chicago", path: "/chicago" },
          { name: cell.h1, path: `/chicago/${cell.tag}` },
        ]}
      />

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        {cell.h1}
      </h1>

      <p className="mt-4 text-lg leading-relaxed text-ink">{cell.intro}</p>

      {dfssCount > 0 && (
        <Link
          href="/chicago"
          className="mt-6 flex items-center justify-between gap-3 rounded-card bg-flag-blue-tint px-4 py-3 no-underline"
        >
          <span className="text-base font-semibold text-ink">
            {dfssCount} DFSS neighborhood senior centers offer this citywide
          </span>
          <span className="shrink-0 text-sm font-bold text-flag-blue-ink">See the Chicago hub →</span>
        </Link>
      )}

      {citywide.length > 0 && (
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {citywide.map((l) => (
            <li key={l.id}>
              <ListingCard listing={l} />
            </li>
          ))}
        </ul>
      )}

      {siblingCounties.length > 0 && activityPage && (
        <section className="mt-14 border-t border-flag-blue-tint-2 pt-6">
          <h2 className="text-xl font-extrabold tracking-tight text-ink">
            {activityPage.h1.split(" in ")[0].split(" from ")[0]} in other counties
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
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
