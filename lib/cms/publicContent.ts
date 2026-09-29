import "server-only";
import { getPublicClient } from "./publicClient";
import { toMediaImage, resolveMediaUrl, type MediaRow } from "./media";
import { specialties as fallbackSpecialties, type SpecialtyItem, type SpecialtyIcon } from "@/data/specialties";
import { conditions as fallbackConditions, type ConditionItem } from "@/data/conditions";
import { certificates as fallbackCertificates, type CertificateItem } from "@/data/certificates";
import { careerMilestones as fallbackCareerMilestones, type CareerMilestone } from "@/data/career";
import { statsContent as fallbackStats, type StatItem } from "@/data/stats";
import { faqItems as fallbackFaqItems, type FaqItem } from "@/data/faq";
import { videos as fallbackVideos, type VideoItem } from "@/data/videos";
import { articles as fallbackArticles, type ArticleItem } from "@/data/articles";
import type { IconName } from "@/components/icons/Icon";
import type { Tables } from "@/lib/supabase/types";
import type { Localized, MediaImage } from "@/lib/types";

/**
 * The 8 "Content" collections — every function is Supabase-first (active /
 * published rows only, ordered by `display_order`) with a typed fallback to
 * the matching /data/*.ts array, mirroring publicSettings.ts's resilience
 * pattern. Each collection is fetched ONCE and reused across every page
 * that shows it (Home's featured subset and the full-list page both read
 * the same rows) — never duplicated, per the CMS spec.
 */

async function loadMediaMap(
  supabase: NonNullable<Awaited<ReturnType<typeof getPublicClient>>>,
  ids: (string | null | undefined)[]
): Promise<Map<string, MediaRow>> {
  const unique = [...new Set(ids.filter((id): id is string => Boolean(id)))];
  if (unique.length === 0) return new Map();
  const { data } = await supabase.from("media").select("*").in("id", unique);
  return new Map((data ?? []).map((m) => [m.id, m] as const));
}

type ServiceRow = Tables<"services">;
type ConditionRow = Tables<"conditions">;

function toSpecialtyItem(row: ServiceRow, media: Map<string, MediaRow>): SpecialtyItem {
  const image = toMediaImage(row.image_id ? (media.get(row.image_id) ?? null) : null, { en: row.title_en, ar: row.title_ar }, {
    alt: row.image_alt_en && row.image_alt_ar ? { en: row.image_alt_en, ar: row.image_alt_ar } : undefined,
  });
  return {
    id: row.id,
    slug: row.slug,
    icon: row.icon as SpecialtyIcon,
    title: { en: row.title_en, ar: row.title_ar },
    description: { en: row.short_description_en, ar: row.short_description_ar },
    image,
    details: { en: row.full_description_en, ar: row.full_description_ar },
    benefits: { en: row.benefits_en, ar: row.benefits_ar },
  };
}

export async function getServices(): Promise<SpecialtyItem[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("services").select("*").order("display_order");
      if (data && data.length > 0) {
        const media = await loadMediaMap(supabase, data.map((r) => r.image_id));
        return data.map((row) => toSpecialtyItem(row, media));
      }
    } catch (error) {
      console.error("[cms] getServices failed:", error);
    }
  }
  return fallbackSpecialties;
}

function toConditionItem(row: ConditionRow, media: Map<string, MediaRow>): ConditionItem {
  const image = toMediaImage(row.image_id ? (media.get(row.image_id) ?? null) : null, { en: row.title_en, ar: row.title_ar }, {
    alt: row.image_alt_en && row.image_alt_ar ? { en: row.image_alt_en, ar: row.image_alt_ar } : undefined,
  });
  return {
    id: row.id,
    slug: row.slug,
    icon: row.icon as ConditionItem["icon"],
    title: { en: row.title_en, ar: row.title_ar },
    description: { en: row.short_description_en, ar: row.short_description_ar },
    image,
    details: { en: row.full_description_en, ar: row.full_description_ar },
    benefits: { en: row.benefits_en, ar: row.benefits_ar },
  };
}

export async function getConditions(): Promise<ConditionItem[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("conditions").select("*").order("display_order");
      if (data && data.length > 0) {
        const media = await loadMediaMap(supabase, data.map((r) => r.image_id));
        return data.map((row) => toConditionItem(row, media));
      }
    } catch (error) {
      console.error("[cms] getConditions failed:", error);
    }
  }
  return fallbackConditions;
}

