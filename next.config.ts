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
  experimental: {
    serverActions: {
      // The CMS's media upload (app/admin/actions/media.ts) is a Server
      // Action that receives the whole file as FormData. Next.js caps a
      // Server Action's request body at 1MB by default — far below the
      // "videos" storage bucket's own 500MB limit (0011_storage.sql) — so
      // any real video upload was being rejected before it ever reached
      // that bucket's actual limit or media.ts's own size check. Matching
      // this to the videos bucket's cap lets that check be the real limit.
      bodySizeLimit: "500mb",
    },
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
