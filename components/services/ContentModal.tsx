"use client";

import Image from "next/image";
import { Modal } from "@/components/ui/Modal";
import { Icon } from "@/components/icons/Icon";
import { IconBadge } from "@/components/ui/IconBadge";
import { siteContent } from "@/data/site";
import type { Locale } from "@/lib/i18n/config";
import type { Localized, MediaImage } from "@/lib/types";
import type { IconName } from "@/components/icons/Icon";

export interface ContentModalItem {
  icon: IconName;
  title: Localized;
  description: Localized;
  image: MediaImage;
  details: Localized<string[]>;
  benefits: Localized<string[]>;
}

const benefitsLabel = { en: "Key Benefits", ar: "أبرز المزايا" } as const satisfies Localized;

interface ContentModalProps {
  item: ContentModalItem | null;
  open: boolean;
  onClose: () => void;
  locale: Locale;
}

/**
 * One reusable liquid-glass detail modal shared by every Specialty and
 * Condition card on the Services page — only the `item` passed in changes.
 */
export function ContentModal({ item, open, onClose, locale }: ContentModalProps) {
  if (!item) return null;

  return (
    <Modal open={open} onClose={onClose} closeLabel={siteContent.actions.close[locale]} className="max-w-2xl">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-3xl">
        <Image
          src={item.image.src}
          alt={item.image.alt[locale]}
          fill
          sizes="(min-width: 640px) 42rem, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
        <div className="absolute bottom-4 start-4">
          <IconBadge icon={item.icon} />
        </div>
      </div>
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-brand-ink sm:text-3xl">{item.title[locale]}</h2>
        <p className="mt-3 text-base leading-relaxed text-brand-muted">{item.description[locale]}</p>

        <div className="mt-6 space-y-4 text-base leading-relaxed text-brand-ink-soft">
          {item.details[locale].map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {item.benefits[locale].length > 0 && (
          <div className="mt-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-purple">{benefitsLabel[locale]}</h3>
            <ul className="mt-4 space-y-3">
              {item.benefits[locale].map((benefit, index) => (
                <li key={index} className="flex items-start gap-3 text-sm leading-relaxed text-brand-ink-soft">
                  <span className="chip-blue mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                    <Icon name="check" className="h-3 w-3" />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Modal>
  );
}
