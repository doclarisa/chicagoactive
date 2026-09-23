import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { breadcrumbSchema, articleSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BLOG_POSTS } from "@/lib/blog";

const POST = BLOG_POSTS.find((p) => p.slug === "quirky-senior-programs-chicagoland")!;

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

type Example = {
  name: string;
  area: string;
  note: string;
  sourceUrl: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
};

const FROM_OUR_DIRECTORY: Example[] = [
  {
    name: "🥁 Stix & Kix Drum Cardio",
    area: "Chicago Ridge Park District · Chicago Ridge",
    note: "Forget the treadmill. This is a full cardio workout built around a drum. It's part of the district's Actively Aging series, along with Music Bingo and Silver Sneakers. It isn't a drum circle. It's a sweaty, loud, rhythm-driven workout that happens to be very fun.",
    sourceUrl: "https://chicagoridgeparks.com/seniors/",
    image: "/blog/quirky-programs-drum-cardio.png",
    imageAlt: "A row of seniors on exercise balls, drumsticks raised in sync, smiling mid-class",
    imageWidth: 1448,
    imageHeight: 1086,
  },
  {
    name: "🐉 Dungeons & Dragons and Magic: The Gathering",
    area: "Oswego Public Library · Oswego",
    note: "Yes, really. Oswego runs standing adult clubs for both games on Saturday afternoons. They're open to all adults, and they're especially popular with older patrons who never got the chance to play growing up. It's never too late to roll for initiative.",
    sourceUrl: "https://www.oswego.lib.il.us/services/adult",
    image: "/blog/quirky-programs-dnd.png",
    imageAlt: "An older man with a gray beard leaning over a tabletop covered in dice, character sheets, and miniatures",
    imageWidth: 1536,
    imageHeight: 1024,
  },
  {
    name: "🎭 Improv for Adults",
    area: "River Forest Park District · River Forest",
    note: "It sits in the district's Adult Variety Programs next to three-level Bridge and a DSLR photography class. Improv is exactly the kind of thing you'd never think to search for, and it may be the most fun you have all month.",
    sourceUrl: "https://rfparks.com/adult-variety",
    image: "/blog/quirky-programs-improv.png",
    imageAlt: "Two older adults on a small stage mid-scene, one with arms flung wide, the other laughing",
    imageWidth: 1448,
    imageHeight: 1086,
  },
  {
    name: "🚂 A Themed Escape Room Inside a Train Depot",
    area: "Itasca Historical Depot Museum · Itasca",
    note: "Start with a restored 1873 train depot. Add a 1939 Milwaukee Road caboose, WWII memorabilia, and a collection of antique dolls. Then build an escape room into the middle of it. It's free and open Tuesdays and Thursdays. Bring your grandkids and see who cracks the code first.",
    sourceUrl: "https://www.itascaparkdistrict.com/171/Itasca-Historical-Depot-Museum",
    image: "/blog/quirky-programs-escape-room.png",
    imageAlt: "A grandparent and a teen huddled over a padlocked box with a flashlight in a wood-paneled room",
    imageWidth: 1448,
    imageHeight: 1086,
  },
  {
    name: "🛤️ The Model Train Perk Nobody Knows About",
    area: "Park District of Oak Park · Oak Park",
    note: "This is a real deep cut. The Lifelong Learning membership (50+) comes with a discounted membership to the Oak Park Society of Model Engineers, the local model-train club. It's buried in an otherwise ordinary senior program list.",
    sourceUrl: "https://pdop.org/programs/lifelong-learning/",
    image: "/blog/quirky-programs-model-train.png",
    imageAlt: "An older man with magnifying glasses carefully placing a tiny tree on an elaborate model railroad layout",
    imageWidth: 1536,
    imageHeight: 1024,
  },
  {
    name: "🧶 Weaving & Spinning at an 1852 Gristmill",
    area: "Graue Mill and Museum · Oak Brook",
    note: "A water-powered gristmill still stands on Salt Creek. Every Saturday and Sunday afternoon, historical interpreters demonstrate milling, spinning, and weaving the way it was done more than 170 years ago. Admission is free, and it's a peaceful way to spend an afternoon.",
    sourceUrl: "https://www.dupageforest.org/graue-mill",
    image: "/blog/quirky-programs-weaving.png",
    imageAlt: "Weathered hands working a wooden spinning wheel with wool fibers visible in soft window light",
    imageWidth: 1448,
    imageHeight: 1086,
  },
  {
    name: "♟️ A Chess Club With Real Credentials",
    area: "Itasca Community Library · Itasca",
    note: "This isn't a casual board-game night. It's a chess club affiliated with the Illinois Chess Association. The same library also hosts \"Crafters Anonymous\" and offers free notary and passport services, which makes it one of the more unexpected adult lineups we've found.",
    sourceUrl: "https://www.itascalibrary.org/services/",
    image: "/blog/quirky-programs-chess.png",
    imageAlt: "Two older men facing off over a chessboard, one resting his chin on his fist in concentration",
    imageWidth: 1536,
    imageHeight: 1024,
  },
  {
    name: "🔍 Genealogy, 15,000 Books, and a Cemetery Photo Service",
    area: "South Suburban Genealogical & Historical Society · Hazel Crest",
    note: "Volunteers run this research library of more than 15,000 volumes. They teach genealogy classes and offer a cemetery photo service. It's free and open to the public. If you've ever wondered who your great-great-grandmother really was, start here.",
    sourceUrl: "https://ssghs.org/contact/",
    image: "/blog/quirky-programs-genealogy.png",
    imageAlt: "A senior woman at a library table with an old family photo album open next to a laptop showing a family tree",
    imageWidth: 1536,
    imageHeight: 1024,
  },
];

