import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedListingsSafe } from "@/lib/db";
import { COUNTIES } from "@/lib/counties";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import CostBadge from "@/components/CostBadge";

// A dedicated hub for a broader, distinct search phrase ("senior activity
// centers") than the existing /category/senior-center-events page targets
// ("senior center events"). Same underlying 135 listings -- this page's job
// is different: a scannable, area-grouped directory of the centers
// themselves (name, place, one line, link out), not a flat program grid.
// That structural difference, plus a different title/H1/meta, is what
// keeps this from just being a second copy of the category page.
const TITLE = "Senior Activity Centers in Chicagoland";

export async function generateMetadata(): Promise<Metadata> {
  const all = await getPublishedListingsSafe();
  const centers = all.filter((l) => l.category === "senior-center-events");
  const year = new Date().getFullYear();
  const title = `${TITLE} (${year}) — ${centers.length} Centers`;
  const description = `Every senior activity center in Chicagoland's free directory, grouped by county -- ${centers.length} senior centers and township senior offices with what they offer and a direct link to each one.`;
  return {
    title,
    description,
    alternates: { canonical: "/senior-activity-centers-chicagoland" },
    openGraph: { title, description },
  };
}

export default async function SeniorActivityCentersPage() {
  const all = await getPublishedListingsSafe();
  const centers = all.filter((l) => l.category === "senior-center-events");

  const groups = COUNTIES.map((county) => ({
    county,
    centers: centers
      .filter((c) => c.county === county)
      .sort((a, b) => (a.city || a.neighborhood || "").localeCompare(b.city || b.neighborhood || "") || a.name.localeCompare(b.name)),
  })).filter((g) => g.centers.length > 0);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Senior Activity Centers", path: "/senior-activity-centers-chicagoland" },
  ];

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
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
            itemListSchema(centers.map((c) => ({ name: c.name, path: `/${c.slug}` }))),
          ),
        }}
      />
      <Breadcrumbs crumbs={crumbs} />

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{TITLE}</h1>

      <p className="mt-4 text-lg leading-relaxed text-ink">
        {centers.length} senior centers and township senior offices across Chicagoland, grouped by
        county — each one a real, verified organization with its own calendar of card games, fitness
        classes, bingo, day trips, and drop-in socializing. See the full{" "}
        <Link href="/category/senior-center-events" className="font-semibold text-flag-blue-ink no-underline hover:underline">
          senior center events directory →
        </Link>{" "}
        to browse by activity instead of by area.
      </p>

      {groups.map((group) => (
        <section key={group.county} className="mt-10">
          <h2 className="text-xl font-extrabold tracking-tight text-ink">
            {group.county} County ({group.centers.length})
          </h2>
          <ul className="mt-4 flex flex-col gap-3">
            {group.centers.map((center) => (
              <li key={center.id} className="rounded-card bg-card p-4 shadow-sm ring-1 ring-black/5">
                <Link
                  href={`/${center.slug}`}
                  className="text-lg font-bold text-flag-blue-ink no-underline hover:underline"
                >
                  {center.name}
                </Link>
                <span className="ml-2 inline-block">
                  <CostBadge cost={center.cost} />
                </span>
                <p className="mt-1 text-base text-ink-muted">
                  {center.neighborhood ? `${center.neighborhood}, ` : ""}
                  {center.city || `${center.county} County`}
                </p>
                <p className="mt-1 text-base text-ink">{center.description}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <p className="mt-14 border-t border-flag-blue-tint-2 pt-6 text-base text-ink-muted">
        Every listing above links to its own page with hours, registration, and accessibility details,
        verified against the organization&apos;s own site. Details change — confirm current programs
        and schedules directly with each center.
      </p>

      <p className="mt-8">
        <Link href="/directory" className="text-base font-semibold text-flag-blue-ink no-underline hover:underline">
          ← Back to the free directory
        </Link>
      </p>
    </main>
  );
}
