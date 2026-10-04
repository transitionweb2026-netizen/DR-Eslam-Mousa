import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { PUBLIC_PATHS, absoluteUrl, buildAlternates, localizedPath } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_PATHS.flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizedPath(locale, path)),
      alternates: { languages: buildAlternates(locale, path).languages },
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    }))
  );
}
