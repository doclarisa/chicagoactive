"use client";

import { useState } from "react";

type SuburbRow = {
  name: string;
  slug: string;
  count: number;
  population: number;
  per10k: number;
};

const BAR_COLOR = "#0b6f96"; // flag-blue-ink, same token used elsewhere on the site
const BAR_HEIGHT = 22;

export default function SuburbsPerCapitaChart({ rows }: { rows: SuburbRow[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const rowHeight = 34;
  const width = 560;
  const labelWidth = 120;
  const barAreaWidth = width - labelWidth - 56;
  const height = rows.length * rowHeight + 16;
  const maxRate = Math.max(...rows.map((r) => r.per10k));

  return (
    <figure className="mt-6 rounded-card bg-card p-5 shadow-sm ring-1 ring-black/5">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Chicagoland suburbs ranked by verified directory listings per 10,000 residents"
        className="w-full"
      >
        {rows.map((r, i) => {
          const barW = Math.max(Math.round((barAreaWidth * r.per10k) / maxRate), 2);
          const y = i * rowHeight + 8;
          const isHovered = hovered === r.slug;
          return (
            <g
              key={r.slug}
              onMouseEnter={() => setHovered(r.slug)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "default" }}
            >
              <text x={0} y={y + BAR_HEIGHT / 2 + 4} fontSize="13" fontWeight={600} fill="#202733">
                {i + 1}. {r.name}
              </text>
              <rect
                x={labelWidth}
                y={y}
                width={barW}
                height={BAR_HEIGHT}
                rx={4}
                fill={BAR_COLOR}
                opacity={isHovered ? 1 : 0.92}
              />
              <text
                x={labelWidth + barW + 8}
                y={y + BAR_HEIGHT / 2 + 4}
                fontSize="13"
                fontWeight={700}
                fill="#202733"
              >
                {r.per10k.toFixed(1)}
              </text>
              {isHovered && (
                <g>
                  <rect x={labelWidth} y={y - 24} width={190} height={20} rx={4} fill="#202733" />
                  <text x={labelWidth + 8} y={y - 10} fontSize="11" fill="#ffffff">
                    {r.count} listings · pop. {r.population.toLocaleString()}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      <figcaption className="mt-3 text-sm text-ink-muted">
        Verified directory listings per 10,000 residents. Hover a bar for the raw listing count and
        population behind it.
      </figcaption>

      <details className="mt-3">
        <summary className="cursor-pointer text-sm font-semibold text-flag-blue-ink">View as table</summary>
        <table className="mt-2 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-flag-blue-tint-2 text-left text-ink-muted">
              <th className="py-1 pr-4 font-semibold">Suburb</th>
              <th className="py-1 pr-4 font-semibold">Listings</th>
              <th className="py-1 pr-4 font-semibold">Population</th>
              <th className="py-1 font-semibold">Per 10k</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.slug} className="border-b border-flag-blue-tint-2/60 text-ink">
                <td className="py-1 pr-4">{r.name}</td>
                <td className="py-1 pr-4 tabular-nums">{r.count}</td>
                <td className="py-1 pr-4 tabular-nums">{r.population.toLocaleString()}</td>
                <td className="py-1 tabular-nums">{r.per10k.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
