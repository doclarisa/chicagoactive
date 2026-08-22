// Organized group day trips — who runs recurring trip programs for
// Chicagoland seniors, organized by who runs them (park district,
// township/senior center, or national/regional tour company). Every entry
// is a real program verified against its own official site; anything not
// confirmed is left out of the field or flagged in verifyNotes rather than
// guessed. No dated departures — every entry links to the organizer's own
// live schedule instead, since specific trips expire fast.
//
// Dedup discipline: most of these organizers already exist as Listing rows
// in the DB (built up over many area-research waves). Where that's true,
// existingListingSlug cross-links to that listing instead of creating a
// duplicate. Only organizations with no existing DB listing (the national
// tour companies) are wholly new here.
//
// tags is intentionally unpopulated — a nullable field reserved for a
// future interest-based filter (Nature/Food/Beach/etc.) once there's
// enough volume to justify it. Do not build filter UI against this yet.
import { AFFILIATES } from "./affiliates";

export type OrganizedTripProvider = {
  slug: string;
  name: string;
  group: "park-district" | "township-senior-center" | "tour-company";
  existingListingSlug?: string;
  sourceUrl: string;
  blurb: string;
  departure?: string;
  cost: string;
  whoCanJoin: string;
  howToSignUp: string;
  bookingUrl?: string;
  tags?: string[] | null;
  verifyNotes?: string[];
};

