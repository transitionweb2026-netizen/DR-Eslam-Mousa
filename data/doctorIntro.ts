import type { Localized, MediaVideo } from "@/lib/types";

export interface DoctorIntroContent {
  eyebrow: Localized;
  title: Localized;
  paragraph: Localized;
  supporting: Localized;
  cta: { label: Localized; path: string };
  video: MediaVideo;
}

export const doctorIntroContent: DoctorIntroContent = {
  eyebrow: { en: "Meet Your Surgeon", ar: "تعرف على طبيبك" },
  title: {
    en: "A Surgeon Focused on Your Full Recovery",
    ar: "جراح يركز على تعافيك الكامل",
  },
  paragraph: {
    en: "With over 15 years dedicated to orthopedic and joint replacement surgery, Dr. Islam Moussa has built a practice on precision, evidence-based technique and genuine care for every patient's story.",
    ar: "بخبرة تمتد لأكثر من 15 عامًا في جراحة العظام واستبدال المفاصل، بنى د. إسلام موسى ممارسة طبية قائمة على الدقة والأسلوب العلمي والاهتمام الحقيقي بقصة كل مريض.",
  },
  supporting: {
    en: "From arthroscopic sports repairs to complex joint reconstruction, every treatment plan is tailored — combining modern technology with a calm, reassuring approach.",
    ar: "من إصلاحات المناظير الرياضية إلى إعادة بناء المفاصل المعقدة، تُصمَّم كل خطة علاجية خصيصًا لكل حالة، بالجمع بين التقنية الحديثة وأسلوب هادئ ومطمئن.",
  },
  cta: {
    label: { en: "Learn More About Dr. Islam Moussa", ar: "تعرف أكثر على د. إسلام موسى" },
    path: "about",
  },
  video: {
    poster: {
      src: "/images/video/introduction-video-placeholder.svg",
      alt: {
        en: "Introductory video placeholder thumbnail",
        ar: "صورة مصغرة مؤقتة للفيديو التعريفي",
      },
    },
    // Temporary stand-in (a freely-licensed Blender Foundation open movie,
    // publicly hosted by Google for test/demo playback) until Dr. Islam
    // Moussa's real introduction video is available.
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
};
