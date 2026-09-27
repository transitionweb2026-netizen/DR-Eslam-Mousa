import type { CareerMilestone } from "@/data/career";
import type { IntroContent } from "@/lib/cms/publicSections";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { IconBadge } from "@/components/ui/IconBadge";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import type { Locale } from "@/lib/i18n/config";

interface CareerSectionProps {
  locale: Locale;
  intro: IntroContent;
  careerMilestones: CareerMilestone[];
}

const MAX_PER_ROW = 4;

/**
 * Splits into as few rows as possible, each row as close to equal size as
 * possible (never "fill row 1 to the max, dump the remainder in row 2") —
 * 8 items -> 4+4, 7 -> 4+3, 6 -> 3+3, not 4+2. Each row then gets its own
 * connecting line sized to ITS OWN item count via CareerRow below, so a
 * shorter last row still fills and centers correctly rather than trailing
 * off. 4 or fewer items is just one row, unchanged from before.
 */
function chunkBalanced<T>(items: T[], maxPerRow: number): T[][] {
  if (items.length === 0) return [];
  const rowCount = Math.ceil(items.length / maxPerRow);
  const perRow = Math.ceil(items.length / rowCount);
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += perRow) rows.push(items.slice(i, i + perRow));
  return rows;
}

/**
 * A premium career journey: a connected horizontal line of milestones on
 * desktop (the site's own composition, not a generic vertical-list
 * template), collapsing to a clean connected vertical line on mobile.
 */
export function CareerSection({ locale, intro, careerMilestones }: CareerSectionProps) {
  const rows = chunkBalanced(careerMilestones, MAX_PER_ROW);

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8" aria-labelledby="career-heading">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          locale={locale}
          headingId="career-heading"
          eyebrow={intro.eyebrow}
          title={intro.title}
          description={intro.description}
        />

        {/* Desktop: one or more connected horizontal rows. */}
        <div className="mt-16 hidden lg:flex lg:flex-col lg:gap-10">
          {rows.map((row, rowIndex) => (
            <CareerRow key={rowIndex} milestones={row} locale={locale} />
          ))}
        </div>

        {/* Mobile / tablet: connected vertical timeline (any row count collapses to one list). */}
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

function CareerRow({ milestones, locale }: { milestones: CareerMilestone[]; locale: Locale }) {
  const columnCount = milestones.length || 1;

  return (
    <Stagger
      className="relative grid gap-4"
      style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
    >
      <div
        aria-hidden="true"
        className="bg-gradient-brand absolute inset-x-0 top-7 h-0.5 opacity-30"
        style={{ marginInline: `${50 / columnCount}%` }}
      />
      {milestones.map((milestone) => (
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
  );
}
