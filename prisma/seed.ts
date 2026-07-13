// Runs via direct (non-pooled) URL — the pooler can't hold the prepared
// statements a seed script needs. Prisma 7's generated client has no
// schema-level connection, so the adapter must be constructed explicitly here
// (unlike lib/db.ts, which uses the pooled URL for runtime requests).
import "dotenv/config";
import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({
  connectionString: process.env.POSTGRES_URL_NON_POOLING!,
});
const db = new PrismaClient({ adapter });

// Each entry below is a real, currently-operating program, verified via its
// official source URL as of July 2026. Exact schedules/prices change
// seasonally — sourceUrl is the source of truth, not this file.
const listings = [
  {
    name: "Chicago Park District Senior Programs",
    slug: "chicago-park-district-senior-programs",
    description:
      "120+ Senior Citizen Clubs citywide plus seasonal classes (fitness, arts, education) offered through the Park District's four program sessions. Programs for seniors only are free; other classes are free or half-price for ages 60+.",
    category: "park-district-55-programs",
    neighborhood: "Citywide",
    county: "Cook",
    cost: "LOW_COST" as const,
    days: Prisma.DbNull,
    time: null,
    sourceUrl: "https://www.chicagoparkdistrict.com/programs-101",
  },
  {
    name: "Naperville Park District Active Adults",
    slug: "naperville-park-district-active-adults",
    description:
      "Programming for active adults and seniors including a Game Room (billiards, ping pong, cards) for ages 50+, fitness and enrichment classes, and a 20% program discount for ages 60+.",
    category: "park-district-55-programs",
    neighborhood: "Naperville",
    county: "DuPage",
    cost: "LOW_COST" as const,
    days: Prisma.DbNull,
    time: null,
    sourceUrl: "https://napervilleparks.org/activeadults",
  },
  {
    name: "Chicago Regional Senior Centers",
    slug: "chicago-regional-senior-centers",
    description:
      "Six regional and 14 satellite senior centers run by the City's Department of Family & Support Services, offering recreation, education, health/wellness programs, and benefits assistance for residents 60+ — most programs free or nominal cost.",
    category: "senior-center-events",
    neighborhood: "Citywide",
    county: "Cook",
    cost: "FREE" as const,
    days: Prisma.DbNull,
    time: null,
    sourceUrl: "https://www.chicago.gov/city/en/depts/fss/provdrs/senior/svcs/regional_senior_centers.html",
  },
  {
    name: "Elmhurst Park District Senior Program",
    slug: "elmhurst-park-district-senior-program",
    description:
      "Weekly drop-in activities (pinochle, quilting club, duplicate bridge) plus monthly themed luncheons, Bingo, Trivia, and enrichment programs like Memoir Writing, based at Mary E. Kies Recreation Center.",
    category: "senior-center-events",
    neighborhood: "Elmhurst",
    county: "DuPage",
    cost: "LOW_COST" as const,
    days: Prisma.DbNull,
    time: null,
    sourceUrl: "https://www.epd.org/programs/seniors",
  },
  {
    name: "Chicago Public Library Seniors' Circle",
    slug: "cpl-seniors-circle",
    description:
      "Monthly one-hour gatherings for older adults at CPL branches — talks, creative projects, and conversation, with a different theme each month. Free.",
    category: "library-classes",
    neighborhood: "Citywide",
    county: "Cook",
    cost: "FREE" as const,
    days: Prisma.DbNull,
    time: null,
    sourceUrl: "https://chipublib.bibliocommons.com/events/68bb538dc798579c2e8d80d3",
  },
  {
    name: "Skokie Public Library Adult Learners",
    slug: "skokie-public-library-adult-learners",
    description:
      "Free online courses (technology, health, business, the arts) plus in-person tech classes for adults, with new 6-week sessions starting monthly.",
    category: "library-classes",
    neighborhood: "Skokie",
    county: "Cook",
    cost: "FREE" as const,
    days: Prisma.DbNull,
    time: null,
    sourceUrl: "https://www.skokielibrary.info/resources-services/adult-learners",
  },
  {
    name: "Forest Preserves of Cook County S.E.N.I.O.R.S. Hikes",
    slug: "fpcc-seniors-hikes",
    description:
      "Gentle, moderately-paced guided walks and hikes for ages 55+ through the Forest Preserves' quarterly Events Guide, plus faster-paced Fitness Hikes and slower Walk & Talk nature hikes for all ages.",
    category: "walking-hiking-groups",
    neighborhood: "Countywide",
    county: "Cook",
    cost: "FREE" as const,
    days: Prisma.DbNull,
    time: null,
    sourceUrl: "https://fpdcc.com/events/category/hiking/",
  },
  {
    name: "Wheaton Park District Pickleball",
    slug: "wheaton-park-district-pickleball",
    description:
      "Weekly rotating pickleball sessions at Central Athletic Complex for players with basic experience; Silver Sneakers accepted. Session dates are seasonal — confirm the current session at the source link.",
    category: "pickleball-fitness",
    neighborhood: "Wheaton",
    county: "DuPage",
    cost: "LOW_COST" as const,
    days: ["Wednesday"],
    time: "6:30-9:30 PM (seasonal session — confirm current dates)",
    sourceUrl: "https://wheatonparkdistrict.com/programs/pickleball/",
  },
  {
    name: "Adler Planetarium Senior Admission",
    slug: "adler-planetarium-senior-admission",
    description:
      "Discounted year-round admission for ages 65+ ($10 vs. $12 general), plus an additional $2 off any day for Chicago residents and seniors. Not a single dedicated day — a standing senior discount.",
    category: "museum-senior-days",
    neighborhood: "Museum Campus",
    county: "Cook",
    cost: "LOW_COST" as const,
    days: Prisma.DbNull,
    time: null,
    sourceUrl: "https://www.adlerplanetarium.org/visit/tickets/special-offers/",
  },
  {
    name: "Bolingbrook Park District Adult Trips",
    slug: "bolingbrook-park-district-adult-trips",
    description:
      "Bus trips and extended tours for active adults — day outings and longer trips (e.g. Smoky Mountains, Pigeon Forge). Itineraries and pricing change seasonally; check the current trip calendar at the source link.",
    category: "day-trips-near-chicago",
    neighborhood: "Bolingbrook",
    county: "Will",
    cost: "PAID" as const,
    days: Prisma.DbNull,
    time: null,
    sourceUrl: "https://bolingbrookparks.org/programs/trips/",
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
