"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { navigationItems } from "@/data/navigation";
import { siteContent } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import type { Locale } from "@/lib/i18n/config";
import { EASE_PREMIUM } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  isActive: (path: string) => boolean;
}

export function MobileMenu({ open, onClose, locale, isActive }: MobileMenuProps) {
  const localeRoot = `/${locale}`;

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label={siteContent.actions.menu[locale]}
            className="glass-card-strong fixed inset-x-4 top-4 z-50 max-h-[calc(100vh-2rem)] overflow-y-auto rounded-3xl p-6 lg:hidden"
            initial={{ opacity: 0, y: -18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.97 }}
            transition={{ duration: 0.4, ease: EASE_PREMIUM }}
          >
            <div className="flex items-center justify-between">
              <span className="font-heading text-lg font-extrabold text-brand-ink">
                {siteContent.brand.nameLocalized[locale]}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label={siteContent.actions.close[locale]}
                className="glass-panel inline-flex h-10 w-10 items-center justify-center rounded-xl text-brand-ink transition-transform hover:scale-105 active:scale-95"
              >
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4">
              <ThemeToggle locale={locale} className="w-full justify-center" />
            </div>

            <ul className="mt-6 flex flex-col gap-1">
              {navigationItems.map((item) => {
                const active = isActive(item.path);
                const href = item.path ? `${localeRoot}/${item.path}` : localeRoot;
                return (
                  <li key={item.key}>
                    <Link
                      href={href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold transition-colors",
                        active
                          ? "chip-blue"
                          : "text-brand-ink-soft hover:bg-white/[0.06]"
                      )}
                    >
                      {item.label[locale]}
                      <Icon name="arrow" className="h-4 w-4 rtl:rotate-180 opacity-60" />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Button href={`${localeRoot}/contact`} size="lg" className="mt-6 w-full" onClick={onClose}>
              {siteContent.actions.bookAppointment[locale]}
            </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
