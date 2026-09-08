import type { Localized, MediaImage } from "@/lib/types";

export const certificatesIntro = {
  eyebrow: { en: "Credentials", ar: "المؤهلات" } satisfies Localized,
  title: { en: "Certificates & Qualifications", ar: "الشهادات والمؤهلات" } satisfies Localized,
  description: {
    en: "A track record of formal training and specialized certification, drag or scroll to explore.",
    ar: "سجل من التدريب الرسمي والشهادات المتخصصة، اسحب أو مرر لاستعراضها.",
  } satisfies Localized,
};

export interface CertificateItem {
  id: string;
  title: Localized;
  institution: Localized;
  year: string;
  image: MediaImage;
}

/**
 * Temporary placeholder credentials — replace `title`, `institution`, `year`
 * and `image.src` with the real documents when available; the horizontal
 * gallery and card design stay exactly as they are.
 */
export const certificates: CertificateItem[] = [
  {
    id: "certificate-01",
    title: {
      en: "M.D. in Orthopedic Surgery",
      ar: "دكتوراه في جراحة العظام",
    },
    institution: { en: "Faculty of Medicine, Cairo University", ar: "كلية الطب، جامعة القاهرة" },
    year: "2010",
    image: {
      src: "/images/certificates/certificate-placeholder-01.svg",
      alt: { en: "M.D. in Orthopedic Surgery certificate placeholder", ar: "شهادة دكتوراه جراحة العظام التوضيحية" },
    },
  },
  {
    id: "certificate-02",
    title: {
      en: "Fellowship in Joint Replacement Surgery",
      ar: "زمالة جراحة استبدال المفاصل",
    },
    institution: { en: "Royal College of Surgeons", ar: "الكلية الملكية للجراحين" },
    year: "2014",
    image: {
      src: "/images/certificates/certificate-placeholder-02.svg",
      alt: { en: "Fellowship in Joint Replacement Surgery certificate placeholder", ar: "شهادة زمالة استبدال المفاصل التوضيحية" },
    },
  },
  {
    id: "certificate-03",
    title: {
      en: "Advanced Arthroscopic Surgery Certification",
      ar: "شهادة متقدمة في جراحة المناظير",
    },
    institution: { en: "International Society of Arthroscopy", ar: "الجمعية الدولية لجراحة المناظير" },
    year: "2017",
    image: {
      src: "/images/certificates/certificate-placeholder-03.svg",
      alt: { en: "Advanced Arthroscopic Surgery certificate placeholder", ar: "شهادة جراحة المناظير المتقدمة التوضيحية" },
    },
  },
  {
    id: "certificate-04",
    title: {
      en: "Sports Medicine & Injury Management",
      ar: "الطب الرياضي وإدارة الإصابات",
    },
    institution: { en: "European Board of Orthopedics", ar: "المجلس الأوروبي لجراحة العظام" },
    year: "2019",
    image: {
      src: "/images/certificates/certificate-placeholder-04.svg",
      alt: { en: "Sports Medicine certification placeholder", ar: "شهادة الطب الرياضي التوضيحية" },
    },
  },
  {
    id: "certificate-05",
    title: {
      en: "Board Certification in Orthopedic Surgery",
      ar: "البورد في جراحة العظام",
    },
    institution: { en: "Egyptian Orthopedic Association", ar: "الجمعية المصرية لجراحة العظام" },
    year: "2021",
    image: {
      src: "/images/certificates/certificate-placeholder-05.svg",
      alt: { en: "Board Certification in Orthopedic Surgery certificate placeholder", ar: "شهادة البورد في جراحة العظام التوضيحية" },
    },
  },
];
