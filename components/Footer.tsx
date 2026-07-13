import FlagMotif from "./FlagMotif";

export default function Footer() {
  return (
    <footer className="mt-auto bg-white">
      <FlagMotif className="mx-auto max-w-5xl px-4 pt-3 sm:px-6" />
      <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-ink-muted sm:px-6">
        <p>Active Chicagoland — free things to do for active adults 50+ in the Chicago area.</p>
      </div>
    </footer>
  );
}
