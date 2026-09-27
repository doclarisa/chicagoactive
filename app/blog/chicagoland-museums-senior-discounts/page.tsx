import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublishedListingsSafe } from "@/lib/db";
import { breadcrumbSchema, articleSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BLOG_POSTS } from "@/lib/blog";

const POST = BLOG_POSTS.find((p) => p.slug === "chicagoland-museums-senior-discounts")!;

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
  savings?: string;
  note: string;
  sourceUrl: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
};

const DISCOUNTS: Entry[] = [
  {
    name: "Bess Bower Dunn Museum",
    area: "Libertyville, Lake County",
    savings: "$6 → $3 (50% off)",
    note: "Lake County Forest Preserves' history museum. It's also free for everyone the entire month of October, and every 1st and 3rd Thursday evening from 5 to 8pm, regardless of age.",
    sourceUrl: "https://www.lcfpd.org/museum/",
  },
  {
    name: "McHenry County Historical Society & Museum",
    area: "Union, McHenry County",
    savings: "$5 → $3 (40% off)",
    note: "The county's own history museum, for seniors 60+.",
    sourceUrl: "https://www.mchenrycountyhistory.org/planning-your-visit/",
  },
  {
    name: "Elgin Public Museum",
    area: "Elgin, Kane County",
    savings: "$3 → $2 (33% off)",
    note: "A natural history and anthropology museum in Lords Park, for seniors 60+. A 10% senior discount also applies to any membership level.",
    sourceUrl: "http://elginpublicmuseum.org/visitgeninfo.htm",
  },
  {
    name: "Art Institute of Chicago",
    area: "Chicago, Cook County",
    savings: "About $32 → about $26 (about 19% off)",
    note: "Seniors 65+. The bigger win if you qualify: Illinois residents get in completely free on Third Thursdays from 5 to 8pm, and on free Summer Thursday evenings next year (mid-June through mid-September). Reserve online first.",
    sourceUrl: "https://www.artic.edu/visit/free-admission",
  },
  {
    name: "Adler Planetarium",
    area: "Chicago, Cook County",
    savings: "$12 → $10 (about 17% off)",
    note: "Seniors 65+. Chicago residents who are also 65+ get an additional $2 off any day, so it's worth stacking if you qualify for both.",
    sourceUrl: "https://www.adlerplanetarium.org/visit/tickets/special-offers/",
    image: "/blog/museum-discounts-adler.png",
    imageAlt: "Adler Planetarium on Northerly Island with the downtown Chicago skyline in the background",
  },
  {
    name: "Naper Settlement",
    area: "Naperville, DuPage County",
    savings: "$12 → $10 (about 17% off)",
    note: "A 13-acre outdoor history museum with 30+ historic structures, for seniors 62+. Prices drop in the off-season to $6 for adults and $5 for seniors, so check the dates on the museum's site. Naperville residents with ID get in free regardless of age.",
    sourceUrl: "https://www.napersettlement.org/8/Visit",
  },
  {
    name: "Brookfield Zoo Chicago",
    area: "Brookfield, Cook County",
    savings: "$32.95 → $27.95 (about 15% off)",
    note: "Seniors 65+. Those are peak-season prices (May through September), so rates may change for fall. Everyone gets in free on select winter days (early January through late February) -- check the current schedule. Suburban library cardholders can also borrow free passes through the Museum Adventure Pass program.",
    sourceUrl: "https://www.brookfieldzoo.org/discounts-and-free-days",
  },
  {
    name: "Joliet Area Historical Museum",
    area: "Joliet, Will County",
    savings: "$8 → $7 (12.5% off)",
    note: "Joliet's main history museum and Route 66 Welcome Center. Seniors and full-time students both get the discounted rate.",
    sourceUrl: "https://www.jolietmuseum.org/",
  },
];

const OTHER_PERKS: Entry[] = [
  {
    name: "Chicago Botanic Garden",
    area: "Glencoe, Cook County",
    savings: "$10 senior parking on Tuesdays",
    note: "Garden entry is free for everyone, always -- you only pay for parking. Seniors 62+ get the reduced Tuesday parking rate.",
    sourceUrl: "https://www.chicagobotanic.org/visit/free_admission_opportunities",
    image: "/blog/museum-discounts-botanic-garden.png",
    imageAlt: "Autumn foliage reflected in a lagoon at the Chicago Botanic Garden",
    imageWidth: 1536,
    imageHeight: 1024,
  },
  {
    name: "Cantigny Park",
    area: "Wheaton, DuPage County",
    savings: "Discounted senior membership, $50 (one year) / $90 (two years)",
    note: "Seniors 65+ get the same benefits as a Basic membership (gardens, museums, grounds) at a reduced rate.",
    sourceUrl: "https://cantigny.org/plan-your-visit/hours-and-fees/",
  },
  {
    name: "Waukegan History Museum at the Carnegie",
    area: "Waukegan, Lake County",
    savings: "$3 to $10 range, senior discount included",
    note: "A restored 1903 Carnegie library holding Waukegan's history and Ray Bradbury's personal book collection. Sources confirm a senior discount within this range but don't itemize the exact tier, so it's worth a call before you go.",
    sourceUrl: "https://www.waukeganhistorical.org/visit",
  },
];

