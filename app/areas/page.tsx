import type { Metadata } from "next";
import { CITIES } from "@/lib/cities";
import { COUNTIES } from "@/lib/counties";
import AreaCard from "@/components/AreaCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { itemListSchema } from "@/lib/schema";

const DESCRIPTION =
  "Browse free and low-cost senior activities by area across Chicagoland — pick a city and see what's nearby for active adults 50+.";

export const metadata: Metadata = {
  title: "Explore by Area",
  description: DESCRIPTION,
  alternates: { canonical: "/areas" },
  openGraph: { title: "Explore by Area | Active Chicagoland", description: DESCRIPTION },
};

export default function AreasPage() {
  // Grouped by county so a 30-city list stays scannable; new cities in
  // lib/cities.ts show up here automatically, no code change needed.
  const groups = COUNTIES.map((county) => ({
    county,
    cities: CITIES.filter((c) => c.county === county).sort((a, b) => a.name.localeCompare(b.name)),
  })).filter((g) => g.cities.length > 0);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            itemListSchema(CITIES.map((c) => ({ name: c.name, path: `/city/${c.slug}` }))),
          ),
        }}
      />
      <Breadcrumbs crumbs={[{ name: "Home", path: "/" }, { name: "Areas", path: "/areas" }]} />

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Explore by Area
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-ink">
        Free and low-cost things to do for active adults 50+, organized by city — pick where you
        are and see what&apos;s nearby.
      </p>

      {groups.map((group) => (
        <section key={group.county} className="mt-10">
          <h2 className="text-xl font-extrabold tracking-tight text-ink">{group.county} County</h2>
          <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.cities.map((city) => (
              <li key={city.slug}>
                <AreaCard city={city} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
