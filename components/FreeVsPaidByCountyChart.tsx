"use client";

import { useState } from "react";

type CountyRow = {
  county: string;
  free: number;
  total: number;
};

const FREE_COLOR = "#0b6f96"; // flag-blue-ink
const PAID_COLOR = "#b3001f"; // star-red-ink
const BAR_HEIGHT = 22;
const GAP = 2;

export default function FreeVsPaidByCountyChart({ rows }: { rows: CountyRow[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const sorted = [...rows].sort((a, b) => b.free / b.total - a.free / a.total);
  const rowHeight = 40;
  const width = 560;
  const labelWidth = 96;
  const barAreaWidth = width - labelWidth - 48;
  const height = sorted.length * rowHeight + 20;

  return (
    <figure className="mt-6 rounded-card bg-card p-5 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center gap-4 text-sm font-semibold text-ink">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: FREE_COLOR }} />
          Free
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: PAID_COLOR }} />
          Paid / low-cost
        </span>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Share of free vs. paid senior programs by county, sorted by percent free"
        className="mt-4 w-full"
      >
        {sorted.map((r, i) => {
          const pctFree = r.free / r.total;
          const freeW = Math.round(barAreaWidth * pctFree);
          const paidW = barAreaWidth - freeW - GAP;
          const y = i * rowHeight + 10;
          const isHovered = hovered === r.county;
          return (
            <g
              key={r.county}
              onMouseEnter={() => setHovered(r.county)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "default" }}
            >
              <text x={0} y={y + BAR_HEIGHT / 2 + 4} fontSize="13" fontWeight={600} fill="#202733">
                {r.county}
              </text>
              <rect
                x={labelWidth}
                y={y}
                width={Math.max(freeW, 0)}
                height={BAR_HEIGHT}
                rx={4}
                fill={FREE_COLOR}
                opacity={isHovered ? 1 : 0.92}
              />
              {paidW > 0 && (
                <rect
                  x={labelWidth + freeW + GAP}
                  y={y}
                  width={paidW}
                  height={BAR_HEIGHT}
                  rx={4}
                  fill={PAID_COLOR}
                  opacity={isHovered ? 1 : 0.92}
                />
              )}
              <text
                x={labelWidth + barAreaWidth + 8}
                y={y + BAR_HEIGHT / 2 + 4}
                fontSize="13"
                fontWeight={700}
                fill="#202733"
              >
                {Math.round(pctFree * 100)}%
              </text>
              {isHovered && (
                <g>
                  <rect
                    x={labelWidth}
                    y={y - 22}
                    width={140}
                    height={20}
                    rx={4}
                    fill="#202733"
                  />
                  <text x={labelWidth + 8} y={y - 8} fontSize="11" fill="#ffffff">
                    {r.free} free of {r.total} listed
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      <figcaption className="mt-3 text-sm text-ink-muted">
        Share of each county&apos;s listed senior programs marked free vs. paid/low-cost, based on{" "}
        {sorted.reduce((s, r) => s + r.total, 0)} verified listings in the directory. Hover a bar for exact counts.
      </figcaption>

      <details className="mt-3">
        <summary className="cursor-pointer text-sm font-semibold text-flag-blue-ink">View as table</summary>
        <table className="mt-2 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-flag-blue-tint-2 text-left text-ink-muted">
              <th className="py-1 pr-4 font-semibold">County</th>
              <th className="py-1 pr-4 font-semibold">Free</th>
              <th className="py-1 pr-4 font-semibold">Total listed</th>
              <th className="py-1 font-semibold">% free</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((r) => (
              <tr key={r.county} className="border-b border-flag-blue-tint-2/60 text-ink">
                <td className="py-1 pr-4">{r.county}</td>
                <td className="py-1 pr-4 tabular-nums">{r.free}</td>
                <td className="py-1 pr-4 tabular-nums">{r.total}</td>
                <td className="py-1 tabular-nums">{Math.round((r.free / r.total) * 100)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
