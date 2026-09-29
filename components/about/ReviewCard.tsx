import Image from "next/image";
import { Icon } from "@/components/icons/Icon";
import { GlassCard } from "@/components/ui/GlassCard";
import type { Locale } from "@/lib/i18n/config";
import type { Review } from "@/lib/cms/publicContent";

/**
 * The icon is always an uploaded illustration (or, until one is uploaded,
 * this neutral line-drawn placeholder) — never a real patient photo, per the
 * explicit requirement behind this section.
 */
export function ReviewCard({ review, locale }: { review: Review; locale: Locale }) {
  return (
    <GlassCard as="article" className="glass-tint-purple flex h-full flex-col gap-4 p-6">
      <Icon name="quote" className="h-7 w-7 text-brand-blue/40" />
      <p className="flex-1 text-sm leading-relaxed text-brand-muted">{review.review[locale]}</p>
      <div className="flex items-center gap-3 border-t border-white/40 pt-4">
        <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-brand text-white">
          {review.icon ? (
            <Image src={review.icon.src} alt={review.icon.alt[locale]} fill sizes="44px" className="object-cover" />
          ) : (
            <Icon name="user" className="h-6 w-6" />
          )}
        </span>
        <span className="text-sm font-bold text-brand-ink">{review.name[locale]}</span>
      </div>
    </GlassCard>
  );
}
