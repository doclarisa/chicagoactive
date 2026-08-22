// Gyms and fitness facilities in Chicagoland that accept a Medicare fitness
// benefit (SilverSneakers, Renew Active, and/or Silver&Fit). Program
// acceptance is location-specific and changes — "verified" means we found
// the gym's own site, the program's official finder, or a specific named
// third-party source confirming that exact program at that exact location.
// "verify" means the gym is real and likely relevant but we could not pin
// down that specific program — never upgrade "verify" to "verified" without
// a real source.
export type ProgramStatus = "verified" | "verify";

export type MedicareGym = {
  slug: string;
  name: string;
  county: "Cook" | "DuPage" | "Will" | "Kane";
  area: string;
  address?: string;
  phone?: string;
  programs: {
    silverSneakers: ProgramStatus;
    renewActive: ProgramStatus;
    silverAndFit: ProgramStatus;
  };
  pool?: string;
  seniorClasses?: string;
  accessibility?: string;
  goodToKnow?: string;
  // Cross-link to an already-existing directory Listing instead of
  // duplicating it.
  existingListingSlug?: string;
  sourceUrl: string;
  verifyNotes?: string[];
};

export const MEDICARE_GYMS: MedicareGym[] = [
  {
    slug: "crestwood-recreation-wellness-center",
    name: "Crestwood Recreation & Wellness Center",
    county: "Cook",
    area: "Crestwood",
    address: "5331 W. 135th St, Crestwood, IL 60418",
    phone: "708-659-4800",
    programs: { silverSneakers: "verified", renewActive: "verified", silverAndFit: "verify" },
    pool: "Indoor pool and whirlpool — included with the $60/yr (resident) or $75/yr (non-resident) add-on membership for SilverSneakers/Renew Active members.",
    seniorClasses: "Fitness classes are included with the paid add-on membership — check the current schedule directly.",
    goodToKnow:
      "The indoor track, sport courts, and fitness center are free with a SilverSneakers or Renew Active ID number. The pool, hot tub, and fitness classes need the annual add-on membership on top of that. Sign up in person with your ID number.",
    sourceUrl: "https://crestwoodfitness.com/memberships/silver-sneakers-renew-active/",
  },
  {
    slug: "lemont-park-district-core",
    name: "The CORE Fitness & Aquatic Complex — Lemont Park District",
    county: "Cook",
    area: "Lemont",
    programs: { silverSneakers: "verified", renewActive: "verify", silverAndFit: "verify" },
    pool: "Indoor pool confirmed.",
    goodToKnow: "Fitness center, fitness classes, indoor track, and open gym are included at no extra cost with an approved SilverSneakers plan.",
    existingListingSlug: "lemont-park-district-silversneakers-core",
    sourceUrl: "https://patch.com/illinois/lemont/lemont-core-offers-silversneakers-program-for-senior-citizens",
    verifyNotes: [
      "the park district's own site consistently blocked automated verification — this is sourced from a local news report, so confirm the current class schedule directly",
    ],
  },
  {
    slug: "chicago-ridge-park-district-seniors",
    name: "Chicago Ridge Park District — Senior Programs",
    county: "Cook",
    area: "Chicago Ridge",
    address: "Freedom Activity Center, 6252 W. Birmingham Ave., Chicago Ridge, IL",
    programs: { silverSneakers: "verified", renewActive: "verify", silverAndFit: "verify" },
    seniorClasses: "Also runs a Stix & Kix drum cardio class and pickleball leagues, including a Thursday morning 40+ ladies league.",
    goodToKnow: "Exact days, times, and costs for the SilverSneakers program aren't posted online — call ahead or check the registration portal.",
    existingListingSlug: "senior-programs-chicago-ridge-park-district",
    sourceUrl: "https://chicagoridgeparks.com/seniors/",
  },
  {
    slug: "fox-valley-park-district-prisco",
    name: "Active Adults at Prisco Community Center — Fox Valley Park District",
    county: "Kane",
    area: "Aurora",
    address: "150 W. Illinois Avenue, Aurora, IL",
    programs: { silverSneakers: "verified", renewActive: "verified", silverAndFit: "verify" },
    seniorClasses: "25+ weekly fitness classes at various skill levels; certified personal trainers and nutrition consultants available.",
    goodToKnow: "One of the few facilities we found that names both SilverSneakers and Renew Active for free fitness-center access.",
    existingListingSlug: "active-adults-prisco-community-center-fox-valley-park-district",
    sourceUrl: "https://www.foxvalleyparkdistrict.org/programs-events/active-adults/",
  },
  {
    slug: "dellwood-park-community-center-golden-age-club",
    name: "Dellwood Park Community Center (Golden Age Club)",
    county: "Will",
    area: "Lockport",
    address: "1811 S. Lawrence Ave., Lockport, IL 60441",
    programs: { silverSneakers: "verified", renewActive: "verify", silverAndFit: "verify" },
    seniorClasses: "SilverSneakers Classic Stretch class for balance and flexibility; drop-in pickleball open to all skill levels.",
    goodToKnow: "Also home to the Golden Age Club, a $10 monthly themed lunch-and-bingo gathering for adults 50+ — pre-registration only, it tends to sell out.",
    existingListingSlug: "golden-age-club-dellwood-park-community-center",
    sourceUrl: "https://www.lockportpark.org/dpcc-adult-programs/",
  },
  {
    slug: "wheaton-park-district-pickleball",
    name: "Wheaton Park District — Central Athletic Complex",
    county: "DuPage",
    area: "Wheaton",
    address: "500 S. Naperville Rd., Wheaton, IL 60187",
    programs: { silverSneakers: "verified", renewActive: "verify", silverAndFit: "verify" },
    seniorClasses: "Weekly rotating pickleball sessions for players with basic experience.",
    goodToKnow: "Session dates are seasonal — confirm the current session at the source link.",
    existingListingSlug: "wheaton-park-district-pickleball",
    sourceUrl: "https://wheatonparkdistrict.com/programs/pickleball/",
  },
  {
    slug: "la-fitness-chicago-south-loop",
    name: "LA Fitness — South Loop / Canal St",
    county: "Cook",
    area: "Chicago (South Loop)",
    address: "1101 S. Canal St, Chicago, IL 60607",
    phone: "312-379-8631",
    programs: { silverSneakers: "verified", renewActive: "verify", silverAndFit: "verify" },
    pool: "Pool confirmed, with aqua aerobics classes offered.",
    seniorClasses: "Group fitness classes including yoga and low-impact options; a dedicated aqua aerobics class.",
    goodToKnow:
      "Confirmed via LA Fitness's own SilverSneakers class-locator tool and a third-party SilverSneakers-location roundup. LA Fitness also has other Chicago-area locations that participate at the chain level — confirm your specific club before you go: 5559 S. Kedzie Ave., 5224 S. Lake Park Ave. (773-358-4228), and 3435 S. Dr. Martin Luther King Dr. (312-821-7972).",
    sourceUrl: "https://www.lafitness.com/Pages/clubhome.aspx?clubid=405",
  },
  {
    slug: "la-fitness-naperville",
    name: "LA Fitness — Naperville",
    county: "DuPage",
    area: "Naperville",
    address: "3116 S Route 59, Suite 160, Naperville, IL",
    programs: { silverSneakers: "verified", renewActive: "verify", silverAndFit: "verify" },
    goodToKnow:
      "Confirmed at the chain level via LA Fitness's own SilverSneakers class-locator tool. A second Naperville location is at 2780 Fitness Drive — confirm your specific club before you go.",
    sourceUrl: "https://www.lafitness.com/Pages/FindClub.aspx?namecityzip=Naperville",
  },
  {
    slug: "cfx-charter-fitness-pulaski",
    name: "CFX (Charter Fitness) — Pulaski Corridor",
    county: "Cook",
    area: "Chicago & near suburbs",
    address: "5324 S Pulaski Rd, Chicago, IL 60632",
    phone: "872-267-7939",
    programs: { silverSneakers: "verified", renewActive: "verify", silverAndFit: "verify" },
    goodToKnow:
      "Open 24 hours. Complimentary hydromassage and towel service, full weight room; no pool confirmed. CFX's own FAQ page mentions also accepting Renew Active and Silver&Fit alongside SilverSneakers, but that page blocked automated verification, so we're only marking SilverSneakers as fully confirmed — ask at the front desk about your specific plan. CFX has 17 Chicagoland locations rebranded from Charter Fitness; three more with the Pulaski location specifically named on a SilverSneakers roundup are 2545 W 111th St, 7600 S Pulaski Rd, and 1770 S Harlem Ave (North Riverside).",
    sourceUrl: "https://www.medicareplanfinder.com/medicare/silversneakers-locations-chicago-il/",
    verifyNotes: ["Renew Active and Silver&Fit acceptance at CFX — confirm with the specific club"],
  },
  {
    slug: "edward-elmhurst-health-fitness-woodridge",
    name: "Edward-Elmhurst Health & Fitness",
    county: "DuPage",
    area: "Woodridge",
    address: "6600 Highway 53, Woodridge, IL 60517",
    programs: { silverSneakers: "verify", renewActive: "verify", silverAndFit: "verify" },
    goodToKnow:
      "A real, currently-operating medically based fitness center (fitness classes, personal training, aquatics) — but we could not verify Medicare fitness-benefit program acceptance from the gym's own site. Confirm directly before visiting.",
    sourceUrl: "https://www.eehealth.org/services/fitness/",
    verifyNotes: ["program acceptance (SilverSneakers, Renew Active, Silver&Fit) not confirmed — call ahead"],
  },
];

