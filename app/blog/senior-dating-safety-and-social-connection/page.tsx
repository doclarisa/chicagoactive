import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { breadcrumbSchema, articleSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BLOG_POSTS } from "@/lib/blog";

const POST = BLOG_POSTS.find((p) => p.slug === "senior-dating-safety-and-social-connection")!;

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

type Group = { name: string; note: string; sourceUrl: string; image?: string; imageAlt?: string };

const SOCIAL_GROUPS: Group[] = [
  {
    name: "🥂 Chicagoland Widows and Widowers",
    note: "This community has a full calendar: coffee meetups, wine tastings, dinners, comedy shows, and park outings. It has 491 members and a 4.8-star rating (as of September 2026). Good to know: membership is only for widows and widowers. You'll be asked for something like an obituary or death certificate before you're approved. It sounds strict, but it's also why members trust each other.",
    sourceUrl: "https://www.meetup.com/chicagoland-widows-and-widowers/",
  },
  {
    name: "🕊️ Widowed Support Group, Park Ridge",
    note: "This is an ongoing support group (registration required) for anyone who has lost a spouse or partner. It's less a social club and more a steady place to work through loss with people who truly understand. Often, that's the honest first step before anyone is ready to date again. There's no rush.",
    sourceUrl: "https://help4grief.com/listing/widowed-support-group-park-ridge/",
    image: "/blog/senior-dating-support-group.png",
    imageAlt: "A small circle of older adults talking warmly in a softly lit community room",
  },
  {
    name: "✨ Single Black Seniors Network",
    note: "This Chicago social group organizes regular in-person events for a $50 yearly membership. It's a membership club, not a drop-in, so call ahead at 773-405-9020 for the current schedule.",
    sourceUrl: "https://www.facebook.com/Singleblackseniors/",
    image: "/blog/senior-dating-black-couple-dancing.png",
    imageAlt: "A Black couple in their 60s dancing together at an evening event, both smiling",
  },
  {
    name: "🧵 Stitch",
    note: "Stitch is a national platform built specifically for older adults to find friendship, activity partners, and yes, romance. There's no swiping. It has an active community in Chicago. Why it's worth knowing: it was designed around this age group from the start, not retrofitted from an app built for 25-year-olds.",
    sourceUrl: "https://www.stitch.net/",
    image: "/blog/senior-dating-hiking-group.png",
    imageAlt: "A group of seniors laughing together on a hiking trail, chatting like new friends",
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

        <figure className="mt-6 -mx-4 overflow-hidden rounded-card sm:-mx-6">
          <Image
            src={POST.heroImage}
            alt="A silver-haired couple in their late 60s laughing over coffee at a sidewalk cafe table, fall leaves in the background"
            width={1448}
            height={1086}
            priority
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>

        <p className="mt-6 text-xl leading-relaxed text-ink">Butterflies don&apos;t check your birth certificate.</p>

        <p className="mt-5 text-lg leading-relaxed text-ink">
          Maybe you&apos;re divorced. Maybe you&apos;ve lost a spouse. Maybe you just woke up one morning
          and thought, <em>I&apos;d like someone to share Sunday brunch with again.</em> Whatever brought you
          here, wanting to meet someone later in life is completely normal, and you don&apos;t owe anyone an
          explanation.
        </p>

        <p className="mt-5 text-lg leading-relaxed text-ink">
          Before we get to the fun part (where Chicagoland&apos;s single seniors really meet each other), we
          need to talk about the part nobody puts in the brochure. The numbers are serious.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">💔 The $584 Million Problem</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          In 2025, Americans reported losing about $1.48 billion to romance scams.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          People 60 and older lost $584 million of that. That&apos;s 63% of all the money lost, even though
          they filed only 44% of the complaints. In other words, when scammers get to an older adult, they
          take more.
        </p>

        <figure className="mt-6 overflow-hidden rounded-card bg-card shadow-sm ring-1 ring-black/5">
          <Image
            src="/blog/senior-dating-stat.png"
            alt="$584 million lost by adults 60+ in 2025"
            width={1254}
            height={1254}
            className="h-auto w-full max-w-sm mx-auto object-cover"
            sizes="(min-width: 672px) 400px, 80vw"
          />
        </figure>

        <p className="mt-6 text-lg leading-relaxed text-ink">A few more numbers worth remembering:</p>
        <ul className="mt-4 flex flex-col gap-2 text-lg text-ink">
          <li>The median loss for people aged 55 to 64 is about $9,000 per scam.</li>
          <li>Nearly 60% of these scams now start on ordinary social media like Facebook or Instagram, not dating sites.</li>
          <li>Adults aged 50 to 64 get fake romantic approaches at more than double the rate of people 65 and older.</li>
        </ul>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          That last one surprises people. This isn&apos;t only a risk for the very old or the very isolated.
          It&apos;s a risk for anyone past 50 who&apos;s online, which is most of us.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">🚩 Red Flags: The Scammer&apos;s Playbook</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          AARP&apos;s fraud research found the same patterns again and again. If you see even two of these,
          slow down.
        </p>
        <ul className="mt-4 flex flex-col gap-2 text-lg text-ink">
          <li><strong>&quot;I&apos;ve never felt this way before.&quot;</strong> They declare love within days, sometimes within hours.</li>
          <li><strong>They&apos;re always far away.</strong> They&apos;re working on an oil rig, deployed overseas, or on business abroad, and there&apos;s always a reason they can&apos;t meet.</li>
          <li><strong>The camera is always &quot;broken.&quot;</strong> They refuse video calls or keep inventing new excuses.</li>
          <li><strong>Their story and their English don&apos;t match.</strong> They say they&apos;re from Ohio, but the grammar says otherwise.</li>
          <li><strong>&quot;Let&apos;s keep this just between us.&quot;</strong> A request for secrecy is a red flag all by itself.</li>
          <li>Direct questions make them defensive or they change the subject.</li>
          <li>Then comes the crisis. A hospital bill, a legal problem, or a stranded relative, and only your money can fix it.</li>
        </ul>

        <figure className="mt-6 -mx-4 overflow-hidden rounded-card sm:-mx-6">
          <Image
            src="/blog/senior-dating-redflags.png"
            alt="An older woman at her kitchen table looking at her phone with a thoughtful, skeptical expression"
            width={1536}
            height={1024}
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">🛡️ Two Simple Habits That Protect You</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          <strong>1. Tell someone you trust.</strong> Fraud researchers keep pointing to this as the single
          best protection there is. A friend, a sister, or an adult child can see things you can&apos;t from
          inside the relationship. If someone tells you to keep them a secret, that&apos;s exactly when you
          should talk.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          <strong>2. Run a reverse image search on their photo.</strong> It takes 30 seconds on Google Images
          or TinEye. If that handsome &quot;widowed engineer&quot; shows up under a different name somewhere
          else online, the photo is stolen, and so is the story.
        </p>

        <figure className="mt-6 -mx-4 overflow-hidden rounded-card sm:-mx-6">
          <Image
            src="/blog/senior-dating-two-friends.png"
            alt="Two older friends on a porch swing, one showing the other something on her phone"
            width={1448}
            height={1086}
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>

        <div className="mt-6 rounded-card bg-flag-blue-tint px-5 py-4 text-flag-blue-ink">
          <p className="font-bold">The one rule with no exceptions</p>
          <p className="mt-1">
            Never send money, gift cards, or cryptocurrency to someone you haven&apos;t met in person. It
            doesn&apos;t matter how real it feels or how urgent the story sounds. No exceptions.
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">🆘 If It&apos;s Already Happened</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          First, take a breath. You are not foolish. These are professional operations, patient and
          well-rehearsed, and built to get past smart, careful people. It happens to doctors, lawyers, and
          engineers every day.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">Here&apos;s what to do, in order:</p>
        <ul className="mt-4 flex flex-col gap-2 text-lg text-ink">
          <li>Stop all contact right away. Don&apos;t reply, and don&apos;t explain.</li>
          <li>Save everything: messages, photos, and payment receipts. Don&apos;t delete them out of embarrassment. They&apos;re evidence.</li>
          <li>Call your bank or card company immediately. There&apos;s sometimes a short window to reverse a wire transfer or dispute a charge, and it closes fast.</li>
        </ul>
        <p className="mt-4 text-lg leading-relaxed text-ink">Report it in two places:</p>
        <ul className="mt-4 flex flex-col gap-2 text-lg text-ink">
          <li>
            <strong>FBI Internet Crime Complaint Center:</strong>{" "}
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
            <strong>Illinois Attorney General Senior Citizens Consumer Fraud Helpline:</strong>{" "}
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

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">
          ❤️ Now the Good Part: Where Chicagoland Seniors Really Meet People
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          None of this means you should stay home. The best scam protection is also the most romantic one:
          meeting in person. Nobody can fake a face across a dinner table.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          In-person groups also tend to build something more lasting than any profile: friendships first,
          and sometimes more.
        </p>

        <figure className="mt-6 -mx-4 overflow-hidden rounded-card sm:-mx-6">
          <Image
            src="/blog/senior-dating-group-toast.png"
            alt="A lively group of ten seniors at a long restaurant table raising wine glasses in a toast, all laughing"
            width={1448}
            height={1086}
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>

        <div className="mt-6 flex flex-col gap-5">
          {SOCIAL_GROUPS.map((g) => (
            <div key={g.name} className="overflow-hidden rounded-card bg-card shadow-sm ring-1 ring-black/5">
              {g.image && (
                <Image
                  src={g.image}
                  alt={g.imageAlt ?? ""}
                  width={1448}
                  height={1086}
                  className="h-auto w-full object-cover"
                  sizes="(min-width: 672px) 672px, 100vw"
                />
              )}
              <div className="p-5">
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
            </div>
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink">☕ The Secret Nobody Tells You</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          Here&apos;s the least glamorous and most reliable dating advice there is:
        </p>
        <p className="mt-4 text-xl font-bold leading-relaxed text-ink">Show up in the same place twice.</p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          A weekly card game. A walking club. A library coffee hour. Every ordinary thing in our directory
          puts you in a room with the same people, week after week, and that&apos;s how most real
          connections start.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          You don&apos;t need a dating profile to meet someone. You need a reason to come back on Tuesday.
        </p>

        <figure className="mt-8 -mx-4 overflow-hidden rounded-card sm:-mx-6">
          <Image
            src="/blog/senior-dating-lakefront.png"
            alt="An older couple walking side by side on a Chicago lakefront path at golden hour, holding hands"
            width={1448}
            height={1086}
            className="h-auto w-full object-cover"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </figure>
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
            <span className="text-base text-ink-muted">Standing groups where you&apos;ll see the same faces</span>
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
