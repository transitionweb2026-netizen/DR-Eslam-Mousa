import "server-only";
import { getPublicClient } from "./publicClient";
import { toMediaImage, resolveMediaUrl, type MediaRow } from "./media";
import { asRecord, optionalStr, localized, localizedArray, nestedCta, type JsonRecord } from "./jsonContent";
import { siteContent } from "@/data/site";
import { heroContent as fallbackHomeHero, type HeroContent } from "@/data/hero";
import { doctorIntroContent as fallbackDoctorIntro, type DoctorIntroContent } from "@/data/doctorIntro";
import { specialtiesIntro as fallbackSpecialtiesIntro } from "@/data/specialties";
import { conditionsIntro as fallbackConditionsIntro } from "@/data/conditions";
import { trustContent as fallbackTrustContent } from "@/data/trustPoints";
import { videosIntro as fallbackFeaturedVideosIntro } from "@/data/videos";
import { faqIntro as fallbackFaqIntro } from "@/data/faq";
import { articlesIntro as fallbackFeaturedArticlesIntro } from "@/data/articles";
import { doctorBioContent as fallbackAboutDoctor, type DoctorBioContent } from "@/data/doctor";
import { certificatesIntro as fallbackCertificatesIntro } from "@/data/certificates";
import { careerIntro as fallbackCareerIntro } from "@/data/career";
import type { Localized, MediaImage } from "@/lib/types";

/**
 * The `pages` / `page_sections` layer — every "Pages" screen in the CMS
 * admin. One function per real page, each returning a bundle shaped for
 * that page's exact components. A section that Supabase can't see (hidden
 * by an admin, or RLS simply has nothing for it) maps to `null` so the page
 * can skip rendering it — that's how the CMS's per-section visibility
 * toggle actually takes effect. The one exception is `hero`: every page
 * structurally needs one, so a missing hero row falls back to the bundled
 * copy instead of leaving the page headerless. When Supabase itself is
 * unconfigured/unreachable, everything falls back to bundled copy instead —
 * see publicClient.ts.
 */

export interface IntroContent {
  eyebrow: Localized;
  title: Localized;
  description: Localized;
}

export interface WhyTrustContent {
  eyebrow: Localized;
  title: Localized;
  description: Localized;
  portrait: MediaImage;
}

export interface AboutDoctorContent {
  eyebrow: Localized;
  title: Localized;
  paragraphs: Localized<string[]>;
  supportingStatement: Localized;
  image: MediaImage;
}

export interface CtaRef {
  label: Localized;
  /** Relative to the locale root, with a leading slash, e.g. "/contact". */
  url: string;
}

export interface PageHero {
  content: HeroContent;
  primaryCta: CtaRef;
  secondaryCta: CtaRef;
}

const fallbackWhyTrust: WhyTrustContent = {
  eyebrow: fallbackTrustContent.eyebrow,
  title: fallbackTrustContent.title,
  description: fallbackTrustContent.description,
  portrait: fallbackTrustContent.portrait,
};

const BOOK_APPOINTMENT: CtaRef = { label: siteContent.actions.bookAppointment, url: "/contact" };
const EXPLORE_SERVICES: CtaRef = { label: siteContent.actions.exploreServices, url: "/services" };
const CONTACT_US: CtaRef = { label: siteContent.actions.contactUs, url: "/contact" };

// ---------------------------------------------------------------------------
// Per-page fallback Hero copy — used when Supabase is unavailable, or when a
// page's `hero` row is (unexpectedly) absent. Matches the live site's
// current text exactly; kept here instead of inline in each page.tsx now
// that Supabase is the primary source.
// ---------------------------------------------------------------------------

const fallbackAboutHero: HeroContent = {
  ...fallbackHomeHero,
  eyebrow: { en: "About the Surgeon", ar: "عن الجراح" },
  headline: { en: "15+ Years of Precision Orthopedic", ar: "أكثر من 15 عامًا من جراحة العظام" },
  headlineAccent: { en: "Care & Expertise", ar: "الدقيقة والخبرة الموثوقة" },
  description: {
    en: "Dr. Islam Moussa combines surgical precision, modern technique and genuine, patient-centered care — a career built one careful diagnosis at a time.",
    ar: "يجمع د. إسلام موسى بين الدقة الجراحية والأساليب الحديثة والرعاية الحقيقية المتمحورة حول المريض، في مسيرة مهنية بُنيت على تشخيص دقيق لكل حالة.",
  },
};

