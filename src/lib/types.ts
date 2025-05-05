
export type TemplateName = 
  | "modern" 
  | "professional" 
  | "minimal" 
  | "creative" 
  | "executive";

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  title: string;
  website?: string;
  summary: string;
  linkedin?: string;
  github?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  location?: string;
  gpa?: string;
  description?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location?: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  level?: number;
  category?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiration?: string;
  credentialID?: string;
  url?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
  url?: string;
  technologies?: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: SkillItem[];
  certifications: CertificationItem[];
  projects: ProjectItem[];
  languages?: { language: string; proficiency: string }[];
  references?: { name: string; company: string; position: string; email: string; phone: string }[];
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
}
