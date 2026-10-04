import type { Metadata } from "next";
import { locales, localeTag, type Locale } from "@/lib/i18n/config";
import type { Localized } from "@/lib/types";

export const SITE_URL = "https://dr-islammousa.com";

export const PUBLIC_PATHS = ["", "about", "services", "videos", "articles", "contact"] as const;
export type PublicPath = (typeof PUBLIC_PATHS)[number];

export const OG_IMAGE_PATH = "/og-image.png";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

export function localizedPath(locale: Locale, path: string): string {
  return `/${locale}${path ? `/${path}` : ""}`;
}

/**
 * Canonical + hreflang for one page. Every URL is absolute on the canonical
 * domain, and each locale's canonical points at itself — Arabic and English
 * are alternates of each other, never canonicals of one another.
 */
export function buildAlternates(locale: Locale, path: string) {
  const languages = Object.fromEntries(
    locales.map((loc) => [loc, absoluteUrl(localizedPath(loc, path))])
  );
  return {
    canonical: absoluteUrl(localizedPath(locale, path)),
    languages: { ...languages, "x-default": absoluteUrl(localizedPath("en", path)) },
  };
}

/** Fallback copy used only when Supabase has no page_seo row for a route. */
export const PAGE_SEO_FALLBACK: Record<PublicPath, { title: Localized; description: Localized }> = {
  "": {
    title: {
      en: "Dr. Islam Mousa | Orthopedic & Joint Replacement Surgeon",
      ar: "د. إسلام موسى | استشاري جراحة العظام والمفاصل",
    },
    description: {
      en: "Dr. Islam Mousa is an orthopedic surgeon specializing in joint replacement, arthroscopic surgery and sports injuries — combining surgical precision with patient-centered, modern care.",
      ar: "د. إسلام موسى استشاري جراحة العظام والمفاصل، متخصص في جراحات استبدال المفاصل والمناظير وإصابات الملاعب، يجمع بين الدقة الجراحية والرعاية الحديثة المتمحورة حول المريض.",
    },
  },
  about: {
    title: { en: "About Dr. Islam Mousa | Orthopedic Surgeon", ar: "عن د. إسلام موسى | استشاري جراحة العظام" },
    description: {
      en: "Dr. Islam Mousa combines surgical precision, modern technique and genuine, patient-centered care — a career built one careful diagnosis at a time.",
      ar: "يجمع د. إسلام موسى بين الدقة الجراحية والأساليب الحديثة والرعاية الحقيقية المتمحورة حول المريض.",
    },
  },
  services: {
    title: { en: "Services & Conditions | Dr. Islam Mousa", ar: "الخدمات والحالات | د. إسلام موسى" },
    description: {
      en: "From full surgical specialties to the everyday conditions that bring patients in, explore every treatment Dr. Islam Mousa provides.",
      ar: "من التخصصات الجراحية الكاملة إلى الحالات اليومية، تعرف على كل علاج يقدمه د. إسلام موسى.",
    },
  },
  videos: {
    title: { en: "Video Library | Dr. Islam Mousa", ar: "مكتبة الفيديو | د. إسلام موسى" },
    description: {
      en: "Short, practical explanations of common orthopedic conditions, treatments and recovery from Dr. Islam Mousa.",
      ar: "شروحات قصيرة وعملية لأشهر حالات العظام وعلاجاتها من د. إسلام موسى.",
    },
  },
  articles: {
    title: { en: "Articles | Dr. Islam Mousa", ar: "مقالات | د. إسلام موسى" },
    description: {
      en: "Easy-to-understand articles on orthopedic health from Dr. Islam Mousa's clinic.",
      ar: "مقالات سهلة الفهم حول صحة العظام والمفاصل من عيادة د. إسلام موسى.",
    },
  },
  contact: {
    title: { en: "Contact Us | Dr. Islam Mousa", ar: "تواصل معنا | د. إسلام موسى" },
    description: {
      en: "Call, message on WhatsApp, or send a quick note — Dr. Islam Mousa's clinic is ready to help you take the next step.",
      ar: "اتصل بنا، أو راسلنا عبر واتساب، أو أرسل رسالة سريعة، فعيادة د. إسلام موسى جاهزة لمساعدتك.",
    },
  },
};

/** Breadcrumb labels for every non-home route. */
export const PAGE_BREADCRUMB_LABEL: Record<Exclude<PublicPath, "">, Localized> = {
  about: { en: "About", ar: "عن الدكتور" },
  services: { en: "Services", ar: "الخدمات" },
  videos: { en: "Videos", ar: "الفيديوهات" },
  articles: { en: "Articles", ar: "المقالات" },
  contact: { en: "Contact Us", ar: "تواصل معنا" },
};

export const HOME_BREADCRUMB_LABEL: Localized = { en: "Home", ar: "الرئيسية" };

export interface PageSeoValues {
  title: Localized;
  description: Localized;
  isIndexed: boolean;
  isFollowed: boolean;
  ogImageUrl: string | null;
}

/**
 * Single place that turns a route's SEO values into Next metadata — used by
 * every public page so titles, canonicals, hreflang, robots and social cards
 * stay consistent. `title.absolute` is deliberate: the layout's title template
 * would otherwise append the brand a second time.
 */
export function buildPageMetadata(locale: Locale, path: PublicPath, seo: PageSeoValues): Metadata {
  const canonical = absoluteUrl(localizedPath(locale, path));
  const title = seo.title[locale];
  const description = seo.description[locale];
  const image = seo.ogImageUrl ?? absoluteUrl(OG_IMAGE_PATH);

  return {
    title: { absolute: title },
    description,
    alternates: buildAlternates(locale, path),
    robots: { index: seo.isIndexed, follow: seo.isFollowed },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "Dr. Islam Mousa",
      title,
      description,
      locale: localeTag[locale],
      alternateLocale: locales.filter((loc) => loc !== locale).map((loc) => localeTag[loc]),
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export type JsonLdObject = Record<string, unknown>;

export function breadcrumbJsonLd(locale: Locale, path: PublicPath): JsonLdObject {
  const items = [{ name: HOME_BREADCRUMB_LABEL[locale], url: absoluteUrl(localizedPath(locale, "")) }];
  if (path !== "") {
    items.push({
      name: PAGE_BREADCRUMB_LABEL[path][locale],
      url: absoluteUrl(localizedPath(locale, path)),
    });
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function webPageJsonLd(locale: Locale, path: PublicPath, title: string, description: string): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(localizedPath(locale, path))}#webpage`,
    url: absoluteUrl(localizedPath(locale, path)),
    name: title,
    description,
    inLanguage: localeTag[locale],
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}
