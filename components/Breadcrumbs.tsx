import Link from "next/link";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }}
      />
      <nav aria-label="Breadcrumb" className="text-base text-ink-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          {crumbs.map((c, i) => (
            <li key={c.path} className="flex items-center gap-1.5">
              {i > 0 && (
                <span aria-hidden="true" className="text-ink-muted">
                  /
                </span>
              )}
              {i === crumbs.length - 1 ? (
                <span className="font-semibold text-ink" aria-current="page">
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="text-flag-blue-ink no-underline hover:underline">
                  {c.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
