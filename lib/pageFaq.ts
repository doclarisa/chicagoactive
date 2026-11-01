import type { getPublishedListingsSafe } from "./db";
import type { FaqItem } from "./schema";

type Listing = Awaited<ReturnType<typeof getPublishedListingsSafe>>[number];

// Shared by /city/[citySlug] and /category/[category] -- both are the kind
// of "mostly a grid of cards" page that tends to stall on page 2. Rather
// than templated boilerplate repeated on 100+ pages (which reads as thin
// to both a person and a search engine), every answer is computed from
// that page's own real listings, so the same two questions get a
// genuinely different answer on a page where everything's free vs. one
// where half the listings charge a fee.
export function computePageFaqStats(listings: Listing[]) {
  const total = listings.length;
  const freeCount = listings.filter((l) => l.cost === "FREE").length;
  const dropInCount = listings.filter((l) => l.dropIn === true).length;
  const registrationRequiredCount = listings.filter((l) => l.registrationRequired === true).length;
  // lastVerified arrives as a real Date when this list came straight from
  // Prisma, but as an ISO string when it came through getPublishedListingsSafe's
  // unstable_cache (which JSON-serializes its cached return value) -- normalize
  // both through `new Date(...)` rather than assuming either shape.
  const verifiedDates = listings
    .map((l) => l.lastVerified)
    .filter((d) => d != null)
    .map((d) => new Date(d as unknown as string))
    .filter((d) => !Number.isNaN(d.getTime()));
  const mostRecentlyVerified =
    verifiedDates.length > 0 ? new Date(Math.max(...verifiedDates.map((d) => d.getTime()))) : null;
  return { total, freeCount, dropInCount, registrationRequiredCount, mostRecentlyVerified };
}

function isFreeAnswer(stats: ReturnType<typeof computePageFaqStats>): string {
  const { total, freeCount } = stats;
  if (total === 0) return "We don't have any verified listings here yet — check back soon.";
  if (freeCount === total) {
    return total === 1
      ? "Yes — this program is completely free to attend."
      : "Yes — every program listed here is completely free to attend.";
  }
  if (freeCount === 0) {
    return "Not all of them. These are low-cost or paid programs with senior-friendly pricing — check each listing for its exact cost.";
  }
  return `Most are. ${freeCount} of the ${total} programs listed here are completely free; the rest are low-cost, with the exact price on each listing.`;
}

function registrationAnswer(stats: ReturnType<typeof computePageFaqStats>): string {
  const { total, dropInCount, registrationRequiredCount } = stats;
  if (total === 0) return "Nothing to register for yet — this page is still being built out.";
  if (dropInCount === total) {
    return "No — every program here is drop-in, so you can just show up.";
  }
  if (registrationRequiredCount === total) {
    return "Yes — every program here asks you to register in advance. Each listing links to the sign-up when one exists.";
  }
  if (dropInCount > 0 && registrationRequiredCount > 0) {
    return `It depends on the program. ${dropInCount} of ${total} are drop-in, no registration needed, while others ask you to sign up ahead of time — each listing says which.`;
  }
  return "It varies by program — check each listing's registration details, since not every organizer states it the same way.";
}

export function buildPageFaq(listings: Listing[]): FaqItem[] {
  const stats = computePageFaqStats(listings);
  if (stats.total === 0) return [];
  return [
    { question: "Is it free?", answer: isFreeAnswer(stats) },
    { question: "Do I need to register?", answer: registrationAnswer(stats) },
  ];
}

export function formatLastVerified(listings: Listing[]): string | null {
  const { mostRecentlyVerified } = computePageFaqStats(listings);
  if (!mostRecentlyVerified) return null;
  return mostRecentlyVerified.toLocaleDateString("en-US", { year: "numeric", month: "long" });
}
