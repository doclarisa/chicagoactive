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
  // --- Added to cover Lake, Kane, McHenry, and Kendall counties, and to
  // fill out the thinner categories (walking/hiking, senior centers,
  // pickleball, museum days, library classes, park district) ---
  {
    name: "Lake County Forest Preserves Adult & Senior Group Programs",
    slug: "lake-county-forest-preserves-senior-programs",
    description:
      "History and nature-based group programs for adults and seniors, led by Forest Preserve education and Dunn Museum staff, offered both in-person and virtually across Lake County's preserves.",
    category: "walking-hiking-groups",
    neighborhood: "Countywide",
    county: "Lake",
    cost: "FREE" as const,
    days: Prisma.DbNull,
    time: null,
    sourceUrl: "https://www.lcfpd.org/things-to-do/education/adult-and-senior-programs/",
  },
  {
    name: "Forest Preserve District of Kane County Nature Program Series",
    slug: "kane-county-forest-preserve-nature-series",
    description:
      "Monthly guided walks with Forest Preserve naturalists exploring a different preserve each time, covering the natural and cultural history of the land. Co-sponsored with the St. Charles and Geneva Park Districts.",
    category: "walking-hiking-groups",
    neighborhood: "Countywide",
    county: "Kane",
    cost: "FREE" as const,
    days: Prisma.DbNull,
    time: null,
    sourceUrl: "http://www.kaneforest.com/public-nature-programs",
  },
  {
    name: "St. Charles Park District Active Adult Center",
    slug: "st-charles-park-district-active-adult-center",
    description:
      "Daily drop-in center inside the Pottawatomie Community Center with health/wellness talks and educational programs. Annual membership $15 residents / $23 nonresidents, or $5 daily guest fee.",
    category: "senior-center-events",
    neighborhood: "St. Charles",
    county: "Kane",
    cost: "LOW_COST" as const,
    days: Prisma.DbNull,
    time: null,
    sourceUrl: "https://www.stcparks.org/aac/",
  },
  {
    name: "Crystal Lake Park District Grand Oaks Active Senior Center",
    slug: "crystal-lake-grand-oaks-active-senior-center",
    description:
      "Free drop-in senior center, open to residents and non-residents, with weekly activities: cards, Bingo, Wii Bowling, guest speakers, social clubs and dinners, plus senior-specific fitness classes.",
    category: "senior-center-events",
    neighborhood: "Crystal Lake",
    county: "McHenry",
    cost: "FREE" as const,
    days: Prisma.DbNull,
    time: null,
    sourceUrl: "https://www.crystallakeparks.org/active-adults",
  },
  {
    name: "Crystal Lake Park District Day Trips",
    slug: "crystal-lake-park-district-day-trips",
    description:
      "Fee-based day trips organized through the Grand Oaks Active Senior Center — performances, concerts, sporting events, shopping, casinos, and cultural tours.",
    category: "day-trips-near-chicago",
    neighborhood: "Crystal Lake",
    county: "McHenry",
    cost: "PAID" as const,
    days: Prisma.DbNull,
    time: null,
    sourceUrl: "https://www.crystallakeparks.org/active-adults",
  },
  {
    name: "Oswego Senior & Community Center",
    slug: "oswego-senior-community-center",
    description:
      "Community center for older adults with free computer and mobile-device technology classes plus one-on-one help, weekly healthy-lifestyle classes, and international cooking classes.",
    category: "senior-center-events",
    neighborhood: "Oswego",
    county: "Kendall",
    cost: "FREE" as const,
    days: Prisma.DbNull,
    time: null,
    sourceUrl: "https://oswegoseniorcenter.org/",
  },
  {
    name: "Vernon Hills Park District Pickleball",
    slug: "vernon-hills-park-district-pickleball",
    description:
      "Free pickleball on 12 courts (6 indoor, 6 outdoor) with senior resident-specific scheduled hours, plus Pickleball 123/456 classes for beginners and beyond.",
    category: "pickleball-fitness",
    neighborhood: "Vernon Hills",
    county: "Lake",
    cost: "FREE" as const,
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
    time: "Senior resident hours: Tue/Wed 1-3pm, Mon/Thu 7-9pm, Sun 9am-12pm",
    sourceUrl: "https://www.vhparkdistrict.org/pickleball-3/",
  },
  {
    name: "Cantigny Park Senior Membership",
    slug: "cantigny-park-senior-membership",
    description:
      "Discounted senior membership (ages 65+) to the gardens, museums, and grounds at $50/$90 for one or two years — the same benefits as a Basic membership at a reduced rate.",
    category: "museum-senior-days",
    neighborhood: "Wheaton",
    county: "DuPage",
    cost: "PAID" as const,
    days: Prisma.DbNull,
    time: null,
    sourceUrl: "https://cantigny.org/plan-your-visit/hours-and-fees/",
  },
  {
    name: "Gail Borden Public Library Older Adult Services",
    slug: "gail-borden-library-older-adult-services",
    description:
      "Free technology classes, a Memory Café for people with early-stage dementia and their care partners, and social programs for seniors, family members, and caregivers.",
    category: "library-classes",
    neighborhood: "Elgin",
    county: "Kane",
    cost: "FREE" as const,
    days: Prisma.DbNull,
    time: null,
    sourceUrl: "https://gailborden.info/older-adult-services",
  },
  {
    name: "Mundelein Park & Recreation District Active Adults",
    slug: "mundelein-park-district-active-adults",
    description:
      "Social, health, and wellness activities for ages 50-61 at the Regent Center, Monday through Friday. Membership $30 residents / $45 nonresidents.",
    category: "park-district-55-programs",
    neighborhood: "Mundelein",
    county: "Lake",
    cost: "LOW_COST" as const,
    days: Prisma.DbNull,
    time: null,
    sourceUrl: "https://www.mundeleinparks.org/programs/active-adults/",
  },
  // --- Added to further fill out Will and Kendall, the two thinnest counties ---
  {
    name: "Plainfield Township Senior Services",
    slug: "plainfield-township-senior-services",
    description:
      "Active Adult programs at the Plainfield Township Community Center, plus a Senior Shuttle bus service for residents. Call ahead for the current activity schedule.",
    category: "senior-center-events",
    neighborhood: "Plainfield",
    county: "Will",
    cost: "FREE" as const,
    days: Prisma.DbNull,
    time: null,
    sourceUrl: "https://plainfield-township.com/senior-services/",
  },
  {
    name: "Yorkville Senior Services & Programs",
    slug: "yorkville-senior-services-programs",
    description:
      "Weekday classes and activities for older adults at the Beecher Center, run through the City's partnership with Senior Services Associates — recreation, education, exercise, screenings, and outings, including a free Fit & Strong exercise class.",
    category: "senior-center-events",
    neighborhood: "Yorkville",
    county: "Kendall",
    cost: "FREE" as const,
    days: ["Monday", "Thursday"],
    time: "Fit & Strong class meets Mondays and Thursdays; other classes run weekdays",
    sourceUrl: "https://www.yorkville.il.us/244/Senior-Services-Programs",
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