export async function getCertificates(): Promise<CertificateItem[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("certificates").select("*").order("display_order");
      if (data && data.length > 0) {
        const media = await loadMediaMap(supabase, data.map((r) => r.image_id));
        return data.map((row) => ({
          id: row.id,
          title: { en: row.title_en, ar: row.title_ar },
          institution: { en: row.institution_en, ar: row.institution_ar },
          year: row.year,
          image: toMediaImage(row.image_id ? (media.get(row.image_id) ?? null) : null, { en: row.title_en, ar: row.title_ar }, {
            alt: row.image_alt_en && row.image_alt_ar ? { en: row.image_alt_en, ar: row.image_alt_ar } : undefined,
          }),
        }));
      }
    } catch (error) {
      console.error("[cms] getCertificates failed:", error);
    }
  }
  return fallbackCertificates;
}

export async function getCareerMilestones(): Promise<CareerMilestone[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("career_items").select("*").order("display_order");
      if (data && data.length > 0) {
        return data.map((row) => ({
          id: row.id,
          year: row.year,
          icon: row.icon as IconName,
          title: { en: row.position_en, ar: row.position_ar },
          institution: { en: row.institution_en, ar: row.institution_ar },
          description: { en: row.description_en ?? "", ar: row.description_ar ?? "" },
        }));
      }
    } catch (error) {
      console.error("[cms] getCareerMilestones failed:", error);
    }
  }
  return fallbackCareerMilestones;
}

export async function getStatistics(): Promise<StatItem[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("statistics").select("*").order("display_order");
      if (data && data.length > 0) {
        return data.map((row) => ({
          id: row.id,
          value: Number(row.value),
          suffix: row.suffix,
          label: { en: row.label_en, ar: row.label_ar },
          icon: row.icon as StatItem["icon"],
        }));
      }
    } catch (error) {
      console.error("[cms] getStatistics failed:", error);
    }
  }
  return fallbackStats;
}

export async function getFaqs(): Promise<FaqItem[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("faqs").select("*").order("display_order");
      if (data && data.length > 0) {
        return data.map((row) => ({
          id: row.id,
          question: { en: row.question_en, ar: row.question_ar },
          answer: { en: row.answer_en, ar: row.answer_ar },
        }));
      }
    } catch (error) {
      console.error("[cms] getFaqs failed:", error);
    }
  }
  return fallbackFaqItems;
}

export async function getVideos(): Promise<VideoItem[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("videos").select("*").order("display_order");
      if (data && data.length > 0) {
        const media = await loadMediaMap(supabase, data.flatMap((r) => [r.cover_media_id, r.video_media_id]));
        return data.map((row) => {
          const videoMedia = row.video_media_id ? (media.get(row.video_media_id) ?? null) : null;
          return {
            id: row.id,
            slug: row.slug,
            title: { en: row.title_en, ar: row.title_ar },
            description: { en: row.description_en ?? "", ar: row.description_ar ?? "" },
            thumbnail: toMediaImage(row.cover_media_id ? (media.get(row.cover_media_id) ?? null) : null, { en: row.title_en, ar: row.title_ar }, {
              alt: row.cover_alt_en && row.cover_alt_ar ? { en: row.cover_alt_en, ar: row.cover_alt_ar } : undefined,
            }),
            src: (videoMedia ? resolveMediaUrl(videoMedia) : null) ?? row.external_url ?? "",
            duration: row.duration_label ?? "",
            category: { en: row.category_en ?? "", ar: row.category_ar ?? "" },
            featured: row.is_featured,
            publishedAt: row.published_at,
          } satisfies VideoItem;
        });
      }
    } catch (error) {
      console.error("[cms] getVideos failed:", error);
    }
  }
  return fallbackVideos;
}

export async function getFeaturedVideos(): Promise<VideoItem[]> {
  const all = await getVideos();
  return all.filter((v) => v.featured);
}

function tiptapToPlainParagraphs(doc: unknown): string[] {
  if (!doc || typeof doc !== "object") return [];
  const content = (doc as { content?: unknown[] }).content;
  if (!Array.isArray(content)) return [];
  const paragraphs: string[] = [];
  for (const node of content) {
    if (!node || typeof node !== "object") continue;
    const n = node as { type?: string; content?: { text?: string }[] };
    if (n.type !== "paragraph" || !Array.isArray(n.content)) continue;
    const text = n.content.map((c) => (typeof c.text === "string" ? c.text : "")).join("");
    if (text) paragraphs.push(text);
  }
  return paragraphs;
}

