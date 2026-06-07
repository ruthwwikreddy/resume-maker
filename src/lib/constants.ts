
import { ResumeData, TemplateName } from "./types";
import { v4 as uuidv4 } from 'uuid';

export const DEFAULT_TEMPLATE: TemplateName = "minimal";

export const TEMPLATE_CATEGORIES = [
  {
    id: "essential",
    label: "Essential",
    description: "Clean, recruiter-ready layouts to start with",
  },
  {
    id: "executive",
    label: "Executive",
    description: "Refined designs for senior and leadership roles",
  },
  {
    id: "specialized",
    label: "Specialized",
    description: "Tailored formats for specific industries",
  },
] as const;

export const TEMPLATES = [
  {
    id: "minimal",
    name: "Minimal",
    image: "/minimal-template.png",
    description: "Clean, understated layout with generous whitespace — the ideal starting point.",
    tag: "Recommended",
    category: "essential",
  },
  {
    id: "classic",
    name: "Classic",
    image: "/classic-template.png",
    description: "Timeless single-column format — maximum ATS compatibility and recruiter familiarity.",
    tag: "ATS-Friendly",
    category: "essential",
  },
  {
    id: "professional",
    name: "Professional",
    image: "/professional-template.png",
    description: "Traditional layout with a formal style, ideal for corporate roles.",
    tag: "Corporate",
    category: "essential",
  },
  {
    id: "modern",
    name: "Modern",
    image: "/modern-template.png",
    description: "Contemporary design with balanced typography — polished without being flashy.",
    tag: "Contemporary",
    category: "essential",
  },
  {
    id: "executive",
    name: "Executive",
    image: "/executive-template.png",
    description: "Sophisticated layout with premium styling for senior positions.",
    tag: "Leadership",
    category: "executive",
  },
  {
    id: "elegant",
    name: "Elegant",
    image: "/elegant-template.png",
    description: "Refined serif typography with generous whitespace for a polished, premium feel.",
    tag: "Premium",
    category: "executive",
  },
  {
    id: "compact",
    name: "Compact",
    image: "/compact-template.png",
    description: "Space-efficient two-column layout that fits more experience on one page.",
    tag: "One-Page",
    category: "executive",
  },
  {
    id: "academic",
    name: "Academic",
    image: "/academic-template.png",
    description: "Education-first structure ideal for researchers, graduates, and academic roles.",
    tag: "Education",
    category: "specialized",
  },
  {
    id: "tech",
    name: "Tech",
    image: "/tech-template.png",
    description: "Developer-optimized layout with prominent skills and project highlights.",
    tag: "Engineering",
    category: "specialized",
  },
  {
    id: "creative",
    name: "Creative",
    image: "/creative-template.png",
    description: "Bold design with unique elements, perfect for creative industries.",
    tag: "Creative",
    category: "specialized",
  },
];

export const defaultResumeData: ResumeData = {
  personalInfo: {
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    title: "Senior Software Engineer",
    summary: "Experienced software engineer with 8+ years specializing in full-stack development, cloud architecture, and leading development teams. Passionate about creating efficient, scalable software solutions that deliver exceptional user experiences.",
    linkedin: "linkedin.com/in/alexjohnson",
    github: "github.com/alexjohnson",
  },
  education: [
    {
      id: uuidv4(),
      institution: "University of Technology",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2012-09",
      endDate: "2016-05",
      location: "San Francisco, CA",
      gpa: "3.8",
    },
  ],
  experience: [
    {
      id: uuidv4(),
      company: "Tech Innovations Inc.",
      position: "Senior Software Engineer",
      startDate: "2020-03",
      endDate: "",
      location: "San Francisco, CA",
      current: true,
      description: "Lead development of cloud-native applications using React, Node.js, and AWS.",
      achievements: [
        "Architected and implemented a microservices platform that reduced deployment time by 70%",
        "Led a team of 5 developers to deliver a major product release ahead of schedule",
        "Improved application performance by 35% through optimizing database queries and frontend rendering"
      ]
    },
    {
      id: uuidv4(),
      company: "Digital Solutions LLC",
      position: "Software Engineer",
      startDate: "2016-06",
      endDate: "2020-02",
      location: "Boston, MA",
      current: false,
      description: "Developed web applications using JavaScript, React, and Node.js.",
      achievements: [
        "Implemented responsive designs that improved mobile user engagement by 45%",
        "Created automated testing suite that caught 95% of regressions before release",
        "Mentored 3 junior developers who were promoted within 18 months"
      ]
    },
  ],
  skills: [
    { id: uuidv4(), name: "JavaScript", level: 90, category: "Programming" },
    { id: uuidv4(), name: "React", level: 85, category: "Frontend" },
    { id: uuidv4(), name: "Node.js", level: 80, category: "Backend" },
    { id: uuidv4(), name: "TypeScript", level: 75, category: "Programming" },
    { id: uuidv4(), name: "AWS", level: 70, category: "DevOps" },
    { id: uuidv4(), name: "Docker", level: 65, category: "DevOps" },
    { id: uuidv4(), name: "MongoDB", level: 75, category: "Database" },
    { id: uuidv4(), name: "PostgreSQL", level: 70, category: "Database" },
  ],
  certifications: [
    {
      id: uuidv4(),
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2021-04",
      credentialID: "AWS-ASA-12345",
    },
    {
      id: uuidv4(),
      name: "Professional Scrum Master I",
      issuer: "Scrum.org",
      date: "2019-10",
      credentialID: "PSM-I-87654",
    },
  ],
  projects: [
    {
      id: uuidv4(),
      name: "E-commerce Platform",
      description: "Built a scalable e-commerce platform with React, Node.js, and MongoDB",
      technologies: ["React", "Node.js", "Express", "MongoDB", "AWS S3"]
    },
    {
      id: uuidv4(),
      name: "Task Management App",
      description: "Developed a collaborative task management application with real-time updates",
      technologies: ["React", "Firebase", "Material UI", "TypeScript"]
    },
  ],
};

export const SKILL_LEVELS = [
  { value: 20, label: "Beginner" },
  { value: 40, label: "Elementary" },
  { value: 60, label: "Intermediate" },
  { value: 80, label: "Advanced" },
  { value: 100, label: "Expert" },
];

export const SECTIONS = [
  { id: "personalInfo", label: "Personal Info", icon: "user" },
  { id: "experience", label: "Experience", icon: "briefcase" },
  { id: "education", label: "Education", icon: "graduation-cap" },
  { id: "skills", label: "Skills", icon: "code" },
  { id: "projects", label: "Projects", icon: "folder" },
  { id: "certifications", label: "Certifications", icon: "certificate" },
];

export const TEMPLATE_FONTS = {
  modern: {
    heading: "font-inter",
    body: "font-roboto"
  },
  professional: {
    heading: "font-merriweather",
    body: "font-open-sans"
  },
  minimal: {
    heading: "font-lato",
    body: "font-lato"
  },
  creative: {
    heading: "font-playfair",
    body: "font-open-sans"
  },
  executive: {
    heading: "font-merriweather",
    body: "font-roboto",
  },
  classic: {
    heading: "font-merriweather",
    body: "font-open-sans",
  },
  compact: {
    heading: "font-inter",
    body: "font-roboto",
  },
  elegant: {
    heading: "font-playfair",
    body: "font-lato",
  },
  academic: {
    heading: "font-merriweather",
    body: "font-open-sans",
  },
  tech: {
    heading: "font-inter",
    body: "font-roboto",
  },
};
