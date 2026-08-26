export default function SearchBox({ className = "" }: { className?: string }) {
  return (
    <form action="/search" method="GET" role="search" className={className}>
      <label htmlFor="site-search-q" className="sr-only">
        Search by venue, town, or activity
      </label>
      <input
        id="site-search-q"
        type="search"
        name="q"
        placeholder="Search a senior center, town, or activity…"
        className="min-h-11 w-full rounded-pill border border-flag-blue-tint-2 bg-white px-4 text-base text-ink placeholder:text-ink-muted focus:border-flag-blue focus:outline-none"
      />
    </form>
  );
}
