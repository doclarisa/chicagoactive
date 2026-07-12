// Prisma 7 has no separate `directUrl` field on datasource, unlike the
// schema-level `url`/`directUrl` split in Prisma 6. The CLI (migrate/seed)
// needs Neon's DIRECT (non-pooled) connection because the pooler (PgBouncer,
// transaction mode) can't hold the locks/prepared statements migrations need.
// Runtime keeps using the POOLED DATABASE_URL, wired separately in lib/db.ts.
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env["POSTGRES_URL_NON_POOLING"],
  },
});
