import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root to this project. Without this, Turbopack walks
    // up from this folder looking for a lockfile and can pick up an
    // unrelated one from a parent/sibling directory (e.g. other projects
    // sharing the same Desktop folder).
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
