"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/icons/Icon";
import { IconBadge } from "@/components/ui/IconBadge";
import { GlassCard } from "@/components/ui/GlassCard";
import type { Locale } from "@/lib/i18n/config";
import type { ResearchPaper } from "@/lib/cms/publicContent";
import { ResearchModal } from "./ResearchModal";

const readPaperLabel = { en: "Read Full Paper", ar: "اقرأ البحث كاملاً" } as const;

export function ResearchCard({ paper, locale }: { paper: ResearchPaper; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const meta = [paper.journalName, paper.publishYear].filter(Boolean).join(" · ");

  return (
    <>
      <GlassCard as="article" className="glass-tint-purple flex h-full flex-col overflow-hidden p-0">
        <button type="button" onClick={() => setOpen(true)} className="group flex h-full flex-col text-start" aria-haspopup="dialog">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            {paper.image ? (
              <Image
                src={paper.image.src}
                alt={paper.image.alt[locale]}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
            ) : (
              <div className="bg-gradient-brand flex h-full w-full items-center justify-center">
                <IconBadge icon="plan" size="lg" tone="glass" className="bg-white/20 text-white" />
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col p-6">
            {meta && <span className="text-xs font-semibold uppercase tracking-wide text-brand-blue">{meta}</span>}
            <h3 className="mt-2 text-lg font-bold text-brand-ink">{paper.title[locale]}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-muted">{paper.excerpt[locale]}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue">
              {readPaperLabel[locale]}
              <Icon
                name="arrow"
                className="h-4 w-4 rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              />
            </span>
          </div>
        </button>
      </GlassCard>

      <ResearchModal paper={paper} open={open} onClose={() => setOpen(false)} locale={locale} />
    </>
  );
}
