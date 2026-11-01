import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { breadcrumbSchema, articleSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BLOG_POSTS } from "@/lib/blog";

const POST = BLOG_POSTS.find((p) => p.slug === "indoor-mall-walking-chicagoland")!;

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

export default function IndoorMallWalkingPost() {
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
          alt="Two smiling older women in fleece jackets walking briskly down a bright mall corridor"
          width={1448}
          height={1086}
          priority
        />

        <p className="mt-6 text-xl leading-relaxed text-ink">
          November in Chicago means wind that cuts through your coat, sidewalks that turn to ice
          overnight, and sunsets at 4:30. It also means the end of your walking routine — unless you
          take it <strong>indoors</strong>.
        </p>
        <p className="mt-5 text-lg leading-relaxed text-ink">
          Mall walking is one of the most popular senior activities in America, and it&apos;s easy to
          see why. The floors are flat and smooth, the temperature stays comfortable, there are
          restrooms and benches everywhere, and there&apos;s coffee at the finish line. In Chicagoland,
          you also have indoor tracks, park district fieldhouses, and a couple of surprising options
          downtown. Here&apos;s your guide to staying on your feet all winter.
        </p>

        <h2 className={H2}>Why Mall Walking Works</h2>
        <ul className={UL}>
          <li>
            <strong>No ice, no wind, no potholes.</strong> Smooth, level floors are easier on your
            joints, and much safer for your balance, than an icy sidewalk.
          </li>
          <li>
            <strong>It&apos;s free.</strong> No membership or equipment. Just good shoes.
          </li>
          <li>
            <strong>Restrooms, water, and benches are everywhere.</strong> Rest whenever you want.
          </li>
          <li>
            <strong>It&apos;s comfortable to walk alone.</strong> Malls are well lit and staffed.
          </li>
          <li>
            <strong>It&apos;s social.</strong> Show up at the same time a few mornings in a row and
            you&apos;ll start seeing the same friendly faces. Many walkers say the friendships are the
            best part.
          </li>
        </ul>

        <Photo
          src="/blog/indoor-mall-walking-chicagoland-cafe.png"
          alt="A group of older adults laughing over coffee at a mall food court table after their walk"
          width={1448}
          height={1086}
        />

        <h2 className={H2}>Where to Walk in Chicagoland</h2>

        <h3 className={H3}>Yorktown Center (Lombard)</h3>
        <p className={P}>
          Yorktown welcomes mall walkers <strong>seven days a week, year-round</strong>, and its doors
          open at <strong>8 a.m.</strong> (holiday hours may vary). The mall has a history of
          supporting walkers: a 2019 article on its website described a{" "}
          <strong>Heart &amp; Sole Walking Club</strong>, launched with Humana, that had grown to about{" "}
          <strong>700 members</strong> and offered perks like store discounts and free walking gear.
        </p>
        <p className={P}>
          <strong>Before you go:</strong> ask guest services whether the walking club is still active
          and which entrance to use. 203 Yorktown Center, Lombard ·{" "}
          <Ext href="https://yorktowncenter.com/about/">yorktowncenter.com</Ext>
        </p>

        <Photo
          src="/blog/indoor-mall-walking-chicagoland-steps.png"
          alt="An older man checking the step counter on his belt while walking through a sunny mall atrium"
          width={1536}
          height={1024}
        />

        <h3 className={H3}>Gurnee Mills (Gurnee)</h3>
        <p className={P}>
          If you want distance, this is the place. Gurnee Mills is <strong>all on one level</strong> —
          no stairs, no escalators — and its main corridor runs about <strong>4,400 feet</strong>,
          close to a mile from end to end. Walk the whole thing and back and you&apos;ve covered{" "}
          <strong>about 1.7 miles</strong> without seeing a single snowflake.
        </p>
        <p className={P}>
          <strong>Tip:</strong> mall hours vary by season, so check the mall&apos;s website and ask
          guest services whether walkers can come in before the stores open.
        </p>

        <Photo
          src="/blog/indoor-mall-walking-chicagoland-couple.png"
          alt="An older couple holding hands as they walk away down a long, bright mall corridor"
          width={1536}
          height={1024}
        />

        <h3 className={H3}>Your Neighborhood Mall</h3>
        <p className={P}>
          Almost every Chicagoland mall welcomes walkers, and many open their doors before the stores
          do. Call guest services and ask three questions:
        </p>
        <ol className="mt-4 flex list-decimal flex-col gap-2 pl-6 text-lg text-ink">
          <li>What time do the doors open for walkers?</li>
          <li>Which entrance should I use?</li>
          <li>Is there a walking club or a mapped route with distances?</li>
        </ol>
        <p className={P}>You may find a whole walking community you didn&apos;t know existed.</p>

        <h2 className={H2}>Indoor Tracks: Count Your Laps</h2>
        <p className={P}>
          If you like to know exactly how far you&apos;ve gone, an indoor track is the answer. Several
          park districts open their tracks to the public in winter.
        </p>

        <h3 className={H3}>Lincoln-Way Indoor Tracks (New Lenox area)</h3>
        <p className={P}>
          The New Lenox Park District opens the indoor tracks at <strong>Lincoln-Way West</strong> and{" "}
          <strong>Lincoln-Way Central</strong> high schools to adults 18 and older.
        </p>
        <ul className={UL}>
          <li>
            <strong>Free for Lincoln-Way residents</strong>, $5 per visit for non-residents. Pick up a
            walking pass at the field house check-in desk.
          </li>
          <li>
            About <strong>8 to 9 laps in lane 5 or 6 equals one mile.</strong>
          </li>
          <li>
            <strong>Fall season: September 9 – December 18.</strong> Lincoln-Way West: Monday and
            Wednesday–Friday 6–9 p.m., Saturday 1–4 p.m., Sunday 9 a.m.–1 p.m. Lincoln-Way Central:
            Monday, Wednesday, and Thursday 6–9 p.m.
          </li>
          <li>Hours can end early on slow nights, and some dates are skipped, so check the calendar first.</li>
        </ul>
        <p className={P}>
          <Ext href="https://www.newlenoxparks.org/lincoln-way-central-west-indoor-track/">Details →</Ext>
        </p>

        <h3 className={H3}>Stephen D. Persinger Recreation Center (Geneva)</h3>
        <p className={P}>
          This Geneva Park District center has a <strong>three-lane indoor walking and running
          track</strong>, and seniors get a real discount on a track-only pass:
        </p>
        <ul className={UL}>
          <li>
            <strong>Resident seniors:</strong> $30 a year
          </li>
          <li>
            <strong>Non-resident seniors:</strong> $130 a year
          </li>
          <li>
            <strong>Day visit:</strong> $9 residents, $11 non-residents
          </li>
        </ul>
        <p className={P}>
          <Ext href="https://genevaparks.org/bestlife-fitness/stephen-d-persinger-recreation-center/indoor-track">
            Details →
          </Ext>
        </p>

        <Photo
          src="/blog/indoor-mall-walking-chicagoland-track.png"
          alt="A smiling older woman in a bright pink jacket walking on a blue indoor track above a park district gym"
          width={1536}
          height={1024}
        />

        <h2 className={H2}>Walking Clubs That Move Indoors</h2>
        <p className={P}>
          Some groups walk outside when the weather is nice and move indoors when it isn&apos;t, so you
          never have to give up your routine.
        </p>

        <h3 className={H3}>Wood Dale Park District Senior Walking Club (55+)</h3>
        <p className={P}>
          The club walks the trails at <strong>White Oaks Park</strong> and{" "}
          <strong>Recreation Park</strong>. On bad-weather days, it moves to the{" "}
          <strong>indoor track at the Recreation Complex</strong> (111 E. Foster Ave.) — and{" "}
          <strong>coffee is available</strong>. It&apos;s <strong>$3</strong> per session; register
          through the park district by the day before.{" "}
          <Ext href="https://www.active.com/wood-dale-il/walking/classes/senior-walking-club-2026-110510912">
            Details →
          </Ext>
        </p>

        <Photo
          src="/blog/indoor-mall-walking-chicagoland-club.png"
          alt="A cheerful group of older adults in winter hats heading out from a park district recreation center, one holding a coffee"
          width={1536}
          height={1024}
        />

        <h2 className={H2}>Chicago&apos;s Secret Indoor Walks</h2>

        <h3 className={H3}>The Chicago Pedway (Downtown)</h3>
        <p className={P}>
          Few Chicagoans realize there&apos;s a network of underground and enclosed walkways beneath the
          Loop. According to the City of Chicago, the Pedway runs about <strong>five miles</strong>,
          links <strong>more than 40 blocks</strong>, and connects <strong>more than 50
          buildings</strong> — shops, food courts, and train stations, all without stepping outside.
          Signs can be confusing, so bring a friend, download the city&apos;s Pedway map, and go on a
          weekday when the connecting buildings are open.{" "}
          <Ext href="https://www.chicago.gov/city/en/depts/cdot/provdrs/ped/svcs/pedway.html">
            City of Chicago Pedway page →
          </Ext>
        </p>

        <h3 className={H3}>Garfield Park Conservatory (West Side)</h3>
        <p className={P}>
          Want to walk through a jungle in January? The conservatory&apos;s warm, green rooms are a
          treat in winter.
        </p>
        <ul className={UL}>
          <li>
            <strong>Admission:</strong> free for Chicago residents (donations welcome; bring ID).
            Non-residents: $10 adults, <strong>$5 seniors 65+</strong>.
          </li>
          <li>
            <strong>Reservations</strong> are recommended to guarantee entry.
          </li>
          <li>
            <strong>Hours:</strong> closed Monday and Tuesday. Wednesday 10 a.m.–8 p.m.;
            Thursday–Sunday 10 a.m.–5 p.m.
          </li>
          <li>
            <strong>Parking</strong> is free in the visitor lot, and the CTA Green Line stops nearby.
          </li>
          <li>
            <strong>Accessibility:</strong> a limited number of free wheelchairs are available. Paths
            can be wet, and the Fern Room is not wheelchair accessible.
          </li>
        </ul>
        <p className={P}>
          300 N. Central Park Ave., Chicago ·{" "}
          <Ext href="https://garfieldconservatory.org/faq">garfieldconservatory.org</Ext>
        </p>

        <h2 className={H2}>Tips for Happy Indoor Walking</h2>
        <ul className={UL}>
          <li>
            <strong>Wear real walking shoes.</strong> Mall floors are hard, so cushioning matters.
          </li>
          <li>
            <strong>Go early.</strong> Mornings are quiet and the corridors are wide open.
          </li>
          <li>
            <strong>Bring a water bottle.</strong> Indoor heating is drying.
          </li>
          <li>
            <strong>Track your steps</strong> with a pedometer or your phone. It&apos;s motivating to
            watch the numbers climb.
          </li>
          <li>
            <strong>Find a buddy or a group.</strong> You&apos;re far more likely to show up on a gray
            Tuesday if someone is waiting for you.
          </li>
          <li>
            <strong>Use the CDC&apos;s free Mallwalking Guide</strong> for tips on starting or joining a
            program:{" "}
            <Ext href="https://www.cdc.gov/physicalactivity/downloads/mallwalking-guide.pdf">
              read the guide →
            </Ext>
          </li>
        </ul>

        <h2 className={H2}>The Bottom Line</h2>
        <p className={P}>
          Winter doesn&apos;t have to stop you. Find a mall, a track, or a walking club, put on your
          sneakers, and keep moving until spring. You might even finish the season with a coffee crew
          and a few new friends.
        </p>
        <p className="mt-6 text-base italic text-ink-muted">
          Hours, prices, and seasons change. We verified everything above in November 2026, but please
          call ahead before you go.
        </p>
      </article>

      <section className="mt-14 border-t border-flag-blue-tint-2 pt-8">
        <h2 className="text-xl font-bold text-ink">Explore the directory</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/activities/walking-groups-for-seniors"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Walking Groups →</span>
            <span className="text-base text-ink-muted">Walking clubs for seniors across Chicagoland</span>
          </Link>
          <Link
            href="/city/wood-dale"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Wood Dale programs →</span>
            <span className="text-base text-ink-muted">More senior programs from the Wood Dale Park District</span>
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
