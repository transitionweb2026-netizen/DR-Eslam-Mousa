import { GlassCard } from "@/components/ui/GlassCard";
import { VideoThumbnail } from "@/components/ui/VideoThumbnail";
import type { VideoItem } from "@/data/videos";
import type { Locale } from "@/lib/i18n/config";

export function VideoCard({ video, locale }: { video: VideoItem; locale: Locale }) {
  return (
    <GlassCard className="glass-tint-blue flex h-full flex-col overflow-hidden p-3 sm:p-4">
      <VideoThumbnail
        video={{ poster: video.thumbnail, src: video.src }}
        title={video.title}
        locale={locale}
        imageSizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        durationLabel={video.duration}
        aspectRatio="portrait"
      />
      <div className="flex flex-1 flex-col p-3 pt-4 sm:p-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-blue">
          {video.category[locale]}
        </span>
        <h3 className="mt-2 text-lg font-bold text-brand-ink">{video.title[locale]}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-muted">{video.description[locale]}</p>
      </div>
    </GlassCard>
  );
}
