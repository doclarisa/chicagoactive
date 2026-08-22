import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray lockfile in the parent folder (C:\Users\docla) makes Next.js
  // guess the wrong workspace root; pin it explicitly to this project.
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      // Consolidate to one canonical Day Trips page — the old category
      // index only ever had 2 listings and duplicated the real guide.
      {
        source: "/category/day-trips-near-chicago",
        destination: "/guides/day-trips-from-chicago",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
