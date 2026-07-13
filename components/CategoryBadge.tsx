import { categoryLabel } from "@/lib/categories";
import { categoryStyle } from "@/lib/categoryStyles";

export default function CategoryBadge({ category }: { category: string }) {
  const style = categoryStyle(category);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill ${style.tint} px-3 py-1 text-sm font-semibold ${style.ink}`}
    >
      <span aria-hidden="true">{style.icon}</span>
      {categoryLabel(category)}
    </span>
  );
}
