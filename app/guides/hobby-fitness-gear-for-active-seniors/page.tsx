import type { Metadata } from "next";
import Link from "next/link";
import { AFFILIATES } from "@/lib/affiliates";
import { breadcrumbSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import AffiliateLink from "@/components/AffiliateLink";

const TITLE = "Hobby & Fitness Gear for Active Seniors";
const DESCRIPTION =
  "What to actually look for in pickleball paddles, walking shoes, water-aerobics gear, and art supplies for adults 50+ — buying guidance, not just a product list.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides/hobby-fitness-gear-for-active-seniors" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "article" },
  // Affiliate link isn't wired to a real tracking ID yet (see lib/affiliates.ts)
  // -- stay out of the index until it is, per the SEO skill's trust-first
  // sequencing. Flip to true once a real Amazon Associates tag is in place.
  robots: { index: false, follow: true },
};

type GearSection = {
  activityTag: string;
  activityHref: string;
  activityLabel: string;
  listingCount: number;
  heading: string;
  buyingTips: string[];
};

const SECTIONS: GearSection[] = [
  {
    activityTag: "pickleball",
    activityHref: "/activities/pickleball-for-seniors",
    activityLabel: "Pickleball for Seniors",
    listingCount: 63,
    heading: "Pickleball paddles and court shoes",
    buyingTips: [
      "A composite or graphite paddle face gives more control and less arm strain than the cheaper wood paddles most rec centers hand out for drop-in play — worth owning your own if you're playing weekly.",
      "Paddle weight matters more than brand: lighter paddles (under 7.5oz) are easier on the elbow and wrist for beginners, heavier paddles add power for players who already have a swing they trust.",
      "Court shoes, not running shoes — pickleball's side-to-side movement needs a shoe built for lateral stability, and running shoes' cushioned heel-to-toe design actually increases ankle-roll risk on a court.",
    ],
  },
  {
    activityTag: "walking-groups",
    activityHref: "/activities/walking-groups-for-seniors",
    activityLabel: "Walking Groups for Seniors",
    listingCount: 25,
    heading: "Walking shoes and trekking poles",
    buyingTips: [
      "Replace walking shoes every 300-500 miles regardless of how they look on the outside — the cushioning breaks down long before the tread does, and that's what actually protects your joints.",
      "A wide toe box matters more with age, not less — feet spread over the decades, and a shoe that fit a decade ago may now be pinching in ways that throw off your gait.",
      "Trekking poles aren't just for hiking trails — a pair used on regular neighborhood walks measurably reduces knee and hip load, especially on hills or uneven sidewalks.",
    ],
  },
  {
    activityTag: "water-aerobics",
    activityHref: "/activities/water-aerobics-for-seniors",
    activityLabel: "Water Aerobics for Seniors",
    listingCount: 26,
    heading: "Water aerobics gear",
    buyingTips: [
      "Water shoes with a grippy, non-slip sole are worth it even in a pool with a supposedly non-slip floor — pool decks and locker-room floors are the more common slip risk, not the pool itself.",
      "Water weights and webbed aqua gloves both add resistance, but they work differently: weights add load through the whole range of motion, gloves add drag that's easier on the joints — good for anyone easing back into exercise after an injury.",
      "A swim cap isn't just for competitive swimmers — it keeps chlorine off hair color and reduces post-class dry-out, worth it for anyone doing water aerobics more than once a week.",
    ],
  },
  {
    activityTag: "yoga",
    activityHref: "/activities/yoga-for-seniors",
    activityLabel: "Yoga for Seniors",
    listingCount: 47,
    heading: "Yoga and tai chi props",
    buyingTips: [
      "A thicker mat (1/2\" rather than the standard 1/8\") makes a real difference for anyone with knee or wrist sensitivity — most \"travel\" yoga mats are too thin for kneeling poses to be comfortable.",
      "Blocks and straps aren't a sign you're doing yoga \"wrong\" — they're standard equipment in most chair-yoga and gentle-yoga classes for adults 50+, and having your own means you're not relying on a shared, sometimes-worn studio set.",
      "For tai chi specifically, flat-soled shoes with good ground feel matter more than cushioning — tai chi's slow weight shifts need you to actually feel the floor, which a thick running shoe sole defeats.",
    ],
  },
  {
    activityTag: "art-classes",
    activityHref: "/activities/art-classes-for-seniors",
    activityLabel: "Art Classes for Seniors",
    listingCount: 55,
    heading: "Art and craft supplies",
    buyingTips: [
      "Most park-district and library art classes supply basic materials, but bringing your own brushes/pencils/yarn in a quality you actually like makes a real difference in whether you keep showing up week to week.",
      "For anyone with arthritis or reduced grip strength, ergonomic-handled tools (wider brush handles, spring-assisted scissors, chunky knitting needles) exist specifically for this and are worth seeking out rather than pushing through standard-grip tools.",
      "A rolling craft bag or cart beats a tote for anyone attending a weekly class — carrying supplies in and out of a car and building repeatedly adds up.",
    ],
  },
];

export default function HobbyFitnessGearPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Pickleball & Fitness", path: "/category/pickleball-fitness" },
    { name: "Hobby & Fitness Gear", path: "/guides/hobby-fitness-gear-for-active-seniors" },
  ];
  const amazon = AFFILIATES.amazon;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }}
      />
      <Breadcrumbs crumbs={crumbs} />

      <div className="mt-4">
        <AffiliateDisclosure />
      </div>

      <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{TITLE}</h1>
      <p className="mt-4 text-lg leading-relaxed text-ink">
        Once you've found your Tuesday pickleball group or your Saturday walking club in the free directory,
        the right gear makes it easier to keep showing up. This isn't a product list — it's what to actually
        look for in each category, organized around the activities that are already popular across our{" "}
        {SECTIONS.reduce((sum, s) => sum + s.listingCount, 0)}+ tracked listings.
      </p>

      <div className="mt-10 flex flex-col gap-10">
        {SECTIONS.map((section) => (
          <section key={section.activityTag}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink">{section.heading}</h2>
              <Link
                href={section.activityHref}
                className="text-base font-semibold text-flag-blue-ink no-underline hover:underline"
              >
                {section.activityLabel} ({section.listingCount}) →
              </Link>
            </div>
            <ul className="mt-3 flex flex-col gap-2">
              {section.buyingTips.map((tip) => (
                <li key={tip} className="flex gap-2 text-lg leading-relaxed text-ink">
                  <span aria-hidden="true" className="text-flag-blue-ink">
                    •
                  </span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-card bg-card p-5 shadow-sm ring-1 ring-black/5">
        <h2 className="text-lg font-bold text-ink">{amazon.label}</h2>
        <p className="mt-1 text-base text-ink-muted">{amazon.blurb}</p>
        <div className="mt-4">
          <AffiliateLink href={amazon.url} variant="primary">
            Shop {amazon.label} →
          </AffiliateLink>
        </div>
      </div>

      <section className="mt-14 border-t border-flag-blue-tint-2 pt-8">
        <h2 className="text-xl font-bold text-ink">Once you've got the gear sorted</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/category/pickleball-fitness"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Pickleball &amp; Fitness →</span>
            <span className="text-base text-ink-muted">Free courts, classes, and dedicated facilities</span>
          </Link>
          <Link
            href="/directory"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Browse the full directory →</span>
            <span className="text-base text-ink-muted">Every free and low-cost listing, searchable</span>
          </Link>
        </div>
      </section>

      <p className="mt-8">
        <Link href="/directory" className="text-base font-semibold text-flag-blue-ink no-underline hover:underline">
          ← Back to the free directory
        </Link>
      </p>
    </main>
  );
}
