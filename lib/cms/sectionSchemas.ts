export interface SectionFieldDef {
  path: string; // dot-path into content, e.g. "primaryCta.url" or "eyebrow" (bilingual root)
  label: string;
  type: "text" | "textarea" | "media" | "url" | "stringArray";
  bilingual?: boolean; // true => actual paths are `${path}.en` / `${path}.ar`
  mediaCategory?: string;
}

const INTRO_FIELDS: SectionFieldDef[] = [
  { path: "eyebrow", label: "Eyebrow", type: "text", bilingual: true },
  { path: "title", label: "Title", type: "text", bilingual: true },
  { path: "description", label: "Description", type: "textarea", bilingual: true },
];

const HERO_FIELDS: SectionFieldDef[] = [
  { path: "eyebrow", label: "Eyebrow", type: "text", bilingual: true },
  { path: "headline", label: "Headline", type: "text", bilingual: true },
  { path: "headlineAccent", label: "Headline (accent, gradient-colored word)", type: "text", bilingual: true },
  { path: "description", label: "Description", type: "textarea", bilingual: true },
  { path: "image_id", label: "Hero Image", type: "media", mediaCategory: "doctor" },
  { path: "image_position", label: "Image Focal Point", type: "text" },
  { path: "primaryCta.url", label: "Primary Button URL", type: "url" },
  { path: "primaryCta.label", label: "Primary Button Label", type: "text", bilingual: true },
  { path: "secondaryCta.url", label: "Secondary Button URL", type: "url" },
  { path: "secondaryCta.label", label: "Secondary Button Label", type: "text", bilingual: true },
];

const DOCTOR_INTRO_FIELDS: SectionFieldDef[] = [
  { path: "eyebrow", label: "Eyebrow", type: "text", bilingual: true },
  { path: "heading", label: "Heading", type: "text", bilingual: true },
  { path: "paragraph", label: "Paragraph", type: "textarea", bilingual: true },
  { path: "supporting", label: "Supporting Text", type: "textarea", bilingual: true },
  { path: "cta.url", label: "CTA URL", type: "url" },
  { path: "cta.label", label: "CTA Label", type: "text", bilingual: true },
  { path: "video_cover_media_id", label: "Video Cover", type: "media", mediaCategory: "doctor" },
  { path: "video_media_id", label: "Actual Video (leave empty for \"coming soon\")", type: "media", mediaCategory: "doctor" },
  { path: "video_alt", label: "Video Cover Alt Text", type: "text", bilingual: true },
];

const WHY_TRUST_FIELDS: SectionFieldDef[] = [
  { path: "eyebrow", label: "Eyebrow", type: "text", bilingual: true },
  { path: "heading", label: "Heading", type: "text", bilingual: true },
  { path: "description", label: "Description", type: "textarea", bilingual: true },
  { path: "portrait_media_id", label: "Doctor Portrait", type: "media", mediaCategory: "doctor" },
  { path: "portrait_alt", label: "Portrait Alt Text", type: "text", bilingual: true },
];

const ABOUT_DOCTOR_FIELDS: SectionFieldDef[] = [
  { path: "eyebrow", label: "Eyebrow", type: "text", bilingual: true },
  { path: "heading", label: "Heading", type: "text", bilingual: true },
  { path: "paragraphs", label: "Paragraphs (one per line)", type: "stringArray", bilingual: true },
  { path: "supportingStatement", label: "Supporting Statement (quote)", type: "textarea", bilingual: true },
  { path: "image_id", label: "Doctor Image", type: "media", mediaCategory: "doctor" },
  { path: "image_alt", label: "Image Alt Text", type: "text", bilingual: true },
];

const CONTACT_INTRO_FIELDS: SectionFieldDef[] = [
  { path: "eyebrow", label: "Eyebrow", type: "text", bilingual: true },
  { path: "heading", label: "Heading", type: "text", bilingual: true },
  { path: "description", label: "Description", type: "textarea", bilingual: true },
];

export const SECTION_SCHEMAS: Record<string, SectionFieldDef[]> = {
  hero: HERO_FIELDS,
  statistics_intro: [],
  doctor_intro: DOCTOR_INTRO_FIELDS,
  specialties_intro: INTRO_FIELDS,
  conditions_intro: INTRO_FIELDS,
  why_trust: WHY_TRUST_FIELDS,
  featured_videos_intro: INTRO_FIELDS,
  faq_intro: INTRO_FIELDS,
  featured_articles_intro: INTRO_FIELDS,
  about_doctor: ABOUT_DOCTOR_FIELDS,
  certificates_intro: INTRO_FIELDS,
  career_intro: INTRO_FIELDS,
  contact_intro: CONTACT_INTRO_FIELDS,
};

export const SECTION_LABELS: Record<string, string> = {
  hero: "Hero",
  statistics_intro: "Statistics",
  doctor_intro: "Doctor Introduction",
  specialties_intro: "Top Medical Specialties",
  conditions_intro: "What Are You Suffering From?",
  why_trust: "Why Trust Dr. Islam Moussa?",
  featured_videos_intro: "Featured Videos",
  faq_intro: "FAQ",
  featured_articles_intro: "Featured Articles",
  about_doctor: "About the Doctor",
  certificates_intro: "Certificates",
  career_intro: "Career Journey",
  contact_intro: "Contact Form Intro",
};

export const SECTION_NOTES: Record<string, string> = {
  statistics_intro: "This section has no text of its own — it shows the shared Statistics collection (Content → Statistics). Use the toggle below to show/hide it on this page.",
  specialties_intro: "The cards themselves come from Content → Services.",
  conditions_intro: "The cards themselves come from Content → Conditions.",
  featured_videos_intro: "The cards themselves come from Content → Videos (Home shows the ones marked Featured).",
  faq_intro: "The questions themselves come from Content → FAQs.",
  featured_articles_intro: "The cards themselves come from Content → Articles (Home shows the ones marked Featured).",
  certificates_intro: "The certificates themselves come from Content → Certificates.",
  career_intro: "The timeline itself comes from Content → Career Journey.",
};
