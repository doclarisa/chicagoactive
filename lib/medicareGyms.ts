// Gyms and fitness facilities in Chicagoland that accept a Medicare fitness
// benefit (SilverSneakers, Renew Active, and/or Silver&Fit). Program
// acceptance is location- and chain-specific and changes over time — a wrong
// "yes" sends someone on a wasted trip, so this file separates every gym
// into one of three honest confidence tiers. Never upgrade an entry's tier
// on a guess; when unsure, it belongs in the lower tier.
//
// TIER 1 — VERIFIED: program acceptance confirmed on the gym's own site, an
// official program finder (silversneakers.com, UHC's Renew Active finder,
// silverandfit.com), or (rarely) a dedicated news article specifically about
// that location's program — not a generic roundup mention. Fully enriched.
//
// TIER 2 — HIGH CONFIDENCE: a CHAIN documentably participates broadly (the
// chain-level claim itself is sourced), listed with real addresses in the
// metro. Not individually verified per-location — say so honestly.
//
// TIER 3 — REPORTED, UNCONFIRMED: named on a third-party roundup with a real
// address, nothing else confirms it. Subordinate, clearly labeled, meant to
// shrink over time as entries get individually verified and graduate to
// Tier 1 (or get dropped if they turn out to be wrong).
export type County = "Cook" | "DuPage" | "Lake" | "Will" | "Kane" | "McHenry" | "Kendall";

export type ProgramStatus = "verified" | "verify";

