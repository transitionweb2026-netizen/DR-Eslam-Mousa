import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";

const baseUrl = "https://www.dr-islammoussa.com";
const paths = ["", "about", "services", "videos", "articles", "contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${baseUrl}/${locale}${path ? `/${path}` : ""}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    }))
  );
}
