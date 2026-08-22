import Link from "next/link";
import type { OrganizedTripProvider } from "@/lib/organizedTrips";
import AffiliateLink from "./AffiliateLink";

export default function OrganizedTripProviderCard({ provider }: { provider: OrganizedTripProvider }) {
  return (
    <div className="rounded-card bg-card p-5 shadow-sm ring-1 ring-black/5">
      <h4 className="text-lg font-bold text-ink">{provider.name}</h4>
      <p className="mt-1 text-base text-ink-muted">{provider.blurb}</p>

      <dl className="mt-4 space-y-2 text-base text-ink">
        {provider.departure && (
          <div>
            <dt className="inline font-semibold">Where trips depart: </dt>
            <dd className="inline text-ink-muted">{provider.departure}</dd>
          </div>
        )}
        <div>
          <dt className="inline font-semibold">Typical cost: </dt>
          <dd className="inline text-ink-muted">{provider.cost}</dd>
        </div>
        <div>
          <dt className="inline font-semibold">Who can join: </dt>
          <dd className="inline text-ink-muted">{provider.whoCanJoin}</dd>
        </div>
        <div>
          <dt className="inline font-semibold">How to sign up: </dt>
          <dd className="inline text-ink-muted">{provider.howToSignUp}</dd>
        </div>
      </dl>

      {provider.verifyNotes && provider.verifyNotes.length > 0 && (
        <div className="mt-3 rounded-card bg-flag-blue-tint px-4 py-3 text-sm text-flag-blue-ink">
          {provider.verifyNotes.map((note) => (
            <p key={note}>Verify — {note}</p>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        {provider.existingListingSlug ? (
          <Link
            href={`/${provider.existingListingSlug}`}
            className="inline-flex min-h-11 items-center justify-center rounded-pill bg-flag-blue-ink px-5 text-base font-bold text-white no-underline"
          >
            See full listing on our site →
          </Link>
        ) : null}
        <a
          href={provider.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center rounded-pill border-2 border-flag-blue-ink px-5 text-base font-bold text-flag-blue-ink no-underline"
        >
          Current trips &amp; schedule →
        </a>
        {provider.bookingUrl && (
          <AffiliateLink href={provider.bookingUrl} variant="secondary">
            Explore trips →
          </AffiliateLink>
        )}
      </div>
    </div>
  );
}
