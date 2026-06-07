import { defaultResumeData } from "@/lib/constants";
import type { ResumeData } from "@/lib/types";

/** Merge saved localStorage data with defaults so partial/corrupt data never breaks the app. */
export function sanitizeResumeData(raw: unknown): ResumeData {
  if (!raw || typeof raw !== "object") {
    return defaultResumeData;
  }

  const data = raw as Partial<ResumeData>;

  return {
    personalInfo: {
      ...defaultResumeData.personalInfo,
      ...(data.personalInfo && typeof data.personalInfo === "object" ? data.personalInfo : {}),
    },
    education: Array.isArray(data.education) ? data.education : defaultResumeData.education,
    experience: Array.isArray(data.experience) ? data.experience : defaultResumeData.experience,
    skills: Array.isArray(data.skills) ? data.skills : defaultResumeData.skills,
    projects: Array.isArray(data.projects) ? data.projects : defaultResumeData.projects,
    certifications: Array.isArray(data.certifications)
      ? data.certifications
      : defaultResumeData.certifications,
  };
}
