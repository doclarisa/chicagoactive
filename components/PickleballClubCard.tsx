import type { PickleballClub } from "@/lib/pickleballClubs";

export default function PickleballClubCard({ club }: { club: PickleballClub }) {
  return (
    <div className="rounded-card bg-card p-5 shadow-sm ring-1 ring-black/5">
      <div className="flex flex-wrap items-center gap-2">
        {club.seniorProgram && (
          <span className="inline-flex items-center rounded-pill bg-flag-blue-ink px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            Senior programming
          </span>
        )}
        <h4 className="text-lg font-bold text-ink">{club.name}</h4>
      </div>

      <ul className="mt-2 text-base text-ink-muted">
        {club.locations.map((loc) => (
          <li key={loc.address}>
            {loc.area} — {loc.address}
          </li>
        ))}
      </ul>

      <dl className="mt-4 space-y-2 text-base text-ink">
        {club.seniorProgram && (
          <div>
            <dt className="inline font-semibold">Senior-relevant: </dt>
            <dd className="inline text-ink-muted">{club.seniorProgram}</dd>
          </div>
        )}
        <div>
          <dt className="inline font-semibold">Pricing: </dt>
          <dd className="inline text-ink-muted">{club.pricing}</dd>
        </div>
      </dl>

      {club.note && (
        <div className="mt-3 rounded-card bg-flag-blue-tint px-4 py-3 text-sm text-flag-blue-ink">{club.note}</div>
      )}

      <div className="mt-4">
        <a
          href={club.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center rounded-pill border-2 border-flag-blue-ink px-5 text-base font-bold text-flag-blue-ink no-underline"
        >
          Source &amp; current info →
        </a>
      </div>
    </div>
  );
}
