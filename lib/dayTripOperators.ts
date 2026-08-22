// National/regional motorcoach companies that run organized, scheduled
// group day trips reachable from Chicagoland — the paid, bookable layer
// above free/low-cost local park-district and senior-center trips (see
// the live Listing query in app/guides/day-trips-from-chicago/page.tsx
// for those). Verified against each company's own site; no invented
// pricing or schedules — every entry links to their live trip calendar
// rather than naming specific dated departures, since those expire.
export type DayTripOperator = {
  name: string;
  sourceUrl: string;
  blurb: string;
  howToBook: string;
  bookingUrl?: string; // official site's own page, for now
};

export const DAY_TRIP_OPERATORS: DayTripOperator[] = [
  {
    name: "Jones Travel",
    sourceUrl: "https://www.jonestravel.com/senior-travel.html",
    blurb:
      "A senior motorcoach service running since 1969, based in Elkhorn, WI, with regular trips into Chicago, Milwaukee, Madison, Wisconsin Dells, and Rockford. Fleet includes handicap-accessible coaches.",
    howToBook: "Call 800-236-3160 or request a quote on their site — specific pricing isn't published, and their current trip lineup is listed under Popular Trips.",
  },
  {
    name: "Cardinal Buses",
    sourceUrl: "https://www.cardinalbuses.com/",
    blurb:
      "A motorcoach company operating since 1923 out of Indiana and Michigan, known locally for Amish-country day tours and popular with senior and retiree groups. Coaches can be lift-equipped and accommodate wheelchairs, scooters, and rollators on request.",
    howToBook: "Call 800-348-7487 or email info@cardinalbuses.com — mention accessibility needs when booking.",
  },
];
