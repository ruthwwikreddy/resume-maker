
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
  InitialsAvatar,
  SkillBars,
  EducationList,
  ExperienceList,
  ProjectList,
  CertificationList,
  SummaryBlock,
} from "./shared/resume-primitives";

interface ModernTemplateProps {
  data: ResumeData;
  colorScheme: ColorScheme;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ data, colorScheme }) => {
  const { personalInfo, education, experience, skills, certifications, projects } = data;
  const fonts = TEMPLATE_FONT_FAMILIES.modern;

  return (
    <ResumeDocument style={resumeStyle(colorScheme, fonts)} className="flex">
      {/* Sidebar */}
      <aside
        className="w-[34%] shrink-0 px-6 py-8 flex flex-col gap-7"
        style={{
          backgroundColor: colorScheme.secondary,
          fontFamily: fonts.body,
        }}
      >
        <div className="text-center">
          <InitialsAvatar
            firstName={personalInfo.firstName}
            lastName={personalInfo.lastName}
            colorScheme={colorScheme}
            onDark
          />
          <h1
            className="text-[15px] font-bold mt-4 text-white tracking-tight"
            style={{ fontFamily: fonts.heading }}
          >
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <p className="text-[10px] mt-1 font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>
            {personalInfo.title}
          </p>
        </div>

        <div>
          <SectionTitle colorScheme={colorScheme} variant="sidebar">Contact</SectionTitle>
          <ContactRow personalInfo={personalInfo} colorScheme={colorScheme} variant="sidebar" />
        </div>

        <div>
          <SectionTitle colorScheme={colorScheme} variant="sidebar">Skills</SectionTitle>
          <SkillBars skills={skills} colorScheme={colorScheme} light />
        </div>

        <div>
          <SectionTitle colorScheme={colorScheme} variant="sidebar">Education</SectionTitle>
          <EducationList education={education} colorScheme={colorScheme} light variant="compact" />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 px-7 py-8" style={{ fontFamily: fonts.body }}>
        <div
          className="mb-6 pb-4"
          style={{ borderBottom: `1px solid ${hexToRgba(colorScheme.secondary, 0.1)}` }}
        >
          <p
            className="text-[9px] uppercase tracking-[0.2em] font-semibold mb-1"
            style={{ color: colorScheme.primary }}
          >
            Profile
          </p>
          <SummaryBlock summary={personalInfo.summary} colorScheme={colorScheme} />
        </div>

        <div className="mb-6">
          <SectionTitle colorScheme={colorScheme}>Work Experience</SectionTitle>
          <ExperienceList experience={experience} colorScheme={colorScheme} />
        </div>

        {projects.length > 0 && (
          <div className="mb-6">
            <SectionTitle colorScheme={colorScheme}>Projects</SectionTitle>
            <ProjectList projects={projects} colorScheme={colorScheme} />
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <SectionTitle colorScheme={colorScheme}>Certifications</SectionTitle>
            <CertificationList certifications={certifications} colorScheme={colorScheme} variant="grid" />
          </div>
        )}
      </main>
    </ResumeDocument>
  );
};

export default ModernTemplate;
