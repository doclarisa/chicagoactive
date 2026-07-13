import type { AffiliateKey } from "./affiliates";

export type Guide = {
  slug: string;
  title: string;
  dek: string;
  intro: string;
  offers: { affiliate: AffiliateKey; note: string }[];
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
  },
];
