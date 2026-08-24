// Stage 2 Wave 3 — 27 of the 29 activity×county cells that cleared the 8+
// intersection gate (see the Wave 1/2 gate history in lib/cities.ts and
// lib/activityPages.ts). Split into two shapes because they route
// differently: suburban cells live under /activities/[slug]/[county],
// Chicago cells live under /chicago/[tag] (Chicago already has its own
// hub, so its cells nest there instead of duplicating a county path it
// doesn't have). lifelong-learning×Cook (14) also cleared 8+ but is
// excluded — lifelong-learning is a routing hub (/classes-for-seniors),
// never a flat listing page, at any level.
//
// day-trips×Chicago and dance×Chicago also cleared the count gate but are
// deliberately NOT built here: DFSS's own source names only a generic
// "Life Enrichment Activities" category for both, with no named trip
// brand or dance program distinguishing them from every other Chicago
// activity cell. The honest answer to "where do I do this, in Chicago" is
// "the same DFSS centers that answer every other Chicago activity" — not a
// distinct page, a duplicate wearing a different H1. Both are folded into
// the /chicago hub as plain, unlinked rows instead (see app/chicago/page.tsx).
//
// Phase 3 added 5 more cells once new content pushed them over the 8+
// gate: book-clubs×Cook (18), book-clubs×DuPage (10), book-clubs×Lake (9),
// tech-help×Cook (17), tech-help×DuPage (13).
export type CountyCellDef = {
  activitySlug: string; // matches ActivityPageDef.slug in lib/activityPages.ts
  tag: string;
  countySlug: "cook" | "dupage" | "lake";
  county: "Cook" | "DuPage" | "Lake";
  h1: string;
  intro: string;
};

export type ChicagoCellDef = {
  tag: string;
  h1: string;
  intro: string;
};