const fallbackServicesHero: HeroContent = {
  ...fallbackHomeHero,
  eyebrow: { en: "Services & Conditions", ar: "الخدمات والحالات" },
  headline: { en: "Orthopedic Surgery,", ar: "جراحة عظام" },
  headlineAccent: { en: "Tailored to Every Diagnosis", ar: "مصممة خصيصًا لكل تشخيص" },
  description: {
    en: "From full surgical specialties to the everyday conditions that bring patients in, explore every treatment Dr. Islam Moussa provides.",
    ar: "من التخصصات الجراحية الكاملة إلى الحالات اليومية التي تدفع المرضى لزيارته، تعرف على كل علاج يقدمه د. إسلام موسى.",
  },
};

const fallbackVideosHero: HeroContent = {
  ...fallbackHomeHero,
  eyebrow: { en: "Video Library", ar: "مكتبة الفيديو" },
  headline: { en: "Watch & Learn,", ar: "شاهد وتعلّم" },
  headlineAccent: { en: "Straight from Dr. Islam Moussa", ar: "مباشرة من د. إسلام موسى" },
  description: {
    en: "Short, practical explanations of common orthopedic conditions, treatments and recovery — filmed to be easy to understand and easy to trust.",
    ar: "شروحات قصيرة وعملية لأشهر حالات العظام وعلاجاتها ومراحل التعافي منها، بأسلوب سهل الفهم وموثوق.",
  },
};

const fallbackArticlesHero: HeroContent = {
  ...fallbackHomeHero,
  eyebrow: { en: "From the Blog", ar: "من المدونة" },
  headline: { en: "Practical Guidance,", ar: "إرشادات عملية" },
  headlineAccent: { en: "Written for Real Patients", ar: "مكتوبة لمرضى حقيقيين" },
  description: {
    en: "Easy-to-understand articles on orthopedic health — the same clear explanations Dr. Islam Moussa gives in the clinic, in writing.",
    ar: "مقالات سهلة الفهم حول صحة العظام والمفاصل، بنفس الشروحات الواضحة التي يقدمها د. إسلام موسى في العيادة، مكتوبة هنا.",
  },
};

const fallbackContactHero: HeroContent = {
  ...fallbackHomeHero,
  eyebrow: { en: "Get in Touch", ar: "تواصل معنا" },
  headline: { en: "Let's Talk About", ar: "لنتحدث عن" },
  headlineAccent: { en: "Your Recovery", ar: "رحلة تعافيك" },
  description: {
    en: "Call, message on WhatsApp, or send a quick note below — Dr. Islam Moussa's clinic is ready to help you take the next step.",
    ar: "اتصل بنا، أو راسلنا عبر واتساب، أو أرسل رسالة سريعة أدناه، فعيادة د. إسلام موسى جاهزة لمساعدتك على اتخاذ خطوتك التالية.",
  },
};

const fallbackContactIntro: IntroContent = {
  eyebrow: { en: "Visit or Reach Out", ar: "زُرنا أو تواصل معنا" },
  title: { en: "Find Us & Send a Message", ar: "موقعنا وإرسال رسالة" },
  description: {
    en: "The clinic is easy to reach, and the fastest way to book is a quick WhatsApp message.",
    ar: "يسهل الوصول إلى العيادة، وأسرع طريقة للحجز هي رسالة سريعة عبر واتساب.",
  },
};

// ---------------------------------------------------------------------------
// Section-content mappers — each turns one section_type's raw jsonb into the
// exact shape its frontend component expects.
// ---------------------------------------------------------------------------

function toHeroContent(content: JsonRecord, fallback: HeroContent, media: Map<string, MediaRow>): HeroContent {
  const imageId = optionalStr(content, "image_id");
  const imageMedia = imageId ? (media.get(imageId) ?? null) : null;
  const position = optionalStr(content, "image_position") ?? fallback.image.position;
  return {
    eyebrow: localized(content, "eyebrow", fallback.eyebrow),
    headline: localized(content, "headline", fallback.headline),
    headlineAccent: localized(content, "headlineAccent", fallback.headlineAccent),
    description: localized(content, "description", fallback.description),
    image: toMediaImage(imageMedia, fallback.image.alt, { position }),
  };
}

