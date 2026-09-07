"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabel, switchLocalePath, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

/**
 * The premium AR | EN segmented switcher. Preserves the current page when
 * swapping locale (e.g. /en/services -> /ar/services).
 */
export function LanguageSwitcher({ locale, className }: { locale: Locale; className?: string }) {
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn("inline-flex items-center gap-0.5 rounded-full glass-panel p-1", className)}
    >
      {locales.map((loc) => {
        const active = loc === locale;
        return (
          <Link
            key={loc}
            href={switchLocalePath(pathname, loc)}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wide transition-all duration-300",
              active
                ? "bg-gradient-brand text-white shadow-glass"
                : "text-brand-ink-soft hover:text-brand-blue"
            )}
          >
            {localeLabel[loc]}
          </Link>
        );
      })}
    </div>
  );
}
