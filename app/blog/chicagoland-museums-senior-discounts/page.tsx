import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { breadcrumbSchema, articleSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BLOG_POSTS } from "@/lib/blog";

const POST = BLOG_POSTS.find((p) => p.slug === "chicagoland-museums-senior-discounts")!;

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

type Discount = {
  name: string;
  area: string;
  savings: string;
  note: string;
  sourceUrl: string;
};

const DISCOUNTS: Discount[] = [
  {
    name: "Bess Bower Dunn Museum",
    area: "Libertyville, Lake County",
    savings: "$6 → $3 (50% off)",
    note: "Lake County Forest Preserves' history museum. Also free the entire month of October, and free every 1st/3rd Thursday evening, 5-8pm, regardless of age.",
    sourceUrl: "https://www.lcfpd.org/museum/",
  },
  {
    name: "McHenry County Historical Society & Museum",
    area: "Union, McHenry County",
    savings: "$5 → $3 (40% off)",
    note: "The county's own history museum, seniors 60+.",
    sourceUrl: "https://www.mchenrycountyhistory.org/planning-your-visit/",
  },
  {
    name: "Elgin Public Museum",
    area: "Elgin, Kane County",
    savings: "$3 → $2 (33% off)",
    note: "Natural history and anthropology museum in Lords Park, seniors 60+. A 10% senior discount also applies to any membership level.",
    sourceUrl: "http://elginpublicmuseum.org/visitgeninfo.htm",
  },
  {
    name: "Art Institute of Chicago",
    area: "Chicago, Cook County",
    savings: "~$32 → ~$26 (about 19% off)",
    note: "Seniors 65+. The bigger win if you qualify: Illinois residents get in completely free on Third Thursdays, 5-8pm, and on free Summer Thursday evenings (mid-June through mid-September) -- reserve online first.",
    sourceUrl: "https://www.artic.edu/visit/free-admission",
  },
  {
    name: "Adler Planetarium",
    area: "Chicago, Cook County",
    savings: "$12 → $10 (about 17% off)",
    note: "Seniors 65+, plus an extra $2 off any day for Chicago residents and seniors combined -- worth stacking if you qualify for both.",
    sourceUrl: "https://www.adlerplanetarium.org/visit/tickets/special-offers/",
  },
  {
    name: "Joliet Area Historical Museum",
    area: "Joliet, Will County",
    savings: "$8 → $7 (12.5% off)",
    note: "Joliet's main history museum and Route 66 Welcome Center. Seniors and full-time students both get the discounted rate.",
    sourceUrl: "https://www.jolietmuseum.org/",
  },
  {
    name: "Naper Settlement",
    area: "Naperville, DuPage County",
    savings: "$10 flat for 62+",
    note: "A 13-acre outdoor history museum with 30+ historic structures. Naperville residents with ID get in free regardless of age.",
    sourceUrl: "https://www.napersettlement.org/8/Visit",
  },
  {
    name: "Brookfield Zoo Chicago",
    area: "Brookfield, Cook County",
    savings: "About $20, a few dollars off adult rate",
    note: "Seniors 65+. Everyone gets in free on select winter days (early January through late February) -- check the current schedule. Suburban library cardholders can also borrow free passes via the Museum Adventure Pass program.",
    sourceUrl: "https://www.brookfieldzoo.org/discounts-and-free-days",
  },
  {
    name: "Chicago Botanic Garden",
    area: "Glencoe, Cook County",
    savings: "$10 senior parking on Tuesdays",
    note: "Garden entry itself is free for everyone, always -- you only pay for parking. Seniors 62+ get the reduced Tuesday parking rate.",
    sourceUrl: "https://www.chicagobotanic.org/visit/free_admission_opportunities",
  },
  {
    name: "Cantigny Park",
    area: "Wheaton, DuPage County",
    savings: "Discounted senior membership, $50/$90",
    note: "Seniors 65+ get the same benefits as a Basic membership (gardens, museums, grounds) at a reduced one- or two-year rate.",
    sourceUrl: "https://cantigny.org/plan-your-visit/hours-and-fees/",
  },
  {
    name: "Waukegan History Museum at the Carnegie",
    area: "Waukegan, Lake County",
    savings: "$3-10 range, senior discount included",
    note: "A restored 1903 Carnegie library with Waukegan's history and Ray Bradbury's personal book collection. Sources confirm a senior discount within this range but don't itemize the exact tier -- worth a call before you go.",
    sourceUrl: "https://www.waukeganhistorical.org/visit",
  },
];

type FreeOne = { name: string; area: string; note: string; sourceUrl: string };

const ALREADY_FREE: FreeOne[] = [
  {
    name: "Oak Park Conservatory",
    area: "Oak Park, Cook County",
    note: "A free public greenhouse and garden; $5 suggested donation, no obligation.",
    sourceUrl: "https://oakparkconservatory.org/admission/",
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
    note: "An 1892 schoolhouse covering Antioch and Chain O'Lakes-area history, run by the Lakes Region Historical Society.",
    sourceUrl: "https://antiochhistory.org/",
  },
];

export default async function MuseumDiscountsPost() {
  let liveCount: number | null = null;
  try {
    liveCount = await prisma.listing.count({ where: { status: "PUBLISHED", category: "museum-senior-days" } });
  } catch {
    liveCount = null;
  }
  const totalCount = liveCount ?? DISCOUNTS.length + ALREADY_FREE.length + 1;

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
          &quot;Seniors welcome&quot; and &quot;seniors save&quot; are not the same sentence. Plenty of
          museums will happily sell you a ticket at any age -- what we wanted to know is where the price
          actually changes once you qualify. So we went through every museum and attraction in our
          directory looking for a real, stated senior price -- not a vague discount, an actual number.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-ink">
          We found {totalCount}. Eleven have a genuine senior discount worth knowing about, ranked here by
          how much it actually saves you. Five more skip the question entirely -- they&apos;re free for
          everyone, any age.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">The real discounts, ranked by savings</h2>

        <div className="mt-6 flex flex-col gap-4">
          {DISCOUNTS.map((d) => (
            <div key={d.name} className="rounded-card bg-card p-5 shadow-sm ring-1 ring-black/5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-bold text-ink">{d.name}</h3>
                <span className="text-base font-extrabold text-flag-blue-ink">{d.savings}</span>
              </div>
              <p className="mt-1 text-sm font-semibold text-ink-muted">{d.area}</p>
              <p className="mt-2 text-base text-ink-muted">{d.note}</p>
              <a
                href={d.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-semibold text-flag-blue-ink no-underline hover:underline"
              >
                Source →
              </a>
            </div>
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">Or skip the discount -- these are already free</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          No senior tier needed. These five don&apos;t charge admission at all, regardless of age -- mostly
          small local history museums run by volunteer historical societies.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          {ALREADY_FREE.map((f) => (
            <div key={f.name} className="rounded-card bg-flag-blue-tint p-4">
              <p className="font-bold text-ink">
                {f.name} <span className="font-semibold text-ink-muted">— {f.area}</span>
              </p>
              <p className="mt-1 text-base text-ink">{f.note}</p>
              <a
                href={f.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm font-semibold text-flag-blue-ink no-underline hover:underline"
              >
                Source →
              </a>
            </div>
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">One honest note</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          A couple of these have a caught-up-somewhere asterisk: the Waukegan Carnegie&apos;s exact senior
          price wasn&apos;t itemized in what we could confirm, and admission policies at small
          volunteer-run museums can change with whoever&apos;s on duty that day. Bring ID either way, and
          if the discount is the whole reason you&apos;re going, a quick call first never hurts.
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
