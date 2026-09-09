import type { VideoItem } from "@/data/videos";
import { siteContent } from "@/data/site";
import type { IntroContent } from "@/lib/cms/publicSections";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import type { Locale } from "@/lib/i18n/config";
import { VideoCard } from "./VideoCard";

interface FeaturedVideosSectionProps {
  locale: Locale;
  intro: IntroContent;
  videos: VideoItem[];
}

export function FeaturedVideosSection({ locale, intro, videos }: FeaturedVideosSectionProps) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8" aria-labelledby="videos-heading">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          locale={locale}
          headingId="videos-heading"
          eyebrow={intro.eyebrow}
          title={intro.title}
          description={intro.description}
        />

        <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
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
