import Image from "next/image";
import { siteContent } from "@/data/site";
import type { AboutDoctorContent } from "@/lib/cms/publicSections";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import type { Locale } from "@/lib/i18n/config";

export function AboutDoctorSection({ locale, content }: { locale: Locale; content: AboutDoctorContent }) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8" aria-labelledby="about-doctor-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Text first in DOM: inline-start (left in LTR, right in RTL). */}
        <div>
          <Reveal>
            <span className="chip-purple inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              {content.eyebrow[locale]}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              id="about-doctor-heading"
              className="mt-4 text-3xl font-bold text-brand-ink sm:text-4xl lg:text-[2.6rem] lg:leading-tight"
            >
              {content.title[locale]}
            </h2>
          </Reveal>

          <Stagger className="mt-6 space-y-4">
            {content.paragraphs[locale].map((paragraph, index) => (
              <StaggerItem key={index}>
                <p className="text-base leading-relaxed text-brand-muted sm:text-lg">{paragraph}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.2}>
            <GlassCard hover={false} className="glass-tint-blue mt-8 p-5">
              <p className="text-sm font-semibold leading-relaxed text-brand-ink-soft sm:text-base">
                “{content.supportingStatement[locale]}”
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-8">
              <Button href={`/${locale}/contact`} withArrow>
                {siteContent.actions.bookAppointment[locale]}
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Image second in DOM: inline-end (right in LTR, left in RTL). */}
        <Reveal delay={0.15} scale>
          <GlassCard strong className="glass-tint-purple relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden p-3 sm:p-4">
            <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
              <Image
                src={content.image.src}
                alt={content.image.alt[locale]}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                style={{ objectPosition: content.image.position }}
                className="object-cover"
              />
            </div>
            <div
              aria-hidden="true"
              className="animate-float-slow absolute -bottom-8 -end-8 h-40 w-40 rounded-full bg-brand-purple-soft/25 blur-3xl"
            />
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
