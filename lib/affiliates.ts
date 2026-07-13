// Affiliate program links. Every URL below is a PLACEHOLDER — do not
// invent real affiliate IDs, commission numbers, or program terms. Swap
// these for the real tracking URLs once each program's current affiliate
// terms are confirmed (see build brief: Viator/Road Scholar for travel,
// Great Courses/Wondrium + MasterClass for learning, Amazon Associates
// for gear).
export const AFFILIATES = {
  viator: {
    label: "Viator",
    url: "https://www.viator.com/?pid=PLACEHOLDER_VIATOR_PID",
    blurb: "Guided tours and day experiences, bookable in advance.",
  },
  roadScholar: {
    label: "Road Scholar",
    url: "https://PLACEHOLDER_ROAD_SCHOLAR_AFFILIATE_URL",
    blurb: "Multi-day educational tours built for lifelong learners.",
  },
  greatCourses: {
    label: "The Great Courses / Wondrium",
    url: "https://PLACEHOLDER_GREAT_COURSES_AFFILIATE_URL",
    blurb: "Expert-taught video courses worth taking in retirement.",
  },
  masterClass: {
    label: "MasterClass",
    url: "https://PLACEHOLDER_MASTERCLASS_AFFILIATE_URL",
    blurb: "Learn a new skill or hobby from the people who mastered it.",
  },
  amazon: {
    label: "Amazon",
    url: "https://www.amazon.com/?tag=PLACEHOLDER_AMAZON_ASSOCIATES_TAG",
    blurb: "Walking shoes, art supplies, pickleball paddles, and more.",
  },
} as const;

export type AffiliateKey = keyof typeof AFFILIATES;
