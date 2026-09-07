import { Icon } from "@/components/icons/Icon";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/lib/i18n/config";
import type { Localized } from "@/lib/types";

interface ComingSoonProps {
  locale: Locale;
  eyebrow: Localized;
  title: Localized;
  description: Localized;
}

const backHome = { en: "Back to Home", ar: "العودة للرئيسية" } as const satisfies Localized;
const note = {
  en: "This page is being crafted with the same care as the rest of the site — full content is on its way.",
  ar: "يتم تجهيز هذه الصفحة بنفس العناية المبذولة في باقي الموقع، وسيتوفر المحتوى الكامل قريبًا.",
} as const satisfies Localized;

/** Lightweight, on-brand placeholder used by pages not yet fully built out. */
export function ComingSoon({ locale, eyebrow, title, description }: ComingSoonProps) {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeader locale={locale} eyebrow={eyebrow} title={title} description={description} titleAs="h1" />
        <GlassCard className="mt-10 flex flex-col items-center gap-4 p-8 sm:p-10">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-white">
            <Icon name="clock" className="h-6 w-6" />
          </span>
          <p className="max-w-md text-sm leading-relaxed text-brand-muted sm:text-base">{note[locale]}</p>
          <Button href={`/${locale}`} withArrow>
            {backHome[locale]}
          </Button>
        </GlassCard>
      </div>
    </section>
  );
}
