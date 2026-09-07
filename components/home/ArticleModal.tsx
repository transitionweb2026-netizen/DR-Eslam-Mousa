"use client";

import Image from "next/image";
import { Modal } from "@/components/ui/Modal";
import { siteContent } from "@/data/site";
import { localeTag, type Locale } from "@/lib/i18n/config";
import type { ArticleItem } from "@/data/articles";

interface ArticleModalProps {
  article: ArticleItem;
  open: boolean;
  onClose: () => void;
  locale: Locale;
}

export function ArticleModal({ article, open, onClose, locale }: ArticleModalProps) {
  const date = new Date(article.date).toLocaleDateString(localeTag[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Modal open={open} onClose={onClose} closeLabel={siteContent.actions.close[locale]} className="max-w-2xl">
      <div className="relative aspect-video w-full overflow-hidden rounded-t-3xl">
        <Image
          src={article.image.src}
          alt={article.image.alt[locale]}
          fill
          sizes="(min-width: 640px) 42rem, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
      </div>
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-brand-muted">
          <span className="chip-purple rounded-full px-3 py-1 font-semibold">
            {article.category[locale]}
          </span>
          <time dateTime={article.date}>{date}</time>
          <span aria-hidden="true">·</span>
          <span>
            {article.readTimeMinutes} {siteContent.actions.minRead[locale]}
          </span>
        </div>
        <h2 className="mt-4 text-2xl font-bold text-brand-ink sm:text-3xl">{article.title[locale]}</h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-brand-ink-soft">
          {article.content[locale].map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Modal>
  );
}
