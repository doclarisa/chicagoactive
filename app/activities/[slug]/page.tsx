import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { ACTIVITY_PAGES, activityPageBySlug } from "@/lib/activityPages";
import { chicagoCellByTag, countyCellBySlugs } from "@/lib/activityCounties";
import ListingCard from "@/components/ListingCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { itemListSchema } from "@/lib/schema";

const GROUP_CAP = 6;

export function generateStaticParams() {
  return ACTIVITY_PAGES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = activityPageBySlug(slug);
  if (!page) return {};
  const description = `Free and low-cost ${page.h1.toLowerCase()} — browse by county across Cook, DuPage, Will, Lake, Kane, McHenry, and Kendall.`;
  return {
    title: page.h1,
    description,
    alternates: { canonical: `/activities/${page.slug}` },
    openGraph: { title: page.h1, description },
  };
}

// Metro pages are a router with samples, not a flat dump — each county
// group is capped, and Chicago's 20 near-identical DFSS neighborhood
// centers collapse into a single link to /chicago rather than repeating
// the doorway pattern the Stage 2 neighborhood-page decision already
// rejected. Only genuinely distinct Chicago-citywide listings (Park
// District, CPL, CJE, museums) render as their own cards.
export default async function ActivityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = activityPageBySlug(slug);
  if (!page) notFound();

  const listings = await prisma.listing.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { name: "asc" },
  });

  const tagged = listings.filter(
    (l) => Array.isArray(l.activities) && (l.activities as string[]).includes(page.tag),
  );

  const dfssCount = tagged.filter((l) => l.citySlug === "chicago" && l.neighborhoodSlug !== "").length;
  const chicagoCitywide = tagged.filter((l) => l.citySlug === "chicago" && l.neighborhoodSlug === "");
  const nonChicago = tagged.filter((l) => l.citySlug !== "chicago");

  const byCounty = new Map<string, typeof nonChicago>();
  for (const l of nonChicago) {
    const arr = byCounty.get(l.county) ?? [];
    arr.push(l);
    byCounty.set(l.county, arr);
  }
  const countyGroups = [...byCounty.entries()].sort((a, b) => b[1].length - a[1].length);

  const chicagoCell = chicagoCellByTag(page.tag);

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
          { name: page.h1, path: `/activities/${page.slug}` },
        ]}
      />

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        {page.h1}
      </h1>

      <p className="mt-4 text-lg leading-relaxed text-ink">{page.intro}</p>

      {dfssCount > 0 && (
        <Link
          href={chicagoCell ? `/chicago/${page.tag}` : "/chicago"}
          className="mt-6 flex items-center justify-between gap-3 rounded-card bg-flag-blue-tint px-4 py-3 no-underline"
        >
          <span className="text-base font-semibold text-ink">
            Chicago — {dfssCount} DFSS neighborhood senior centers offer this as part of their
            standard program
          </span>
          <span className="shrink-0 text-sm font-bold text-flag-blue-ink">
            {chicagoCell ? "See Chicago's own page →" : "See the Chicago hub →"}
          </span>
        </Link>
      )}

      {chicagoCitywide.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-extrabold tracking-tight text-ink">Chicago citywide</h2>
          <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {chicagoCitywide.map((l) => (
              <li key={l.id}>
                <ListingCard listing={l} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {countyGroups.map(([county, group]) => {
        const shown = group.slice(0, GROUP_CAP);
        const remaining = group.length - shown.length;
        const cell = countyCellBySlugs(page.slug, county.toLowerCase());
        return (
          <section key={county} className="mt-10">
            <h2 className="text-xl font-extrabold tracking-tight text-ink">
              {county} County
              <span className="ml-2 text-base font-normal text-ink-muted">
                ({group.length})
              </span>
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((l) => (
                <li key={l.id}>
                  <ListingCard listing={l} />
                </li>
              ))}
            </ul>
            {remaining > 0 &&
              (cell ? (
                <Link
                  href={`/activities/${cell.activitySlug}/${cell.countySlug}`}
                  className="mt-3 inline-block text-base font-semibold text-flag-blue-ink no-underline hover:underline"
                >
                  See all {remaining + shown.length} in {county} County →
                </Link>
              ) : (
                <p className="mt-3 text-base text-ink-muted">
                  +{remaining} more in {county} County.
                </p>
              ))}
          </section>
        );
      })}
    </main>
  );
}
