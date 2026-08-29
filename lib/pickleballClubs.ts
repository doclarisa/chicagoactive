// Dedicated, standalone indoor pickleball facilities in Chicagoland —
// commercial/private clubs, distinct from the park-district courts already
// covered as Listing rows tagged "pickleball". Same reasoning as
// medicareGyms.ts: a chain like The Picklr has multiple locations and no
// single "senior program" page, so it doesn't fit the directory's one-org,
// one-listing pattern. Every entry here was fetch-verified directly against
// the club's own site — see verifyNote for the one exception.
export type County = "Cook" | "DuPage" | "Lake" | "Will" | "Kane" | "McHenry" | "Kendall";

export type ClubLocation = {
  address: string;
  area: string;
  county: County;
};

export type PickleballClub = {
  slug: string;
  name: string;
  locations: ClubLocation[];
  indoor: boolean;
  seniorProgram?: string; // named senior/50+-specific programming, if any
  pricing: string;
  sourceUrl: string;
  note?: string;
};

export const SENIOR_PROGRAMMED_CLUBS: PickleballClub[] = [
  {
    slug: "sure-shot-pickleball-naperville",
    name: "Sure Shot Pickleball",
    locations: [{ address: "2244 Corporate Ln Ste 100, Naperville, IL 60563", area: "Naperville", county: "DuPage" }],
    indoor: true,
    seniorProgram:
      "\"60+ Silver Ladder\" discounted pickleball, sponsored by USSP/Humana — Wednesdays and Fridays, 11am-1pm.",
    pricing: "No membership required (optional membership adds perks/discounts); drop-in court reservations via Court Reserve; free intro lessons.",
    sourceUrl: "https://sureshotpickleball.com/silverladder60plus/",
  },
  {
    slug: "frog-pickleball-club-wheeling",
    name: "FROG Pickleball Club",
    locations: [{ address: "1470 S Wolf Rd, Wheeling, IL 60090", area: "Wheeling", county: "Cook" }],
    indoor: true,
    seniorProgram:
      "A named SilverSneakers/Prime partner, offering special session rates for members, plus free \"Unlimited Off-Hour\" weekday play/booking before 4pm — age-adjacent to a retiree schedule, though not an explicitly named 50+ league.",
    pricing: "FROG Standard $15/mo + $24/hr; Ultimate Unlimited $89/mo; drop-in $12 for a 2-hour session; $40/hr court rental.",
    sourceUrl: "https://frogpickleball.us/",
  },
];

