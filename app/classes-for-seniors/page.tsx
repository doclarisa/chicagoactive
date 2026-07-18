import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

const DESCRIPTION =
  "A routing hub for lifelong-learning programs for seniors across Chicagoland — art classes, computer classes, and book clubs, plus ceramics and language classes woven into the same venues.";

export const metadata = {
  title: "Classes for Seniors in Chicagoland",
  description: DESCRIPTION,
  alternates: { canonical: "/classes-for-seniors" },
  openGraph: { title: "Classes for Seniors in Chicagoland", description: DESCRIPTION },
};

// A hub earns its URL by routing, not by re-listing — no ItemList here.
// 68% of lifelong-learning-tagged listings already live on one of these
// three child pages, so duplicating that content here would just compete
// with them. Ceramics (5) and languages (6) never cleared the 10+ metro
// gate, so they don't have their own page to route to — they're named
// here instead of turned into a dead link.
const CHILDREN = [
  {
    href: "/art-classes-for-seniors",
    label: "Art Classes for Seniors",
    blurb:
      "Including the Park District of Oak Park's ceramics, stained glass, and weaving classes at the Dole Center.",
  },
  {
    href: "/computer-classes-for-seniors",
    label: "Computer Classes for Seniors",
    blurb:
      "Including Plainfield Area Public Library's quarterly technology-class rotation and Chicago's six DFSS Regional Senior Centers.",
  },
  {
    href: "/book-clubs-for-seniors",
    label: "Book Clubs for Seniors",
    blurb:
      "Including Downers Grove Public Library's three distinct senior discussion groups.",
  },
];

export default function ClassesForSeniorsHub() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Directory", path: "/directory" },
          { name: "Classes for Seniors", path: "/classes-for-seniors" },
        ]}
      />

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Classes for Seniors in Chicagoland
      </h1>

      <p className="mt-4 text-lg leading-relaxed text-ink">
        This is a routing page, not another listing dump — most of Chicagoland&apos;s
        lifelong-learning programs already live on one of the pages below. Language classes
        (Skokie Public Library&apos;s Mango Languages access covering 60+ languages) and ceramics
        classes (Park District of Oak Park&apos;s Dole Center) show up woven into the same venues
        as the categories below, without a dedicated page of their own yet.
      </p>

      <ul className="mt-8 space-y-4">
        {CHILDREN.map((c) => (
          <li key={c.href}>
            <Link
              href={c.href}
              className="block rounded-card bg-card p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
            >
              <p className="text-lg font-bold text-flag-blue-ink">{c.label} →</p>
              <p className="mt-1 text-base text-ink-muted">{c.blurb}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
