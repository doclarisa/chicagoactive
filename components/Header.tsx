import Link from "next/link";
import FlagMotif from "./FlagMotif";

export default function Header() {
  return (
    <header className="bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight text-ink no-underline sm:text-2xl"
        >
          Active Chicagoland
        </Link>
        <nav aria-label="Main" className="flex flex-wrap items-center gap-2">
          <Link
            href="/"
            className="min-h-11 rounded-pill px-3 py-2 text-base font-semibold text-ink no-underline hover:bg-flag-blue-tint"
          >
            Home
          </Link>
          <Link
            href="/areas"
            className="min-h-11 rounded-pill px-3 py-2 text-base font-semibold text-ink no-underline hover:bg-flag-blue-tint"
          >
            Areas
          </Link>
          <Link
            href="/directory"
            className="min-h-11 rounded-pill px-3 py-2 text-base font-semibold text-ink no-underline hover:bg-flag-blue-tint"
          >
            Directory
          </Link>
        </nav>
      </div>
      <FlagMotif className="mx-auto max-w-5xl px-4 pb-3 sm:px-6" />
    </header>
  );
}
