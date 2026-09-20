import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { CITIES } from "@/lib/cities";
import { COUNTIES } from "@/lib/counties";
import { categoryLabel } from "@/lib/categories";
import { breadcrumbSchema, articleSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import FreeVsPaidByCountyChart from "@/components/FreeVsPaidByCountyChart";
import { BLOG_POSTS } from "@/lib/blog";

const POST = BLOG_POSTS.find((p) => p.slug === "chicago-suburbs-free-senior-programs")!;

export const metadata: Metadata = {
  title: POST.title,
  description: POST.dek,
  alternates: { canonical: `/blog/${POST.slug}` },
  openGraph: {
    title: POST.title,
    description: POST.dek,
    type: "article",
    images: ["/blog/chicago-suburbs-free-senior-programs-hero.png"],
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

export default async function ChicagoSuburbsFreeSeniorProgramsPost() {
  const listings = await prisma.listing.findMany({
    where: { status: "PUBLISHED" },
    select: { citySlug: true, county: true, cost: true, category: true },
  });

  const totalListings = listings.length;
  const totalFree = listings.filter((l) => l.cost === "FREE").length;

  const countyMap = new Map<string, { free: number; total: number }>();
  for (const c of COUNTIES) countyMap.set(c, { free: 0, total: 0 });
  for (const l of listings) {
    const e = countyMap.get(l.county);
    if (!e) continue;
    e.total += 1;
    if (l.cost === "FREE") e.free += 1;
  }
  const countyRows = COUNTIES.map((c) => ({ county: c, ...countyMap.get(c)! })).filter((r) => r.total > 0);
  const cookRow = countyRows.find((r) => r.county === "Cook")!;
  const cookPct = Math.round((100 * cookRow.free) / cookRow.total);

  const cityMap = new Map<string, { free: number; total: number }>();
  for (const l of listings) {
    if (!l.citySlug) continue;
    if (!cityMap.has(l.citySlug)) cityMap.set(l.citySlug, { free: 0, total: 0 });
    const e = cityMap.get(l.citySlug)!;
    e.total += 1;
    if (l.cost === "FREE") e.free += 1;
  }
  const cityRows = CITIES.map((c) => ({ ...c, ...(cityMap.get(c.slug) ?? { free: 0, total: 0 }) })).filter(
    (r) => r.total > 0,
  );
  const maxFree = Math.max(...cityRows.map((r) => r.free));
  const topByFree = cityRows.filter((r) => r.free === maxFree && maxFree > 0).sort((a, b) => a.name.localeCompare(b.name));
  const allFreeSpotlight = cityRows
    .filter((r) => r.total >= 3 && r.free === r.total)
    .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name));

  const catMap = new Map<string, number>();
  for (const l of listings) if (l.cost === "FREE") catMap.set(l.category, (catMap.get(l.category) ?? 0) + 1);
  const catRows = [...catMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([slug, count]) => ({ slug, count, pct: Math.round((100 * count) / totalFree) }));

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
            src="/blog/chicago-suburbs-free-senior-programs-hero.png"
            alt="A group of active older adults walking and talking together outdoors on a wooded trail"
            width={1448}
            height={1086}
            priority
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>

        <p className="mt-6 text-xl leading-relaxed text-ink">
          If you&apos;d asked us to guess before we counted, we&apos;d have guessed wrong. The instinct is
          that the biggest, best-funded corners of Chicagoland — the North Shore, the sprawl of Cook
          County — must be where free senior programming piles up. The instinct is only half right.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-ink">
          We went through our own directory to find out: {totalListings} senior programs across
          Chicagoland, each one checked against its original source, and {totalFree} of them — a clean{" "}
          {Math.round((100 * totalFree) / totalListings)}% — genuinely free to attend. No trial pass, no
          &quot;first class free,&quot; no membership required. Just show up.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-ink">
          Here&apos;s where those free programs actually cluster: by county, by the kind of organization
          running them, and suburb by suburb. One quick, honest note before the numbers, though.{" "}
          <strong>This is a snapshot of what we&apos;ve verified so far, not a census.</strong> We build this
          directory area by area, so some suburbs are more fully catalogued than others right now. If your
          town isn&apos;t on the lists below, it almost certainly has free programs — we just haven&apos;t
          finished researching it yet.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">
          The county pattern: raw count says one thing, the share says another
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Cook County has the most free programs in sheer numbers — {cookRow.free} of them. That&apos;s no
          surprise; it&apos;s the largest county we cover, so it wins on volume almost by default.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          But volume hides the more interesting story. Look at the <em>share</em> of each county&apos;s
          programs that are free, and the picture flips: the collar counties are consistently freer than
          Cook.
        </p>

        <figure className="mt-6 rounded-card bg-card p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
          <Image
            src="/blog/chicago-suburbs-free-senior-programs-county-map.png"
            alt="Map of the seven Chicagoland counties shaded by percent of free senior programs -- Kendall darkest at 100%, Cook lightest at 55%"
            width={1448}
            height={1086}
            className="h-auto w-full"
            sizes="(min-width: 672px) 640px, 100vw"
          />
        </figure>

        <ul className="mt-6 flex flex-col gap-1.5 text-lg text-ink">
          {[...countyRows]
            .sort((a, b) => b.free / b.total - a.free / a.total)
            .map((r) => (
              <li key={r.county}>
                <strong>
                  {r.county} — {Math.round((100 * r.free) / r.total)}% free
                </strong>
                {r.county === "Kendall" && (
                  <span className="text-ink-muted">
                    {" "}
                    (off a small base of {r.total} listings, so read it as an early signal, not settled fact)
                  </span>
                )}
              </li>
            ))}
        </ul>

        <p className="mt-5 text-lg leading-relaxed text-ink">
          Every collar county we track clears 65% free. Cook sits at {cookPct}%. So if &quot;free&quot; is
          your only filter, the counties ringing the city are quietly the better bet — even though Cook
          still offers the most options overall. Both things are true at once, and knowing the difference
          helps you search smarter.
        </p>

        <FreeVsPaidByCountyChart rows={countyRows} />

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">
          Where the free programs actually come from
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Here&apos;s the finding we didn&apos;t expect, and the one most worth acting on:{" "}
          <strong>your local library is the single biggest source of free senior programming in the region.</strong>{" "}
          Not senior centers. Not park districts. Libraries.
        </p>

        <figure className="mt-6 -mx-4 overflow-hidden rounded-card sm:-mx-6">
          <Image
            src="/blog/chicago-suburbs-free-senior-programs-library.png"
            alt="Older adults at a free library technology and creativity class, working on laptops and craft projects together"
            width={1448}
            height={1086}
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
          <figcaption className="bg-flag-blue-tint px-4 py-2 text-sm text-ink-muted sm:px-6">
            A library-hosted technology and creativity class -- exactly the kind of free programming that
            makes up nearly half of everything we&apos;ve catalogued.
          </figcaption>
        </figure>

        <p className="mt-6 text-lg leading-relaxed text-ink">
          Of the {totalFree} free programs we&apos;ve verified, here&apos;s the breakdown by source:
        </p>

        <ul className="mt-4 flex flex-col gap-1.5 text-lg text-ink">
          {catRows.map((c) => (
            <li key={c.slug}>
              <Link href={`/category/${c.slug}`} className="font-bold text-flag-blue-ink no-underline hover:underline">
                {categoryLabel(c.slug)}
              </Link>{" "}
              — {c.count} ({c.pct}% of all free programs)
            </li>
          ))}
        </ul>

        <p className="mt-5 text-lg leading-relaxed text-ink">
          Libraries account for nearly half of everything free. That makes sense once you see it: libraries
          are publicly funded, they&apos;re in almost every suburb, and their whole mission is free access.
          Between the library and the senior center, you&apos;re looking at{" "}
          {(catRows[0]?.pct ?? 0) + (catRows[1]?.pct ?? 0)}% of all free programming in Chicagoland coming
          from just two types of places — both of which are almost certainly within a short drive of
          wherever you live.
        </p>

        <p className="mt-4 text-lg leading-relaxed text-ink">
          The practical takeaway: if you&apos;re starting from scratch, don&apos;t start with a broad Google
          search. Start with your local library&apos;s events calendar. It&apos;s the highest-density source
          of free stuff in the entire region, and it&apos;s the one most people overlook.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">Suburb spotlight: who&apos;s leading right now</h2>

        <p className="mt-4 text-lg leading-relaxed text-ink">
          <strong>Most free programs (raw count).</strong>{" "}
          {topByFree.length > 1
            ? `${topByFree.length} suburbs are currently tied at the top, each with ${maxFree} verified free programs:`
            : `${topByFree[0]?.name} leads with ${maxFree} free programs:`}
        </p>
        <p className="mt-2 text-lg leading-relaxed text-ink">
          {topByFree.map((c, i) => (
            <span key={c.slug}>
              <Link href={`/city/${c.slug}`} className="font-semibold text-flag-blue-ink no-underline hover:underline">
                {c.name}
              </Link>
              {i < topByFree.length - 2 ? ", " : i === topByFree.length - 2 ? ", and " : "."}
            </span>
          ))}
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          It&apos;s a genuinely mixed group — near-north suburbs, western ones, southern ones — which is a
          good reminder that free programming isn&apos;t a &quot;wealthy suburb&quot; perk. It&apos;s spread
          across the map.
        </p>

        {allFreeSpotlight.length > 0 && (
          <>
            <p className="mt-6 text-lg leading-relaxed text-ink">
              <strong>Suburbs where everything is free.</strong> This is the smaller, more interesting list.
              In these {allFreeSpotlight.length} suburbs, <em>every single senior program we&apos;ve catalogued so far</em>{" "}
              (at least three each) is free — not one paid listing among them:
            </p>
            <ul className="mt-3 flex flex-col gap-1.5 text-lg text-ink">
              {allFreeSpotlight.map((c) => (
                <li key={c.slug}>
                  <strong>
                    <Link href={`/city/${c.slug}`} className="text-flag-blue-ink no-underline hover:underline">
                      {c.name}
                    </Link>
                  </strong>{" "}
                  — {c.total} of {c.total} free
                </li>
              ))}
            </ul>
            <p className="mt-4 text-lg leading-relaxed text-ink">
              That 100%-free rate can shift as we add more listings, but for now these towns are punching
              well above their weight for anyone looking to stay active without spending a dime.
            </p>
          </>
        )}

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">How to use this</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">Three things, if you take nothing else away:</p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          <strong>Check the library first.</strong> It&apos;s the densest source of free senior programming in
          Chicagoland by a wide margin.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          <strong>If free is your priority, look to the collar counties.</strong> They run freer than Cook,
          program for program — even though Cook has more total options.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          <strong>Don&apos;t assume your town has nothing</strong> just because it&apos;s not listed above.
          Our directory grows week by week; a missing suburb usually means &quot;not researched yet,&quot;
          not &quot;nothing here.&quot;
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          We&apos;ll keep updating these numbers as we verify more programs across more suburbs. If your town
          is thin in our listings and you know of a great free program we&apos;ve missed,{" "}
          <Link href="/about" className="font-semibold text-flag-blue-ink no-underline hover:underline">
            tell us
          </Link>{" "}
          — that&apos;s exactly how this directory gets better.
        </p>
      </article>

      <section className="mt-14 border-t border-flag-blue-tint-2 pt-8">
        <h2 className="text-xl font-bold text-ink">Find what&apos;s free near you</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/areas"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Explore by Area →</span>
            <span className="text-base text-ink-muted">Browse every city we cover</span>
          </Link>
          <Link
            href="/directory"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Browse the full directory →</span>
            <span className="text-base text-ink-muted">Filter by cost, category, and city</span>
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
