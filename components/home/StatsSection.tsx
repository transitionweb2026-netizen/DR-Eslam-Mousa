import type { StatItem } from "@/data/stats";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import type { Locale } from "@/lib/i18n/config";
import { StatCard } from "./StatCard";

export function StatsSection({ locale, statistics }: { locale: Locale; statistics: StatItem[] }) {
  return (
    <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8" aria-label="Statistics">
      <div className="mx-auto max-w-7xl">
        <Stagger className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {statistics.map((stat) => (
            <StaggerItem key={stat.id}>
              <StatCard stat={stat} locale={locale} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
