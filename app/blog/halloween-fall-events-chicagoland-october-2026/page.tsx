import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, articleSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BLOG_POSTS } from "@/lib/blog";

const POST = BLOG_POSTS.find((p) => p.slug === "halloween-fall-events-chicagoland-october-2026")!;

export const metadata: Metadata = {
  title: POST.title,
  description: POST.dek,
  alternates: { canonical: `/blog/${POST.slug}` },
  openGraph: {
    title: POST.title,
    description: POST.dek,
    type: "article",
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

type Entry = {
  name: string;
  area: string;
  when: string;
  cost: string;
  note: string;
  seniorNote?: string;
  sourceUrl: string;
};

const SENIOR_SPECIFIC: Entry[] = [
  {
    name: "🏓 Halloween Pickleball Boo Bash",
    area: "Sheil Community Center Park · Lakeview, Chicago",
    when: "Tuesday, October 27, 9:30am–2pm",
    cost: "$10",
    note: "A costume-optional pickleball tournament just for adults 55+, run by the Chicago Park District. Bring your own paddle or borrow one on-site.",
    sourceUrl: "https://www.chicagoparkdistrict.com/about-us/news/fall-fun-chicago-parks-citywide-family-friendly-events-all-month-long",
  },
  {
    name: "🎃 Halloween Party",
    area: "Grand Crossing Park · Greater Grand Crossing, Chicago",
    when: "Thursday, October 29, 11am–2pm",
    cost: "Free",
    note: "A senior-focused Halloween party in the park, with costumed characters and the usual park-district warmth. No registration mentioned — just show up.",
    sourceUrl: "https://www.chicagoparkdistrict.com/about-us/news/fall-fun-chicago-parks-citywide-family-friendly-events-all-month-long",
  },
  {
    name: "🍿 Halloween Bash",
    area: "Kennedy Park · West Lawn, Chicago",
    when: "Thursday, October 29, 4–7pm",
    cost: "Free",
    note: "Games, contests, candy, prizes, and a Halloween movie with popcorn — a relaxed evening option if the daytime parties don't fit your schedule.",
    sourceUrl: "https://www.chicagoparkdistrict.com/about-us/news/fall-fun-chicago-parks-citywide-family-friendly-events-all-month-long",
  },
];

const OPEN_TO_ALL: Entry[] = [
  {
    name: "🎃 Night of 1,000 Jack-o'-Lanterns",
    area: "Chicago Botanic Garden · Glencoe",
    when: "Select evenings through October 25, 6:30–10:30pm",
    cost: "$20 member / $24 nonmember (timed tickets)",
    note: "More than 1,000 hand-carved pumpkins light up the Garden after dark, including show-stoppers up to 150 pounds, plus live carving and costumed performers.",
    seniorNote: "Flat, paved paths throughout — one of the more genuinely accessible evening events on this list, though it does get crowded on weekends.",
    sourceUrl: "https://www.chicagobotanic.org/halloween",
  },
  {
    name: "🏺 Glass Pumpkin Patch & Fall Color Festival",
    area: "The Morton Arboretum · Lisle",
    when: "Glass Pumpkin Patch: October 9–11. Fall Color Festival events run through October 31.",
    cost: "Included with general admission",
    note: "More than 8,000 hand-blown glass pumpkins on the West Lawn, with live glassblowing demonstrations, alongside the Arboretum's broader fall-color programming.",
    seniorNote: "Wheelchair rentals and multiple paved accessible trails on-site, plus the Acorn Express tram tour for anyone who'd rather ride than walk the grounds.",
    sourceUrl: "https://mortonarb.org/explore/activities/events/glass-pumpkin-patch/",
  },
  {
    name: "🌽 St. Charles Scarecrow Weekend",
    area: "Downtown St. Charles",
    when: "October 9–11, Fri 12–6pm, Sat 10am–6pm, Sun 10am–5pm",
    cost: "Free",
    note: "The 41st annual edition: more than 85 handmade scarecrows line the downtown streets for viewing and voting, alongside vendors and live music.",
    seniorNote: "A flat, walkable downtown river district — easy to cover at any pace, with plenty of benches and places to sit along the way.",
    sourceUrl: "https://www.stcharlesil.gov/News-Events/Copy-of-Scarecrow-Weekend-2026",
  },
  {
    name: "🚙 La Grange Trunk-or-Treat",
    area: "Sedgwick Park · La Grange",
    when: "Saturday, October 10, 10am–12pm",
    cost: "Free",
    note: "A community trunk-or-treat with games and activities — the kind of small, walkable neighborhood event that's as much about seeing your neighbors as it is about candy.",
    sourceUrl: "https://www.visitchicagosouthland.com/halloween-trunk-or-treat-2026-10-24",
  },
  {
    name: "🎭 Arts in the Dark Halloween Parade",
    area: "Columbus Drive, Grant Park · Chicago",
    when: "Saturday, October 24, 6–8pm",
    cost: "Free, no tickets required",
    note: "Chicago's official Halloween parade in its 12th year — giant spectacle puppets, elaborate floats, and performances from local arts groups, drawing a crowd of around 100,000.",
    seniorNote: "A spectator event, not a walking one, so mobility isn't a barrier — but it is genuinely crowded. Arrive early for curb space if standing for a while is a concern.",
    sourceUrl: "https://www.chicagoparkdistrict.com/events/arts-dark-parade-grant",
  },
];

function EntryCard({ e }: { e: Entry }) {
  return (
    <div className="rounded-card bg-card p-5 shadow-sm ring-1 ring-black/5">
      <h3 className="text-lg font-bold text-ink">{e.name}</h3>
      <p className="mt-1 text-sm font-semibold text-ink-muted">{e.area}</p>
      <p className="mt-2 text-base text-ink">
        <strong>{e.when}</strong> · {e.cost}
      </p>
      <p className="mt-2 text-base text-ink-muted">{e.note}</p>
      {e.seniorNote && (
        <p className="mt-2 rounded-card bg-flag-blue-tint px-3 py-2 text-sm text-flag-blue-ink">
          {e.seniorNote}
        </p>
      )}
      <a
        href={e.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-sm font-semibold text-flag-blue-ink no-underline hover:underline"
      >
        Source & details →
      </a>
    </div>
  );
}

export default function HalloweenFallEventsPost() {
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
          Our directory is built around recurring programs — the weekly chair-yoga class, the standing
          Thursday chess club. Halloween doesn&apos;t work that way. It&apos;s one month, a handful of
          dates, and then it&apos;s over for a year. So instead of a permanent category, here&apos;s a
          dated roundup: what&apos;s actually happening across Chicagoland this October, verified
          against each event&apos;s own source.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-ink">
          Most of this isn&apos;t &quot;senior programming&quot; in the usual sense — it&apos;s just
          genuinely open to everyone, including grandparents who want to hand out candy, watch a parade,
          or wander a glowing pumpkin garden. We&apos;ve flagged accessibility where it matters and
          called out the few events built specifically for 55+.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">Built for 55+</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          All three are Chicago Park District events, part of its citywide fall programming.
        </p>
        <div className="mt-6 flex flex-col gap-5">
          {SENIOR_SPECIFIC.map((e) => (
            <EntryCard key={e.name} e={e} />
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">
          Open to Everyone, Worth Going To
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          None of these are senior events specifically — they&apos;re just good, and good to know about.
        </p>
        <div className="mt-6 flex flex-col gap-5">
          {OPEN_TO_ALL.map((e) => (
            <EntryCard key={e.name} e={e} />
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">A Note on Timing</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          This list is current as of {formatDate(POST.publishedDate)}. Some of these events run on a
          single weekend — check the source link before heading out, since hours and dates occasionally
          shift. If you&apos;re reading this well after October 2026, most of these are annual events
          and will likely return next fall, just not necessarily on the same dates.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Know a Halloween or fall event in your town we missed — especially a senior-specific one?{" "}
          <Link href="/about" className="font-semibold text-flag-blue-ink no-underline hover:underline">
            Tell us
          </Link>
          .
        </p>
      </article>

      <section className="mt-14 border-t border-flag-blue-tint-2 pt-8">
        <h2 className="text-xl font-bold text-ink">Explore the directory</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/category/museum-senior-days"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Museum Senior Days →</span>
            <span className="text-base text-ink-muted">Year-round discounts, not just October</span>
          </Link>
          <Link
            href="/directory"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Browse the full directory →</span>
            <span className="text-base text-ink-muted">Every listing, searchable by city and category</span>
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
