import Link from "next/link";
import { prisma } from "@/lib/db";
import { CATEGORIES } from "@/lib/categories";
import { COUNTIES } from "@/lib/counties";
import { DAYS } from "@/lib/days";
import { categoryStyle } from "@/lib/categoryStyles";
import CategoryBadge from "@/components/CategoryBadge";
import CostBadge from "@/components/CostBadge";

type SearchParams = {
  county?: string;
  category?: string;
  cost?: string;
  day?: string;
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
      <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Directory</h1>
      <p className="mt-2 text-lg text-ink-muted">
        Free and low-cost things to do, all across Chicagoland.
      </p>

      <form
        method="get"
        className="mt-6 flex flex-wrap gap-3 rounded-card bg-flag-blue-tint p-4"
      >
        <select name="county" defaultValue={county ?? ""} className={selectClass}>
          <option value="">All counties</option>
          {COUNTIES.map((c) => (
            <option key={c} value={c}>
              {c} County
            </option>
          ))}
        </select>

        <select name="category" defaultValue={category ?? ""} className={selectClass}>
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label}
            </option>
          ))}
        </select>

        <select name="cost" defaultValue={cost ?? ""} className={selectClass}>
          <option value="">Any cost</option>
          <option value="FREE">Free</option>
          <option value="LOW_COST">$</option>
          <option value="PAID">$$</option>
        </select>

        <select name="day" defaultValue={day ?? ""} className={selectClass}>
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
          {listings.map((l) => {
            const style = categoryStyle(l.category);
            const days = Array.isArray(l.days) ? (l.days as string[]) : [];
            return (
              <li key={l.id}>
                <Link
                  href={`/${l.slug}`}
                  className="flex h-full flex-col gap-3 rounded-card bg-card p-5 no-underline shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md"
                >
                  <div
                    className={`flex h-24 items-center justify-center rounded-card ${style.tint} text-4xl`}
                    aria-hidden="true"
                  >
                    {style.icon}
                  </div>
                  <CategoryBadge category={l.category} />
                  <h2 className="text-lg font-bold leading-snug text-ink">{l.name}</h2>
                  <p className="text-base text-ink-muted">
                    {l.neighborhood ? `${l.neighborhood}, ` : ""}
                    {l.county} County
                    {days.length > 0 ? ` · ${days.join("/")}` : ""}
                  </p>
                  <div className="mt-auto pt-1">
                    <CostBadge cost={l.cost} />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
