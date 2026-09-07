import Link from "next/link";
import { ThemedImage } from "@/components/theme/ThemedImage";
import { Icon } from "@/components/icons/Icon";
import { IconBadge } from "@/components/ui/IconBadge";
import { siteContent } from "@/data/site";
import type { ConditionItem } from "@/data/conditions";
import type { Locale } from "@/lib/i18n/config";

export function ConditionCard({ condition, locale }: { condition: ConditionItem; locale: Locale }) {
  return (
    <Link
      href={`/${locale}/services#condition-${condition.slug}`}
      className="glass-card glass-card-hover glass-sheen glass-tint-purple group flex h-full flex-col overflow-hidden rounded-3xl"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <ThemedImage
          src={condition.image.src}
          alt={condition.image.alt[locale]}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <div className="absolute start-4 top-4">
          <IconBadge icon={condition.icon} tone="glass" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-brand-ink">{condition.title[locale]}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-muted">{condition.description[locale]}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue">
          {siteContent.actions.learnMore[locale]}
          <Icon
            name="arrow"
            className="h-4 w-4 rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
