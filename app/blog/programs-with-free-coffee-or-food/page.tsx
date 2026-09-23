import type { Metadata } from "next";
import Image from "next/image";
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
  openGraph: {
    title: POST.title,
    description: POST.dek,
    type: "article",
    images: [POST.heroImage],
  },
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
    note: "A monthly drop-in that is exactly what it sounds like: coffee, food, conversation, and a few games. Free.",
    sourceUrl: "https://forestviewparkdistrict.org/recreation-events/senior-coffee/",
  },
  {
    name: "Manhattan-Elwood Library — Senior Social Hour",
    area: "Manhattan",
    note: "A free weekly hour of coffee and conversation. Village materials also call it \"Morning Chat.\"",
    sourceUrl: "https://manhattanelwood.librarycalendar.com/event/senior-social-hour-6971",
  },
  {
    name: "New Lenox Public Library Senior Center",
    area: "New Lenox",
    note: "Coffee, tea, and treats on scheduled Thursdays, plus board games and reading any time. Free.",
    sourceUrl: "https://www.newlenoxlibrary.org/community-resources",
  },
  {
    name: "River Forest Public Library — Coffee Monday",
    area: "River Forest",
    note: "A relaxed coffee-and-conversation morning on the first Monday of each month. Free.",
    sourceUrl: "https://www.riverforestlibrary.org/adults",
  },
  {
    name: "Antioch Public Library — Fireside Fridays",
    area: "Antioch",
    note: "Coffee and pastries by the fireplace with the library's Executive Director. No registration needed. Free. (It's hard to top a fireplace.)",
    sourceUrl: "https://apld.info/newsletter/newsletter-text-only/",
  },
];

const BINGO_SNACKS: Example[] = [
  {
    name: "Senior Bagels & Bingo — Flossmoor Public Library",
    area: "Flossmoor",
    note: "Exactly what the name says: bagels and bingo on Sunday mornings. Free, and come as you are.",
    sourceUrl: "https://www.flossmoorlibrary.org/programs/",
  },
  {
    name: "Senior Bingo & Chair Yoga — Steger-South Chicago Heights Library",
    area: "Steger",
    note: "Coffee and refreshments at Thursday bingo, then chair yoga right after. You get a snack and a stretch in one morning. Free.",
    sourceUrl: "https://engagedpatrons.org/Events.cfm?SiteID=3325",
  },
  {
    name: "Berkeley Public Library — Monday Bingo",
    area: "Berkeley",
    note: "Light refreshments come with the free weekly bingo session.",
    sourceUrl: "https://www.berkeleypl.org",
  },
  {
    name: "Donut Bingo — Villa Park Recreation Center",
    area: "Villa Park",
    note: "This one is part of the center's low-cost 60+ lineup, not a standalone free event. But the name says it all.",
    sourceUrl: "https://www.invillapark.com/284/Adults-Seniors",
  },
];

