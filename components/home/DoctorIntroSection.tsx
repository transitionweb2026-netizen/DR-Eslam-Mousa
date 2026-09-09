import type { DoctorIntroContent } from "@/data/doctorIntro";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { VideoThumbnail } from "@/components/ui/VideoThumbnail";
import { Reveal } from "@/components/motion/Reveal";
import type { Locale } from "@/lib/i18n/config";

export function DoctorIntroSection({ locale, content }: { locale: Locale; content: DoctorIntroContent }) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8" aria-labelledby="doctor-intro-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Content first in DOM: sits at the inline-start (left in LTR, right in RTL). */}
        <Reveal>
          <div>
            <span className="chip-purple inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              {content.eyebrow[locale]}
            </span>
            <h2
              id="doctor-intro-heading"
              className="mt-4 text-3xl font-bold text-brand-ink sm:text-4xl lg:text-[2.6rem] lg:leading-tight"
            >
              {content.title[locale]}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brand-muted sm:text-lg">
              {content.paragraph[locale]}
            </p>
            <p className="mt-4 text-base leading-relaxed text-brand-muted sm:text-lg">
              {content.supporting[locale]}
            </p>
            <div className="mt-8">
              <Button href={`/${locale}/${content.cta.path}`} withArrow>
                {content.cta.label[locale]}
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Video second in DOM: sits at the inline-end (right in LTR, left in RTL). */}
        <Reveal delay={0.15} scale>
          <GlassCard className="glass-tint-blue p-3 sm:p-4">
            <VideoThumbnail
              video={content.video}
              title={content.title}
              locale={locale}
              imageSizes="(min-width: 1024px) 50vw, 100vw"
            />
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
