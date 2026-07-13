import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

export default async function ListingDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = await prisma.listing.findUnique({ where: { slug } });

  if (!listing) notFound();

  return (
    <main style={{ padding: 32, fontFamily: "sans-serif" }}>
      <h1>{listing.name}</h1>
      <p>{listing.description}</p>
      <p>
        {listing.city}
        {listing.county ? `, ${listing.county} County` : ""}
      </p>
      <p>Cost: {listing.cost}</p>
    </main>
  );
}
