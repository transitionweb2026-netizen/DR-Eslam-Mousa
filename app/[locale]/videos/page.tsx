import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import type { Localized } from "@/lib/types";
import { buildAlternates } from "@/lib/seo";
import { videos } from "@/data/videos";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { VideoCard } from "@/components/home/VideoCard";
import { CTASection } from "@/components/home/CTASection";

const pageCopy = {
  eyebrow: { en: "Video Library", ar: "مكتبة الفيديو" },
  title: { en: "All Videos", ar: "كل الفيديوهات" },
  description: {
    en: "Every educational video from Dr. Islam Moussa, in one library.",
    ar: "كل فيديو تعليمي من د. إسلام موسى، في مكتبة واحدة.",
  },
} satisfies Record<"eyebrow" | "title" | "description", Localized>;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  return {
    title: pageCopy.title[locale],
    description: pageCopy.description[locale],
    alternates: buildAlternates(locale, "videos"),
  };
}

export default async function VideosPage({ params }: PageProps<"/[locale]/videos">) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;

  return (
    <>
      <section className="px-4 pb-4 pt-16 sm:px-6 sm:pt-24 lg:px-8">
        <SectionHeader
          locale={locale}
          eyebrow={pageCopy.eyebrow}
          title={pageCopy.title}
          description={pageCopy.description}
          titleAs="h1"
          className="mx-auto max-w-3xl"
        />
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
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
