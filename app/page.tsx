import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function Home() {
  const count = await prisma.listing.count({ where: { status: "PUBLISHED" } });

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          Find your next Tuesday.
        </h1>
        <p className="mt-4 text-lg text-ink-muted sm:text-xl">
          A free, joyful directory of park district programs, senior center events, library
          classes, walking groups, pickleball, museum days, and day trips for active adults 50+
          across Chicagoland.
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
    </main>
  );
}
