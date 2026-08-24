// Stage 2 Wave 2 — the 17 activity tags that cleared the metro-wide 10+
// gate (see lib/activities.ts for the full 26-tag internal vocabulary).
// slug/h1 are the query-facing name; tag is the internal lib/activities.ts
// slug used to filter listings. "The tag is internal, the slug and H1 are
// the query" — e.g. congregate-meals stays internal, the page is
// senior-lunch-programs. intro is hand-written, proper-noun-first: it must
// open on a named program/venue/club/price, never a generic "Chicagoland
// has options" frame, even when — especially when — the underlying data
// is rich enough to support one.
export type ActivityPageDef = {
  slug: string;
  tag: string;
  h1: string;
  intro: string;
};

export const ACTIVITY_PAGES: ActivityPageDef[] = [
  {
    slug: "senior-social-clubs",
    tag: "social-clubs",
    h1: "Senior Social Clubs in Chicagoland",
    intro:
      "Skokie Park District's Active Adults hub and Western Springs Senior Center's Friday mahjong crowd are two of the liveliest social scenes in the region, and dozens more park districts, libraries, and townships run their own standing clubs — from the Cary Canaries Glee Club to Chicago's 20 DFSS neighborhood centers.",
  },
  {
    slug: "fitness-classes-for-seniors",
    tag: "fitness-classes",
    h1: "Fitness Classes for Seniors in Chicagoland",
    intro:
      "Round Lake Area Park District's Senior Activities program runs chair yoga, Zumba Gold, and seated Strength and Stretch out of the Robert W. Rolek Community Center, and Skokie Park District's Active Adults hub adds Tai Chi Chih plus both Active Adult and Deep Water Aerobics at the pool — two of 75 fitness listings spanning every county.",
  },
  {
    slug: "senior-day-trips",
    tag: "day-trips",
    h1: "Day Trips for Seniors from Chicagoland",
    intro:
      "Bolingbrook Park District runs extended bus tours like a Smoky Mountains trip, and Crystal Lake's Grand Oaks Active Senior Center organizes fee-based outings to shows, concerts, and casinos — a sample of 73 senior day-trip programs departing from park districts, townships, and senior centers across the region.",
  },
  {
    slug: "senior-lunch-programs",
    tag: "congregate-meals",
    h1: "Senior Lunch Programs in Chicagoland",
    intro:
      "The Centre at North Park gives you a free first lunch as part of Franklin Park's weekday senior lunch program, and Evanston's Levy Senior Center serves a weekday congregate lunch for a suggested $5 donation — two of 62 senior lunch programs running on a suggested-donation or low-cost basis across the region.",
  },
  {
    slug: "card-games-for-seniors",
    tag: "cards-games",
    h1: "Card Games for Seniors in Chicagoland",
    intro:
      "Oak Lawn Park District's renovated Memorial Activity Center added a dedicated senior wing for bridge and pinochle in 2025, and Cary Park District runs a $5-ante Game Club covering Golf, No Sevens, Bunco, and UNO — a sample of 61 card and game programs, including pinochle (19 listings), mahjong (16), bridge (14), and canasta (13).",
  },
  {
    slug: "art-classes-for-seniors",
    tag: "art-classes",
    h1: "Art Classes for Seniors in Chicagoland",
    intro:
      "The Park District of Oak Park's Dole Center runs ceramics, stained glass, and weaving classes, and Cary Park District's senior hub adds its own art programming alongside a weekly Walking Club — a sample of 52 art programs, from drawing and painting to quilting and jewelry-making.",
  },
  {
    slug: "bingo-for-seniors",
    tag: "bingo",
    h1: "Bingo for Seniors in Chicagoland",
    intro:
      "Chicago Ridge Park District runs both a standard Senior Bingo night and a music-themed \"Music Bingo\" session as part of its Actively Aging series, and Zion Park District pairs Bingo and Lunch several times each summer — two of 45 bingo nights across the region, most free or under $5.",
  },
  {
    slug: "dance-classes-for-seniors",
    tag: "dance",
    h1: "Dance Classes for Seniors in Chicagoland",
    intro:
      "Arlington Heights Park District's Active Adult Program runs Zumba Gold and line dancing alongside Tai Chi and chair yoga, and Niles Senior Center's dance offerings sit inside a wider slate that also covers cooking and computer instruction — a sample of 40 dance programs, with line dancing the single most common style (13 of 40).",
  },
  {
    slug: "yoga-for-seniors",
    tag: "yoga",
    h1: "Yoga for Seniors in Chicagoland",
    intro:
      "Round Lake Area Park District runs chair yoga inside its Fluid Movement/Tai Chi block at the Robert W. Rolek Community Center, and Ridgeville Park District in Evanston runs a seated-friendly class entirely over Zoom for anyone who'd rather join from home — two of 35 yoga listings across the region.",
  },
  {
    slug: "computer-classes-for-seniors",
    tag: "computer-classes",
    h1: "Computer Classes for Seniors in Chicagoland",
    intro:
      "Plainfield Area Public Library runs a quarterly rotation of core technology classes plus one-off sessions on Google Suite and 3D printing, and Chicago's DFSS Regional Senior Centers build computer instruction into their standard program menu at all six regional sites — a sample of 28 computer-class listings.",
  },
  {
    slug: "walking-groups-for-seniors",
    tag: "walking-groups",
    h1: "Walking Groups for Seniors in Chicagoland",
    intro:
      "Cary Park District runs a dedicated Walking Club alongside its senior hub's weekly rotation, and Downers Grove Public Library pairs an outdoor walking book discussion with the Downers Grove Park District — two of 24 walking programs across the region, most free and drop-in.",
  },
  {
    slug: "book-clubs-for-seniors",
    tag: "book-clubs",
    h1: "Book Clubs for Seniors in Chicagoland",
    intro:
      "Downers Grove Public Library runs three distinct senior book groups — the daytime \"Real Reads\" nonfiction discussion, \"Celebrity Reads\" biography/memoir group, and an outdoor walking book discussion — and River Forest Public Library folds Film Lover Fridays and Coffee Monday into the same Adults & Seniors umbrella as its book programming, a sample of 19 book-club listings region-wide.",
  },
  {
    slug: "tai-chi-for-seniors",
    tag: "tai-chi",
    h1: "Tai Chi for Seniors in Chicagoland",
    intro:
      "Skokie Park District runs Tai Chi Chih at both beginning and continuing levels, and Schaumburg Township's Disability & Senior Services folds Chair Yoga and Chairobics into a full weekly slate alongside its tai chi offering — two of 19 tai chi listings across the region.",
  },
  {
    slug: "strength-training-for-seniors",
    tag: "strength-training",
    h1: "Strength Training for Seniors in Chicagoland",
    intro:
      "Summit Public Library runs a free weekly Senior Strength Training class over Zoom, led by certified instructor Leena Kalle in 45-minute sessions built around muscle tone, balance, and flexibility, and Skokie Park District runs its own Dynamic Strength & Balance class in person — two of 17 strength-training listings across the region.",
  },
  {
    slug: "tech-help-for-seniors",
    tag: "tech-help",
    h1: "Tech Help for Seniors in Chicagoland",
    intro:
      "Barrington Area Council on Aging runs a Senior Planet series from AARP covering smartphones and online safety, and Yorkville Public Library offers one-on-one Tech Help sessions specifically for seniors alongside its Computer Classes — two of 13 dedicated tech-help listings across the region, distinct from structured computer classes.",
  },
  {
    slug: "pickleball-for-seniors",
    tag: "pickleball",
    h1: "Pickleball for Seniors in Chicagoland",
    intro:
      "Northbrook Park District's Senior Center runs drop-in pickleball both indoors and outdoors alongside its card-game rotation, and Schaumburg Park District's Senior Center adds weekly pickleball sessions to its daily drop-in games — two of 11 pickleball listings across the region, still a small but growing category.",
  },
  {
    slug: "choirs-and-music-for-seniors",
    tag: "music-chorus",
    h1: "Choirs & Music for Seniors in Chicagoland",
    intro:
      "Cary Park District runs the Cary Canaries Glee Club as part of its senior hub, and Antioch Township Senior Services folds a singing group into its walking-club-and-card-games lineup — two of 10 choir and music-group listings across the region.",
  },
];

export function activityPageBySlug(slug: string): ActivityPageDef | undefined {
  return ACTIVITY_PAGES.find((a) => a.slug === slug);
}

// Reverse lookup — a Listing's `activities` field stores the internal tag
// (e.g. "tech-help"), not the public page slug ("tech-help-for-seniors").
export function activityPageByTag(tag: string): ActivityPageDef | undefined {
  return ACTIVITY_PAGES.find((a) => a.tag === tag);
}
