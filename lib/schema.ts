import { SITE_URL, SITE_NAME } from "./site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "A free directory of things to do for active adults 50+ across the Chicago area.",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/directory?category={category}`,
      },
      "query-input": "required name=category",
    },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}

export function itemListSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: `${SITE_URL}${item.path}`,
    })),
  };
}

// Museum and Library are real, more specific schema.org types than the
// generic LocalBusiness fallback. Only used when we're confident the
// category genuinely represents that kind of place, per the SEO skill's
// guidance to use the most accurate type available.
export function listingSchemaType(category: string): string {
  if (category === "museum-senior-days") return "Museum";
  if (category === "library-classes") return "Library";
  return "LocalBusiness";
}

// TouristAttraction markup for a day-trip destination — only fields we
// actually verified (name, description, address region, source URL). No
// fabricated price, rating, or opening-hours data.
export function touristAttractionSchema(trip: {
  name: string;
  state: string;
  blurb: string;
  sourceUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: trip.name,
    description: trip.blurb,
    url: trip.sourceUrl,
    address: {
      "@type": "PostalAddress",
      addressRegion: trip.state,
      addressCountry: "US",
    },
  };
}

// LocalBusiness markup for a gym entry — only verified fields (name,
// address if we have it, source URL). No fabricated rating or hours.
export function localBusinessSchema(gym: {
  name: string;
  address?: string;
  sourceUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    name: gym.name,
    url: gym.sourceUrl,
    ...(gym.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: gym.address,
            addressCountry: "US",
          },
        }
      : {}),
  };
}
