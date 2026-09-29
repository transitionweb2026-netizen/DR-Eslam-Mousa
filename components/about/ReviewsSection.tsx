import type { Review } from "@/lib/cms/publicContent";
import type { IntroContent } from "@/lib/cms/publicSections";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import type { Locale } from "@/lib/i18n/config";
import { ReviewCard } from "./ReviewCard";

interface ReviewsSectionProps {
  locale: Locale;
  intro: IntroContent;
  reviews: Review[];
}

/**
 * Same "no orphan card" pattern as ResearchSection/VideosPage: flex-wrap +
 * justify-center + fractional widths, so any count (the target is ten, but
 * this never assumes exactly ten) centers cleanly instead of leaving a
 * lopsided last row.
 */
export function ReviewsSection({ locale, intro, reviews }: ReviewsSectionProps) {
  if (reviews.length === 0) return null;

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8" aria-labelledby="reviews-heading">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          locale={locale}
          headingId="reviews-heading"
          eyebrow={intro.eyebrow}
          title={intro.title}
          description={intro.description}
        />

        <Stagger className="mt-12 flex flex-wrap justify-center gap-6">
          {reviews.map((review) => (
            <StaggerItem key={review.id} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
              <ReviewCard review={review} locale={locale} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
