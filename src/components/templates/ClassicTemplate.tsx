
import React from "react";
import { ResumeData } from "@/lib/types";
import { ColorScheme } from "@/contexts/ResumeContext";
import { hexToRgba } from "@/lib/utils";
import { TEMPLATE_FONT_FAMILIES } from "./shared/template-fonts";
import {
  ResumeDocument,
  resumeStyle,
  ContactRow,
  SkillDots,
  EducationList,
  ExperienceList,
  ProjectList,
  CertificationList,
  SummaryBlock,
} from "./shared/resume-primitives";

interface ClassicTemplateProps {
  data: ResumeData;
  colorScheme: ColorScheme;
}

const ClassicSection = ({
  title,
  children,
  colorScheme,
}: {
  title: string;
  children: React.ReactNode;
  colorScheme: ColorScheme;
}) => (
  <div className="mb-5">
    <h2
      className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 pb-1"
      style={{
        color: colorScheme.secondary,
        borderBottom: `1px solid ${hexToRgba(colorScheme.secondary, 0.25)}`,
      }}
    >
      {title}
    </h2>
    {children}
  </div>
);

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data, colorScheme }) => {
  const { personalInfo, education, experience, skills, certifications, projects } = data;
  const fonts = TEMPLATE_FONT_FAMILIES.classic;

  return (
    <ResumeDocument style={resumeStyle(colorScheme, fonts)} className="px-10 py-9">
      <header className="text-center mb-6 pb-4" style={{ borderBottom: `2px solid ${colorScheme.secondary}` }}>
        <h1
          className="text-[20px] font-bold tracking-wide mb-1"
          style={{ fontFamily: fonts.heading, color: colorScheme.secondary }}
        >
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-[11px] mb-2" style={{ color: colorScheme.primary }}>
          {personalInfo.title}
        </p>
        <ContactRow personalInfo={personalInfo} colorScheme={colorScheme} />
      </header>

      <ClassicSection title="Professional Summary" colorScheme={colorScheme}>
        <SummaryBlock summary={personalInfo.summary} colorScheme={colorScheme} />
      </ClassicSection>

      <ClassicSection title="Professional Experience" colorScheme={colorScheme}>
        <ExperienceList experience={experience} colorScheme={colorScheme} />
      </ClassicSection>

      <ClassicSection title="Education" colorScheme={colorScheme}>
        <EducationList education={education} colorScheme={colorScheme} />
      </ClassicSection>

      <ClassicSection title="Core Competencies" colorScheme={colorScheme}>
        <SkillDots skills={skills} colorScheme={colorScheme} />
      </ClassicSection>

      {projects.length > 0 && (
        <ClassicSection title="Selected Projects" colorScheme={colorScheme}>
          <ProjectList projects={projects} colorScheme={colorScheme} />
        </ClassicSection>
      )}

      {certifications.length > 0 && (
        <ClassicSection title="Certifications" colorScheme={colorScheme}>
          <CertificationList certifications={certifications} colorScheme={colorScheme} variant="compact" />
        </ClassicSection>
      )}
    </ResumeDocument>
  );
};

export default ClassicTemplate;
