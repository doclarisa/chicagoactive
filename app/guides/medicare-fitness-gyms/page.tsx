import type { Metadata } from "next";
import Link from "next/link";
import { MEDICARE_GYMS, MORE_SILVERSNEAKERS_GYMS, MORE_SILVERSNEAKERS_SOURCE_URL } from "@/lib/medicareGyms";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import MedicareGymCard from "@/components/MedicareGymCard";

const TITLE = "Chicagoland Gyms That Accept Your Medicare Fitness Benefit";
const DESCRIPTION =
  "SilverSneakers, Renew Active, and Silver&Fit gyms near Chicago — which programs each gym actually takes, verified where we could confirm it.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides/medicare-fitness-gyms" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "article" },
  // Real, verified content — meant to rank, like the Day Trips guide.
  robots: { index: true, follow: true },
};

const COUNTY_ORDER: Array<"Cook" | "DuPage" | "Will" | "Kane"> = ["Cook", "DuPage", "Will", "Kane"];

export default function MedicareFitnessGymsPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Pickleball & Fitness", path: "/category/pickleball-fitness" },
    { name: "Medicare Fitness Gyms", path: "/guides/medicare-fitness-gyms" },
  ];

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }}
      />
      {MEDICARE_GYMS.map((gym) => (
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
        for {MEDICARE_GYMS.length} Chicagoland gyms and recreation centers.
      </p>

      <div className="mt-6 rounded-card bg-flag-blue-tint px-5 py-4 text-base text-flag-blue-ink">
        <p className="font-bold">Benefit participation can change.</p>
        <p className="mt-1">
          Always confirm with the gym and your plan before you go. Program participation is location-specific
          — a gym can accept one program, all three, or none, and that can change year to year. We only mark
          a program &ldquo;verified&rdquo; when we found the gym&apos;s own site, the program&apos;s official
          finder, or a specific named source confirming that exact program at that exact location. Everything
          else is marked &ldquo;verify&rdquo; on purpose — a wrong &ldquo;yes&rdquo; sends you on a wasted
          trip.
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
          ask which fitness benefit is included — it&apos;s printed on the letter that came with your plan,
          too.
        </p>
      </section>

      {/* ================= YMCA volatility callout — honest, trust-building ================= */}
      <section className="mt-10 rounded-card border-2 border-flag-blue-ink bg-white p-5">
        <h2 className="text-xl font-bold text-ink">A note on YMCA branches</h2>
        <p className="mt-2 text-base leading-relaxed text-ink">
          YMCA locations are a common SilverSneakers stop, but participation isn&apos;t guaranteed or
          permanent — insurers and YMCA associations renegotiate these contracts, and coverage can end with
          little notice. (Blue Cross Blue Shield of Minnesota, for example, dropped SilverSneakers at YMCA of
          the North locations effective January 1, 2026, over a reimbursement-rate dispute.) We couldn&apos;t
          confirm current SilverSneakers status at Chicago-area YMCA branches strongly enough to list them
          here with confidence — use the official SilverSneakers finder above and call your local Y directly
          before you go.
        </p>
      </section>

      {/* ================= Gyms by county ================= */}
      <section className="mt-14">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">Gyms &amp; recreation centers</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          Grouped by county — Cook and DuPage first, since that&apos;s where we found the deepest coverage.
        </p>

        {COUNTY_ORDER.map((county) => {
          const gyms = MEDICARE_GYMS.filter((g) => g.county === county);
          if (gyms.length === 0) return null;
          return (
            <div key={county} className="mt-10">
              <h3 className="text-xl font-bold text-ink">
                {county} County ({gyms.length})
              </h3>
              <div className="mt-4 flex flex-col gap-5">
                {gyms.map((gym) => (
                  <MedicareGymCard key={gym.slug} gym={gym} />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* ================= Lighter-weight list ================= */}
      <section className="mt-14 border-t border-flag-blue-tint-2 pt-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">
          More SilverSneakers-confirmed gyms in Chicago
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          Named on a third-party SilverSneakers-location roundup — real addresses, but we couldn&apos;t
          independently confirm pool, senior classes, or Renew Active / Silver&amp;Fit acceptance for these.
          Call ahead.
        </p>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {MORE_SILVERSNEAKERS_GYMS.map((gym) => (
            <div key={`${gym.name}-${gym.address}`} className="rounded-card bg-card p-4 text-base ring-1 ring-black/5">
              <p className="font-bold text-ink">{gym.name}</p>
              <p className="text-ink-muted">{gym.address}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-ink-muted">
          Source:{" "}
          <a
            href={MORE_SILVERSNEAKERS_SOURCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-flag-blue-ink no-underline hover:underline"
          >
            medicareplanfinder.com&apos;s Chicago SilverSneakers roundup
          </a>
          .
        </p>
      </section>

      {/* ================= Other chains ================= */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-ink">Other chains worth checking directly</h2>
        <p className="mt-2 text-base leading-relaxed text-ink">
          <strong>Planet Fitness</strong> generally accepts SilverSneakers (free &ldquo;Classic&rdquo; tier
          only, not Black Card) at participating locations across Chicago — but it&apos;s
          franchise-dependent, so confirm with your local club.{" "}
          <strong>Esporta Fitness</strong> is another chain that commonly participates — again, verify at
          your specific location. We looked into <strong>XSport Fitness</strong> and found several Chicago
          locations showing as permanently closed, so we&apos;re leaving that chain off this page for now
          rather than risk sending you to a gym that no longer exists — check{" "}
          <a
            href="https://www.xsportfitness.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-flag-blue-ink no-underline hover:underline"
          >
            xsportfitness.com
          </a>{" "}
          directly if you want to try them.
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
            href="/guides/hobby-fitness-gear-for-active-seniors"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Hobby &amp; Fitness Gear →</span>
            <span className="text-base text-ink-muted">
              Walking shoes, pickleball paddles, and the rest of the gear list
            </span>
          </Link>
        </div>
        <p className="mt-6 text-base text-ink-muted">
          Looking for pickleball, walking groups, or park district fitness classes instead of a gym
          membership? See the free{" "}
          <Link href="/category/pickleball-fitness" className="font-semibold text-flag-blue-ink no-underline hover:underline">
            Pickleball &amp; Fitness directory
          </Link>
          .
        </p>
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
