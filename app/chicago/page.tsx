import { prisma } from "@/lib/db";
import ListingCard from "@/components/ListingCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { itemListSchema } from "@/lib/schema";

const DESCRIPTION =
  "Free and low-cost senior programs across Chicago — the city's 20 DFSS neighborhood senior centers plus citywide Park District, library, and museum programs for adults 50+.";

export const metadata = {
  title: "Senior Activities in Chicago",
  description: DESCRIPTION,
  alternates: { canonical: "/chicago" },
  openGraph: { title: "Senior Activities in Chicago", description: DESCRIPTION },
};

// Chicago gets one hub page, not 20 near-identical neighborhood pages — every
// DFSS satellite/regional center runs the same uniform citywide activity set,
// so per-neighborhood pages would have been a doorway pattern. This page
// aggregates all Chicago-city listings: the 20 DFSS venues (grouped by
// neighborhood) plus citywide programs that aren't tied to one center.
export default async function ChicagoHub() {
  const listings = await prisma.listing.findMany({
    where: { status: "PUBLISHED", citySlug: "chicago" },
    orderBy: { name: "asc" },
  });

  const neighborhoodCenters = listings.filter((l) => l.neighborhoodSlug !== "");
  const citywide = listings.filter((l) => l.neighborhoodSlug === "");

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
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Directory", path: "/directory" },
          { name: "Chicago", path: "/chicago" },
        ]}
      />

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Senior Activities in Chicago
      </h1>

      <p className="mt-4 text-lg leading-relaxed text-ink">
        Chicago&apos;s Department of Family and Support Services (DFSS) runs 20 satellite and
        regional senior centers across the city — from Rogers Park to Roseland — each offering
        the same core slate of fitness, computer, art, dance, day-trip, meal, and social
        programming. On top of that, citywide programs run independent of any single
        neighborhood: Chicago Park District&apos;s own senior programming, the Chicago Public
        Library&apos;s Seniors&apos; Circle, CJE SeniorLife&apos;s My Go-To Place resource, and
        discounted senior admission at the Art Institute of Chicago.
      </p>

      {neighborhoodCenters.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-extrabold tracking-tight text-ink">
            Neighborhood senior centers
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {neighborhoodCenters.map((l) => (
              <li key={l.id}>
                <ListingCard listing={l} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {citywide.length > 0 && (
        <section className="mt-14 border-t border-flag-blue-tint-2 pt-6">
          <h2 className="text-xl font-extrabold tracking-tight text-ink">Citywide programs</h2>
          <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {citywide.map((l) => (
              <li key={l.id}>
                <ListingCard listing={l} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
