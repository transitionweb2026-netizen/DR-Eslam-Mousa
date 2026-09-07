"use client";

import { useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { GlassCard } from "@/components/ui/GlassCard";
import { ThemedImage } from "@/components/theme/ThemedImage";
import { siteContent } from "@/data/site";
import { localeTag, type Locale } from "@/lib/i18n/config";
import type { ArticleItem } from "@/data/articles";
import { ArticleModal } from "./ArticleModal";

export function ArticleCard({ article, locale }: { article: ArticleItem; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const date = new Date(article.date).toLocaleDateString(localeTag[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <GlassCard as="article" className="glass-tint-purple flex h-full flex-col overflow-hidden p-0">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group flex h-full flex-col text-start"
          aria-haspopup="dialog"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <ThemedImage
              src={article.image.src}
              alt={article.image.alt[locale]}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
            <span className="chip-purple absolute start-4 top-4 rounded-full px-3 py-1 text-xs font-semibold">
              {article.category[locale]}
            </span>
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          </div>
          <div className="flex flex-1 flex-col p-6">
            <div className="flex items-center gap-2 text-xs font-medium text-brand-muted">
              <time dateTime={article.date}>{date}</time>
              <span aria-hidden="true">·</span>
              <span>
                {article.readTimeMinutes} {siteContent.actions.minRead[locale]}
              </span>
            </div>
            <h3 className="mt-3 text-lg font-bold text-brand-ink">{article.title[locale]}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-muted">{article.excerpt[locale]}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue">
              {siteContent.actions.readMore[locale]}
              <Icon
                name="arrow"
                className="h-4 w-4 rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              />
            </span>
          </div>
        </button>
      </GlassCard>

      <ArticleModal article={article} open={open} onClose={() => setOpen(false)} locale={locale} />
    </>
  );
}