export async function getArticles(): Promise<ArticleItem[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase
        .from("articles")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });
      if (data && data.length > 0) {
        const media = await loadMediaMap(supabase, data.map((r) => r.image_id));
        return data.map((row) => ({
          id: row.id,
          slug: row.slug,
          title: { en: row.title_en, ar: row.title_ar },
          excerpt: { en: row.excerpt_en ?? "", ar: row.excerpt_ar ?? "" },
          content: { en: tiptapToPlainParagraphs(row.content_en), ar: tiptapToPlainParagraphs(row.content_ar) },
          image: toMediaImage(row.image_id ? (media.get(row.image_id) ?? null) : null, { en: row.title_en, ar: row.title_ar }, {
            alt: row.image_alt_en && row.image_alt_ar ? { en: row.image_alt_en, ar: row.image_alt_ar } : undefined,
          }),
          category: { en: row.category_en ?? "", ar: row.category_ar ?? "" },
          date: row.published_at ?? row.created_at.slice(0, 10),
          readTimeMinutes: row.read_time_minutes,
          featured: row.is_featured,
        } satisfies ArticleItem));
      }
    } catch (error) {
      console.error("[cms] getArticles failed:", error);
    }
  }
  return fallbackArticles;
}

export async function getFeaturedArticles(): Promise<ArticleItem[]> {
  const all = await getArticles();
  return all.filter((a) => a.featured);
}

// ---------------------------------------------------------------------------
// Doctor Photo Gallery and Research Papers — two collections with no legacy
// /data/*.ts equivalent (they didn't exist on the original static site), so
// there is no placeholder content to fall back to. Research in particular
// must NEVER get fabricated fallback content — inventing a "sample" paper
// would misrepresent a real doctor's actual publication record — so both
// simply return an empty array when Supabase is unavailable or empty; the
// sections that render them hide themselves in that case (see
// components/about/DoctorGallerySection.tsx and ResearchSection.tsx).
// ---------------------------------------------------------------------------

export interface DoctorGalleryPhoto {
  id: string;
  image: MediaImage;
}

export async function getDoctorGallery(): Promise<DoctorGalleryPhoto[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("doctor_gallery").select("*").order("display_order");
      if (data && data.length > 0) {
        const media = await loadMediaMap(supabase, data.map((r) => r.image_id));
        return data.map((row) => ({
          id: row.id,
          image: toMediaImage(row.image_id ? (media.get(row.image_id) ?? null) : null, { en: "Dr. Islam Moussa", ar: "د. إسلام موسى" }, {
            alt: row.image_alt_en && row.image_alt_ar ? { en: row.image_alt_en, ar: row.image_alt_ar } : undefined,
          }),
        }));
      }
    } catch (error) {
      console.error("[cms] getDoctorGallery failed:", error);
    }
  }
  return [];
}

export interface Review {
  id: string;
  name: Localized;
  review: Localized;
  /** Null until the clinic uploads one — the card falls back to a neutral placeholder icon, never a real photo. */
  icon: MediaImage | null;
}

export async function getReviews(): Promise<Review[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("reviews").select("*").order("display_order");
      if (data && data.length > 0) {
        const media = await loadMediaMap(supabase, data.map((r) => r.icon_media_id));
        return data.map((row) => {
          const iconMedia = row.icon_media_id ? (media.get(row.icon_media_id) ?? null) : null;
          return {
            id: row.id,
            name: { en: row.name_en, ar: row.name_ar },
            review: { en: row.review_en, ar: row.review_ar },
            icon: iconMedia ? toMediaImage(iconMedia, { en: row.name_en, ar: row.name_ar }) : null,
          };
        });
      }
    } catch (error) {
      console.error("[cms] getReviews failed:", error);
    }
  }
  return [];
}

export interface ResearchPaper {
  id: string;
  title: Localized;
  journalName: string;
  publishYear: string;
  excerpt: Localized;
  externalUrl: string | null;
  image: MediaImage | null;
  /** The paper as a downloadable PDF (documents bucket) — null while an entry is still being prepared. */
  pdfUrl: string | null;
}

export async function getResearchPapers(): Promise<ResearchPaper[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("research_papers").select("*").order("display_order");
      if (data && data.length > 0) {
        const media = await loadMediaMap(supabase, data.flatMap((r) => [r.image_id, r.pdf_media_id]));
        return data.map((row) => {
          const imgMedia = row.image_id ? (media.get(row.image_id) ?? null) : null;
          const pdfMedia = row.pdf_media_id ? (media.get(row.pdf_media_id) ?? null) : null;
          return {
            id: row.id,
            title: { en: row.title_en, ar: row.title_ar },
            journalName: row.journal_name ?? "",
            publishYear: row.publish_year ?? "",
            excerpt: { en: row.excerpt_en ?? "", ar: row.excerpt_ar ?? "" },
            externalUrl: row.external_url,
            image: imgMedia
              ? toMediaImage(imgMedia, { en: row.title_en, ar: row.title_ar }, {
                  alt: row.image_alt_en && row.image_alt_ar ? { en: row.image_alt_en, ar: row.image_alt_ar } : undefined,
                })
              : null,
            pdfUrl: pdfMedia ? resolveMediaUrl(pdfMedia) : null,
          };
        });
      }
    } catch (error) {
      console.error("[cms] getResearchPapers failed:", error);
    }
  }
  return [];
}
