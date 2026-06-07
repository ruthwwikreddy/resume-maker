
import React from "react";
import { ResumeData } from "@/lib/types";
import { ColorScheme } from "@/contexts/ResumeContext";
import { hexToRgba } from "@/lib/utils";
import { TEMPLATE_FONT_FAMILIES } from "./shared/template-fonts";
import {
  ResumeDocument,
  resumeStyle,
  SectionTitle,
  SkillDots,
  EducationList,
  ExperienceList,
  ProjectList,
  CertificationList,
  SummaryBlock,
  accentOnDarkBg,
} from "./shared/resume-primitives";

interface ExecutiveTemplateProps {
  data: ResumeData;
  colorScheme: ColorScheme;
}

const ExecutiveTemplate: React.FC<ExecutiveTemplateProps> = ({ data, colorScheme }) => {
  const { personalInfo, education, experience, skills, certifications, projects } = data;
  const fonts = TEMPLATE_FONT_FAMILIES.executive;

  return (
    <ResumeDocument style={resumeStyle(colorScheme, fonts)}>
      {/* Executive header */}
      <header
        className="px-8 py-8 flex justify-between items-end"
        style={{ backgroundColor: colorScheme.secondary, color: "#ffffff" }}
      >
        <div>
          <p className="text-[9px] uppercase tracking-[0.25em] mb-2 opacity-50">Curriculum Vitae</p>
          <h1
            className="text-[24px] font-bold tracking-tight"
            style={{ fontFamily: fonts.heading }}
          >
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <p className="text-[12px] mt-1 font-medium" style={{ color: accentOnDarkBg(colorScheme) }}>
            {personalInfo.title}
          </p>
        </div>
        <div className="text-right text-[9.5px] space-y-0.5 opacity-85">
          <p>{personalInfo.email}</p>
          <p>{personalInfo.phone}</p>
          {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
          {personalInfo.github && <p>{personalInfo.github}</p>}
        </div>
      </header>

      <div className="px-8 py-6">
        <div className="mb-6">
          <SectionTitle colorScheme={colorScheme} variant="accent-bar">Executive Summary</SectionTitle>
          <SummaryBlock summary={personalInfo.summary} colorScheme={colorScheme} variant="highlight" />
        </div>

        <div className="mb-6">
          <SectionTitle colorScheme={colorScheme} variant="accent-bar">Professional Experience</SectionTitle>
          <ExperienceList experience={experience} colorScheme={colorScheme} variant="executive" />
        </div>

        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <SectionTitle colorScheme={colorScheme} variant="accent-bar">Education</SectionTitle>
            <EducationList education={education} colorScheme={colorScheme} />
          </div>
          <div>
            <SectionTitle colorScheme={colorScheme} variant="accent-bar">Areas of Expertise</SectionTitle>
            <SkillDots skills={skills} colorScheme={colorScheme} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {projects.length > 0 && (
            <div>
              <SectionTitle colorScheme={colorScheme} variant="accent-bar">Strategic Projects</SectionTitle>
              <ProjectList projects={projects} colorScheme={colorScheme} variant="border-left" />
            </div>
          )}
          {certifications.length > 0 && (
            <div>
              <SectionTitle colorScheme={colorScheme} variant="accent-bar">Certifications</SectionTitle>
              <CertificationList certifications={certifications} colorScheme={colorScheme} variant="compact" />
            </div>
          )}
        </div>
      </div>

      <div
        className="h-[3px] mx-8"
        style={{ background: `linear-gradient(90deg, ${colorScheme.primary}, ${hexToRgba(colorScheme.primary, 0.2)})` }}
      />
    </ResumeDocument>
  );
};

export default ExecutiveTemplate;
