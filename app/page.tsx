import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import CategoryTiles from "@/components/CategoryTiles";
import { organizationSchema, websiteSchema } from "@/lib/schema";

const DESCRIPTION =
  "A free, joyful directory of park district programs, senior center events, library classes, walking groups, pickleball, museum days, and day trips for active adults 50+ in the Chicago area.";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "Active Chicagoland — Things to Do for Active Adults 50+",
    description: DESCRIPTION,
    type: "website",
  },
};

export default async function Home() {
  const count = await prisma.listing.count({ where: { status: "PUBLISHED" } });

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-16">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
      />
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          Find your next Tuesday.
        </h1>
        <p className="mt-4 text-lg text-ink-muted sm:text-xl">
          A free directory of things to do for active adults 50+ across Chicagoland.
        </p>

        {/* One red CTA per screen — this is it. */}
        <Link
          href="/directory"
          className="mt-8 inline-flex min-h-14 items-center justify-center rounded-pill bg-star-red px-8 text-lg font-bold text-white no-underline shadow-sm transition-colors hover:bg-[#c40025]"
        >
          Browse the free directory →
        </Link>

        <p className="mt-4 text-base text-ink-muted">
          {count} thing{count === 1 ? "" : "s"} to do, and counting.
        </p>
      </div>

      <section className="mt-16">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-ink">
          Browse by category
        </h2>
        <div className="mt-6">
          <CategoryTiles />
        </div>
      </section>

      <section className="mt-16 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">Browse by area</h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-ink-muted">
          Find things to do city by city, from Evanston to the far suburbs.
        </p>
        <Link
          href="/areas"
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-pill border-2 border-flag-blue-ink px-6 text-base font-bold text-flag-blue-ink no-underline hover:bg-flag-blue-tint"
        >
          See all areas →
        </Link>
      </section>

      <section className="mt-16 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">Want to go further afield?</h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-ink-muted">
          13 verified day trips from Chicago — driving and train times, honest walking difficulty, and
          senior discounts, all in one guide.
        </p>
        <Link
          href="/guides/day-trips-from-chicago"
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-pill border-2 border-flag-blue-ink px-6 text-base font-bold text-flag-blue-ink no-underline hover:bg-flag-blue-tint"
        >
          See day trips from Chicago →
        </Link>
      </section>
    </main>
  );
}