export type Tier1Gym = {
  tier: 1;
  slug: string;
  name: string;
  county: County;
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

export type Tier2Location = {
  address: string;
  city: string;
  county: County;
  phone?: string;
};

export type Tier2Chain = {
  slug: string;
  chainName: string;
  // Which programs the CHAIN generally accepts — sourced, not per-location.
  programs: { silverSneakers: boolean; renewActive: boolean; silverAndFit: boolean };
  programNote: string;
  programSourceUrl: string;
  locations: Tier2Location[];
  closedLocationsNote?: string;
};

export type Tier3Gym = {
  name: string;
  address: string;
  county?: County;
};

// ============================= TIER 1 =============================
export const TIER1_GYMS: Tier1Gym[] = [
  {
    tier: 1,
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
    tier: 1,
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
      "the park district's own site consistently blocked automated verification — this is sourced from a dedicated local news article about this program specifically, so confirm the current class schedule directly",
    ],
  },
  {
    tier: 1,
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
    tier: 1,
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
    tier: 1,
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
    tier: 1,
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
    tier: 1,
    slug: "oak-lawn-racquet-fitness-gymnastics-center",
    name: "Racquet, Fitness & Gymnastics Center — Oak Lawn Park District",
    county: "Cook",
    area: "Oak Lawn",
    address: "10444 S. Central Ave, Oak Lawn, IL 60453",
    phone: "708-857-2215",
    programs: { silverSneakers: "verified", renewActive: "verified", silverAndFit: "verified" },
    goodToKnow:
      "\"Qualified members will have their membership fees at the Racquet Center covered\" for SilverSneakers, Prime, Silver&Fit, Active&Fit, and Renew Active — per the district's own site. Court fees are still separate even for qualified members. No pool.",
    sourceUrl: "https://www.olparks.com/programs/fitness/racquet-fitness-gymnastics-center-fitness/",
  },
  {
    tier: 1,
    slug: "des-plaines-prairie-lakes-community-center",
    name: "Prairie Lakes Community Center — Des Plaines Park District",
    county: "Cook",
    area: "Des Plaines",
    address: "515 E. Thacker Street, Des Plaines, IL 60018",
    phone: "847-391-5711",
    programs: { silverSneakers: "verified", renewActive: "verified", silverAndFit: "verify" },
    pool: "Houses the Prairie Lakes Aquatics Center.",
    goodToKnow: "Also has an indoor walking/jogging track. \"We're proud to welcome members of the award-winning Tivity Health SilverSneakers and Prime Fitness programs\" and \"we proudly serve Renew Active by UnitedHealthcare members,\" per the district's own site.",
    existingListingSlug: "des-plaines-park-district-prairie-lakes-fitness",
    sourceUrl: "https://www.dpparks.org/location/prairie-lakes-community-center/",
  },
  {
    tier: 1,
    slug: "la-grange-fitness-park-district",
    name: "La Grange Fitness — Park District of La Grange",
    county: "Cook",
    area: "La Grange",
    address: "536 East Avenue, La Grange, IL",
    programs: { silverSneakers: "verified", renewActive: "verified", silverAndFit: "verify" },
    goodToKnow: "6,700 sq ft fitness center plus a walking track. Membership registration is in-person only.",
    sourceUrl: "https://pdlg.org/la-grange-fitness/health-insurance",
    verifyNotes: ["the district's site blocked automated fetch — confirmed via a repeatedly-consistent search-engine snippet of that exact page instead of a direct read, so do a live click-through before relying on it"],
  },
  {
    tier: 1,
    slug: "bernard-horwich-jcc",
    name: "Bernard Horwich JCC (JCC Chicago)",
    county: "Cook",
    area: "Chicago (West Rogers Park)",
    address: "3003 W. Touhy Ave, Chicago, IL 60645",
    phone: "773-761-9100",
    programs: { silverSneakers: "verified", renewActive: "verify", silverAndFit: "verify" },
    pool: "Six-lane, 25-yard indoor pool, included with the SilverSneakers-linked J-Fit pass.",
    goodToKnow: "The J-Fit pass (SilverSneakers) also covers a 7,000 sq ft gym, exercise equipment, free weights, and some fitness classes.",
    sourceUrl: "https://jccchicago.org/bernard-horwich-fitness/",
    verifyNotes: ["direct fetch of this page returned 403 — confirmed via a search-index snippet instead, so do a live check before relying on it"],
  },
  {
    tier: 1,
    slug: "bernard-weinger-jcc-northbrook",
    name: "Bernard Weinger JCC (JCC Chicago) — Northbrook",
    county: "Cook",
    area: "Northbrook",
    address: "300 Revere Dr., Northbrook, IL 60062",
    phone: "224-406-9200",
    programs: { silverSneakers: "verified", renewActive: "verify", silverAndFit: "verify" },
    goodToKnow: "Same SilverSneakers-linked J-Fit pass program as JCC Chicago's Bernard Horwich location.",
    sourceUrl: "https://jccchicago.org/bernard-horwich-fitness/",
    verifyNotes: ["the clearest corroborating source found dates to 2012 (a Patch article quoting the JCC's own announcement) — confirm by phone or a fresh site visit before relying on it"],
  },
  {
    tier: 1,
    slug: "4500-fitness-downers-grove",
    name: "4500 Fitness — Downers Grove Park District",
    county: "DuPage",
    area: "Downers Grove",
    address: "4500 Belmont Road, Downers Grove, IL 60515",
    phone: "630-960-2340",
    programs: { silverSneakers: "verified", renewActive: "verified", silverAndFit: "verify" },
    goodToKnow:
      "Also partners with Prime Fitness and the Home Front Health program for qualifying veterans. Membership covers the fitness center and indoor walking track — not group fitness classes. Discounted membership for 62+.",
    sourceUrl: "https://4500fitness.org/faq",
  },
  {
    tier: 1,
    slug: "woodridge-park-district-arc",
    name: "Woodridge Park District — Athletic Recreation Center (ARC)",
    county: "DuPage",
    area: "Woodridge",
    address: "8201 S. Janes Avenue, Woodridge, IL 60517",
    phone: "630-353-3444",
    programs: { silverSneakers: "verified", renewActive: "verified", silverAndFit: "verify" },
    goodToKnow: "\"You may qualify for a FREE ARC fitness membership through SilverSneakers or Renew Active and your health insurance\" — per the district's own membership page.",
    sourceUrl: "https://www.wpdarc.org/membership/silversneakers/",
  },
  {
    tier: 1,
    slug: "ackerman-sports-fitness-center-glen-ellyn",
    name: "Ackerman Sports & Fitness Center — Glen Ellyn Park District",
    county: "DuPage",
    area: "Glen Ellyn",
    address: "800 St. Charles Road, Glen Ellyn, IL 60137",
    programs: { silverSneakers: "verified", renewActive: "verify", silverAndFit: "verify" },
    seniorClasses: "65+ free weekly classes, including SilverSneakers and SilverSneakers Yoga, named directly on the district's own site.",
    goodToKnow: "Also has basketball courts, indoor turf, and a walking/running track.",
    sourceUrl: "https://gepark.org/fitness/",
    verifyNotes: ["the district's site and its membership page (ackermansfc.com) blocked automated verification during a direct fetch — this is sourced from a cached version of gepark.org/fitness/, so do a quick live-page check"],
  },
  {
    tier: 1,
    slug: "oak-brook-park-district-family-recreation-center",
    name: "Oak Brook Park District — Family Recreation Center",
    county: "DuPage",
    area: "Oak Brook",
    address: "1450 Forest Gate Road, Oak Brook, IL 60523",
    phone: "630-645-9531",
    programs: { silverSneakers: "verified", renewActive: "verified", silverAndFit: "verify" },
    goodToKnow:
      "\"A proud participant in the SilverSneakers program\" and \"a proud participant in the Renew Active program,\" per the district's own site. 3 regulation gymnasiums, a 5,000 sq ft fitness center, and a 1/8-mile indoor track.",
    sourceUrl: "https://www.obparks.org/healthcare-memberships",
    verifyNotes: ["SilverSneakers/Renew Active membership applies to the Family Recreation Center only — it explicitly excludes the Tennis Center"],
  },
  {
    tier: 1,
    slug: "fort-hill-activity-center-naperville",
    name: "Fort Hill Activity Center — Naperville Park District",
    county: "DuPage",
    area: "Naperville",
    address: "20 Fort Hill Drive, Naperville, IL 60540",
    phone: "630-995-8900",
    programs: { silverSneakers: "verified", renewActive: "verify", silverAndFit: "verify" },
    goodToKnow: "\"A proud partner with the Healthways SilverSneakers Fitness program\" — per the district's own site, which also notes not all Medicare plans include SilverSneakers.",
    sourceUrl: "https://napervilleparks.org/silversneakers",
  },
  {
    tier: 1,
    slug: "bolingbrook-park-district-lifestyles-fitness-center",
    name: "Bolingbrook Park District — Lifestyles Fitness Center",
    county: "Will",
    area: "Bolingbrook",
    address: "200 Lindsey Lane, Bolingbrook, IL 60440 (inside the Recreation & Aquatic Complex)",
    programs: { silverSneakers: "verified", renewActive: "verified", silverAndFit: "verify" },
    pool: "Aqua fitness classes are offered via the Aquatic Complex the fitness center sits inside.",
    seniorClasses: "A dedicated SilverSneakers class \"for the mature adult to increase strength, range of motion, agility, balance and coordination,\" per the district's own site.",
    goodToKnow: "The district's site also lists AARP Medicare Supplement Plans, United Healthcare, and BlueCross BlueShield among accepted insurance options.",
    existingListingSlug: "bolingbrook-park-district-adult-trips",
    sourceUrl: "https://bolingbrookparks.org/facilities/lifestyles-fitness-center/",
    verifyNotes: ["direct fetch of the live page failed twice (truncation error) — this is sourced from search-engine-cached text, so do a quick live-page check before relying on it"],
  },
  {
    tier: 1,
    slug: "prairie-fit-fitness-center-plainfield",
    name: "Prairie Fit Fitness Center — Plainfield Park District",
    county: "Will",
    area: "Plainfield",
    address: "24550 W. Renwick Road, Plainfield, IL",
    phone: "815-436-8812",
    programs: { silverSneakers: "verified", renewActive: "verify", silverAndFit: "verify" },
    goodToKnow: "SilverSneakers membership matches a paid Prairie Fit membership: track, open gym, and fitness center — group fitness classes are not included.",
    sourceUrl: "https://www.plfdparks.org/parks-facilities/prairie-activity-recreation-center/prairie-fit-fitness-center/silver-sneakers/",
    verifyNotes: ["direct fetch of this page was blocked — sourced from a search-engine-indexed excerpt, so do a quick live-page check"],
  },
  {
    tier: 1,
    slug: "dundee-township-park-district-rakow-randall-oaks",
    name: "Dundee Township Park District — Rakow Center & Randall Oaks Recreation Center",
    county: "Kane",
    area: "Carpentersville / West Dundee",
    address: "Rakow Center, 665 Barrington Ave, Carpentersville, IL 60110; Randall Oaks Recreation Center, 500 N. Randall Rd, West Dundee, IL 60118",
    phone: "847-428-7131",
    programs: { silverSneakers: "verified", renewActive: "verified", silverAndFit: "verify" },
    pool: "Indoor pool and lap swim at the Rakow Center.",
    seniorClasses: "Group exercise classes and personal training at both centers.",
    goodToKnow: "\"This benefit is included in many Medicare health plans and provides complimentary Fitness Membership to seniors\" for both SilverSneakers and Renew Active, per the district's own site. Enroll by bringing your SilverSneakers card or 16-digit Healthways ID to either center.",
    existingListingSlug: "rakow-center-adult-activity-center-dundee-township-park-district",
    sourceUrl: "https://www.dtpd.org/complimentary-fitness-memberships",
  },
  {
    tier: 1,
    slug: "golden-corridor-family-ymca-taylor-branch",
    name: "Golden Corridor Family YMCA — Taylor Branch",
    county: "Kane",
    area: "Elgin",
    address: "50 N. McLean Blvd, Elgin, IL 60123",
    phone: "847-888-7410",
    programs: { silverSneakers: "verified", renewActive: "verify", silverAndFit: "verify" },
    sourceUrl: "https://www.gcfymca.org/join/silversneakers",
  },
  {
    tier: 1,
    slug: "lake-forest-fitness-center",
    name: "Lake Forest Fitness Center — Lake Forest Parks & Recreation",
    county: "Lake",
    area: "Lake Forest",
    address: "400 Hastings Rd, Lake Forest, IL 60045",
    phone: "847-234-6700",
    programs: { silverSneakers: "verified", renewActive: "verified", silverAndFit: "verify" },
    goodToKnow: "\"Part of the Silver Sneakers and Renew Active Programs\" per the district's own site. 4,500 sq ft with cardio, free weights, dance/aerobic studios, and squash/racquetball courts.",
    sourceUrl: "https://lfparksandrec.com/fitness-center",
  },
];

