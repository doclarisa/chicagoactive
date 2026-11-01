import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { breadcrumbSchema, articleSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BLOG_POSTS } from "@/lib/blog";

const POST = BLOG_POSTS.find((p) => p.slug === "winter-holiday-events-seniors-chicagoland-2026")!;

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

const IMG = "/blog/winter-holiday-events-seniors-chicagoland-2026";

export default function WinterHolidayEventsPost() {
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
          alt="An older couple walking arm in arm beneath strings of glowing holiday lights"
          width={1448}
          height={1086}
          priority
        />

        <p className="mt-6 text-xl leading-relaxed text-ink">
          Chicago does winter well. The cold is real, but so is the magic: a German Christmas market in
          the middle of the Loop, millions of lights glowing through the zoo, tropical greenhouses full
          of poinsettias, and a 30th birthday for one of the city&apos;s favorite traditions.
        </p>
        <p className="mt-5 text-lg leading-relaxed text-ink">
          Plenty of it is <strong>free</strong>, a lot of it is <strong>easy on the feet</strong>, and
          most of it runs from mid-November into early January. Here&apos;s your guide to the season.
        </p>

        <h2 className={H2}>Free Holiday Classics</h2>

        <h3 className={H3}>Christkindlmarket: 30 Years of Mulled Wine and Ornaments</h3>
        <p className={P}>
          The Christkindlmarket turns <strong>30</strong> this year and opens{" "}
          <strong>Friday, November 20, 2026</strong>. Admission is <strong>free</strong> at all three
          locations. Bring cash — many vendors don&apos;t take cards.
        </p>
        <ul className={UL}>
          <li>
            <strong>Daley Plaza (Loop)</strong>, 50 W. Washington St. Daily{" "}
            <strong>Nov. 20 – Dec. 24</strong>. Sun–Thu 11 a.m.–8 p.m., Fri–Sat 11 a.m.–9 p.m.
          </li>
          <li>
            <strong>Wrigleyville</strong>, Gallagher Way, 3635 N. Clark St. Daily{" "}
            <strong>Nov. 20 – Dec. 31</strong> (closed Christmas Day). Mon–Thu 3–9 p.m., Fri–Sat 11
            a.m.–9 p.m., Sun 11 a.m.–7 p.m.
          </li>
          <li>
            <strong>Aurora</strong>, RiverEdge Park, 360 N. Broadway. The largest market, with{" "}
            <strong>60+ vendors</strong>. Open <strong>Thursday–Sunday, Nov. 20 – Dec. 24</strong>.
          </li>
        </ul>
        <p className={P}>All three close at 4 p.m. on Thanksgiving and Christmas Eve.</p>
        <p className={P}>
          <strong>Senior tip:</strong> go on a <strong>weekday afternoon</strong> — evenings and
          weekends get packed. If you live in the western suburbs, the Aurora market is easier to reach
          and park at.
        </p>

        <Photo
          src={`${IMG}-market.png`}
          alt="Two older women in knit hats laughing as they clink mugs at a holiday market stall"
          width={1448}
          height={1086}
        />

        <h3 className={H3}>Chicago&apos;s Christmas Tree Lighting</h3>
        <p className={P}>
          The official city tree lights up <strong>Friday, November 20, 2026</strong>, in{" "}
          <strong>Millennium Park</strong> near Michigan Avenue and Washington Street. It&apos;s free,
          outdoors, and the same day the Christkindlmarket opens a block away.
        </p>
        <p className={P}>
          <strong>Senior tip:</strong> the crowd is huge. If you&apos;d rather skip the crush, visit the
          tree on a weekday evening the following week — it looks just as beautiful.
        </p>

        <Photo
          src={`${IMG}-tree.png`}
          alt="A grandmother and grandchild gazing up at a giant lit Christmas tree downtown"
          width={1536}
          height={1024}
        />

        <h3 className={H3}>ZooLights: Free on Mondays</h3>
        <p className={P}>
          Lincoln Park Zoo&apos;s <strong>ZooLights</strong> runs nightly from{" "}
          <strong>November 21, 2026, to January 3, 2027</strong>, starting at 4:30 p.m. Tickets run{" "}
          <strong>$7 to $20</strong> depending on the date — but{" "}
          <strong>Mondays are free with registration</strong> (except December 21 and 28).
        </p>

        <Photo
          src={`${IMG}-zoo.png`}
          alt="An older couple smiling in front of glowing giraffe and penguin light sculptures on a snowy zoo path"
          width={1536}
          height={1024}
        />

        <h2 className={H2}>Flower Shows: Warm, Green, and Mostly Free</h2>
        <p className={P}>When it&apos;s 15 degrees outside, nothing beats a warm greenhouse full of poinsettias.</p>

        <h3 className={H3}>Garfield Park Conservatory</h3>
        <p className={P}>
          The <strong>2026–2027 Winter Flower Show</strong> runs{" "}
          <strong>November 25, 2026 – January 3, 2027</strong>, and it&apos;s{" "}
          <strong>included with general admission</strong>:
        </p>
        <ul className={UL}>
          <li>
            <strong>Free for Chicago residents</strong> (bring ID)
          </li>
          <li>
            <strong>$5 for seniors 65+</strong> who live outside the city
          </li>
          <li>
            <strong>Closed Mondays and Tuesdays</strong>; reservations recommended
          </li>
          <li>
            <strong>Free parking</strong>, plus a limited number of free wheelchairs
          </li>
        </ul>
        <p className={P}>
          300 N. Central Park Ave., Chicago ·{" "}
          <Ext href="https://garfieldconservatory.org/gardens/flower-shows/">garfieldconservatory.org</Ext>
        </p>

        <h3 className={H3}>Lincoln Park Conservatory</h3>
        <p className={P}>
          The <strong>Lincoln Park Conservatory</strong> is <strong>free</strong>, with spots reserved
          in advance. Last season&apos;s winter show ran Wednesday–Sunday, 10 a.m.–3 p.m. — check the{" "}
          <Ext href="https://www.chicagoparkdistrict.com/conservatory-flower-shows">Chicago Park District</Ext>{" "}
          for this year&apos;s dates. 2391 N. Stockton Dr., Chicago.
        </p>

        <Photo
          src={`${IMG}-poinsettias.png`}
          alt="An older woman in a red coat smiling as she admires red and white poinsettias in a glass conservatory"
          width={1536}
          height={1024}
        />

        <h2 className={H2}>The Big Light Shows (Worth the Ticket)</h2>
        <p className={P}>
          These cost money, but they&apos;re the showstoppers of the season. Each one is a real walk, so
          wear your warmest boots.
        </p>

        <h3 className={H3}>Illumination at The Morton Arboretum (Lisle)</h3>
        <ul className={UL}>
          <li>
            <strong>November 14, 2026 – January 2, 2027</strong>
          </li>
          <li>
            About a <strong>one-mile walking trail</strong>, described as <strong>ADA-accessible</strong>
          </li>
          <li>
            <strong>22 light displays</strong>, including four new large-scale installations and a
            400-foot aurora-inspired canopy
          </li>
          <li>
            An indoor <strong>model train</strong> walk-through with nearly 1,000 feet of track ($9
            add-on for nonmembers)
          </li>
          <li>
            Adult tickets <strong>start at $22</strong> (prices vary by date)
          </li>
          <li>
            A quieter <strong>Sensory Night on November 17</strong>, with static lights, softer music,
            and limited capacity
          </li>
        </ul>
        <p className={P}>
          <Ext href="https://mortonarb.org/news/illumination-at-the-morton-arboretum-returns-nov-14-with-boldest-most-captivating-winter-wonderland-holiday-lights-experience">
            Details →
          </Ext>
        </p>

        <h3 className={H3}>Holiday Magic at Brookfield Zoo Chicago</h3>
        <ul className={UL}>
          <li>
            <strong>November 19, 2026 – January 3, 2027</strong>, 3–9 p.m.
          </li>
          <li>
            <strong>More than 3.5 million lights</strong>, with light tunnels, a maze, and
            animal-themed displays
          </li>
          <li>
            Tickets <strong>from $29.95</strong>; zoo members get in free
          </li>
        </ul>

        <h3 className={H3}>Lightscape at Chicago Botanic Garden (Glencoe)</h3>
        <ul className={UL}>
          <li>
            <strong>November 13, 2026 – January 3, 2027</strong>, on select dates
          </li>
          <li>
            A <strong>1.3-mile</strong> illuminated trail
          </li>
          <li>Buy early — popular dates sell out</li>
        </ul>
        <p className={P}>
          <strong>Senior tip for all three:</strong> book an <strong>early time slot on a
          weeknight</strong>. Smaller crowds, slightly warmer, and you&apos;re home before 8.
        </p>

        <Photo
          src={`${IMG}-tunnel.png`}
          alt="Four smiling older friends taking a selfie inside a glowing tunnel of holiday lights"
          width={1536}
          height={1024}
        />

        <h2 className={H2}>Christmas Around the World (Hyde Park)</h2>
        <p className={P}>
          The <strong>Griffin Museum of Science and Industry&apos;s</strong>{" "}
          <strong>Christmas Around the World</strong> exhibit features <strong>more than 50
          trees</strong>, each decorated by community volunteers to represent a different culture — a
          tradition more than 80 years old. Last season ran from early November to early January; check
          the <Ext href="https://www.griffinmsi.org">museum&apos;s website</Ext> for 2026 dates and
          ticket prices.
        </p>
        <p className={P}>
          <strong>Senior tip:</strong> it&apos;s all indoors, with seating nearby — an easy outing on a
          bad-weather day.
        </p>

        <h2 className={H2}>Tips for Enjoying the Season Comfortably</h2>
        <ul className={UL}>
          <li>
            <strong>Go early or on weekdays.</strong> Smaller crowds, easier parking, better views.
          </li>
          <li>
            <strong>Dress in layers</strong> and wear <strong>waterproof boots with good grip</strong>.
            Outdoor paths can be icy.
          </li>
          <li>
            <strong>Bring a folding cane seat</strong> for the long outdoor light trails.
          </li>
          <li>
            <strong>Take transit downtown.</strong> Parking near Daley Plaza and Millennium Park is tough
            in December.
          </li>
          <li>
            <strong>Carry cash</strong> for the Christkindlmarket.
          </li>
          <li>
            <strong>Check accessibility before you buy.</strong> Most light trails are paved, but ask
            about wheelchairs and seating.
          </li>
          <li>
            <strong>Go with a group.</strong> Many senior centers and park districts run holiday bus
            trips to lights and markets.{" "}
            <Link href="/guides/day-trips-from-chicago" className="font-semibold text-flag-blue-ink no-underline hover:underline">
              See our day-trips guide →
            </Link>
          </li>
        </ul>

        <h2 className={H2}>The Bottom Line</h2>
        <p className={P}>
          You don&apos;t need a big budget to celebrate in Chicagoland. Between free markets, free flower
          shows, free Monday ZooLights, and the tree in Millennium Park, you could fill the whole season
          without buying a ticket. And if you splurge, make it a light show on a quiet weeknight with
          someone you love.
        </p>

        <Photo
          src={`${IMG}-cocoa.png`}
          alt="An older couple sharing hot cocoa on a snowy bench under twinkling lights"
          width={1536}
          height={1024}
        />

        <p className="mt-6 text-base italic text-ink-muted">
          Dates, hours, and prices were verified in early November 2026 from each event&apos;s official
          announcements. Things change — please check before you go.
        </p>
      </article>

      <section className="mt-14 border-t border-flag-blue-tint-2 pt-8">
        <h2 className="text-xl font-bold text-ink">Keep exploring</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/blog/indoor-mall-walking-chicagoland"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Indoor &amp; mall walking →</span>
            <span className="text-base text-ink-muted">Where to keep walking all winter</span>
          </Link>
          <Link
            href="/blog/brookfield-zoo-free-winter-days"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Brookfield Zoo free days →</span>
            <span className="text-base text-ink-muted">Free winter admission, January and February</span>
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
