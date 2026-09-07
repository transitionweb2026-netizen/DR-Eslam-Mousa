import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { fontVariables } from "@/lib/fonts";
import { isLocale, locales, localeDirection, localeTag, type Locale } from "@/lib/i18n/config";
import { siteContent } from "@/data/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { PageTransition } from "@/components/motion/PageTransition";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";

  return {
    metadataBase: new URL("https://www.dr-islammoussa.com"),
    title: {
      template: siteContent.seo.titleTemplate[locale],
      default: siteContent.seo.defaultTitle[locale],
    },
    description: siteContent.seo.defaultDescription[locale],
    keywords: siteContent.seo.keywords[locale],
    openGraph: {
      title: siteContent.seo.defaultTitle[locale],
      description: siteContent.seo.defaultDescription[locale],
      locale: localeTag[locale],
      type: "website",
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;

  return (
    <html lang={localeTag[locale]} dir={localeDirection[locale]} className={fontVariables}>
      <body className="antialiased">
        <MotionProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-brand-purple focus:shadow-glass"
          >
            {siteContent.actions.skipToContent[locale]}
          </a>
          <Navbar locale={locale} />
          <PageTransition>
            <main id="main-content">{children}</main>
          </PageTransition>
          <Footer locale={locale} />
        </MotionProvider>
      </body>
    </html>
  );
}
