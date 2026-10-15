import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { breadcrumbSchema, articleSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BLOG_POSTS } from "@/lib/blog";

const POST = BLOG_POSTS.find((p) => p.slug === "open-house-chicago-2026")!;

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

export default function OpenHouseChicagoPost() {
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
            alt="A silver-haired woman standing in a grand old theater lobby, looking up in awe at an ornate gilded ceiling"
            width={1355}
            height={1161}
            priority
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>

        <p className="mt-6 text-xl leading-relaxed text-ink">
          Have you ever walked past a beautiful old building and wondered what&apos;s behind the door?
          This Saturday and Sunday, you can find out.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-ink">
          Open House Chicago is back on October 17 and 18, 2026, for its 16th year. More than 200
          buildings across 28 neighborhoods will open their doors to the public — a private club, a
          theater lobby, a sacred space, an office tower with a skyline view — and many of them are
          never open to the public any other day of the year.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-ink">
          It costs nothing, and you don&apos;t need to register. Just pick your places and show up.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">The Basics</h2>
        <ul className="mt-4 flex flex-col gap-1.5 text-lg text-ink">
          <li>
            <strong>When:</strong> Saturday, October 17, and Sunday, October 18, 2026
          </li>
          <li>
            <strong>Where:</strong> 200+ sites across 28 Chicago neighborhoods
          </li>
          <li>
            <strong>Cost:</strong> Free
          </li>
          <li>
            <strong>Registration:</strong> None needed — just show up during each site&apos;s open
            hours
          </li>
          <li>
            <strong>Hours:</strong> Each site sets its own hours; check the listing for each site at{" "}
            <a
              href="https://openhousechicago.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-flag-blue-ink underline"
            >
              openhousechicago.org
            </a>{" "}
            before you go
          </li>
          <li>
            <strong>Organized by:</strong> The Chicago Architecture Center
          </li>
        </ul>
        <p className="mt-4 rounded-card bg-flag-blue-tint px-4 py-3 text-base font-semibold text-flag-blue-ink">
          Watch out: some places open only one day. Central Park Theater, The Arts Club of Chicago, and
          The Cliff Dwellers Club are Saturday only. Chicago Loop Synagogue and KAM Isaiah Israel are
          Sunday only.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">20 New Sites This Year</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          If you&apos;ve been before, these are new for 2026. A few that stand out:
        </p>
        <ul className="mt-4 flex flex-col gap-1.5 text-lg text-ink">
          <li>🎸 <strong>Muddy Waters MOJO Museum</strong> (Kenwood) — the blues legend&apos;s former home</li>
          <li>🌷 <strong>Sears Sunken Garden</strong> (North Lawndale) — a hidden historic garden most Chicagoans have never seen</li>
          <li>🎭 <strong>Cadillac Palace Theatre</strong> (Loop) — the glamorous Broadway in Chicago stage</li>
          <li>🏛️ <strong>Woman&apos;s Athletic Club</strong> (Near North Side) — a private club with a long history</li>
          <li>🔬 <strong>Griffin Museum of Science and Industry</strong> (Hyde Park)</li>
          <li>💿 <strong>Smashed Plastic Record Pressing</strong> (Hermosa) — watch how vinyl records are made</li>
          <li>🐦 Windy City Bird Lab (Near West Side)</li>
          <li>🌱 FarmZero (Downtown)</li>
          <li>🏮 Chinese American Service League Kam Liu Building (Chinatown)</li>
          <li>🎬 TimeLine Theatre (Uptown)</li>
          <li>⛪ St. Paul&apos;s United Church of Christ (Lincoln Park)</li>
          <li>🏙️ Bronzeville Black Metropolis National Heritage Area Headquarters (Bronzeville)</li>
        </ul>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          The full new-sites list also includes the Blackhawks Ice Center, Chicago Fire FC&apos;s Dear
          Chicago Experience Center, Oak Woods Cemetery, Narrow Bridge Arts Club, Xchange Chicago at
          Gary Comer Youth Center, and architecture firm Olson Kundig, among others.
        </p>

        <figure className="mt-6 -mx-4 overflow-hidden rounded-card sm:-mx-6">
          <Image
            src="/blog/open-house-chicago-2026-vinyl.png"
            alt="A smiling older man in a cap holding up a jazz vinyl record in a record shop"
            width={1355}
            height={1161}
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
          <figcaption className="bg-flag-blue-tint px-4 py-2 text-sm text-ink-muted sm:px-6">
            A good match for the Smashed Plastic and Muddy Waters MOJO Museum stops.
          </figcaption>
        </figure>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">New This Year: &quot;Built on Belief&quot;</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          A new program called Built on Belief explores how architecture, religion, and spirituality
          connect. Three Woodlawn sites take part: Narrow Bridge Arts Club (an artist-run space inside
          a restored church), First Presbyterian Church of Chicago, and Oak Woods Cemetery — new to the
          festival this year, and the resting place of Jesse Owens and Harold Washington.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          The three sites are spread across roughly four miles of Woodlawn and South Shore, so it&apos;s
          a drive between them rather than a walk — plan on a car or rideshare if you want to see all
          three in one half-day.
        </p>

        <figure className="mt-6 -mx-4 overflow-hidden rounded-card sm:-mx-6">
          <Image
            src="/blog/open-house-chicago-2026-stained-glass.png"
            alt="An older couple sitting quietly in a church pew as sunlight streams through stained glass windows"
            width={1355}
            height={1160}
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">Favorites That Are Back</h2>
        <ul className="mt-4 flex flex-col gap-1.5 text-lg text-ink">
          <li><strong>Auditorium Theatre</strong> — one of the most beautiful rooms in America</li>
          <li><strong>Chicago Board of Trade</strong> — Art Deco at its finest</li>
          <li><strong>House of Blues</strong></li>
          <li><strong>Stony Island Arts Bank</strong> — a restored bank turned arts center</li>
          <li><strong>Willie Dixon&apos;s Blues Heaven Foundation / Chess Records</strong> — where Chicago blues was recorded</li>
          <li><strong>Avalon Regal Theater</strong></li>
          <li><strong>Federal Reserve Bank of Chicago and Money Museum</strong></li>
        </ul>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">
          How to Plan Your Day (Without Wearing Yourself Out)
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          With 200+ sites, the biggest mistake is trying to see too much. Here&apos;s how to enjoy it:
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          <strong>1. Pick one neighborhood per day.</strong> Don&apos;t zigzag across the city. Downtown
          has the most sites by far, so you could spend a whole day there on foot.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          <strong>2. Use a ready-made itinerary.</strong> The festival website has themed routes,
          including &quot;New Sites for 2026,&quot; &quot;Skyline Views&quot; (rooftop and high-floor
          views), &quot;Along the &apos;L&apos;: Red Line&quot; (every stop near the train, no parking
          hassles), and a route curated by Chicago artist Hebru Brantley.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          <strong>3. Save your plan online.</strong> Log in to &quot;My OHC&quot; on the website to save
          sites and build an itinerary you can open on your phone.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          <strong>4. Go early.</strong> Popular downtown sites get lines by late morning, especially on
          Saturday. Sunday is often calmer.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          <strong>5. Skip the lines with a membership.</strong> Chicago Architecture Center members get
          a Priority Pass to skip the line at sites across the festival. If you plan to see a lot,
          it&apos;s worth considering.
        </p>

        <figure className="mt-6 -mx-4 overflow-hidden rounded-card sm:-mx-6">
          <Image
            src="/blog/open-house-chicago-2026-friends.png"
            alt="Two older women sightseeing on a downtown Chicago sidewalk, one pointing up at a building while the other checks her phone"
            width={1355}
            height={1160}
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">Comfort Tips for Seniors</h2>
        <ul className="mt-4 flex flex-col gap-2 text-lg text-ink">
          <li>
            <strong>Wear your most comfortable walking shoes.</strong> Old buildings often have stairs,
            marble floors, and long hallways.
          </li>
          <li>
            <strong>Ask about accessibility before you go.</strong> Some historic sites have stairs or
            limited elevator access — check each site&apos;s listing on the website, or call ahead.
          </li>
          <li>
            <strong>Take the train or bus.</strong> Parking downtown on a festival weekend is hard, and
            the Red Line itinerary was built around that. Bring your RTA Reduced Fare or Ride Free
            permit if you have one.
          </li>
          <li>
            <strong>Plan breaks.</strong> Build in a coffee or lunch stop between sites.
          </li>
          <li>
            <strong>Dress in layers.</strong> Mid-October in Chicago can be sunny or chilly, and
            you&apos;ll be going in and out all day.
          </li>
          <li>
            <strong>Bring a small bag.</strong> Some sites may check bags.
          </li>
        </ul>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">Bring Your Camera: The Photo Competition</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Open House Chicago runs a photo competition open to all ages, with this year&apos;s theme
          centered on Chicago&apos;s diverse neighborhoods. Six winners will have their photos displayed
          at the Chicago Architecture Center downtown — submit through the Center&apos;s website.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          If you&apos;ve taken one of the free DSLR photography classes from our directory, this is your
          chance to show off.
        </p>

        <figure className="mt-6 -mx-4 overflow-hidden rounded-card sm:-mx-6">
          <Image
            src="/blog/open-house-chicago-2026-photographer.png"
            alt="An older man with a camera photographing the gold Art Deco facade of a downtown Chicago building"
            width={1355}
            height={1160}
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">Why This Is Perfect for Active Seniors</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          You&apos;ve probably lived in or around Chicago for decades. You&apos;ve driven past these
          buildings hundreds of times. Open House Chicago is your chance to see the city you thought you
          knew from a completely new angle, for free and at your own pace.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Bring a friend or a grandchild, pick a neighborhood, and see what&apos;s behind the doors.{" "}
          <a
            href="https://openhousechicago.org"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-flag-blue-ink underline"
          >
            Plan your visit at openhousechicago.org →
          </a>
        </p>

        <figure className="mt-10 -mx-4 overflow-hidden rounded-card sm:-mx-6">
          <Image
            src="/blog/open-house-chicago-2026-closing.png"
            alt="A grandmother and teenage grandson, seen from behind, looking out a high window over the Chicago skyline together"
            width={1355}
            height={1160}
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>
      </article>

      <section className="mt-14 border-t border-flag-blue-tint-2 pt-8">
        <h2 className="text-xl font-bold text-ink">Explore the directory</h2>
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
