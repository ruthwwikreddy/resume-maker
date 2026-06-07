
import React from "react";
import { ResumeData } from "@/lib/types";
import { ColorScheme } from "@/contexts/ResumeContext";
import { hexToRgba } from "@/lib/utils";
import { TEMPLATE_FONT_FAMILIES } from "./shared/template-fonts";
import {
  ResumeDocument,
  resumeStyle,
  SectionTitle,
  ContactRow,
  SkillDots,
  EducationList,
  ExperienceList,
  ProjectList,
  CertificationList,
  SummaryBlock,
} from "./shared/resume-primitives";

interface AcademicTemplateProps {
  data: ResumeData;
  colorScheme: ColorScheme;
}

const AcademicTemplate: React.FC<AcademicTemplateProps> = ({ data, colorScheme }) => {
  const { personalInfo, education, experience, skills, certifications, projects } = data;
  const fonts = TEMPLATE_FONT_FAMILIES.academic;

  return (
    <ResumeDocument style={resumeStyle(colorScheme, fonts)} className="px-9 py-8">
      <header className="mb-5">
        <h1
          className="text-[19px] font-bold mb-0.5"
          style={{ fontFamily: fonts.heading, color: colorScheme.secondary }}
        >
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-[10.5px] italic mb-2" style={{ color: colorScheme.primary }}>
          {personalInfo.title}
        </p>
        <ContactRow personalInfo={personalInfo} colorScheme={colorScheme} />
      </header>

      <div
        className="mb-5 p-3 rounded"
        style={{ backgroundColor: hexToRgba(colorScheme.primary, 0.05) }}
      >
        <SectionTitle colorScheme={colorScheme}>Research & Professional Summary</SectionTitle>
        <SummaryBlock summary={personalInfo.summary} colorScheme={colorScheme} />
      </div>

      <div className="mb-5">
        <SectionTitle colorScheme={colorScheme}>Education</SectionTitle>
        <EducationList education={education} colorScheme={colorScheme} />
      </div>

      {projects.length > 0 && (
        <div className="mb-5">
          <SectionTitle colorScheme={colorScheme}>Research & Projects</SectionTitle>
          <ProjectList projects={projects} colorScheme={colorScheme} variant="border-left" />
        </div>
      )}

      <div className="mb-5">
        <SectionTitle colorScheme={colorScheme}>Professional Experience</SectionTitle>
        <ExperienceList experience={experience} colorScheme={colorScheme} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <SectionTitle colorScheme={colorScheme}>Technical Skills</SectionTitle>
          <SkillDots skills={skills} colorScheme={colorScheme} />
        </div>
        {certifications.length > 0 && (
          <div>
            <SectionTitle colorScheme={colorScheme}>Certifications & Credentials</SectionTitle>
            <CertificationList certifications={certifications} colorScheme={colorScheme} variant="compact" />
          </div>
        )}
      </div>
    </ResumeDocument>
  );
};

export default AcademicTemplate;
