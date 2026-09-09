import path from "node:path";
import type { NextConfig } from "next";

// next/image refuses to render any remote host that isn't explicitly
// allow-listed here — without this, every image uploaded through the CMS
// (served from Supabase Storage, e.g.
// https://<project-ref>.supabase.co/storage/v1/object/public/media/...)
// fails to render on the public site even though it uploaded successfully
// and previews fine in the admin (whose previews are plain <img> tags, not
// next/image). Derived from NEXT_PUBLIC_SUPABASE_URL so this keeps working
// if a different Supabase project is ever connected.
const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabaseHostname
      ? [{ protocol: "https", hostname: supabaseHostname, pathname: "/storage/v1/object/public/**" }]
      : [],
  },
  turbopack: {
    // Pin the workspace root to this project. Without this, Turbopack walks
    // up from this folder looking for a lockfile and can pick up an
    // unrelated one from a parent/sibling directory (e.g. other projects
    // sharing the same Desktop folder).
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
