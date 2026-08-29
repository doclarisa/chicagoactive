import type { Metadata } from "next";
import Link from "next/link";
import { SENIOR_PROGRAMMED_CLUBS, GENERAL_CLUBS, UNVERIFIED_LEADS, TOTAL_LOCATION_COUNT } from "@/lib/pickleballClubs";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import PickleballClubCard from "@/components/PickleballClubCard";

const TITLE = "Indoor Pickleball Facilities in Chicagoland";
const DESCRIPTION =
  "Dedicated, commercial indoor pickleball clubs near Chicago — which ones have real senior-specific leagues or hours, verified against each club's own site.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides/pickleball-facilities" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "article" },
  robots: { index: true, follow: true },
};

export default function PickleballFacilitiesPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Pickleball & Fitness", path: "/category/pickleball-fitness" },
    { name: "Indoor Pickleball Facilities", path: "/guides/pickleball-facilities" },
  ];

  const allClubs = [...SENIOR_PROGRAMMED_CLUBS, ...GENERAL_CLUBS];

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }}
      />
      {allClubs.map((club) =>
        club.locations.map((loc) => (
          <script
            key={`${club.slug}-${loc.address}`}
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                localBusinessSchema({ name: club.name, address: loc.address, sourceUrl: club.sourceUrl }),
              ),
            }}
          />
        )),
      )}

      <Breadcrumbs crumbs={crumbs} />

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{TITLE}</h1>

      <p className="mt-4 text-lg leading-relaxed text-ink">
        Park district pickleball is already covered in the free directory — see the{" "}
        <Link
          href="/activities/pickleball-for-seniors"
          className="font-semibold text-flag-blue-ink no-underline hover:underline"
        >
          Pickleball for Seniors
        </Link>{" "}
        collection for those. This page is a different category: dedicated, commercial indoor pickleball
        clubs, private businesses rather than government programs. Chicagoland&apos;s indoor pickleball
        market is expanding fast — this covers {TOTAL_LOCATION_COUNT} locations across {allClubs.length}{" "}
        distinct clubs, verified directly against each one&apos;s own site.
      </p>

      <div className="mt-6 rounded-card bg-flag-blue-tint px-5 py-4 text-base text-flag-blue-ink">
        <p className="font-bold">Most of these are general-audience, not senior-specific.</p>
        <p className="mt-1">
          Only 2 of the {allClubs.length} clubs below have a named senior program or discount. The rest are
          open to all ages — still worth knowing about, since weekday daytime hours at any of these tend to
          be quieter and less competitive, which is often what makes them appealing regardless of age.
        </p>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">Senior-specific programming</h2>
        <div className="mt-5 flex flex-col gap-4">
          {SENIOR_PROGRAMMED_CLUBS.map((club) => (
            <PickleballClubCard key={club.slug} club={club} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">General facilities</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          Real, fetch-verified clubs with no age-specific programming found on their own sites as of this
          research — that can change, so check directly if a senior discount or league matters to you.
        </p>
        <div className="mt-5 flex flex-col gap-4">
          {GENERAL_CLUBS.map((club) => (
            <PickleballClubCard key={club.slug} club={club} />
          ))}
        </div>
      </section>

      {UNVERIFIED_LEADS.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-ink">Reported, unconfirmed</h2>
          <p className="mt-2 text-base leading-relaxed text-ink-muted">
            Named on court-finder aggregators and local press with a real address, but the operator&apos;s
            own site blocks automated verification entirely — call ahead before relying on any pricing or
            schedule claim.
          </p>
          <div className="mt-4 flex flex-col gap-3">
            {UNVERIFIED_LEADS.map((lead) => (
              <div key={lead.name} className="rounded-card border-2 border-dashed border-ink-muted bg-white p-4">
                <p className="font-bold text-ink">{lead.name}</p>
                <p className="mt-1 text-base text-ink-muted">{lead.address}</p>
                <p className="mt-1 text-sm text-ink-muted">{lead.note}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-14 border-t border-flag-blue-tint-2 pt-8">
        <h2 className="text-xl font-bold text-ink">More ways to stay active</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/activities/pickleball-for-seniors"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Pickleball for Seniors →</span>
            <span className="text-base text-ink-muted">Free park-district pickleball, county by county</span>
          </Link>
          <Link
            href="/guides/medicare-fitness-gyms"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Medicare Fitness Benefit Gyms →</span>
            <span className="text-base text-ink-muted">
              SilverSneakers, Renew Active, and Silver&amp;Fit gyms near you
            </span>
          </Link>
        </div>
      </section>

      <p className="mt-14 border-t border-flag-blue-tint-2 pt-6 text-base text-ink-muted">
        Every club above was checked directly against its own website. Membership pricing, court counts, and
        senior-specific programming can change — confirm current details with the club before you go.
      </p>

      <p className="mt-8">
        <Link href="/directory" className="text-base font-semibold text-flag-blue-ink no-underline hover:underline">
          ← Back to the free directory
        </Link>
      </p>
    </main>
  );
}
