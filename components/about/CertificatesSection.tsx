"use client";

import type { CertificateItem } from "@/data/certificates";
import type { IntroContent } from "@/lib/cms/publicSections";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/icons/Icon";
import { Reveal } from "@/components/motion/Reveal";
import type { Locale } from "@/lib/i18n/config";
import { useHorizontalSlider } from "@/lib/useHorizontalSlider";
import { cn } from "@/lib/utils";
import { CertificateCard } from "./CertificateCard";

const arrowLabels = {
  prev: { en: "Previous certificate", ar: "الشهادة السابقة" },
  next: { en: "Next certificate", ar: "الشهادة التالية" },
} as const;

/** A premium horizontal certificate gallery — see lib/useHorizontalSlider.ts for the drag/arrow behavior. */
interface CertificatesSectionProps {
  locale: Locale;
  intro: IntroContent;
  certificates: CertificateItem[];
}

export function CertificatesSection({ locale, intro, certificates }: CertificatesSectionProps) {
  const { trackRef, setCardRef, activeIndex, goTo, onPointerDown, onPointerMove, endDrag } = useHorizontalSlider(certificates.length);

  return (
    <section className="py-16 sm:py-24" aria-labelledby="certificates-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          <SectionHeader
            locale={locale}
            headingId="certificates-heading"
            eyebrow={intro.eyebrow}
            title={intro.title}
            description={intro.description}
          />
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label={arrowLabels.prev[locale]}
              className="glass-panel inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-ink transition-all duration-300 hover:-translate-y-0.5 hover:text-brand-blue disabled:pointer-events-none disabled:opacity-40"
            >
              <Icon name="arrow" className="h-4 w-4 rotate-180 rtl:rotate-0" />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              disabled={activeIndex === certificates.length - 1}
              aria-label={arrowLabels.next[locale]}
              className="glass-panel inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-ink transition-all duration-300 hover:-translate-y-0.5 hover:text-brand-blue disabled:pointer-events-none disabled:opacity-40"
            >
              <Icon name="arrow" className="h-4 w-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>

      <Reveal className="mt-10">
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className={cn(
            "scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:gap-6 sm:px-6 lg:px-[max(1.5rem,calc((100vw-80rem)/2+2rem))]",
            "cursor-grab active:cursor-grabbing"
          )}
        >
          {certificates.map((certificate, index) => (
            <div key={certificate.id} ref={setCardRef(index)}>
              <CertificateCard certificate={certificate} locale={locale} />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