const FREE_LUNCH: Example[] = [
  {
    name: "Maine Township MaineStreamers",
    area: "Park Ridge",
    note: "A free social club for residents 55+, with monthly luncheons included in the membership.",
    sourceUrl: "https://mainetown.com/departments/mainestreamers/index.php",
  },
  {
    name: "Manhattan Senior Luncheons",
    area: "Manhattan",
    note: "A free lunch every quarter with refreshments and a guest speaker. The village, township, and park district run it together.",
    sourceUrl: "https://villageofmanhattan.org/residents/households/senior_services/luncheons.php",
  },
  {
    name: "Gurnee Park District Monthly Mixer (55+)",
    area: "Gurnee",
    note: "A free catered lunch with live entertainment and themed parties -- a Hawaiian beach party, Oktoberfest, holidays. It's the best lunch invitation in Lake County.",
    sourceUrl: "https://www.gurneeparkdistrict.com/tag/monthly-mixer/",
  },
  {
    name: "Golden Ager Meetings — Jones Center",
    area: "Chicago Heights",
    note: "Doors open at 10am and lunch is served at 11:30. It's a free social luncheon built around fellowship.",
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

        <figure className="mt-6 -mx-4 overflow-hidden rounded-card sm:-mx-6">
          <Image
            src={POST.heroImage}
            alt="Coffee mugs and pastries on a table at a senior social program, with a bingo card blurred in the background"
            width={1448}
            height={1086}
            priority
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>

        <p className="mt-6 text-xl leading-relaxed text-ink">
          Let&apos;s be honest: &quot;there will be coffee&quot; has gotten more people out the door than any
          flyer ever written.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-ink">
          It sounds like a small thing to build a directory around. It isn&apos;t. We went through all{" "}
          {totalListings} listings in our directory looking for one detail: does this program mention
          something to eat or drink? We didn&apos;t count formal meal-assistance services. We were looking
          for the real coffee, snack, or lunch you get just for showing up.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-ink">
          The answer surprised us. <strong>{totalPerk} listings</strong> mention food or drink. That&apos;s
          about <strong>1 in {Math.round(totalListings / totalPerk)}</strong>.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-ink">They fall into two groups:</p>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          <strong>{freeCount} are completely free.</strong> The coffee, snack, or meal is just part of the
          deal.
          <br />
          <strong>{lowCostCount} are low-cost</strong>, usually $1 to $15, with food included in the fee.
          Think a $1 &quot;Coffee&apos;s On&quot; morning, or a $10 lunch-and-bingo where the lunch is
          covered.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-ink">
          Here are the ones worth knowing by name, grouped by what you&apos;re really going for.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">☕ Actual Coffee Clubs</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          These programs exist for the coffee and the conversation. The coffee isn&apos;t an afterthought in
          the corner of some other event.
        </p>

        <figure className="mt-6 -mx-4 overflow-hidden rounded-card sm:-mx-6">
          <Image
            src="/blog/free-coffee-or-food-library.png"
            alt="A library reading room with armchairs and a coffee and tea service on a side table"
            width={1448}
            height={1086}
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>

        <div className="mt-6 flex flex-col gap-4">
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

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">🎱 Bingo, But Make It Brunch</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          Bingo is already the most common free activity in our directory. A surprising number of bingo
          programs add something to eat.
        </p>

        <figure className="mt-6 -mx-4 overflow-hidden rounded-card sm:-mx-6">
          <Image
            src="/blog/free-coffee-or-food-bingo.png"
            alt="Bingo cards, daubers, and coffee next to a plate of bagels and donuts on a table"
            width={1448}
            height={1086}
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>

        <div className="mt-6 flex flex-col gap-4">
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

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">🍦 The Ice Cream Social Isn&apos;t Dead</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">It just moved to the park district community room.</p>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          The Marengo Society for Historic Preservation hosts a free Ice Cream Social every year. The senior
          centers at Wood Dale Park District and Northbrook Park District both hold seasonal ice cream
          socials as part of their low-cost 55+ programs.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">🍽️ A Free Lunch, Really Free</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          These aren&apos;t donation-based meal programs. They&apos;re free social clubs, and a real lunch
          comes with membership.
        </p>

        <figure className="mt-6 -mx-4 overflow-hidden rounded-card sm:-mx-6">
          <Image
            src="/blog/free-coffee-or-food-lunch.png"
            alt="A long table set for a festive senior luncheon, with pretzels, flowers, and drinks"
            width={1448}
            height={1086}
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>

        <div className="mt-6 flex flex-col gap-4">
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
          🏙️ The Big One: Chicago&apos;s Golden Diners Network
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">This one is too big to lump in with the rest.</p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          The City of Chicago runs a donation-based lunch program called Golden Diners at its senior
          centers. We found it at <strong>{goldenDinersCount} different DFSS satellite and regional senior
          centers</strong> across the city, from Austin to South Chicago to Edgewater. It includes a
          suggested-donation lunch and social time. It&apos;s a fixture all over the city, and most people
          outside the network have probably never heard its name.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">⚠️ One Honest Caveat</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Refreshments at drop-in programs can change with the season, depend on a grant, or rely on
          whichever volunteer is available that month. If a library newsletter mentioned &quot;coffee and
          treats&quot; this spring, that&apos;s a good sign, not a guarantee.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          If the food is the whole reason you&apos;re going, call ahead. The same rule applies to everything
          in this directory: we checked each listing against the program&apos;s own source, but things
          change. Confirm before you drive across town for the donuts.
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
