import type { Localized, MediaImage } from "@/lib/types";

export const videosIntro = {
  eyebrow: { en: "Watch & Learn", ar: "شاهد وتعرف" } satisfies Localized,
  title: { en: "Featured Videos", ar: "فيديوهات مختارة" } satisfies Localized,
  description: {
    en: "Short, practical explanations straight from Dr. Islam Moussa.",
    ar: "شروحات قصيرة وعملية مباشرة من د. إسلام موسى.",
  } satisfies Localized,
};

export interface VideoItem {
  id: string;
  slug: string;
  title: Localized;
  description: Localized;
  thumbnail: MediaImage;
  /**
   * Playable video file. Temporary stand-ins (freely-licensed Blender
   * Foundation open movies, publicly hosted by Google for exactly this
   * kind of test/demo use) until Dr. Islam Moussa's real footage is
   * available — swap this one string per video, nothing else changes.
   */
  src: string;
  /** mm:ss placeholder shown on the card. */
  duration: string;
  category: Localized;
  /** Selects which videos surface in the Home page's Featured Videos section. */
  featured: boolean;
  publishedAt: string;
}

/**
 * The single source of truth for all videos. The future /videos page lists
 * everything here; the Home page simply filters `featured === true`.
 */
export const videos: VideoItem[] = [
  {
    id: "video-01",
    slug: "understanding-knee-replacement",
    title: {
      en: "Understanding Knee Replacement Surgery",
      ar: "فهم عملية استبدال مفصل الركبة",
    },
    description: {
      en: "Dr. Islam Moussa explains what to expect before, during and after a knee replacement.",
      ar: "يشرح د. إسلام موسى ما يجب توقعه قبل وأثناء وبعد عملية استبدال الركبة.",
    },
    thumbnail: {
      src: "/images/videos/video-placeholder-01.svg",
      alt: { en: "Knee replacement video thumbnail", ar: "صورة مصغرة لفيديو استبدال الركبة" },
    },
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    duration: "06:12",
    category: { en: "Joint Replacement", ar: "استبدال المفاصل" },
    featured: true,
    publishedAt: "2026-02-10",
  },
  {
    id: "video-02",
    slug: "recovering-from-sports-injuries",
    title: {
      en: "Recovering from Common Sports Injuries",
      ar: "التعافي من الإصابات الرياضية الشائعة",
    },
    description: {
      en: "A practical look at rehabilitation timelines for ligament and tendon injuries.",
      ar: "نظرة عملية على الجداول الزمنية للتعافي من إصابات الأربطة والأوتار.",
    },
    thumbnail: {
      src: "/images/videos/video-placeholder-02.svg",
      alt: { en: "Sports injury recovery video thumbnail", ar: "صورة مصغرة لفيديو التعافي من الإصابات الرياضية" },
    },
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    duration: "04:45",
    category: { en: "Sports Injuries", ar: "إصابات الملاعب" },
    featured: true,
    publishedAt: "2026-01-22",
  },
  {
    id: "video-03",
    slug: "arthroscopy-explained",
    title: {
      en: "Arthroscopic Surgery, Explained Simply",
      ar: "جراحة المناظير ببساطة",
    },
    description: {
      en: "How keyhole surgery reduces recovery time compared to open procedures.",
      ar: "كيف تقلل جراحة المناظير من مدة التعافي مقارنة بالجراحة المفتوحة.",
    },
    thumbnail: {
      src: "/images/videos/video-placeholder-03.svg",
      alt: { en: "Arthroscopic surgery video thumbnail", ar: "صورة مصغرة لفيديو جراحة المناظير" },
    },
    src: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    duration: "05:30",
    category: { en: "Arthroscopic Surgery", ar: "جراحة المناظير" },
    featured: true,
    publishedAt: "2025-12-18",
  },
  {
    id: "video-04",
    slug: "living-with-hip-arthritis",
    title: {
      en: "Living with Hip Arthritis",
      ar: "التعايش مع التهاب مفصل الحوض",
    },
    description: {
      en: "Non-surgical strategies and knowing when it's time to consider surgery.",
      ar: "استراتيجيات غير جراحية ومتى يكون الوقت مناسبًا للتفكير في الجراحة.",
    },
    thumbnail: {
      src: "/images/videos/video-placeholder-01.svg",
      alt: { en: "Hip arthritis video thumbnail", ar: "صورة مصغرة لفيديو التهاب مفصل الحوض" },
    },
    src: "https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_1MB.mp4",
    duration: "07:02",
    category: { en: "Hip Surgery", ar: "جراحة الحوض" },
    featured: false,
    publishedAt: "2025-11-05",
  },
  {
    id: "video-05",
    slug: "shoulder-rotator-cuff",
    title: {
      en: "Rotator Cuff Injuries: Causes & Care",
      ar: "إصابات الكفة المدورة: الأسباب والعلاج",
    },
    description: {
      en: "Identifying early symptoms and treatment options for shoulder tears.",
      ar: "التعرف على الأعراض المبكرة وخيارات العلاج لتمزقات الكتف.",
    },
    thumbnail: {
      src: "/images/videos/video-placeholder-02.svg",
      alt: { en: "Rotator cuff video thumbnail", ar: "صورة مصغرة لفيديو الكفة المدورة" },
    },
    src: "https://test-videos.co.uk/vids/jellyfish/mp4/h264/360/Jellyfish_360_10s_1MB.mp4",
    duration: "05:58",
    category: { en: "Shoulder Surgery", ar: "جراحة الكتف" },
    featured: false,
    publishedAt: "2025-10-14",
  },
  {
    id: "video-06",
    slug: "post-surgery-physiotherapy",
    title: {
      en: "The Role of Physiotherapy After Surgery",
      ar: "دور العلاج الطبيعي بعد الجراحة",
    },
    description: {
      en: "Why structured rehabilitation is essential to a full, lasting recovery.",
      ar: "لماذا يُعد التأهيل المنظم أساسيًا لتعافٍ كامل ودائم.",
    },
    thumbnail: {
      src: "/images/videos/video-placeholder-03.svg",
      alt: { en: "Physiotherapy video thumbnail", ar: "صورة مصغرة لفيديو العلاج الطبيعي" },
    },
    src: "https://filesamples.com/samples/video/mp4/sample_640x360.mp4",
    duration: "03:40",
    category: { en: "Recovery", ar: "التعافي" },
    featured: false,
    publishedAt: "2025-09-29",
  },
  {
    id: "video-07",
    slug: "neck-pain-when-to-worry",
    title: {
      en: "Neck Pain: When Should You Worry?",
      ar: "ألم الرقبة: متى يجب أن تقلق؟",
    },
    description: {
      en: "Telling ordinary stiffness apart from nerve-related neck pain that needs evaluation.",
      ar: "التمييز بين التيبس العادي وألم الرقبة المرتبط بالأعصاب الذي يحتاج تقييمًا طبيًا.",
    },
    thumbnail: {
      src: "/images/videos/video-placeholder-07.svg",
      alt: { en: "Neck pain video thumbnail", ar: "صورة مصغرة لفيديو ألم الرقبة" },
    },
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    duration: "04:02",
    category: { en: "Neck Pain", ar: "ألم الرقبة" },
    featured: false,
    publishedAt: "2025-08-14",
  },
  {
    id: "video-08",
    slug: "understanding-back-pain",
    title: {
      en: "Understanding Chronic Back Pain",
      ar: "فهم ألم الظهر المزمن",
    },
    description: {
      en: "Common causes of persistent back pain and a realistic path toward relief.",
      ar: "الأسباب الشائعة لألم الظهر المستمر ومسار واقعي نحو التخفيف منه.",
    },
    thumbnail: {
      src: "/images/videos/video-placeholder-08.svg",
      alt: { en: "Chronic back pain video thumbnail", ar: "صورة مصغرة لفيديو ألم الظهر المزمن" },
    },
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    duration: "05:15",
    category: { en: "Back Pain", ar: "ألم الظهر" },
    featured: false,
    publishedAt: "2025-07-22",
  },
  {
    id: "video-09",
    slug: "what-to-expect-before-surgery",
    title: {
      en: "What to Expect Before Any Orthopedic Surgery",
      ar: "ما الذي يجب توقعه قبل أي جراحة عظام",
    },
    description: {
      en: "A walkthrough of the consultation, imaging and preparation steps before an operation.",
      ar: "جولة توضيحية حول الاستشارة والأشعة وخطوات التحضير قبل العملية.",
    },
    thumbnail: {
      src: "/images/videos/video-placeholder-09.svg",
      alt: { en: "Pre-surgery preparation video thumbnail", ar: "صورة مصغرة لفيديو التحضير قبل الجراحة" },
    },
    src: "https://test-videos.co.uk/vids/jellyfish/mp4/h264/360/Jellyfish_360_10s_1MB.mp4",
    duration: "06:48",
    category: { en: "Patient Guide", ar: "دليل المريض" },
    featured: false,
    publishedAt: "2025-06-30",
  },
];

export const featuredVideos = videos.filter((video) => video.featured);
