import type { Tier2Chain } from "@/lib/medicareGyms";

const PROGRAM_LABELS: { key: keyof Tier2Chain["programs"]; label: string }[] = [
  { key: "silverSneakers", label: "SilverSneakers" },
  { key: "renewActive", label: "Renew Active" },
  { key: "silverAndFit", label: "Silver&Fit" },
];

export default function Tier2ChainCard({ chain }: { chain: Tier2Chain }) {
  const acceptedPrograms = PROGRAM_LABELS.filter((p) => chain.programs[p.key]);

  return (
    <div className="rounded-card bg-card p-5 shadow-sm ring-1 ring-black/5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-pill border-2 border-flag-blue-ink px-3 py-1 text-xs font-bold uppercase tracking-wide text-flag-blue-ink">
          High confidence
        </span>
        <h4 className="text-lg font-bold text-ink">{chain.chainName}</h4>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {acceptedPrograms.map((p) => (
          <span
            key={p.key}
            className="inline-flex items-center rounded-pill border-2 border-flag-blue-ink px-3 py-1 text-sm font-bold text-flag-blue-ink"
          >
            {p.label}
          </span>
        ))}
      </div>

      <p className="mt-3 text-base text-ink-muted">{chain.programNote}</p>
      <p className="mt-2 text-base font-semibold text-ink">
        This chain generally accepts {acceptedPrograms.map((p) => p.label).join(", ")} — confirm your
        specific plan and location before you go.
      </p>

      <div className="mt-4">
        <p className="text-sm font-bold uppercase tracking-wide text-ink-muted">
          {chain.locations.length} location{chain.locations.length === 1 ? "" : "s"} in the metro
        </p>
        <ul className="mt-2 grid grid-cols-1 gap-1.5 text-base text-ink sm:grid-cols-2">
          {chain.locations.map((loc) => (
            <li key={loc.address} className="text-ink-muted">
              {loc.city} — {loc.address}
              {loc.phone ? ` (${loc.phone})` : ""}
            </li>
          ))}
        </ul>
      </div>

      {chain.closedLocationsNote && (
        <div className="mt-3 rounded-card bg-flag-blue-tint px-4 py-3 text-sm text-flag-blue-ink">
          {chain.closedLocationsNote}
        </div>
      )}

      <div className="mt-4">
        <a
          href={chain.programSourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center rounded-pill border-2 border-flag-blue-ink px-5 text-base font-bold text-flag-blue-ink no-underline"
        >
          Source →
        </a>
      </div>
    </div>
  );
}