function toHeroCtas(content: JsonRecord, fallbackPrimary: CtaRef, fallbackSecondary: CtaRef) {
  return {
    primaryCta: nestedCta(content, "primaryCta", fallbackPrimary),
    secondaryCta: nestedCta(content, "secondaryCta", fallbackSecondary),
  };
}

function toIntroContent(content: JsonRecord, fallback: IntroContent): IntroContent {
  return {
    eyebrow: localized(content, "eyebrow", fallback.eyebrow),
    title: localized(content, "title", fallback.title),
    description: localized(content, "description", fallback.description),
  };
}

function toDoctorIntroContent(content: JsonRecord, fallback: DoctorIntroContent, media: Map<string, MediaRow>): DoctorIntroContent {
  const cta = nestedCta(content, "cta", { label: fallback.cta.label, url: `/${fallback.cta.path}` });
  const coverId = optionalStr(content, "video_cover_media_id");
  const videoId = optionalStr(content, "video_media_id");
  const coverMedia = coverId ? (media.get(coverId) ?? null) : null;
  const videoMedia = videoId ? (media.get(videoId) ?? null) : null;
  const videoAlt = localized(content, "video_alt", fallback.video.poster.alt);
  return {
    eyebrow: localized(content, "eyebrow", fallback.eyebrow),
    title: localized(content, "heading", fallback.title),
    paragraph: localized(content, "paragraph", fallback.paragraph),
    supporting: localized(content, "supporting", fallback.supporting),
    cta: { label: cta.label, path: cta.url.replace(/^\/+/, "") },
    video: {
      poster: toMediaImage(coverMedia, fallback.video.poster.alt, { alt: videoAlt }),
      src: videoMedia ? (resolveMediaUrl(videoMedia) ?? "") : "",
    },
  };
}

function toWhyTrustContent(content: JsonRecord, fallback: WhyTrustContent, media: Map<string, MediaRow>): WhyTrustContent {
  const portraitId = optionalStr(content, "portrait_media_id");
  const portraitMedia = portraitId ? (media.get(portraitId) ?? null) : null;
  const portraitAlt = localized(content, "portrait_alt", fallback.portrait.alt);
  return {
    eyebrow: localized(content, "eyebrow", fallback.eyebrow),
    title: localized(content, "heading", fallback.title),
    description: localized(content, "description", fallback.description),
    portrait: toMediaImage(portraitMedia, fallback.portrait.alt, { alt: portraitAlt }),
  };
}

function toAboutDoctorContent(content: JsonRecord, fallback: DoctorBioContent, media: Map<string, MediaRow>): AboutDoctorContent {
  const imageId = optionalStr(content, "image_id");
  const imageMedia = imageId ? (media.get(imageId) ?? null) : null;
  const imageAlt = localized(content, "image_alt", fallback.image.alt);
  return {
    eyebrow: localized(content, "eyebrow", fallback.eyebrow),
    title: localized(content, "heading", fallback.title),
    paragraphs: localizedArray(content, "paragraphs", fallback.paragraphs),
    supportingStatement: localized(content, "supportingStatement", fallback.supportingStatement),
    image: toMediaImage(imageMedia, fallback.image.alt, { alt: imageAlt, position: fallback.image.position }),
  };
}

// ---------------------------------------------------------------------------
// Shared loader
// ---------------------------------------------------------------------------

type PublicClient = NonNullable<Awaited<ReturnType<typeof getPublicClient>>>;
type SectionsResult = { supabase: PublicClient; sections: Map<string, JsonRecord> } | "unavailable";

async function loadPageSections(slug: string): Promise<SectionsResult> {
  const supabase = await getPublicClient();
  if (!supabase) return "unavailable";
  try {
    const { data: page } = await supabase.from("pages").select("*").eq("slug", slug).maybeSingle();
    if (!page) return "unavailable";
    const { data: rows } = await supabase.from("page_sections").select("*").eq("page_id", page.id);
    if (!rows) return "unavailable";
    return { supabase, sections: new Map(rows.map((r) => [r.section_type, asRecord(r.content) ?? {}])) };
  } catch (error) {
    console.error(`[cms] loadPageSections(${JSON.stringify(slug)}) failed:`, error);
    return "unavailable";
  }
}

const MEDIA_ID_KEYS = ["image_id", "video_cover_media_id", "video_media_id", "portrait_media_id"];

