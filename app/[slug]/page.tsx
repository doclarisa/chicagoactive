import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { categoryStyle } from "@/lib/categoryStyles";
import { CATEGORY_GUIDE_MAP } from "@/lib/categoryGuideMap";
import { GUIDES } from "@/lib/guides";
import CategoryBadge from "@/components/CategoryBadge";
import CostBadge from "@/components/CostBadge";
import ListingCard from "@/components/ListingCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import Linkify from "@/components/Linkify";
import { categoryLabel } from "@/lib/categories";
import { listingSchemaType } from "@/lib/schema";
import { cityBySlug } from "@/lib/cities";
import { activityPageByTag } from "@/lib/activityPages";
import { countyCellBySlugs } from "@/lib/activityCounties";
import { parseOpeningHours } from "@/lib/openingHours";

const PRICE_RANGE: Record<string, string> = {
  FREE: "Free",
  LOW_COST: "$",
  PAID: "$$",
};

// SEO title tags have a real display budget (~60 chars before most SERPs
// truncate) but this directory's listing names are deliberately long and
// specific (real org names, per the proper-noun-first copy rule) — so a
// fixed "{name} ({place}, {county} County) | Active Chicagoland" format
// blew the budget on 97% of listings. This builds the richest title that
// still fits, dropping the least essential part first (county, then place,
// then brand) rather than truncating mid-word as a last resort.
const TITLE_BUDGET = 60;
const BRAND_SUFFIX = " | Active Chicagoland";

function buildListingTitle(name: string, place: string): string {
  const withPlaceAndBrand = `${name} — ${place}${BRAND_SUFFIX}`;
  if (withPlaceAndBrand.length <= TITLE_BUDGET) return withPlaceAndBrand;

  const withBrandOnly = `${name}${BRAND_SUFFIX}`;
  if (withBrandOnly.length <= TITLE_BUDGET) return withBrandOnly;

  if (name.length <= TITLE_BUDGET) return name;

  const cut = name.slice(0, TITLE_BUDGET - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 30 ? cut.slice(0, lastSpace) : cut) + "…";
}

// Addresses are stored as "Street, City, IL Zip" — split for structured
// data; falls back gracefully if a future address doesn't match that shape.
function parseAddress(address: string) {
  const parts = address.split(", ").map((p) => p.trim());
  if (parts.length !== 3) return { streetAddress: address };
  const [streetAddress, addressLocality, regionZip] = parts;
  const [addressRegion, postalCode] = regionZip.split(" ");
  return { streetAddress, addressLocality, addressRegion, postalCode };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = await prisma.listing.findUnique({ where: { slug } });
  if (!listing) return {};

  const place = listing.neighborhood ? `${listing.neighborhood}, ${listing.county} County` : `${listing.county} County`;
  const seoTitle = buildListingTitle(listing.name, listing.city || listing.neighborhood || listing.county);
  // OpenGraph previews (social shares) aren't truncated the same way SERPs
  // are, so they get the fuller, unconstrained title.
  const socialTitle = `${listing.name} (${place})`;

  return {
    // `absolute` bypasses the root layout's "%s | Active Chicagoland"
    // template — needed because buildListingTitle already decides for
    // itself whether the brand suffix fits.
    title: { absolute: seoTitle },
    description: listing.description,
    alternates: { canonical: `/${listing.slug}` },
    openGraph: { title: socialTitle, description: listing.description },
  };
}

