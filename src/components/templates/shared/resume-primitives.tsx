import React, { CSSProperties, ReactNode } from "react";
import { A4_WIDTH_PX } from "@/lib/pageFormat";
import { ColorScheme } from "@/contexts/ResumeContext";
import { formatDate } from "@/lib/utils";
import { hexToRgba } from "@/lib/utils";
import {
  ExperienceItem,
  EducationItem,
  SkillItem,
  ProjectItem,
  CertificationItem,
  PersonalInfo,
} from "@/lib/types";

export type TemplateFonts = { heading: string; body: string };

export function resumeStyle(
  colorScheme: ColorScheme,
  fonts: TemplateFonts
): CSSProperties {
  return {
    color: colorScheme.text,
    backgroundColor: colorScheme.background,
    fontFamily: fonts.body,
  };
}

export function muted(color: string, alpha = 0.55) {
  return hexToRgba(color, alpha);
}

export function accentBg(color: string, alpha = 0.12) {
  return hexToRgba(color, alpha);
}

/** True when a hex color reads as dark (needs light text/accent on top). */
export function isDarkColor(hex: string): boolean {
  const c = hex.replace("#", "");
  if (c.length !== 6) return false;
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 < 128;
}

/** Pick a readable accent on dark sidebar/header backgrounds. */
export function accentOnDarkBg(colorScheme: ColorScheme): string {
  return isDarkColor(colorScheme.primary) ? "rgba(255,255,255,0.6)" : colorScheme.primary;
}

/** Fill color for progress bars on dark backgrounds. */
export function barFillOnDarkBg(colorScheme: ColorScheme): string {
  return isDarkColor(colorScheme.primary) ? "rgba(255,255,255,0.85)" : colorScheme.primary;
}

/* ── Shell ── */
export const ResumeDocument = ({
  children,
  style,
  className = "",
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}) => (
  <div
    className={`resume-document text-[10.5px] leading-[1.55] antialiased ${className}`}
    style={{ width: A4_WIDTH_PX, maxWidth: A4_WIDTH_PX, minHeight: 0, ...style }}
  >
    {children}
  </div>
);

/** Consistent vertical spacing between resume sections */
export const ResumeSection = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => <section className={`resume-section ${className}`.trim()}>{children}</section>;

/* ── Badges (export-safe: margin-based, no flex gap) ── */
export const ResumeBadgeRow = ({ children }: { children: ReactNode }) => (
  <div className="resume-badge-row">{children}</div>
);

export const ResumeBadge = ({
  label,
  colorScheme,
  size = "md",
}: {
  label: string;
  colorScheme: ColorScheme;
  size?: "sm" | "md";
}) => (
  <span
    className={`resume-badge ${size === "sm" ? "resume-badge--sm" : ""}`}
    style={{
      border: `1px solid ${hexToRgba(colorScheme.primary, 0.35)}`,
      color: colorScheme.text,
    }}
  >
    {label}
  </span>
);

/* ── Section title variants ── */
export const SectionTitle = ({
  children,
  colorScheme,
  variant = "underline",
}: {
  children: ReactNode;
  colorScheme: ColorScheme;
  variant?: "underline" | "caps" | "sidebar" | "accent-bar";
}) => {
  if (variant === "caps") {
    return (
      <h2
        className="text-[11px] font-bold uppercase tracking-[0.18em] mb-3"
        style={{ color: colorScheme.primary }}
      >
        {children}
      </h2>
    );
  }
  if (variant === "sidebar") {
    return (
      <h3
        className="text-[10px] font-semibold uppercase tracking-[0.14em] mb-3 pb-1.5"
        style={{
          color: "#ffffff",
          borderBottom: `1px solid ${isDarkColor(colorScheme.primary) ? "rgba(255,255,255,0.25)" : hexToRgba(colorScheme.primary, 0.5)}`,
        }}
      >
        {children}
      </h3>
    );
  }
  if (variant === "accent-bar") {
    return (
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-4 rounded-full" style={{ backgroundColor: colorScheme.primary }} />
        <h2 className="text-[12px] font-bold uppercase tracking-[0.12em]" style={{ color: colorScheme.secondary }}>
          {children}
        </h2>
      </div>
    );
  }
  return (
    <h2
      className="text-[12px] font-bold mb-3 pb-1.5"
      style={{
        color: colorScheme.secondary,
        borderBottom: `2px solid ${colorScheme.primary}`,
      }}
    >
      {children}
    </h2>
  );
};

