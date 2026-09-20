import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { CITIES } from "@/lib/cities";
import { COUNTIES } from "@/lib/counties";
import { categoryLabel } from "@/lib/categories";
import { breadcrumbSchema, articleSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import FreeVsPaidByCountyChart from "@/components/FreeVsPaidByCountyChart";

const TITLE = "Which Chicago Suburbs Have the Most Free Senior Programs?";
const DESCRIPTION =
  "A data breakdown of our own 300+ listing directory of senior activities across Chicagoland -- which counties and suburbs skew free vs. paid, straight from verified listings.";
const PUBLISHED_DATE = "2026-09-20";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides/free-senior-programs-by-chicago-suburb" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "article" },
  robots: { index: true, follow: true },
};

export default async function FreeSeniorProgramsGuide() {
  const listings = await prisma.listing.findMany({
    where: { status: "PUBLISHED" },
    select: { citySlug: true, county: true, cost: true, category: true },
  });

  const totalListings = listings.length;
  const totalFree = listings.filter((l) => l.cost === "FREE").length;

  // County rollup
  const countyMap = new Map<string, { free: number; total: number }>();
  for (const c of COUNTIES) countyMap.set(c, { free: 0, total: 0 });
  for (const l of listings) {
    const e = countyMap.get(l.county);
    if (!e) continue;
    e.total += 1;
    if (l.cost === "FREE") e.free += 1;
  }
  const countyRows = COUNTIES.map((c) => ({ county: c, ...countyMap.get(c)! })).filter((r) => r.total > 0);

  // City rollup, restricted to cities that already have their own /city page
  const cityMap = new Map<string, { free: number; total: number }>();
  for (const l of listings) {
    if (!l.citySlug) continue;
    if (!cityMap.has(l.citySlug)) cityMap.set(l.citySlug, { free: 0, total: 0 });
    const e = cityMap.get(l.citySlug)!;
    e.total += 1;
    if (l.cost === "FREE") e.free += 1;
  }
  const cityRows = CITIES.map((c) => ({ ...c, ...(cityMap.get(c.slug) ?? { free: 0, total: 0 }) })).filter(
    (r) => r.total > 0,
  );

  const maxFree = Math.max(...cityRows.map((r) => r.free));
  const topByFree = cityRows.filter((r) => r.free === maxFree && maxFree > 0).sort((a, b) => a.name.localeCompare(b.name));
  const allFreeSpotlight = cityRows
    .filter((r) => r.total >= 3 && r.free === r.total)
    .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name));

  // Category breakdown of FREE listings
  const catMap = new Map<string, number>();
  for (const l of listings) if (l.cost === "FREE") catMap.set(l.category, (catMap.get(l.category) ?? 0) + 1);
  const catRows = [...catMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([slug, count]) => ({ slug, count, pct: Math.round((100 * count) / totalFree) }));
  const topCategory = catRows[0];

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Explore by Area", path: "/areas" },
    { name: TITLE, path: "/guides/free-senior-programs-by-chicago-suburb" },
  ];

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              headline: TITLE,
              description: DESCRIPTION,
              path: "/guides/free-senior-programs-by-chicago-suburb",
              datePublished: PUBLISHED_DATE,
            }),
          ),
        }}
      />
      <Breadcrumbs crumbs={crumbs} />

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{TITLE}</h1>

      <p className="mt-4 text-lg leading-relaxed text-ink">
        We pulled this straight from our own directory: {totalListings} senior programs across Chicagoland,
        each one checked against its own source, and {totalFree} of them ({Math.round((100 * totalFree) / totalListings)}%)
        genuinely free to attend. Here&apos;s where the free programs actually cluster -- by county, by the
        kind of organization running them, and suburb by suburb.
      </p>

      <div className="mt-4 rounded-card bg-flag-blue-tint px-5 py-4 text-base text-flag-blue-ink">
        <p className="font-bold">This is a snapshot of what we&apos;ve verified so far, not a census.</p>
        <p className="mt-1">
          We build this directory area by area, and some suburbs simply have more of their programs
          catalogued than others at any given point. A suburb missing from the lists below likely just
          hasn&apos;t been fully researched yet -- it doesn&apos;t mean it has no free programs.
        </p>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">The county pattern</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          Cook County has the most free programs in raw numbers ({countyRows.find((r) => r.county === "Cook")?.free}{" "}
          of them) simply because it&apos;s the biggest county we cover. But look at the share instead of the
          count, and the collar counties actually skew more free: every collar county we track clears
          65%+ free, while Cook sits at{" "}
          {Math.round((100 * (countyRows.find((r) => r.county === "Cook")?.free ?? 0)) / (countyRows.find((r) => r.county === "Cook")?.total ?? 1))}
          %.
        </p>
        <FreeVsPaidByCountyChart rows={countyRows} />
        <p className="mt-3 text-sm text-ink-muted">
          Kendall County shows 100% free, but off a small base ({countyRows.find((r) => r.county === "Kendall")?.total}{" "}
          listings so far) -- worth reading as an early signal, not a settled fact, until we&apos;ve catalogued more of it.
        </p>
      </section>

      {topCategory && (
        <section className="mt-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">Where the free programs come from</h2>
          <p className="mt-3 text-lg leading-relaxed text-ink">
            If you want free specifically,{" "}
            <Link href={`/category/${topCategory.slug}`} className="font-semibold text-flag-blue-ink no-underline hover:underline">
              {categoryLabel(topCategory.slug)}
            </Link>{" "}
            is the single biggest source -- {topCategory.count} of the {totalFree} free listings we&apos;ve
            verified ({topCategory.pct}%). Here&apos;s the full breakdown:
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {catRows.map((c) => (
              <li key={c.slug} className="flex items-center justify-between gap-4 text-base text-ink">
                <Link href={`/category/${c.slug}`} className="font-semibold text-flag-blue-ink no-underline hover:underline">
                  {categoryLabel(c.slug)}
                </Link>
                <span className="text-ink-muted tabular-nums">
                  {c.count} free ({c.pct}%)
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">Suburb spotlight</h2>

        <h3 className="mt-5 text-lg font-bold text-ink">Most free programs, raw count</h3>
        <p className="mt-2 text-base leading-relaxed text-ink">
          {topByFree.length > 1
            ? `${topByFree.length} suburbs are currently tied at the top with ${maxFree} free programs each:`
            : `${topByFree[0]?.name} leads with ${maxFree} free programs:`}
        </p>
        <p className="mt-2 flex flex-wrap gap-x-1 gap-y-1 text-base">
          {topByFree.map((c, i) => (
            <span key={c.slug}>
              <Link href={`/city/${c.slug}`} className="font-semibold text-flag-blue-ink no-underline hover:underline">
                {c.name}
              </Link>
              {i < topByFree.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>

        {allFreeSpotlight.length > 0 && (
          <>
            <h3 className="mt-6 text-lg font-bold text-ink">Suburbs where everything we&apos;ve verified is free</h3>
            <p className="mt-2 text-base leading-relaxed text-ink">
              A smaller list, but a genuinely interesting one: in these suburbs, every senior program we&apos;ve
              catalogued so far (at least 3 each) is free, not a single paid one among them.
            </p>
            <ul className="mt-3 flex flex-col gap-1">
              {allFreeSpotlight.map((c) => (
                <li key={c.slug} className="text-base text-ink">
                  <Link href={`/city/${c.slug}`} className="font-semibold text-flag-blue-ink no-underline hover:underline">
                    {c.name}
                  </Link>{" "}
                  <span className="text-ink-muted">
                    -- {c.total} of {c.total} free
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <section className="mt-14 border-t border-flag-blue-tint-2 pt-8">
        <h2 className="text-xl font-bold text-ink">Find what&apos;s free near you</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/areas"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Explore by Area →</span>
            <span className="text-base text-ink-muted">Browse every city we cover</span>
          </Link>
          <Link
            href="/directory"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Browse the full directory →</span>
            <span className="text-base text-ink-muted">Filter by cost, category, and city</span>
          </Link>
        </div>
      </section>

      <p className="mt-14 border-t border-flag-blue-tint-2 pt-6 text-base text-ink-muted">
        Every count above comes directly from our own directory data as of {PUBLISHED_DATE}, filtered to
        published listings only. &quot;Free&quot; means the program itself carries no cost, per its own
        source page -- it doesn&apos;t include a facility&apos;s general membership fee if one exists
        separately. We add new areas in waves, so these numbers will shift as coverage grows.
      </p>

      <p className="mt-8">
        <Link href="/directory" className="text-base font-semibold text-flag-blue-ink no-underline hover:underline">
          ← Back to the free directory
        </Link>
      </p>
    </main>
  );
}
