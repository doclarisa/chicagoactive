// Two light-blue bars + four red six-pointed stars — the brand's brief
// asks for this as "a subtle brand motif in the header/footer," echoing
// the Chicago flag without reproducing it literally. Purely decorative.
function SixPointedStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 0l2.5 7.2L22 7l-5.8 4.8L18 20l-6-4.4L6 20l1.8-8.2L2 7l7.5.2z"
      />
    </svg>
  );
}

export default function FlagMotif({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`flex flex-col gap-1 ${className}`}
    >
      <div className="h-1.5 rounded-full bg-flag-blue" />
      <div className="flex items-center justify-center gap-4 py-0.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <SixPointedStar key={i} className="h-3 w-3 text-star-red" />
        ))}
      </div>
      <div className="h-1.5 rounded-full bg-flag-blue" />
    </div>
  );
}
