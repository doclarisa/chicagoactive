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
      "Cantigny Park sells a discounted 65+ membership ($50 single/$90 dual) to its gardens and museums, and the Wheaton Park District runs open pickleball nights plus a beginner-friendly hybrid class at Central Athletic Complex.",
  },
  {
    name: "Yorkville",
    slug: "yorkville",
    county: "Kendall",
    intro:
      "The Beecher Center runs a free weekday senior-services program that includes a Fit & Strong exercise class, and Yorkville Public Library runs chair yoga, computer classes, one-on-one tech help, a walking club, and tabletop-gaming nights (Dungeons & Dragons, Magic: The Gathering) alongside its book clubs.",
  },
  {
    name: "Park Ridge",
    slug: "park-ridge",
    county: "Cook",
    intro:
      "Maine Township's MaineStreamers runs yoga, Zumba Gold, bingo nights, and day trips out of the Feldman Center, and the Park District's S.T.A.R. program at the Centennial Activity Center runs Sound Bath relaxation sessions, two levels of Mah Jongg, and tap dance alongside line dancing. Park Ridge Public Library runs Doorstep Delivery and a Museum Pass program, and the Park Ridge History Center opens its 1908 Solomon Cottage location on the 2nd and 4th Saturday of the month for local-history exhibits.",
  },
  {
    name: "Niles",
    slug: "niles",
    county: "Cook",
    intro:
      "Niles Senior Center runs luncheons, exercise and dance classes, computer training, and clubs for adults 55+ out of its Civic Center Drive facility, Niles-Maine District Library offers homebound delivery and Chair Yoga for Adults alongside its Museum Adventure Pass program, and the Niles Historical and Cultural Center is a free stop for local history in the village's former police station.",
  },
  {
    name: "Wilmette",
    slug: "wilmette",
    county: "Cook",
    intro:
      "Mallinckrodt is Wilmette Park District's community center for adults 50+, with drop-in Humanities Discussion, Canasta, and Mah Jongg groups plus day trips and Sunday concerts in the park. Wilmette Public Library delivers books to homebound patrons and keeps a hearing loop and other assistive technology on hand, Wilmette History Museum is free to visit, and the Wilmette Police Department runs a free daily wellness call-in program for independent seniors.",
  },
  {
    name: "Des Plaines",
    slug: "des-plaines",
    county: "Cook",
    intro:
      "GENCenter (formerly Frisbie Senior Center) runs more than 65 ongoing programs for older adults out of a 20,000-square-foot activity center open to everyone, resident or not, and Center of Concern runs case management, a Senior Companion Program, and a Memory Café for the wider Maine Township area. Des Plaines Public Library offers home delivery and technology classes, Des Plaines History Center is free to visit with guided tours of the 1907 Kinder House Museum, and the Park District's Prairie Lakes Fitness gives residents 55+ free access to its indoor walking track.",
  },
  {
    name: "Rolling Meadows",
    slug: "rolling-meadows",
    county: "Cook",
    intro:
      "Rolling Meadows Park District's Adult Activity Center runs day trips, a woodshop, and a hobby room, with a discounted membership rate for members 90+, Rolling Meadows Library offers Technology Help sessions and a Museum Adventure Pass, the city's Aging and Disability Services team provides free case management for older residents, and the Rolling Meadows Historical Museum is a free Sunday-only stop inside a replica 1950s ranch home.",
  },
  {
    name: "Mount Prospect",
    slug: "mt-prospect",
    county: "Cook",
    intro:
      "Mount Prospect Park District runs a $1 Bingo Bonanza, free senior walking, and a ballet class for older adults, the Village's Human Services Department runs a Senior Hub, free seated exercise classes, and home-safety assessments, Mount Prospect Public Library offers home delivery and museum passes, and the Mount Prospect Historical Society gives free weekly tours of the 1906 Dietrich Friedrichs House.",
  },
  {
    name: "Palatine",
    slug: "palatine",
    county: "Cook",
    intro:
      "Palatine Township Senior Citizens Council, one of three state-accredited senior centers in Illinois, runs a full slate of recreation, fitness, and social programs for members 50+, Palatine Library District offers Chair Yoga and museum-pass access, and Clayson House Museum gives free tours of an 1890s home furnished with more than 1,000 pieces of Palatine history.",
  },
  {
    name: "Prospect Heights",
    slug: "prospect-heights",
    county: "Cook",
    intro:
      "Prospect Heights Park District's Active Adults program runs day trips out of its Camp McDonald Road center, and Prospect Heights Public Library runs book clubs and tech classes plus homebound delivery.",
  },
  {
    name: "Hoffman Estates",
    slug: "hoffman-estates",
    county: "Cook",
    intro:
      "Hoffman Estates Park District's 50+ Active Adults Center at the Triphahn Center runs a daily hot lunch, bingo, and craft classes for about $5 a month, and the Palatine Library District's North Hoffman Branch serves the area's north side alongside Schaumburg Township's Disability & Senior Services.",
  },
  {
    name: "Northbrook",
    slug: "northbrook",
    county: "Cook",
    intro:
      "North Suburban YMCA's Active Older Adults program runs Chair Yoga, Balance for Walking, and Parkinson's Exercise Plus, and Northbrook Park District's Senior Center rounds out the recreation side. Northbrook Public Library runs a dedicated Senior Services and Outreach program with home delivery and tech help, and Northbrook Historical Society Museum is a free first-Sunday stop for local history.",
  },
  {
    name: "Northfield",
    slug: "northfield",
    county: "Cook",
    intro:
      "North Shore Senior Center, headquartered in Northfield, is open to everyone with no age or residency requirement — Lifelong Learning classes, fitness, caregiver support, and counseling all run from its campus. The Northfield Branch of the Winnetka-Northfield Public Library District has partnered with NSSC on book clubs and book donations for more than 17 years.",
  },
  {
    name: "Glenview",
    slug: "glenview",
    county: "Cook",
    intro:
      "The East Wing Glenview Senior Center anchors the Park District's senior programming, and the Village's Senior Services office, working with North Shore Senior Center, runs a free medical equipment loan closet and Medicare guidance. Glenview Public Library delivers materials to homebound residents and lends dementia-care Memory Kits, and The Grove National Historic Landmark is a free 150-acre nature preserve with docent-led weekend tours.",
  },
  {
    name: "River Forest",
    slug: "river-forest",
    county: "Cook",
    intro:
      "River Forest Public Library runs Coffee Monday, Craft and Chat, and a Celebrating Seniors program, and the Park District's Adult Variety Programs cover Bridge, Improv, and DSLR photography. Trailside Museum of Natural History, run by the Forest Preserves of Cook County, is free to visit with live native animals and nearly 5 miles of trails through Thatcher Woods.",
  },
  {
    name: "Oak Lawn",
    slug: "oak-lawn",
    county: "Cook",
    intro:
      "Oak Lawn Park District runs senior programming alongside the Village's own Oak Lawn Senior Center at the Memorial Activity Center, which offers exercise classes, arts & crafts, and a monthly box lunch. Oak Lawn Public Library rounds it out with Tech Help sessions and AgeOptions-funded Chromebook lending for adults 60 and up.",
  },
  {
    name: "Tinley Park",
    slug: "tinley-park",
    county: "Cook",
    intro:
      "The STARS Senior Drop-In Center gives Tinley Park's older adults a dedicated recreation space, and Tinley Park Public Library runs a monthly Memory Café plus a Memory Care Collection for people with dementia and their caregivers. Tinley Park Historical Society opens its Landmark Chapel and Schoolhouse Museums, free, out of an 1884 church building.",
  },
  {
    name: "Palos Heights",
    slug: "palos-heights",
    county: "Cook",
    intro:
      "Palos Heights Senior & Adult Programs runs the city's recreational offerings for older residents, and Palos Heights Public Library adds a Vinyl Record Listening Club and Museum Adventure Pass access to the mix.",
  },
  {
    name: "Riverside",
    slug: "riverside",
    county: "Cook",
    intro:
      "Riverside Township Senior Citizens Society runs free exercise classes for older residents, and the free Riverside Historical Museum, run by the Village's Historical Commission, covers Frederick Law Olmsted and Calvert Vaux's 1868 landscape design for the village — a National Historic Landmark.",
  },
  {
    name: "Brookfield",
    slug: "brookfield",
    county: "Cook",
    intro:
      "Brookfield Zoo Chicago offers senior admission discounts and free days, and the Linda Sokol Francis Brookfield Library runs senior fitness classes, Medicare workshops, and home delivery for residents who can't get to the library in person.",
  },
  {
    name: "Homewood",
    slug: "homewood",
    county: "Cook",
    intro:
      "Homewood-Flossmoor Park District's Adult & Senior (VIP) Programs anchor the recreation side, and the Village of Homewood's Senior Services connects residents with service and care coordinators for assessments and referrals. Homewood Public Library rounds it out with home delivery, tech classes, and genealogy and mahjong groups.",
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
      "The Oswego Senior & Community Center runs free computer and international cooking classes, and Oswego Public Library hosts a Dungeons & Dragons group, a Magic: The Gathering meetup, and a Thursday-evening knitting circle at its Montgomery campus.",
  },
  {
    name: "Plainfield",
    slug: "plainfield",
    county: "Will",
    intro:
      "Plainfield Township runs a Senior Shuttle bus for residents out of its Community Center, and Plainfield Area Public Library sets aside priority hours for seniors Monday, Wednesday, and Friday mornings, with quarterly tech classes and home book/audiobook delivery arranged through its Outreach Services Coordinator.",
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
      "Schaumburg Park District's Senior Center runs daily drop-in games (bocce, billiards, canasta, bridge), weekly pickleball, a 50+ indoor softball league, and a 55+ golf league, and the township library hosts a monthly Memory Café for people living with dementia and their caregivers. Schaumburg Township District Library runs well over a thousand adult programs a year, and the Village of Schaumburg's Senior Center — The Barn — serves daily meals and activities for seniors from Schaumburg and nearby communities.",
  },
  {
    name: "Franklin Park",
    slug: "franklin-park",
    county: "Cook",
    intro:
      "Leyden Township's Leyden United Senior Club runs luncheons, movie days, and arts & crafts days out of its Franklin Park office, and the Village's weekday senior lunch program at the Centre at North Park gives you a free first lunch and pairs the meal with daily bingo and monthly health fairs.",
  },
  {
    name: "Skokie",
    slug: "skokie",
    county: "Cook",
    intro:
      "Skokie Park District's Active Adults hub at Oakton Community Center runs water aerobics, Tai Chi Chih, Mah Jong, and a full slate of day trips, and the public library offers free one-on-one tech help along with Mango Languages access covering more than 60 languages. Oakton College's Emeritus Program runs weekly lectures for adults 55+, Mather's — More Than a Café serves a low-cost weekday lunch for 60+, the Village of Skokie runs free senior benefit and Medicare counseling, and Devonshire Cultural Center teaches dance, culinary, and fine arts classes for adults.",
  },
  {
    name: "Evanston",
    slug: "evanston",
    county: "Cook",
    intro:
      "Evanston's Levy Senior Center runs cultural arts classes and a weekday congregate lunch, the public library hosts a weekly Language Café and free one-on-one Tech Trainer sessions in English or Spanish, and Ridgeville Park District offers a seated-friendly Zoom yoga class for those who'd rather join from home. Evanston Art Center teaches adult studio classes across seven departments with financial aid available, the Block Museum of Art at Northwestern is free every day it's open, and McGaw YMCA runs open pickleball on six indoor courts for members.",
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
      "North Berwyn Park District's Club 55 runs weekly tai chi, chair yoga, and a bingo/movie night out of its Community Center, and the Berwyn Park District's broader Active Adult program spans fitness, arts, and game days across Proksa Park and the Liberty Cultural Center. Berwyn Public Library runs a free weekly Senior Yoga class and lends tablets to residents 60+, and the Berwyn Historical Society Museum is a free monthly stop for local history.",
  },
  {
    name: "Mundelein",
    slug: "mundelein",
    county: "Lake",
    intro:
      "The Regent Center, run by Mundelein Park & Recreation District, charges a $30 resident/$45 nonresident membership for adults 50-61 to join its weekday programs, and Fremont Public Library cardholders get free access to GetSetUp, an online live-class platform built specifically for adults 55 and up.",
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
      "The Park District of Oak Park's Lifelong Learning catalog at the Dole Center covers ceramics, stained glass, weaving, and language classes, run in partnership with the independent nonprofit Senior Citizens' Center of Oak Park and River Forest, while Oak Park Township runs a separate weekday dine-in lunch program and monthly Memory Café. Oak Park Public Library runs a free weekly Chair Yoga class over Zoom and a dedicated Older Adults program, Oak Park Conservatory is a free greenhouse and garden, Oak Park River Forest Museum covers local history for a low resident admission, and West Cook YMCA's Healthy Aging Program serves members 62 and up with fitness classes and free chronic-disease-prevention programs.",
  },
  {
    name: "Barrington",
    slug: "barrington",
    county: "Cook",
    intro:
      "The Barrington Area Council on Aging (BACOA) runs a Monday lunch-and-bingo gathering at the park district's Fitness & Recreation Center and a twice-monthly Game Club, plus a Senior Planet tech series from AARP, and the Barrington Area Library runs recurring Game-O-Rama and Senior Scrabble sessions along with home delivery for homebound patrons. Barrington itself straddles Cook and Lake counties, and these programs serve the whole area regardless of which side you're on. The Barrington Preservation Society's Town Museum, on the library's lower level, is a free Wednesday-morning stop for local history.",
  },
  {
    name: "Forest Park",
    slug: "forest-park",
    county: "Cook",
    intro:
      "Howard Mohr Community Center runs Monday/Thursday shopping trips for anyone 55 and up alongside weekly day trips and a Senior Citizens Club with bingo, and the Park District of Forest Park offers a free hospital-sponsored Zumba Gold class along with in-person and virtual yoga. Forest Park Public Library covers the cost of the AARP Driver Safety Course for residents with a library card and runs home delivery for patrons who can't visit in person.",
  },
  {
    name: "Lombard",
    slug: "lombard",
    county: "DuPage",
    intro:
      "Helen Plum Library runs monthly Senior Socials and hands-on Technology Classes, plus sewing, laser-cutting, and Cricut drop-in hours at Studio 411, its makerspace, and York Township's Senior Activity Center pairs a packed dance and fitness schedule with an on-site hair salon and free Tuesday movie afternoons.",
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
