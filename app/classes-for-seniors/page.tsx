import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

const DESCRIPTION =
  "A routing hub for lifelong-learning programs for seniors across Chicagoland — art classes, computer classes, book clubs, and language classes, plus ceramics woven into the same venues.";

export const metadata = {
  title: "Classes for Seniors in Chicagoland",
  description: DESCRIPTION,
  alternates: { canonical: "/classes-for-seniors" },
  openGraph: { title: "Classes for Seniors in Chicagoland", description: DESCRIPTION },
};

// A hub earns its URL by routing, not by re-listing — no ItemList here.
// Most lifelong-learning-tagged listings already live on one of these four
// child pages, so duplicating that content here would just compete with
// them. Languages cleared the 10+ metro gate in Phase 3 (grew from 6 to 14)
// and got its own page; ceramics (5) still hasn't, so it stays named in
// prose below instead of turned into a dead link.
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
      "Including Plainfield Public Library's quarterly technology-class rotation and Chicago's six DFSS Regional Senior Centers.",
  },
  {
    href: "/book-clubs-for-seniors",
    label: "Book Clubs for Seniors",
    blurb:
      "Including Downers Grove Public Library's three distinct senior discussion groups.",
  },
  {
    href: "/language-classes-for-seniors",
    label: "Language Classes for Seniors",
    blurb:
      "Including Skokie Public Library's Mango Languages access and Indian Prairie Public Library's ESL instruction.",
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
        lifelong-learning programs already live on one of the pages below. Ceramics classes
        (Park District of Oak Park&apos;s Dole Center) show up woven into the same venues as the
        categories below, without a dedicated page of their own yet.
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
