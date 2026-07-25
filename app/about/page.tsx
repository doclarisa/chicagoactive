import Breadcrumbs from "@/components/Breadcrumbs";

const DESCRIPTION =
  "What Active Chicagoland is, how listings get verified, and how to reach us with a correction or a program to add.";

export const metadata = {
  title: "About",
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: { title: "About | Active Chicagoland", description: DESCRIPTION },
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs crumbs={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        About Active Chicagoland
      </h1>

      <p className="mt-6 text-lg leading-relaxed text-ink">
        Active Chicagoland is a free directory of things to do for active adults 50+ across
        Chicago and its seven surrounding counties — Cook, DuPage, Will, Lake, Kane, McHenry,
        and Kendall. Park district programs, senior center events, library classes, day trips,
        fitness, card games, and more, organized by county, city, and activity.
      </p>

      <p className="mt-4 text-lg leading-relaxed text-ink">
        There&apos;s no cost to be listed, no pay-to-play placement, and no ads inside the
        listings themselves.
      </p>

      <h2 className="mt-10 text-xl font-extrabold tracking-tight text-ink">
        How listings are verified
      </h2>
      <p className="mt-3 text-lg leading-relaxed text-ink">
        Every listing is built from that organization&apos;s own published information — never
        guessed or inferred. If a detail like an address, phone number, or schedule isn&apos;t
        publicly stated, we leave it blank rather than fill it in with a best guess. Each
        listing page shows a &quot;Verified [date]&quot; line marking when we last confirmed the
        facts against the source, and we periodically re-check listings so that date stays
        meaningful rather than frozen at launch.
      </p>
      <p className="mt-4 text-lg leading-relaxed text-ink">
        Programs change — schedules shift seasonally, fees change, staff change. If something on
        our site is out of date, telling us is the fastest way to get it fixed.
      </p>

      <h2 className="mt-10 text-xl font-extrabold tracking-tight text-ink">Contact</h2>
      <p className="mt-3 text-lg leading-relaxed text-ink">
        Spot an error, run a program we should add, or want to link back to us? Email{" "}
        <a href="mailto:info@chicagoactiveseniors.com" className="text-flag-blue-ink underline">
          info@chicagoactiveseniors.com
        </a>
        .
      </p>
    </main>
  );
}