// ============================= TIER 2 =============================
// Note on XSport Fitness and Esporta Fitness: both brands no longer exist
// in the Chicago metro. Fitness International (LA Fitness's parent)
// acquired XSport in July 2024 and Esporta in April 2025, rebranding both
// to LA Fitness. Former XSport/Esporta addresses that are now LA Fitness
// locations are folded into the LA Fitness entry below; addresses that
// closed outright (e.g. the former XSport at 5515 W Irving Park Rd) are
// excluded entirely rather than listed as open.
export const TIER2_CHAINS: Tier2Chain[] = [
  {
    slug: "la-fitness",
    chainName: "LA Fitness",
    programs: { silverSneakers: true, renewActive: false, silverAndFit: false },
    programNote:
      "LA Fitness runs its own dedicated SilverSneakers class-locator page — chain-level SilverSneakers acceptance is medium-high confidence. Renew Active and Silver&Fit are only claimed by third-party SEO/aggregator sites, not by LA Fitness itself or an official program source, so we're not listing those as chain-confirmed. LA Fitness absorbed the XSport Fitness and Esporta Fitness chains in 2024–2025 (see note above) — some addresses below were formerly those brands.",
    programSourceUrl: "https://www.lafitness.com/Pages/LocateClassNearYou.aspx?id=96&name=SilverSneakers",
    locations: [
      { address: "1101 S. Canal St, Chicago, IL 60607", city: "Chicago (South Loop)", county: "Cook", phone: "312-379-8631" },
      { address: "5559 S. Kedzie Ave, Chicago, IL 60629", city: "Chicago", county: "Cook" },
      { address: "5224 S. Lake Park Ave, Chicago, IL 60615", city: "Chicago", county: "Cook", phone: "773-358-4228" },
      { address: "3435 S. Dr. Martin Luther King Dr, Chicago, IL 60616", city: "Chicago", county: "Cook", phone: "312-821-7972" },
      { address: "2828 N Clark St, Chicago, IL 60657", city: "Chicago", county: "Cook" },
      { address: "2620 W Pershing Rd, Chicago, IL 60632", city: "Chicago", county: "Cook" },
      { address: "55 E Randolph St, Chicago, IL 60601", city: "Chicago (Loop)", county: "Cook" },
      { address: "200 Broadview Village Square, Broadview, IL 60155", city: "Broadview", county: "Cook" },
      { address: "5917 S. La Grange Rd, Countryside, IL 60525", city: "Countryside", county: "Cook" },
      { address: "3880 Willow Rd, Glenview, IL 60062", city: "Glenview", county: "Cook" },
      { address: "1321 E Golf Rd, Schaumburg, IL 60173", city: "Schaumburg", county: "Cook" },
      { address: "3116 S Route 59, Suite 160, Naperville, IL", city: "Naperville", county: "DuPage" },
      { address: "2780 Fitness Drive, Naperville, IL", city: "Naperville", county: "DuPage" },
      { address: "1320 75th St, Downers Grove, IL 60516", city: "Downers Grove", county: "DuPage" },
      { address: "488 Randall Rd, South Elgin, IL 60177", city: "South Elgin", county: "Kane", phone: "630-503-7749" },
    ],
    closedLocationsNote:
      "Not an exhaustive list — LA Fitness's own store locator blocked automated access, so this is a verified partial sample, not the full metro roster.",
  },
  {
    slug: "cfx-charter-fitness",
    chainName: "CFX (Charter Fitness)",
    programs: { silverSneakers: true, renewActive: true, silverAndFit: true },
    programNote:
      "CFX's own insurance-memberships page states it accepts SilverSneakers, Prime, Renew Active, Silver&Fit (via American Specialty Health), Active&Fit, and Gympass — the clearest all-three-programs chain source found. The page blocked a direct automated fetch, so this is drawn from the page's own indexed content rather than a firsthand read — medium-high confidence.",
    programSourceUrl: "https://cfxfit.com/insurance-memberships/",
    locations: [
      { address: "5324 S Pulaski Rd, Chicago, IL 60632", city: "Chicago", county: "Cook", phone: "872-267-7939" },
      { address: "2545 W 111th St, Chicago, IL 60655", city: "Chicago (Beverly)", county: "Cook" },
      { address: "4849 W 111th St, Alsip, IL 60803", city: "Alsip", county: "Cook" },
      { address: "9825 W 55th St, Countryside, IL 60525", city: "Countryside", county: "Cook" },
      { address: "7600 S Pulaski Rd, Chicago, IL 60652", city: "Chicago (Ford City)", county: "Cook" },
      { address: "14825 S Bell Rd, Homer Glen, IL 60491", city: "Homer Glen", county: "Cook" },
      { address: "14726 S Cicero Ave, Midlothian, IL 60445", city: "Midlothian", county: "Cook" },
      { address: "1770 S Harlem Ave, North Riverside, IL 60546", city: "North Riverside", county: "Cook" },
      { address: "3420 S Vollmer Rd, Olympia Fields, IL 60461", city: "Olympia Fields", county: "Cook" },
      { address: "6425 W 127th St, Palos Heights, IL 60463", city: "Palos Heights", county: "Cook" },
      { address: "16010 S Harlem Ave, Tinley Park, IL 60477", city: "Tinley Park", county: "Cook" },
      { address: "806 Army Trail Rd, Carol Stream, IL 60188", city: "Carol Stream", county: "DuPage" },
      { address: "6300 Kingery Hwy, Willowbrook, IL 60527", city: "Willowbrook", county: "DuPage" },
      { address: "1701 N Larkin Ave, Crest Hill, IL 60403", city: "Crest Hill", county: "Will", phone: "815-836-1200" },
      { address: "1543 S Lake St, Mundelein, IL 60060", city: "Mundelein", county: "Lake" },
    ],
  },
  {
    slug: "anytime-fitness",
    chainName: "Anytime Fitness",
    programs: { silverSneakers: true, renewActive: false, silverAndFit: false },
    programNote:
      "A 2012 Healthways press release announced a SilverSneakers/Prime Fitness partnership across Anytime Fitness locations nationally, reaffirmed more recently on the chain's own social channels — but Anytime Fitness is 100% franchised, and multiple sources caveat that individual owners decide whether to keep honoring it. Treat chain-level acceptance as directional, not a guarantee for any specific club. Renew Active and Silver&Fit are unconfirmed.",
    programSourceUrl: "https://www.franchising.com/news/20120702_healthways_announces_partnership_with_anytime_fitn.html",
    locations: [
      { address: "4022 N Rockwell St, Chicago, IL 60618", city: "Chicago", county: "Cook" },
      { address: "1647 W Chicago Ave, Chicago, IL 60622", city: "Chicago", county: "Cook" },
      { address: "4633 W Diversey Ave, Chicago, IL 60639", city: "Chicago", county: "Cook" },
      { address: "9601 S Western Ave, Chicago, IL 60643", city: "Chicago (Beverly)", county: "Cook" },
      { address: "1271 Rickert Dr, Naperville, IL 60540", city: "Naperville", county: "DuPage" },
      { address: "1550 N Route 59, Ste 120, Naperville, IL 60563", city: "Naperville", county: "DuPage" },
    ],
    closedLocationsNote:
      "A location previously listed at 1429 E Palatine Rd, Arlington Heights is now shown as closed — left off this list.",
  },
  {
    slug: "vasa-fitness",
    chainName: "VASA Fitness",
    programs: { silverSneakers: true, renewActive: false, silverAndFit: true },
    programNote:
      "VASA Fitness names both SilverSneakers (Tivity Health) and Silver&Fit (American Specialty Health, listed as \"Silver&Fit\"/\"Active&Fit\") on its own corporate insurance page — the page is chain-wide and doesn't break out participation by location, and Renew Active isn't mentioned, so call ahead to confirm your specific club.",
    programSourceUrl: "https://vasafitness.com/insurance/",
    locations: [
      { address: "6120 Northwest Highway, Crystal Lake, IL 60014", city: "Crystal Lake", county: "McHenry" },
    ],
  },
];

