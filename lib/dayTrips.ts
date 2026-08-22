// Day Trips from Chicago for Active Adults 55+ — a rich, evergreen
// destinations guide, not a directory listing. Every fact below traces to
// an official source (state/city tourism, Metra/Amtrak, or the attraction's
// own site) captured in sourceUrl. Nothing here is estimated or invented —
// where a fact couldn't be pinned down, it's marked "Verify" rather than
// guessed. See REVIEW-day-trips.md for the full source list per trip.

export type DayTrip = {
  slug: string;
  name: string;
  state: string;
  // Grouped by direction/distance from Chicago, not theme — how this
  // audience actually decides ("how far and which way"), per the rebuild
  // brief. See app/guides/day-trips-from-chicago/page.tsx for the grouping.
  region: "North" | "West" | "South";
  sourceUrl: string;
  lastVerified: string; // YYYY-MM-DD
  blurb: string; // 1-2 sentences, why it's good for active 55+
  gettingThere: {
    drivingMiles: number;
    drivingTime: string;
    train?: string; // named line + trip time, when one exists
  };
  walking: string; // honest accessibility/effort description
  cost: string;
  seniorDiscount?: string;
  bestTime: string;
  timeNeeded: "Half day" | "Full day";
  food: { name: string; note: string };
  bookingUrl?: string; // official site's own tour/ticket page, for now
  verifyNotes?: string[]; // things flagged, not asserted as fact
  // Reserved for a future interest-based filter (Nature/Food/Beach/etc.)
  // once there's enough volume to justify one — intentionally unpopulated
  // and not surfaced in any UI yet.
  tags?: string[] | null;
};

