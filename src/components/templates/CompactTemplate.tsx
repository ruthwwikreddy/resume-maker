
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
  SkillPills,
  EducationList,
  ExperienceList,
  ProjectList,
  CertificationList,
} from "./shared/resume-primitives";

interface CompactTemplateProps {
  data: ResumeData;
  colorScheme: ColorScheme;
}

const CompactTemplate: React.FC<CompactTemplateProps> = ({ data, colorScheme }) => {
  const { personalInfo, education, experience, skills, certifications, projects } = data;
  const fonts = TEMPLATE_FONT_FAMILIES.compact;

  return (
    <ResumeDocument style={resumeStyle(colorScheme, fonts)} className="px-7 py-6">
      <header
        className="flex justify-between items-end mb-4 pb-3"
        style={{ borderBottom: `2px solid ${colorScheme.primary}` }}
      >
        <div>
          <h1
            className="text-[18px] font-bold tracking-tight leading-none"
            style={{ fontFamily: fonts.heading, color: colorScheme.secondary }}
          >
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <p className="text-[10px] mt-1 font-medium" style={{ color: colorScheme.primary }}>
            {personalInfo.title}
          </p>
        </div>
        <ContactRow personalInfo={personalInfo} colorScheme={colorScheme} variant="stacked" />
      </header>

      <p className="text-[10px] mb-4 leading-relaxed" style={{ color: hexToRgba(colorScheme.text, 0.85) }}>
        {personalInfo.summary}
      </p>

      <div className="grid grid-cols-[1fr_1.4fr] gap-5">
        <div className="space-y-4">
          <div>
            <SectionTitle colorScheme={colorScheme} variant="caps">Skills</SectionTitle>
            <SkillPills skills={skills} colorScheme={colorScheme} variant="filled" />
          </div>

          <div>
            <SectionTitle colorScheme={colorScheme} variant="caps">Education</SectionTitle>
            <EducationList education={education} colorScheme={colorScheme} variant="compact" />
          </div>

          {certifications.length > 0 && (
            <div>
              <SectionTitle colorScheme={colorScheme} variant="caps">Certs</SectionTitle>
              <CertificationList certifications={certifications} colorScheme={colorScheme} variant="compact" />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <SectionTitle colorScheme={colorScheme} variant="caps">Experience</SectionTitle>
            <ExperienceList experience={experience} colorScheme={colorScheme} />
          </div>

          {projects.length > 0 && (
            <div>
              <SectionTitle colorScheme={colorScheme} variant="caps">Projects</SectionTitle>
              <ProjectList projects={projects} colorScheme={colorScheme} />
            </div>
          )}
        </div>
      </div>
    </ResumeDocument>
  );
};

export default CompactTemplate;
