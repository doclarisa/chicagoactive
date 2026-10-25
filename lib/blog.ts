export type BlogPost = {
  slug: string;
  title: string;
  dek: string;
  publishedDate: string; // ISO date, e.g. "2026-09-19"
  readingMinutes: number;
  heroImage: string;
};

// Real, dated, bylined articles -- distinct from lib/guides.ts, which holds
// undated resource/reference pages (gear roundups, facility lists). Each
// post still gets its own dedicated static route under app/blog/<slug>/,
// same pattern as guides; this file is the shared index for /blog and the
// sitemap so the two can't drift apart.
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "chicago-suburbs-free-senior-programs",
    title: "Which Chicago Suburbs Have the Most Free Senior Programs?",
    dek: "We went through our own 338-listing directory to find out where free programming actually clusters -- the answer surprised us.",
    publishedDate: "2026-09-19",
    readingMinutes: 6,
    heroImage: "/blog/chicago-suburbs-free-senior-programs-hero.png",
  },
  {
    slug: "pickleball-and-food-chicagoland",
    title: "Where to Play Pickleball — and Actually Eat Afterward — in Chicagoland",
    dek: "The 'eatertainment' trend -- real courts with a real kitchen and bar attached -- has three solid answers here, even without a Chicken N Pickle in town.",
    publishedDate: "2026-09-20",
    readingMinutes: 4,
    heroImage: "/blog/pickleball-and-food-chicagoland-hero.png",
  },
  {
    slug: "programs-with-free-coffee-or-food",
    title: "The Programs That Come With Free Coffee — Or Better",
    dek: "We counted: 81 listings in our own directory bundle in a free coffee, snack, or meal -- about 1 in 4. Here's where.",
    publishedDate: "2026-09-22",
    readingMinutes: 5,
    heroImage: "/blog/free-coffee-or-food-hero.png",
  },
  {
    slug: "quirky-senior-programs-chicagoland",
    title: "The Hidden-Gem List: Chicagoland's Quirkiest Programs for Active Adults",
    dek: "A drum-cardio class, D&D at the library, a 1997 ukulele band, and a library death café -- the stuff that never makes the bingo-and-pinochle roundup.",
    publishedDate: "2026-09-22",
    readingMinutes: 6,
    heroImage: "/blog/quirky-programs-hero.png",
  },
  {
    slug: "senior-dating-safety-and-social-connection",
    title: "Dating After 60 in Chicagoland: How to Spot a Scam, and Where to Meet Real People",
    dek: "Romance scams cost adults 60+ over half a billion dollars in 2025 alone. Here's how to spot one, what to do if it happens, and four real Chicagoland groups for meeting people the safer way.",
    publishedDate: "2026-09-23",
    readingMinutes: 7,
    heroImage: "/blog/senior-dating-hero.png",
  },
  {
    slug: "chicagoland-museums-senior-discounts",
    title: "Where Seniors Get In Cheaper: Chicagoland Museums With a Real Discount",
    dek: "We checked every museum and attraction in our directory for a genuine senior price break -- not just \"seniors welcome.\" Here's where the discount is real money, and where you can skip it because admission's already free.",
    publishedDate: "2026-09-26",
    readingMinutes: 6,
    heroImage: "/blog/museum-discounts-hero.png",
  },
  {
    slug: "for-men-who-wont-go-to-a-senior-center",
    title: "For Men Who Won't Go to a Senior Center",
    dek: "Chess with real tournament credentials, a model-train club, D&D on Saturdays, a genealogy library, and a drum class that's actually a workout -- the Chicagoland programs built for men who'll never search \"senior center.\"",
    publishedDate: "2026-10-04",
    readingMinutes: 6,
    heroImage: "/blog/quirky-programs-chess.png",
  },
  {
    slug: "most-active-suburb-chicagoland",
    title: "The Most Active Suburb in Chicagoland",
    dek: "Raw counts always favor the biggest towns. We divided by population instead -- programs per 10,000 residents -- and the volume leaders don't win. A town of about 5,200 people does.",
    publishedDate: "2026-10-05",
    readingMinutes: 5,
    heroImage: "/blog/most-active-suburb-chicagoland-hero.png",
  },
  {
    slug: "halloween-fall-events-chicagoland-october-2026",
    title: "Halloween in Chicagoland: What's Actually Happening This October",
    dek: "A glowing pumpkin garden, a scarecrow-filled downtown, a casket race, a 55+ pickleball tournament in costume -- 11 real, verified events happening across Chicagoland this month. Most are free, open to all ages, and easy to get to on foot.",
    publishedDate: "2026-10-07",
    readingMinutes: 5,
    heroImage: "/blog/halloween-fall-events-chicagoland-october-2026-hero.png",
  },
  {
    slug: "brookfield-zoo-free-winter-days",
    title: "Brookfield Zoo Is Free Every Winter — Here's How to Make the Most of It",
    dek: "Every January and February, Brookfield Zoo Chicago opens its gates for free. The crowds are gone, the polar bears are at their best, and if you can go on a weekday, it may be the best free outing in Chicagoland.",
    publishedDate: "2026-10-07",
    readingMinutes: 5,
    heroImage: "/blog/brookfield-zoo-free-winter-days-hero.png",
  },
  {
    slug: "open-house-chicago-2026",
    title: "Open House Chicago Is This Weekend: 200+ Buildings, All Free",
    dek: "This Saturday and Sunday, more than 200 buildings across Chicago open their doors for free -- private clubs, theater lobbies, sacred spaces, and office towers with skyline views, many of them never open to the public any other day of the year.",
    publishedDate: "2026-10-15",
    readingMinutes: 6,
    heroImage: "/blog/open-house-chicago-2026-hero.png",
  },
  {
    slug: "caring-for-aging-parents-sandwich-generation",
    title: "Caring for Your Parents While Staying Active Yourself",
    dek: "Pew Research found 45% of people in their 50s are now sandwiched between an aging parent and their own kids. If that's you, here's where to actually start -- and why your own activities still matter.",
    publishedDate: "2026-10-15",
    readingMinutes: 6,
    heroImage: "/blog/caring-for-aging-parents-sandwich-generation-hero.png",
  },
  {
    slug: "halloween-safety-tips-grandparents",
    title: "Halloween Safety Tips Every Grandparent Should Know",
    dek: "If you're prepping a porch or walking a costumed grandkid around the block this year, a few real numbers (decorations start about 835 home fires a year) and a handful of practical fixes go a long way.",
    publishedDate: "2026-10-24",
    readingMinutes: 5,
    heroImage: "",
  },
  {
    slug: "forest-park-casket-races-2026",
    title: "Racing Coffins Down Beloit Avenue: Forest Park's Casket Races Never Disappoint",
    dek: "We went to the 14th annual Forest Park Casket Races so you don't have to wonder what it's actually like. Short answer: a Star Wars crew, a mermaid shipwreck, the public library pushing Minions, and three hours of pure, free, costumed chaos.",
    publishedDate: "2026-10-25",
    readingMinutes: 5,
    heroImage: "/blog/forest-park-casket-races-2026-hero.jpg",
  },
];
