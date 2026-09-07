import Image from "next/image";
import { trustContent, trustPoints } from "@/data/trustPoints";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import type { Locale } from "@/lib/i18n/config";
import { TrustPointItem } from "./TrustPointItem";

export function TrustSection({ locale }: { locale: Locale }) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8" aria-labelledby="trust-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeader
            locale={locale}
            align="start"
            headingId="trust-heading"
            eyebrow={trustContent.eyebrow}
            title={trustContent.title}
            description={trustContent.description}
          />
          <Stagger className="mt-8 flex flex-col gap-1.5">
            {trustPoints.map((point, index) => (
              <StaggerItem key={point.id}>
                <TrustPointItem point={point} index={index} locale={locale} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.15} scale>
          <GlassCard strong className="glass-tint-purple relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden p-3 sm:p-4">
            <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
              <Image
                src={trustContent.portrait.src}
                alt={trustContent.portrait.alt[locale]}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
            <div
              aria-hidden="true"
              className="animate-float-slow absolute -bottom-8 -start-8 h-40 w-40 rounded-full bg-brand-blue/25 blur-3xl"
            />
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
