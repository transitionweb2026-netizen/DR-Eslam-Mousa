"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import type { CertificateItem } from "@/data/certificates";
import type { IntroContent } from "@/lib/cms/publicSections";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/icons/Icon";
import { Reveal } from "@/components/motion/Reveal";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import { CertificateCard } from "./CertificateCard";

const arrowLabels = {
  prev: { en: "Previous certificate", ar: "الشهادة السابقة" },
  next: { en: "Next certificate", ar: "الشهادة التالية" },
} as const;

/**
 * A premium horizontal certificate gallery: native touch-swipe and
 * scrollbar-drag work out of the box via `overflow-x-auto`; pointer events
 * add mouse click-and-drag on desktop; the arrow buttons step one card at a
 * time via `scrollIntoView`, which sidesteps the well-known cross-browser
 * inconsistency in `scrollLeft` sign conventions under RTL.
 */
interface CertificatesSectionProps {
  locale: Locale;
  intro: IntroContent;
  certificates: CertificateItem[];
}

export function CertificatesSection({ locale, intro, certificates }: CertificatesSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const drag = useRef<{ startX: number; startScroll: number; dragging: boolean } | null>(null);

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(certificates.length - 1, index));
    setActiveIndex(clamped);
    cardRefs.current[clamped]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    drag.current = { startX: event.clientX, startScroll: trackRef.current.scrollLeft, dragging: true };
    trackRef.current.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current?.dragging || !trackRef.current) return;
    const delta = event.clientX - drag.current.startX;
    trackRef.current.scrollLeft = drag.current.startScroll - delta;
  };

  const endDrag = () => {
    if (drag.current) drag.current.dragging = false;
  };

  return (
    <section className="py-16 sm:py-24" aria-labelledby="certificates-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            locale={locale}
            align="start"
            headingId="certificates-heading"
            eyebrow={intro.eyebrow}
            title={intro.title}
            description={intro.description}
            className="max-w-xl"
          />
          <div className="hidden shrink-0 items-center gap-2 sm:flex">
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
            <div key={certificate.id} ref={(el) => { cardRefs.current[index] = el; }}>
              <CertificateCard certificate={certificate} locale={locale} />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
