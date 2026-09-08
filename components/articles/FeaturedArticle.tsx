"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/icons/Icon";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArticleModal } from "@/components/home/ArticleModal";
import { siteContent } from "@/data/site";
import { localeTag, type Locale } from "@/lib/i18n/config";
import type { ArticleItem } from "@/data/articles";

const readArticleLabel = { en: "Read Article", ar: "اقرأ المقال" } as const;

/**
 * The large, editorial-style feature at the top of the Articles page — the
 * same glass system and the same Article Modal as every other article
 * card, just composed at a bigger, more dominant scale.
 */
export function FeaturedArticle({ article, locale }: { article: ArticleItem; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const date = new Date(article.date).toLocaleDateString(localeTag[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <GlassCard as="article" className="glass-tint-blue overflow-hidden p-0">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group grid w-full text-start lg:grid-cols-2"
          aria-haspopup="dialog"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden lg:aspect-auto">
            <Image
              src={article.image.src}
              alt={article.image.alt[locale]}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
            <span className="chip-purple absolute start-4 top-4 rounded-full px-3 py-1 text-xs font-semibold">
              {article.category[locale]}
            </span>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            <div className="flex items-center gap-2 text-xs font-medium text-brand-muted">
              <time dateTime={article.date}>{date}</time>
              <span aria-hidden="true">·</span>
              <span>
                {article.readTimeMinutes} {siteContent.actions.minRead[locale]}
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-bold leading-tight text-brand-ink sm:text-3xl lg:text-[2rem]">
              {article.title[locale]}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-muted sm:text-lg">{article.excerpt[locale]}</p>
            <span className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-brand-blue">
              {readArticleLabel[locale]}
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