// ============================= TIER 3 =============================
// Planet Fitness deliberately sits here, not in Tier 2: multiple
// independent sources agree Planet Fitness has no national SilverSneakers
// agreement, and any participation is a rare, individual-franchise
// decision — a "chain generally accepts X" claim would be false for this
// one. These addresses come from a third-party SilverSneakers-location
// roundup only.
export const TIER3_GYMS: Tier3Gym[] = [
  { name: "Planet Fitness", address: "3120 N Pulaski Rd, Chicago, IL 60641", county: "Cook" },
  { name: "Planet Fitness", address: "4646 S Damen Ave, Chicago, IL 60609", county: "Cook" },
  { name: "Planet Fitness", address: "1301 E 47th St, Chicago, IL 60653", county: "Cook" },
  { name: "Planet Fitness", address: "2558 W Cermak Rd, Chicago, IL 60608", county: "Cook" },
  { name: "Planet Fitness", address: "2719 N California Ave, Chicago, IL 60647", county: "Cook" },
  { name: "Planet Fitness", address: "1961 N Mannheim Rd, Melrose Park, IL 60160", county: "Cook" },
  { name: "Planet Fitness", address: "4327 S Pulaski Rd, Chicago, IL 60632", county: "Cook" },
  { name: "Planet Fitness", address: "240 E Illinois St, Chicago, IL 60611", county: "Cook" },
  { name: "Planet Fitness", address: "4905 W North Ave, Chicago, IL 60639", county: "Cook" },
  { name: "Planet Fitness", address: "3636 N Broadway St, Chicago, IL 60613", county: "Cook" },
  { name: "Planet Fitness", address: "9503 S Cicero Ave, Oak Lawn, IL 60453", county: "Cook" },
  { name: "Planet Fitness", address: "2300 S Cicero Ave, Cicero, IL 60804", county: "Cook" },
  { name: "Blink Fitness", address: "3145 S Ashland Ave, Chicago, IL 60608", county: "Cook" },
  { name: "Blink Fitness", address: "5160 S Pulaski Rd, Chicago, IL 60632", county: "Cook" },
  { name: "Fitness 19", address: "2834 N Broadway, Chicago, IL 60657", county: "Cook" },
  { name: "Retro Fitness Irving Park", address: "4901 W Irving Park Rd, Chicago, IL 60641", county: "Cook" },
  { name: "Gottlieb Health & Fitness Center", address: "551 W North Ave, Chicago, IL 60160", county: "Cook" },
  { name: "Lawndale Christian Fitness Center", address: "3750 W Ogden Ave, Chicago, IL 60623", county: "Cook" },
  { name: "Hyde Park JCC", address: "5200 S Hyde Park Blvd, Chicago, IL 60615", county: "Cook" },
  { name: "Pilsen Fitness", address: "1822 S Bishop St, Chicago, IL 60608", county: "Cook" },
  { name: "Pav YMCA", address: "2947 S Oak Park Ave, Berwyn, IL 60402", county: "Cook" },
];
export const TIER3_SOURCE_URL =
  "https://www.medicareplanfinder.com/medicare/silversneakers-locations-chicago-il/";

