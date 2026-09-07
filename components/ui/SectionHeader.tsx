import type { Locale } from "@/lib/i18n/config";
import type { Localized } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: Localized;
  title: Localized;
  description?: Localized;
  locale: Locale;
  align?: "center" | "start";
  className?: string;
  titleAs?: "h1" | "h2";
  headingId?: string;
}

/** Consistent eyebrow + heading + description block used by every section. */
export function SectionHeader({
  eyebrow,
  title,
  description,
  locale,
  align = "center",
  className,
  titleAs: TitleTag = "h2",
  headingId,
}: SectionHeaderProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "text-start", className)}>
      {eyebrow && (
        <span className="chip-purple inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
          {eyebrow[locale]}
        </span>
      )}
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
