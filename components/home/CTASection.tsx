import { finalCtaContent, type CtaContent } from "@/data/cta";
import { siteContent } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import type { Locale } from "@/lib/i18n/config";

/**
 * The site's one Final CTA design, used verbatim on every page. Defaults to
 * the Home page's copy — pass `content` only where a page's closing message
 * should read a little differently (the layout, glass, gradient, buttons
 * and animation never change).
 */
export function CTASection({ locale, content = finalCtaContent }: { locale: Locale; content?: CtaContent }) {
  const localeRoot = `/${locale}`;

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <Reveal scale className="mx-auto max-w-7xl">
        <div className="animate-gradient-pan bg-gradient-brand relative overflow-hidden rounded-[2.25rem] px-6 py-14 text-center shadow-glass-lg sm:px-12 sm:py-20 lg:rounded-[2.75rem]">
          {/* Floating ambient light + glass reflection for depth. */}
          <div
            aria-hidden="true"
            className="animate-float-slow absolute -top-16 start-[-4rem] h-56 w-56 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="animate-float-slow absolute -bottom-20 end-[-3rem] h-64 w-64 rounded-full bg-white/10 blur-3xl [animation-delay:-4s]"
          />
          <div aria-hidden="true" className="glass-sheen absolute inset-0" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-black/25 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
              {content.eyebrow[locale]}
            </span>
            <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {content.title[locale]}
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-white sm:text-lg">
              {content.description[locale]}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href={`${localeRoot}/contact`} size="lg" variant="light" withArrow>
                {siteContent.actions.bookAppointment[locale]}
              </Button>
              <Button href={`${localeRoot}/contact`} size="lg" variant="secondary">
                {siteContent.actions.contactUs[locale]}
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
