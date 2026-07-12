// Runs via direct (non-pooled) URL — the pooler can't hold the prepared
// statements a seed script needs. Prisma 7's generated client has no
// schema-level connection, so the adapter must be constructed explicitly here
// (unlike lib/db.ts, which uses the pooled URL for runtime requests).
import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({
  connectionString: process.env.POSTGRES_URL_NON_POOLING!,
});
const db = new PrismaClient({ adapter });

const listings = [
  {
    name: "Placeholder Listing — Cook County",
    slug: "placeholder-listing-cook-county",
    description: "Smoke-test row to confirm the DB round-trip works end to end. Not a real listing.",
    city: "Chicago",
    county: "Cook",
    categories: ["Walking & Hiking Groups"],
    status: "PUBLISHED" as const,
  },
];

async function main() {
  for (const l of listings) {
    await db.listing.upsert({ where: { slug: l.slug }, update: l, create: l });
  }
  console.log(`Seeded ${listings.length} listing(s)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
