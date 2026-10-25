import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { breadcrumbSchema, articleSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BLOG_POSTS } from "@/lib/blog";

const POST = BLOG_POSTS.find((p) => p.slug === "forest-park-casket-races-2026")!;

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

export default function ForestParkCasketRacesPost() {
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
            alt="A Star Wars-themed casket with Obi-Wan, a Stormtrooper, and Princess Leia pushing it down Beloit Avenue, the words STAR WARS painted on the side"
            width={1335}
            height={1922}
            priority
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>

        <p className="mt-6 text-xl leading-relaxed text-ink">
          Some towns celebrate fall with a hayride. <strong>Forest Park races coffins.</strong>
        </p>

        <p className="mt-5 text-lg leading-relaxed text-ink">
          On Saturday, October 24, thousands of costumed spectators lined Beloit Avenue for the{" "}
          <strong>14th annual Forest Park Casket Races</strong>. Teams spent weeks building
          &quot;caskets&quot; on wheels, put one rider inside, and sprinted them down the course while
          the crowd screamed, laughed, and waved. We were there with a camera, and it&apos;s every bit
          as wholesome and ridiculous as it sounds.
        </p>

        <figure className="mt-6 -mx-4 overflow-hidden rounded-card sm:-mx-6">
          <Image
            src="/blog/forest-park-casket-races-2026-crowd.jpg"
            alt="A dense crowd lining both sides of Beloit Avenue, watching a casket team race down the street under fall trees"
            width={2294}
            height={4080}
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
          <figcaption className="bg-flag-blue-tint px-4 py-2 text-sm text-ink-muted sm:px-6">
            Beloit Avenue, packed curb to curb, with phones and real cameras out for every heat.
          </figcaption>
        </figure>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">Why Coffins? Why Forest Park?</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Forest Park is famous for its cemeteries — it&apos;s often said the village has more
          residents underground than above it. Instead of being spooked by that reputation, Forest
          Park embraced it, and the result is a tradition that&apos;s equal parts Halloween parade,
          soapbox derby, and block party.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">How It Works</h2>
        <ul className="mt-4 flex flex-col gap-2 text-lg text-ink">
          <li>
            <strong>The course:</strong> Beloit Avenue, between Madison and Adams Streets
          </li>
          <li>
            <strong>The teams:</strong> A crew of runners pushes, with one rider inside the casket
          </li>
          <li>
            <strong>The parade:</strong> A Parade of Caskets kicks things off before the racing starts
          </li>
          <li>
            <strong>The heats:</strong> Teams race in rounds, with a kids&apos; and pets&apos; costume
            parade in between
          </li>
          <li>
            <strong>The prizes:</strong> Trophies for fastest, creepiest, and funniest, plus the
            beloved &quot;Dead Last&quot; award
          </li>
          <li>
            <strong>The finale:</strong> Trick-or-treating on Madison Street in the afternoon
          </li>
        </ul>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">This Year&apos;s Lineup</h2>

        <p className="mt-4 text-lg leading-relaxed text-ink">
          <strong>⚓ The Shipwreck.</strong> A skeleton perched in a crow&apos;s nest, a palm tree hung
          with skulls, and a mermaid lounging in the casket while a sailor, a scuba diver, and a pirate
          crew pushed. Easily the most elaborate build we saw all day.
        </p>
        <figure className="mt-6 -mx-4 overflow-hidden rounded-card sm:-mx-6">
          <Image
            src="/blog/forest-park-casket-races-2026-shipwreck.jpg"
            alt="A shipwreck-themed casket with a palm tree, hanging skulls, and a mermaid rider, pushed by a pirate crew"
            width={2294}
            height={4080}
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>

        <p className="mt-6 text-lg leading-relaxed text-ink">
          <strong>📚 Forest Park Public Library&apos;s Minions and Gru.</strong> It had to be the
          library. A team in blue overalls and goggles pushed a red bookshelf casket packed with real
          books, Gru riding in the middle waving both arms to the crowd. The library shows up constantly
          in our own directory for its adult programs — turns out it also knows how to build a racing
          coffin.
        </p>
        <figure className="mt-6 -mx-4 overflow-hidden rounded-card sm:-mx-6">
          <Image
            src="/blog/forest-park-casket-races-2026-library.jpg"
            alt="A team in yellow and blue Minion costumes pushing a red bookshelf-shaped casket with a Gru rider waving"
            width={2294}
            height={4080}
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>

        <p className="mt-6 text-lg leading-relaxed text-ink">
          <strong>🐶 Inflatable Dogs.</strong> A pack of giant inflatable puppies — a husky, a golden,
          and a very smiley tan pup — waddled down the street behind a black casket. It&apos;s nearly
          impossible to run in an inflatable suit, and that&apos;s exactly why the crowd loved it.
        </p>
        <figure className="mt-6 -mx-4 overflow-hidden rounded-card sm:-mx-6">
          <Image
            src="/blog/forest-park-casket-races-2026-dogs.jpg"
            alt="A team in giant inflatable dog costumes — a husky, a golden retriever, and a tan pup — pushing a black casket"
            width={2294}
            height={4080}
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>

        <p className="mt-6 text-lg leading-relaxed text-ink">
          <strong>🚂 D91 Schools Rock.</strong> Forest Park&apos;s school district built a bright red,
          blue, and yellow train casket, pushed by a crew in matching caps and red bandanas.
        </p>
        <figure className="mt-6 -mx-4 overflow-hidden rounded-card sm:-mx-6">
          <Image
            src="/blog/forest-park-casket-races-2026-d91.jpg"
            alt="A crew in red bandanas and caps pushing a train-shaped casket painted in red, blue, and yellow reading D91 Schools Rock"
            width={2294}
            height={4080}
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>

        <p className="mt-6 text-lg leading-relaxed text-ink">
          <strong>😊 Mental Health Matters.</strong> One of the most colorful entries was an{" "}
          <em>Inside Out</em>-themed crew — Joy in a blue wig, Envy in green, Anger with a shock of
          orange hair and boxing gloves — pushing a purple casket painted &quot;Mental Health
          Matters.&quot; A genuinely sweet message tucked inside a very silly race.
        </p>
        <figure className="mt-6 -mx-4 overflow-hidden rounded-card sm:-mx-6">
          <Image
            src="/blog/forest-park-casket-races-2026-insideout.jpg"
            alt="A crew dressed as Inside Out characters Joy, Envy, and Anger pushing a purple casket painted Mental Health Matters"
            width={2294}
            height={4080}
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">
          The Costume Parade Steals the Show
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Between heats, the kids&apos; and pets&apos; costume parade takes over the street. Our
          favorite: a sleek greyhound in a shimmering purple dragon costume, working the crowd like it
          knew exactly how good it looked.
        </p>
        <figure className="mt-6 -mx-4 overflow-hidden rounded-card sm:-mx-6">
          <Image
            src="/blog/forest-park-casket-races-2026-greyhound.jpg"
            alt="A greyhound dressed in an iridescent purple dragon costume standing in the street, with a photographer holding a large camera in the foreground"
            width={2294}
            height={4080}
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
          <figcaption className="bg-flag-blue-tint px-4 py-2 text-sm text-ink-muted sm:px-6">
            Plenty of spectators, including more than a few serious cameras, were out capturing every
            moment.
          </figcaption>
        </figure>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">Why Seniors Love This Event</h2>
        <ul className="mt-4 flex flex-col gap-2 text-lg text-ink">
          <li>
            <strong>It&apos;s free.</strong> No tickets, no registration, just show up and watch.
          </li>
          <li>
            <strong>It&apos;s short and sweet.</strong> The whole thing runs about three hours on a
            Saturday morning, so you&apos;re home by lunch or on Madison Street for trick-or-treating.
          </li>
          <li>
            <strong>It&apos;s great with grandkids.</strong> They get candy and costumes; you get a
            front-row seat to the laughs.
          </li>
          <li>
            <strong>Anyone can race.</strong> It&apos;s neighbors and local organizations pushing these
            caskets, not professional athletes — a church group, a walking club, or a senior center
            could absolutely enter a team.
          </li>
          <li>
            <strong>Your library is in on the fun.</strong> The Forest Park Public Library doesn&apos;t
            just run{" "}
            <Link
              href="/forest-park-public-library-adult-services"
              className="font-semibold text-flag-blue-ink no-underline hover:underline"
            >
              book clubs, genealogy help, and tax prep
            </Link>{" "}
            — once a year, it builds a racing coffin.
          </li>
        </ul>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">Tips for Next Year</h2>
        <ul className="mt-4 flex flex-col gap-2 text-lg text-ink">
          <li>
            <strong>Arrive early.</strong> The curb fills fast — bring a folding chair and claim a spot
            along Beloit Avenue before the morning parade.
          </li>
          <li>
            <strong>Dress in layers.</strong> Late October mornings start chilly.
          </li>
          <li>
            <strong>Parking:</strong> use the public lots off Madison Street, following the blue
            &quot;P&quot; signs.
          </li>
          <li>
            <strong>Bring a bag for candy</strong> if grandkids are coming — trick-or-treating on
            Madison Street starts right after the races.
          </li>
          <li>
            <strong>Think about entering a team.</strong> Your walking club or senior center could build
            a casket. Contact the Forest Park Chamber of Commerce for details.
          </li>
        </ul>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">See You Next October</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Forest Park takes its cemeteries seriously, and its fun even more seriously. If you&apos;ve
          never seen a mermaid race down a suburban street in a coffin, put the Casket Races on your
          2027 calendar now.
        </p>
      </article>

      <section className="mt-14 border-t border-flag-blue-tint-2 pt-8">
        <h2 className="text-xl font-bold text-ink">More fall fun near Forest Park</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/blog/halloween-fall-events-chicagoland-october-2026"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Halloween Events in Chicagoland →</span>
            <span className="text-base text-ink-muted">More verified events, most free and open to all ages</span>
          </Link>
          <Link
            href="/city/forest-park"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Things to Do in Forest Park →</span>
            <span className="text-base text-ink-muted">Every listing we&apos;ve verified in town</span>
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