const WENT_LOOKING_FOR: Example[] = [
  {
    name: "🎶 The Hix Bros Ukulele Band",
    area: "Naperville",
    note: "This is the story that won us over. The band is made up mostly of musicians over 65. They rehearse weekly at the Musical Expressions school and have spent 15 years playing retirement centers, libraries, festivals, and fundraisers. Peter Hix, of the old Hix Bros Music store in Aurora, started the band. His brother Carl, 70, leads it now. Carl told the Sun-Times: \"None of these people knew each other before this whole thing started, and when our little class is over, you can hear them talking and talking some more.\" That quote sums up what this whole article is about.",
    sourceUrl: "https://chicago.suntimes.com/2024/1/27/24050672/hix-bros-ukulele-band-brings-joy-friendship-older-adults",
    image: "/blog/quirky-programs-ukulele.png",
    imageAlt: "A group of seniors in Hawaiian shirts strumming ukuleles in a semicircle, mid-song and laughing",
    imageWidth: 1448,
    imageHeight: 1086,
  },
  {
    name: "☕ Death Café",
    area: "Evanston Public Library · Evanston",
    note: "It sounds grim. It isn't. It's cake, tea, and an honest conversation about mortality, which most of us need more often than we admit. It's not a grief-support group. It's a relaxed discussion among curious people. It meets on the third Monday of each month, 6:30 to 8pm, at the Robert Crown Community Center. The library sponsors it, and the Chicago Death Doula Collective leads it. Schaumburg Township District Library and Plainfield Public Library host their own versions, so this is a regional trend, not a one-off.",
    sourceUrl: "https://evanston.libnet.info/event/8441934",
    image: "/blog/quirky-programs-death-cafe.png",
    imageAlt: "A small circle of older adults around a table with teacups and cake, one woman speaking while the others listen",
    imageWidth: 1536,
    imageHeight: 1024,
  },
  {
    name: "🪘 Drum City Community Drum Circle",
    area: "Chicago Park District · Multiple parks",
    note: "Rhythm Evolution NFP runs this free, all-ages drum circle at Chicago Park District spots like Green Briar and Maplewood Playlot Park. You don't need any experience, and you can bring your own drum or borrow one of theirs. If you want the legendary version, try the 63rd Street Beach drum circle. It has met on the South Side almost every night for 40 years.",
    sourceUrl: "https://mychimyfuture.org/workshop-detail?id=205192",
    image: "/blog/quirky-programs-drum-circle.png",
    imageAlt: "An outdoor drum circle at sunset by the lake, with a silver-haired man front and center playing a djembe",
    imageWidth: 1448,
    imageHeight: 1086,
  },
  {
    name: "🐦 Bird Walks: Chicago Bird Alliance and DuPage Birding Club",
    area: "Regionwide",
    note: "The Chicago Bird Alliance (formerly the Chicago Audubon Society) leads free Saturday-morning bird walks at Wooded Island and North Park Nature Center, and beginners are explicitly welcome. The DuPage Birding Club runs more than 100 field trips a year, including casual \"Birding and Breakfast\" outings. Neither group requires experience. All you need is curiosity and comfortable shoes.",
    sourceUrl: "https://chicagobirdalliance.org/bird-walks-list",
  },
];

function ExampleCard({ e }: { e: Example }) {
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

        <figure className="mt-6 -mx-4 overflow-hidden rounded-card sm:-mx-6">
          <Image
            src={POST.heroImage}
            alt="A laughing woman in her 70s with silver hair playing a drum with sticks raised mid-beat in a bright community gym"
            width={1448}
            height={1086}
            priority
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>

        <p className="mt-6 text-xl leading-relaxed text-ink">
          Every senior center calendar has the same greatest hits: bingo, pinochle, chair yoga, the card
          room. They&apos;re popular for a reason, and we&apos;ve written plenty about them.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-ink">
          But read those program guides closely and you&apos;ll find stranger things tucked between the
          bingo and the bridge. There&apos;s a cardio class where you beat on a drum, an escape room inside a
          150-year-old train depot, and a chess club with real tournament credentials.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-ink">
          So we went looking for the stuff too niche to show up in a normal search: ukulele bands, death
          cafés, drum circles, dawn bird walks. We wanted to know if Chicagoland had any of it.
        </p>

        <p className="mt-5 text-xl font-bold leading-relaxed text-ink">It had all of it.</p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">Part 1: Hiding in Plain Sight</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          These are real listings already in our directory. Each one is verified and sourced, and each is
          easy to miss because it&apos;s one line in a long program list.
        </p>
        <div className="mt-6 flex flex-col gap-5">
          {FROM_OUR_DIRECTORY.map((e) => (
            <ExampleCard key={e.name} e={e} />
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">Part 2: The Ones We Went Hunting For</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          None of these were in our directory yet, so we checked whether Chicagoland really has them. It
          does. They&apos;re open to all ages, but each is either very popular with older adults or built
          especially for them.
        </p>
        <div className="mt-6 flex flex-col gap-5">
          {WENT_LOOKING_FOR.map((e) => (
            <ExampleCard key={e.name} e={e} />
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">One Honest Note</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          The programs in Part 2 aren&apos;t run by senior centers. You won&apos;t get a 50+ discount or
          find them under an official senior program name, and you&apos;re as welcome at 30 as you are at
          70.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          That&apos;s kind of the point. The best hidden gems tend to live outside the senior-services
          world, in a library newsletter or a park district events page that nobody thought to check.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Know a weird, wonderful program we&apos;ve missed? Tell us. That&apos;s exactly how this list
          grows.
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
