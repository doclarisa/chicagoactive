import type { Tier3Gym } from "@/lib/medicareGyms";

export default function Tier3List({ gyms, sourceUrl }: { gyms: Tier3Gym[]; sourceUrl: string }) {
  if (gyms.length === 0) return null;
  return (
    <section className="mt-10 rounded-card border-2 border-dashed border-ink-muted bg-white p-5">
      <h3 className="text-lg font-bold text-ink-muted">
        Reported to accept a Medicare benefit ({gyms.length})
      </h3>
      <p className="mt-2 text-base text-ink-muted">
        Named on a third-party roundup with a real address — we couldn&apos;t independently confirm program
        acceptance. Call before you go. These graduate to the verified list above as we confirm them
        directly.
      </p>
      <ul className="mt-4 grid grid-cols-1 gap-2 text-base sm:grid-cols-2">
        {gyms.map((gym) => (
          <li key={`${gym.name}-${gym.address}`} className="rounded-card bg-flag-blue-tint/40 p-3">
            <p className="font-semibold text-ink-muted">{gym.name}</p>
            <p className="text-ink-muted">{gym.address}</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-ink-muted">
        Source:{" "}
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-flag-blue-ink no-underline hover:underline"
        >
          third-party SilverSneakers-location roundup
        </a>
        .
      </p>
    </section>
  );
}
