import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, articleSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BLOG_POSTS } from "@/lib/blog";

const POST = BLOG_POSTS.find((p) => p.slug === "senior-dating-safety-and-social-connection")!;

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

type Group = { name: string; note: string; sourceUrl: string };

const SOCIAL_GROUPS: Group[] = [
  {
    name: "Chicagoland Widows and Widowers",
    note: "A membership community (491 members as of this research, 4.8 stars) with a genuinely full calendar -- coffee meetups, wine tastings, dinners, comedy shows, park outings. Membership is restricted to widows and widowers; you'll be asked for something like an obituary or death certificate to verify eligibility before you're approved.",
    sourceUrl: "https://www.meetup.com/chicagoland-widows-and-widowers/",
  },
  {
    name: "Widowed Support Group — Park Ridge",
    note: "An ongoing, registration-required support group for anyone who's lost a spouse or significant other. Less \"social club,\" more a steady place to process loss with people who understand it -- which is often the honest first step before anyone's ready to date again.",
    sourceUrl: "https://help4grief.com/listing/widowed-support-group-park-ridge/",
  },
  {
    name: "Single Black Seniors Network",
    note: "A Chicago-based socialization group with a $50/year membership, organizing regular in-person events. Call ahead (773-405-9020) for the current schedule -- it's a membership club, not a drop-in.",
    sourceUrl: "https://www.facebook.com/Singleblackseniors/",
  },
  {
    name: "Stitch",
    note: "A national platform built specifically for older adults to meet people for friendship, activities, and yes, relationships -- explicitly not a swipe-based dating app. It has an active presence in Chicago. Worth knowing about precisely because it was designed around this age group's actual concerns, not retrofitted from a younger platform.",
    sourceUrl: "https://www.stitch.net/",
  },
];

export default function SeniorDatingPost() {
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
          Wanting to meet someone new later in life -- after a divorce, after losing a spouse, or just
          because you&apos;re ready -- is completely normal, and nothing about it needs explaining or
          apologizing for. But the honest starting point for this topic isn&apos;t where to look for
          romance. It&apos;s protecting yourself while you do, because the numbers here are serious.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">The real risk</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          In 2025, Americans reported losing about <strong>$1.48 billion</strong> to romance scams overall.
          Adults 60 and older accounted for <strong>$584 million of that</strong> -- 63% of all reported
          romance-fraud losses, from 44% of the complaints. The median loss for the 55-64 age group runs
          around <strong>$9,000 per incident</strong>. Nearly 60% of these scams now start on an ordinary
          social media platform, not a dating site.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          One detail worth knowing, because it cuts against the stereotype: adults 50-64 are targeted with
          fake romantic approaches at <em>more than double</em> the rate of adults 65 and older. This isn&apos;t
          only a risk for the oldest or most isolated among us -- it's a risk for anyone dating online at
          any age past 50.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">The red flags</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          According to AARP&apos;s fraud research, these are the patterns that show up again and again:
        </p>
        <ul className="mt-4 flex flex-col gap-2 text-lg text-ink">
          <li>They profess love quickly -- often within days, sometimes hours of first contact.</li>
          <li>They claim to live, work, or be traveling abroad, and always have a reason they can&apos;t meet in person.</li>
          <li>They refuse video calls, or make increasingly elaborate excuses to avoid them.</li>
          <li>Their English doesn&apos;t quite match their claimed background, or their grammar is inconsistent.</li>
          <li>They ask you to keep the relationship secret from family or friends -- a major red flag on its own.</li>
          <li>They get defensive or try to change the subject when you ask direct questions.</li>
          <li>Eventually, there&apos;s a crisis -- medical, legal, a stranded relative -- that only money can solve.</li>
        </ul>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">If something feels off</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Two things make an outsized difference. First, <strong>talk to someone you trust</strong> about any
          new relationship, especially one that&apos;s moved online-to-serious quickly -- fraud researchers
          consistently point to this as the single best protection, because an outside perspective catches
          what you can&apos;t see from inside the relationship. Second, <strong>run a reverse image search</strong>{" "}
          on their profile photo. If the same picture shows up attached to a different name somewhere else
          online, it&apos;s stolen, and the person you&apos;re talking to isn&apos;t who their profile says.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          And the bright line: never send money, gift cards, or crypto to someone you haven&apos;t met in
          person, no matter how real the relationship feels or how urgent the story is.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">If it&apos;s already happened</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Stop all contact immediately. Save everything -- messages, photos, payment records -- rather than
          deleting them out of embarrassment; they're evidence. Then report it in two places:
        </p>
        <ul className="mt-4 flex flex-col gap-2 text-lg text-ink">
          <li>
            <strong>FBI Internet Crime Complaint Center</strong> --{" "}
            <a
              href="https://www.ic3.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-flag-blue-ink no-underline hover:underline"
            >
              ic3.gov
            </a>
          </li>
          <li>
            <strong>Illinois Attorney General Senior Citizens Consumer Fraud Helpline</strong> --{" "}
            <a
              href="https://www.illinoisattorneygeneral.gov/rights-of-the-people/senior-advocacy/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-flag-blue-ink no-underline hover:underline"
            >
              1-800-243-5377
            </a>{" "}
            or seniorhelpline@ilag.gov
          </li>
        </ul>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Then contact your bank or card issuer right away -- there&apos;s sometimes a narrow window to
          reverse a wire transfer or dispute a charge, and it closes fast. None of this means you were
          foolish. These operations are professional, patient, and specifically engineered to get past
          smart people.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">
          Where Chicagoland seniors actually meet people
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          None of this means staying home. In-person groups sidestep the entire scam risk simply by being
          in person, and they tend to lead to something more durable than a profile ever does -- real
          friendships first, sometimes more. Four real, Chicagoland-specific options:
        </p>
        <div className="mt-6 flex flex-col gap-4">
          {SOCIAL_GROUPS.map((g) => (
            <div key={g.name} className="rounded-card bg-card p-5 shadow-sm ring-1 ring-black/5">
              <h3 className="text-lg font-bold text-ink">{g.name}</h3>
              <p className="mt-2 text-base text-ink-muted">{g.note}</p>
              <a
                href={g.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-semibold text-flag-blue-ink no-underline hover:underline"
              >
                Source →
              </a>
            </div>
          ))}
        </div>

        <p className="mt-6 text-lg leading-relaxed text-ink">
          And it's worth saying plainly: a standing weekly card game, a walking club, a library coffee hour
          -- any of the ordinary, unglamorous things in our directory -- puts you in a room with the same
          people, regularly, which is how most real connections actually start. You don&apos;t need a
          dating profile to meet someone. You need a reason to show up in the same place twice.
        </p>
      </article>

      <section className="mt-14 border-t border-flag-blue-tint-2 pt-8">
        <h2 className="text-xl font-bold text-ink">Find a reason to show up</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/areas"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Explore by Area →</span>
            <span className="text-base text-ink-muted">Free clubs, classes, and social hours near you</span>
          </Link>
          <Link
            href="/category/senior-center-events"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Senior Center Events →</span>
            <span className="text-base text-ink-muted">Standing groups where you'll see the same faces</span>
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