async function loadSectionMedia(supabase: PublicClient, sections: Map<string, JsonRecord>): Promise<Map<string, MediaRow>> {
  const ids = new Set<string>();
  for (const content of sections.values()) {
    for (const key of MEDIA_ID_KEYS) {
      const id = optionalStr(content, key);
      if (id) ids.add(id);
    }
  }
  if (ids.size === 0) return new Map();
  const { data } = await supabase.from("media").select("*").in("id", [...ids]);
  return new Map((data ?? []).map((m) => [m.id, m] as const));
}

function buildHero(sections: Map<string, JsonRecord>, media: Map<string, MediaRow>, fallback: HeroContent, fallbackCtas: { primary: CtaRef; secondary: CtaRef }): PageHero {
  const raw = sections.get("hero");
  if (!raw) return { content: fallback, primaryCta: fallbackCtas.primary, secondaryCta: fallbackCtas.secondary };
  const ctas = toHeroCtas(raw, fallbackCtas.primary, fallbackCtas.secondary);
  return { content: toHeroContent(raw, fallback, media), primaryCta: ctas.primaryCta, secondaryCta: ctas.secondaryCta };
}

// ---------------------------------------------------------------------------
// Home
// ---------------------------------------------------------------------------

export interface HomeSections {
  hero: PageHero;
  showStatistics: boolean;
  doctorIntro: DoctorIntroContent | null;
  specialtiesIntro: IntroContent | null;
  conditionsIntro: IntroContent | null;
  whyTrust: WhyTrustContent | null;
  featuredVideosIntro: IntroContent | null;
  faqIntro: IntroContent | null;
  featuredArticlesIntro: IntroContent | null;
}

export async function getHomeSections(): Promise<HomeSections> {
  const result = await loadPageSections("");
  if (result === "unavailable") {
    return {
      hero: { content: fallbackHomeHero, primaryCta: BOOK_APPOINTMENT, secondaryCta: EXPLORE_SERVICES },
      showStatistics: true,
      doctorIntro: fallbackDoctorIntro,
      specialtiesIntro: fallbackSpecialtiesIntro,
      conditionsIntro: fallbackConditionsIntro,
      whyTrust: fallbackWhyTrust,
      featuredVideosIntro: fallbackFeaturedVideosIntro,
      faqIntro: fallbackFaqIntro,
      featuredArticlesIntro: fallbackFeaturedArticlesIntro,
    };
  }
  const { supabase, sections } = result;
  const media = await loadSectionMedia(supabase, sections);

  return {
    hero: buildHero(sections, media, fallbackHomeHero, { primary: BOOK_APPOINTMENT, secondary: EXPLORE_SERVICES }),
    showStatistics: sections.has("statistics_intro"),
    doctorIntro: sections.has("doctor_intro") ? toDoctorIntroContent(sections.get("doctor_intro")!, fallbackDoctorIntro, media) : null,
    specialtiesIntro: sections.has("specialties_intro") ? toIntroContent(sections.get("specialties_intro")!, fallbackSpecialtiesIntro) : null,
    conditionsIntro: sections.has("conditions_intro") ? toIntroContent(sections.get("conditions_intro")!, fallbackConditionsIntro) : null,
    whyTrust: sections.has("why_trust") ? toWhyTrustContent(sections.get("why_trust")!, fallbackWhyTrust, media) : null,
    featuredVideosIntro: sections.has("featured_videos_intro")
      ? toIntroContent(sections.get("featured_videos_intro")!, fallbackFeaturedVideosIntro)
      : null,
    faqIntro: sections.has("faq_intro") ? toIntroContent(sections.get("faq_intro")!, fallbackFaqIntro) : null,
    featuredArticlesIntro: sections.has("featured_articles_intro")
      ? toIntroContent(sections.get("featured_articles_intro")!, fallbackFeaturedArticlesIntro)
      : null,
  };
}

// ---------------------------------------------------------------------------
// About
// ---------------------------------------------------------------------------

export interface AboutSections {
  hero: PageHero;
  aboutDoctor: AboutDoctorContent;
  certificatesIntro: IntroContent | null;
  showStatistics: boolean;
  careerIntro: IntroContent | null;
  specialtiesIntro: IntroContent | null;
}

const fallbackAboutDoctorContent: AboutDoctorContent = { ...fallbackAboutDoctor };

