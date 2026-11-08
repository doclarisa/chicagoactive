import type { Metadata } from "next";
import Link from "next/link";
import { ORGANIZED_TRIP_PROVIDERS, COUNTY_SPOKES } from "@/lib/organizedTrips";
import { breadcrumbSchema, type FaqItem } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageFaq from "@/components/PageFaq";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";

// Distinct search intent from /guides/day-trips-from-chicago: that page is
// the hub for choosing organized-vs-self-guided and browsing all organizers;
// this page targets the specific "bus trips" phrasing with content that
// doesn't exist elsewhere on the site -- how these trips actually work,
// what they cost (real, sourced examples), and the destination types that
// keep showing up -- then routes to the hub's existing county/tour-company
// pages rather than re-listing every organizer a second time.
const TITLE = "Senior Bus Trips from Chicago";
const DESCRIPTION =
  "Chartered bus and motorcoach trips for Chicagoland seniors -- how park district, township, and senior center trip programs work, what they typically cost, and the destinations that come up again and again.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides/senior-bus-trips-from-chicago" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "article" },
  robots: { index: true, follow: true },
};

const FAQS: FaqItem[] = [
  {
    question: "Are senior bus trips in Chicagoland free?",
    answer:
      "Almost never entirely free. Most park districts and townships charge an annual senior-program membership (commonly $15-35/year) plus a separate per-trip fee that covers the bus and sometimes the destination's admission or a meal. A handful of organizers don't publish exact numbers online -- call ahead for the current price.",
  },
  {
    question: "Do I have to live in that town to join a trip?",
    answer:
      "It depends on the organizer. Many park district trips are open to non-residents at a slightly higher price. Some township programs (Orland Township is one example) require a free resident ID before you can buy a ticket. Check the specific organizer's own page or call before assuming either way.",
  },
  {
    question: "How do I actually book a seat?",
    answer:
      "There's no single booking site for all of these -- each organizer runs its own calendar. Most post an upcoming-trips list on their site or in a mailed/emailed newsletter, and seats are typically first-come, first-served once registration opens. Call the number on each listing if a trip isn't posted yet.",
  },
  {
    question: "What's usually included in the price?",
    answer:
      "At minimum, round-trip transportation. Many trips bundle in the destination's admission, a meal, or an onboard credit (a Tinley Park Senior Center casino trip, for example, has run $60/person including a slot and food credit). Others charge separately for transportation and let you cover the destination yourself -- the per-trip description usually says which.",
  },
  {
    question: "What kind of destinations do these trips go to?",
    answer:
      "The same categories come up across dozens of organizers' calendars: casinos (Four Winds and similar), theater and Broadway-style matinees, Cubs/Sox and other sporting events, river or lake cruises, Amish Country, museums and gardens, and seasonal outings like holiday light tours. Specific destinations rotate seasonally, so see each organizer's current schedule rather than a fixed list.",
  },
];

