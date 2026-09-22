import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { breadcrumbSchema, articleSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BLOG_POSTS } from "@/lib/blog";

const POST = BLOG_POSTS.find((p) => p.slug === "programs-with-free-coffee-or-food")!;

export const metadata: Metadata = {
  title: POST.title,
  description: POST.dek,
  alternates: { canonical: `/blog/${POST.slug}` },
  openGraph: { title: POST.title, description: POST.dek, type: "article" },
  robots: { index: true, follow: true },
};

function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

// Same methodology as the free-vs-paid county piece: pulled straight from
// the directory's own listing descriptions, not guessed at. "meal" alone
// is excluded -- it mostly catches Meals on Wheels home-delivery mentions,
// not an on-site perk -- and the DFSS Golden Diners network is counted
// separately since it's a donation-based program, not a free extra.
const PERK_KEYWORDS = [
  "coffee", "snack", "refreshment", "treat", "cookie", "donut", "doughnut",
  "bagel", "ice cream", "dessert", "popcorn", "pastries", "pastry", "punch",
  "potluck", "pot luck", "brunch", "luncheon", "lunch", "breakfast", "cake",
  "cocoa", "bake sale",
];

type Example = { name: string; area: string; note: string; sourceUrl: string };

const COFFEE_CLUBS: Example[] = [
  {
    name: "Forest View Park District Senior Coffee",
    area: "Forest View",
    note: "A monthly drop-in built around exactly what it sounds like -- coffee, food, conversation, and a few games. Free.",
    sourceUrl: "https://forestviewparkdistrict.org/recreation-events/senior-coffee/",
  },
  {
    name: "Manhattan-Elwood Library — Senior Social Hour",
    area: "Manhattan",
    note: "A free weekly coffee-and-conversation hour, also referenced under \"Morning Chat\" in village materials.",
    sourceUrl: "https://manhattanelwood.librarycalendar.com/event/senior-social-hour-6971",
  },
  {
    name: "New Lenox Public Library Senior Center",
    area: "New Lenox",
    note: "Coffee, tea, and treats every other first Thursday, with board games and reading available any time. Free.",
    sourceUrl: "https://www.newlenoxlibrary.org/community-resources",
  },
  {
    name: "River Forest Public Library — Coffee Monday",
    area: "River Forest",
    note: "A casual coffee-and-conversation gathering the first Monday morning of each month. Free.",
    sourceUrl: "https://www.riverforestlibrary.org/adults",
  },
  {
    name: "Antioch Public Library — Fireside Fridays",
    area: "Antioch",
    note: "Coffee and pastries by the fireplace with the library's Executive Director, no registration required. Free.",
    sourceUrl: "https://apld.info/newsletter/newsletter-text-only/",
  },
];

const BINGO_SNACKS: Example[] = [
  {
    name: "Senior Bagels & Bingo — Flossmoor Public Library",
    area: "Flossmoor",
    note: "Exactly the name suggests: bagels and bingo, Sunday mornings, free and come-as-you-are.",
    sourceUrl: "https://www.flossmoorlibrary.org/programs/",
  },
  {
    name: "Senior Bingo & Chair Yoga — Steger-South Chicago Heights Library",
    area: "Steger",
    note: "Coffee and refreshments at the Thursday bingo hour, then a chair yoga class right after. Free.",
    sourceUrl: "https://engagedpatrons.org/Events.cfm?SiteID=3325",
  },
  {
    name: "Berkeley Public Library — Monday Bingo",
    area: "Berkeley",
    note: "Light refreshments included with the free weekly bingo session.",
    sourceUrl: "https://www.berkeleypl.org",
  },
  {
    name: "Donut Bingo — Villa Park Recreation Center",
    area: "Villa Park",
    note: "Bundled into the center's low-cost 60+ program lineup, not a standalone free event -- but the name says it all.",
    sourceUrl: "https://www.invillapark.com/284/Adults-Seniors",
  },
];