// Lighter-weight list: gyms named on a third-party SilverSneakers-location
// roundup that we could not individually enrich (no confirmed pool, senior
// classes, or accessibility detail). Real addresses, one confirmed program,
// worth listing — just not full cards.
export type QuickGym = {
  name: string;
  address: string;
};

export const MORE_SILVERSNEAKERS_GYMS: QuickGym[] = [
  { name: "Anytime Fitness", address: "4022 N Rockwell St, Chicago, IL 60618" },
  { name: "Anytime Fitness", address: "1647 W Chicago Ave, Chicago, IL 60622" },
  { name: "Blink Fitness", address: "3145 S Ashland Ave, Chicago, IL 60608" },
  { name: "Blink Fitness", address: "5160 S Pulaski Rd, Chicago, IL 60632" },
  { name: "Fitness 19", address: "2834 N Broadway, Chicago, IL 60657" },
  { name: "Retro Fitness Irving Park", address: "4901 W Irving Park Rd, Chicago, IL 60641" },
  { name: "Gottlieb Health & Fitness Center", address: "551 W North Ave, Chicago, IL 60160" },
  { name: "Lawndale Christian Fitness Center", address: "3750 W Ogden Ave, Chicago, IL 60623" },
  { name: "Hyde Park JCC", address: "5200 S Hyde Park Blvd, Chicago, IL 60615" },
  { name: "Pilsen Fitness", address: "1822 S Bishop St, Chicago, IL 60608" },
];
export const MORE_SILVERSNEAKERS_SOURCE_URL =
  "https://www.medicareplanfinder.com/medicare/silversneakers-locations-chicago-il/";