export async function getAboutSections(): Promise<AboutSections> {
  const result = await loadPageSections("about");
  if (result === "unavailable") {
    return {
      hero: { content: fallbackAboutHero, primaryCta: BOOK_APPOINTMENT, secondaryCta: CONTACT_US },
      aboutDoctor: fallbackAboutDoctorContent,
      certificatesIntro: fallbackCertificatesIntro,
      showStatistics: true,
      careerIntro: fallbackCareerIntro,
      specialtiesIntro: fallbackSpecialtiesIntro,
    };
  }
  const { supabase, sections } = result;
  const media = await loadSectionMedia(supabase, sections);

  return {
    hero: buildHero(sections, media, fallbackAboutHero, { primary: BOOK_APPOINTMENT, secondary: CONTACT_US }),
    aboutDoctor: sections.has("about_doctor")
      ? toAboutDoctorContent(sections.get("about_doctor")!, fallbackAboutDoctor, media)
      : fallbackAboutDoctorContent,
    certificatesIntro: sections.has("certificates_intro") ? toIntroContent(sections.get("certificates_intro")!, fallbackCertificatesIntro) : null,
    showStatistics: sections.has("statistics_intro"),
    careerIntro: sections.has("career_intro") ? toIntroContent(sections.get("career_intro")!, fallbackCareerIntro) : null,
    specialtiesIntro: sections.has("specialties_intro") ? toIntroContent(sections.get("specialties_intro")!, fallbackSpecialtiesIntro) : null,
  };
}

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export interface ServicesSections {
  hero: PageHero;
  specialtiesIntro: IntroContent;
  conditionsIntro: IntroContent;
}

export async function getServicesSections(): Promise<ServicesSections> {
  const result = await loadPageSections("services");
  if (result === "unavailable") {
    return {
      hero: { content: fallbackServicesHero, primaryCta: BOOK_APPOINTMENT, secondaryCta: EXPLORE_SERVICES },
      specialtiesIntro: fallbackSpecialtiesIntro,
      conditionsIntro: fallbackConditionsIntro,
    };
  }
  const { supabase, sections } = result;
  const media = await loadSectionMedia(supabase, sections);

  return {
    hero: buildHero(sections, media, fallbackServicesHero, { primary: BOOK_APPOINTMENT, secondary: EXPLORE_SERVICES }),
    specialtiesIntro: sections.has("specialties_intro")
      ? toIntroContent(sections.get("specialties_intro")!, fallbackSpecialtiesIntro)
      : fallbackSpecialtiesIntro,
    conditionsIntro: sections.has("conditions_intro")
      ? toIntroContent(sections.get("conditions_intro")!, fallbackConditionsIntro)
      : fallbackConditionsIntro,
  };
}

// ---------------------------------------------------------------------------
// Videos / Articles — hero only
// ---------------------------------------------------------------------------

export async function getVideosHero(): Promise<PageHero> {
  const result = await loadPageSections("videos");
  if (result === "unavailable") return { content: fallbackVideosHero, primaryCta: BOOK_APPOINTMENT, secondaryCta: EXPLORE_SERVICES };
  const { supabase, sections } = result;
  const media = await loadSectionMedia(supabase, sections);
  return buildHero(sections, media, fallbackVideosHero, { primary: BOOK_APPOINTMENT, secondary: EXPLORE_SERVICES });
}

export async function getArticlesHero(): Promise<PageHero> {
  const result = await loadPageSections("articles");
  if (result === "unavailable") return { content: fallbackArticlesHero, primaryCta: BOOK_APPOINTMENT, secondaryCta: EXPLORE_SERVICES };
  const { supabase, sections } = result;
  const media = await loadSectionMedia(supabase, sections);
  return buildHero(sections, media, fallbackArticlesHero, { primary: BOOK_APPOINTMENT, secondary: EXPLORE_SERVICES });
}

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------

export interface ContactSections {
  hero: PageHero;
  contactIntro: IntroContent;
}

export async function getContactSections(): Promise<ContactSections> {
  const result = await loadPageSections("contact");
  if (result === "unavailable") {
    return {
      hero: { content: fallbackContactHero, primaryCta: BOOK_APPOINTMENT, secondaryCta: EXPLORE_SERVICES },
      contactIntro: fallbackContactIntro,
    };
  }
  const { supabase, sections } = result;
  const media = await loadSectionMedia(supabase, sections);

  return {
    hero: buildHero(sections, media, fallbackContactHero, { primary: BOOK_APPOINTMENT, secondary: EXPLORE_SERVICES }),
    contactIntro: sections.has("contact_intro") ? toIntroContent(sections.get("contact_intro")!, fallbackContactIntro) : fallbackContactIntro,
  };
}
