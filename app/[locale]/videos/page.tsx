import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildAlternates } from "@/lib/seo";
import { getVideosHero } from "@/lib/cms/publicSections";
import { getVideos } from "@/lib/cms/publicContent";
import { getFinalCtaSettings } from "@/lib/cms/publicSettings";

import { Hero } from "@/components/home/Hero";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { VideoCard } from "@/components/home/VideoCard";
import { CTASection } from "@/components/home/CTASection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const hero = await getVideosHero();
  return {
    title: hero.content.headline[locale] + " " + hero.content.headlineAccent[locale],
    description: hero.content.description[locale],
    alternates: buildAlternates(locale, "videos"),
  };
}

export default async function VideosPage({ params }: PageProps<"/[locale]/videos">) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const localeRoot = `/${locale}`;

  const [hero, videos, cta] = await Promise.all([getVideosHero(), getVideos(), getFinalCtaSettings()]);

  return (
    <>
      <Hero
        locale={locale}
        content={hero.content}
        primaryCta={{ label: hero.primaryCta.label, href: `${localeRoot}${hero.primaryCta.url}` }}
        secondaryCta={{ label: hero.secondaryCta.label, href: `${localeRoot}${hero.secondaryCta.url}` }}
      />

      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8" aria-label="Video library">
        <div className="mx-auto max-w-7xl">
          <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <StaggerItem key={video.id} className="h-full">
                <VideoCard video={video} locale={locale} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CTASection locale={locale} content={cta} />
    </>
  );
}