export const DAY_TRIPS: DayTrip[] = [
  {
    slug: "starved-rock-state-park",
    name: "Starved Rock State Park",
    state: "Illinois",
    region: "South",
    sourceUrl: "https://dnr.illinois.gov/parks/park.starvedrock.html",
    lastVerified: "2026-08-22",
    blurb:
      "Dramatic sandstone canyons and seasonal waterfalls carved by glacial meltwater — one of the most photographed landscapes in Illinois. Be honest with yourself about this one: it's beautiful, but it is not a stroll.",
    gettingThere: { drivingMiles: 91, drivingTime: "About 1h45m via I-55 S to I-80 W" },
    walking:
      "Genuinely strenuous in the canyons — 13 miles of trails with staircases and uneven wood, gravel, and dirt surfaces, and no ADA-accessible route into the canyons or overlooks. The one paved, wheelchair-accessible stretch is the sidewalk network around the Visitor Center and Starved Rock Lodge (about 1/8 mile before it turns to gravel), where you can still see the Art in the Park wood carvings and the prairie garden. If canyon hiking isn't realistic for you, the Lodge grounds alone are worth the trip.",
    cost: "Free park entry; Visitor Center is free to enter",
    bestTime:
      "Spring (April-May) for waterfalls after snowmelt, and October for fall color — both get crowded on weekends. Some trails may have construction closures in 2026; check conditions before you go.",
    timeNeeded: "Full day",
    food: {
      name: "The Lodge Restaurant at Starved Rock Lodge",
      note: "Reservations recommended; there's also the more casual Starved Rock Café on-site for a lighter stop.",
    },
    verifyNotes: [
      "2026 trail-improvement construction may limit access to some canyon trails — check dnr.illinois.gov before you go.",
    ],
  },
  {
    slug: "milwaukee",
    name: "Milwaukee",
    state: "Wisconsin",
    region: "North",
    sourceUrl: "https://amtrakhiawatha.com/",
    lastVerified: "2026-08-22",
    blurb:
      "A genuine city day without touching a highway — the train drops you downtown, and the Art Museum and Historic Third Ward are an easy walk or free streetcar ride from the station.",
    gettingThere: {
      drivingMiles: 92,
      drivingTime: "About 1h30m via I-94 N (can stretch toward 2h in rush hour)",
      train:
        "Amtrak Hiawatha Service — 7-9 trains daily, about 1h13m-1h23m each way, $19-$37 one-way depending on demand",
    },
    walking:
      "Flat, sidewalk-based city walking throughout. From the Milwaukee Intermodal Station it's about a mile (roughly a 20-minute walk) to the Historic Third Ward, or take The Hop, Milwaukee's free downtown streetcar, instead.",
    cost: "Milwaukee Art Museum: $19 general admission",
    seniorDiscount: "$17 for visitors 65+ at the Milwaukee Art Museum",
    bestTime: "Year-round — an indoor-friendly option for a colder day, since the museum and Third Ward shops are all indoors.",
    timeNeeded: "Full day",
    food: {
      name: "Café Benelux",
      note: "European café fare in the Historic Third Ward, an easy walk from the art museum.",
    },
    bookingUrl: "https://mam.org/visit/", // AFFILIATE: replace with Viator/GetYourGuide link once signed up
  },
  {
    slug: "galena",
    name: "Galena",
    state: "Illinois",
    region: "West",
    sourceUrl: "https://www.visitgalena.org/",
    lastVerified: "2026-08-22",
    blurb:
      "A 19th-century river town with 125 shops and restaurants along one flat, walkable Main Street — no hills, no navigating between stops, just park once and wander. The honest tradeoff is the drive, which is longer than everything else on this list.",
    gettingThere: {
      drivingMiles: 164,
      drivingTime: "About 2h49m — the longest drive on this list, worth noting before you commit to a day trip vs. an overnight",
    },
    walking:
      "Historic Main Street itself is flat and easy underfoot. Grant Park, across the river, adds hillier walking paths and river views if you want more; the Visitor Center on Bouthillier Street is a short walk from Main Street.",
    cost: "Free to walk Main Street; individual shop and attraction admission varies",
    bestTime: "Fall for color along the river, though Main Street gets busy on autumn weekends.",
    timeNeeded: "Full day",
    food: {
      name: "Green Street Tavern (DeSoto House Hotel)",
      note: "Open daily, right on Main Street.",
    },
    verifyNotes: ["Ulysses S. Grant Home State Historic Site admission cost — verify at the site before visiting."],
  },
  {
    slug: "lake-geneva",
    name: "Lake Geneva",
    state: "Wisconsin",
    region: "North",
    sourceUrl: "https://www.cruiselakegeneva.com/",
    lastVerified: "2026-08-22",
    blurb:
      "A lakefront boat cruise with a guide narrating the historic estates along the shore, paired with an easy, flat downtown for lunch — a genuinely relaxing day that doesn't ask much of your knees.",
    gettingThere: { drivingMiles: 83, drivingTime: "About 1h29m via I-90 W" },
    walking: "Downtown Lake Geneva is flat and walkable; the Riviera Docks, where cruises depart, are step-free.",
    cost: "Cruise ticket price — verify current rates at cruiselakegeneva.com; cruises run May through October",
    seniorDiscount: "Senior discount offered daily on all tours; an extra 20% off the adult fare specifically on Tuesdays, no code needed",
    bestTime: "May through October, when the cruise line operates from the Riviera Docks (they relocate to a winter harbor in late November-December).",
    timeNeeded: "Half day",
    food: { name: "Oakfire Restaurant", note: "Wood-fired pizzas and sandwiches, open for lunch, across from the lake." },
    bookingUrl: "https://www.cruiselakegeneva.com/public-tours/", // AFFILIATE: replace with Viator/GetYourGuide link once signed up
    verifyNotes: ["Exact current cruise ticket price — check cruiselakegeneva.com before you go."],
  },
  {
    slug: "indiana-dunes",
    name: "Indiana Dunes National Park",
    state: "Indiana",
    region: "South",
    sourceUrl: "https://www.nps.gov/indu/",
    lastVerified: "2026-08-22",
    blurb:
      "Lake Michigan beaches and dune trails reachable entirely by train — the South Shore Line's Dune Park Station puts you right at the park without a highway drive.",
    gettingThere: {
      drivingMiles: 40,
      drivingTime: "About 45 minutes via I-90/I-94",
      train: "South Shore Line to Dune Park Station — accessible platforms, free station parking if you'd rather drive partway",
    },
    walking:
      "The Indiana Dunes Visitor Center is fully ADA-accessible (restrooms, tactile trail maps). Trail difficulty varies widely across the park, from flat lakefront paths to steep dune climbs — ask rangers at the Visitor Center (219-395-1882) which trail matches your comfort level before setting out.",
    cost: "$25 per private vehicle for 7 days, $15 per person on foot or bike; America the Beautiful passes accepted",
    seniorDiscount: "Reduced South Shore Line train fares for riders 65+",
    bestTime: "Late spring through fall; summer weekends bring beach crowds.",
    timeNeeded: "Half day",
    food: { name: "Third Coast Spice Café", note: "Breakfast and lunch in downtown Chesterton, a short drive from the park." },
  },
  {
    slug: "morton-arboretum",
    name: "The Morton Arboretum",
    state: "Illinois (Lisle)",
    region: "West",
    sourceUrl: "https://mortonarb.org/visit-the-arboretum/",
    lastVerified: "2026-08-22",
    blurb:
      "1,700 acres of trees and gardens close enough for a half-day trip, with a shaded open-air tram for anyone who'd rather ride than walk the grounds.",
    gettingThere: { drivingMiles: 25, drivingTime: "About 35 minutes" },
    walking:
      "Paths near the Visitor Center are paved and accessible; most other trails are wood-chip surfaced and not usable with strollers or standard wheelchairs. The Acorn Express tram (late April-mid November) covers much of the grounds without requiring much walking.",
    cost: "General admission — verify current pricing at tickets.mortonarb.org (online tickets run $2 less than in-person)",
    seniorDiscount: "Visitors 65+ get free daily admission through a Senior-level membership; DuPage County residents get 33% off general admission on Wednesdays",
    bestTime: "Spring bloom or fall color; the Acorn Express tram only runs late April through mid-November.",
    timeNeeded: "Half day",
    food: { name: "Ginkgo Restaurant and Café", note: "In the Visitor Center, dine-in or take-out." },
    bookingUrl: "https://tickets.mortonarb.org/admission", // AFFILIATE: replace with Viator/GetYourGuide link once signed up
    verifyNotes: ["Exact adult general-admission ticket price — confirm at tickets.mortonarb.org."],
  },
  {
    slug: "chicago-botanic-garden",
    name: "Chicago Botanic Garden",
    state: "Illinois (Glencoe)",
    region: "North",
    sourceUrl: "https://www.chicagobotanic.org/",
    lastVerified: "2026-08-22",
    blurb:
      "Free admission, flat garden paths, and a free narrated tram for anyone who'd rather sit than walk the full 385 acres — one of the easiest full days on this list.",
    gettingThere: {
      drivingMiles: 20,
      drivingTime: "About 30 minutes",
      train: "Metra Union Pacific North Line to Braeside station, then roughly a 20-30 minute walk to the entrance",
    },
    walking:
      "Garden paths are mostly flat and paved. The Grand Tram Tour is a free, narrated 2.3-mile ride included with admission — a good option if walking the full grounds isn't in the cards that day.",
    cost: "Admission is free; parking is $25 weekdays, $30 weekends/federal holidays",
    seniorDiscount: "$10 senior parking rate on Tuesdays, plus discounted tram tour rates for seniors",
    bestTime: "Spring through fall for blooms; can be crowded on nice-weather weekends.",
    timeNeeded: "Half day",
    food: { name: "Garden View Café", note: "On-site, breakfast, lunch, and grab-and-go options." },
  },
  {
    slug: "long-grove",
    name: "Long Grove",
    state: "Illinois",
    region: "North",
    sourceUrl: "https://www.longgrove.org/",
    lastVerified: "2026-08-22",
    blurb:
      "A compact 19th-century village you can see entirely on foot after one parking spot — brick walkways, boutique shops, and a low-key pace that doesn't demand a full day.",
    gettingThere: { drivingMiles: 36, drivingTime: "About 42 minutes" },
    walking:
      "Once parked, everything downtown is within easy walking distance on brick walkways. Most dining rooms are step-free or ramped, though a few historic shop entrances have narrow doorways or steps — call ahead if that matters for your visit.",
    cost: "Free to walk the village; individual shop pricing varies",
    bestTime: "Especially lively in fall; most shops open late morning into early evening, longer on weekends.",
    timeNeeded: "Half day",
    food: { name: "Sorelle Italian Market & Cafe", note: "Sandwiches, panini, and baked goods in the historic downtown." },
  },
  {
    slug: "geneva-st-charles",
    name: "Geneva & St. Charles",
    state: "Illinois",
    region: "West",
    sourceUrl: "https://www.geneva.il.us/894/Geneva-Attractions",
    lastVerified: "2026-08-22",
    blurb:
      "Two walkable Fox River downtowns a short drive apart, both known for their flat riverwalks, independent shops, and river views — easy to do one or both in a day.",
    gettingThere: {
      drivingMiles: 45,
      drivingTime: "About 40-45 minutes to Geneva via I-88",
      train: "Metra Union Pacific West Line runs directly to Geneva's downtown station; St. Charles does not have its own Metra stop, so plan to drive or take a short cab/rideshare from the Geneva station",
    },
    walking:
      "Geneva is regularly cited as one of the most walkable suburban downtowns in Chicagoland, with a flat, paved Fox River Trail connecting it to Island Park. St. Charles' downtown is similarly flat and compact.",
    cost: "Free to walk both downtowns; individual shop and restaurant pricing varies",
    bestTime: "Spring through fall, when the riverwalk and outdoor patios are at their best.",
    timeNeeded: "Half day",
    food: { name: "Atwater's Restaurant", note: "Fox River views from the Herrington Inn in downtown Geneva." },
  },
  {
    slug: "racine",
    name: "Racine",
    state: "Wisconsin",
    region: "North",
    sourceUrl: "https://racinedowntown.com/",
    lastVerified: "2026-08-22",
    blurb:
      "A Lake Michigan lakefront walk paired with two museums a short stroll apart, and the added bonus of some of the Midwest's best-known Danish kringle bakeries.",
    gettingThere: { drivingMiles: 76, drivingTime: "About 1h24m via I-94 N" },
    walking:
      "The lakefront promenade is flat. The Racine Art Museum and Racine Heritage Museum are about a 10-15 minute walk apart through downtown.",
    cost: "Racine Art Museum: $10 general admission (free at its sister site, the Wustum Museum, and free on First Fridays)",
    bestTime: "May through October for the lakefront; year-round for the museums.",
    timeNeeded: "Half day",
    food: { name: "O&H Danish Bakery", note: "Deli sandwiches and lunch items alongside their well-known kringle." },
  },
  {
    slug: "kenosha",
    name: "Kenosha",
    state: "Wisconsin",
    region: "North",
    sourceUrl: "https://www.visitkenosha.com/things-to-do/attractions/harborpark/",
    lastVerified: "2026-08-22",
    blurb:
      "The only Wisconsin stop on Chicago's own Metra system — no highway driving required — and once there, a free vintage streetcar links the lakefront museums for anyone who'd rather ride than walk between them.",
    gettingThere: {
      drivingMiles: 66,
      drivingTime: "About 1h12m via I-94 N",
      train: "Metra Union Pacific North Line — Kenosha is the line's northern terminus, about 51.6 miles from Ogilvie Transportation Center",
    },
    walking:
      "HarborPark's lakeside promenade is flat. The Kenosha Public Museum has ramps and elevators and keeps a loaner wheelchair on hand; the free Lakefront Trolley (vintage streetcar) connects the Civil War Museum and Kenosha Public Museum for anyone who'd rather not walk between them.",
    cost: "Verify current admission at the Kenosha Public Museum and Civil War Museum before visiting",
    bestTime: "Year-round; the streetcar and lakefront are especially pleasant May through October.",
    timeNeeded: "Half day",
    food: { name: "Boat House Dockside Pub & Eatery", note: "Lake views alongside steaks and pub classics near HarborPark." },
    verifyNotes: ["Museum admission costs weren't confirmed on official pages — check before visiting."],
  },
  {
    slug: "naper-settlement-riverwalk",
    name: "Naper Settlement & the Naperville Riverwalk",
    state: "Illinois",
    region: "West",
    sourceUrl: "https://www.napersettlement.org/8/Visit",
    lastVerified: "2026-08-22",
    blurb:
      "A wheelchair-accessible outdoor history museum steps from the flat, scenic Naperville Riverwalk — and Naper Settlement runs its own free ongoing program built specifically for adults 55+.",
    gettingThere: {
      drivingMiles: 30,
      drivingTime: "About 37 minutes",
      train: "Metra BNSF Line to the Naperville station, an easy walk from downtown and the Riverwalk",
    },
    walking:
      "The Riverwalk itself is flat and paved. Naper Settlement makes wheelchair access available across its collection of historic homes.",
    cost: "Naper Settlement: $12 general admission (May-Oct) / $6 (Nov-Apr)",
    seniorDiscount: "$10 for visitors 62+ (May-Oct) / $5 (Nov-Apr); free for Naperville residents with proof of residency",
    bestTime: "Naper Settlement runs Golden Days, a free ongoing program for adults 55+ in partnership with the Naperville Park District, including gentle outdoor chair yoga — check napersettlement.org for the current schedule.",
    timeNeeded: "Half day",
    food: { name: "Empire Burgers & Brews", note: "Steps from the Riverwalk in downtown Naperville." },
    bookingUrl: "https://www.napersettlement.org/8/Visit", // AFFILIATE: replace with Viator/GetYourGuide link once signed up
  },
  {
    slug: "volo-auto-museum",
    name: "Volo Auto Museum",
    state: "Illinois",
    region: "North",
    sourceUrl: "https://volocars.com/",
    lastVerified: "2026-08-22",
    blurb:
      "An entirely indoor day of classic cars and movie-prop vehicles — a good pick when the weather doesn't cooperate, with minimal walking required.",
    gettingThere: { drivingMiles: 50, drivingTime: "About 1h04m" },
    walking:
      "Mostly flat indoor floors. Wheelchairs and mobility scooters can be rented on-site ($10-$55/day), though some doorways and transitions between exhibit areas are narrow — call ahead with specific accessibility questions.",
    cost: "$22.95 general admission (ages 13-64)",
    seniorDiscount: "$20.95 for visitors 65+",
    bestTime: "Year-round — a reliable indoor option for a rainy or cold day.",
    timeNeeded: "Half day",
    food: { name: "Fox Lake Family Restaurant", note: "About 5 miles away; there's no restaurant on-site, so plan to eat before or after." },
    bookingUrl: "https://volocars.com/plan-your-visit", // AFFILIATE: replace with Viator/GetYourGuide link once signed up
    verifyNotes: ["No on-site dining — food is a short drive away, not walkable from the museum."],
  },
];
