import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { CITIES, cityBySlug } from "@/lib/cities";
import ListingCard from "@/components/ListingCard";
import NearbyListingRow from "@/components/NearbyListingRow";
import Breadcrumbs from "@/components/Breadcrumbs";
import { itemListSchema } from "@/lib/schema";
import { haversineMiles, centroid, formatDistance, type GeoPoint } from "@/lib/geo";

const RADIUS_MILES = 6;
const NEARBY_CAP = 12;
const NEAREST_CITIES_CAP = 6;

export function generateStaticParams() {
  return CITIES.map((c) => ({ citySlug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}) {
  const { citySlug } = await params;
  const city = cityBySlug(citySlug);
  if (!city) return {};
  const description = `Free and low-cost things to do for active adults 50+ in ${city.name}, ${city.county} County, plus nearby options within 6 miles.`;
  return {
    title: `Senior Activities in ${city.name}, IL`,
    description,
    alternates: { canonical: `/city/${city.slug}` },
    openGraph: { title: `Senior Activities in ${city.name}, IL`, description },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}) {
  const { citySlug } = await params;
  const city = cityBySlug(citySlug);
  if (!city) notFound();

  const all = await prisma.listing.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { name: "asc" },
  });

  const own = all.filter((l) => l.citySlug === city.slug);

  const ownPoints: GeoPoint[] = own
    .filter((l) => l.lat != null && l.lng != null)
    .map((l) => ({ lat: l.lat as number, lng: l.lng as number }));
  const cityCentroid = centroid(ownPoints);

  const nearby = cityCentroid
    ? all
        .filter((l) => l.citySlug !== city.slug && l.lat != null && l.lng != null)
        .map((l) => ({
          listing: l,
          distance: haversineMiles(cityCentroid, { lat: l.lat as number, lng: l.lng as number }),
        }))
        .filter((r) => r.distance <= RADIUS_MILES)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, NEARBY_CAP)
    : [];

  // Mesh: nearest other qualifying cities, by centroid-to-centroid distance.
  const otherCentroids = CITIES.filter((c) => c.slug !== city.slug)
    .map((c) => {
      const pts: GeoPoint[] = all
        .filter((l) => l.citySlug === c.slug && l.lat != null && l.lng != null)
        .map((l) => ({ lat: l.lat as number, lng: l.lng as number }));
      const ct = centroid(pts);
      return ct ? { city: c, distance: cityCentroid ? haversineMiles(cityCentroid, ct) : Infinity } : null;
    })
    .filter((x): x is { city: (typeof CITIES)[number]; distance: number } => x !== null)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, NEAREST_CITIES_CAP);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      {own.length > 0 && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              itemListSchema(own.map((l) => ({ name: l.name, path: `/${l.slug}` }))),
            ),
          }}
        />
      )}
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Areas", path: "/areas" },
          { name: city.name, path: `/city/${city.slug}` },
        ]}
      />

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Senior Activities in {city.name}
      </h1>

      <p className="mt-4 text-lg leading-relaxed text-ink">{city.intro}</p>

      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {own.map((l) => (
          <li key={l.id}>
            <ListingCard listing={l} />
          </li>
        ))}
      </ul>

      {nearby.length > 0 && (
        <section className="mt-14 border-t border-flag-blue-tint-2 pt-6">
          <h2 className="text-xl font-extrabold tracking-tight text-ink">
            Nearby, within {RADIUS_MILES} miles
          </h2>
          <p className="mt-1 text-base text-ink-muted">
            Municipal boundaries aren&apos;t how anyone actually drives — here&apos;s what&apos;s
            close by.
          </p>
          <ul className="mt-4 space-y-2">
            {nearby.map(({ listing, distance }) => (
              <li key={listing.id}>
                <NearbyListingRow
                  name={listing.name}
                  slug={listing.slug}
                  city={listing.city || listing.neighborhood || `${listing.county} County`}
                  distanceLabel={formatDistance(distance, listing.geoPrecision)}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {otherCentroids.length > 0 && (
        <section className="mt-14 border-t border-flag-blue-tint-2 pt-6">
          <h2 className="text-xl font-extrabold tracking-tight text-ink">Nearby cities</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {otherCentroids.map(({ city: c }) => (
              <li key={c.slug}>
                <Link
                  href={`/city/${c.slug}`}
                  className="inline-flex min-h-10 items-center rounded-pill border border-flag-blue-tint-2 bg-white px-4 text-base font-semibold text-flag-blue-ink no-underline hover:bg-flag-blue-tint"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