const ALREADY_FREE: Entry[] = [
  {
    name: "Oak Park Conservatory",
    area: "Oak Park, Cook County",
    note: "A free public greenhouse and garden; $5 suggested donation, no obligation.",
    sourceUrl: "https://oakparkconservatory.org/admission/",
    image: "/blog/museum-discounts-conservatory.png",
    imageAlt: "Tropical plants under the glass roof of the Oak Park Conservatory",
  },
  {
    name: "Yesterday's Farm Museum",
    area: "Wood Dale, DuPage County",
    note: "A restored mid-1800s farm with antique equipment, run by the Wood Dale Historical Society.",
    sourceUrl: "https://wooddalemuseum.org/about-the-historical-society.html",
  },
  {
    name: "Graue Mill and Museum",
    area: "Oak Brook, DuPage County",
    note: "An 1852 working water-powered gristmill, with spinning and weaving demonstrations on weekends.",
    sourceUrl: "https://www.dupageforest.org/graue-mill",
    image: "/blog/museum-discounts-graue-mill.png",
    imageAlt: "Water wheel turning beside the 1852 Graue Mill on Salt Creek",
  },
  {
    name: "Itasca Historical Depot Museum",
    area: "Itasca, DuPage County",
    note: "An 1873 train depot and 1939 caboose, plus a themed escape room built into the museum.",
    sourceUrl: "https://www.itascaparkdistrict.com/171/Itasca-Historical-Depot-Museum",
  },
  {
    name: "Schoolhouse Museum",
    area: "Antioch, Lake County",
    note: "An 1892 schoolhouse covering the history of Antioch and the Chain O'Lakes area, run by the Lakes Region Historical Society.",
    sourceUrl: "https://antiochhistory.org/",
  },
];

function EntryCard({ e, rank }: { e: Entry; rank?: number }) {
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
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-lg font-bold text-ink">
            {rank && <span className="text-ink-muted">{rank}. </span>}
            {e.name}
          </h3>
          {e.savings && <span className="text-base font-extrabold text-flag-blue-ink">{e.savings}</span>}
        </div>
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

export default async function MuseumDiscountsPost() {
  let liveCount: number | null = null;
  try {
    liveCount = (await getPublishedListingsSafe()).filter((l) => l.category === "museum-senior-days").length;
  } catch {
    liveCount = null;
  }
  const totalCount = liveCount && liveCount > 0 ? liveCount : DISCOUNTS.length + OTHER_PERKS.length + ALREADY_FREE.length;

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
            alt="An older couple looking at paintings together in a bright, modern gallery"
            width={1448}
            height={1086}
            priority
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>

        <p className="mt-6 text-xl leading-relaxed text-ink">
          &quot;Seniors welcome&quot; and &quot;seniors save&quot; are not the same sentence. Plenty of
          museums will happily sell you a ticket at any age. What we wanted to know is where the price
          actually changes once you qualify. So we went through every museum and attraction in our
          directory looking for a real, stated senior price: not a vague discount, an actual number.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-ink">
          We found {totalCount}. Eight have a straight senior discount on admission, ranked below by how
          much they save you. Three more offer a different kind of senior perk. And five skip the question
          entirely: they&apos;re free for everyone, any age.
        </p>

        <div className="mt-6 rounded-card bg-flag-blue-tint px-5 py-4 text-flag-blue-ink">
          <p>
            <strong>Heads up:</strong> the #1 museum on this list, the Bess Bower Dunn Museum in
            Libertyville, is free for everyone all of October.
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">The real discounts, ranked by savings</h2>

        <div className="mt-6 flex flex-col gap-4">
          {DISCOUNTS.map((e, i) => (
            <EntryCard key={e.name} e={e} rank={i + 1} />
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">Other senior perks worth knowing</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          These don&apos;t fit a straight before-and-after admission price, but they still save seniors
          money.
        </p>

        <div className="mt-6 flex flex-col gap-4">
          {OTHER_PERKS.map((e) => (
            <EntryCard key={e.name} e={e} />
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">Or skip the discount: these are already free</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          No senior tier needed. These five don&apos;t charge admission at all, regardless of age. Most are
          small local history museums run by volunteer historical societies.
        </p>

        <div className="mt-6 flex flex-col gap-4">
          {ALREADY_FREE.map((e) => (
            <EntryCard key={e.name} e={e} />
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">One honest note</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          A couple of these come with an asterisk. The Waukegan Carnegie&apos;s exact senior price
          wasn&apos;t itemized in what we could confirm, and Brookfield&apos;s and Naper Settlement&apos;s
          prices shift with the season. Admission policies at small volunteer-run museums can also change
          with whoever&apos;s on duty that day. Bring ID either way, and if the discount is the whole reason
          you&apos;re going, a quick call first never hurts.
        </p>
      </article>

      <section className="mt-14 border-t border-flag-blue-tint-2 pt-8">
        <h2 className="text-xl font-bold text-ink">More ways to explore</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/category/museum-senior-days"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Museum Senior Days →</span>
            <span className="text-base text-ink-muted">Every museum discount we&apos;ve verified</span>
          </Link>
          <Link
            href="/category/arts-culture"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Arts &amp; Culture →</span>
            <span className="text-base text-ink-muted">More museums and historical societies</span>
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
