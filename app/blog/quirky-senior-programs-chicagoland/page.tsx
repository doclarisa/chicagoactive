import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, articleSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BLOG_POSTS } from "@/lib/blog";

const POST = BLOG_POSTS.find((p) => p.slug === "quirky-senior-programs-chicagoland")!;

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

type Example = { name: string; area: string; note: string; sourceUrl: string };

const FROM_OUR_DIRECTORY: Example[] = [
  {
    name: "Stix & Kix Drum Cardio — Chicago Ridge Park District",
    area: "Chicago Ridge",
    note: "A drum-based cardio class, part of the district's Actively Aging series alongside Music Bingo and Silver Sneakers. Not a drum circle exactly -- a full cardio workout built around a drum.",
    sourceUrl: "https://chicagoridgeparks.com/seniors/",
  },
  {
    name: "Dungeons & Dragons and Magic: The Gathering — Oswego Public Library",
    area: "Oswego",
    note: "Standing adult clubs on Saturday afternoons -- D&D at one campus, Magic: The Gathering meeting the same time and place. Open to all adults, popular with older patrons who never had the chance to play growing up.",
    sourceUrl: "https://www.oswego.lib.il.us/services/adult",
  },
  {
    name: "Improv for Adults — River Forest Park District",
    area: "River Forest",
    note: "Part of the district's Adult Variety Programs, alongside three-level Bridge and a Basic Photography for DSLR Cameras class. Exactly the kind of thing you wouldn't think to search for.",
    sourceUrl: "https://rfparks.com/adult-variety",
  },
  {
    name: "Themed Escape Room — Itasca Historical Depot Museum",
    area: "Itasca",
    note: "A restored 1873 train depot and 1939 Milwaukee Road caboose, with WWII memorabilia, antique dolls -- and a themed escape room built into the museum. Free, open Tuesday and Thursday.",
    sourceUrl: "https://www.itascaparkdistrict.com/171/Itasca-Historical-Depot-Museum",
  },
  {
    name: "Oak Park Society of Model Engineers discount — Park District of Oak Park",
    area: "Oak Park",
    note: "The district's Lifelong Learning membership (50+) includes a discounted membership to the local model-train and model-engineering society -- a genuinely deep-cut hobby perk buried in an otherwise ordinary senior program list.",
    sourceUrl: "https://pdop.org/programs/lifelong-learning/",
  },
  {
    name: "Weekend Weaving & Spinning Demonstrations — Graue Mill and Museum",
    area: "Oak Brook",
    note: "A restored 1852 water-powered gristmill on Salt Creek, where historical interpreters demonstrate milling, spinning, and weaving every Saturday and Sunday afternoon. Free admission.",
    sourceUrl: "https://www.dupageforest.org/graue-mill",
  },
  {
    name: "Chess Club (Illinois Chess Association-affiliated) — Itasca Community Library",
    area: "Itasca",
    note: "A real, tournament-affiliated chess club, alongside \"Crafters Anonymous\" and free notary/passport services -- one of the more unexpected library adult-services lineups we've found.",
    sourceUrl: "https://www.itascalibrary.org/services/",
  },
  {
    name: "South Suburban Genealogical & Historical Society",
    area: "Hazel Crest",
    note: "A volunteer-run research library with 15,000+ volumes, genealogy classes -- and a cemetery photo service. Free and open to the public, no visitor fee.",
    sourceUrl: "https://ssghs.org/contact/",
  },
];

