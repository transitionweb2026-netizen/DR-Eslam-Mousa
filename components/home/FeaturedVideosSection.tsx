import { featuredVideos, videosIntro } from "@/data/videos";
import { siteContent } from "@/data/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import type { Locale } from "@/lib/i18n/config";
import { VideoCard } from "./VideoCard";

export function FeaturedVideosSection({ locale }: { locale: Locale }) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8" aria-labelledby="videos-heading">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          locale={locale}
          headingId="videos-heading"
          eyebrow={videosIntro.eyebrow}
          title={videosIntro.title}
          description={videosIntro.description}
        />

        <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredVideos.map((video) => (
            <StaggerItem key={video.id} className="h-full">
              <VideoCard video={video} locale={locale} />
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-12 flex justify-center">
          <Button href={`/${locale}/videos`} variant="secondary" withArrow>
            {siteContent.actions.viewAllVideos[locale]}
          </Button>
        </div>
      </div>
    </section>
  );
}