// Dropped from all three tiers entirely — real facilities where no source
// (own site, official finder, or third-party roundup) could confirm
// acceptance of any of the three Medicare fitness programs. Listing them
// in any tier here would be a guess. See REVIEW-medicare-gyms.md.
//  - Edward-Elmhurst Health & Fitness (Woodridge, DuPage)
//  - XSport Fitness (brand defunct in Chicago since July 2024, absorbed
//    into LA Fitness; several former addresses are now closed outright)
//  - Esporta Fitness (brand defunct everywhere since April 2025, absorbed
//    into LA Fitness)
//  - YMCA of Metro Chicago and most independent-association branches
//    (McCormick, Lake View, South Side YMCA, Fox Valley Family YMCA) —
//    real facilities, but no source confirms current program acceptance,
//    and 2025-2026 has seen real volatility in YMCA/SilverSneakers
//    contracts nationally. See the page's YMCA callout.

function tier2LocationCount(): number {
  return TIER2_CHAINS.reduce((sum, chain) => sum + chain.locations.length, 0);
}

export const TOTAL_GYM_COUNT = TIER1_GYMS.length + tier2LocationCount() + TIER3_GYMS.length;

export function countyCounts(): Record<County, number> {
  const counts: Record<County, number> = { Cook: 0, DuPage: 0, Lake: 0, Will: 0, Kane: 0, McHenry: 0, Kendall: 0 };
  for (const g of TIER1_GYMS) counts[g.county]++;
  for (const chain of TIER2_CHAINS) for (const loc of chain.locations) counts[loc.county]++;
  for (const g of TIER3_GYMS) if (g.county) counts[g.county]++;
  return counts;
}

