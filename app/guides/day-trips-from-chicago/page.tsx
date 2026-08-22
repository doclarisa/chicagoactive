import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { DAY_TRIPS } from "@/lib/dayTrips";
import { DAY_TRIP_OPERATORS } from "@/lib/dayTripOperators";
import { AFFILIATES } from "@/lib/affiliates";
import { breadcrumbSchema, touristAttractionSchema } from "@/lib/schema";
import { operatorTypeLabel } from "@/lib/operatorTypes";
import Breadcrumbs from "@/components/Breadcrumbs";
import CostBadge from "@/components/CostBadge";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import AffiliateLink from "@/components/AffiliateLink";

const TITLE = "Day Trips from Chicago for Active Adults 55+";
const DESCRIPTION =
  "Who runs organized group day trips for Chicagoland seniors — park districts, senior centers, and motorcoach tour companies — plus 13 verified destinations for planning your own trip.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides/day-trips-from-chicago" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "article" },
  // Real, verified content — unlike the site's other affiliate guides,
  // this one is meant to rank. See lib/dayTrips.ts and the live Listing
  // query below for sourcing.
  robots: { index: true, follow: true },
};

export default async function DayTripsPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Day Trips", path: "/guides/day-trips-from-chicago" },
  ];

  // Local trip organizers: pulled live from the same Listing table the rest
  // of the site uses, not hand-copied — so this list stays current as new
  // areas ship. "day-trips" activity or the day-trips-near-chicago category
  // both count. Chicago's 16 DFSS Regional/Satellite centers are combined
  // into one line below rather than listed individually — they share one
  // generic "Life Enrichment Activities" program description, the same
  // judgment call already made for the /chicago hub.
  const all = await prisma.listing.findMany({ where: { status: "PUBLISHED" } });
  const localOrganizers = all
    .filter((l) => {
      const acts = Array.isArray(l.activities) ? (l.activities as string[]) : [];
      return (acts.includes("day-trips") || l.category === "day-trips-near-chicago") && l.citySlug !== "chicago";
    })
    .sort((a, b) => (a.city ?? "").localeCompare(b.city ?? ""));

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
        The easiest day trip is the one someone else plans and drives — a coach picks you up, someone
        else worries about parking and tickets, and you just show up. Below is who actually runs those
        trips for Chicagoland seniors: local park districts and senior centers first (mostly free or
        low-cost, often resident-priority), then the regional motorcoach companies that run scheduled
        trips further afield. If you&apos;d rather plan your own trip, the destination guide further down has
        13 options with honest driving and accessibility notes.
      </p>

      <div className="mt-4">
        <AffiliateDisclosure />
      </div>

      {/* ---------- Organized group day trips ---------- */}
      <section className="mt-10">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">Organized group day trips</h2>

        <h3 className="mt-8 text-xl font-bold text-ink">Motorcoach tour companies</h3>
        <p className="mt-2 text-lg leading-relaxed text-ink">
          These run scheduled trips — casinos, Amish country, festivals, shows — with pickup along
          routes into and around Chicagoland. Specific trip dates go stale fast, so we&apos;re not listing
          them here; each company posts its current lineup on its own site.
        </p>
        <div className="mt-5 flex flex-col gap-4">
          {DAY_TRIP_OPERATORS.map((op) => (
            <div key={op.name} className="rounded-card bg-card p-5 shadow-sm ring-1 ring-black/5">
              <h4 className="text-lg font-bold text-ink">{op.name}</h4>
              <p className="mt-1 text-base text-ink-muted">{op.blurb}</p>
              <p className="mt-2 text-base text-ink-muted">
                <span className="font-semibold text-ink">How to book: </span>
                {op.howToBook}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={op.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-pill border-2 border-flag-blue-ink px-5 text-base font-bold text-flag-blue-ink no-underline"
                >
                  Current trips &amp; schedule →
                </a>
              </div>
            </div>
          ))}
        </div>

        <h3 className="mt-10 text-xl font-bold text-ink">
          Local park districts &amp; senior centers ({localOrganizers.length})
        </h3>
        <p className="mt-2 text-lg leading-relaxed text-ink">
          Most Chicagoland park districts and senior centers run their own day-trip programs as part of
          regular senior programming — often free or low-cost, and sometimes priority- or price-tiered
          for residents. Each link below goes to that organization&apos;s own program page, where their
          current trip calendar lives.
        </p>
        <p className="mt-3 text-base text-ink-muted">
          Chicago residents: the city&apos;s 16 DFSS Regional and Satellite Senior Centers all run day trips
          and tours as part of their Life Enrichment Activities —{" "}
          <a
            href="https://www.chicago.gov/city/en/depts/fss/supp_info/regional_center_information.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-flag-blue-ink underline"
          >
            find your neighborhood center →
          </a>
        </p>

        <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {localOrganizers.map((l) => (
            <li key={l.id} className="rounded-card bg-card p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-base font-bold leading-snug text-ink">{l.name}</p>
              <p className="mt-1 text-sm text-ink-muted">
                {l.city} · {operatorTypeLabel(l.operatorType ?? "")}
                {l.residentRequired === true && " · Residents only"}
                {l.residentRequired === false && " · Open to non-residents"}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <CostBadge cost={l.cost} />
                <a
                  href={l.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-flag-blue-ink underline"
                >
                  Current schedule →
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Self-guided destinations ---------- */}
      <section className="mt-16 border-t border-flag-blue-tint-2 pt-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">Prefer to plan it yourself?</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          13 destinations within about a day&apos;s reach, each with real driving and train times, honest
          walking difficulty, cost, and where to eat — for when you&apos;d rather set your own schedule.
        </p>

        <div className="mt-8 flex flex-col gap-8">
          {DAY_TRIPS.map((trip) => (
            <article
              key={trip.slug}
              id={trip.slug}
              className="rounded-card bg-card p-6 shadow-sm ring-1 ring-black/5"
            >
              <h3 className="text-2xl font-extrabold tracking-tight text-ink">
                {trip.name}
                <span className="ml-2 text-base font-semibold text-ink-muted">{trip.state}</span>
              </h3>
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
      </section>

      <section className="mt-14 border-t border-flag-blue-tint-2 pt-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">
          Guided multi-day trips for active retirees
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          For something longer than a day — a national park, a festival week, a themed educational tour —
          this is the best-known program built specifically for active older travelers. It&apos;s worth being
          upfront: this one is multi-day only, not a day-trip provider like the companies above.
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
        Local organizers above are pulled from our own directory, so this list grows as we verify more
        areas. Tour companies and destinations were checked against their own official sites, a state or
        city tourism site, or Metra/Amtrak directly — not estimated. Details change: confirm current
        prices, schedules, and senior discounts before you go.
      </p>

      <p className="mt-8">
        <Link href="/directory" className="text-base font-semibold text-flag-blue-ink no-underline hover:underline">
          ← Back to the free directory
        </Link>
      </p>
    </main>
  );
}
