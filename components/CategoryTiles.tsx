import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { categoryStyle } from "@/lib/categoryStyles";

export default function CategoryTiles() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {CATEGORIES.map((c) => {
        const style = categoryStyle(c.slug);
        return (
          <li key={c.slug}>
            <Link
              href={`/category/${c.slug}`}
              className={`flex min-h-24 flex-col items-center justify-center gap-1 rounded-card ${style.tint} p-4 text-center no-underline`}
            >
              <span className="text-3xl" aria-hidden="true">
                {style.icon}
              </span>
              <span className={`text-sm font-bold ${style.ink}`}>{c.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
