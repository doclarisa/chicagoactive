// Stage 2 Wave 1 — cities with 2+ own listings, cleared for a /city/[slug]
// page. Below this bar, a city stays filter-only on /directory (no URL) —
// "we do not build a page we can't fill." intro is hand-written from each
// city's actual own listings (see lib/cities.ts's sibling — this file has
// no auto-generated content). county is the majority county among a city's
// own listings, used for breadcrumbs/badges; some border cities (Barrington)
// genuinely span more than one county, which the intro text reflects instead
// of the single county field.
export type CityDef = {
  name: string;
  slug: string;
  county: string;
  intro: string;
};

export const CITIES: CityDef[] = [
  {
    name: "Wheaton",
    slug: "wheaton",
    county: "DuPage",
    intro:
      "Wheaton's senior offerings include a discounted 65+ membership to Cantigny Park's gardens and museums, plus open pickleball nights and a beginner-friendly hybrid class through the Wheaton Park District at Central Athletic Complex.",
  },
  {
    name: "Yorkville",
    slug: "yorkville",
    county: "Kendall",
    intro:
      "Yorkville pairs a free weekday senior-services program at the Beecher Center — including a Fit & Strong exercise class — with a genuinely active public library offering chair yoga, computer classes, one-on-one tech help, a walking club, and tabletop gaming for adults.",
  },
  {
    name: "Park Ridge",
    slug: "park-ridge",
    county: "Cook",
    intro:
      "Park Ridge has two deep senior programs: Maine Township's MaineStreamers (yoga, Zumba Gold, bingo nights, and day trips out of the Feldman Center) and the Park District's S.T.A.R. program at the Centennial Activity Center, with everything from Sound Bath relaxation to Mah Jongg and tap dance.",
  },
  {
    name: "Geneva",
    slug: "geneva",
    county: "Kane",
    intro:
      "Geneva Park District's adult/senior catalog runs from meditation and pickleball to golf and martial arts through the Geneva Friendly Senior Club, and the public library hosts a monthly Memory Café for residents living with memory loss and their caregivers.",
  },
  {
    name: "Oswego",
    slug: "oswego",
    county: "Kendall",
    intro:
      "Oswego's senior options include the Oswego Senior & Community Center's free computer and international cooking classes, and a public library with a Dungeons & Dragons group, a Magic: The Gathering meetup, and a Thursday-evening knitting circle.",
  },
  {
    name: "Plainfield",
    slug: "plainfield",
    county: "Will",
    intro:
      "Plainfield Township runs Active Adult programs and a senior shuttle bus out of its Community Center, and Plainfield Area Public Library sets aside priority morning hours for seniors three days a week alongside quarterly tech classes and home delivery for homebound patrons.",
  },
  {
    name: "Zion",
    slug: "zion",
    county: "Lake",
    intro:
      "Zion Park District's 55 & Over Club ($15/year) runs a packed calendar of dominoes and card games, a Monday walking group, Senior Fit aerobics, and day trips to spots like the Milwaukee County Zoo, while Zion-Benton Public Library hosts a recurring Senior Social Hour with games and refreshments.",
  },
  {
    name: "Lemont",
    slug: "lemont",
    county: "Cook",
    intro:
      "Lemont Township's senior center runs a weekday Community Café and a monthly Senior Citizen Association meeting, and The CORE Fitness & Aquatic Complex — run by the Lemont Park District — is a SilverSneakers location with an indoor pool and fitness classes at no extra cost for qualifying Medicare plans.",
  },
  {
    name: "Park Forest",
    slug: "park-forest",
    county: "Cook",
    intro:
      "Rich Township's Shirley J. Green Senior Center in downtown Park Forest runs about 14 activities including Tai Chi, chair Zumba, and card games, plus a $5 sit-down lunch every Wednesday, while the public library hosts a free drop-in knitting and crocheting circle every Thursday.",
  },
  {
    name: "Schaumburg",
    slug: "schaumburg",
    county: "Cook",
    intro:
      "Schaumburg Park District's Senior Center runs daily drop-in games (bocce, billiards, canasta, bridge), weekly pickleball, a 50+ indoor softball league, and a 55+ golf league, and the township library hosts a monthly Memory Café for people living with dementia and their caregivers.",
  },
  {
    name: "Franklin Park",
    slug: "franklin-park",
    county: "Cook",
    intro:
      "Leyden Township runs senior luncheons, arts & crafts days, and day trips from its Franklin Park office, and the Village's weekday senior lunch program at the Centre at North Park pairs a hot meal with daily bingo and monthly health fairs.",
  },
  {
    name: "Skokie",
    slug: "skokie",
    county: "Cook",
    intro:
      "Skokie Park District's Active Adults hub at Oakton Community Center runs water aerobics, Tai Chi Chih, Mah Jong, and a full slate of day trips, and the public library offers free one-on-one tech help along with Mango Languages access covering more than 60 languages.",
  },
  {
    name: "Evanston",
    slug: "evanston",
    county: "Cook",
    intro:
      "Evanston's Levy Senior Center runs cultural arts classes and a weekday congregate lunch, the public library hosts a weekly Language Café and free one-on-one Tech Trainer sessions in English or Spanish, and Ridgeville Park District offers a seated-friendly Zoom yoga class for those who'd rather join from home.",
  },
  {
    name: "Bolingbrook",
    slug: "bolingbrook",
    county: "Will",
    intro:
      "DuPage Township's Levy Senior Center in Bolingbrook runs named clubs for line dancing, ceramics, machine embroidery, and a Thursday choir, plus Meals on Wheels lunches, and the Bolingbrook Park District organizes extended bus trips like a Smoky Mountains tour.",
  },
  {
    name: "Lake Zurich",
    slug: "lake-zurich",
    county: "Lake",
    intro:
      "Ela Township's 50+ senior center offers free membership for residents, a men's-only program, and a subsidized bus, Ela Area Public Library runs a monthly Senior Scrabble Club and Zoom chair yoga, and Keenagers at St. Francis de Sales Parish welcomes anyone 55+ in the area, parishioner or not.",
  },
  {
    name: "Crystal Lake",
    slug: "crystal-lake",
    county: "McHenry",
    intro:
      "Grand Oaks Active Senior Center, run by the Crystal Lake Park District, has named fitness classes like Sit, Stand and Swing and Move It, Shake It, Lift It alongside Beanbag Baseball and open card games, plus fee-based day trips to shows, concerts, and casinos.",
  },
  {
    name: "Berwyn",
    slug: "berwyn",
    county: "Cook",
    intro:
      "North Berwyn Park District's Club 55 runs weekly tai chi, chair yoga, and a bingo/movie night out of its Community Center, and the Berwyn Park District's broader Active Adult program spans fitness, arts, and game days across Proksa Park and the Liberty Cultural Center.",
  },
  {
    name: "Mundelein",
    slug: "mundelein",
    county: "Lake",
    intro:
      "Mundelein Park & Recreation District runs weekday social and wellness activities for ages 50-61 at the Regent Center, and Fremont Public Library cardholders get free access to GetSetUp, an online class platform built specifically for adults 55 and up.",
  },
  {
    name: "Arlington Heights",
    slug: "arlington-heights",
    county: "Cook",
    intro:
      "The Arlington Heights Senior Center houses the park district, library, and Catholic Charities under one roof with no residency requirement, and the Park District's Active Adult Program runs a certified woodshop, pickleball conditioning classes, and more than 50 one-day bus tours a year.",
  },
  {
    name: "Waukegan",
    slug: "waukegan",
    county: "Lake",
    intro:
      "Waukegan Public Library's Maker Space teaches embroidery, jewelry-making, and t-shirt printing alongside free GED tutoring, and the Patricia A. Jones Center runs exercise classes, a woodshop, and Medicare counseling for Waukegan Township's 55-and-better residents.",
  },
  {
    name: "Oak Park",
    slug: "oak-park",
    county: "Cook",
    intro:
      "The Park District of Oak Park's Lifelong Learning catalog at the Dole Center covers ceramics, stained glass, weaving, and language classes, run in partnership with the independent nonprofit Senior Citizens' Center of Oak Park and River Forest, while Oak Park Township runs a separate weekday dine-in lunch program and monthly Memory Café.",
  },
  {
    name: "Barrington",
    slug: "barrington",
    county: "Cook",
    intro:
      "The Barrington Area Council on Aging (BACOA) runs a Monday lunch-and-bingo gathering at the park district's Fitness & Recreation Center and a twice-monthly Game Club, plus a Senior Planet tech series from AARP, and the Barrington Area Library runs recurring Game-O-Rama and Senior Scrabble sessions along with home delivery for homebound patrons. Barrington itself straddles Cook and Lake counties, and these programs serve the whole area regardless of which side you're on.",
  },
  {
    name: "Forest Park",
    slug: "forest-park",
    county: "Cook",
    intro:
      "Howard Mohr Community Center runs weekly day trips, twice-weekly shopping trips, and a Senior Citizens Club with bingo, and the Park District of Forest Park offers a free hospital-sponsored Zumba Gold class along with in-person and virtual yoga.",
  },
  {
    name: "Lombard",
    slug: "lombard",
    county: "DuPage",
    intro:
      "Helen Plum Library runs monthly Senior Socials and hands-on Technology Classes plus a makerspace with sewing and Cricut projects, and York Township's Senior Activity Center pairs a packed dance and fitness schedule with an on-site hair salon and free Tuesday movie afternoons.",
  },
  {
    name: "Elgin",
    slug: "elgin",
    county: "Kane",
    intro:
      "Gail Borden Public Library's older-adult programming includes a standing Pinochle Club, one-on-one \"Device Advice\" tech help, and a bilingual Memory Café (\"Cafecito entre Amigos\"), and Senior Services Associates staffs Kane County's Area Agency on Aging office with in-person hours every Thursday morning at The Centre of Elgin.",
  },
  {
    name: "Highland Park",
    slug: "highland-park",
    county: "Lake",
    intro:
      "Highland Park's Division of Senior Services runs bridge, canasta, and mah-jongg alongside fitness classes like Nia and a bone-and-balance booster, and the Highland Park Park District hosts a monthly 55+ potluck gathering at Lincoln Community Center from April through October.",
  },
  {
    name: "Downers Grove",
    slug: "downers-grove",
    county: "DuPage",
    intro:
      "The Downers Grove Park District's Active Adults program at Lincoln Center runs a Cinema Club, a monthly Lunch Bunch outing, and the Scarlett Bloomers women's club, the public library runs several senior-focused book discussion groups, and Downers Grove Township pairs computer classes with a $3-a-ride Dial-A-Ride service.",
  },
  {
    name: "Chicago Heights",
    slug: "chicago-heights",
    county: "Cook",
    intro:
      "Chicago Heights Park District sells a discounted \"Senior/Tercer Edad\" membership for access to the Recreation Center's pool and fitness room, Bloom Township runs a free twice-weekly Stronger Seniors chair-exercise class (a doctor's waiver is required to start), and the Harold Colbert Jones Memorial Community Center hosts a recurring Golden Ager lunch gathering.",
  },
  {
    name: "West Chicago",
    slug: "west-chicago",
    county: "DuPage",
    intro:
      "West Chicago Park District's 50+ program runs joint events with the Warrenville and Winfield Park Districts, including a river boat cruise and a visit to the alpacas at Magic Meadows, and Wayne Township's senior center runs a full weekly fitness lineup alongside a medical equipment lending closet.",
  },
  {
    name: "Grayslake",
    slug: "grayslake",
    county: "Lake",
    intro:
      "The Grayslake Senior Activity Center runs Bingocize, ceramics classes, and lifelong-learning talks with free membership for the 60030 zip code, and the Grayslake Park District hosts a monthly Nifty Fifty+ Bingo social for $5 at the door.",
  },
];

export function cityBySlug(slug: string): CityDef | undefined {
  return CITIES.find((c) => c.slug === slug);
}
