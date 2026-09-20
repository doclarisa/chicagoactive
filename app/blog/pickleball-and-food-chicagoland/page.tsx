import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, articleSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BLOG_POSTS } from "@/lib/blog";

const POST = BLOG_POSTS.find((p) => p.slug === "pickleball-and-food-chicagoland")!;

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

type Venue = {
  name: string;
  areas: string[];
  pickleball: string;
  foodAndDrink: string;
  seniorNote: string;
  sourceUrl: string;
};

const VENUES: Venue[] = [
  {
    name: "Pickle Haus",
    areas: ["Algonquin (Kane County)"],
    pickleball: "12 indoor courts, plus two golf simulators and an outdoor patio.",
    foodAndDrink:
      "A real restaurant and full bar (\"Erne's Bar\") on site -- reviewers call out the pizza and cocktails specifically, not just bar snacks.",
    seniorNote: "No named senior program or discount as of this research.",
    sourceUrl: "https://picklehaus.com/",
  },
  {
    name: "SPF Pickleball",
    areas: ["Lincoln Park, Chicago", "Avondale/SPF All Day, Chicago"],
    pickleball: "Chicago's largest pickleball facility -- 8 indoor courts across two locations, open play and leagues.",
    foodAndDrink:
      "Two full bars, plus food partnerships with Honey Butter Fried Chicken and Kikwetu Coffee -- a real kitchen partner, not a vending machine.",
    seniorNote: "No named senior program or discount as of this research.",
    sourceUrl: "https://playspf.com/",
  },
  {
    name: "Big City Pickle",
    areas: ["Fulton Market, Chicago", "Gold Coast, Lincoln Yards, South Loop (seasonal outdoor courts)"],
    pickleball: "Indoor courts in Fulton Market, plus seasonal outdoor courts at several other Chicago locations.",
    foodAndDrink:
      "\"The Garden\" at the Fulton Market location has a full bar, picnic tables, and yard games -- worth noting the bar is seasonal, not a year-round fixture.",
    seniorNote: "No named senior program or discount as of this research.",
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

        <p className="mt-6 text-xl leading-relaxed text-ink">
          Pickleball&apos;s been the fastest-growing sport in the country for a few years running, and the
          business model chasing it is just as of-the-moment: build the courts, then build a real kitchen
          and bar around them, so nobody has to leave once the game&apos;s over. Chicken N Pickle -- the
          chain most people picture when they hear the phrase -- doesn&apos;t have a Chicago-area location.
          Chicagoland built its own answer anyway.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-ink">
          We went looking for every Chicagoland venue that pairs real pickleball courts with a real
          restaurant or bar -- not a vending machine in the corner. Three venues cleared that bar. One
          honest note before we get to them: none of the three has a named senior program or discount, so
          if 50+-specific pricing matters to you, these are general-audience venues, not directory listings.
          We also went looking for the more novel version of this idea -- a brewery that added pickleball
          courts -- and came up empty. Breweries and pickleball courts exist all over Chicagoland; they just
          haven&apos;t combined yet.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">The three that qualify</h2>

        <div className="mt-6 flex flex-col gap-5">
          {VENUES.map((v) => (
            <div key={v.name} className="rounded-card bg-card p-5 shadow-sm ring-1 ring-black/5">
              <h3 className="text-lg font-bold text-ink">{v.name}</h3>
              <p className="mt-1 text-sm font-semibold text-ink-muted">{v.areas.join(" · ")}</p>

              <dl className="mt-3 flex flex-col gap-2 text-base text-ink">
                <div>
                  <dt className="inline font-semibold">Pickleball: </dt>
                  <dd className="inline text-ink-muted">{v.pickleball}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold">Food &amp; drink: </dt>
                  <dd className="inline text-ink-muted">{v.foodAndDrink}</dd>
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
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">If you just want to play, free</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          None of this replaces the free option. Dozens of park districts across Chicagoland run open
          pickleball courts and 50+-friendly sessions at no cost -- see our{" "}
          <Link
            href="/activities/pickleball-for-seniors"
            className="font-semibold text-flag-blue-ink no-underline hover:underline"
          >
            Pickleball for Seniors
          </Link>{" "}
          collection for those, or the full{" "}
          <Link
            href="/guides/pickleball-facilities"
            className="font-semibold text-flag-blue-ink no-underline hover:underline"
          >
            Indoor Pickleball Facilities
          </Link>{" "}
          guide for every commercial club we&apos;ve verified, food and drink or not.
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
