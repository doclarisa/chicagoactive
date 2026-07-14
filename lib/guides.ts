import type { AffiliateKey } from "./affiliates";

export type Guide = {
  slug: string;
  title: string;
  dek: string;
  intro: string;
  offers: { affiliate: AffiliateKey; note: string }[];
  // The exit-ramp lead-in shown on a free listing page — must make sense
  // for every category this guide gets mapped to in categoryGuideMap.ts.
  exitRampPrompt: string;
};

// Roundups & guides — editorial content that carries affiliate links.
// Distinct from the free directory: these never claim to be a specific
// local organization's own program, only a national booking program a
// reader might use for a trip further afield.
export const GUIDES: Guide[] = [
  {
    slug: "day-trips-from-chicago",
    title: "Day Trips From Chicago for Active Seniors",
    dek: "For when you want someone else to drive.",
    intro:
      "Chicagoland's own park districts run great local day-trip programs — see the free directory for those. For longer or farther-flung trips (national parks, festival weekends, multi-day tours), these are the national booking programs built for active older travelers.",
    offers: [
      { affiliate: "viator", note: "Browse day tours and experiences near Chicago and at your destination." },
      { affiliate: "roadScholar", note: "Multi-day educational tours designed for lifelong learners 50+." },
    ],
    exitRampPrompt: "Planning something further afield?",
  },
  {
    slug: "online-learning-after-60",
    title: "Online Learning After 60",
    dek: "Courses worth taking in retirement — no classroom required.",
    intro:
      "Our library-classes listings are a great free way to learn something new down the street. But some Tuesdays the best classroom is your own couch — especially once the Chicago winter sets in. These are two well-known platforms our neighbors turn to when they want to go deeper than a library workshop allows.",
    offers: [
      {
        affiliate: "greatCourses",
        note: "Structured, multi-lecture courses taught by university professors — history, science, the arts, and more.",
      },
      {
        affiliate: "masterClass",
        note: "Single-subject classes taught by working experts — cooking, writing, gardening, and dozens of hobbies.",
      },
    ],
    exitRampPrompt: "Want to go deeper than a library workshop?",
  },
  {
    slug: "hobby-fitness-gear-for-active-seniors",
    title: "Hobby & Fitness Gear for Active Seniors",
    dek: "The gear that makes it easier to keep showing up.",
    intro:
      "Once you've found your Tuesday pickleball group or your Saturday hiking crew in the free directory, the right gear makes it easier to keep coming back — a well-fitted pair of walking shoes, a paddle that doesn't fight you, art supplies for the class you just signed up for. One place covers most of it.",
    offers: [
      {
        affiliate: "amazon",
        note: "Walking shoes, resistance bands, pickleball paddles, art supplies, and the rest of the gear list.",
      },
    ],
    exitRampPrompt: "Need the right gear for it?",
  },
];
