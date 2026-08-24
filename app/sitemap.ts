import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { CATEGORIES } from "@/lib/categories";
import { GUIDES } from "@/lib/guides";
import { CITIES } from "@/lib/cities";
import { ACTIVITY_PAGES } from "@/lib/activityPages";
import { COUNTY_CELLS, CHICAGO_CELLS } from "@/lib/activityCounties";
import { COUNTY_SPOKES } from "@/lib/organizedTrips";
import { GYM_SPOKES } from "@/lib/medicareGyms";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const listings = await prisma.listing.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, updatedAt: true },
  });

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/directory`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/areas`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/chicago`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/classes-for-seniors`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.3 },
  ];

  const cityRoutes: MetadataRoute.Sitemap = CITIES.map((c) => ({
    url: `${SITE_URL}/city/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const activityRoutes: MetadataRoute.Sitemap = ACTIVITY_PAGES.map((a) => ({
    url: `${SITE_URL}/activities/${a.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const countyCellRoutes: MetadataRoute.Sitemap = COUNTY_CELLS.map((c) => ({
    url: `${SITE_URL}/activities/${c.activitySlug}/${c.countySlug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const chicagoCellRoutes: MetadataRoute.Sitemap = CHICAGO_CELLS.map((c) => ({
    url: `${SITE_URL}/chicago/${c.tag}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // day-trips-near-chicago 301s to the Day Trips guide (next.config.ts) —
  // don't offer it as a second indexable URL.
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.filter(
    (c) => c.slug !== "day-trips-near-chicago",
  ).map((c) => ({
    url: `${SITE_URL}/category/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const listingRoutes: MetadataRoute.Sitemap = listings.map((l) => ({
    url: `${SITE_URL}/${l.slug}`,
    lastModified: l.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Only guides with a dedicated static route (real content, own schema,
  // indexed) belong in the sitemap. The rest render through the generic
  // app/guides/[slug]/page.tsx placeholder template, which is deliberately
  // `robots: { index: false }` until real content ships — don't submit a
  // noindexed URL to crawlers.
  const INDEXED_GUIDE_SLUGS = new Set(["day-trips-from-chicago", "medicare-fitness-gyms"]);
  const guideRoutes: MetadataRoute.Sitemap = GUIDES.filter((g) => INDEXED_GUIDE_SLUGS.has(g.slug)).map(
    (g) => ({
      url: `${SITE_URL}/guides/${g.slug}`,
      changeFrequency: "monthly",
      priority: 0.5,
    }),
  );

  // Day Trips county spokes + the commercial tour-companies page.
  const dayTripSpokeRoutes: MetadataRoute.Sitemap = COUNTY_SPOKES.map((s) => ({
    url: `${SITE_URL}/day-trips/${s.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));
  const dayTripCompanyRoute: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/day-trips/tour-companies`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const gymSpokeRoutes: MetadataRoute.Sitemap = GYM_SPOKES.map((s) => ({
    url: `${SITE_URL}/gyms/${s.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...cityRoutes,
    ...activityRoutes,
    ...countyCellRoutes,
    ...chicagoCellRoutes,
    ...categoryRoutes,
    ...listingRoutes,
    ...guideRoutes,
    ...dayTripSpokeRoutes,
    ...dayTripCompanyRoute,
    ...gymSpokeRoutes,
  ];
}
