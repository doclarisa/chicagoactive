import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";
import { TOTAL_GYM_COUNT } from "@/lib/medicareGyms";

type LobbyCard = {
  icon: string;
  title: string;
  value: string;
  href?: string;
  count?: string;
};

const CARDS: LobbyCard[] = [
  {
    icon: "💪",
    title: "Medicare Fitness Benefit Gyms",
    value: "Use your SilverSneakers, Renew Active, or Silver&Fit benefit",
    href: "/guides/medicare-fitness-gyms",
    count: `${TOTAL_GYM_COUNT}+ gyms`,
  },
  {
    icon: "🏓",
    title: "Indoor Pickleball & Courts",
    value: "Drop-in courts, leagues, and lessons across Chicagoland",
    href: "/activities/pickleball-for-seniors",
    count: "56 listings",
  },
  {
    icon: "🧘",
    title: "Gentle Yoga & Tai Chi",
    value: "Low-impact classes built for balance and flexibility",
    href: "/activities/yoga-for-seniors",
    count: "45 listings",
  },
  {
    icon: "🏊",
    title: "Water Aerobics & Senior Swim",
    value: "Warm-water classes and open senior swim hours",
    href: "/activities/water-aerobics-for-seniors",
    count: "32 listings",
  },
];

export default function FitnessLobby() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Directory", path: "/directory" },
          { name: "Pickleball & Fitness", path: "/category/pickleball-fitness" },
        ]}
      />

      <div className="mt-4 flex items-center gap-3">
        <span
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-card bg-cat-pink-tint text-3xl"
          aria-hidden="true"
        >
          🏓
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Pickleball &amp; Fitness
        </h1>
      </div>

      <p className="mt-4 text-lg leading-relaxed text-ink">
        Where do you want to start? Pick a collection below.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CARDS.map((card) =>
          card.href ? (
            <Link
              key={card.title}
              href={card.href}
              className="flex flex-col gap-1 rounded-card bg-flag-blue-tint p-5 no-underline ring-1 ring-black/5 transition-shadow hover:shadow-md"
            >
              <span className="text-2xl" aria-hidden="true">
                {card.icon}
              </span>
              <span className="text-lg font-bold text-ink">{card.title}</span>
              <span className="text-base text-ink-muted">{card.value}</span>
              {card.count && (
                <span className="mt-1 text-sm font-bold text-flag-blue-ink">{card.count}</span>
              )}
            </Link>
          ) : (
            <div
              key={card.title}
              className="flex flex-col gap-1 rounded-card bg-card p-5 opacity-80 ring-1 ring-black/5"
            >
              <span className="text-2xl" aria-hidden="true">
                {card.icon}
              </span>
              <span className="text-lg font-bold text-ink">{card.title}</span>
              <span className="text-base text-ink-muted">{card.value}</span>
              <span className="mt-1 inline-flex w-fit items-center rounded-pill bg-flag-blue-tint px-3 py-1 text-sm font-bold text-flag-blue-ink">
                Coming soon
              </span>
            </div>
          ),
        )}
      </div>

      <p className="mt-10 text-base text-ink-muted">
        Looking for a specific pickleball or fitness listing?{" "}
        <Link
          href="/directory?category=pickleball-fitness"
          className="font-semibold text-flag-blue-ink no-underline hover:underline"
        >
          Browse the full directory
        </Link>
        , or see{" "}
        <Link
          href="/guides/pickleball-facilities"
          className="font-semibold text-flag-blue-ink no-underline hover:underline"
        >
          dedicated indoor pickleball clubs
        </Link>{" "}
        — commercial facilities separate from park-district courts.
      </p>
    </main>
  );
}
