import { GlassCard } from "@/components/ui/GlassCard";
import { IconBadge } from "@/components/ui/IconBadge";
import { Counter } from "@/components/motion/Counter";
import { localeTag, type Locale } from "@/lib/i18n/config";
import type { StatItem } from "@/data/stats";

export function StatCard({ stat, locale }: { stat: StatItem; locale: Locale }) {
  return (
    <GlassCard className="flex h-full flex-col items-center gap-3 p-6 text-center sm:gap-4 sm:p-8">
      <IconBadge icon={stat.icon} size="lg" />
      <div>
        <p className="text-3xl font-extrabold text-brand-ink sm:text-4xl">
          <Counter value={stat.value} suffix={stat.suffix} locale={localeTag[locale]} />
        </p>
        <p className="mt-1 text-sm font-medium text-brand-muted sm:text-base">{stat.label[locale]}</p>
      </div>
    </GlassCard>
  );
}