export const ORGANIZED_TRIP_PROVIDERS: OrganizedTripProvider[] = [
  // ---------- Park District senior trips ----------
  {
    slug: "bolingbrook-park-district",
    name: "Bolingbrook Park District — Adult Trips",
    group: "park-district",
    existingListingSlug: "bolingbrook-park-district-adult-trips",
    sourceUrl: "https://bolingbrookparks.org/programs/trips/",
    blurb:
      "Coach bus trips ranging from single-day outings (theater shows) to multi-day tours (a past Smoky Mountains/Pigeon Forge trip).",
    cost: "Varies by trip — not published as a general rate",
    whoCanJoin: "Open registration; discounted Resident ID pricing for Bolingbrook residents; early access for Parkie's E-Club members",
    howToSignUp:
      "Register online, or drop off/mail registration to Annerino Community Center (201 Recreation Drive) or the Recreation & Aquatic Complex (200 S. Lindsey Lane)",
    tags: null,
    verifyNotes: ["Exact per-trip cost and departure point weren't published generally — check the current trip flyer."],
  },
  {
    slug: "crystal-lake-park-district",
    name: "Crystal Lake Park District — Day Trips",
    group: "park-district",
    existingListingSlug: "crystal-lake-park-district-day-trips",
    sourceUrl: "https://www.crystallakeparks.org/active-adults",
    blurb:
      "Weekly day trips to performances, concerts, sporting events, shopping, casinos, cultural tours, and restaurant dining.",
    departure: "Varies by trip, based on group size — not a single fixed location",
    cost: "Past examples: $10-13 for a lunch-style trip; varies by destination",
    whoCanJoin: "Open registration, no residency requirement stated",
    howToSignUp:
      "Register at the Administrative Office (One East Crystal Lake Ave) or online at crystallakeparks.org; questions to Jennifer Peterson, 815-459-0680",
    tags: null,
  },
  {
    slug: "wood-dale-park-district",
    name: "Wood Dale Park District — Adult & Senior Trips",
    group: "park-district",
    existingListingSlug: "wood-dale-park-district-senior-programs-trips",
    sourceUrl: "https://www.wdparks.org/programs/adult-senior-trips/",
    blurb: "Day trips plus occasional overnight trips to restaurants, performances, and special events.",
    cost: "Resident/non-resident tiered pricing per trip (past examples: $20R/$24NR, $14R/$16NR); some longer trips require a $50 deposit",
    whoCanJoin: "Open to residents and non-residents at different price tiers",
    howToSignUp: "Register online through the Park District's registration system at wdparks.org",
    tags: null,
    verifyNotes: ["Exact departure point wasn't stated — confirm per trip."],
  },
  {
    slug: "rolling-meadows-park-district",
    name: "Rolling Meadows Park District — Adult Activity Center",
    group: "park-district",
    existingListingSlug: "adult-activity-center-rolling-meadows-park-district",
    sourceUrl: "https://rmparks.org/adult-activity-center",
    blurb: "A membership-based senior center whose membership includes discounts on day trips and overnight trips.",
    departure: "Based out of the Community Center, 3705 Pheasant Drive (Door K)",
    cost: "Membership $30/yr residents, $35/yr non-residents (discounted $15/$20 for ages 95+); trip fees cover transportation only, separate from destination costs",
    whoCanJoin: "Open to residents and non-residents at different membership rates",
    howToSignUp: "Call 847-818-3209 or email awilford@rmparks.org; membership year runs May 1-April 30",
    tags: null,
    verifyNotes: ["Membership pricing found dates to 2022 — confirm current rates before joining."],
  },
  {
    slug: "st-charles-park-district",
    name: "St. Charles Park District — Active Adult Center",
    group: "park-district",
    existingListingSlug: "st-charles-park-district-active-adult-center",
    sourceUrl: "https://www.stcparks.org/aac/",
    blurb:
      "A 50+ activity center running guided walks and trips to theaters and culturally interesting destinations, alongside lively lunches with live entertainment.",
    departure: "Based out of the Pottawatomie Community Center, 8 North Ave, St. Charles",
    cost: "Annual membership $15 residents / $23 non-residents, or $5 daily guest fee; trip costs vary separately",
    whoCanJoin: "Ages 50+; open to residents and non-residents at different rates",
    howToSignUp: "Contact Adult Activity Supervisor Lynne Yuill, 630-513-4324",
    tags: null,
  },

  // ---------- Township & senior center trips ----------
  {
    slug: "forest-park-howard-mohr",
    name: "Howard Mohr Community Center — Senior Citizens Club (Forest Park)",
    group: "township-senior-center",
    existingListingSlug: "howard-mohr-community-center-senior-citizens-club",
    sourceUrl: "https://www.forestpark.net/dfp/departments/community-center/",
    blurb: "Weekly day trips scheduled out of the Center, plus dedicated Monday and Thursday shopping trips for residents 55+.",
    departure: "Howard Mohr Community Center, 7640 Jackson Blvd, Forest Park (presumed departure point, not explicitly confirmed)",
    cost: "Verify — see official site (membership fee not published)",
    whoCanJoin: "Membership-based Senior Citizens Club, application through the Village",
    howToSignUp: "Contact Community Center Director Karen Dylewski, 708-771-7737 or kdylewski@forestpark.net",
    tags: null,
    verifyNotes: ["Membership fee and exact trip departure point weren't confirmed on official pages."],
  },
  {
    slug: "maine-township-mainestreamers",
    name: "Maine Township — MaineStreamers",
    group: "township-senior-center",
    existingListingSlug: "maine-township-mainestreamers",
    sourceUrl: "https://mainetown.com/departments/mainestreamers/",
    blurb: "A social and enrichment group for residents 55+ combining fitness classes, workshops, and organized day trips.",
    cost: "Membership is free; individual day trips have their own separate costs",
    whoCanJoin: "Maine Township residents 55+",
    howToSignUp: "Join online (add \"Join MaineStreamers\" through the Township's catalog) or call/visit the Township office, 847-297-2510",
    tags: null,
    verifyNotes: ["Per-trip departure location wasn't stated on official pages."],
  },
  {
    slug: "orland-township-senior-services",
    name: "Orland Township — Senior Trips",
    group: "township-senior-center",
    existingListingSlug: "orland-township-senior-services",
    sourceUrl: "https://orlandtownship.org/senior-trips/",
    blurb: "Day and overnight trips via reserved-seat deluxe motor coach, tickets sold first-come-first-served when they go on sale.",
    cost: "Varies by trip — past examples around $15-30 for residents",
    whoCanJoin:
      "Requires a free Township resident ID number (proof of residency required) before purchasing trip tickets; tickets limited to 2 per person, non-transferable",
    howToSignUp: "Call (708) 403-4222, Mon-Fri 9am-3pm, for the current trip schedule and ticket sale dates",
    tags: null,
    verifyNotes: ["Some trips appear resident-priced based on past examples — confirm non-resident eligibility before planning a trip."],
  },
  {
    slug: "hanover-township-senior-center",
    name: "Hanover Township — Senior Center",
    group: "township-senior-center",
    existingListingSlug: "hanover-township-senior-center",
    sourceUrl: "https://www.hanover-township.org/departments/aging-services/life-enrichment",
    blurb: "Enrichment programming that includes local day trips alongside fitness classes, tech classes, and cultural presentations.",
    departure: "Hanover Township Senior Center, 240 S IL Route 59, Bartlett (presumed departure point, not explicitly confirmed)",
    cost: "Verify — see official site",
    whoCanJoin: "Verify — see official site (serves Bartlett, Elgin, Hanover Park, Hoffman Estates, Schaumburg, Streamwood)",
    howToSignUp: "Call (630) 483-5600",
    tags: null,
    verifyNotes: ["Trip costs and eligibility weren't confirmed on official pages — call ahead."],
  },

  // ---------- Guided tour companies ----------
  {
    slug: "road-scholar",
    name: "Road Scholar",
    group: "tour-company",
    sourceUrl: "https://www.roadscholar.org/",
    blurb:
      "A nonprofit educational travel program for ages 50+. Verified: their programs, including Chicago-area ones, are multi-day (shortest run about 3 days with lodging) — not single-day excursions.",
    cost: "Shorter 3-5 day domestic programs can run under $1,000/person; longer international trips cost more",
    whoCanJoin: "Adults 50+ (and a companion), nationwide",
    howToSignUp: "Browse and book directly at roadscholar.org",
    bookingUrl: AFFILIATES.roadScholar.url, // AFFILIATE: replace with Road Scholar link (see lib/affiliates.ts)
    tags: null,
    verifyNotes: ["Confirmed this is not a day-trip provider — shortest programs are 3 days minimum with lodging included."],
  },
  {
    slug: "jones-travel",
    name: "Jones Travel",
    group: "tour-company",
    sourceUrl: "https://www.jonestravel.com/senior-travel.html",
    blurb:
      "A senior motorcoach service running since 1969, based in Elkhorn, WI, with regular trips into Chicago, Milwaukee, Madison, Wisconsin Dells, and Rockford. Fleet includes handicap-accessible coaches.",
    cost: "Not published — request a quote",
    whoCanJoin: "Open to the public",
    howToSignUp: "Call 800-236-3160 or request a quote on their site; current trip lineup is under Popular Trips",
    tags: null,
  },
  {
    slug: "cardinal-buses",
    name: "Cardinal Buses",
    group: "tour-company",
    sourceUrl: "https://www.cardinalbuses.com/",
    blurb:
      "A motorcoach company operating since 1923 out of Indiana and Michigan, known locally for Amish-country day tours and popular with senior and retiree groups. Coaches can be lift-equipped and accommodate wheelchairs, scooters, and rollators on request.",
    cost: "Not published — request a quote",
    whoCanJoin: "Open to the public",
    howToSignUp: "Call 800-348-7487 or email info@cardinalbuses.com — mention accessibility needs when booking",
    tags: null,
  },
];
