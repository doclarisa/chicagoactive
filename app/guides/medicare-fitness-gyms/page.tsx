import type { Metadata } from "next";
import Link from "next/link";
import { TIER1_GYMS, TOTAL_GYM_COUNT, GYM_SPOKES, countyCounts } from "@/lib/medicareGyms";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";

const TITLE = "Chicagoland Gyms That Accept Your Medicare Fitness Benefit";
const DESCRIPTION =
  "SilverSneakers, Renew Active, and Silver&Fit gyms near Chicago — which programs each gym actually takes, sorted into honest confidence tiers.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides/medicare-fitness-gyms" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "article" },
  robots: { index: true, follow: true },
};

export default function MedicareFitnessGymsPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Pickleball & Fitness", path: "/category/pickleball-fitness" },
    { name: "Medicare Fitness Gyms", path: "/guides/medicare-fitness-gyms" },
  ];

  const counts = countyCounts();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }}
      />
      {TIER1_GYMS.map((gym) => (
        <script
          key={gym.slug}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              localBusinessSchema({ name: gym.name, address: gym.address, sourceUrl: gym.sourceUrl }),
            ),
          }}
        />
      ))}

      <Breadcrumbs crumbs={crumbs} />

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{TITLE}</h1>

      <p className="mt-4 text-lg leading-relaxed text-ink">
        Millions of older adults have a free gym membership through their Medicare Advantage plan, but the
        official program finders are clunky and don&apos;t show the local detail that actually matters —
        senior classes, a warm pool, parking, which programs a gym actually takes. This page compiles that,
        for {TOTAL_GYM_COUNT}+ Chicagoland gyms and recreation centers.
      </p>

      <div className="mt-6 rounded-card bg-flag-blue-tint px-5 py-4 text-base text-flag-blue-ink">
        <p className="font-bold">Benefit participation can change.</p>
        <p className="mt-1">
          Always confirm with the gym and your plan before you go. Program participation is location-specific
          — a gym can accept one program, all three, or none, and that can change year to year.
        </p>
      </div>

      {/* ================= The 3 programs, explained ================= */}
      <section className="mt-10">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">The 3 Medicare fitness programs</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          A gym often accepts more than one of these. They&apos;re run by three different companies, with
          three different networks — so &ldquo;my gym takes SilverSneakers&rdquo; doesn&apos;t tell you
          anything about Renew Active or Silver&amp;Fit.
        </p>
        <div className="mt-6 flex flex-col gap-4">
          <div className="rounded-card bg-card p-5 shadow-sm ring-1 ring-black/5">
            <h3 className="text-lg font-bold text-ink">SilverSneakers</h3>
            <p className="mt-1 text-base text-ink-muted">
              Run by Tivity Health, included with many Medicare Advantage and some Medicare Supplement plans.
              Use the official{" "}
              <a
                href="https://www.silversneakers.com/locations/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-flag-blue-ink no-underline hover:underline"
              >
                SilverSneakers location finder
              </a>{" "}
              to check your eligibility and confirm a location.
            </p>
          </div>
          <div className="rounded-card bg-card p-5 shadow-sm ring-1 ring-black/5">
            <h3 className="text-lg font-bold text-ink">Renew Active</h3>
            <p className="mt-1 text-base text-ink-muted">
              UnitedHealthcare&apos;s fitness benefit, included with many UHC Medicare Advantage plans. Check{" "}
              <a
                href="https://www.uhc.com/health-and-wellness/fitness-programs/renew-active"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-flag-blue-ink no-underline hover:underline"
              >
                UHC&apos;s Renew Active page
              </a>{" "}
              for eligibility and a gym finder.
            </p>
          </div>
          <div className="rounded-card bg-card p-5 shadow-sm ring-1 ring-black/5">
            <h3 className="text-lg font-bold text-ink">Silver&amp;Fit</h3>
            <p className="mt-1 text-base text-ink-muted">
              Administered by American Specialty Health, offered through a different set of Medicare
              Advantage and Supplement plans. Use the{" "}
              <a
                href="https://www.silverandfit.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-flag-blue-ink no-underline hover:underline"
              >
                Silver&amp;Fit exercise facility locator
              </a>{" "}
              to check eligibility.
            </p>
          </div>
        </div>
        <p className="mt-4 text-base text-ink-muted">
          Not sure which one you have? Call the member services number on your Medicare Advantage card and
          ask which fitness benefit is included.
        </p>
      </section>

      {/* ================= Tier explainer ================= */}
      <section className="mt-10">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">How we sort these gyms</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          A wrong &ldquo;yes&rdquo; sends you on a wasted trip, so every gym below is sorted into one of
          three honest confidence tiers — never mixed together.
        </p>
        <div className="mt-5 flex flex-col gap-3">
          <div className="rounded-card bg-card p-4 ring-1 ring-black/5">
            <span className="inline-flex items-center rounded-pill bg-flag-blue-ink px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
              Verified
            </span>
            <p className="mt-2 text-base text-ink-muted">
              Confirmed on the gym&apos;s own site or an official program finder. Fully enriched — programs,
              senior classes, pool, address, and more.
            </p>
          </div>
          <div className="rounded-card bg-card p-4 ring-1 ring-black/5">
            <span className="inline-flex items-center rounded-pill border-2 border-flag-blue-ink px-3 py-1 text-xs font-bold uppercase tracking-wide text-flag-blue-ink">
              High confidence
            </span>
            <p className="mt-2 text-base text-ink-muted">
              A chain that documentably accepts a program broadly, with real addresses — not verified at each
              individual location. Confirm your specific plan and club.
            </p>
          </div>
          <div className="rounded-card border-2 border-dashed border-ink-muted bg-white p-4">
            <span className="inline-flex items-center rounded-pill border-2 border-ink-muted px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink-muted">
              Reported, unconfirmed
            </span>
            <p className="mt-2 text-base text-ink-muted">
              Named on a third-party roundup with a real address, nothing else confirms it. Call before you
              go.
            </p>
          </div>
        </div>
      </section>

      {/* ================= YMCA volatility callout — honest, trust-building ================= */}
      <section className="mt-10 rounded-card border-2 border-flag-blue-ink bg-white p-5">
        <h2 className="text-xl font-bold text-ink">A note on YMCA branches</h2>
        <p className="mt-2 text-base leading-relaxed text-ink">
          YMCA locations are a common SilverSneakers stop, but participation isn&apos;t guaranteed or
          permanent — insurers and YMCA associations renegotiate these contracts, and coverage can end with
          little notice. (Blue Cross Blue Shield of Minnesota, for example, dropped SilverSneakers at YMCA of
          the North locations effective January 1, 2026, over a reimbursement-rate dispute.) Use the official
          SilverSneakers finder above and call your local Y directly before you go.
        </p>
      </section>

      {/* ================= County cards → spokes ================= */}
      <section className="mt-14">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">Gyms by area</h2>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {GYM_SPOKES.map((spoke) => {
            const count = spoke.counties.reduce((sum, c) => sum + counts[c], 0);
            return (
              <Link
                key={spoke.slug}
                href={`/gyms/${spoke.slug}`}
                className="flex flex-col gap-1 rounded-card bg-card p-5 no-underline shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md"
              >
                <span className="text-lg font-bold text-ink">{spoke.label}</span>
                <span className="text-base text-ink-muted">
                  {count} gym{count === 1 ? "" : "s"}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ================= Other chains ================= */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-ink">A note on Planet Fitness, XSport, and Esporta</h2>
        <p className="mt-2 text-base leading-relaxed text-ink">
          Unlike the other chains on this page, <strong>Planet Fitness has no national SilverSneakers
          agreement</strong> — multiple independent sources agree on this. Any Chicago-area Planet Fitness
          that accepts SilverSneakers is an individual location opting in, not a chain policy, so we&apos;ve
          listed its addresses in the &ldquo;reported, unconfirmed&rdquo; tier on the county pages below
          rather than treating it as a broad participant.{" "}
          <strong>XSport Fitness</strong> and <strong>Esporta Fitness</strong> no longer exist as separate
          chains in Chicagoland — LA Fitness&apos;s parent company acquired both (XSport in July 2024, Esporta
          in April 2025) and rebranded their locations to LA Fitness. A few former XSport locations closed
          outright afterward. We&apos;ve folded the surviving addresses into the LA Fitness listings below.
        </p>
      </section>

      {/* ================= Cross-links ================= */}
      <section className="mt-14 border-t border-flag-blue-tint-2 pt-8">
        <h2 className="text-xl font-bold text-ink">Once you&apos;ve got your gym sorted</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/guides/day-trips-from-chicago"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Day Trips from Chicago →</span>
            <span className="text-base text-ink-muted">
              Organized group trips and self-guided destinations for active adults 55+
            </span>
          </Link>
          <Link
            href="/category/pickleball-fitness"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Pickleball &amp; Fitness →</span>
            <span className="text-base text-ink-muted">
              Back to the full Fitness collection — pickleball, yoga, water aerobics, and more
            </span>
          </Link>
          <Link
            href="/guides/pickleball-facilities"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Indoor Pickleball Facilities →</span>
            <span className="text-base text-ink-muted">
              Dedicated commercial pickleball clubs, separate from park-district courts
            </span>
          </Link>
        </div>
      </section>

      <p className="mt-14 border-t border-flag-blue-tint-2 pt-6 text-base text-ink-muted">
        Program acceptance above was checked against each gym&apos;s own site, an official program finder, or
        a specific named source — not assumed from a chain&apos;s general reputation. Details change:
        confirm current participation with the gym and your plan before you go.
      </p>

      <p className="mt-8">
        <Link href="/directory" className="text-base font-semibold text-flag-blue-ink no-underline hover:underline">
          ← Back to the free directory
        </Link>
      </p>
    </main>
  );
}
