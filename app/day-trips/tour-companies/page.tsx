import type { Metadata } from "next";
import Link from "next/link";
import { ORGANIZED_TRIP_PROVIDERS } from "@/lib/organizedTrips";
import { breadcrumbSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import OrganizedTripProviderCard from "@/components/OrganizedTripProviderCard";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";

const TITLE = "Guided Senior Tour Companies from Chicago";
const DESCRIPTION =
  "Motorcoach and educational tour companies running trips for Chicago-area seniors — who they are, typical cost, and how to book. Not tied to any one suburb.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/day-trips/tour-companies" },
  openGraph: { title: TITLE, description: DESCRIPTION },
};

export default function TourCompaniesPage() {
  const companies = ORGANIZED_TRIP_PROVIDERS.filter((p) => p.group === "tour-company");

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Day Trips", path: "/guides/day-trips-from-chicago" },
    { name: "Tour Companies", path: "/day-trips/tour-companies" },
  ];

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }}
      />
      <Breadcrumbs crumbs={crumbs} />

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{TITLE}</h1>
      <p className="mt-4 text-lg leading-relaxed text-ink">
        Unlike park district and township trips, these companies aren&apos;t tied to any one suburb — they
        run scheduled trips from pickup points across the Chicago area. We list every legitimate operator
        we can verify, whether or not they have an affiliate program with us, because a good option is a
        good option. This list will grow as more operators are added.
      </p>

      <div className="mt-4">
        <AffiliateDisclosure />
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {companies.map((c) => (
          <OrganizedTripProviderCard key={c.slug} provider={c} />
        ))}
      </div>

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
