import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { CATEGORIES } from "@/lib/categories";
import { COUNTIES } from "@/lib/counties";
import { DAYS } from "@/lib/days";
import ListingCard from "@/components/ListingCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { itemListSchema } from "@/lib/schema";

type SearchParams = {
  county?: string;
  category?: string;
  cost?: string;
  day?: string;
};

const DESCRIPTION =
  "Browse free and low-cost things to do for active adults 50+ across Chicagoland — filter by county, category, cost, and day.";

// Canonical points at the unfiltered page regardless of ?county/?category/
// etc. — filter combinations are the same content, not distinct pages,
// so this avoids duplicate-content signals from the query params.
export const metadata: Metadata = {
  title: "Directory",
  description: DESCRIPTION,
  alternates: { canonical: "/directory" },
  openGraph: { title: "Directory | Active Chicagoland", description: DESCRIPTION },
};

const selectClass =
  "min-h-12 rounded-pill border border-flag-blue-tint-2 bg-white px-4 text-base font-semibold text-ink focus:border-flag-blue";

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { county, category, cost, day } = await searchParams;

  const all = await prisma.listing.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { name: "asc" },
  });

  const listings = all.filter((l) => {
    if (county && l.county !== county) return false;
    if (category && l.category !== category) return false;
    if (cost && l.cost !== cost) return false;
    if (day) {
      const days = Array.isArray(l.days) ? (l.days as string[]) : [];
      if (!days.includes(day)) return false;
    }
    return true;
  });

  const hasFilters = Boolean(county || category || cost || day);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      {listings.length > 0 && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              itemListSchema(listings.map((l) => ({ name: l.name, path: `/${l.slug}` }))),
            ),
          }}
        />
      )}
      <Breadcrumbs crumbs={[{ name: "Home", path: "/" }, { name: "Directory", path: "/directory" }]} />
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Directory</h1>
      <p className="mt-2 text-lg text-ink-muted">
        Free and low-cost things to do, all across Chicagoland.
      </p>

      <form
        method="get"
        className="mt-6 flex flex-wrap gap-3 rounded-card bg-flag-blue-tint p-4"
      >
        <select
          name="county"
          aria-label="Filter by county"
          defaultValue={county ?? ""}
          className={selectClass}
        >
          <option value="">All counties</option>
          {COUNTIES.map((c) => (
            <option key={c} value={c}>
              {c} County
            </option>
          ))}
        </select>

        <select
          name="category"
          aria-label="Filter by category"
          defaultValue={category ?? ""}
          className={selectClass}
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label}
            </option>
          ))}
        </select>

        <select
          name="cost"
          aria-label="Filter by cost"
          defaultValue={cost ?? ""}
          className={selectClass}
        >
          <option value="">Any cost</option>
          <option value="FREE">Free</option>
          <option value="LOW_COST">$</option>
          <option value="PAID">$$</option>
        </select>

        <select
          name="day"
          aria-label="Filter by day"
          defaultValue={day ?? ""}
          className={selectClass}
        >
          <option value="">Any day</option>
          {DAYS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="min-h-12 rounded-pill bg-flag-blue-ink px-6 text-base font-bold text-white"
        >
          Filter
        </button>
        {hasFilters && (
          <Link
            href="/directory"
            className="flex min-h-12 items-center rounded-pill px-4 text-base font-semibold text-ink-muted no-underline hover:bg-white"
          >
            Clear
          </Link>
        )}
      </form>

      <p className="mt-6 text-base font-semibold text-ink-muted">
        {listings.length} result{listings.length === 1 ? "" : "s"}
      </p>

      {listings.length === 0 ? (
        <p className="mt-4 text-lg text-ink-muted">
          Nothing matches yet — try clearing a filter.
        </p>
      ) : (
        <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((l) => (
            <li key={l.id}>
              <ListingCard listing={l} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
