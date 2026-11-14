import Link from "next/link";
import { getPublishedListingsSafe } from "@/lib/db";
import { COUNTIES } from "@/lib/counties";
import Breadcrumbs from "./Breadcrumbs";
import CostBadge from "./CostBadge";
import PageFaq from "./PageFaq";
import type { FaqItem } from "@/lib/schema";

const PAGE_FAQS: FaqItem[] = [
  {
    question: "Does this site match seniors with volunteers directly?",
    answer:
      "No. This is a directory, not a matching service. Every organization below runs its own screening, orientation, and (for most) a background check for volunteers — that's what keeps the matching safe, and it's not something we do ourselves. Contact the organization directly using the phone number or email on its listing.",
  },
  {
    question: "Is there really more demand than there are volunteers?",
    answer:
      "For at least one program (Little Brothers – Friends of the Elderly), yes — more older adults have signed up for a visitor than there are volunteers currently available to match them with. If you have an hour a month, it genuinely makes a difference.",
  },
  {
    question: "What does a volunteer visit or call actually involve?",
    answer:
      "It varies by organization, but most are a regular (often weekly) phone call or in-person visit built around getting to know the same person over time, not a one-time check-in. A few also run a monthly group activity or holiday event.",
  },
  {
    question: "Is there a cost to request a visitor or to volunteer?",
    answer: "No. Every program listed here is free, for both the person requesting a visit and the volunteer.",
  },
];

export default async function FriendlyVisitorsLobby() {
  const all = await getPublishedListingsSafe();
  const programs = all.filter((l) => l.category === "friendly-visitors-phone-buddies");

  const groups = COUNTIES.map((county) => ({
    county,
    programs: programs.filter((p) => p.county === county).sort((a, b) => a.name.localeCompare(b.name)),
  })).filter((g) => g.programs.length > 0);

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Directory", path: "/directory" },
          { name: "Friendly Visitors & Phone Buddies", path: "/category/friendly-visitors-phone-buddies" },
        ]}
      />

      <div className="mt-4 flex items-center gap-3">
        <span
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-card bg-flag-blue-tint text-3xl"
          aria-hidden="true"
        >
          🤝
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Friendly Visitors &amp; Phone Buddies
        </h1>
      </div>

      <p className="mt-4 text-lg leading-relaxed text-ink">
        {programs.length} real, verified programs across Chicagoland that pair isolated older adults with
        a volunteer for regular visits or phone calls — not a one-time check-in, but an ongoing
        relationship. Each one runs its own orientation and screening (most require a background check for
        volunteers), so we link to them directly rather than trying to match people ourselves.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <a
          href="#programs"
          className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
        >
          <span className="text-2xl" aria-hidden="true">
            📞
          </span>
          <span className="text-lg font-bold text-ink">I&apos;d like a friendly visitor or caller</span>
          <span className="text-base text-ink-muted">
            For yourself or someone you&apos;re helping — browse by county below
          </span>
        </a>
        <a
          href="#programs"
          className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
        >
          <span className="text-2xl" aria-hidden="true">
            🙋
          </span>
          <span className="text-lg font-bold text-ink">I&apos;d like to volunteer</span>
          <span className="text-base text-ink-muted">
            Same organizations, same list — most run visitor and volunteer intake through one line
          </span>
        </a>
      </div>

      <div id="programs" />

      {groups.map((group) => (
        <section key={group.county} className="mt-10 scroll-mt-6">
          <h2 className="text-xl font-extrabold tracking-tight text-ink">
            {group.county} County ({group.programs.length})
          </h2>
          <div className="mt-4 flex flex-col gap-4">
            {group.programs.map((program) => (
              <div key={program.id} className="rounded-card bg-card p-5 shadow-sm ring-1 ring-black/5">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/${program.slug}`}
                    className="text-lg font-bold text-flag-blue-ink no-underline hover:underline"
                  >
                    {program.name}
                  </Link>
                  <CostBadge cost={program.cost} />
                </div>
                <p className="mt-1 text-base text-ink-muted">
                  {program.neighborhood ? `${program.neighborhood}, ` : ""}
                  {program.city || `${program.county} County`}
                </p>
                <p className="mt-2 text-base text-ink">{program.description}</p>
                {program.registration && (
                  <p className="mt-2 text-base font-semibold text-ink">{program.registration}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      <PageFaq items={PAGE_FAQS} />

      <p className="mt-14 border-t border-flag-blue-tint-2 pt-6 text-base text-ink-muted">
        Every program above was checked against its own official page or a verified third-party listing —
        see each one&apos;s own page for the exact source. Contact details change; confirm directly with
        the organization before relying on a phone number or address here.
      </p>

      <p className="mt-8">
        <Link href="/directory" className="text-base font-semibold text-flag-blue-ink no-underline hover:underline">
          ← Back to the free directory
        </Link>
      </p>
    </main>
  );
}
