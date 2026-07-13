// Single source of truth for the site's canonical origin, used by
// metadata, JSON-LD, and sitemap.xml/robots.txt. The custom domain
// (chicagoactiveseniors.com) isn't connected yet, so this resolves to
// whatever Vercel production URL is actually live — update
// NEXT_PUBLIC_SITE_URL once the real domain is wired up.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const SITE_NAME = "Active Chicagoland";