const WENT_LOOKING_FOR: Example[] = [
  {
    name: "The Hix Bros Ukulele Band",
    area: "Naperville",
    note: "Mostly-over-65 musicians who rehearse weekly at the Musical Expressions school and have played retirement centers, libraries, festivals, and fundraisers for 15 years. Started by Peter Hix of the old Hix Bros Music store in Aurora; his brother Carl, 70, leads it now. \"None of these people knew each other before this whole thing started,\" Carl told the Sun-Times, \"and when our little class is over, you can hear them talking and talking some more.\"",
    sourceUrl: "https://chicago.suntimes.com/2024/1/27/24050672/hix-bros-ukulele-band-brings-joy-friendship-older-adults",
  },
  {
    name: "Death Café — Evanston Public Library",
    area: "Evanston",
    note: "A real, recurring monthly discussion group -- third Monday of the month, 6:30-8pm at the Robert Crown Community Center, sponsored by the library and led by the Chicago Death Doula Collective. It's cake, tea, and open conversation about mortality, not a grief-support group. Schaumburg Township District Library and Plainfield Public Library run their own versions too -- this is a real regional pattern, not a one-off.",
    sourceUrl: "https://evanston.libnet.info/event/8441934",
  },
  {
    name: "Drum City Community Drum Circle — Chicago Park District",
    area: "Multiple Chicago parks",
    note: "A free, all-ages community drum circle run by Rhythm Evolution NFP at Chicago Park District locations like Green Briar and Maplewood Playlot Park. No experience necessary; bring your own drum or use theirs. If you want the granddaddy version, the 63rd Street Beach drum circle has met on the South Side almost every night for 40 years running.",
    sourceUrl: "https://mychimyfuture.org/workshop-detail?id=205192",
  },
  {
    name: "Chicago Bird Alliance weekly walks + DuPage Birding Club",
    area: "Regionwide",
    note: "Chicago Bird Alliance (formerly Chicago Audubon Society) leads free Saturday-morning bird walks at Wooded Island and North Park Nature Center, beginners explicitly welcomed. DuPage Birding Club runs over 100 field trips a year plus casual \"Birding and Breakfast\" outings -- no experience required for either.",
    sourceUrl: "https://chicagobirdalliance.org/bird-walks-list",
  },
];

export default function QuirkySeniorProgramsPost() {
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
          Most of what fills a senior center calendar is, honestly, the same handful of things: bingo,
          pinochle, chair yoga, a card room. All genuinely good -- we&apos;ve written plenty about them. But
          buried in the same program guides, next to the bingo and the bridge, are the things nobody expects:
          a drum-cardio class, a themed escape room in a train depot museum, a chess club affiliated with the
          state chess association. And once we went looking specifically for the stuff that&apos;s <em>too</em>{" "}
          niche to show up in a normal directory search -- ukulele bands, death cafés, drum circles, bird
          walks -- Chicagoland had real answers for all of it.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">Straight from our own directory</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          These are real listings already in our directory -- verified, sourced, and easy to overlook because
          they&apos;re one line inside a much longer program list.
        </p>
        <div className="mt-6 flex flex-col gap-4">
          {FROM_OUR_DIRECTORY.map((e) => (
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

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">The ones we went looking for</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          Ukulele circles, death cafés, drum groups, birding walks -- none of these showed up in our own
          directory yet, so we went and checked whether Chicagoland actually has them. It does. These are
          general-audience programs, not senior-exclusive services, but every one of them is genuinely
          popular with -- or built specifically for -- older adults.
        </p>
        <div className="mt-6 flex flex-col gap-4">
          {WENT_LOOKING_FOR.map((e) => (
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

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">One honest note</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          The programs in the second group aren&apos;t run by senior centers, so they won&apos;t have a
          50+ discount or an official senior program name -- you&apos;re just as welcome at 30 as at 70. That&apos;s
          sort of the point: the hidden-gem stuff tends to live outside the senior-services system entirely,
          in a library newsletter or a park district events page nobody thought to cross-reference. If you
          know of a genuinely weird, wonderful program we&apos;ve missed -- in either category -- tell us.
          That&apos;s exactly how this list grows.
        </p>
      </article>

      <section className="mt-14 border-t border-flag-blue-tint-2 pt-8">
        <h2 className="text-xl font-bold text-ink">More from the directory</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/category/arts-culture"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Arts &amp; Culture →</span>
            <span className="text-base text-ink-muted">Museums, historical societies, and more</span>
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
