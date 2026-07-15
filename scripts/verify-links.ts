// HEAD-checks every listing's sourceUrl and reports dead ones. Run before
// trusting `lastVerified` dates, and periodically thereafter — a directory's
// only asset is being right, and stale dead links are the fastest way to
// lose that.
import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.POSTGRES_URL_NON_POOLING! });
const db = new PrismaClient({ adapter });

const UA = "Mozilla/5.0 (compatible; ActiveChicagolandLinkCheck/1.0)";

async function check(url: string): Promise<number | string> {
  try {
    // Some sites block HEAD; fall back to GET.
    let res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
      headers: { "User-Agent": UA },
    });
    if (res.status === 405 || res.status === 403) {
      res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: AbortSignal.timeout(15000),
        headers: { "User-Agent": UA },
      });
    }
    return res.status;
  } catch (e) {
    return (e as Error).message;
  }
}

async function main() {
  const listings = await db.listing.findMany({
    where: { status: "PUBLISHED" },
    select: { name: true, slug: true, sourceUrl: true },
    orderBy: { name: "asc" },
  });

  let deadCount = 0;
  for (const l of listings) {
    if (!l.sourceUrl) {
      console.log(`NO SOURCE URL: ${l.name} (${l.slug})`);
      deadCount++;
      continue;
    }
    const result = await check(l.sourceUrl);
    const ok = typeof result === "number" && result >= 200 && result < 400;
    if (!ok) {
      deadCount++;
      console.log(`DEAD [${result}] ${l.name} -> ${l.sourceUrl}`);
    } else {
      console.log(`ok [${result}] ${l.name}`);
    }
  }

  console.log(`\n${listings.length - deadCount}/${listings.length} links OK, ${deadCount} need attention.`);
  await db.$disconnect();
  process.exit(deadCount > 0 ? 1 : 0);
}

main();
