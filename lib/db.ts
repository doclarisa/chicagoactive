// Neon serverless driver adapter (WebSocket) so the client works in Vercel's
// serverless runtime. Pooled DATABASE_URL is correct here; the singleton
// guard prevents connection exhaustion during Next.js hot-reload.
import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { unstable_cache } from "next/cache";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Shared fetch for every route that needs "all published listings" --
// city/category/activities/chicago-tag pages all pull from this same set
// and filter client-side. Several of those routes use generateStaticParams,
// which means Next tries to fully prerender every one of them (every city,
// every category, ...) during `next build` -- a single DB hiccup there
// doesn't just break one page, it aborts the entire build/export and blocks
// the whole deployment (confirmed 2026-09-26: a Neon quota outage took down
// every subsequent deploy, not just the pages that touch the DB at
// runtime). unstable_cache only ever caches a *successful* result (a thrown
// error inside it is never cached), and the try/catch here is outside that
// cache so a failed attempt never poisons it -- it just falls back to an
// empty list for that one request/prerender, and the next attempt (once the
// DB is reachable) repopulates the cache normally.
const getPublishedListingsCached = unstable_cache(
  async () => prisma.listing.findMany({ where: { status: "PUBLISHED" }, orderBy: { name: "asc" } }),
  ["published-listings-all"],
  { revalidate: 3600, tags: ["listings"] },
);

export async function getPublishedListingsSafe() {
  try {
    return await getPublishedListingsCached();
  } catch (e) {
    console.error("getPublishedListingsSafe: DB unreachable, falling back to an empty list", e);
    return [];
  }
}
