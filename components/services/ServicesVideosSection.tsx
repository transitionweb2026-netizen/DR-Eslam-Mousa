import type { ServicesVideos } from "@/lib/cms/publicSections";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { VideoCard } from "@/components/home/VideoCard";
import type { Locale } from "@/lib/i18n/config";

/**
 * Exactly two videos, always laid out as two equal columns — never a lone
 * card on its own row. The videos themselves are references into the same
 * Content → Videos collection every other page reads (see
 * lib/cms/publicSections.ts's toServicesVideos), never a copy.
 */
export function ServicesVideosSection({ locale, videos }: { locale: Locale; videos: ServicesVideos }) {
  const cards = [videos.video1, videos.video2].filter((v) => v !== null);
  if (cards.length === 0) return null;

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8" aria-labelledby="services-videos-heading">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          locale={locale}
          headingId="services-videos-heading"
          eyebrow={videos.intro.eyebrow}
          title={videos.intro.title}
          description={videos.intro.description}
        />

        <Stagger className="mt-12 flex flex-wrap justify-center gap-6">
          {cards.map((video) => (
            <StaggerItem key={video.id} className="w-full sm:w-[calc(50%-0.75rem)]">
              <VideoCard video={video} locale={locale} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
