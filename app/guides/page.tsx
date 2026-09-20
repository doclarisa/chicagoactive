import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES, INDEXED_GUIDE_SLUGS } from "@/lib/guides";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";

const TITLE = "Guides";
const DESCRIPTION =
  "Deeper dives and data breakdowns for active adults 50+ in Chicagoland -- day trips, gyms that take your Medicare fitness benefit, and more.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides" },
  openGraph: { title: `${TITLE} | Active Chicagoland`, description: DESCRIPTION },
};

export default function GuidesIndexPage() {
  const liveGuides = GUIDES.filter((g) => INDEXED_GUIDE_SLUGS.has(g.slug));
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
  ];

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
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
            itemListSchema(liveGuides.map((g) => ({ name: g.title, path: `/guides/${g.slug}` }))),
          ),
        }}
      />
      <Breadcrumbs crumbs={crumbs} />

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{TITLE}</h1>
      <p className="mt-4 text-lg leading-relaxed text-ink">{DESCRIPTION}</p>

      <div className="mt-8 flex flex-col gap-4">
        {liveGuides.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="flex flex-col gap-1 rounded-card bg-card p-5 no-underline shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <span className="text-lg font-bold text-ink">{g.title}</span>
            <span className="text-base text-ink-muted">{g.dek}</span>
          </Link>
        ))}
      </div>

      <p className="mt-8">
        <Link href="/directory" className="text-base font-semibold text-flag-blue-ink no-underline hover:underline">
          ← Back to the free directory
        </Link>
      </p>
    </main>
  );
}
