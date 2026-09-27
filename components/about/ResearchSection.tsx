import type { ResearchPaper } from "@/lib/cms/publicContent";
import type { IntroContent } from "@/lib/cms/publicSections";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import type { Locale } from "@/lib/i18n/config";
import { ResearchCard } from "./ResearchCard";

interface ResearchSectionProps {
  locale: Locale;
  intro: IntroContent;
  papers: ResearchPaper[];
}

/**
 * Cards wrap with `flex-wrap justify-center` (not a fixed-column grid) so a
 * leftover card on the last row always centers itself instead of sitting
 * alone flush to one side — this collection's count changes over time as
 * real papers are added, unlike the site's fixed-count sections.
 */
export function ResearchSection({ locale, intro, papers }: ResearchSectionProps) {
  if (papers.length === 0) return null;

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8" aria-labelledby="research-heading">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          locale={locale}
          headingId="research-heading"
          eyebrow={intro.eyebrow}
          title={intro.title}
          description={intro.description}
        />

        <Stagger className="mt-12 flex flex-wrap justify-center gap-6">
          {papers.map((paper) => (
            <StaggerItem key={paper.id} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
              <ResearchCard paper={paper} locale={locale} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