// County spoke pages — Cook and DuPage both cross the ~8-gym threshold for
// their own page; Lake, Will, Kane, McHenry, and Kendall are still too thin
// to stand alone without reading as a near-empty page, so they're folded
// into one combined "Other Chicagoland Areas" spoke, still sub-headed by
// county within that page for clarity. Revisit this split as more counties
// cross ~8 gyms (see REVIEW-medicare-gyms.md).
export type GymSpokeSlug = "cook-county" | "dupage-county" | "other-areas";

export const GYM_SPOKES: { slug: GymSpokeSlug; label: string; metaTitle: string; counties: County[] }[] = [
  { slug: "cook-county", label: "Cook County", metaTitle: "Cook County SilverSneakers & Medicare Gyms", counties: ["Cook"] },
  { slug: "dupage-county", label: "DuPage County", metaTitle: "DuPage County SilverSneakers & Medicare Gyms", counties: ["DuPage"] },
  {
    slug: "other-areas",
    label: "Other Chicagoland Areas",
    metaTitle: "Lake, Will, Kane, McHenry & Kendall Medicare Gyms",
    counties: ["Lake", "Will", "Kane", "McHenry", "Kendall"],
  },
];

export function gymSpokeSlugForCounty(county: County): GymSpokeSlug {
  return GYM_SPOKES.find((s) => s.counties.includes(county))?.slug ?? "other-areas";
}

export function gymSpokeBySlug(slug: string) {
  return GYM_SPOKES.find((s) => s.slug === slug);
}
