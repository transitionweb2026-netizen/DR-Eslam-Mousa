"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/data/navigation";
import { siteContent } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export function Navbar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const localeRoot = `/${locale}`;

  const isActive = (path: string) => {
    const full = path ? `${localeRoot}/${path}` : localeRoot;
    if (path === "") return pathname === full;
    return pathname === full || pathname.startsWith(`${full}/`);
  };

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <nav
        aria-label="Primary"
        className="glass-panel mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl px-4 py-2.5 sm:px-6 sm:py-3"
      >
        <Link href={localeRoot} className="flex flex-col leading-tight">
          <span className="font-heading text-base font-extrabold text-brand-ink sm:text-lg">
            {siteContent.brand.nameLocalized[locale]}
          </span>
          <span className="hidden text-[0.68rem] font-medium text-brand-muted sm:block">
            {siteContent.brand.credentials[locale]}
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navigationItems.map((item) => {
            const active = isActive(item.path);
            const href = item.path ? `${localeRoot}/${item.path}` : localeRoot;
            return (
              <li key={item.key} className="relative">
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative block rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300",
                    active ? "text-brand-blue" : "text-brand-ink-soft hover:text-brand-blue"
                  )}
                >
                  {item.label[locale]}
                  {active && (
                    <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-brand-blue shadow-[0_0_10px_var(--color-brand-blue)]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle locale={locale} />
          <LanguageSwitcher locale={locale} />
          <Button href={`${localeRoot}/contact`} size="md">
            {siteContent.actions.bookAppointment[locale]}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher locale={locale} />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={siteContent.actions.menu[locale]}
            aria-expanded={open}
            className="glass-panel inline-flex h-10 w-10 items-center justify-center rounded-xl text-brand-ink transition-transform active:scale-95"
          >
            <Icon name="menu" className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <MobileMenu open={open} onClose={() => setOpen(false)} locale={locale} isActive={isActive} />
    </header>
  );
}