export default function SeniorBusTripsPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Day Trips", path: "/guides/day-trips-from-chicago" },
    { name: "Senior Bus Trips", path: "/guides/senior-bus-trips-from-chicago" },
  ];

  const localProviders = ORGANIZED_TRIP_PROVIDERS.filter((p) => p.group !== "tour-company");
  const tourCompanies = ORGANIZED_TRIP_PROVIDERS.filter((p) => p.group === "tour-company");

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
        A &quot;senior bus trip&quot; is the classic Chicagoland day out: a chartered motorcoach, a group of
        regulars, and someone else doing the driving. Almost every one of them comes from one of three
        kinds of organizer — your local <strong>park district</strong>, your <strong>township or senior
        center</strong>, or a handful of regional <strong>motorcoach tour companies</strong> not tied to any
        one suburb. We&apos;ve verified {localProviders.length} local trip programs and {tourCompanies.length}{" "}
        tour companies against their own official sites.
      </p>

      <div className="mt-4">
        <AffiliateDisclosure />
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">How these trips actually work</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          There&apos;s no single site that lists every departure in Chicagoland — each park district,
          township, or senior center runs its own calendar, usually posted on its own site or mailed out in
          a newsletter. Most require some kind of sign-up first: a park district&apos;s senior program
          membership, a township&apos;s free resident ID, or simply calling to ask what&apos;s coming up.
          Seats are typically first-come, first-served once registration opens, so the organizer&apos;s own
          phone number (listed on every card below) is usually faster than waiting on a website to update.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">What these trips typically cost</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          Most organizers price trips two ways: an annual membership, then a separate per-trip fee that
          covers the bus and sometimes the destination. Exact pricing isn&apos;t published everywhere, but
          here&apos;s what we could verify directly from official sources:
        </p>
        <ul className="mt-4 flex flex-col gap-3 text-lg text-ink">
          <li>
            <strong>Bolingbrook Park District</strong> — per-trip fees around $14-24 depending on
            residency, on top of membership
          </li>
          <li>
            <strong>Crystal Lake Park District</strong> — past lunch-style trips around $10-13
          </li>
          <li>
            <strong>Orland Township</strong> — past examples around $15-30 for residents (a free
            resident ID is required before buying a ticket)
          </li>
          <li>
            <strong>Tinley Park Senior Center</strong> — a past Four Winds Casino trip ran about
            $60/person, including a slot and food credit
          </li>
          <li>
            <strong>Wood Dale and Rolling Meadows Park Districts</strong> — annual senior membership
            around $15-35/year, with trip costs billed separately
          </li>
        </ul>
        <p className="mt-4 text-base text-ink-muted">
          Most other organizers list trip cost as &quot;varies — see current schedule&quot; rather than a
          fixed number, since it depends on the destination. Call ahead for the current price on any
          specific trip.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">Browse trip programs by where you live</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          {localProviders.length} park district, township, and senior center trip programs across the
          Chicago area, each with departure points, typical cost, and how to sign up.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {COUNTY_SPOKES.map((spoke) => {
            const count = localProviders.filter((p) => p.county && spoke.counties.includes(p.county)).length;
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
      </section>

      <section className="mt-10 border-t border-flag-blue-tint-2 pt-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">Tour companies not tied to one suburb</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          If you don&apos;t live near a park district or township with an active trip program, a regional
          motorcoach tour company is the other route: {tourCompanies.map((c) => c.name).join(", ")}.
          Coverage, cost, and accessibility vary by company — one (Road Scholar) runs multi-day trips, not
          single-day bus outings, so it&apos;s the right pick for something longer, not a Saturday casino
          run.
        </p>
        <Link
          href="/day-trips/tour-companies"
          className="mt-5 flex flex-col gap-1 rounded-card border-2 border-flag-blue-ink bg-white p-5 no-underline transition-shadow hover:shadow-md sm:max-w-sm"
        >
          <span className="text-2xl" aria-hidden="true">
            🚌
          </span>
          <span className="text-lg font-bold text-ink">Compare all {tourCompanies.length} tour companies →</span>
          <span className="text-base text-ink-muted">Full details, cost, and how to book each one</span>
        </Link>
      </section>

      <PageFaq items={FAQS} />

      <p className="mt-14 border-t border-flag-blue-tint-2 pt-6 text-base text-ink-muted">
        Organizer details and cost examples above were checked against each organization&apos;s own official
        site, not estimated. Prices and schedules change — confirm the current trip calendar and cost
        directly with the organizer before you go.
      </p>

      <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
        <Link href="/guides/day-trips-from-chicago" className="text-base font-semibold text-flag-blue-ink no-underline hover:underline">
          ← Prefer to drive yourself? See the full day trips guide
        </Link>
        <Link href="/directory" className="text-base font-semibold text-flag-blue-ink no-underline hover:underline">
          ← Back to the free directory
        </Link>
      </p>
    </main>
  );
}
