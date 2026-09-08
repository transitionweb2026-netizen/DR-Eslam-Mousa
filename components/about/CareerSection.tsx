import { careerIntro, careerMilestones } from "@/data/career";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { IconBadge } from "@/components/ui/IconBadge";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import type { Locale } from "@/lib/i18n/config";

/**
 * A premium career journey: a connected horizontal line of milestones on
 * desktop (the site's own composition, not a generic vertical-list
 * template), collapsing to a clean connected vertical line on mobile.
 */
export function CareerSection({ locale }: { locale: Locale }) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8" aria-labelledby="career-heading">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          locale={locale}
          headingId="career-heading"
          eyebrow={careerIntro.eyebrow}
          title={careerIntro.title}
          description={careerIntro.description}
        />

        {/* Desktop: horizontal journey with a connecting brand-gradient line. */}
        <Stagger className="relative mt-16 hidden lg:grid lg:grid-cols-6 lg:gap-4">
          <div
            aria-hidden="true"
            className="bg-gradient-brand absolute inset-x-0 top-7 h-0.5 opacity-30"
            style={{ marginInline: "8.33%" }}
          />
          {careerMilestones.map((milestone) => (
            <StaggerItem key={milestone.id} className="relative flex flex-col items-center text-center">
              <IconBadge icon={milestone.icon} className="relative z-10 ring-4 ring-[var(--color-surface)]" />
              <span className="mt-4 text-sm font-extrabold text-brand-blue">{milestone.year}</span>
              <GlassCard hover={false} className="mt-3 flex w-full flex-col gap-1.5 p-4 text-start">
                <h3 className="text-sm font-bold leading-snug text-brand-ink">{milestone.title[locale]}</h3>
                <p className="text-xs font-semibold text-brand-purple">{milestone.institution[locale]}</p>
                <p className="text-xs leading-relaxed text-brand-muted">{milestone.description[locale]}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Mobile / tablet: connected vertical timeline. */}
        <Stagger className="relative mt-12 flex flex-col gap-8 lg:hidden">
          <div
            aria-hidden="true"
            className="bg-gradient-brand absolute bottom-6 top-6 w-0.5 opacity-30 start-[27px]"
          />
          {careerMilestones.map((milestone) => (
            <StaggerItem key={milestone.id} className="relative flex items-start gap-5">
              <IconBadge icon={milestone.icon} className="relative z-10 shrink-0 ring-4 ring-[var(--color-surface)]" />
              <GlassCard hover={false} className="flex flex-1 flex-col gap-1.5 p-4">
                <span className="text-xs font-extrabold text-brand-blue">{milestone.year}</span>
                <h3 className="text-base font-bold leading-snug text-brand-ink">{milestone.title[locale]}</h3>
                <p className="text-xs font-semibold text-brand-purple">{milestone.institution[locale]}</p>
                <p className="text-sm leading-relaxed text-brand-muted">{milestone.description[locale]}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
