import type { Metadata } from "next";
import Link from "next/link";
import { AFFILIATES } from "@/lib/affiliates";
import { breadcrumbSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import AffiliateLink from "@/components/AffiliateLink";

const TITLE = "Online Learning After 60";
const DESCRIPTION =
  "The Great Courses/Wondrium vs. MasterClass for adults 50+ — which one actually fits what you want to learn, plus when a free local library class beats either.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides/online-learning-after-60" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "article" },
  // Affiliate links aren't wired to real tracking URLs yet (see
  // lib/affiliates.ts) -- stay out of the index until they are, per the
  // SEO skill's trust-first sequencing. Flip to true once real IDs are in.
  robots: { index: false, follow: true },
};

export default function OnlineLearningPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Classes for Seniors", path: "/classes-for-seniors" },
    { name: "Online Learning After 60", path: "/guides/online-learning-after-60" },
  ];
  const greatCourses = AFFILIATES.greatCourses;
  const masterClass = AFFILIATES.masterClass;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }}
      />
      <Breadcrumbs crumbs={crumbs} />

      <div className="mt-4">
        <AffiliateDisclosure />
      </div>

      <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{TITLE}</h1>
      <p className="mt-4 text-lg leading-relaxed text-ink">
        Our{" "}
        <Link href="/classes-for-seniors" className="font-semibold text-flag-blue-ink no-underline hover:underline">
          classes for seniors
        </Link>{" "}
        hub covers the free, in-person options — a local library's book club, a park district's computer
        class, a township's Spanish lessons. Those are the right call when you want a room full of other
        people and a set weekly time. But some Tuesdays the best classroom is your own couch, especially
        once winter sets in, and the two platforms below serve genuinely different kinds of learning.
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">
          Which one actually fits what you want?
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-ink">
          These aren't interchangeable — they're built around two different ways of learning, and picking
          the wrong one for what you actually want is the most common reason people try one, don't like it,
          and give up on video courses entirely.
        </p>

        <div className="mt-6 flex flex-col gap-4">
          <div className="rounded-card bg-card p-5 shadow-sm ring-1 ring-black/5">
            <h3 className="text-lg font-bold text-ink">{greatCourses.label}</h3>
            <p className="mt-1 text-base text-ink-muted">{greatCourses.blurb}</p>
            <p className="mt-3 text-base leading-relaxed text-ink">
              Structured like an actual college course — a professor, a syllabus-style sequence of lectures
              (often 12-36 per course), and a real depth of coverage on one subject. Best fit if what you
              actually want is to <em>understand</em> something thoroughly: the history of a specific era,
              how the human body works, the philosophy behind a religion you've always been curious about.
              Less about doing, more about knowing.
            </p>
            <div className="mt-4">
              <AffiliateLink href={greatCourses.url} variant="primary">
                Browse {greatCourses.label} →
              </AffiliateLink>
            </div>
          </div>

          <div className="rounded-card bg-card p-5 shadow-sm ring-1 ring-black/5">
            <h3 className="text-lg font-bold text-ink">{masterClass.label}</h3>
            <p className="mt-1 text-base text-ink-muted">{masterClass.blurb}</p>
            <p className="mt-3 text-base leading-relaxed text-ink">
              One instructor, one skill, taught by someone who's actually mastered it professionally — a
              chef, a novelist, a gardener with decades in the field. Shorter and more hands-on than a
              Great Courses lecture series, built around <em>doing</em> something differently by the end,
              not just understanding it better. Best fit if you have a specific skill or hobby you want to
              get noticeably better at.
            </p>
            <div className="mt-4">
              <AffiliateLink href={masterClass.url} variant="secondary">
                Browse {masterClass.label} →
              </AffiliateLink>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-ink">When the free local option is still better</h2>
        <p className="mt-2 text-base leading-relaxed text-ink">
          If what you actually want is conversation and a standing weekly reason to leave the house, neither
          of these replaces that — a real library book club or a park district discussion group does that
          better, for free. These two are for the subjects and skills that don't have a good free local
          equivalent, or the weeks when the weather or your schedule keeps you home anyway.
        </p>
      </section>

      <section className="mt-14 border-t border-flag-blue-tint-2 pt-8">
        <h2 className="text-xl font-bold text-ink">More ways to keep learning</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/classes-for-seniors"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Classes for Seniors →</span>
            <span className="text-base text-ink-muted">Free, in-person classes across the region</span>
          </Link>
          <Link
            href="/activities/language-classes-for-seniors"
            className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">Language Classes for Seniors →</span>
            <span className="text-base text-ink-muted">Local library and park-district language programs</span>
          </Link>
        </div>
      </section>

      <p className="mt-8">
        <Link href="/directory" className="text-base font-semibold text-flag-blue-ink no-underline hover:underline">
          ← Back to the free directory
        </Link>
      </p>
    </main>
  );
}
