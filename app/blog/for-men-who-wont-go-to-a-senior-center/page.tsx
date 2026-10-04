import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { breadcrumbSchema, articleSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BLOG_POSTS } from "@/lib/blog";

const POST = BLOG_POSTS.find((p) => p.slug === "for-men-who-wont-go-to-a-senior-center")!;

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

type Entry = {
  name: string;
  area: string;
  note: string;
  sourceUrl: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
};

const ENTRIES: Entry[] = [
  {
    name: "♟️ A Chess Club With Real Tournament Credentials",
    area: "Itasca Community Library · Itasca",
    note: "Not a casual board-game night — this club is affiliated with the Illinois Chess Association. Same building also runs \"Crafters Anonymous\" and free notary/passport services, which tells you something about how much is buried in a library newsletter nobody reads cover to cover.",
    sourceUrl: "https://www.itascalibrary.org/services/",
    image: "/blog/quirky-programs-chess.png",
    imageAlt: "Two older men facing off over a chessboard, one resting his chin on his fist in concentration",
    imageWidth: 1536,
    imageHeight: 1024,
  },
  {
    name: "🚂 A Model-Train Club, Discounted",
    area: "Park District of Oak Park · Oak Park",
    note: "The Lifelong Learning membership (50+) comes with a discounted membership to the Oak Park Society of Model Engineers — the local model-railroad club. It's one line in an otherwise ordinary senior-program list, easy to scroll right past.",
    sourceUrl: "https://pdop.org/programs/lifelong-learning/",
    image: "/blog/quirky-programs-model-train.png",
    imageAlt: "An older man with magnifying glasses carefully placing a tiny tree on an elaborate model railroad layout",
    imageWidth: 1536,
    imageHeight: 1024,
  },
  {
    name: "🐉 Dungeons & Dragons and Magic: The Gathering",
    area: "Oswego Public Library · Oswego",
    note: "Standing adult clubs for both games, Saturday afternoons. Open to any adult, and popular with older guys who never got a table growing up and finally have the time now. Nobody's going to make you talk about your feelings — you're just going to roll for initiative.",
    sourceUrl: "https://www.oswego.lib.il.us/services/adult",
    image: "/blog/quirky-programs-dnd.png",
    imageAlt: "An older man with a gray beard leaning over a tabletop covered in dice, character sheets, and miniatures",
    imageWidth: 1536,
    imageHeight: 1024,
  },
  {
    name: "🔍 A Genealogy Library With 15,000 Volumes",
    area: "South Suburban Genealogical & Historical Society · Hazel Crest",
    note: "A volunteer-run research library covering southern Cook and eastern Will County, with research help, genealogy classes, and a cemetery photo service. Free, open to the public, no appointment required. If you've been meaning to actually trace the family name, this is where you start.",
    sourceUrl: "https://ssghs.org/contact/",
    image: "/blog/quirky-programs-genealogy.png",
    imageAlt: "A senior woman at a library table with an old family photo album open next to a laptop showing a family tree",
    imageWidth: 1536,
    imageHeight: 1024,
  },
  {
    name: "🥁 A Workout Disguised as a Drum Class",
    area: "Stix & Kix at Chicago Ridge Park District · Chicago Ridge",
    note: "Skip the word \"exercise\" and this sells itself: a full cardio workout built around hitting a drum, loud and sweaty on purpose. It runs alongside the district's Music Bingo and Silver Sneakers classes, but it isn't a gentle sit-and-sway drum circle — it's a workout that happens to use drumsticks instead of dumbbells.",
    sourceUrl: "https://chicagoridgeparks.com/seniors/",
    image: "/blog/quirky-programs-drum-cardio.png",
    imageAlt: "A row of seniors on exercise balls, drumsticks raised in sync, smiling mid-class",
    imageWidth: 1448,
    imageHeight: 1086,
  },
  {
    name: "🪚 A Real Woodshop and Maker Space",
    area: "Rolling Meadows Adult Activity Center · Rolling Meadows",
    note: "This used to just be called the Senior Center, and the rebrand tells you something. Membership gets you a fully-equipped woodshop (open weekday mornings, plus one Saturday a month) and a maker-space Learning Lab — the kind of hands-on access most guys assume you need your own garage for.",
    sourceUrl: "https://rmparks.org/adult-activity-center",
    image: undefined,
  },
  {
    name: "♠️ A Free Drop-In Poker Club, No Sign-Up",
    area: "Norridge Park District · Norridge",
    note: "Poker Club runs Tuesdays and Thursdays, free, no registration, no commitment — just show up. The same weekday lineup has a Pinochle tournament and Mahjong, but poker's the one that doesn't sound like a senior center activity at all.",
    sourceUrl: "https://www.norridgepk.com/programs/senior",
    image: undefined,
  },
  {
    name: "⛳🎳 A Golf League and a Bowling League",
    area: "Westmont Park District · Westmont",
    note: "Most of this center's lineup reads like a typical senior calendar — chair fitness, watercolor, the Sunshine Singers — until you hit the golf league and the bowling league buried in the same program list. Both run as actual competitive leagues, not a one-off outing.",
    sourceUrl: "https://www.westmontparks.org/programs/senior-programs/",
    image: undefined,
  },
];

