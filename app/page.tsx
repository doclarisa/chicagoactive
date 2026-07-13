import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function Home() {
  const listings = await prisma.listing.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main style={{ padding: 32, fontFamily: "sans-serif" }}>
      <h1>chicagoactiveseniors.com — skeleton</h1>
      <p>Phase 1 smoke test: listings pulled live from Neon via Prisma.</p>
      <ul>
        {listings.map((listing) => (
          <li key={listing.id}>
            <Link href={`/${listing.slug}`}>{listing.name}</Link> — {listing.county} County
          </li>
        ))}
      </ul>
    </main>
  );
}
