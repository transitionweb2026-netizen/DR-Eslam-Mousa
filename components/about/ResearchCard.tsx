import Image from "next/image";
import { Icon } from "@/components/icons/Icon";
import { IconBadge } from "@/components/ui/IconBadge";
import { GlassCard } from "@/components/ui/GlassCard";
import type { Locale } from "@/lib/i18n/config";
import type { ResearchPaper } from "@/lib/cms/publicContent";

const downloadLabel = { en: "Download PDF", ar: "تحميل الملف" } as const;
const viewPublishedLabel = { en: "View Published Paper", ar: "عرض البحث المنشور" } as const;

/**
 * No pop-up — the image and the Download button (for the PDF uploaded via
 * Content → Research Papers) are the entire card, per the explicit request
 * to remove the click-to-open modal this used to have.
 */
export function ResearchCard({ paper, locale }: { paper: ResearchPaper; locale: Locale }) {
  const meta = [paper.journalName, paper.publishYear].filter(Boolean).join(" · ");

  return (
    <GlassCard as="article" className="glass-tint-purple flex h-full flex-col overflow-hidden p-0">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {paper.image ? (
          <Image
            src={paper.image.src}
            alt={paper.image.alt[locale]}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
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
        {paper.excerpt[locale] && <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-muted">{paper.excerpt[locale]}</p>}

        <div className="mt-4 flex flex-wrap items-center gap-4">
          {paper.pdfUrl && (
            <a
              href={paper.pdfUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="bg-gradient-brand inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white shadow-glass transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glass-lg"
            >
              <Icon name="arrow" className="h-3.5 w-3.5 rotate-90" />
              {downloadLabel[locale]}
            </a>
          )}
          {paper.externalUrl && (
            <a
              href={paper.externalUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:underline"
            >
              {viewPublishedLabel[locale]}
              <Icon name="arrow" className="h-3.5 w-3.5 rtl:rotate-180" />
            </a>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
