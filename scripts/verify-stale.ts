// Lists every listing whose lastVerified is older than 180 days. Makes data
// decay visible — this does NOT re-verify anything automatically. A
// directory's only asset is being right, and the 32% description-correction
// rate found in Stage 1c means staleness is a real, ongoing risk, not a
// one-time cleanup.
import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.POSTGRES_URL_NON_POOLING! });
const db = new PrismaClient({ adapter });

const STALE_DAYS = 180;

async function main() {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - STALE_DAYS);

  const listings = await db.listing.findMany({
    where: { status: "PUBLISHED", lastVerified: { lt: cutoff } },
    select: { name: true, slug: true, lastVerified: true, county: true },
    orderBy: { lastVerified: "asc" },
  });

  const total = await db.listing.count({ where: { status: "PUBLISHED" } });

  if (listings.length === 0) {
    console.log(`All ${total} listings verified within the last ${STALE_DAYS} days.`);
    await db.$disconnect();
    return;
  }

  console.log(`${listings.length} / ${total} listings last verified more than ${STALE_DAYS} days ago:\n`);
  for (const l of listings) {
    const days = Math.floor((Date.now() - l.lastVerified.getTime()) / (1000 * 60 * 60 * 24));
    console.log(`  ${days}d ago  [${l.county}]  ${l.name}  (/${l.slug})`);
  }

  await db.$disconnect();
  process.exit(1);
}

main();
