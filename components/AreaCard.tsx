import Link from "next/link";
import type { CityDef } from "@/lib/cities";

export default function AreaCard({ city }: { city: CityDef }) {
  return (
    <Link
      href={`/city/${city.slug}`}
      className="flex h-full flex-col gap-1.5 rounded-card bg-card p-5 no-underline shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md"
    >
      <h3 className="text-lg font-bold leading-snug text-ink">{city.name}</h3>
      <p className="text-base text-ink-muted">{city.county} County</p>
    </Link>
  );
}
