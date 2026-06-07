
import React from "react";
import { ResumeData } from "@/lib/types";
import { ColorScheme } from "@/contexts/ResumeContext";
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
  accentOnDarkBg,
} from "./shared/resume-primitives";

interface ProfessionalTemplateProps {
  data: ResumeData;
  colorScheme: ColorScheme;
}

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ data, colorScheme }) => {
  const { personalInfo, education, experience, skills, certifications, projects } = data;
  const fonts = TEMPLATE_FONT_FAMILIES.professional;

  return (
    <ResumeDocument style={resumeStyle(colorScheme, fonts)}>
      {/* Header band */}
      <header
        className="px-8 py-7 text-center"
        style={{ backgroundColor: colorScheme.secondary, color: "#ffffff" }}
      >
        <h1
          className="text-[22px] font-bold tracking-tight mb-1"
          style={{ fontFamily: fonts.heading }}
        >
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-[12px] font-medium mb-3" style={{ color: accentOnDarkBg(colorScheme) }}>
          {personalInfo.title}
        </p>
        <ContactRow personalInfo={personalInfo} colorScheme={colorScheme} light />
      </header>

      <div className="px-8 py-6">
        <div className="mb-5">
          <SectionTitle colorScheme={colorScheme}>Professional Summary</SectionTitle>
          <SummaryBlock summary={personalInfo.summary} colorScheme={colorScheme} />
        </div>

        <div className="mb-5">
          <SectionTitle colorScheme={colorScheme}>Professional Experience</SectionTitle>
          <ExperienceList experience={experience} colorScheme={colorScheme} />
        </div>

        <div className="mb-5">
          <SectionTitle colorScheme={colorScheme}>Education</SectionTitle>
          <EducationList education={education} colorScheme={colorScheme} />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-5">
          <div>
            <SectionTitle colorScheme={colorScheme}>Skills</SectionTitle>
            <SkillDots skills={skills} colorScheme={colorScheme} />
          </div>
          {certifications.length > 0 && (
            <div>
              <SectionTitle colorScheme={colorScheme}>Certifications</SectionTitle>
              <CertificationList certifications={certifications} colorScheme={colorScheme} variant="compact" />
            </div>
          )}
        </div>

        {projects.length > 0 && (
          <div>
            <SectionTitle colorScheme={colorScheme}>Projects</SectionTitle>
            <ProjectList projects={projects} colorScheme={colorScheme} variant="border-left" />
          </div>
        )}
      </div>

      {/* Footer accent */}
      <div className="h-1" style={{ backgroundColor: colorScheme.primary }} />
    </ResumeDocument>
  );
};

export default ProfessionalTemplate;
