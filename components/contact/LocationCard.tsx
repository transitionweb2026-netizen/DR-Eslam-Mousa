import type { ContactLocation } from "@/data/contact";
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
 * only touching `location.mapUrl` / adding an embed src — the layout stays
 * the same). Clicking it opens that branch's real location. One card per
 * clinic location — see getContactLocations() for the CMS-editable list.
 */
export function LocationCard({ locale, location }: { locale: Locale; location: ContactLocation }) {
  return (
    <a href={location.mapUrl} target="_blank" rel="noreferrer noopener" className="block">
    <GlassCard
      className="glass-tint-blue group relative flex flex-col items-center justify-center overflow-hidden p-6 py-10"
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

      <span className="glass-card-strong shadow-glass-lg relative z-10 flex h-14 w-14 items-center justify-center rounded-full text-brand-blue transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105 sm:h-16 sm:w-16">
        <Icon name="map-pin" className="h-7 w-7 sm:h-8 sm:w-8" />
      </span>

      <p className="relative z-10 mt-5 text-center text-sm font-bold text-brand-blue">{location.name[locale]}</p>

      <p className="relative z-10 mt-2 max-w-xs text-center text-sm font-semibold leading-relaxed text-brand-ink sm:text-base">
        {location.address[locale]}
      </p>

      {location.hours[locale] && (
        <p className="relative z-10 mt-3 flex items-center gap-1.5 text-xs text-brand-muted">
          <Icon name="clock" className="h-3.5 w-3.5 shrink-0" />
          {location.hours[locale]}
        </p>
      )}

      <span className="chip-blue relative z-10 mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide">
        {openInMaps[locale]}
        <Icon name="arrow" className="h-3.5 w-3.5 rtl:rotate-180" />
      </span>
    </GlassCard>
    </a>
  );
}
