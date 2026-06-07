
import React from "react";
import { ResumeData } from "@/lib/types";
import { ColorScheme } from "@/contexts/ResumeContext";
import { hexToRgba } from "@/lib/utils";
import { TEMPLATE_FONT_FAMILIES } from "./shared/template-fonts";
import {
  ResumeDocument,
  ResumeSection,
  resumeStyle,
  SectionTitle,
  ContactRow,
  SkillPills,
  EducationList,
  ExperienceList,
  ProjectList,
  CertificationList,
  SummaryBlock,
} from "./shared/resume-primitives";

interface MinimalTemplateProps {
  data: ResumeData;
  colorScheme: ColorScheme;
}

const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ data, colorScheme }) => {
  const { personalInfo, education, experience, skills, certifications, projects } = data;
  const fonts = TEMPLATE_FONT_FAMILIES.minimal;

  return (
    <ResumeDocument style={resumeStyle(colorScheme, fonts)} className="px-10 py-9">
      <header
        className="text-center mb-7 pb-5"
        style={{ borderBottom: `1px solid ${hexToRgba(colorScheme.text, 0.12)}` }}
      >
        <h1
          className="text-[20px] font-bold tracking-[0.04em] mb-1"
          style={{ fontFamily: fonts.heading, color: colorScheme.secondary }}
        >
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-[11px] font-light tracking-[0.08em] uppercase mb-2" style={{ color: colorScheme.primary }}>
          {personalInfo.title}
        </p>
        <ContactRow personalInfo={personalInfo} colorScheme={colorScheme} />
      </header>

      <ResumeSection>
        <SummaryBlock summary={personalInfo.summary} colorScheme={colorScheme} variant="quote" />
      </ResumeSection>

      <ResumeSection>
        <SectionTitle colorScheme={colorScheme} variant="caps">Experience</SectionTitle>
        <ExperienceList experience={experience} colorScheme={colorScheme} />
      </ResumeSection>

      <ResumeSection>
        <SectionTitle colorScheme={colorScheme} variant="caps">Education</SectionTitle>
        <EducationList education={education} colorScheme={colorScheme} />
      </ResumeSection>

      <ResumeSection>
        <SectionTitle colorScheme={colorScheme} variant="caps">Skills</SectionTitle>
        <SkillPills skills={skills} colorScheme={colorScheme} />
      </ResumeSection>

      {projects.length > 0 && (
        <ResumeSection>
          <SectionTitle colorScheme={colorScheme} variant="caps">Projects</SectionTitle>
          <ProjectList projects={projects} colorScheme={colorScheme} />
        </ResumeSection>
      )}

      {certifications.length > 0 && (
        <ResumeSection className="resume-section--last">
          <SectionTitle colorScheme={colorScheme} variant="caps">Certifications</SectionTitle>
          <CertificationList certifications={certifications} colorScheme={colorScheme} variant="compact" />
        </ResumeSection>
      )}
    </ResumeDocument>
  );
};

export default MinimalTemplate;
