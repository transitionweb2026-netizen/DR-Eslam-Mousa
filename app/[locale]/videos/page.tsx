import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import type { HeroContent } from "@/data/hero";
import { heroContent } from "@/data/hero";
import { buildAlternates } from "@/lib/seo";
import { videos } from "@/data/videos";

import { Hero } from "@/components/home/Hero";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { VideoCard } from "@/components/home/VideoCard";
import { CTASection } from "@/components/home/CTASection";

const videosHero: HeroContent = {
  ...heroContent,
  eyebrow: { en: "Video Library", ar: "مكتبة الفيديو" },
  headline: { en: "Watch & Learn,", ar: "شاهد وتعلّم" },
  headlineAccent: { en: "Straight from Dr. Islam Moussa", ar: "مباشرة من د. إسلام موسى" },
  description: {
    en: "Short, practical explanations of common orthopedic conditions, treatments and recovery — filmed to be easy to understand and easy to trust.",
    ar: "شروحات قصيرة وعملية لأشهر حالات العظام وعلاجاتها ومراحل التعافي منها، بأسلوب سهل الفهم وموثوق.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  return {
    title: videosHero.headline[locale] + " " + videosHero.headlineAccent[locale],
    description: videosHero.description[locale],
    alternates: buildAlternates(locale, "videos"),
  };
}

export default async function VideosPage({ params }: PageProps<"/[locale]/videos">) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;

  return (
    <>
      <Hero locale={locale} content={videosHero} />

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

      <CTASection locale={locale} />
    </>
  );
}
