import "dotenv/config";
import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.POSTGRES_URL_NON_POOLING! });
const db = new PrismaClient({ adapter });

const listings = [
  {
    name: "Block Museum of Art",
    slug: "block-museum-of-art-northwestern",
    description:
      "The Block Museum of Art is Northwestern University's free, open-to-the-public art museum, with rotating exhibitions across three galleries and free screenings through Block Cinema. Admission and on-site parking are both free, so it's an easy add to any outing without a membership or a discount day to plan around. It's open Wednesday through Sunday (closed Monday and Tuesday), with academic-year hours that shift in summer.",
    category: "museum-senior-days",
    operatorType: "museum",
    activities: Prisma.DbNull,
    neighborhood: "Evanston",
    county: "Cook",
    city: "Evanston",
    citySlug: "evanston",
    cost: "FREE" as const,
    days: Prisma.DbNull,
    time: null,
    sourceUrl: "https://www.blockmuseum.northwestern.edu/visit/",
    lastVerified: new Date("2026-08-20"),
    address: "40 Arts Circle Drive, Evanston, IL 60208",
    phone: "847-491-4000",
    hours: "Wed-Fri 12-8pm, Sat-Sun 12-5pm; closed Mon-Tue (academic-year hours — verify for summer/holidays)",
    ageEligibility: null,
    registration: "No registration needed for general admission; check the museum's site for any ticketed events",
    accessibility: "Verify — see official site (accessibility info is published via Northwestern's facilities pages)",
    residentRequired: false,
    lat: 42.0522319,
    lng: -87.6727148,
    geoPrecision: "exact",
  },
  {
    name: "Evanston Art Center",
    slug: "evanston-art-center-adult-classes",
    description:
      "Evanston Art Center teaches adult classes across seven studio departments — drawing and painting, ceramics, jewelry, printmaking, figure sculpture, woodworking, and digital media/photography — plus standalone art seminars and one-day workshops. Registration runs year-round and can be done online, by phone, by mail, or in person, and the center offers financial aid and payment plans for students who need them. Exact tuition varies by class and isn't posted in one place, so check the specific class you're interested in for its price.",
    category: "museum-senior-days",
    operatorType: "nonprofit",
    activities: JSON.stringify(["art-classes"]),
    neighborhood: "Evanston",
    county: "Cook",
    city: "Evanston",
    citySlug: "evanston",
    cost: "PAID" as const,
    days: Prisma.DbNull,
    time: null,
    sourceUrl: "https://www.evanstonartcenter.org/school/dept/adult-classes-department",
    lastVerified: new Date("2026-08-20"),
    address: "1717 Central Street, Evanston, IL 60201",
    phone: null,
    hours: null,
    ageEligibility: "Open to adults; some individual classes are listed Ages 16+",
    registration: "Verify — see official site for current class fees; register online, by phone, mail-in, or walk-in",
    accessibility: "Verify — see official site",
    residentRequired: false,
    lat: 42.0645887,
    lng: -87.6969203,
    geoPrecision: "exact",
  },
  {
    name: "McGaw YMCA",
    slug: "mcgaw-ymca-evanston",
    description:
      "McGaw YMCA runs open pickleball on six indoor courts, with beginner, intermediate, and drill areas set aside during weekday mornings plus additional open-play windows on weekday afternoons, two weeknight evenings, and weekends. Open play is for members only, with equipment provided. The Y also lists Active Older Adults programming under its Health & Fitness section, though the specific classes and schedule weren't published on their site when we checked — call ahead to ask what's currently running.",
    category: "pickleball-fitness",
    operatorType: "nonprofit",
    activities: JSON.stringify(["pickleball", "fitness-classes"]),
    neighborhood: "Evanston",
    county: "Cook",
    city: "Evanston",
    citySlug: "evanston",
    cost: "PAID" as const,
    days: Prisma.DbNull,
    time: null,
    sourceUrl: "https://www.mcgawymca.org/programs/sports/pickleball/",
    lastVerified: new Date("2026-08-20"),
    address: "1000 Grove Street, Evanston, IL 60201",
    phone: "847-475-7400",
    hours: "Pickleball open play Mon-Fri 9am-3pm plus Mon/Tue 6-8pm and weekend hours; general facility hours — verify see official site",
    ageEligibility: "Verify — see official site (Active Older Adults program specifics not published as of last check)",
    registration: "Members only; join at mcgawymca.org or call 847-475-7400",
    accessibility: null,
    residentRequired: false,
    lat: 42.0452041,
    lng: -87.6854864,
    geoPrecision: "exact",
  },
  {
    name: "North Shore Senior Center",
    slug: "north-shore-senior-center-northfield",
    description:
      "North Shore Senior Center runs Lifelong Learning programming — classes, clubs, day trips, and concerts — alongside fitness and wellness offerings, caregiver support, and counseling services, from its Northfield campus about 4 miles from downtown Evanston. It isn't an Evanston-run facility, but the center's own site confirms Evanston residents are eligible for at least its caregiver and respite services; eligibility for other programs varies by offering, so it's worth calling to confirm before you go. Membership or program fees vary by what you sign up for.",
    category: "senior-center-events",
    operatorType: "senior-center",
    activities: JSON.stringify(["lifelong-learning"]),
    neighborhood: "Northfield",
    county: "Cook",
    city: "Northfield",
    citySlug: "northfield",
    cost: "LOW_COST" as const,
    days: Prisma.DbNull,
    time: null,
    sourceUrl: "https://www.nssc.org/respite-for-the-caregiver",
    lastVerified: new Date("2026-08-20"),
    address: "161 Northfield Road, Northfield, IL 60093",
    phone: "847-784-6000",
    hours: "Mon-Fri 9am-5pm",
    ageEligibility: "Verify — see official site; eligibility for specific programs varies (some are township-restricted)",
    registration: "Verify — see official site or call 847-784-6000",
    accessibility: null,
    residentRequired: null,
    lat: 42.0960752,
    lng: -87.7702326,
    geoPrecision: "exact",
  },
];

async function main() {
  for (const l of listings) {
    await db.listing.upsert({ where: { slug: l.slug }, update: l, create: l });
    console.log(`Upserted: ${l.name}`);
  }
  console.log(`Done. ${listings.length} Evanston-area listings added/updated.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