/* ── Contact ── */
export const ContactRow = ({
  personalInfo,
  colorScheme,
  variant = "inline",
  light = false,
}: {
  personalInfo: PersonalInfo;
  colorScheme: ColorScheme;
  variant?: "inline" | "stacked" | "sidebar";
  light?: boolean;
}) => {
  const items = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.linkedin,
    personalInfo.github,
    personalInfo.website,
  ].filter(Boolean);

  const textColor = light ? "rgba(255,255,255,0.85)" : colorScheme.text;
  const sepColor = light ? "rgba(255,255,255,0.35)" : muted(colorScheme.text, 0.35);

  if (variant === "sidebar") {
    const labelColor = accentOnDarkBg(colorScheme);
    return (
      <ul className="space-y-2.5">
        {personalInfo.email && (
          <ContactItem label="Email" value={personalInfo.email} labelColor={labelColor} valueColor="rgba(255,255,255,0.9)" />
        )}
        {personalInfo.phone && (
          <ContactItem label="Phone" value={personalInfo.phone} labelColor={labelColor} valueColor="rgba(255,255,255,0.9)" />
        )}
        {personalInfo.linkedin && (
          <ContactItem label="LinkedIn" value={personalInfo.linkedin} labelColor={labelColor} valueColor="rgba(255,255,255,0.9)" />
        )}
        {personalInfo.github && (
          <ContactItem label="GitHub" value={personalInfo.github} labelColor={labelColor} valueColor="rgba(255,255,255,0.9)" />
        )}
        {personalInfo.website && (
          <ContactItem label="Website" value={personalInfo.website} labelColor={labelColor} valueColor="rgba(255,255,255,0.9)" />
        )}
      </ul>
    );
  }

  if (variant === "stacked") {
    return (
      <div className="space-y-0.5 text-[10px]" style={{ color: textColor }}>
        {items.map((item, i) => (
          <p key={i}>{item}</p>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px]" style={{ color: textColor }}>
      {items.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-x-3">
          {i > 0 && <span style={{ color: sepColor }}>·</span>}
          <span>{item}</span>
        </span>
      ))}
    </div>
  );
};

const ContactItem = ({
  label,
  value,
  labelColor,
  valueColor,
}: {
  label: string;
  value: string;
  labelColor: string;
  valueColor: string;
}) => (
  <li>
    <p className="text-[9px] uppercase tracking-wider font-medium mb-0.5" style={{ color: labelColor }}>
      {label}
    </p>
    <p className="text-[10px] break-all" style={{ color: valueColor }}>
      {value}
    </p>
  </li>
);

/* ── Avatar initials ── */
export const InitialsAvatar = ({
  firstName,
  lastName,
  colorScheme,
  size = "md",
  onDark = false,
}: {
  firstName: string;
  lastName: string;
  colorScheme: ColorScheme;
  size?: "sm" | "md" | "lg";
  onDark?: boolean;
}) => {
  const sizes = { sm: "w-14 h-14 text-lg", md: "w-[72px] h-[72px] text-xl", lg: "w-20 h-20 text-2xl" };
  const inverted = onDark && isDarkColor(colorScheme.primary);
  return (
    <div
      className={`${sizes[size]} rounded-full mx-auto flex items-center justify-center font-bold`}
      style={{
        backgroundColor: inverted ? "#ffffff" : colorScheme.primary,
        color: inverted ? colorScheme.secondary : "#ffffff",
        boxShadow: inverted
          ? "0 0 0 3px rgba(255,255,255,0.2)"
          : `0 0 0 3px ${hexToRgba(colorScheme.primary, 0.25)}`,
      }}
    >
      {firstName.charAt(0)}
      {lastName.charAt(0)}
    </div>
  );
};

/* ── Skills ── */
export const SkillBars = ({
  skills,
  colorScheme,
  light = false,
}: {
  skills: SkillItem[];
  colorScheme: ColorScheme;
  light?: boolean;
}) => (
  <div className="space-y-2.5">
    {skills.map((skill) => (
      <div key={skill.id}>
        <div className="flex justify-between text-[10px] mb-1">
          <span style={{ color: light ? "#fff" : colorScheme.text }}>{skill.name}</span>
          {skill.category && (
            <span style={{ color: light ? "rgba(255,255,255,0.45)" : muted(colorScheme.text) }}>
              {skill.category}
            </span>
          )}
        </div>
        <div
          className="w-full rounded-full h-[3px]"
          style={{ backgroundColor: light ? "rgba(255,255,255,0.15)" : accentBg(colorScheme.secondary, 0.12) }}
        >
          <div
            className="h-[3px] rounded-full transition-all"
            style={{
              width: `${skill.level || 70}%`,
              backgroundColor: light ? barFillOnDarkBg(colorScheme) : colorScheme.primary,
            }}
          />
        </div>
      </div>
    ))}
  </div>
);

