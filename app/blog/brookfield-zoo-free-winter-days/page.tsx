import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { breadcrumbSchema, articleSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BLOG_POSTS } from "@/lib/blog";

const POST = BLOG_POSTS.find((p) => p.slug === "brookfield-zoo-free-winter-days")!;

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

export default function BrookfieldZooFreeWinterDaysPost() {
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
            alt="A polar bear resting in fresh snow, looking directly at the camera"
            width={1448}
            height={1086}
            priority
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>

        <p className="mt-6 text-xl leading-relaxed text-ink">
          Most people think of the zoo as a summer outing: hot pavement, long lines, strollers
          everywhere. Regulars know a secret. Winter is the best time to go to Brookfield Zoo Chicago —
          and on select days, it&apos;s free.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-ink">
          Every January and February, the zoo opens its gates at no charge. The crowds are gone, the
          paths are quiet, and the cold-weather animals are having the time of their lives. If
          you&apos;re retired and can visit on a weekday, this may be the best free outing in
          Chicagoland.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">
          The Free Days: What We Know
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Here&apos;s how last winter worked, as a reference point — Brookfield Zoo Chicago&apos;s own
          site put it plainly: free admission <strong>every day</strong> from January 5 through
          February 28, 2026, with two exceptions.
        </p>
        <ul className="mt-4 flex flex-col gap-1.5 text-lg text-ink">
          <li>
            <strong>Dates:</strong> January 5 – February 28, 2026
          </li>
          <li>
            <strong>Not free:</strong> January 19 (MLK Day) and February 16 (Presidents&apos; Day)
          </li>
          <li>
            <strong>Hours:</strong> 10 a.m. – 4 p.m.
          </li>
        </ul>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          <strong>Heads up for this winter:</strong> the zoo sets a new free-day schedule every year,
          and it&apos;s typically announced in December. We&apos;ll update this post once the 2026–27
          dates are out. Before you go, always double-check the zoo&apos;s own{" "}
          <a
            href="https://www.brookfieldzoo.org/discounts-and-free-days"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-flag-blue-ink underline"
          >
            Discounts and Free Days page
          </a>
          .
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">
          &quot;Free&quot; Doesn&apos;t Mean Totally Free
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Plan for a couple of costs so nothing surprises you at the gate: parking still costs money
          even on free days, and special exhibits or some indoor attractions charge their own fee.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          <strong>Money-saving tip:</strong> carpool with friends and split the parking. Then it&apos;s
          a free day out for everyone.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">
          Can&apos;t Go on a Free Day? Use Your Library Card
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          This is the best-kept secret in this article. Your library card can get you into the zoo
          free any time of year:
        </p>

        <figure className="mt-6 -mx-4 overflow-hidden rounded-card sm:-mx-6">
          <Image
            src="/blog/brookfield-zoo-free-winter-days-library-pass.png"
            alt="An older woman smiling as a librarian hands her a Zoo Pass card at the library checkout desk"
            width={1536}
            height={1024}
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>

        <ul className="mt-6 flex flex-col gap-3 text-lg text-ink">
          <li>
            <strong>Chicago Public Library — Explore More Illinois:</strong> Chicago residents 18+ with
            a CPL card can reserve a free digital pass covering up to four people&apos;s general
            admission. Reserve online up to three months ahead.
          </li>
          <li>
            <strong>Suburban libraries — Museum Adventure Pass:</strong> many participating suburban
            libraries offer a pass covering two people&apos;s general admission, checked out for 7
            days. Availability varies by library — check{" "}
            <a
              href="https://www.museumadventure.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-flag-blue-ink underline"
            >
              museumadventure.org
            </a>
            .
          </li>
        </ul>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Neither pass covers parking or ticketed attractions like the dolphin show — just general
          admission. Passes are limited and go fast, so reserve early if you&apos;re planning around a
          specific date.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          <strong>One more option:</strong> SNAP/EBT cardholders can get up to four free general-
          admission tickets year-round through the zoo&apos;s Museums for All program — present the
          card plus photo ID at the gate.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">
          Why Winter Is Better (Seriously)
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          <strong>1. You&apos;ll have the place almost to yourself.</strong> No school groups, no
          summer crowds. You can take your time at every exhibit.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          <strong>2. The cold-weather animals love it.</strong> Polar bears, grey seals, and Humboldt
          penguins are at their most playful when it&apos;s cold out.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          <strong>3. There&apos;s plenty to see indoors.</strong> Warm up with the jellyfish, the
          gorillas, and the tamanduas — a small, very charming relative of the anteater.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          <strong>4. It&apos;s real exercise.</strong> A loop around the zoo is a long, easy walk on
          paved paths, with giraffes to stop and look at along the way. That beats laps at the mall.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">
          Tips for a Comfortable Winter Visit
        </h2>
        <ul className="mt-4 flex flex-col gap-2 text-lg text-ink">
          <li>
            <strong>Go early.</strong> Best parking, most active animals. The zoo closes at 4 p.m. in
            winter.
          </li>
          <li>
            <strong>Dress in layers</strong> and wear waterproof shoes with good grip — paths can be
            icy.
          </li>
          <li>
            <strong>Plan indoor breaks.</strong> Alternate between indoor and outdoor exhibits to stay
            warm.
          </li>
          <li>
            <strong>Bring a thermos.</strong> A warm drink in your pocket makes a long walk much nicer.
          </li>
          <li>
            <strong>Ask about mobility help.</strong> If walking long distances is hard, contact the
            zoo before you go about wheelchair or scooter options.
          </li>
        </ul>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">
          Make It a Day: Pair It With Our Directory
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Brookfield is a short drive from several suburbs in our directory. Make a full day of it: a
          morning at the zoo, then lunch, then a nearby library program or senior-center event in the
          afternoon.{" "}
          <Link href="/city/brookfield" className="font-semibold text-flag-blue-ink no-underline hover:underline">
            Browse programs near Brookfield →
          </Link>
        </p>

        <figure className="mt-10 -mx-4 overflow-hidden rounded-card sm:-mx-6">
          <Image
            src="/blog/brookfield-zoo-free-winter-days-group.png"
            alt="Four smiling older adults in winter hats and scarves giving a thumbs-up in front of the snowy Brookfield Zoo entrance"
            width={1448}
            height={1086}
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">One Honest Note</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Free days, hours, and exclusions change every year, and online summaries — including AI
          search answers — sometimes get them wrong. Before you go, check the zoo&apos;s official{" "}
          <a
            href="https://www.brookfieldzoo.org/discounts-and-free-days"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-flag-blue-ink underline"
          >
            Discounts and Free Days page
          </a>{" "}
          or call ahead. It takes two minutes and saves you a wasted trip in the cold.
        </p>
      </article>

      <section className="mt-14 border-t border-flag-blue-tint-2 pt-8">
        <h2 className="text-xl font-bold text-ink">Explore the directory</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/brookfield-zoo-senior-admission"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Brookfield Zoo listing →</span>
            <span className="text-base text-ink-muted">Senior admission, membership, and SNAP details</span>
          </Link>
          <Link
            href="/category/museum-senior-days"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Museum Senior Days →</span>
            <span className="text-base text-ink-muted">More discounts and free days across Chicagoland</span>
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