export const GENERAL_CLUBS: PickleballClub[] = [
  {
    slug: "pickleball4all-glenview",
    name: "Pickleball4ALL",
    locations: [{ address: "2105 Johns Court, Glenview, IL 60025", area: "Glenview", county: "Cook" }],
    indoor: true,
    pricing: "Membership plus \"Rack & Play\" drop-in (24hr advance registration); court rentals; leagues and lessons.",
    sourceUrl: "https://pickleb4ll.com",
  },
  {
    slug: "net-game-pickleball-westmont",
    name: "Net Game Pickleball",
    locations: [{ address: "145 Plaza Drive, Westmont, IL 60559", area: "Westmont", county: "DuPage" }],
    indoor: true,
    pricing: "Membership plus guest play; court booking via CourtReserve; private lessons.",
    sourceUrl: "https://netgamepickle.com",
  },
  {
    slug: "pickle-haus-algonquin",
    name: "Pickle Haus",
    locations: [{ address: "1621 S Randall Rd, Algonquin, IL 60102", area: "Algonquin", county: "Kane" }],
    indoor: true,
    pricing: "Membership; drop-in open-play events; court booking via Play Now.",
    sourceUrl: "https://picklehaus.com",
  },
  {
    slug: "spf-pickleball-chicago",
    name: "SPF Pickleball",
    locations: [
      { address: "2121 N Clybourn Ave Bldg 1, Chicago, IL 60614", area: "Lincoln Park, Chicago", county: "Cook" },
      { address: "3800 N Milwaukee Ave, Chicago, IL 60641", area: "SPF All Day, Chicago", county: "Cook" },
    ],
    indoor: true,
    pricing: "Membership (new \"all-access\" tier across locations); app-based court booking.",
    sourceUrl: "https://playspf.com",
    note: "West Loop and Hyde Park locations were announced but not yet open as of this research.",
  },
  {
    slug: "pickleball-clubhouse-chicago",
    name: "Pickleball Clubhouse",
    locations: [{ address: "4242 N Elston Ave, Chicago, IL 60618", area: "Chicago", county: "Cook" }],
    indoor: true,
    pricing: "Court reservations; membership tier with unlimited access/priority booking; private coaching.",
    sourceUrl: "https://pickleballclub.house",
  },
  {
    slug: "big-city-pickle-chicago",
    name: "Big City Pickle",
    locations: [{ address: "401 N Morgan St (Morgan MFG), Chicago, IL 60642", area: "Chicago", county: "Cook" }],
    indoor: true,
    pricing: "Court rentals, leagues (run via Chicago Sport & Social Club), clinics, open play; no published flat rate.",
    sourceUrl: "https://chicagocitypickle.com",
    note:
      "Open Sun/Mon/Tue. A second West Loop indoor location is closed for summer, reopening fall 2026; also runs seasonal outdoor courts (Fulton Market, Gold Coast, Lincoln Yards, South Loop) not counted here.",
  },
  {
    slug: "the-picklr-chicagoland",
    name: "The Picklr",
    locations: [
      { address: "740 IL-59, Naperville, IL 60540", area: "Naperville", county: "DuPage" },
      { address: "260 W North Ave, Villa Park, IL 60181", area: "Villa Park", county: "DuPage" },
      { address: "191 Rice Lake Square, Wheaton, IL 60189", area: "Wheaton", county: "DuPage" },
      { address: "211 W Rand Rd, Mount Prospect, IL 60056", area: "Mount Prospect", county: "Cook" },
      { address: "20393 N Rand Rd, Kildeer, IL 60074", area: "Kildeer", county: "Lake" },
      { address: "1555 S Lake St, Mundelein, IL 60060", area: "Mundelein", county: "Lake" },
      { address: "111 S Weber Rd, Bolingbrook, IL 60490", area: "Bolingbrook", county: "Will" },
    ],
    indoor: true,
    pricing: "Tiered membership: Play $89/mo, Unlimited Adult $139/mo, Pro $179-189/mo, family plans; 15-day trial $30; day passes available.",
    sourceUrl: "https://thepicklr.com",
    note: "A national franchise chain — 7 Chicagoland locations, no senior-specific programming found at any of them as of this research.",
  },
];

// Named, real, with a real address — but the operator's own site blocks
// automated verification entirely, so details rest on press coverage and
// aggregators only. Same "reported, unconfirmed" honesty tier as
// medicareGyms.ts's Tier 3 — shown separately, not mixed into the verified
// lists above.
export const UNVERIFIED_LEADS = [
  {
    name: "Pickleball Kingdom Waukegan",
    address: "699 Lakehurst Rd, Waukegan, IL 60085",
    note: "13 indoor courts per court-finder aggregators and local press coverage (PR Newswire, Crain's). pickleballkingdom.com blocks automated verification entirely — call before relying on any pricing or schedule claim.",
  },
];

export const ALL_CLUBS = [...SENIOR_PROGRAMMED_CLUBS, ...GENERAL_CLUBS];

export const TOTAL_LOCATION_COUNT = ALL_CLUBS.reduce((sum, c) => sum + c.locations.length, 0);

export function countyCounts(): Record<County, number> {
  const counts: Record<County, number> = { Cook: 0, DuPage: 0, Lake: 0, Will: 0, Kane: 0, McHenry: 0, Kendall: 0 };
  for (const club of ALL_CLUBS) {
    for (const loc of club.locations) counts[loc.county] += 1;
  }
  return counts;
}
