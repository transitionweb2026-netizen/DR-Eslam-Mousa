import Image from "next/image";
import { heroContent } from "@/data/hero";
import { siteContent } from "@/data/site";
import { localeDirection, type Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import { HeroContactPanel } from "./HeroContactPanel";

export function Hero({ locale }: { locale: Locale }) {
  const isRtl = localeDirection[locale] === "rtl";
  const localeRoot = `/${locale}`;

  return (
    <section className="mx-3 mt-3 sm:mx-6 sm:mt-5 lg:mx-8" aria-label="Hero">
      <div className="relative isolate min-h-[640px] overflow-hidden rounded-[2rem] sm:min-h-[700px] lg:min-h-[800px] lg:rounded-[2.5rem]">
        <Image
          src={heroContent.image.src}
          alt={heroContent.image.alt[locale]}
          fill
          priority
          sizes="100vw"
          style={{ objectPosition: heroContent.image.position }}
          className="object-cover"
        />

        {/* Legibility scrim: tinted to match the page background on the text
            side (so it reads as one continuous surface in either theme),
            fully transparent well before the image's focal area — the
            doctor stays visually clear, this only shades the reading zone. */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0",
            isRtl ? "bg-gradient-to-l" : "bg-gradient-to-r",
            "from-[var(--color-hero-scrim)] from-10% via-[var(--color-hero-scrim)]/70 via-40% to-transparent"
          )}
        />
        {/* Photographic bottom vignette — darkens the image itself for
            depth, independent of page theme. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
        />

        {/* Ambient light — the site's continuous, subtle "gradient movement". */}
        <div
          aria-hidden="true"
          className="animate-float-slow absolute -top-20 end-[-5rem] h-72 w-72 rounded-full bg-brand-blue/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="animate-float-slow absolute bottom-10 start-[-4rem] h-64 w-64 rounded-full bg-brand-purple-soft/30 blur-3xl [animation-delay:-3s]"
        />

        <div className="relative z-10 flex h-full flex-col justify-center px-6 py-16 sm:px-10 lg:max-w-2xl lg:px-16 lg:py-24">
          <Reveal>
            <span className="chip-purple inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider shadow-glass">
              {heroContent.eyebrow[locale]}
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.12] text-brand-ink sm:text-5xl lg:text-6xl">
              {heroContent.headline[locale]}{" "}
              <span className="text-gradient-brand">{heroContent.headlineAccent[locale]}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-brand-ink-soft sm:text-lg">
              {heroContent.description[locale]}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Button href={`${localeRoot}/contact`} size="lg" withArrow>
                {siteContent.actions.bookAppointment[locale]}
              </Button>
              <Button href={`${localeRoot}/services`} size="lg" variant="secondary">
                {siteContent.actions.exploreServices[locale]}
              </Button>
            </div>
          </Reveal>
        </div>

        <HeroContactPanel
          locale={locale}
          className="relative z-10 mx-6 mb-8 sm:mx-10 lg:absolute lg:bottom-12 lg:end-12 lg:mx-0 lg:mb-0"
        />
      </div>
    </section>
  );
}
