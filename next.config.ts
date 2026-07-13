import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray lockfile in the parent folder (C:\Users\docla) makes Next.js
  // guess the wrong workspace root; pin it explicitly to this project.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
