import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { breadcrumbSchema, articleSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BLOG_POSTS } from "@/lib/blog";

const POST = BLOG_POSTS.find((p) => p.slug === "pickleball-and-food-chicagoland")!;

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

type Venue = {
  name: string;
  area: string;
  blurb: string;
  pickleball: string;
  foodAndDrink: string;
  seniorNote: string;
  sourceUrl: string;
};

const VENUES: Venue[] = [
  {
    name: "Pickle Haus",
    area: "Algonquin (McHenry County)",
    blurb:
      "The full-package option, and the reason to make the drive northwest. The food is the differentiator here.",
    pickleball: "12 indoor courts inside a 40,000-square-foot space, plus two golf simulators and an outdoor patio.",
    foodAndDrink:
      "Its restaurant, Erne's Restaurant & Bar, was deliberately rebranded to signal that it's a destination in its own right, not an afterthought -- think a proper \"polished casual\" dinner, pizza and cocktails included, rather than reheated bar snacks.",
    seniorNote: "No named 50+ program or senior discount as of this research.",
    sourceUrl: "https://picklehaus.com/",
  },
  {
    name: "SPF",
    area: "Lincoln Park, Chicago",
    blurb:
      "The city's biggest, and the most fun to hang around in even if you never pick up a paddle.",
    pickleball:
      "8 indoor courts packed into a 42,000-square-foot former climbing gym, styled like a year-round beach getaway -- palm fronds, cabanas, glow-in-the-dark night play.",
    foodAndDrink:
      "Two full cocktail bars, an all-day café pouring Chicago's own Kikwetu Coffee, and a kitchen built with the founders of Honey Butter Fried Chicken. Walk-in admission and parking are free, so you can wander in just to eat and watch.",
    seniorNote: "No named 50+ program or senior discount as of this research.",
    sourceUrl: "https://playspf.com/",
  },
  {
    name: "Big City Pickle",
    area: "Fulton Market & around Chicago (seasonal, outdoor)",
    blurb: "The lively, warm-weather option -- and the one to set expectations on.",
    pickleball:
      "Primarily an outdoor, seasonal operation from the team behind Chicago Sport & Social Club, with courts popping up across Fulton Market, the Gold Coast, Lincoln Yards, and the South Loop. The Fulton Market lot, right near the Green Line, is the flagship.",
    foodAndDrink:
      "Cocktails served on-site, with food trucks and caterers rolling in for events. A genuinely good time -- but a seasonal scene with pop-up food and drink, not a year-round restaurant like the two above. Best in summer, paddle in one hand, drink in the other.",
    seniorNote: "No named 50+ program or senior discount as of this research.",
    sourceUrl: "https://www.chicagocitypickle.com/",
  },
];

export default function PickleballAndFoodPost() {
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
            alt="Indoor pickleball courts with a full bar and lounge area visible in the background"
            width={1672}
            height={941}
            priority
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>

        <p className="mt-6 text-xl leading-relaxed text-ink">
          Pickleball has been the country&apos;s fastest-growing sport for years now, and the business
          chasing it is just as of-the-moment: build the courts, then wrap a real kitchen and bar around
          them so nobody has to leave when the game&apos;s over. The industry even has a name for it --
          &quot;eatertainment.&quot; The chain most people picture, Chicken N Pickle, has no Chicago-area
          location. Chicagoland went and built its own answer anyway.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-ink">
          We went looking for every local venue that pairs real pickleball courts with a real place to eat
          and drink -- not a vending machine in the corner. Three cleared the bar, in different ways. And
          for the record, we also hunted for the version we most wanted to find -- a brewery that bolted on
          a few courts -- and came up empty. Breweries and pickleball courts are all over Chicagoland; they
          just haven&apos;t merged yet. (If you know of one, tell us.)
        </p>

        <p className="mt-5 text-lg leading-relaxed text-ink">
          One note up front on pricing: none of the three has a named 50+ program or senior discount. These
          are general-audience venues, not directory listings -- so if age-specific pricing is what you
          need, skip to the free options at the bottom.
        </p>

        <figure className="mt-6 -mx-4 overflow-hidden rounded-card sm:-mx-6">
          <Image
            src="/blog/pickleball-and-food-chicagoland-table.png"
            alt="A cocktail and a plated dinner on a table, with a pickleball court visible in the background"
            width={1448}
            height={1086}
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>

        <div className="mt-8 flex flex-col gap-6">
          {VENUES.map((v) => (
            <div key={v.name}>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink">
                {v.name} — {v.area}
              </h2>
              <p className="mt-2 text-lg leading-relaxed text-ink">{v.blurb}</p>

              <div className="mt-4 rounded-card bg-card p-5 shadow-sm ring-1 ring-black/5">
                <dl className="flex flex-col gap-3 text-base text-ink">
                  <div>
                    <dt className="font-semibold">Pickleball</dt>
                    <dd className="mt-0.5 text-ink-muted">{v.pickleball}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Food &amp; drink</dt>
                    <dd className="mt-0.5 text-ink-muted">{v.foodAndDrink}</dd>
                  </div>
                </dl>

                <div className="mt-3 rounded-card bg-flag-blue-tint px-4 py-3 text-sm text-flag-blue-ink">
                  {v.seniorNote}
                </div>

                <div className="mt-4">
                  <a
                    href={v.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center rounded-pill border-2 border-flag-blue-ink px-5 text-base font-bold text-flag-blue-ink no-underline"
                  >
                    Visit site →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">If you just want to play — for free</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          None of this replaces the free option. Dozens of park districts across Chicagoland run open
          pickleball courts and 50+-friendly sessions at no cost. See our{" "}
          <Link
            href="/activities/pickleball-for-seniors"
            className="font-semibold text-flag-blue-ink no-underline hover:underline"
          >
            Pickleball for Seniors
          </Link>{" "}
          collection for those, or our full{" "}
          <Link
            href="/guides/pickleball-facilities"
            className="font-semibold text-flag-blue-ink no-underline hover:underline"
          >
            Indoor Pickleball Facilities
          </Link>{" "}
          guide for every commercial club we&apos;ve verified -- food and drink or not.
        </p>
      </article>

      <section className="mt-14 border-t border-flag-blue-tint-2 pt-8">
        <h2 className="text-xl font-bold text-ink">More ways to stay active</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/guides/pickleball-facilities"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Indoor Pickleball Facilities →</span>
            <span className="text-base text-ink-muted">Every commercial club we&apos;ve verified</span>
          </Link>
          <Link
            href="/activities/pickleball-for-seniors"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Pickleball for Seniors →</span>
            <span className="text-base text-ink-muted">Free park-district courts, county by county</span>
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