export const SkillPills = ({
  skills,
  colorScheme,
  variant = "outline",
}: {
  skills: SkillItem[];
  colorScheme: ColorScheme;
  variant?: "outline" | "filled";
}) => (
  <ResumeBadgeRow>
    {skills.map((skill) => (
      <span
        key={skill.id}
        className="resume-badge"
        style={
          variant === "filled"
            ? {
                backgroundColor: accentBg(colorScheme.primary),
                color: colorScheme.primary,
                border: `1px solid ${hexToRgba(colorScheme.primary, 0.2)}`,
              }
            : {
                border: `1px solid ${hexToRgba(colorScheme.primary, 0.35)}`,
                color: colorScheme.text,
              }
        }
      >
        {skill.name}
      </span>
    ))}
  </ResumeBadgeRow>
);

export const SkillDots = ({
  skills,
  colorScheme,
}: {
  skills: SkillItem[];
  colorScheme: ColorScheme;
}) => (
  <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
    {skills.map((skill) => (
      <div key={skill.id} className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: colorScheme.primary }} />
        <span className="text-[10px]">{skill.name}</span>
      </div>
    ))}
  </div>
);

/* ── Experience ── */
export const ExperienceList = ({
  experience,
  colorScheme,
  variant = "standard",
}: {
  experience: ExperienceItem[];
  colorScheme: ColorScheme;
  variant?: "standard" | "timeline" | "executive";
}) => (
  <div className={variant === "timeline" ? "space-y-5" : "space-y-4"}>
    {experience.map((exp, index) => (
      <div key={exp.id} className={variant === "timeline" ? "relative pl-5" : ""}>
        {variant === "timeline" && (
          <div aria-hidden>
            {index < experience.length - 1 && (
              <div
                className="absolute left-[5px] top-2 bottom-[-12px] w-px"
                style={{ backgroundColor: accentBg(colorScheme.primary, 0.4) }}
              />
            )}
            <div
              className="absolute left-0 top-1 w-[11px] h-[11px] rounded-full border-2"
              style={{ borderColor: colorScheme.primary, backgroundColor: colorScheme.background }}
            />
          </div>
        )}
        <div className="flex justify-between items-start gap-3 mb-0.5">
          <h3 className="font-bold text-[11px]" style={{ color: colorScheme.secondary }}>
            {exp.position}
          </h3>
          <p className="text-[9px] shrink-0 whitespace-nowrap" style={{ color: muted(colorScheme.text) }}>
            {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}
          </p>
        </div>
        <p className="text-[10px] font-medium mb-1" style={{ color: colorScheme.primary }}>
          {exp.company}
          {exp.location && (
            <span style={{ color: muted(colorScheme.text) }}> · {exp.location}</span>
          )}
        </p>
        {exp.description && (
          <p className="text-[10px] mb-1.5" style={{ color: muted(colorScheme.text, 0.85) }}>
            {exp.description}
          </p>
        )}
        {exp.achievements && exp.achievements.filter(Boolean).length > 0 && (
          <ul className="space-y-0.5">
            {exp.achievements.filter(Boolean).map((a, i) => (
              <li key={i} className="text-[9.5px] flex gap-2" style={{ color: muted(colorScheme.text, 0.9) }}>
                <span className="shrink-0 mt-[5px] w-1 h-1 rounded-full" style={{ backgroundColor: colorScheme.primary }} />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </div>
);

/* ── Education ── */
export const EducationList = ({
  education,
  colorScheme,
  light = false,
  variant = "standard",
}: {
  education: EducationItem[];
  colorScheme: ColorScheme;
  light?: boolean;
  variant?: "standard" | "compact";
}) => (
  <div className="space-y-3">
    {education.map((edu) => (
      <div key={edu.id}>
        <div className="flex justify-between items-start gap-2">
          <h4
            className="font-semibold text-[10px]"
            style={{ color: light ? "#fff" : colorScheme.secondary }}
          >
            {edu.institution}
          </h4>
          {!light && variant === "standard" && (
            <p className="text-[9px] shrink-0" style={{ color: muted(colorScheme.text) }}>
              {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
            </p>
          )}
        </div>
        <p className="text-[10px]" style={{ color: light ? accentOnDarkBg(colorScheme) : colorScheme.primary }}>
          {edu.degree}{edu.field ? `, ${edu.field}` : ""}
        </p>
        {light && (
          <p className="text-[9px] mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
            {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
          </p>
        )}
        {edu.gpa && (
          <p className="text-[9px] mt-0.5" style={{ color: light ? "rgba(255,255,255,0.6)" : muted(colorScheme.text) }}>
            GPA: {edu.gpa}
          </p>
        )}
      </div>
    ))}
  </div>
);

/* ── Projects ── */
export const ProjectList = ({
  projects,
  colorScheme,
  variant = "standard",
}: {
  projects: ProjectItem[];
  colorScheme: ColorScheme;
  variant?: "standard" | "card" | "border-left";
}) => (
  <div className="space-y-3">
    {projects.map((project) => (
      <div
        key={project.id}
        className={
          variant === "card"
            ? "p-3 rounded-lg"
            : variant === "border-left"
            ? "pl-3 border-l-[3px]"
            : ""
        }
        style={
          variant === "card"
            ? { backgroundColor: accentBg(colorScheme.secondary, 0.06) }
            : variant === "border-left"
            ? { borderColor: colorScheme.primary }
            : undefined
        }
      >
        <div className="flex justify-between items-start gap-2 mb-0.5">
          <h3 className="font-bold text-[10px]" style={{ color: colorScheme.secondary }}>
            {project.name}
          </h3>
          {project.startDate && (
            <p className="text-[9px] shrink-0" style={{ color: muted(colorScheme.text) }}>
              {formatDate(project.startDate)}
              {project.endDate ? ` – ${formatDate(project.endDate)}` : ""}
            </p>
          )}
        </div>
        <p className="text-[9.5px] mb-2 leading-relaxed" style={{ color: muted(colorScheme.text, 0.85) }}>
          {project.description}
        </p>
        {project.technologies && project.technologies.length > 0 && (
          <TechPills technologies={project.technologies} colorScheme={colorScheme} />
        )}
      </div>
    ))}
  </div>
);

export const TechPills = ({
  technologies,
  colorScheme,
}: {
  technologies: string[];
  colorScheme: ColorScheme;
}) => (
  <ResumeBadgeRow>
    {technologies.map((tech, i) => (
      <ResumeBadge key={i} label={tech} colorScheme={colorScheme} size="sm" />
    ))}
  </ResumeBadgeRow>
);

/* ── Certifications ── */
export const CertificationList = ({
  certifications,
  colorScheme,
  variant = "standard",
}: {
  certifications: CertificationItem[];
  colorScheme: ColorScheme;
  variant?: "standard" | "grid" | "compact";
}) => {
  const isCompact = variant === "compact";

  return (
    <div className={variant === "grid" ? "grid grid-cols-2 gap-3" : "space-y-3"}>
      {certifications.map((cert) => (
        <div
          key={cert.id}
          className={variant === "grid" ? "p-2.5 rounded-lg" : ""}
          style={variant === "grid" ? { border: `1px solid ${hexToRgba(colorScheme.primary, 0.15)}` } : undefined}
        >
          <h3
            className="font-semibold text-[10px] leading-snug"
            style={{ color: colorScheme.secondary, marginBottom: isCompact ? "2px" : "4px" }}
          >
            {cert.name}
          </h3>
          {isCompact ? (
            <p className="text-[9px] leading-relaxed" style={{ color: muted(colorScheme.text, 0.75) }}>
              <span style={{ color: colorScheme.primary }}>{cert.issuer}</span>
              {" · "}
              {formatDate(cert.date)}
              {cert.credentialID && ` · ID: ${cert.credentialID}`}
            </p>
          ) : (
            <div>
              <p className="text-[9px] leading-snug" style={{ color: colorScheme.primary }}>
                {cert.issuer}
              </p>
              <p className="text-[9px] leading-snug" style={{ color: muted(colorScheme.text) }}>
                {formatDate(cert.date)}
                {cert.credentialID && ` · ID: ${cert.credentialID}`}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

/* ── Summary ── */
export const SummaryBlock = ({
  summary,
  colorScheme,
  variant = "plain",
}: {
  summary: string;
  colorScheme: ColorScheme;
  variant?: "plain" | "quote" | "highlight";
}) => {
  if (variant === "quote") {
    return (
      <p
        className="text-[10.5px] italic pl-3 leading-relaxed"
        style={{ borderLeft: `3px solid ${colorScheme.primary}`, color: muted(colorScheme.text, 0.9) }}
      >
        {summary}
      </p>
    );
  }
  if (variant === "highlight") {
    return (
      <p
        className="text-[10.5px] leading-relaxed p-3 rounded-lg"
        style={{ backgroundColor: accentBg(colorScheme.primary, 0.06), color: muted(colorScheme.text, 0.9) }}
      >
        {summary}
      </p>
    );
  }
  return (
    <p className="text-[10.5px] leading-relaxed" style={{ color: muted(colorScheme.text, 0.9) }}>
      {summary}
    </p>
  );
};