export default async function ListingDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = await prisma.listing.findUnique({ where: { slug } });

  if (!listing) notFound();

  const days = Array.isArray(listing.days) ? (listing.days as string[]) : [];
  const style = categoryStyle(listing.category);

  // LocalBusiness schema, filled only with facts we actually have — no
  // fabricated street address, phone, or opening hours.
  const parsedAddress = listing.address ? parseAddress(listing.address) : null;
  // Only emit geo for a real, address-derived coordinate — "approximate"
  // rows are a city/county centroid, and presenting that as the venue's
  // location would misrepresent it to search engines.
  const openingHours = listing.hours ? parseOpeningHours(listing.hours) : null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": listingSchemaType(listing.category),
    name: listing.name,
    description: listing.description,
    ...(listing.sourceUrl ? { url: listing.sourceUrl } : {}),
    ...(listing.phone ? { telephone: listing.phone } : {}),
    address: {
      "@type": "PostalAddress",
      ...(parsedAddress ?? {}),
      addressLocality: parsedAddress?.addressLocality ?? listing.neighborhood ?? listing.county,
      addressRegion: parsedAddress?.addressRegion ?? "IL",
      addressCountry: "US",
    },
    ...(listing.geoPrecision === "exact" && listing.lat != null && listing.lng != null
      ? { geo: { "@type": "GeoCoordinates", latitude: listing.lat, longitude: listing.lng } }
      : {}),
    ...(openingHours ? { openingHours } : {}),
    priceRange: PRICE_RANGE[listing.cost],
    isAccessibleForFree: listing.cost === "FREE",
  };

  // Activity tag chips — always link to the metro-wide activity page;
  // additionally link to the county cell when this listing's county has
  // one built, else fall through to the metro page only.
  const activityTags = Array.isArray(listing.activities) ? (listing.activities as string[]) : [];
  const activityChips = activityTags
    .map((tag) => {
      const page = activityPageByTag(tag);
      if (!page) return null;
      const cell = countyCellBySlugs(page.slug, listing.county.toLowerCase());
      return {
        tag,
        label: page.h1.replace(/ (in|from) Chicagoland$/, "").replace(/ for Seniors$/, ""),
        href: cell ? `/activities/${cell.activitySlug}/${cell.countySlug}` : `/activities/${page.slug}`,
      };
    })
    .filter((c): c is { tag: string; label: string; href: string } => c !== null);

  const mapQuery = encodeURIComponent(
    listing.address ??
      [listing.name, listing.neighborhood, `${listing.county} County`, "IL"].filter(Boolean).join(", "),
  );
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  const guideSlug = CATEGORY_GUIDE_MAP[listing.category];
  const relatedGuide = guideSlug ? GUIDES.find((g) => g.slug === guideSlug) : undefined;

  // No-orphans mesh: link up to this listing's city page, when it has one.
  // Chicago listings get the single /chicago hub instead of a /city page.
  const cityLink =
    listing.citySlug === "chicago"
      ? { href: "/chicago", label: "Chicago" }
      : cityBySlug(listing.citySlug)
        ? { href: `/city/${listing.citySlug}`, label: listing.city }
        : null;

  // Free internal-linking block: up to 4 other listings, prioritizing same
  // category over same county. Small dataset, so scoring in memory is fine.
  const others = await prisma.listing.findMany({
    where: { status: "PUBLISHED", slug: { not: listing.slug } },
    orderBy: { name: "asc" },
  });
  const relatedListings = others
    .map((o) => ({
      listing: o,
      score: (o.category === listing.category ? 2 : 0) + (o.county === listing.county ? 1 : 0),
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((r) => r.listing);

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Directory", path: "/directory" },
          { name: categoryLabel(listing.category), path: `/category/${listing.category}` },
          { name: listing.name, path: `/${listing.slug}` },
        ]}
      />

      {/* No real photo sourced yet for this listing — tinted category icon
          is a fixed-size placeholder (no layout shift). Swap to next/image
          (lazy-loaded, explicit dimensions) once real photos are sourced. */}
      {listing.imageUrl ? (
        <Image
          src={listing.imageUrl}
          alt={listing.name}
          width={800}
          height={320}
          loading="lazy"
          className="mt-4 h-40 w-full rounded-card object-cover sm:h-56"
        />
      ) : (
        <div
          className={`mt-4 flex h-40 items-center justify-center rounded-card ${style.tint} text-6xl sm:h-56`}
          aria-hidden="true"
        >
          {style.icon}
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <CategoryBadge category={listing.category} />
        <CostBadge cost={listing.cost} />
      </div>

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        {listing.name}
      </h1>

      <p className="mt-2 text-lg text-ink-muted">
        {listing.neighborhood ? `${listing.neighborhood}, ` : ""}
        {listing.county} County
        {cityLink && (
          <>
            {" · "}
            <Link href={cityLink.href} className="text-flag-blue-ink no-underline hover:underline">
              More in {cityLink.label} →
            </Link>
          </>
        )}
      </p>

      <p className="mt-1 text-sm text-ink-muted">
        Verified{" "}
        {listing.lastVerified.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      {listing.qualityNote && (
        <p className="mt-4 rounded-card bg-flag-blue-tint px-4 py-3 text-base font-semibold text-flag-blue-ink">
          <Linkify text={listing.qualityNote} />
        </p>
      )}

      <p className="mt-6 text-lg leading-relaxed text-ink">{listing.description}</p>

      {days.length > 0 && (
        <p className="mt-4 text-lg font-semibold text-ink">
          {days.join(", ")}
          {listing.time ? ` — ${listing.time}` : ""}
        </p>
      )}

      {activityChips.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {activityChips.map((chip) => (
            <Link
              key={chip.tag}
              href={chip.href}
              className="inline-flex items-center rounded-pill bg-flag-blue-tint px-3 py-1 text-sm font-semibold text-flag-blue-ink no-underline hover:bg-flag-blue-tint-2"
            >
              {chip.label}
            </Link>
          ))}
        </div>
      )}

      {(listing.address ||
        listing.phone ||
        listing.hours ||
        listing.ageEligibility ||
        listing.registration ||
        listing.registrationUrl ||
        listing.accessibility ||
        listing.accessibilityNotes ||
        listing.parkingNotes ||
        listing.transitNotes ||
        listing.residentPrice ||
        listing.nonResidentPrice ||
        listing.beginnerFriendly ||
        listing.dropIn) && (
        <dl className="mt-6 space-y-2 text-base text-ink">
          {listing.address && (
            <div>
              <dt className="inline font-semibold">Address: </dt>
              <dd className="inline">{listing.address}</dd>
            </div>
          )}
          {listing.phone && (
            <div>
              <dt className="inline font-semibold">Phone: </dt>
              <dd className="inline">
                <a href={`tel:${listing.phone}`} className="text-flag-blue-ink underline">
                  {listing.phone}
                </a>
              </dd>
            </div>
          )}
          {listing.hours && (
            <div>
              <dt className="inline font-semibold">Hours: </dt>
              <dd className="inline">{listing.hours}</dd>
            </div>
          )}
          {listing.ageEligibility && (
            <div>
              <dt className="inline font-semibold">Eligibility: </dt>
              <dd className="inline">{listing.ageEligibility}</dd>
            </div>
          )}
          {(listing.residentPrice || listing.nonResidentPrice) && (
            <div>
              <dt className="inline font-semibold">Price: </dt>
              <dd className="inline">
                {listing.residentPrice && listing.nonResidentPrice
                  ? `${listing.residentPrice} resident / ${listing.nonResidentPrice} non-resident`
                  : (listing.residentPrice ?? listing.nonResidentPrice)}
              </dd>
            </div>
          )}
          {listing.dropIn && (
            <div>
              <dt className="inline font-semibold">Drop-in: </dt>
              <dd className="inline">Just show up — no registration needed</dd>
            </div>
          )}
          {listing.registration && (
            <div>
              <dt className="inline font-semibold">Registration: </dt>
              <dd className="inline">{listing.registration}</dd>
            </div>
          )}
          {listing.registrationUrl && (
            <div>
              <dt className="inline font-semibold">Register: </dt>
              <dd className="inline">
                <a
                  href={listing.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-flag-blue-ink underline"
                >
                  Sign up online →
                </a>
              </dd>
            </div>
          )}
          {listing.accessibility && (
            <div>
              <dt className="inline font-semibold">Accessibility: </dt>
              <dd className="inline">{listing.accessibility}</dd>
            </div>
          )}
          {listing.accessibilityNotes && (
            <div>
              <dt className="inline font-semibold">Accessibility notes: </dt>
              <dd className="inline">{listing.accessibilityNotes}</dd>
            </div>
          )}
          {listing.parkingNotes && (
            <div>
              <dt className="inline font-semibold">Parking: </dt>
              <dd className="inline">{listing.parkingNotes}</dd>
            </div>
          )}
          {listing.transitNotes && (
            <div>
              <dt className="inline font-semibold">Transit: </dt>
              <dd className="inline">{listing.transitNotes}</dd>
            </div>
          )}
          {listing.beginnerFriendly && (
            <div>
              <dt className="inline font-semibold">Good for beginners: </dt>
              <dd className="inline">Yes</dd>
            </div>
          )}
        </dl>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        {listing.sourceUrl && (
          <a
            href={listing.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-pill bg-flag-blue-ink px-6 text-base font-bold text-white no-underline"
          >
            Source & current schedule →
          </a>
        )}
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center rounded-pill border-2 border-flag-blue-ink px-6 text-base font-bold text-flag-blue-ink no-underline"
        >
          View on map ↗
        </a>
      </div>

      {/* Free internal linking: same category first, then same county.
          Leads with more free content before any affiliate nudge. */}
      {relatedListings.length > 0 && (
        <section className="mt-14 border-t border-flag-blue-tint-2 pt-6" aria-label="More things to do">
          <h2 className="text-xl font-extrabold tracking-tight text-ink">More things to do</h2>
          <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {relatedListings.map((l) => (
              <li key={l.id}>
                <ListingCard listing={l} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* The exit ramp: one contextual link to affiliate content, never a
          banner. Only shown where a relevant guide actually exists. */}
      <section className="mt-8 border-t border-flag-blue-tint-2 pt-6" aria-label="Affiliate suggestion">
        <h2 className="text-xl font-extrabold tracking-tight text-ink">Going further</h2>
        {relatedGuide ? (
          <Link
            href={`/guides/${relatedGuide.slug}`}
            className="mt-3 block rounded-card bg-flag-blue-tint p-4 no-underline"
          >
            <p className="text-base text-ink-muted">{relatedGuide.exitRampPrompt}</p>
            <p className="mt-1 text-lg font-bold text-flag-blue-ink">{relatedGuide.title} →</p>
          </Link>
        ) : (
          <p className="mt-2 text-base text-ink-muted">Coming soon.</p>
        )}
      </section>
    </main>
  );
}
