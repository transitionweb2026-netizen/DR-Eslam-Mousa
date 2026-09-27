"use client";

import Image from "next/image";
import { Modal } from "@/components/ui/Modal";
import { Icon } from "@/components/icons/Icon";
import { IconBadge } from "@/components/ui/IconBadge";
import { siteContent } from "@/data/site";
import type { Locale } from "@/lib/i18n/config";
import type { ResearchPaper } from "@/lib/cms/publicContent";

const viewPublishedLabel = { en: "View Published Paper", ar: "عرض البحث المنشور" } as const;

interface ResearchModalProps {
  paper: ResearchPaper;
  open: boolean;
  onClose: () => void;
  locale: Locale;
}

export function ResearchModal({ paper, open, onClose, locale }: ResearchModalProps) {
  const meta = [paper.journalName, paper.publishYear].filter(Boolean).join(" · ");

  return (
    <Modal open={open} onClose={onClose} closeLabel={siteContent.actions.close[locale]} className="max-w-2xl">
      {paper.image ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-t-3xl">
          <Image src={paper.image.src} alt={paper.image.alt[locale]} fill sizes="(min-width: 640px) 42rem, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
        </div>
      ) : (
        <div className="bg-gradient-brand flex aspect-[3/1] w-full items-center justify-center rounded-t-3xl">
          <IconBadge icon="plan" size="lg" tone="glass" className="bg-white/20 text-white" />
        </div>
      )}
      <div className="p-6 sm:p-8">
        {meta && <p className="text-xs font-semibold uppercase tracking-wide text-brand-blue">{meta}</p>}
        <h2 className="mt-2 text-2xl font-bold text-brand-ink sm:text-3xl">{paper.title[locale]}</h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-brand-ink-soft">
          {paper.content[locale].map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        {paper.externalUrl && (
          <a
            href={paper.externalUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline"
          >
            {viewPublishedLabel[locale]}
            <Icon name="arrow" className="h-4 w-4 rtl:rotate-180" />
          </a>
        )}
      </div>
    </Modal>
  );
}
