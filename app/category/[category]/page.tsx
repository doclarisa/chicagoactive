import { notFound } from "next/navigation";
import Link from "next/link";
import { getPublishedListingsSafe } from "@/lib/db";
import { CATEGORIES } from "@/lib/categories";
import { categoryStyle } from "@/lib/categoryStyles";
import { CATEGORY_GUIDE_MAP } from "@/lib/categoryGuideMap";
import { GUIDES } from "@/lib/guides";
import ListingCard from "@/components/ListingCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import FitnessLobby from "@/components/FitnessLobby";
import PageFaq from "@/components/PageFaq";
import { itemListSchema } from "@/lib/schema";
import { buildPageFaq, formatLastVerified } from "@/lib/pageFaq";

export function generateStaticParams() {
  // day-trips-near-chicago is permanently redirected to the Day Trips
  // guide (next.config.ts) — don't generate dead static output for it.
  return CATEGORIES.filter((c) => c.slug !== "day-trips-near-chicago").map((c) => ({ category: c.slug }));
}

// Same logic as /city/[citySlug]: lead with "senior," the real free/paid
// mix, a live count, and the current year -- matching how people actually
// search ("senior library classes") rather than the category's clean but
// query-light label. A few labels already say "Senior" or "55+"
// (Park District, Senior Center Events, Museum Senior Days) and don't need
// it doubled; the rest get it added here.
const CATEGORY_TITLE_NOUN: Record<string, string> = {
  "park-district-55-programs": "Park District 55+ Programs",
  "senior-center-events": "Senior Center Events",
  "library-classes": "Senior Library Classes",
  "walking-hiking-groups": "Senior Walking & Hiking Groups",
  "pickleball-fitness": "Pickleball & Senior Fitness Classes",
  "museum-senior-days": "Museum Senior Discount Days",
  "day-trips-near-chicago": "Senior Day Trips",
  "arts-culture": "Senior Arts & Culture Programs",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) return {};

  const noun = CATEGORY_TITLE_NOUN[cat.slug] ?? cat.label;
  const year = new Date().getFullYear();

  // pickleball-fitness is a lobby/router page, not a listing page — no
  // live count to attach, and its own description reflects that instead
  // of the generic category copy.
  if (cat.slug === "pickleball-fitness") {
    const title = `${noun} in Chicagoland (${year})`;
    const description =
      "Medicare fitness benefit gyms, indoor pickleball, gentle yoga, and water aerobics for active adults 50+ across the Chicago area.";
    return {
      title,
      description,
      alternates: { canonical: `/category/${cat.slug}` },
      openGraph: { title, description },
    };
  }

  const all = await getPublishedListingsSafe();
  const listings = all.filter((l) => l.category === category);
  const count = listings.length;
  const freeCount = listings.filter((l) => l.cost === "FREE").length;
  // museum-senior-days is a real example of why this can't just say "Free"
  // unconditionally: it's paid admission with a senior discount, not free.
  const freePrefix = count === 0 ? "" : freeCount === count ? "Free " : freeCount > 0 ? "Free & Low-Cost " : "";
  const countSuffix = count > 0 ? ` — ${count} Listing${count === 1 ? "" : "s"}` : "";
  const title = `${freePrefix}${noun} in Chicagoland (${year})${countSuffix}`;
  const description = `Free and low-cost ${cat.label.toLowerCase()} for active adults 50+ across the Chicago area.`;
  return {
    title,
    description,
    alternates: { canonical: `/category/${cat.slug}` },
    openGraph: { title, description },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  // Fitness's job is to ROUTE to a collection, not list ~7 listings
  // directly — see components/FitnessLobby.tsx. The underlying listings
  // stay reachable via /directory?category=pickleball-fitness.
  if (cat.slug === "pickleball-fitness") return <FitnessLobby />;

  const all = await getPublishedListingsSafe();
  const listings = all.filter((l) => l.category === category);
  const faqItems = buildPageFaq(listings);
  const lastVerified = formatLastVerified(listings);

  const style = categoryStyle(category);

  const guideSlug = CATEGORY_GUIDE_MAP[category];
  const relatedGuide = guideSlug ? GUIDES.find((g) => g.slug === guideSlug) : undefined;

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      {listings.length > 0 && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              itemListSchema(listings.map((l) => ({ name: l.name, path: `/${l.slug}` }))),
            ),
          }}
        />
      )}
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Directory", path: "/directory" },
          { name: cat.label, path: `/category/${cat.slug}` },
        ]}
      />

      <div className="mt-4 flex items-center gap-3">
        <span
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-card ${style.tint} text-3xl`}
          aria-hidden="true"
        >
          {style.icon}
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          {cat.label}
        </h1>
      </div>

      {"intro" in cat && cat.intro && (
        <p className="mt-4 text-lg leading-relaxed text-ink">{cat.intro}</p>
      )}

      <p className="mt-3 text-lg text-ink-muted">
        {listings.length} free and low-cost listing{listings.length === 1 ? "" : "s"} across
        Chicagoland.
        {lastVerified && ` Most recently verified: ${lastVerified}.`}
      </p>

      {cat.slug === "senior-center-events" && (
        <p className="mt-2 text-base text-ink-muted">
          Prefer to browse by area instead of by activity?{" "}
          <Link
            href="/senior-activity-centers-chicagoland"
            className="font-semibold text-flag-blue-ink no-underline hover:underline"
          >
            See every senior activity center grouped by county →
          </Link>
        </p>
      )}

      {listings.length === 0 ? (
        <p className="mt-6 text-lg text-ink-muted">Nothing here yet — check back soon.</p>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((l) => (
            <li key={l.id}>
              <ListingCard listing={l} />
            </li>
          ))}
        </ul>
      )}

      <PageFaq items={faqItems} />

      {/* Same exit-ramp pattern as the individual listing pages — only
          shown where a relevant guide actually exists. */}
      {relatedGuide && (
        <section className="mt-14 border-t border-flag-blue-tint-2 pt-6" aria-label="Related guide">
          <Link
            href={`/guides/${relatedGuide.slug}`}
            className="block rounded-card bg-flag-blue-tint p-4 no-underline"
          >
            <p className="text-base text-ink-muted">{relatedGuide.exitRampPrompt}</p>
            <p className="mt-1 text-lg font-bold text-flag-blue-ink">{relatedGuide.title} →</p>
          </Link>
        </section>
      )}
    </main>
  );
}
