import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function Home() {
  const count = await prisma.listing.count({ where: { status: "PUBLISHED" } });

  return (
    <main style={{ padding: 32, fontFamily: "sans-serif" }}>
      <h1>chicagoactiveseniors.com — skeleton</h1>
      <p>
        {count} listing{count === 1 ? "" : "s"} live in the directory.
      </p>
      <p>
        <Link href="/directory">Browse the directory →</Link>
      </p>
    </main>
  );
}