const FREE_LUNCH: Example[] = [
  {
    name: "Maine Township MaineStreamers",
    area: "Park Ridge",
    note: "Free social club for residents 55+ with monthly luncheons built into the membership.",
    sourceUrl: "https://mainetown.com/departments/mainestreamers/index.php",
  },
  {
    name: "Manhattan Senior Luncheons",
    area: "Manhattan",
    note: "A free quarterly lunch with refreshments and a guest speaker, jointly run by the village, township, and park district.",
    sourceUrl: "https://villageofmanhattan.org/residents/households/senior_services/luncheons.php",
  },
  {
    name: "Gurnee Park District Monthly Mixer (55+)",
    area: "Gurnee",
    note: "A free catered lunch paired with live entertainment and themed parties -- Hawaiian beach party, Oktoberfest, holidays.",
    sourceUrl: "https://www.gurneeparkdistrict.com/tag/monthly-mixer/",
  },
  {
    name: "Golden Ager Meetings — Jones Center",
    area: "Chicago Heights",
    note: "Doors open at 10am, lunch served at 11:30 -- a free social luncheon built around fellowship.",
    sourceUrl: "https://www.jonescenter.org/golden-ager-meetings.html",
  },
];

export default async function FreeCoffeeOrFoodPost() {
  const listings = await prisma.listing.findMany({
    where: { status: "PUBLISHED" },
    select: { description: true, cost: true },
  });

  let freeCount = 0;
  let lowCostCount = 0;
  let goldenDinersCount = 0;

  for (const l of listings) {
    const d = l.description.toLowerCase();
    if (d.includes("golden diners")) {
      goldenDinersCount += 1;
      continue;
    }
    const hasPerk = PERK_KEYWORDS.some((k) => d.includes(k));
    if (!hasPerk) continue;
    if (l.cost === "FREE") freeCount += 1;
    else if (l.cost === "LOW_COST") lowCostCount += 1;
  }

  const totalPerk = freeCount + lowCostCount;
  const totalListings = listings.length;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: POST.title, path: `/blog/${POST.slug}` },
  ];

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              headline: POST.title,
              description: POST.dek,
              path: `/blog/${POST.slug}`,
              datePublished: POST.publishedDate,
            }),
          ),
        }}
      />
      <Breadcrumbs crumbs={crumbs} />

      <article>
        <header className="mt-4">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            {POST.title}
          </h1>
          <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-ink-muted">
            <time dateTime={POST.publishedDate}>{formatDate(POST.publishedDate)}</time>
            <span aria-hidden="true">·</span>
            <span>{POST.readingMinutes} min read</span>
            <span aria-hidden="true">·</span>
            <span>Active Chicagoland</span>
          </p>
        </header>

        <p className="mt-6 text-xl leading-relaxed text-ink">
          It sounds like a trivial thing to build a directory around. It isn&apos;t. We went through every
          listing in our directory looking for one specific detail: does this program mention food or
          drink? Not a formal meal-assistance service -- an actual coffee, snack, or lunch that comes with
          showing up. The count surprised us: <strong>{totalPerk} listings</strong>, out of {totalListings}{" "}
          total, mention something to eat or drink. That&apos;s roughly{" "}
          <strong>1 in {Math.round(totalListings / totalPerk)}</strong>.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-ink">
          Split it two ways: <strong>{freeCount} of those are completely free programs</strong> where the
          coffee, snack, or meal is just part of the deal, and <strong>{lowCostCount} are low-cost
          programs</strong> ($1-$15, typically) where food is bundled into the fee -- think a $1 &quot;Coffee&apos;s
          On&quot; morning or a $10 lunch-and-bingo that includes the lunch. Below are the ones worth knowing
          by name, organized by what you&apos;re actually there for.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">Actual free coffee clubs</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          Not a coffee urn in the corner of some other program -- these exist specifically for the coffee
          and conversation.
        </p>
        <div className="mt-5 flex flex-col gap-4">
          {COFFEE_CLUBS.map((e) => (
            <div key={e.name} className="rounded-card bg-card p-5 shadow-sm ring-1 ring-black/5">
              <h3 className="text-lg font-bold text-ink">{e.name}</h3>
              <p className="mt-1 text-sm font-semibold text-ink-muted">{e.area}</p>
              <p className="mt-2 text-base text-ink-muted">{e.note}</p>
              <a
                href={e.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-semibold text-flag-blue-ink no-underline hover:underline"
              >
                Source →
              </a>
            </div>
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">Bingo, but make it brunch</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          Bingo is already the most common free activity in our directory. A surprising number of them
          throw in something to eat, too.
        </p>
        <div className="mt-5 flex flex-col gap-4">
          {BINGO_SNACKS.map((e) => (
            <div key={e.name} className="rounded-card bg-card p-5 shadow-sm ring-1 ring-black/5">
              <h3 className="text-lg font-bold text-ink">{e.name}</h3>
              <p className="mt-1 text-sm font-semibold text-ink-muted">{e.area}</p>
              <p className="mt-2 text-base text-ink-muted">{e.note}</p>
              <a
                href={e.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-semibold text-flag-blue-ink no-underline hover:underline"
              >
                Source →
              </a>
            </div>
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">The ice cream social isn&apos;t dead</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          It just moved to a park district community room. Marengo Society for Historic Preservation runs
          an annual free Ice Cream Social; Wood Dale Park District and Northbrook Park District&apos;s
          senior centers both run their own seasonal ice cream socials as part of their low-cost 55+
          programs.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">A free lunch, genuinely free</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          These aren&apos;t donation-based meal programs -- they&apos;re free-admission social clubs where a
          real lunch is part of the membership.
        </p>
        <div className="mt-5 flex flex-col gap-4">
          {FREE_LUNCH.map((e) => (
            <div key={e.name} className="rounded-card bg-card p-5 shadow-sm ring-1 ring-black/5">
              <h3 className="text-lg font-bold text-ink">{e.name}</h3>
              <p className="mt-1 text-sm font-semibold text-ink-muted">{e.area}</p>
              <p className="mt-2 text-base text-ink-muted">{e.note}</p>
              <a
                href={e.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-semibold text-flag-blue-ink no-underline hover:underline"
              >
                Source →
              </a>
            </div>
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">
          The big one: Chicago&apos;s Golden Diners network
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Separate from all of the above, and too big to lump in with the rest: Chicago runs a
          donation-based lunch program called Golden Diners out of its senior centers citywide. We found it
          named at <strong>{goldenDinersCount} different DFSS satellite and regional senior centers</strong>{" "}
          across the city, from Austin to South Chicago to Edgewater -- a genuinely citywide fixture that
          most people outside the network probably haven&apos;t heard of by name, suggested-donation lunch,
          social time, and all.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">One honest caveat</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Refreshments at drop-in programs can be seasonal, grant-funded, or dependent on a volunteer that
          month -- a library newsletter mentioning &quot;coffee and treats&quot; this spring is a good sign,
          not a guarantee. Call ahead if the food is the whole reason you&apos;re going. Same rule as
          everything else in this directory: verified against the program&apos;s own source, but things
          change -- confirm before you drive across town for the donuts.
        </p>
      </article>

      <section className="mt-14 border-t border-flag-blue-tint-2 pt-8">
        <h2 className="text-xl font-bold text-ink">Find more like this</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/category/senior-center-events"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Senior Center Events →</span>
            <span className="text-base text-ink-muted">Lunches, luncheons, and social hours</span>
          </Link>
          <Link
            href="/category/library-classes"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Library Classes →</span>
            <span className="text-base text-ink-muted">Coffee hours, book clubs, and Memory Cafés</span>
          </Link>
        </div>
      </section>

      <p className="mt-8">
        <Link href="/blog" className="text-base font-semibold text-flag-blue-ink no-underline hover:underline">
          ← Back to the blog
        </Link>
      </p>
    </main>
  );
}
