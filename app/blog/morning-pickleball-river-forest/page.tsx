import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { breadcrumbSchema, articleSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BLOG_POSTS } from "@/lib/blog";

const POST = BLOG_POSTS.find((p) => p.slug === "morning-pickleball-river-forest")!;

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

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-flag-blue-ink underline"
    >
      {children}
    </a>
  );
}

function Photo({
  src,
  alt,
  width,
  height,
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}) {
  return (
    <figure className="mt-6 -mx-4 overflow-hidden rounded-card sm:-mx-6">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="h-auto w-full object-cover"
        sizes="(min-width: 672px) 672px, 100vw"
      />
    </figure>
  );
}

const H2 = "mt-10 text-2xl font-extrabold tracking-tight text-ink";
const H3 = "mt-8 text-xl font-bold text-ink";
const P = "mt-4 text-lg leading-relaxed text-ink";
const UL = "mt-4 flex flex-col gap-2 text-lg text-ink";

const IMG = "/blog/morning-pickleball-river-forest";

function TallPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="mx-auto mt-6 max-w-sm overflow-hidden rounded-card">
      <Image
        src={src}
        alt={alt}
        width={899}
        height={1600}
        className="h-auto w-full object-cover"
        sizes="(min-width: 384px) 384px, 100vw"
      />
    </figure>
  );
}

export default function MorningPickleballPost() {
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

        <Photo
          src={POST.heroImage}
          alt="Players at the net on the blue outdoor pickleball courts in River Forest, with autumn trees behind the fence"
          width={1600}
          height={1200}
          priority
        />

        <p className="mt-6 text-xl leading-relaxed text-ink">
          If you pass the River Forest Park District courts early in the morning, you&apos;ll probably
          hear us before you see us. The pop of the paddles. Someone calling the score. And laughter — a
          lot of laughter.
        </p>
        <p className="mt-5 text-lg leading-relaxed text-ink">
          I started playing pickleball about two years ago. Some of my friends on the courts have been
          playing much longer. Most of us are seniors, and for a couple of hours in the morning, none of
          us are in a hurry to be anywhere else.
        </p>

        <h2 className={H2}>How Our Mornings Work</h2>
        <p className={P}>
          In summer, we start around <strong>7 a.m.</strong> In the fall, when the mornings turn darker
          and cooler, we start around <strong>7:30</strong>. We play outside on the River Forest Park
          District courts whenever the weather lets us. When it rains or gets too cold, we move indoors
          to the <strong>CRC — the Community Recreation Center in Oak Park</strong>.
        </p>
        <p className={P}>
          We play — but the playing is only half of it. We talk between games. We tease each other about
          missed shots. We laugh at ourselves. Somebody always has a story, and the coffee talk
          afterward is part of the ritual too.
        </p>

        <Photo
          src={`${IMG}-forehand.jpg`}
          alt="Four players pausing near the net between points on the River Forest courts"
          width={1600}
          height={1200}
        />

        <h2 className={H2}>I Don&apos;t Make It Every Time — and That&apos;s Okay</h2>
        <p className={P}>
          I&apos;m a caregiver for my mother. Some mornings she has appointments, or my day is simply too
          full, and I can&apos;t go. But whenever I&apos;m free, I&apos;m there.
        </p>
        <TallPhoto
          src={`${IMG}-mom-and-dog.jpg`}
          alt="The author's mother waving from a leaf-covered sidewalk on an autumn walk with the family dog"
        />
        <p className={P}>
          That&apos;s one of the things I love most about this group: nobody keeps score of who showed
          up. When you come back, you&apos;re simply welcomed back. For anyone juggling caregiving, work,
          or grandkids, a group like this fits into real life.
        </p>

        <Photo
          src={`${IMG}-between-games.jpg`}
          alt="A player in a turquoise sweater hitting a forehand on the River Forest courts"
          width={1600}
          height={1200}
        />

        <h2 className={H2}>More Than a Game</h2>
        <p className={P}>
          When I started, I thought I was joining a pickleball group. What I really joined was a group of
          friends.
        </p>
        <p className={P}>
          Little by little, we got to know each other. When something good happens in someone&apos;s
          life, we&apos;re all happy for them. When something bad happens, we feel it too. And when
          someone is going through a difficult time, we try to help them get through it.
        </p>
        <p className={P}>
          You can&apos;t plan a friendship like that. It grows one morning at a time — between games and
          over coffee.
        </p>

        <TallPhoto
          src={`${IMG}-friends.jpg`}
          alt="Two friends hugging and laughing on the court, paddles in hand"
        />

        <h2 className={H2}>Our Halloween Night at Robert&apos;s Westside</h2>
        <p className={P}>
          This fall, the group took the friendship off the courts. We went to a Halloween party together
          at <strong>Robert&apos;s Westside</strong>, a bar and music venue in Forest Park — and yes, we
          dressed up.
        </p>
        <p className={P}>
          We had a pirate (with a parrot on his shoulder), a fortune teller in a head scarf and layers of
          beads, an artist in a giant curly wig and a paint-splattered apron, an elegant lady in
          head-to-toe black, a cowboy with a bandana, and — my favorite for a pickleball crowd — someone
          who came as a golf ball.
        </p>
        <p className={P}>
          Seeing everyone in costume, laughing just as hard as we do at 7:30 in the morning, reminded me
          that this group isn&apos;t really about pickleball. It&apos;s about each other.
        </p>

        <Photo
          src={`${IMG}-halloween-group.jpg`}
          alt="The pickleball group in Halloween costumes at Robert's Westside in Forest Park, laughing together"
          width={1600}
          height={902}
        />
        <TallPhoto
          src={`${IMG}-halloween-trio.jpg`}
          alt="A pirate, a fortune teller, and an artist from the group posing together at the Halloween party"
        />

        <h2 className={H2}>Why I&apos;d Tell Anyone Over 50 to Try It</h2>
        <ul className={UL}>
          <li>
            <strong>You don&apos;t need to be good.</strong> We all started somewhere.
          </li>
          <li>
            <strong>It&apos;s social from day one.</strong> Pickleball is usually played as doubles —
            you&apos;re never alone on the court.
          </li>
          <li>
            <strong>It fits a busy life.</strong> Come when you can.
          </li>
          <li>
            <strong>Morning play sets up your whole day.</strong> You&apos;re outside, moving, and
            laughing before most people finish breakfast.
          </li>
          <li>
            <strong>The friendships are the real prize.</strong>
          </li>
        </ul>
        <p className={P}>
          <strong>Want to try it?</strong> Check the River Forest Park District and the Park District of
          Oak Park for open play times and beginner sessions, or start with our{" "}
          <Link href="/guides/pickleball-facilities" className="font-semibold text-flag-blue-ink no-underline hover:underline">
            pickleball facilities guide
          </Link>
          .
        </p>

        <h2 className={H2}>The Bottom Line</h2>
        <p className="mt-4 text-2xl font-bold leading-relaxed text-ink">
          Come for the pickleball. Stay for the people.
        </p>
      </article>

      <section className="mt-14 border-t border-flag-blue-tint-2 pt-8">
        <h2 className="text-xl font-bold text-ink">Keep exploring</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/city/river-forest"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">River Forest programs →</span>
            <span className="text-base text-ink-muted">Senior programs and activities in River Forest</span>
          </Link>
          <Link
            href="/blog/pickleball-and-food-chicagoland"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Pickleball + a good meal →</span>
            <span className="text-base text-ink-muted">Where to play and eat afterward in Chicagoland</span>
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
