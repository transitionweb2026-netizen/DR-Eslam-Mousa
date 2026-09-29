import type { Locale } from "@/lib/i18n/config";
import type { Localized } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: Localized;
  title: Localized;
  description?: Localized;
  locale: Locale;
  className?: string;
  titleAs?: "h1" | "h2";
  headingId?: string;
}

/**
 * Consistent heading + description block used by every section. Accepts
 * (and ignores) an `eyebrow` prop purely so callers passing CMS-driven
 * eyebrow text don't need touching — the small pill above the heading was
 * removed sitewide, but the field itself stays editable in the CMS in case
 * it's ever brought back.
 */
export function SectionHeader({
  title,
  description,
  locale,
  className,
  titleAs: TitleTag = "h2",
  headingId,
}: SectionHeaderProps) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      <TitleTag
        id={headingId}
        className="mt-4 text-3xl font-bold text-balance text-brand-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
      >
        {title[locale]}
      </TitleTag>
      {description && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-brand-muted sm:text-lg">
          {description[locale]}
        </p>
      )}
    </div>
  );
}
