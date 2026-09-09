import type { ConditionItem } from "@/data/conditions";
import { siteContent } from "@/data/site";
import type { IntroContent } from "@/lib/cms/publicSections";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import type { Locale } from "@/lib/i18n/config";
import { ConditionCard } from "./ConditionCard";

interface ConditionsSectionProps {
  locale: Locale;
  intro: IntroContent;
  conditions: ConditionItem[];
}

export function ConditionsSection({ locale, intro, conditions }: ConditionsSectionProps) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8" aria-labelledby="conditions-heading">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          locale={locale}
          headingId="conditions-heading"
          eyebrow={intro.eyebrow}
          title={intro.title}
          description={intro.description}
        />

        <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {conditions.map((condition) => (
            <StaggerItem key={condition.id} className="h-full">
              <ConditionCard condition={condition} locale={locale} />
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-12 flex justify-center">
          <Button href={`/${locale}/services`} variant="secondary" withArrow>
            {siteContent.actions.exploreAllConditions[locale]}
          </Button>
        </div>
      </div>
    </section>
  );
}
