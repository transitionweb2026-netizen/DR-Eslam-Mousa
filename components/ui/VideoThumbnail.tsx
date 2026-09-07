"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/icons/Icon";
import { VideoModal } from "@/components/ui/VideoModal";
import { siteContent } from "@/data/site";
import type { Locale } from "@/lib/i18n/config";
import type { Localized, MediaVideo } from "@/lib/types";
import { cn } from "@/lib/utils";

interface VideoThumbnailProps {
  video: MediaVideo;
  title: Localized;
  locale: Locale;
  className?: string;
  imageSizes?: string;
  durationLabel?: string;
  priority?: boolean;
  /** "video" = 16:9 landscape (default). "portrait" = 9:16, reels-style. */
  aspectRatio?: "video" | "portrait";
}

/**
 * A clickable poster + play button that opens the shared Video Modal.
 * Used by the Doctor Introduction showcase video (16:9) and every Video
 * Card (portrait, on the Home page and the Videos page).
 */
export function VideoThumbnail({
  video,
  title,
  locale,
  className,
  imageSizes = "100vw",
  durationLabel,
  priority = false,
  aspectRatio = "video",
}: VideoThumbnailProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${siteContent.actions.play[locale]}: ${title[locale]}`}
        className={cn(
          "group relative block w-full overflow-hidden rounded-3xl",
          aspectRatio === "portrait" ? "aspect-[9/16]" : "aspect-video",
          className
        )}
      >
        <Image
          src={video.poster.src}
          alt={video.poster.alt[locale]}
          fill
          priority={priority}
          sizes={imageSizes}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="glass-card-strong flex h-16 w-16 items-center justify-center rounded-full text-brand-purple-glow shadow-glass-lg transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 sm:h-20 sm:w-20">
            <Icon name="play" className="h-6 w-6 translate-x-0.5 sm:h-7 sm:w-7" />
          </span>
        </span>
        {durationLabel && (
          <span className="absolute bottom-3 end-3 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {durationLabel}
          </span>
        )}
      </button>

      <VideoModal
        open={open}
        onClose={() => setOpen(false)}
        video={video}
        title={title}
        locale={locale}
        aspectRatio={aspectRatio}
      />
    </>
  );
}