function EntryCard({ e }: { e: Entry }) {
  return (
    <div className="overflow-hidden rounded-card bg-card shadow-sm ring-1 ring-black/5">
      {e.image && (
        <Image
          src={e.image}
          alt={e.imageAlt ?? ""}
          width={e.imageWidth ?? 1448}
          height={e.imageHeight ?? 1086}
          className="h-auto w-full object-cover"
          sizes="(min-width: 672px) 672px, 100vw"
        />
      )}
      <div className="p-5">
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
    </div>
  );
}

export default function ForMenPost() {
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
            alt="Two older men facing off over a chessboard, one resting his chin on his fist in concentration"
            width={1536}
            height={1024}
            priority
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>

        <p className="mt-6 text-xl leading-relaxed text-ink">
          Nearly one in five men 65 and older now lives alone — 19% in 2023, up from 15% in 1990,
          according to Pew Research Center's analysis of Census data. Over that same stretch, the
          share of older women living alone actually fell. The isolation gap among older men is
          widening, not closing.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-ink">
          Senior centers are one of the main places built to answer that, and research keeps finding
          the same pattern: a peer-reviewed study in the journal <em>Ageing &amp; Society</em> identified
          &quot;the significantly smaller numbers of male clients&quot; as a defining feature of these
          organizations. It's not that the programming is bad. It's that a lot of men will never walk
          through a door with the word &quot;senior&quot; on it, no matter what's happening inside.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-ink">
          So we went back through our own directory and pulled out everything that doesn't read like a
          senior center — chess with real stakes, a model-train club, a tabletop-gaming table, a
          genealogy archive, a drum class that's actually a workout, a woodshop, a free poker table,
          and two competitive leagues. Every one of these already exists in Chicagoland. Most are run
          by the same places — park districts, libraries — as the bingo and chair yoga. They're just
          filed under a different name.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">
          Eight Real Ways In That Don't Say &quot;Senior Center&quot;
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          Each one below is a verified, sourced listing. Click through — none of these require you to
          identify as a senior to show up.
        </p>
        <div className="mt-6 flex flex-col gap-5">
          {ENTRIES.map((e) => (
            <EntryCard key={e.name} e={e} />
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">The Actual Pitch</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          None of these ask you to sign up for &quot;senior programming.&quot; You're signing up for
          chess, or trains, or a woodshop. The social connection happens as a side effect, which is
          exactly how it should work for anyone who'd rather be caught doing something than talking
          about feelings.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Research on male loneliness consistently points to the same fix: it's not that men don't
          want connection, it's that most on-ramps are built around conversation instead of a shared
          activity. Give a guy something to do with his hands — a chessboard, a soldering iron, a
          deck of cards — and the conversation shows up on its own.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Know a park-district woodshop, a Saturday-morning fishing club, or a HAM radio group we
          haven't found yet? Tell us. This list is only as good as what we know to look for.
        </p>
      </article>

      <section className="mt-14 border-t border-flag-blue-tint-2 pt-8">
        <h2 className="text-xl font-bold text-ink">More from the directory</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/blog/quirky-senior-programs-chicagoland"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">The Hidden-Gem List →</span>
            <span className="text-base text-ink-muted">More quirky programs, including a drum circle and an escape room</span>
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
