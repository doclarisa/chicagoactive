import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ORGANIZED_TRIP_PROVIDERS,
  COUNTY_SPOKES,
  countySpokeBySlug,
  countySpokeSlugForCounty,
} from "@/lib/organizedTrips";
import { breadcrumbSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import OrganizedTripProviderCard from "@/components/OrganizedTripProviderCard";

export function generateStaticParams() {
  return COUNTY_SPOKES.map((s) => ({ spoke: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ spoke: string }>;
}): Promise<Metadata> {
  const { spoke: spokeSlug } = await params;
  const spoke = countySpokeBySlug(spokeSlug);
  if (!spoke) return {};
  const description = `Park districts, townships, and senior centers running organized group day trips in ${spoke.label} — cost, who can join, and how to sign up, with links to each organizer's current schedule.`;
  return {
    title: spoke.metaTitle,
    description,
    alternates: { canonical: `/day-trips/${spoke.slug}` },
    openGraph: { title: spoke.metaTitle, description },
  };
}

export default async function CountySpokePage({
  params,
}: {
  params: Promise<{ spoke: string }>;
}) {
  const { spoke: spokeSlug } = await params;
  const spoke = countySpokeBySlug(spokeSlug);
  if (!spoke) notFound();

  const providers = ORGANIZED_TRIP_PROVIDERS.filter(
    (p) => p.county && countySpokeSlugForCounty(p.county) === spoke.slug,
  );
  const parkDistricts = providers.filter((p) => p.group === "park-district");
  const townships = providers.filter((p) => p.group === "township-senior-center");

  const siblingSpokes = COUNTY_SPOKES.filter((s) => s.slug !== spoke.slug).slice(0, 3);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Day Trips", path: "/guides/day-trips-from-chicago" },
    { name: spoke.label, path: `/day-trips/${spoke.slug}` },
  ];

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }}
      />
      <Breadcrumbs crumbs={crumbs} />

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        {spoke.label === "Other Chicagoland Areas" ? spoke.label : `${spoke.label} Senior Day Trips`}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-ink">
        {providers.length} organized group trip programs
        {spoke.counties.length > 1
          ? ` across ${spoke.counties.join(", ")} Counties`
          : ` in ${spoke.label}`}
        , run by park districts, townships, and senior centers — someone else drives, you just show up.
        Trip dates go stale fast, so every organizer below is described by the program they run, with a
        link to their own live schedule.
      </p>

      {parkDistricts.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">Park Districts ({parkDistricts.length})</h2>
          <div className="mt-4 flex flex-col gap-4">
            {parkDistricts.map((p) => (
              <OrganizedTripProviderCard key={p.slug} provider={p} />
            ))}
          </div>
        </section>
      )}

      {townships.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">
            Townships &amp; Senior Centers ({townships.length})
          </h2>
          <div className="mt-4 flex flex-col gap-4">
            {townships.map((p) => (
              <OrganizedTripProviderCard key={p.slug} provider={p} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-14 border-t border-flag-blue-tint-2 pt-6">
        <h2 className="text-xl font-extrabold tracking-tight text-ink">Nearby areas</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {siblingSpokes.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/day-trips/${s.slug}`}
                className="inline-flex min-h-10 items-center rounded-pill border border-flag-blue-tint-2 bg-white px-4 text-base font-semibold text-flag-blue-ink no-underline hover:bg-flag-blue-tint"
              >
                {s.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/day-trips/tour-companies"
              className="inline-flex min-h-10 items-center rounded-pill border border-flag-blue-tint-2 bg-white px-4 text-base font-semibold text-flag-blue-ink no-underline hover:bg-flag-blue-tint"
            >
              🚌 Guided tour companies
            </Link>
          </li>
        </ul>
      </section>

      <p className="mt-8">
        <Link
          href="/guides/day-trips-from-chicago"
          className="text-base font-semibold text-flag-blue-ink no-underline hover:underline"
        >
          ← Back to Day Trips from Chicago
        </Link>
      </p>
    </main>
  );
}
