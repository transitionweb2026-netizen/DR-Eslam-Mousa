import type { Localized } from "@/lib/types";

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: Localized;
  icon: "experience" | "procedures" | "patients" | "cases";
}

/** Placeholder figures — wire to real numbers (or a CMS field) later. */
export const statsContent: StatItem[] = [
  {
    id: "experience",
    value: 15,
    suffix: "+",
    label: { en: "Years of Experience", ar: "سنوات الخبرة" },
    icon: "experience",
  },
  {
    id: "procedures",
    value: 4200,
    suffix: "+",
    label: { en: "Successful Procedures", ar: "عملية جراحية ناجحة" },
    icon: "procedures",
  },
  {
    id: "patients",
    value: 9800,
    suffix: "+",
    label: { en: "Patients Treated", ar: "مريض تمت معالجته" },
    icon: "patients",
  },
  {
    id: "cases",
    value: 1500,
    suffix: "+",
    label: { en: "Complex Medical Cases", ar: "حالة طبية معقدة" },
    icon: "cases",
  },
];
