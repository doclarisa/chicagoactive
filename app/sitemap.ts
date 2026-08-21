import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { CATEGORIES } from "@/lib/categories";
import { GUIDES } from "@/lib/guides";
import { CITIES } from "@/lib/cities";
import { ACTIVITY_PAGES } from "@/lib/activityPages";
import { COUNTY_CELLS, CHICAGO_CELLS } from "@/lib/activityCounties";
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

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
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

  const guideRoutes: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${SITE_URL}/guides/${g.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
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
  ];
}