export const COUNTY_CELLS: CountyCellDef[] = [
  {
    activitySlug: "card-games-for-seniors",
    tag: "cards-games",
    countySlug: "cook",
    county: "Cook",
    h1: "Card Games for Seniors in Cook County",
    intro:
      "Oak Lawn Park District's renovated Memorial Activity Center added a dedicated senior wing for bridge and pinochle in 2025, and Western Springs Senior Center's busiest day is Friday, when the mahjong crowd takes over the Grand Avenue Community Center — two of 31 card-game listings across suburban Cook County.",
  },
  {
    activitySlug: "fitness-classes-for-seniors",
    tag: "fitness-classes",
    countySlug: "cook",
    county: "Cook",
    h1: "Fitness Classes for Seniors in Cook County",
    intro:
      "Skokie Park District's Active Adults hub runs Cardio Strength & Stretch, Easy Does It, and Dynamic Strength & Balance classes at Oakton Community Center, and Oak Lawn Park District's renovated Memorial Activity Center added a dedicated senior wing in 2025 — two of 26 fitness listings across suburban Cook County.",
  },
  {
    activitySlug: "senior-social-clubs",
    tag: "social-clubs",
    countySlug: "cook",
    county: "Cook",
    h1: "Senior Social Clubs in Cook County",
    intro:
      "Western Springs Senior Center's Friday mahjong crowd is the busiest day at the Grand Avenue Community Center, and Skokie Park District's Active Adults hub runs its own Laramie Bridge Club alongside Mah Jong and Canasta drop-ins — two of 25 social-club listings across suburban Cook County.",
  },
  {
    activitySlug: "bingo-for-seniors",
    tag: "bingo",
    countySlug: "cook",
    county: "Cook",
    h1: "Bingo for Seniors in Cook County",
    intro:
      "Chicago Ridge Park District runs both a standard Senior Bingo night and a music-themed \"Music Bingo\" session as part of its Actively Aging series, and Morton Grove's Family and Senior Services runs bingo out of the American Legion Memorial Civic Center — two of 24 bingo listings across suburban Cook County.",
  },
  {
    activitySlug: "senior-day-trips",
    tag: "day-trips",
    countySlug: "cook",
    county: "Cook",
    h1: "Day Trips for Seniors from Cook County",
    intro:
      "Western Springs Senior Center organizes outings out of the Grand Avenue Community Center, and Arlington Heights Park District's Arlington Classic program runs more than 50 one-day bus tours a year — two of 22 day-trip listings across suburban Cook County.",
  },
  {
    activitySlug: "senior-lunch-programs",
    tag: "congregate-meals",
    countySlug: "cook",
    county: "Cook",
    h1: "Senior Lunch Programs in Cook County",
    intro:
      "Oak Park Township runs a weekday dine-in lunch program for residents 60 and older at its Senior Services Center, with dietitian-approved meals, and Maine Township's MaineStreamers pairs its own congregate lunch with Twilight Dining evening outings — two of 22 senior-lunch listings across suburban Cook County.",
  },
  {
    activitySlug: "yoga-for-seniors",
    tag: "yoga",
    countySlug: "cook",
    county: "Cook",
    h1: "Yoga for Seniors in Cook County",
    intro:
      "Arlington Heights Park District's Active Adult Program runs chair yoga alongside Tai Chi and Zumba Gold at the Arlington Heights Senior Center, and Maine Township's MaineStreamers runs Monday evening Yoga at the Feldman Center — two of 19 yoga listings across suburban Cook County.",
  },
  {
    activitySlug: "dance-classes-for-seniors",
    tag: "dance",
    countySlug: "cook",
    county: "Cook",
    h1: "Dance Classes for Seniors in Cook County",
    intro:
      "Arlington Heights Park District's Active Adult Program runs Zumba Gold and line dancing at the Arlington Heights Senior Center, and Niles Senior Center's dance offerings sit inside a wider slate that also covers cooking and computer instruction — two of 18 dance listings across suburban Cook County.",
  },
  {
    activitySlug: "art-classes-for-seniors",
    tag: "art-classes",
    countySlug: "cook",
    county: "Cook",
    h1: "Art Classes for Seniors in Cook County",
    intro:
      "Club 55 at North Berwyn Park District runs a dedicated arts studio alongside tai chi and chair yoga, and Niles Senior Center pairs arts & crafts with a documentary film series and TED Talk screenings — two of 14 art-class listings across suburban Cook County.",
  },
  {
    activitySlug: "tai-chi-for-seniors",
    tag: "tai-chi",
    countySlug: "cook",
    county: "Cook",
    h1: "Tai Chi for Seniors in Cook County",
    intro:
      "Skokie Park District runs Tai Chi Chih at both beginning and continuing levels at Oakton Community Center, and Schaumburg Township's Disability & Senior Services folds tai chi into a full weekly slate that also includes Chairobics and Stretch & Tone — two of 11 tai chi listings across suburban Cook County.",
  },
  {
    activitySlug: "walking-groups-for-seniors",
    tag: "walking-groups",
    countySlug: "cook",
    county: "Cook",
    h1: "Walking Groups for Seniors in Cook County",
    intro:
      "Evergreen Park's Office of Citizens' Services runs indoor walking alongside video-led exercise classes and a volunteer chorus at its Community Center, and the Park District of Oak Park's Dole Center pairs line dancing with its own walking programming — two of 10 walking-group listings across suburban Cook County.",
  },
  {
    activitySlug: "senior-day-trips",
    tag: "day-trips",
    countySlug: "dupage",
    county: "DuPage",
    h1: "Day Trips for Seniors from DuPage County",
    intro:
      "Wood Dale Park District runs a rotating seasonal menu that includes Sip & Stroll (coffee plus a group walk) and Dip & Dine (a private aquatics exercise session), and Addison's Active Adults & Senior Club organizes real 2026 trips out of its weekly Tuesday noon meetings — two of 11 day-trip listings across DuPage County.",
  },
  {
    activitySlug: "senior-social-clubs",
    tag: "social-clubs",
    countySlug: "dupage",
    county: "DuPage",
    h1: "Senior Social Clubs in DuPage County",
    intro:
      "Addison's Active Adults & Senior Club meets weekly on Tuesdays, noon to 2pm, for socializing and seminars, and West Chicago Park District's 50+ program runs a Summer Teatime and a trivia-themed Name That Tune Luncheon at the ARC Center — two of 11 social-club listings across DuPage County.",
  },
  {
    activitySlug: "card-games-for-seniors",
    tag: "cards-games",
    countySlug: "dupage",
    county: "DuPage",
    h1: "Card Games for Seniors in DuPage County",
    intro:
      "Bensenville Heritage Center runs daily drop-in card games alongside karaoke and dancing, and Downers Grove Park District's Active Adults program at Lincoln Center pairs weekday bridge, mahjong, and canasta groups with a bi-weekly Cinema Club — two of 11 card-game listings across DuPage County.",
  },
  {
    activitySlug: "fitness-classes-for-seniors",
    tag: "fitness-classes",
    countySlug: "dupage",
    county: "DuPage",
    h1: "Fitness Classes for Seniors in DuPage County",
    intro:
      "Naperville Park District's Active Adults program runs named classes like Ageless Grace and \"Regain Your Balance\" for fall prevention, alongside Senior Kung Fu and three levels of Senior Tai Chi, and Villa Park Recreation Center pairs functional fitness and strength classes with Donut Bingo — two of 9 fitness listings across DuPage County.",
  },
  {
    activitySlug: "art-classes-for-seniors",
    tag: "art-classes",
    countySlug: "dupage",
    county: "DuPage",
    h1: "Art Classes for Seniors in DuPage County",
    intro:
      "Downers Grove Township's senior center runs computer and art classes through a partnership with the People's Resource Center, and Helen Plum Library pairs monthly Senior Socials with musical performances and historical talks — two of 9 art-class listings across DuPage County.",
  },
  {
    activitySlug: "senior-social-clubs",
    tag: "social-clubs",
    countySlug: "lake",
    county: "Lake",
    h1: "Senior Social Clubs in Lake County",
    intro:
      "Zion Park District's 55 & Over Club ($15/year) runs a biweekly Wednesday meeting alongside Bingo and Lunch several times each summer, and Highland Park's Division of Senior Services runs 900 activities a year including bridge, canasta, and mah-jongg — two of 12 social-club listings across Lake County.",
  },
  {
    activitySlug: "senior-day-trips",
    tag: "day-trips",
    countySlug: "lake",
    county: "Lake",
    h1: "Day Trips for Seniors from Lake County",
    intro:
      "Round Lake Area Park District's Senior Activities program runs out of the Robert W. Rolek Community Center, and Grayslake Senior Activity Center has taken its lifelong-learning crowd to a Cubs game alongside its regular ceramics and photography classes — two of 12 day-trip listings across Lake County.",
  },
  {
    activitySlug: "fitness-classes-for-seniors",
    tag: "fitness-classes",
    countySlug: "lake",
    county: "Lake",
    h1: "Fitness Classes for Seniors in Lake County",
    intro:
      "Round Lake Area Park District's Senior Activities program runs chair yoga, Zumba Gold, and Fluid Movement/Tai Chi out of the Robert W. Rolek Community Center, and Grayslake Senior Activity Center adds strength training and Bingocize to its weekday lineup — two of 11 fitness listings across Lake County.",
  },
  {
    activitySlug: "card-games-for-seniors",
    tag: "cards-games",
    countySlug: "lake",
    county: "Lake",
    h1: "Card Games for Seniors in Lake County",
    intro:
      "Zion Park District's 55 & Over Club runs Dominoes/Cards — Mexican train, pinochle, cribbage — most Wednesdays and Thursdays, and Antioch Township Senior Services pairs its walking club with card and board games in the same building as the old village-run center — two of 9 card-game listings across Lake County.",
  },
  {
    activitySlug: "bingo-for-seniors",
    tag: "bingo",
    countySlug: "lake",
    county: "Lake",
    h1: "Bingo for Seniors in Lake County",
    intro:
      "Zion Park District pairs Bingo and Lunch several times each summer, and Grayslake Senior Activity Center runs Bingocize alongside its regular bingo night — two of 8 bingo listings across Lake County.",
  },
  {
    activitySlug: "senior-lunch-programs",
    tag: "congregate-meals",
    countySlug: "lake",
    county: "Lake",
    h1: "Senior Lunch Programs in Lake County",
    intro:
      "Antioch Township Senior Services runs its own luncheons alongside card and board games and a singing group at the old village-run center, and Zion Park District pairs Bingo and Lunch several times each summer — two of 8 senior-lunch listings across Lake County.",
  },
  {
    activitySlug: "book-clubs-for-seniors",
    tag: "book-clubs",
    countySlug: "cook",
    county: "Cook",
    h1: "Book Clubs for Seniors in Cook County",
    intro:
      "The East Wing Glenview Senior Center runs separate Men's and Women's Book Clubs as part of its 100+ weekly activities, and Park Ridge Public Library's Reader Services desk runs book clubs and a writers group alongside its Doorstep Delivery service — two of 18 book-club listings across suburban Cook County.",
  },
  {
    activitySlug: "tech-help-for-seniors",
    tag: "tech-help",
    countySlug: "cook",
    county: "Cook",
    h1: "Tech Help for Seniors in Cook County",
    intro:
      "Oak Lawn Public Library's AgeOptions-funded program lends Chromebooks and runs technology training aimed at reducing social isolation for adults 60+, and Northbrook Public Library runs tech-help appointments and monthly technology classes through its dedicated Senior Services and Outreach program — two of 17 tech-help listings across suburban Cook County.",
  },
  {
    activitySlug: "tech-help-for-seniors",
    tag: "tech-help",
    countySlug: "dupage",
    county: "DuPage",
    h1: "Tech Help for Seniors in DuPage County",
    intro:
      "Naperville Public Library's Senior Tech Club covers topics from cloud storage to AI for older adults, and Itasca Community Library runs an iPad Basics introductory tech class through its Adult Services department — two of 13 tech-help listings across DuPage County.",
  },
  {
    activitySlug: "book-clubs-for-seniors",
    tag: "book-clubs",
    countySlug: "dupage",
    county: "DuPage",
    h1: "Book Clubs for Seniors in DuPage County",
    intro:
      "Downers Grove Public Library runs four separate book discussion series, including a daytime nonfiction group and an outdoor walking book discussion with the DG Park District, and Indian Prairie Public Library in Darien runs three monthly clubs — Nonfiction at Night, Crime Readers, and Novel Idea — two of 10 book-club listings across DuPage County.",
  },
  {
    activitySlug: "book-clubs-for-seniors",
    tag: "book-clubs",
    countySlug: "lake",
    county: "Lake",
    h1: "Book Clubs for Seniors in Lake County",
    intro:
      "Round Lake Area Park District's Senior Activities program runs a monthly book club led by a librarian on the first Thursday, and Highland Park's Division of Senior Services pairs its own Book Club with a separate Current Events discussion group — two of 9 book-club listings across Lake County.",
  },
];

