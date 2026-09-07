"use client";

import { Modal } from "@/components/ui/Modal";
import { Icon } from "@/components/icons/Icon";
import { siteContent } from "@/data/site";
import type { Locale } from "@/lib/i18n/config";
import type { Localized, MediaVideo } from "@/lib/types";
import { cn } from "@/lib/utils";

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  video: MediaVideo;
  title: Localized;
  locale: Locale;
  /** "video" = 16:9 landscape (default). "portrait" = 9:16, reels-style. */
  aspectRatio?: "video" | "portrait";
}

export function VideoModal({ open, onClose, video, title, locale, aspectRatio = "video" }: VideoModalProps) {
  const isPortrait = aspectRatio === "portrait";

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeLabel={siteContent.actions.close[locale]}
      className={isPortrait ? "max-w-sm" : "max-w-3xl"}
    >
      <div
        className={cn(
          "w-full overflow-hidden rounded-t-3xl bg-black",
          isPortrait ? "aspect-[9/16]" : "aspect-video"
        )}
      >
        {video.externalUrl ? (
          <iframe
            src={video.externalUrl}
            title={title[locale]}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : video.src ? (
          <video
            key={video.src}
            src={video.src}
            controls
            autoPlay
            playsInline
            poster={video.poster.src}
            className="h-full w-full bg-black"
          >
            <track kind="captions" />
          </video>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-brand p-8 text-center text-white">
            <Icon name="play" className="h-10 w-10 opacity-90" />
            <p className="max-w-sm text-sm font-medium">{siteContent.actions.videoComingSoon[locale]}</p>
          </div>
        )}
      </div>
      <div className="p-6 sm:p-8">
        <h3 className="text-xl font-bold text-brand-ink">{title[locale]}</h3>
      </div>
    </Modal>
  );
}
