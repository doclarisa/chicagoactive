import Link from "next/link";
import type { MedicareGym, ProgramStatus } from "@/lib/medicareGyms";

const PROGRAM_LABELS: Record<keyof MedicareGym["programs"], string> = {
  silverSneakers: "SilverSneakers",
  renewActive: "Renew Active",
  silverAndFit: "Silver&Fit",
};

function ProgramBadge({ program, status }: { program: string; status: ProgramStatus }) {
  const verified = status === "verified";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-pill px-3 py-1 text-sm font-bold ${
        verified ? "bg-flag-blue-ink text-white" : "border-2 border-ink-muted text-ink-muted"
      }`}
    >
      {verified ? "✓ " : ""}
      {program}
      {!verified ? " — verify" : ""}
    </span>
  );
}

export default function MedicareGymCard({ gym }: { gym: MedicareGym }) {
  return (
    <div className="rounded-card bg-card p-5 shadow-sm ring-1 ring-black/5">
      <h4 className="text-lg font-bold text-ink">{gym.name}</h4>
      <p className="mt-1 text-base text-ink-muted">
        {gym.area}
        {gym.address ? ` — ${gym.address}` : ""}
        {gym.phone ? ` — ${gym.phone}` : ""}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {(Object.keys(PROGRAM_LABELS) as (keyof MedicareGym["programs"])[]).map((key) => (
          <ProgramBadge key={key} program={PROGRAM_LABELS[key]} status={gym.programs[key]} />
        ))}
      </div>

      <dl className="mt-4 space-y-2 text-base text-ink">
        {gym.pool && (
          <div>
            <dt className="inline font-semibold">Pool: </dt>
            <dd className="inline text-ink-muted">{gym.pool}</dd>
          </div>
        )}
        {gym.seniorClasses && (
          <div>
            <dt className="inline font-semibold">Senior-friendly classes: </dt>
            <dd className="inline text-ink-muted">{gym.seniorClasses}</dd>
          </div>
        )}
        {gym.accessibility && (
          <div>
            <dt className="inline font-semibold">Accessibility: </dt>
            <dd className="inline text-ink-muted">{gym.accessibility}</dd>
          </div>
        )}
        {gym.goodToKnow && (
          <div>
            <dt className="inline font-semibold">Good to know: </dt>
            <dd className="inline text-ink-muted">{gym.goodToKnow}</dd>
          </div>
        )}
      </dl>

      {gym.verifyNotes && gym.verifyNotes.length > 0 && (
        <div className="mt-3 rounded-card bg-flag-blue-tint px-4 py-3 text-sm text-flag-blue-ink">
          {gym.verifyNotes.map((note) => (
            <p key={note}>Verify — {note}</p>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        {gym.existingListingSlug ? (
          <Link
            href={`/${gym.existingListingSlug}`}
            className="inline-flex min-h-11 items-center justify-center rounded-pill bg-flag-blue-ink px-5 text-base font-bold text-white no-underline"
          >
            See full listing on our site →
          </Link>
        ) : null}
        <a
          href={gym.sourceUrl}
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
