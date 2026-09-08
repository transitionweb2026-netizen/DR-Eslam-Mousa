import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/icons/Icon";
import { IconBadge } from "@/components/ui/IconBadge";
import { siteContent } from "@/data/site";
import type { SpecialtyItem } from "@/data/specialties";
import type { Locale } from "@/lib/i18n/config";

interface ServiceCardProps {
  specialty: SpecialtyItem;
  locale: Locale;
  /**
   * When provided, the card becomes a button that opens this handler (used
   * by the Services page to open the detail modal) instead of navigating.
   * Every other usage (Home page) is unaffected and keeps linking to
   * /services#service-{slug}.
   */
  onSelect?: () => void;
}

export function ServiceCard({ specialty, locale, onSelect }: ServiceCardProps) {
  const className =
    "glass-card glass-card-hover glass-sheen glass-tint-blue group flex h-full w-full flex-col overflow-hidden rounded-3xl text-start";

  const body = (
    <>
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={specialty.image.src}
          alt={specialty.image.alt[locale]}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <div className="absolute start-4 top-4">
          <IconBadge icon={specialty.icon} tone="glass" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-brand-ink">{specialty.title[locale]}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-muted">{specialty.description[locale]}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue">
          {siteContent.actions.learnMore[locale]}
          <Icon
            name="arrow"
            className="h-4 w-4 rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
          />
        </span>
      </div>
    </>
  );

  if (onSelect) {
    return (
      <button type="button" onClick={onSelect} aria-haspopup="dialog" className={className}>
        {body}
      </button>
    );
  }

  return (
    <Link href={`/${locale}/services#service-${specialty.slug}`} className={className}>
      {body}
    </Link>
  );
}
