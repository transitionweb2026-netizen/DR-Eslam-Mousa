"use client";

import Image from "next/image";
import type { DoctorGalleryPhoto } from "@/lib/cms/publicContent";
import type { IntroContent } from "@/lib/cms/publicSections";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/icons/Icon";
import { Reveal } from "@/components/motion/Reveal";
import type { Locale } from "@/lib/i18n/config";
import { useHorizontalSlider } from "@/lib/useHorizontalSlider";
import { cn } from "@/lib/utils";

const arrowLabels = {
  prev: { en: "Previous photo", ar: "الصورة السابقة" },
  next: { en: "Next photo", ar: "الصورة التالية" },
} as const;

interface DoctorGallerySectionProps {
  locale: Locale;
  intro: IntroContent;
  photos: DoctorGalleryPhoto[];
}

/** A horizontal photo slider — see lib/useHorizontalSlider.ts for the drag/arrow behavior (the same one Certificates uses). */
export function DoctorGallerySection({ locale, intro, photos }: DoctorGallerySectionProps) {
  const { trackRef, setCardRef, activeIndex, goTo, onPointerDown, onPointerMove, endDrag } = useHorizontalSlider(photos.length);

  if (photos.length === 0) return null;

  return (
    <section className="py-16 sm:py-24" aria-labelledby="doctor-gallery-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          <SectionHeader
            locale={locale}
            headingId="doctor-gallery-heading"
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
              disabled={activeIndex === photos.length - 1}
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
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              ref={setCardRef(index)}
              className="glass-card glass-sheen relative aspect-[3/4] w-[220px] shrink-0 snap-start overflow-hidden rounded-3xl p-2 select-none sm:w-[260px]"
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <Image
                  src={photo.image.src}
                  alt={photo.image.alt[locale]}
                  fill
                  draggable={false}
                  sizes="260px"
                  className="pointer-events-none object-cover"
                  style={{ objectPosition: photo.image.position ?? "center" }}
                />
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
