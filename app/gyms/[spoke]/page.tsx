import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  TIER1_GYMS,
  TIER2_CHAINS,
  TIER3_GYMS,
  TIER3_SOURCE_URL,
  GYM_SPOKES,
  gymSpokeBySlug,
  gymSpokeSlugForCounty,
  type County,
} from "@/lib/medicareGyms";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import Tier1GymCard from "@/components/Tier1GymCard";
import Tier2ChainCard from "@/components/Tier2ChainCard";
import Tier3List from "@/components/Tier3List";

export function generateStaticParams() {
  return GYM_SPOKES.map((s) => ({ spoke: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ spoke: string }>;
}): Promise<Metadata> {
  const { spoke: spokeSlug } = await params;
  const spoke = gymSpokeBySlug(spokeSlug);
  if (!spoke) return {};
  const description = `Gyms and recreation centers in ${spoke.label} that accept SilverSneakers, Renew Active, or Silver&Fit — sorted by confidence, with sources.`;
  return {
    title: spoke.metaTitle,
    description,
    alternates: { canonical: `/gyms/${spoke.slug}` },
    openGraph: { title: spoke.metaTitle, description },
  };
}

export default async function GymSpokePage({
  params,
}: {
  params: Promise<{ spoke: string }>;
}) {
  const { spoke: spokeSlug } = await params;
  const spoke = gymSpokeBySlug(spokeSlug);
  if (!spoke) notFound();

  const inSpoke = (county: County) => gymSpokeSlugForCounty(county) === spoke.slug;

  const tier1 = TIER1_GYMS.filter((g) => inSpoke(g.county));
  const tier2Chains = TIER2_CHAINS.map((chain) => ({
    ...chain,
    locations: chain.locations.filter((loc) => inSpoke(loc.county)),
  })).filter((chain) => chain.locations.length > 0);
  const tier3 = TIER3_GYMS.filter((g) => !g.county || inSpoke(g.county));

  const totalCount =
    tier1.length + tier2Chains.reduce((sum, c) => sum + c.locations.length, 0) + tier3.length;

  const siblingSpokes = GYM_SPOKES.filter((s) => s.slug !== spoke.slug);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Medicare Fitness Gyms", path: "/guides/medicare-fitness-gyms" },
    { name: spoke.label, path: `/gyms/${spoke.slug}` },
  ];

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }}
      />
      {tier1.map((gym) => (
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

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        {spoke.label === "Other Chicagoland Areas" ? spoke.label : `${spoke.label} SilverSneakers & Medicare Gyms`}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-ink">
        {totalCount} gym{totalCount === 1 ? "" : "s"}
        {spoke.counties.length > 1 ? ` across ${spoke.counties.join(", ")} Counties` : ` in ${spoke.label}`} —
        sorted by confidence, never mixed. Always confirm with the gym and your plan before you go.
      </p>

      {tier1.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">Verified ({tier1.length})</h2>
          <div className="mt-4 flex flex-col gap-4">
            {tier1.map((gym) => (
              <Tier1GymCard key={gym.slug} gym={gym} />
            ))}
          </div>
        </section>
      )}

      {tier2Chains.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">
            High confidence ({tier2Chains.reduce((sum, c) => sum + c.locations.length, 0)})
          </h2>
          <div className="mt-4 flex flex-col gap-4">
            {tier2Chains.map((chain) => (
              <Tier2ChainCard key={chain.slug} chain={chain} />
            ))}
          </div>
        </section>
      )}

      <Tier3List gyms={tier3} sourceUrl={TIER3_SOURCE_URL} />

      {tier1.length === 0 && tier2Chains.length === 0 && tier3.length === 0 && (
        <p className="mt-10 text-lg text-ink-muted">
          We haven&apos;t found a confirmed gym here yet — check the{" "}
          <a
            href="https://www.silversneakers.com/locations/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-flag-blue-ink no-underline hover:underline"
          >
            official SilverSneakers finder
          </a>{" "}
          directly.
        </p>
      )}

      <section className="mt-14 border-t border-flag-blue-tint-2 pt-6">
        <h2 className="text-xl font-extrabold tracking-tight text-ink">Nearby areas</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {siblingSpokes.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/gyms/${s.slug}`}
                className="inline-flex min-h-10 items-center rounded-pill border border-flag-blue-tint-2 bg-white px-4 text-base font-semibold text-flag-blue-ink no-underline hover:bg-flag-blue-tint"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-8">
        <Link
          href="/guides/medicare-fitness-gyms"
          className="text-base font-semibold text-flag-blue-ink no-underline hover:underline"
        >
          ← Back to Medicare Fitness Gyms
        </Link>
      </p>
    </main>
  );
}
