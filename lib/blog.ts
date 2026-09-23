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
    heroImage: "",
  },
];
