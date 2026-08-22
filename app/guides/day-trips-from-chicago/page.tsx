import type { Metadata } from "next";
import Link from "next/link";
import { DAY_TRIPS, type DayTrip } from "@/lib/dayTrips";
import { ORGANIZED_TRIP_PROVIDERS, COUNTY_SPOKES } from "@/lib/organizedTrips";
import { breadcrumbSchema, touristAttractionSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import AffiliateLink from "@/components/AffiliateLink";

const TITLE = "Day Trips from Chicago for Seniors";
const DESCRIPTION =
  "Two ways to take a day trip from Chicago: organized group trips run by park districts, senior centers, and tour companies (browse by county), or verified destinations to plan yourself.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides/day-trips-from-chicago" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "article" },
  // Real, verified content — unlike the site's other affiliate guides,
  // this one is meant to rank. See lib/organizedTrips.ts and lib/dayTrips.ts
  // for sourcing.
  robots: { index: true, follow: true },
};

const REGION_LABELS: Record<DayTrip["region"], string> = {
  North: "North — Wisconsin & the North Shore",
  West: "West — Fox Valley & Galena",
  South: "South — Indiana Dunes & Starved Rock",
};
const REGION_ORDER: DayTrip["region"][] = ["North", "West", "South"];

export default function DayTripsPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Day Trips", path: "/guides/day-trips-from-chicago" },
  ];

  const organizedCount = ORGANIZED_TRIP_PROVIDERS.length;
  const tourCompanyCount = ORGANIZED_TRIP_PROVIDERS.filter((p) => p.group === "tour-company").length;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }}
      />
      {DAY_TRIPS.map((trip) => (
        <script
          key={trip.slug}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              touristAttractionSchema({
                name: trip.name,
                state: trip.state,
                blurb: trip.blurb,
                sourceUrl: trip.sourceUrl,
              }),
            ),
          }}
        />
      ))}

      <Breadcrumbs crumbs={crumbs} />

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{TITLE}</h1>

      <p className="mt-4 text-lg leading-relaxed text-ink">
        There are two ways to take a day trip from Chicago: join an organized group trip and let someone
        else drive, or set your own pace and drive yourself. Pick one below.
      </p>

      {/* The choice, up front — not a wall of text first. */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <a
          href="#organized"
          className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
        >
          <span className="text-2xl" aria-hidden="true">
            🚌
          </span>
          <span className="text-lg font-bold text-ink">Let someone else drive</span>
          <span className="text-base text-ink-muted">
            {organizedCount} organized group trips — park districts, senior centers, and tour companies
          </span>
        </a>
        <a
          href="#self-guided"
          className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
        >
          <span className="text-2xl" aria-hidden="true">
            🚗
          </span>
          <span className="text-lg font-bold text-ink">Drive yourself</span>
          <span className="text-base text-ink-muted">
            {DAY_TRIPS.length} self-guided destinations, grouped by direction from Chicago
          </span>
        </a>
      </div>

      <div className="mt-4">
        <AffiliateDisclosure />
      </div>

      {/* ================= SECTION 1: Organized group trips — landing, not the full list ================= */}
      <section id="organized" className="mt-10 scroll-mt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">
          🚌 Let someone else drive: organized group trips
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          {organizedCount} organizers across the Chicago area, park districts and townships first — browse
          by where you live.
        </p>

        <h3 className="mt-8 text-xl font-bold text-ink">Organized trips by area</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {COUNTY_SPOKES.map((spoke) => {
            const count = ORGANIZED_TRIP_PROVIDERS.filter(
              (p) => p.county && spoke.counties.includes(p.county),
            ).length;
            return (
              <Link
                key={spoke.slug}
                href={`/day-trips/${spoke.slug}`}
                className="flex flex-col gap-1 rounded-card bg-card p-5 no-underline shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md"
              >
                <span className="text-lg font-bold text-ink">{spoke.label}</span>
                <span className="text-base text-ink-muted">
                  {count} organizer{count === 1 ? "" : "s"}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Visually distinct from the county cards — a different kind of option. */}
        <h3 className="mt-10 text-xl font-bold text-ink">Not tied to one area</h3>
        <Link
          href="/day-trips/tour-companies"
          className="mt-4 flex flex-col gap-1 rounded-card border-2 border-flag-blue-ink bg-white p-5 no-underline transition-shadow hover:shadow-md sm:max-w-sm"
        >
          <span className="text-2xl" aria-hidden="true">
            🚌
          </span>
          <span className="text-lg font-bold text-ink">Guided tour companies</span>
          <span className="text-base text-ink-muted">
            {tourCompanyCount} motorcoach &amp; educational tour operators serving the whole Chicago area
          </span>
        </Link>
      </section>

      {/* ================= SECTION 2: Self-guided destinations ================= */}
      <section id="self-guided" className="mt-16 scroll-mt-6 border-t border-flag-blue-tint-2 pt-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">
          🚗 Drive yourself: best day-trip destinations
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          {DAY_TRIPS.length} destinations within about a day&apos;s reach, grouped by direction from
          Chicago — each with real driving and train times, honest walking difficulty, cost, and where to
          eat.
        </p>

        {REGION_ORDER.map((region) => {
          const trips = DAY_TRIPS.filter((t) => t.region === region);
          if (trips.length === 0) return null;
          return (
            <div key={region} className="mt-10">
              <h3 className="text-xl font-bold text-ink">
                {REGION_LABELS[region]} ({trips.length})
              </h3>
              <div className="mt-6 flex flex-col gap-8">
                {trips.map((trip) => (
                  <article
                    key={trip.slug}
                    id={trip.slug}
                    className="rounded-card bg-card p-6 shadow-sm ring-1 ring-black/5"
                  >
                    <h4 className="text-2xl font-extrabold tracking-tight text-ink">
                      {trip.name}
                      <span className="ml-2 text-base font-semibold text-ink-muted">{trip.state}</span>
                    </h4>
                    <p className="mt-2 text-lg leading-relaxed text-ink">{trip.blurb}</p>

                    <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 text-base text-ink sm:grid-cols-2">
                      <div>
                        <dt className="font-semibold text-ink">Getting there</dt>
                        <dd className="mt-0.5 text-ink-muted">
                          {trip.gettingThere.drivingMiles} mi drive — {trip.gettingThere.drivingTime}
                          {trip.gettingThere.train && (
                            <>
                              <br />
                              🚆 {trip.gettingThere.train}
                            </>
                          )}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-ink">How long you need</dt>
                        <dd className="mt-0.5 text-ink-muted">{trip.timeNeeded}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="font-semibold text-ink">Walking &amp; accessibility</dt>
                        <dd className="mt-0.5 text-ink-muted">{trip.walking}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-ink">Cost</dt>
                        <dd className="mt-0.5 text-ink-muted">{trip.cost}</dd>
                      </div>
                      {trip.seniorDiscount && (
                        <div>
                          <dt className="font-semibold text-ink">Senior discount</dt>
                          <dd className="mt-0.5 text-ink-muted">{trip.seniorDiscount}</dd>
                        </div>
                      )}
                      <div className="sm:col-span-2">
                        <dt className="font-semibold text-ink">Best time to go</dt>
                        <dd className="mt-0.5 text-ink-muted">{trip.bestTime}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="font-semibold text-ink">Food nearby</dt>
                        <dd className="mt-0.5 text-ink-muted">
                          <span className="font-semibold text-ink">{trip.food.name}</span> — {trip.food.note}
                        </dd>
                      </div>
                    </dl>

                    {trip.verifyNotes && trip.verifyNotes.length > 0 && (
                      <div className="mt-4 rounded-card bg-flag-blue-tint px-4 py-3 text-base text-flag-blue-ink">
                        {trip.verifyNotes.map((note) => (
                          <p key={note}>Verify — {note}</p>
                        ))}
                      </div>
                    )}

                    <div className="mt-5 flex flex-wrap gap-3">
                      <a
                        href={trip.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center justify-center rounded-pill border-2 border-flag-blue-ink px-5 text-base font-bold text-flag-blue-ink no-underline"
                      >
                        Official site &amp; current hours →
                      </a>
                      {trip.bookingUrl && (
                        // AFFILIATE: replace with Viator/GetYourGuide link once signed up
                        <AffiliateLink href={trip.bookingUrl} variant="secondary">
                          Book a tour or tickets →
                        </AffiliateLink>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <p className="mt-14 border-t border-flag-blue-tint-2 pt-6 text-base text-ink-muted">
        Organized-trip programs and destinations above were checked against each organization&apos;s own
        official site, a state or city tourism site, or Metra/Amtrak directly — not estimated. Details
        change: confirm current prices, schedules, and eligibility before you go, and see each
        organizer&apos;s own site (linked above) for its live calendar.
      </p>

      <p className="mt-8">
        <Link href="/directory" className="text-base font-semibold text-flag-blue-ink no-underline hover:underline">
          ← Back to the free directory
        </Link>
      </p>
    </main>
  );
}
