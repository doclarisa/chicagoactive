import type { Metadata } from "next";
import Link from "next/link";
import { DAY_TRIPS } from "@/lib/dayTrips";
import { AFFILIATES } from "@/lib/affiliates";
import { breadcrumbSchema, touristAttractionSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import AffiliateLink from "@/components/AffiliateLink";

const TITLE = "Day Trips from Chicago for Active Adults 55+";
const DESCRIPTION =
  "13 verified day trips from Chicago for active seniors — driving and train times, honest walking difficulty, senior discounts, and where to eat, for destinations reachable in about a day.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides/day-trips-from-chicago" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "article" },
  // Real, verified content — unlike the site's other affiliate guides,
  // this one is meant to rank. See lib/dayTrips.ts for sourcing.
  robots: { index: true, follow: true },
};

export default function DayTripsPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Day Trips", path: "/guides/day-trips-from-chicago" },
  ];

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
        Some days you want someone else to worry about the driving — or you just want a change of scenery
        without committing to a whole vacation. Every trip below is doable in a day, easy enough on the body
        that we tell you honestly when it isn&apos;t, and worth the drive or the train ticket. Where a train
        or Metra line gets you there without touching the highway, we say so first.
      </p>

      <div className="mt-4">
        <AffiliateDisclosure />
      </div>

      <div className="mt-10 flex flex-col gap-8">
        {DAY_TRIPS.map((trip) => (
          <article
            key={trip.slug}
            id={trip.slug}
            className="rounded-card bg-card p-6 shadow-sm ring-1 ring-black/5"
          >
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">
              {trip.name}
              <span className="ml-2 text-base font-semibold text-ink-muted">{trip.state}</span>
            </h2>
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

      <section className="mt-14 border-t border-flag-blue-tint-2 pt-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">
          Guided &amp; multi-day trips for active retirees
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          Everything above is a there-and-back day trip you can do on your own. For something longer — a
          national park, a festival weekend, a multi-day educational tour — these are the trip-planning
          programs built specifically for active older travelers.
        </p>
        <div className="mt-5 rounded-card bg-card p-5 shadow-sm ring-1 ring-black/5">
          <h3 className="text-lg font-bold text-ink">{AFFILIATES.roadScholar.label}</h3>
          <p className="mt-1 text-base text-ink-muted">{AFFILIATES.roadScholar.blurb}</p>
          <div className="mt-4">
            {/* AFFILIATE: replace with the real Road Scholar affiliate URL once signed up */}
            <AffiliateLink href={AFFILIATES.roadScholar.url} variant="primary">
              Explore {AFFILIATES.roadScholar.label} tours →
            </AffiliateLink>
          </div>
        </div>
      </section>

      <p className="mt-10 border-t border-flag-blue-tint-2 pt-6 text-base text-ink-muted">
        Every trip above was checked against its own official site, a state or city tourism site, or
        Metra/Amtrak directly — not estimated. Details change: confirm hours, prices, and current senior
        discounts before you go, and see each destination&apos;s own site (linked above) for its live
        calendar.
      </p>

      <p className="mt-8">
        <Link href="/directory" className="text-base font-semibold text-flag-blue-ink no-underline hover:underline">
          ← Back to the free directory
        </Link>
      </p>
    </main>
  );
}
