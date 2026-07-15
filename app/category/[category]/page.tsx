import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { CATEGORIES } from "@/lib/categories";
import { categoryStyle } from "@/lib/categoryStyles";
import ListingCard from "@/components/ListingCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { itemListSchema } from "@/lib/schema";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) return {};
  const description = `Free and low-cost ${cat.label.toLowerCase()} for active adults 50+ across the Chicago area.`;
  return {
    title: `${cat.label} in Chicagoland`,
    description,
    alternates: { canonical: `/category/${cat.slug}` },
    openGraph: { title: `${cat.label} in Chicagoland`, description },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  const listings = await prisma.listing.findMany({
    where: { status: "PUBLISHED", category },
    orderBy: { name: "asc" },
  });

  const style = categoryStyle(category);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      {listings.length > 0 && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              itemListSchema(listings.map((l) => ({ name: l.name, path: `/${l.slug}` }))),
            ),
          }}
        />
      )}
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Directory", path: "/directory" },
          { name: cat.label, path: `/category/${cat.slug}` },
        ]}
      />

      <div className="mt-4 flex items-center gap-3">
        <span
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-card ${style.tint} text-3xl`}
          aria-hidden="true"
        >
          {style.icon}
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          {cat.label}
        </h1>
      </div>

      <p className="mt-3 text-lg text-ink-muted">
        {listings.length} free and low-cost listing{listings.length === 1 ? "" : "s"} across
        Chicagoland.
      </p>

      {listings.length === 0 ? (
        <p className="mt-6 text-lg text-ink-muted">Nothing here yet — check back soon.</p>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((l) => (
            <li key={l.id}>
              <ListingCard listing={l} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
