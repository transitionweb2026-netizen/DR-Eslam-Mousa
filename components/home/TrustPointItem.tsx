import { IconBadge } from "@/components/ui/IconBadge";
import type { TrustPoint } from "@/data/trustPoints";
import type { Locale } from "@/lib/i18n/config";

export function TrustPointItem({
  point,
  index,
  locale,
}: {
  point: TrustPoint;
  index: number;
  locale: Locale;
}) {
  return (
    <div className="group flex items-start gap-4 rounded-2xl border border-transparent p-4 transition-all duration-500 hover:border-brand-blue/25 hover:bg-white/[0.05]">
      <div className="relative shrink-0">
        <IconBadge icon={point.icon} />
        <span className="absolute -end-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white/95 text-[0.65rem] font-bold text-brand-purple shadow-glass">
          {index + 1}
        </span>
      </div>
      <div>
        <h3 className="text-base font-bold text-brand-ink sm:text-lg">{point.title[locale]}</h3>
        <p className="mt-1 text-sm leading-relaxed text-brand-muted">{point.description[locale]}</p>
      </div>
    </div>
  );
}
