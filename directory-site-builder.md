---
name: directory-site-builder
description: >
  Scaffold, build, and DEPLOY a directory / listings website (e.g. "dog parks
  near me", "vegan restaurants", "senior care facilities") on Next.js + Prisma +
  Postgres (Neon) + Vercel. Use this WHENEVER starting a new directory, listings
  site, "near me" site, or local-business aggregator, OR when hitting
  database-connection or Vercel-deploy problems on this stack — even if the word
  "directory" is never said. It bakes in the exact setup and deploy sequence that
  otherwise eats hours: SQLite-can't-run-on-serverless, Neon pooled vs. direct
  URLs, Prisma reading .env not .env.local, prisma.config.ts + dotenv, the Neon
  driver adapter, the postinstall generate hook, and Vercel's Deployment
  Protection wall. Read this before writing any schema, running any migration, or
  pushing to Vercel.
---

# Directory Site Builder

One file, everything in it: how to build a directory website and — more
importantly — how to get it live on Vercel without losing an afternoon to the
same handful of invisible traps every time.

**Contents**
1. [Why directories, and what to optimize for](#1-philosophy)
2. [The golden path (correct order)](#2-golden-path)
3. [Scaffold & install](#3-scaffold)
4. [Database rules — the five that cost hours](#4-database-rules)
5. [Full connection walkthrough](#5-connection-walkthrough)
6. [Deploying to Vercel — the traps](#6-deploy-traps)
7. [The skeleton (structure, pages, schema)](#7-skeleton)
8. [Copy-paste templates](#8-templates)
9. [Pre-launch checklist](#9-checklist)
10. [Symptom → cause table](#10-symptoms)

---

## 1. Philosophy <a id="1-philosophy"></a>

What actually makes a directory work: **enrich the data** so it saves people the
time Google Maps wastes, go **mobile-first** (80 %+ of directory traffic is
mobile), publish **many SEO landing pages** ("X in <city>", "X near me"), and
keep the site **ugly-but-useful** rather than pretty-but-empty. Design almost
never moves the needle; answering the exact query does. Pick a low-competition,
evergreen niche and build the value into the listing pages.

---

## 2. The golden path — never reorder <a id="2-golden-path"></a>

The single most common failure is pushing before the database exists and works;
that just ships a build with nothing to connect to.

1. **Scaffold** the Next.js app + Prisma → §3
2. **Model** the listing → §7
3. **Create the Neon database** and connect the project → §5
4. **Wire the connection** (the landmine field) → §4 + §5
5. **Migrate → seed → verify the build locally**
6. **Configure the deploy** (postinstall, driver adapter, Deployment Protection) → §6
7. **Only now** commit and push

If you're mid-build and stuck, jump to §4/§5 for DB errors or §6 for "it deploys
but I can't see it / the client won't build."

---

## 3. Scaffold & install <a id="3-scaffold"></a>

```bash
npx create-next-app@latest my-directory --ts --tailwind --app --eslint
cd my-directory

# Prisma + the Neon serverless driver adapter (needed for Vercel's serverless runtime)
npm i prisma @prisma/client @prisma/adapter-neon @neondatabase/serverless
npm i -D tsx        # runs the seed script

npx prisma init --datasource-provider postgresql
```

Then create the files from §8: `prisma/schema.prisma`, `prisma.config.ts`,
`lib/db.ts`, `prisma/seed.ts`, `.env`, and the `package.json` scripts. Before any
real connection string goes in `.env`, confirm it's ignored:

```bash
git check-ignore .env      # must print ".env"
```

Next.js's default `.gitignore` covers `.env*`, but verify — a leaked connection
string is the one mistake here you can't fully undo.

---

## 4. Database rules — the five that cost hours <a id="4-database-rules"></a>

**0. SQLite cannot run on Vercel.** Vercel's serverless filesystem is read-only
and ephemeral, so a `file:./dev.db` SQLite database can't be written to or
persisted — it works locally and silently dies in production. A directory needs a
networked Postgres (Neon). If you inherited a SQLite schema, the migration is:
switch `provider` to `postgresql`, provision Neon, wire the driver adapter,
**delete the old SQLite migrations folder and regenerate** (`prisma migrate dev
--name init` against Postgres), because SQLite and Postgres migration SQL aren't
interchangeable.

**1. Prisma reads `.env`, not `.env.local`.** `vercel env pull` and Next.js write
to `.env.local` / `.env.development.local`; Prisma ignores those. Put the DB
strings in **`.env`**.

**2. With a `prisma.config.ts`, Prisma no longer auto-loads `.env`.** Add
`import "dotenv/config";` as the first line of `prisma.config.ts`, or every
command fails with "environment variable not found" while the value sits plainly
in `.env`.

**3. Two connection strings, not one.** Neon serves a *pooled* and a *direct* URL.
Runtime uses pooled; **migrations and seeds must use direct**, because the pooler
(PgBouncer, transaction mode) can't hold the locks/prepared statements they need.

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")             // pooled  — runtime
  directUrl = env("POSTGRES_URL_NON_POOLING") // direct  — migrations & seeds
}
```

The pooled host contains `-pooler`; the direct host does not.

**4. Check your actual variable names — don't assume.** The Vercel↔Neon
integration ships either modern names (`DATABASE_URL`, `DATABASE_URL_UNPOOLED`)
or legacy ones (`DATABASE_URL`, `POSTGRES_URL_NON_POOLING`). Open Vercel →
Environment Variables and point `directUrl` at whichever *unpooled/non-pooling*
name you actually have.

**5. The connection string lives in Neon, not Vercel.** Vercel marks these vars
"Sensitive" — the plaintext can never be read back (dashboard or CLI). And the
integration often scopes them to Production/Preview only, so a default
`vercel env pull` (which targets Development) fetches nothing. **Source of truth:
Neon Console → project → Dashboard → the blue "Connect" button.**

---

## 5. Full connection walkthrough <a id="5-connection-walkthrough"></a>

### Create the database
Vercel → project → **Storage** → add **Postgres (Neon)** from the Marketplace →
pick region + Free plan + name → **Connect Project**, and **tick Development** too
if you want local `vercel env pull` to ever work. (In Neon, a "Database" is a
*Project*; the default branch is usually `main`, not `production`.)

### Copy the two strings from Neon
Neon Console (Vercel → Storage → **Open in Neon**) → left sidebar **Dashboard** →
top-right blue **Connect** button. *This button is the one people miss — it is not
on the Overview/Roles pages, only the Dashboard.* In the dialog:
- Branch `main` · Database `neondb` · Role `*_owner`
- **Pooling ON** → copy → **pooled** URL (`-pooler` in host) → `DATABASE_URL`
- **Pooling OFF** → copy → **direct** URL (no `-pooler`) → `POSTGRES_URL_NON_POOLING`

Optionally append `&connect_timeout=15` to the pooled URL so Neon's scale-to-zero
cold start doesn't time out the first query.

### Put them in `.env` (the file Prisma reads)
See the `.env` template in §8. Edit it in your own editor — never paste a live
connection string into a chat window or a commit.

### Migrate, seed, verify
```bash
npx prisma migrate dev --name init   # via directUrl
npm run seed                         # via directUrl; pooled URL breaks seeds
npm run build                        # must pass locally BEFORE any push
```

Neon Free scales to zero, so the first command after idle takes a few seconds to
wake the compute — a cold start, not a hang. Spot-check the rows landed in Neon →
**Tables**.

---

## 6. Deploying to Vercel — the traps <a id="6-deploy-traps"></a>

The app can be fully working locally and still fail on Vercel for reasons that
have nothing to do with your code. Three to configure up front.

### A. `postinstall` hook so the Prisma client builds
Vercel caches dependencies between builds and **won't re-run `prisma generate`**,
so the generated client goes stale or missing and the build fails with
"@prisma/client did not initialize yet." Fix it permanently in `package.json`:

```json
{ "scripts": { "postinstall": "prisma generate" } }
```

### B. The Neon driver adapter for serverless runtime
Vercel runs your app in a serverless/edge environment where the classic TCP
Postgres driver is unreliable. Use `@prisma/adapter-neon` (GA since Prisma
v6.16.0 — on older Prisma add `previewFeatures = ["driverAdapters"]` to the
generator) so the client talks to Neon over WebSocket. The runtime connection is
configured in code (`lib/db.ts`, §8), using the **pooled** `DATABASE_URL`; the
`url`/`directUrl` in the schema stay for the Prisma CLI and migrations.

### C. The Deployment Protection wall (the invisible one)
Your build can succeed, the app can be live, and visitors still hit a Vercel
login screen. That's **Deployment Protection → Vercel Authentication**, which is
enabled by default and gates preview + `*.vercel.app` deployment URLs (on Hobby,
your production *custom domain* stays public, but the deployment URLs don't). A
directory that the public — and Googlebot — can't reach is worthless.

Fix: Vercel → project → **Settings → Deployment Protection → Vercel
Authentication** → set to **None** (or disable Standard Protection) to make
deployments publicly accessible. Note it's **per-project** — there's no team-wide
default to turn it off, so you'll do this on every directory you ship. Deployments
without a custom domain are then public and indexable, which for a directory is
the point.

### The deploy order
1. `postinstall: prisma generate` in `package.json`
2. `lib/db.ts` uses the Neon adapter with pooled `DATABASE_URL`
3. Env vars present in Vercel for Production (they are, from the integration)
4. Push → build succeeds
5. **Settings → Deployment Protection → Vercel Authentication → None**
6. Visit the production URL in a private window to confirm no login wall

---

## 7. The skeleton <a id="7-skeleton"></a>

### Folder structure (App Router)
```
app/
  layout.tsx              # mobile nav drawer, footer, base styles
  page.tsx                # home: hero + search + featured + category/location grid
  search/page.tsx         # browse + filters (mobile-first)
  [slug]/page.tsx         # single listing detail (enriched data lives here)
  category/[category]/page.tsx    # "best <thing> for <category>"
  location/[location]/page.tsx    # "<thing> in <city>" / "near me"
  about/page.tsx
  contact/page.tsx
  claim/page.tsx          # owner claims a listing
  pricing/page.tsx        # only meaningful when PAYMENTS_ENABLED
  admin/page.tsx          # approve/reject PENDING listings
  api/                    # route handlers (search, claim submit, admin actions)
components/  ListingCard.tsx  SearchBar.tsx  FilterPanel.tsx  Map.tsx (optional)
lib/         db.ts  slug.ts
prisma/      schema.prisma  seed.ts
```

### Page types, and why each exists
- **Home** — orientation + search + a few featured. Low SEO value; don't over-invest.
- **Search/browse** — the utility page; filters must work one-handed on a phone.
- **Listing detail (`/[slug]`)** — where enriched data earns trust: hours, phone,
  the specific question people ask that the map doesn't answer.
- **Category & Location landings** — the SEO engine, generated programmatically
  from your data. Ranking traffic mostly lands here, not on the home page.
- **Claim / Pricing** — monetization, built behind a `PAYMENTS_ENABLED` flag with
  a dormant Stripe layer, so the directory ships free and payments wire in later.
- **Admin** — a minimal gate to move listings PENDING → PUBLISHED.

The data model is one generous `Listing` (schema in §8) plus `Tier`
(FREE/FEATURED) and `ListingStatus` (PUBLISHED/PENDING) enums. Promote category or
location to their own models only when they need first-class page metadata.

---

## 8. Copy-paste templates <a id="8-templates"></a>

### `prisma/schema.prisma`
```prisma
generator client {
  provider = "prisma-client-js"
  // On Prisma < 6.16, also add: previewFeatures = ["driverAdapters"]
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")             // pooled  — runtime
  directUrl = env("POSTGRES_URL_NON_POOLING") // direct  — migrations & seeds
}

model Listing {
  id          String        @id @default(cuid())
  name        String
  slug        String        @unique
  description String?

  address     String?
  city        String
  county      String?
  region      String?
  zip         String?
  lat         Float?
  lng         Float?

  phone       String?
  website     String?
  email       String?

  categories  Json          // string[]
  enriched    Json?         // niche-specific structured data lives here

  tier        Tier          @default(FREE)
  status      ListingStatus @default(PENDING)

  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  @@index([city])
  @@index([status])
}

enum Tier { FREE  FEATURED }
enum ListingStatus { PUBLISHED  PENDING }
```

### `prisma.config.ts` (project root)
```ts
// The first line is the fix: with a prisma.config.ts present, Prisma does NOT
// auto-load .env. Without it, every prisma command fails "environment variable
// not found" even though .env holds the value.
import "dotenv/config";

import path from "node:path";
import type { PrismaConfig } from "prisma";

export default {
  schema: path.join("prisma", "schema.prisma"),
  migrations: { seed: "tsx prisma/seed.ts" },
} satisfies PrismaConfig;
```

### `lib/db.ts` — Prisma client singleton with the Neon adapter
```ts
// Uses the Neon serverless driver adapter (WebSocket) so the client works in
// Vercel's serverless runtime. Pooled DATABASE_URL is correct here. The
// singleton guard prevents connection exhaustion during Next.js hot-reload.
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

### `prisma/seed.ts` — idempotent seed
```ts
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient(); // seed runs in Node; direct URL via config
const listings = [/* parsed from your source data */];

async function main() {
  for (const l of listings) {
    await db.listing.upsert({ where: { slug: l.slug }, update: l, create: l });
  }
  console.log(`Seeded ${listings.length} listings`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());   // always disconnect standalone scripts
```

### `package.json` scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "postinstall": "prisma generate",
    "seed": "tsx prisma/seed.ts"
  }
}
```

### `.env` (copy to `.env`, NOT `.env.local`; never commit real values)
```dotenv
# From Neon Console -> Dashboard -> Connect:
#   pooling ON  = pooled  -> DATABASE_URL             (host has -pooler)
#   pooling OFF = direct  -> POSTGRES_URL_NON_POOLING (host has no -pooler)
DATABASE_URL=""
POSTGRES_URL_NON_POOLING=""

# app config (not database)
ADMIN_PASSWORD="dev-admin-password"
PAYMENTS_ENABLED=false
```

> **Prisma 7 note:** v7 moves the connection URL out of `schema.prisma` (no `url`
> in the datasource) and into `prisma.config.ts`, and changes the client import
> path to your generated output. The setup above is the Prisma 6 form. If you're
> on 7, keep the adapter in `lib/db.ts` the same and move the connection config
> per the Prisma 7 docs.

---

## 9. Pre-launch checklist <a id="9-checklist"></a>

Database & schema
- [ ] `provider` is `postgresql` (no leftover `sqlite`, no `file:./dev.db`)
- [ ] old SQLite migrations deleted; migrations regenerated against Postgres
- [ ] `.env` (not `.env.local`) holds real pooled + direct strings
- [ ] `prisma.config.ts` starts with `import "dotenv/config";`
- [ ] datasource has both `url` and `directUrl`, matching your real var names
- [ ] `git check-ignore .env` prints `.env`
- [ ] `prisma migrate dev` + `npm run seed` succeeded; rows visible in Neon → Tables
- [ ] `npm run build` passed locally

Deploy
- [ ] `postinstall: prisma generate` in `package.json`
- [ ] `lib/db.ts` uses the Neon adapter with pooled `DATABASE_URL`
- [ ] pushed; Vercel build succeeded
- [ ] **Settings → Deployment Protection → Vercel Authentication → None**
- [ ] production URL loads in a private window with **no login wall**
- [ ] a listing detail page and a location/category landing page both render live

---

## 10. Symptom → cause table <a id="10-symptoms"></a>

| Symptom | Cause / fix |
|---|---|
| Works locally, DB fails in production; data doesn't persist | SQLite on Vercel's read-only serverless FS → move to Neon Postgres |
| "environment variable not found: DATABASE_URL" | Value in `.env.local` not `.env`, or missing `import "dotenv/config"` in `prisma.config.ts` |
| `vercel env pull` writes a file with no DB vars | Vars scoped to Production/Preview only; pull defaults to Development |
| Can't reveal/copy the value in Vercel | Var is "Sensitive" — get it from Neon → Connect instead |
| Migration hangs or throws a lock error | Running against pooled URL; migrations need `directUrl` (direct) |
| Seed fails with prepared-statement error | Seeding through the pooled URL (PgBouncer); use the direct URL |
| Build fails: "@prisma/client did not initialize yet" | Missing `postinstall: prisma generate` (Vercel caches deps, skips generate) |
| Runtime "prepared statement already exists" | PgBouncer + Prisma; append `?pgbouncer=true` to pooled `DATABASE_URL` |
| First query after idle takes ~5s | Neon Free cold start (scale-to-zero); add `&connect_timeout=15`, expected |
| App deployed and working but visitors hit a Vercel login screen | Deployment Protection → Vercel Authentication on → set to None (per project) |
| Site live but not showing in Google | Deployment URL was protected/non-public; only public deployments are indexable |
