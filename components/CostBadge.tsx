const COST_LABELS: Record<string, string> = {
  FREE: "Free",
  LOW_COST: "$",
  PAID: "$$",
};

export default function CostBadge({ cost }: { cost: string }) {
  const label = COST_LABELS[cost] ?? cost;
  const isFree = cost === "FREE";

  return (
    <span
      className={`inline-flex items-center rounded-pill px-3 py-1 text-sm font-bold ${
        isFree ? "bg-star-red text-white" : "bg-flag-blue-tint text-flag-blue-ink"
      }`}
    >
      {label}
    </span>
  );
}
