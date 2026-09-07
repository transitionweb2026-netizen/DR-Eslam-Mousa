import { locales, type Locale } from "@/lib/types";

export { locales };
export type { Locale };

export const defaultLocale: Locale = "en";

export const localeDirection: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
};

/** BCP-47 tag used in <html lang> and metadata. */
export const localeTag: Record<Locale, string> = {
  en: "en-US",
  ar: "ar-EG",
};

export const localeLabel: Record<Locale, string> = {
  en: "EN",
  ar: "AR",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Swap the locale segment of a pathname, e.g. /en/services -> /ar/services */
export function switchLocalePath(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split("/");
  if (segments.length > 1 && isLocale(segments[1])) {
    segments[1] = nextLocale;
    return segments.join("/") || `/${nextLocale}`;
  }
  return `/${nextLocale}${pathname}`;
}
