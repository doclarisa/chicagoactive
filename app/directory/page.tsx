import Link from "next/link";
import { prisma } from "@/lib/db";
import { CATEGORIES, categoryLabel } from "@/lib/categories";
import { COUNTIES } from "@/lib/counties";
import { DAYS } from "@/lib/days";

type SearchParams = {
  county?: string;
  category?: string;
  cost?: string;
  day?: string;
};

const COST_LABELS: Record<string, string> = {
  FREE: "Free",
  LOW_COST: "$",
  PAID: "$$",
};

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

  return (
    <main style={{ padding: 32, fontFamily: "sans-serif" }}>
      <h1>Directory</h1>

      <form method="get" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
        <select name="county" defaultValue={county ?? ""}>
          <option value="">All counties</option>
          {COUNTIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select name="category" defaultValue={category ?? ""}>
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label}
            </option>
          ))}
        </select>

        <select name="cost" defaultValue={cost ?? ""}>
          <option value="">Any cost</option>
          <option value="FREE">Free</option>
          <option value="LOW_COST">$</option>
          <option value="PAID">$$</option>
        </select>

        <select name="day" defaultValue={day ?? ""}>
          <option value="">Any day</option>
          {DAYS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <button type="submit">Filter</button>
        <a href="/directory">Clear</a>
      </form>

      <p>
        {listings.length} result{listings.length === 1 ? "" : "s"}
      </p>

      <ul>
        {listings.map((l) => (
          <li key={l.id} style={{ marginBottom: 12 }}>
            <Link href={`/${l.slug}`}>{l.name}</Link> — {categoryLabel(l.category)} ·{" "}
            {l.neighborhood ? `${l.neighborhood}, ` : ""}
            {l.county} County · {COST_LABELS[l.cost]}
            {l.days ? ` · ${(l.days as string[]).join("/")}` : ""}
          </li>
        ))}
      </ul>
    </main>
  );
}
