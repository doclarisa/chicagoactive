import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { categoryLabel } from "@/lib/categories";
import { activityLabel } from "@/lib/activities";
import ListingCard from "@/components/ListingCard";
import Breadcrumbs from "@/components/Breadcrumbs";

type SearchParams = { q?: string };

const MAX_RESULTS = 100;
// Group results once there are enough to make browsing a flat list awkward.
const GROUP_THRESHOLD = 8;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  const title = q ? `Search results for "${q}"` : "Search";
  return {
    title,
    // Utility page, not content to rank — query-driven results are thin
    // and duplicative of the pages that already rank (city/activity/listing
    // pages). Still crawlable/linkable so a shared search link works.
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  const breadcrumbs = (
    <Breadcrumbs crumbs={[{ name: "Home", path: "/" }, { name: "Search", path: "/search" }]} />
  );

  if (!query) {
    return (
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        {breadcrumbs}
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Search</h1>
        <p className="mt-4 text-lg text-ink-muted">
          Use the search box above to find a senior center, town, or activity — try a name like
          &ldquo;Palos Hills,&rdquo; a county like &ldquo;Cook County,&rdquo; or an activity like
          &ldquo;bingo.&rdquo;
        </p>
      </main>
    );
  }

  const all = await prisma.listing.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { name: "asc" },
  });

  // Every listing's field is required to appear somewhere across a combined
  // haystack, not as one contiguous substring -- so "Shirley Green" still
  // matches a listing named "...(Shirley J. Green Senior Center)".
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);

  const matches = all.filter((l) => {
    const activityLabels = Array.isArray(l.activities)
      ? (l.activities as string[]).map(activityLabel)
      : [];
    const haystack = [
      l.name,
      l.description,
      l.neighborhood,
      l.city,
      `${l.county} County`,
      categoryLabel(l.category),
      ...activityLabels,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return tokens.every((t) => haystack.includes(t));
  });

  const truncated = matches.length > MAX_RESULTS;
  const results = matches.slice(0, MAX_RESULTS);

  if (results.length === 0) {
    return (
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        {breadcrumbs}
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Search
        </h1>
        <p className="mt-6 text-lg text-ink">
          No matches for &ldquo;{query}&rdquo;. Try a town name, a senior center name, or an
          activity like &ldquo;bingo&rdquo; or &ldquo;yoga.&rdquo;
        </p>
        <p className="mt-4 flex flex-wrap gap-3 text-base font-semibold">
          <Link href="/areas" className="text-flag-blue-ink no-underline hover:underline">
            Browse Areas
          </Link>
          <Link href="/directory" className="text-flag-blue-ink no-underline hover:underline">
            Browse the full Directory
          </Link>
        </p>
      </main>
    );
  }

  const grouped = results.length > GROUP_THRESHOLD;
  const groups = grouped
    ? results.reduce<Map<string, typeof results>>((acc, l) => {
        const key = categoryLabel(l.category);
        const bucket = acc.get(key) ?? [];
        bucket.push(l);
        acc.set(key, bucket);
        return acc;
      }, new Map())
    : null;

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      {breadcrumbs}
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Search</h1>
      <p className="mt-2 text-lg text-ink-muted">
        {matches.length} result{matches.length === 1 ? "" : "s"} for &ldquo;{query}&rdquo;
        {truncated && ` — showing the first ${MAX_RESULTS}`}
      </p>

      {groups ? (
        <div className="mt-6 flex flex-col gap-10">
          {Array.from(groups.entries()).map(([label, items]) => (
            <section key={label}>
              <h2 className="text-xl font-bold text-ink">
                {label}{" "}
                <span className="font-semibold text-ink-muted">
                  ({items.length})
                </span>
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((l) => (
                  <li key={l.id}>
                    <ListingCard listing={l} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((l) => (
            <li key={l.id}>
              <ListingCard listing={l} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
