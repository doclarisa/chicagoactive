import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, articleSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BLOG_POSTS } from "@/lib/blog";

const POST = BLOG_POSTS.find((p) => p.slug === "caring-for-aging-parents-sandwich-generation")!;

export const metadata: Metadata = {
  title: POST.title,
  description: POST.dek,
  alternates: { canonical: `/blog/${POST.slug}` },
  openGraph: {
    title: POST.title,
    description: POST.dek,
    type: "article",
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

export default function SandwichGenerationPost() {
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
          If you came to this site looking for a walking group or a pottery class, there&apos;s a good
          chance you&apos;re also the one googling &quot;memory care near me&quot; at 11pm for a parent
          in their 80s. You&apos;re not alone in that, even if it feels like it.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-ink">
          Pew Research found that <strong>45% of people in their 50s</strong> are now caring for an
          aging parent while also supporting their own kids — financially, logistically, or both. AARP
          and the National Alliance for Caregiving put the number of &quot;sandwich generation&quot;
          caregivers nationally at 17 million, putting in an average of 27 hours of care a week on top
          of everything else in their lives.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-ink">
          So if this is where you are right now, here&apos;s an honest starting point — not a sales
          pitch, just the actual sequence of calls and questions that gets you from &quot;I don&apos;t
          know where to begin&quot; to an actual plan.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">
          1. Make One Free Call Before You Search Anything
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Before you fall down a search-engine rabbit hole, call a real person who isn&apos;t selling
          anything. Illinois&apos; <strong>Senior HelpLine</strong> (1-800-252-8966, weekdays 8:30am–5pm,
          711 for TRS) is run by the state, not a placement agency — they can explain what you actually
          qualify for and route you to the right local agency for your county.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          If your parent lives in suburban Cook County specifically,{" "}
          <a
            href="https://www.ageoptions.org"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-flag-blue-ink underline"
          >
            AgeOptions
          </a>{" "}
          (708-383-0258) is the local Area Agency on Aging — they coordinate home-delivered meals,
          benefits counseling, and caregiver support, and a lot of what they do is simply pointing
          families in the right direction for free.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">
          2. Compare Options Through More Than One Source
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Once you know what level of care you&apos;re looking for — independent living, assisted
          living, memory care, or skilled nursing — it helps to look at more than one list, since no
          single directory covers everything.
        </p>
        <ul className="mt-4 flex flex-col gap-2 text-lg text-ink">
          <li>
            <a
              href="https://www.chicagocareforseniors.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-flag-blue-ink underline"
            >
              Chicago Care for Seniors
            </a>{" "}
            is a free directory specifically for Chicago and the collar counties, searchable by county
            and care type, with price estimates where available.
          </li>
          <li>
            <strong>Medicare Care Compare</strong> (
            <a
              href="https://www.medicare.gov/care-compare/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-flag-blue-ink underline"
            >
              medicare.gov/care-compare
            </a>
            ) is the federal government&apos;s own star-rating and inspection-history tool for every
            Medicare- and Medicaid-certified nursing home — a good independent cross-check on anything
            a facility tells you directly.
          </li>
        </ul>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">
          3. Tour in Person, and Ask the Uncomfortable Questions
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          No website replaces walking the halls. A few things worth asking directly, drawn from what
          elder-care advocates consistently flag as warning signs:
        </p>
        <ul className="mt-4 flex flex-col gap-2 text-lg text-ink">
          <li>
            <strong>Staffing:</strong> What&apos;s the staff-to-resident ratio, and how long has the
            core staff been there? High turnover is a real signal.
          </li>
          <li>
            <strong>Memory care specifically:</strong> How are staff trained to redirect someone who&apos;s
            agitated or confused, rather than just sedate or restrain?
          </li>
          <li>
            <strong>The full cost, in writing:</strong> Vague answers about pricing, or pressure to sign
            and put down a deposit the same day, are both worth walking away from.
          </li>
          <li>
            <strong>What happens as needs increase:</strong> Ask directly what triggers a required
            move-out, and how much notice a family gets.
          </li>
          <li>
            <strong>Inspection and complaint history:</strong> A facility that gets defensive when you
            ask about past inspections is telling you something.
          </li>
        </ul>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          If you ever need to report a real concern about a licensed Illinois facility, the state
          Nursing Home Hotline (1-800-252-4343) takes complaints 24 hours a day. For suspected abuse,
          neglect, or financial exploitation of an older adult anywhere in Illinois, the Adult
          Protective Services hotline is 1-866-800-1409, also 24/7.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">
          4. Don&apos;t Disappear From Your Own Life
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          This is the part caregiving advice usually skips. Caring for a parent while you&apos;re also
          50-plus yourself isn&apos;t just logistics — it&apos;s a real strain on your own health and
          social life, right at an age when staying active matters most for you too.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          A few free or low-cost things worth knowing about: Rush University Medical Center&apos;s{" "}
          <Link href="/rush-generations" className="font-semibold text-flag-blue-ink no-underline hover:underline">
            Rush Generations
          </Link>{" "}
          program runs free caregiver and memory-loss support groups alongside its regular fitness
          classes, open to anyone regardless of whether you&apos;re a Rush patient. And the rest of our
          directory is built around exactly the kind of low-commitment, drop-in activity that fits
          around a caregiving schedule — a walk, a library class, an hour of cards — rather than
          something that demands a standing weekly slot you can&apos;t guarantee.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          <Link href="/directory" className="font-semibold text-flag-blue-ink no-underline hover:underline">
            Browse the full directory →
          </Link>
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">One Honest Note</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Every family&apos;s situation is different, and nothing here replaces a conversation with
          your parent&apos;s doctor, an elder-law attorney, or a geriatric care manager for anything
          involving legal or medical decisions. This is meant as a starting point for the first phone
          calls, not the whole plan.
        </p>
      </article>

      <section className="mt-14 border-t border-flag-blue-tint-2 pt-8">
        <h2 className="text-xl font-bold text-ink">Explore the directory</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/rush-generations"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Rush Generations →</span>
            <span className="text-base text-ink-muted">Free caregiver support groups, open to all</span>
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
