"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/icons/Icon";
import { EASE_PREMIUM } from "@/lib/motion";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import { useTheme } from "./ThemeProvider";

const labels = {
  dark: { en: "Dark", ar: "داكن" },
  light: { en: "Light", ar: "فاتح" },
} as const;

const switchToLabel = {
  dark: { en: "Switch to light theme", ar: "التبديل إلى الوضع الفاتح" },
  light: { en: "Switch to dark theme", ar: "التبديل إلى الوضع الداكن" },
} as const;

interface ThemeToggleProps {
  locale: Locale;
  className?: string;
  /** Icon-only on very tight layouts — the label stays for screen readers. */
  hideLabel?: boolean;
}

/** Premium light/dark toggle — a compact glass pill, matched to the navbar. */
export function ThemeToggle({ locale, className, hideLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={switchToLabel[theme][locale]}
      aria-pressed={theme === "dark"}
      className={cn(
        "glass-panel inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full px-3.5 text-xs font-bold tracking-wide text-brand-ink-soft transition-colors duration-300 hover:text-brand-blue",
        className
      )}
    >
      <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.35, ease: EASE_PREMIUM }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Icon name={theme === "dark" ? "moon" : "sun"} className="h-4 w-4" />
          </motion.span>
        </AnimatePresence>
      </span>
      <span className={hideLabel ? "sr-only" : undefined}>{labels[theme][locale]}</span>
    </button>
  );
}
