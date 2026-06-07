
import React from "react";
import { ResumeData } from "@/lib/types";
import { ColorScheme } from "@/contexts/ResumeContext";
import { hexToRgba } from "@/lib/utils";
import { TEMPLATE_FONT_FAMILIES } from "./shared/template-fonts";
import {
  ResumeDocument,
  resumeStyle,
  SectionTitle,
  EducationList,
  ExperienceList,
  ProjectList,
  CertificationList,
  SummaryBlock,
  TechPills,
} from "./shared/resume-primitives";

interface TechTemplateProps {
  data: ResumeData;
  colorScheme: ColorScheme;
}

const TechTemplate: React.FC<TechTemplateProps> = ({ data, colorScheme }) => {
  const { personalInfo, education, experience, skills, certifications, projects } = data;
  const fonts = TEMPLATE_FONT_FAMILIES.tech;

  const skillCategories = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    const cat = skill.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <ResumeDocument style={resumeStyle(colorScheme, fonts)} className="px-8 py-7">
      <header
        className="flex justify-between items-start mb-4 pb-3"
        style={{ borderBottom: `1px solid ${hexToRgba(colorScheme.secondary, 0.12)}` }}
      >
        <div>
          <h1
            className="text-[20px] font-bold tracking-tight"
            style={{ fontFamily: fonts.heading, color: colorScheme.secondary }}
          >
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <p className="text-[11px] font-medium mt-0.5" style={{ color: colorScheme.primary }}>
            {personalInfo.title}
          </p>
        </div>
        <div className="text-right text-[9px] space-y-0.5" style={{ color: hexToRgba(colorScheme.text, 0.8) }}>
          <p>{personalInfo.email}</p>
          <p>{personalInfo.phone}</p>
          {personalInfo.github && <p>{personalInfo.github}</p>}
          {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
        </div>
      </header>

      <div
        className="mb-4 p-3 rounded-lg"
        style={{ backgroundColor: hexToRgba(colorScheme.primary, 0.06), border: `1px solid ${hexToRgba(colorScheme.primary, 0.12)}` }}
      >
        <p className="text-[9px] uppercase tracking-widest font-bold mb-2" style={{ color: colorScheme.primary }}>
          Tech Stack
        </p>
        <div className="space-y-2">
          {Object.entries(skillCategories).map(([category, categorySkills]) => (
            <div key={category} className="flex flex-wrap items-center gap-1.5">
              <span className="text-[8.5px] font-semibold uppercase tracking-wide shrink-0" style={{ color: hexToRgba(colorScheme.text, 0.5) }}>
                {category}:
              </span>
              {categorySkills.map((s) => (
                <span
                  key={s.id}
                  className="text-[8.5px] px-1.5 py-0.5 rounded font-medium"
                  style={{ backgroundColor: hexToRgba(colorScheme.primary, 0.12), color: colorScheme.primary }}
                >
                  {s.name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <SectionTitle colorScheme={colorScheme}>Summary</SectionTitle>
        <SummaryBlock summary={personalInfo.summary} colorScheme={colorScheme} />
      </div>

      <div className="mb-4">
        <SectionTitle colorScheme={colorScheme}>Experience</SectionTitle>
        <ExperienceList experience={experience} colorScheme={colorScheme} />
      </div>

      {projects.length > 0 && (
        <div className="mb-4">
          <SectionTitle colorScheme={colorScheme}>Projects</SectionTitle>
          <div className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-2.5 rounded-lg"
                style={{ border: `1px solid ${hexToRgba(colorScheme.secondary, 0.1)}` }}
              >
                <div className="flex justify-between items-start gap-2 mb-0.5">
                  <h3 className="font-bold text-[10.5px]" style={{ color: colorScheme.secondary }}>
                    {project.name}
                  </h3>
                </div>
                <p className="text-[9.5px] mb-1.5" style={{ color: hexToRgba(colorScheme.text, 0.85) }}>
                  {project.description}
                </p>
                {project.technologies && project.technologies.length > 0 && (
                  <TechPills technologies={project.technologies} colorScheme={colorScheme} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-5">
        <div>
          <SectionTitle colorScheme={colorScheme}>Education</SectionTitle>
          <EducationList education={education} colorScheme={colorScheme} variant="compact" />
        </div>
        {certifications.length > 0 && (
          <div>
            <SectionTitle colorScheme={colorScheme}>Certifications</SectionTitle>
            <CertificationList certifications={certifications} colorScheme={colorScheme} variant="compact" />
          </div>
        )}
      </div>
    </ResumeDocument>
  );
};

export default TechTemplate;