// Chicago's 20 satellite/regional DFSS centers really do share a uniform
// activity slate (the same finding that killed the 20 neighborhood pages
// in Wave 1) — so several of these intros lean on the same named DFSS
// sub-programs (SeniorNet, Golden Diners) rather than distinct venues.
// day-trips and dance are the thinnest of the 7: no single named Chicago
// program stands out the way Golden Diners or SeniorNet do, flagged
// honestly in the Wave 3 report rather than dressed up.
export const CHICAGO_CELLS: ChicagoCellDef[] = [
  {
    tag: "social-clubs",
    h1: "Senior Social Clubs in Chicago",
    intro:
      "Chicago Public Library's Seniors' Circle runs monthly themed gatherings — talks, creative projects, conversation — across CPL branches, and 20 of Chicago's DFSS neighborhood senior centers fold their own social clubs into the standard citywide program menu.",
  },
  {
    tag: "fitness-classes",
    h1: "Fitness Classes for Seniors in Chicago",
    intro:
      "Central West, Northeast (Levy), Southwest, Southeast (Atlas), and Northwest (Copernicus) — five of Chicago's six DFSS Regional Senior Centers — each run an on-site fitness center staffed with personal trainers, and the city's satellite centers add fitness classes to their own standard program menu.",
  },
  {
    tag: "computer-classes",
    h1: "Computer Classes for Seniors in Chicago",
    intro:
      "Chicago's DFSS Regional Senior Centers each run a SeniorNet computer lab alongside wellness visits from a nurse, dietitian, and pharmacist, and the city's satellite centers add their own computer classes to the standard citywide program menu.",
  },
  {
    tag: "congregate-meals",
    h1: "Senior Lunch Programs in Chicago",
    intro:
      "The daily Golden Diners lunch program, donation-based, runs at all of Chicago's DFSS Regional and Satellite Senior Centers, and Central West Regional Senior Center in the Illinois Medical District pairs it with wellness visits from a nurse, dietitian, and pharmacist.",
  },
  {
    tag: "art-classes",
    h1: "Art Classes for Seniors in Chicago",
    intro:
      "CJE SeniorLife's My Go-To Place runs hands-on art activities and a virtual Cyber Club with at-home art projects for adults 65+, and Chicago's DFSS satellite centers — including Auburn Gresham, Garfield Ridge, Kelvyn Park, and South Chicago — fold art classes into their standard life-enrichment slate.",
  },
];

export function countyCellsFor(activitySlug: string): CountyCellDef[] {
  return COUNTY_CELLS.filter((c) => c.activitySlug === activitySlug);
}

export function countyCellBySlugs(
  activitySlug: string,
  countySlug: string,
): CountyCellDef | undefined {
  return COUNTY_CELLS.find((c) => c.activitySlug === activitySlug && c.countySlug === countySlug);
}

export function chicagoCellByTag(tag: string): ChicagoCellDef | undefined {
  return CHICAGO_CELLS.find((c) => c.tag === tag);
}
