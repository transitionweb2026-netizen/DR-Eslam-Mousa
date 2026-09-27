import Image from "next/image";
import type { ContactCtaContent } from "@/lib/cms/publicSections";
import type { ContactInfo } from "@/lib/cms/publicSettings";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";
import { Reveal } from "@/components/motion/Reveal";
import type { Locale } from "@/lib/i18n/config";

/**
 * The wide promotional card right after the Contact page's Hero — same
 * outer dimensions as the site's one Final CTA card (CTASection.tsx), but a
 * photo + glass-framed text layout instead of a solid gradient. The call
 * button's phone number always comes from Global Settings → Contact
 * Information (contactInfo.phoneHref/phoneDisplay) — this card only
 * controls the button's label text, never the number itself, so there's
 * exactly one place the real destination can ever be wrong.
 */
export function ContactCallCard({ locale, content, contactInfo }: { locale: Locale; content: ContactCtaContent; contactInfo: ContactInfo }) {
  return (
    <section className="px-4 pt-16 sm:px-6 sm:pt-24 lg:px-8">
      <Reveal scale className="mx-auto max-w-7xl">
        <div className="glass-card-strong shadow-glass-lg grid overflow-hidden rounded-[2.25rem] lg:grid-cols-2 lg:rounded-[2.75rem]">
          <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:min-h-[420px]">
            <Image
              src={content.image.src}
              alt={content.image.alt[locale]}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              style={{ objectPosition: content.image.position }}
            />
          </div>

          <div className="flex items-center p-6 sm:p-10 lg:p-12">
            <div className="glass-frame-3d w-full">
              <div className="glass-frame-3d-inner flex flex-col gap-5 p-6 sm:p-8">
                <span className="chip-purple inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
                  {content.eyebrow[locale]}
                </span>
                <h2 className="text-2xl font-bold leading-tight text-brand-ink sm:text-3xl">{content.heading[locale]}</h2>

                {content.lines[locale].length > 0 && (
                  <ul className="flex flex-col gap-2.5">
                    {content.lines[locale].map((line, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-sm leading-relaxed text-brand-ink-soft sm:text-base">
                        <span className="chip-blue mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                          <Icon name="check" className="h-3 w-3" />
                        </span>
                        {line}
                      </li>
                    ))}
                  </ul>
                )}

                <Button href={contactInfo.phoneHref} size="lg" withArrow className="mt-2 w-fit">
                  <Icon name="phone" className="h-4 w-4" />
                  {content.buttonLabel[locale]}
                  <span dir="ltr" className="font-normal opacity-90">
                    {contactInfo.phoneDisplay}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
