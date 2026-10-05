import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublishedListingsSafe } from "@/lib/db";
import { CITIES } from "@/lib/cities";
import { CITY_POPULATIONS } from "@/lib/cityPopulations";
import { breadcrumbSchema, articleSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import SuburbsPerCapitaChart from "@/components/SuburbsPerCapitaChart";
import { BLOG_POSTS } from "@/lib/blog";

const POST = BLOG_POSTS.find((p) => p.slug === "most-active-suburb-chicagoland")!;
const MIN_LISTINGS = 3;
const CHART_TOP_N = 10;

export const metadata: Metadata = {
  title: POST.title,
  description: POST.dek,
  alternates: { canonical: `/blog/${POST.slug}` },
  openGraph: {
    title: POST.title,
    description: POST.dek,
    type: "article",
    images: [POST.heroImage],
  },
  robots: { index: true, follow: true },
};

function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function MostActiveSuburbPost() {
  const listings = await getPublishedListingsSafe();

  const countByCity = new Map<string, number>();
  for (const l of listings) {
    if (!l.citySlug) continue;
    countByCity.set(l.citySlug, (countByCity.get(l.citySlug) ?? 0) + 1);
  }

  const allRows = CITIES.map((c) => {
    const count = countByCity.get(c.slug) ?? 0;
    const population = CITY_POPULATIONS[c.slug];
    const per10k = population ? (count / population) * 10000 : 0;
    return { name: c.name, slug: c.slug, county: c.county, count, population, per10k };
  }).filter((r) => r.population != null);

  const ranked = allRows.filter((r) => r.count >= MIN_LISTINGS).sort((a, b) => b.per10k - a.per10k);
  const chartRows = ranked.slice(0, CHART_TOP_N);
  const winner = ranked[0];

  const byRawCount = [...allRows].sort((a, b) => b.count - a.count).slice(0, 5);
  const winnerRawRank = byRawCount.findIndex((r) => r.slug === winner?.slug);

  const fullTableSorted = [...allRows].sort((a, b) => b.per10k - a.per10k);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: POST.title, path: `/blog/${POST.slug}` },
  ];

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
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
              headline: POST.title,
              description: POST.dek,
              path: `/blog/${POST.slug}`,
              datePublished: POST.publishedDate,
            }),
          ),
        }}
      />
      <Breadcrumbs crumbs={crumbs} />

      <article>
        <header className="mt-4">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            {POST.title}
          </h1>
          <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-ink-muted">
            <time dateTime={POST.publishedDate}>{formatDate(POST.publishedDate)}</time>
            <span aria-hidden="true">·</span>
            <span>{POST.readingMinutes} min read</span>
            <span aria-hidden="true">·</span>
            <span>Active Chicagoland</span>
          </p>
        </header>

        <figure className="mt-6 -mx-4 overflow-hidden rounded-card sm:-mx-6">
          <Image
            src={POST.heroImage}
            alt="Active older adults walking and talking together outdoors"
            width={1448}
            height={1086}
            priority
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>

        <p className="mt-6 text-xl leading-relaxed text-ink">
          Ask which Chicagoland suburb is &quot;most active&quot; and the obvious answer is whichever
          town has the most programs. By that measure it&apos;s always going to be Evanston or Oak
          Park — both have 8 verified listings in our directory, more than anywhere else we cover.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-ink">
          But that measure is really just a population contest. Evanston has about 76,000 residents.
          Of course it has more senior programs than a town of 10,000 — it has nearly eight times the
          people. Raw counts reward size, not effort.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-ink">
          So we divided instead: verified directory listings per 10,000 residents, for every suburb
          with at least {MIN_LISTINGS} listings catalogued so far (below that, one listing can swing
          the rate wildly, so we leave those towns out of the ranking rather than publish a noisy
          number). {ranked.length} suburbs currently clear that bar.
        </p>

        {winner && (
          <p className="mt-5 text-xl font-bold leading-relaxed text-ink">
            The winner is {winner.name}, population {winner.population.toLocaleString()} —{" "}
            {winnerRawRank === -1 || winnerRawRank > 4
              ? "nowhere near the top 5 by raw count"
              : `#${winnerRawRank + 1} by raw count`}
            , but #1 once you adjust for size.
          </p>
        )}

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">
          The Top {CHART_TOP_N}, By Programs Per Resident
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          Listings per 10,000 residents. A score of 1.0 means one verified program for every 10,000
          people in town — small towns need very few listings to score well, which is exactly the
          point.
        </p>

        <SuburbsPerCapitaChart rows={chartRows} />

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">
          Size Isn&apos;t Destiny Either Way
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          It cuts both directions. Some of the biggest suburbs we cover — Elgin (population{" "}
          {allRows.find((r) => r.slug === "elgin")?.population.toLocaleString() ?? "115,000"}),
          Palatine, Schaumburg — sit near the bottom of the per-capita list despite having real
          programs, simply because their population is so much larger than their current listing
          count. That&apos;s not a knock on those towns. It&apos;s mostly a sign of how much research
          we still have left to do there, which is the honest caveat for the whole exercise below.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">Find Your Town</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Every suburb we track, ranked by listings per 10,000 residents — including the ones below
          the {MIN_LISTINGS}-listing bar, so you can see where your town stands even if it&apos;s not
          ranked yet.
        </p>

        <details className="mt-4 rounded-card bg-card p-4 shadow-sm ring-1 ring-black/5">
          <summary className="cursor-pointer text-base font-semibold text-flag-blue-ink">
            See all {fullTableSorted.length} suburbs
          </summary>
          <table className="mt-3 w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-flag-blue-tint-2 text-left text-ink-muted">
                <th className="py-1 pr-4 font-semibold">Suburb</th>
                <th className="py-1 pr-4 font-semibold">County</th>
                <th className="py-1 pr-4 font-semibold">Listings</th>
                <th className="py-1 pr-4 font-semibold">Population</th>
                <th className="py-1 font-semibold">Per 10k</th>
              </tr>
            </thead>
            <tbody>
              {fullTableSorted.map((r) => (
                <tr key={r.slug} className="border-b border-flag-blue-tint-2/60 text-ink">
                  <td className="py-1 pr-4">
                    <Link href={`/city/${r.slug}`} className="text-flag-blue-ink no-underline hover:underline">
                      {r.name}
                    </Link>
                  </td>
                  <td className="py-1 pr-4">{r.county}</td>
                  <td className="py-1 pr-4 tabular-nums">{r.count}</td>
                  <td className="py-1 pr-4 tabular-nums">{r.population.toLocaleString()}</td>
                  <td className="py-1 tabular-nums">
                    {r.count >= MIN_LISTINGS ? r.per10k.toFixed(2) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">The Honest Caveat</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          <strong>This ranks our directory, not the towns themselves.</strong> &quot;Listings per
          resident&quot; really measures how many programs we&apos;ve verified and catalogued so far in
          each suburb — not a census of everything that actually exists there. A town near the bottom
          almost certainly has more real programs than we&apos;ve found yet; we just haven&apos;t
          finished researching it. We build this directory area by area, and some suburbs are simply
          further along than others right now.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Population figures come from a mix of 2020 Census and more recent estimates, pulled from a
          single consistent source so every town is measured the same way — not a perfect number for
          any one town, but a fair basis for comparing all of them.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Know a program in your town we haven&apos;t found yet? That&apos;s exactly the kind of tip
          that moves a suburb up this list —{" "}
          <Link href="/about" className="font-semibold text-flag-blue-ink no-underline hover:underline">
            tell us
          </Link>
          .
        </p>
      </article>

      <section className="mt-14 border-t border-flag-blue-tint-2 pt-8">
        <h2 className="text-xl font-bold text-ink">Explore the directory</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/areas"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Browse by Area →</span>
            <span className="text-base text-ink-muted">See every suburb we cover</span>
          </Link>
          <Link
            href="/directory"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Browse the full directory →</span>
            <span className="text-base text-ink-muted">Every listing, searchable by city and category</span>
          </Link>
        </div>
      </section>

      <p className="mt-8">
        <Link href="/blog" className="text-base font-semibold text-flag-blue-ink no-underline hover:underline">
          ← Back to the blog
        </Link>
      </p>
    </main>
  );
}
