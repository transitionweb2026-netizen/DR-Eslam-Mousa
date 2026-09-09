import type { ContactInfo } from "@/lib/cms/publicSettings";
import { Icon } from "@/components/icons/Icon";
import { GlassCard } from "@/components/ui/GlassCard";
import type { Locale } from "@/lib/i18n/config";
import type { Localized } from "@/lib/types";

const openInMaps = {
  en: "Open in Maps",
  ar: "افتح في الخرائط",
} as const satisfies Localized;

/**
 * A stylized, on-brand map visual (a real embed can replace this later by
 * only touching `contactInfo.mapUrl` / adding an embed src — the layout
 * stays the same). Clicking it opens the clinic's real location.
 */
export function LocationCard({ locale, contactInfo }: { locale: Locale; contactInfo: ContactInfo }) {
  return (
    <a href={contactInfo.mapUrl} target="_blank" rel="noreferrer noopener" className="block">
    <GlassCard
      className="glass-tint-blue group relative flex aspect-[4/5] w-full flex-col items-center justify-center overflow-hidden p-6 sm:aspect-square lg:aspect-[4/5]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, var(--color-brand-line) 0, var(--color-brand-line) 1px, transparent 1px, transparent 64px)," +
            "repeating-linear-gradient(90deg, var(--color-brand-line) 0, var(--color-brand-line) 1px, transparent 1px, transparent 64px)",
        }}
      />
      <div
        aria-hidden="true"
        className="animate-float-slow absolute -top-10 end-[-3rem] h-56 w-56 rounded-full bg-brand-blue/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-float-slow absolute -bottom-12 start-[-3rem] h-64 w-64 rounded-full bg-brand-purple-soft/20 blur-3xl [animation-delay:-3s]"
      />

      <span className="glass-card-strong shadow-glass-lg relative z-10 flex h-16 w-16 items-center justify-center rounded-full text-brand-blue transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105 sm:h-20 sm:w-20">
        <Icon name="map-pin" className="h-8 w-8 sm:h-9 sm:w-9" />
      </span>

      <p className="relative z-10 mt-6 max-w-xs text-center text-sm font-semibold leading-relaxed text-brand-ink sm:text-base">
        {contactInfo.address[locale]}
      </p>

      <span className="chip-blue relative z-10 mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide">
        {openInMaps[locale]}
        <Icon name="arrow" className="h-3.5 w-3.5 rtl:rotate-180" />
      </span>
    </GlassCard>
    </a>
  );
}
