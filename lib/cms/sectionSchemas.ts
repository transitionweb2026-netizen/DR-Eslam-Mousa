export interface SectionFieldDef {
  path: string; // dot-path into content, e.g. "primaryCta.url" or "eyebrow" (bilingual root)
  label: string;
  /**
   * "video_ref" stores a `videos.id` (not a media id) — it renders as a
   * dropdown of existing Content → Videos rows rather than an upload
   * control, so a section can feature an EXISTING video without ever
   * duplicating it: uploading a new file for that video from Content →
   * Videos updates it everywhere it's referenced, including here.
   */
  type: "text" | "textarea" | "media" | "url" | "stringArray" | "video_ref";
  bilingual?: boolean; // true => actual paths are `${path}.en` / `${path}.ar`
  mediaCategory?: string;
  /**
   * Which Storage bucket a `type: "media"` field picks from — determines
   * both the file picker's file-type filter and which existing files show
   * in "choose existing" (see MediaPicker). Defaults to "media" (images)
   * when omitted; a field for an actual video FILE (as opposed to a video's
   * cover/thumbnail image) must set this to "videos", or its file picker
   * only ever offers images.
   */
  mediaBucket?: "media" | "video-covers" | "videos" | "documents";
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
  { path: "image_id", label: "Hero Image", type: "media", mediaCategory: "doctor", mediaBucket: "media" },
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
  { path: "video_cover_media_id", label: "Video Cover", type: "media", mediaCategory: "doctor", mediaBucket: "video-covers" },
  { path: "video_media_id", label: "Actual Video (leave empty for \"coming soon\")", type: "media", mediaCategory: "doctor", mediaBucket: "videos" },
  { path: "video_alt", label: "Video Cover Alt Text", type: "text", bilingual: true },
];

const WHY_TRUST_FIELDS: SectionFieldDef[] = [
  { path: "eyebrow", label: "Eyebrow", type: "text", bilingual: true },
  { path: "heading", label: "Heading", type: "text", bilingual: true },
  { path: "description", label: "Description", type: "textarea", bilingual: true },
  { path: "portrait_media_id", label: "Doctor Portrait", type: "media", mediaCategory: "doctor", mediaBucket: "media" },
  { path: "portrait_alt", label: "Portrait Alt Text", type: "text", bilingual: true },
];

const ABOUT_DOCTOR_FIELDS: SectionFieldDef[] = [
  { path: "eyebrow", label: "Eyebrow", type: "text", bilingual: true },
  { path: "heading", label: "Heading", type: "text", bilingual: true },
  { path: "paragraphs", label: "Paragraphs (one per line)", type: "stringArray", bilingual: true },
  { path: "supportingStatement", label: "Supporting Statement (quote)", type: "textarea", bilingual: true },
  { path: "image_id", label: "Doctor Image", type: "media", mediaCategory: "doctor", mediaBucket: "media" },
  { path: "image_alt", label: "Image Alt Text", type: "text", bilingual: true },
];

const CONTACT_INTRO_FIELDS: SectionFieldDef[] = [
  { path: "eyebrow", label: "Eyebrow", type: "text", bilingual: true },
  { path: "heading", label: "Heading", type: "text", bilingual: true },
  { path: "description", label: "Description", type: "textarea", bilingual: true },
];

const SERVICES_VIDEOS_FIELDS: SectionFieldDef[] = [
  { path: "video_1_id", label: "First Video", type: "video_ref" },
  { path: "video_2_id", label: "Second Video", type: "video_ref" },
  { path: "eyebrow", label: "Eyebrow", type: "text", bilingual: true },
  { path: "title", label: "Title", type: "text", bilingual: true },
  { path: "description", label: "Description", type: "textarea", bilingual: true },
];

const CONTACT_CTA_FIELDS: SectionFieldDef[] = [
  { path: "image_id", label: "Photo", type: "media", mediaCategory: "doctor", mediaBucket: "media" },
  { path: "image_alt", label: "Photo Alt Text", type: "text", bilingual: true },
  { path: "eyebrow", label: "Eyebrow", type: "text", bilingual: true },
  { path: "heading", label: "Heading", type: "text", bilingual: true },
  { path: "lines", label: "Credential Lines (one per line)", type: "stringArray", bilingual: true },
  { path: "button_label", label: "Call Button Label", type: "text", bilingual: true },
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
  services_videos: SERVICES_VIDEOS_FIELDS,
  reviews_intro: INTRO_FIELDS,
  doctor_gallery_intro: INTRO_FIELDS,
  research_intro: INTRO_FIELDS,
  contact_cta: CONTACT_CTA_FIELDS,
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
  services_videos: "Doctor Videos (2)",
  reviews_intro: "Patient Reviews",
  doctor_gallery_intro: "Doctor Photo Gallery",
  research_intro: "Research Papers",
  contact_cta: "Call-to-Action Card",
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
  services_videos: "Pick any two existing videos from Content → Videos. To change the actual video FILE, upload it there — it updates everywhere that video is used (here, the Videos page, and Home if it's Featured).",
  reviews_intro: "The reviews themselves come from Content → Reviews.",
  doctor_gallery_intro: "The photos themselves come from Content → Doctor Gallery.",
  research_intro: "The papers themselves come from Content → Research Papers.",
  contact_cta: "The phone number itself always comes from Global Settings → Contact Information — only the button's label text is set here.",
};
