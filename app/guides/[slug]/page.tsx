import { notFound } from "next/navigation";
import Link from "next/link";
import { GUIDES } from "@/lib/guides";
import { AFFILIATES } from "@/lib/affiliates";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import AffiliateLink from "@/components/AffiliateLink";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.dek,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: { title: guide.title, description: guide.dek },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) notFound();

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/directory"
        className="text-base font-semibold text-flag-blue-ink no-underline hover:underline"
      >
        ← Back to the free directory
      </Link>

      {/* Disclosure near the top of every affiliate page, per the brief. */}
      <div className="mt-4">
        <AffiliateDisclosure />
      </div>

      <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        {guide.title}
      </h1>
      <p className="mt-2 text-lg text-ink-muted">{guide.dek}</p>
      <p className="mt-6 text-lg leading-relaxed text-ink">{guide.intro}</p>

      <div className="mt-8 flex flex-col gap-4">
        {guide.offers.map((offer, i) => {
          const affiliate = AFFILIATES[offer.affiliate];
          return (
            <div
              key={offer.affiliate}
              className="rounded-card bg-card p-5 shadow-sm ring-1 ring-black/5"
            >
              <h2 className="text-lg font-bold text-ink">{affiliate.label}</h2>
              <p className="mt-1 text-base text-ink-muted">{offer.note}</p>
              <div className="mt-4">
                {/* One red CTA per screen — the anchor offer only. */}
                <AffiliateLink href={affiliate.url} variant={i === 0 ? "primary" : "secondary"}>
                  Visit {affiliate.label} →
                </AffiliateLink>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
