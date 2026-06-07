
import React from "react";
import { ResumeData } from "@/lib/types";
import { ColorScheme } from "@/contexts/ResumeContext";
import { hexToRgba } from "@/lib/utils";
import { TEMPLATE_FONT_FAMILIES } from "./shared/template-fonts";
import {
  ResumeDocument,
  resumeStyle,
  ContactRow,
  SkillPills,
  EducationList,
  ExperienceList,
  ProjectList,
  CertificationList,
  SummaryBlock,
} from "./shared/resume-primitives";

interface ElegantTemplateProps {
  data: ResumeData;
  colorScheme: ColorScheme;
}

const ElegantRule = ({ colorScheme }: { colorScheme: ColorScheme }) => (
  <div className="flex items-center gap-3 my-5">
    <div className="flex-1 h-px" style={{ backgroundColor: hexToRgba(colorScheme.secondary, 0.15) }} />
    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: colorScheme.primary }} />
    <div className="flex-1 h-px" style={{ backgroundColor: hexToRgba(colorScheme.secondary, 0.15) }} />
  </div>
);

const ElegantSection = ({
  title,
  children,
  colorScheme,
}: {
  title: string;
  children: React.ReactNode;
  colorScheme: ColorScheme;
}) => (
  <div className="mb-1">
    <h2
      className="text-[10px] font-medium uppercase tracking-[0.25em] text-center mb-3"
      style={{ color: colorScheme.primary, fontFamily: TEMPLATE_FONT_FAMILIES.elegant.heading }}
    >
      {title}
    </h2>
    {children}
  </div>
);

const ElegantTemplate: React.FC<ElegantTemplateProps> = ({ data, colorScheme }) => {
  const { personalInfo, education, experience, skills, certifications, projects } = data;
  const fonts = TEMPLATE_FONT_FAMILIES.elegant;

  return (
    <ResumeDocument style={resumeStyle(colorScheme, fonts)} className="px-12 py-10">
      <header className="text-center mb-2">
        <h1
          className="text-[22px] font-normal tracking-[0.06em] mb-2"
          style={{ fontFamily: fonts.heading, color: colorScheme.secondary }}
        >
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="w-12 h-px mx-auto mb-2" style={{ backgroundColor: colorScheme.primary }} />
        <p className="text-[10px] tracking-[0.15em] uppercase mb-3" style={{ color: colorScheme.primary }}>
          {personalInfo.title}
        </p>
        <ContactRow personalInfo={personalInfo} colorScheme={colorScheme} />
      </header>

      <ElegantRule colorScheme={colorScheme} />

      <ElegantSection title="Profile" colorScheme={colorScheme}>
        <SummaryBlock summary={personalInfo.summary} colorScheme={colorScheme} variant="quote" />
      </ElegantSection>

      <ElegantRule colorScheme={colorScheme} />

      <ElegantSection title="Experience" colorScheme={colorScheme}>
        <ExperienceList experience={experience} colorScheme={colorScheme} />
      </ElegantSection>

      <ElegantRule colorScheme={colorScheme} />

      <ElegantSection title="Education" colorScheme={colorScheme}>
        <EducationList education={education} colorScheme={colorScheme} />
      </ElegantSection>

      <ElegantRule colorScheme={colorScheme} />

      <ElegantSection title="Expertise" colorScheme={colorScheme}>
        <div className="flex justify-center">
          <SkillPills skills={skills} colorScheme={colorScheme} />
        </div>
      </ElegantSection>

      {projects.length > 0 && (
        <>
          <ElegantRule colorScheme={colorScheme} />
          <ElegantSection title="Projects" colorScheme={colorScheme}>
            <ProjectList projects={projects} colorScheme={colorScheme} />
          </ElegantSection>
        </>
      )}

      {certifications.length > 0 && (
        <>
          <ElegantRule colorScheme={colorScheme} />
          <ElegantSection title="Certifications" colorScheme={colorScheme}>
            <CertificationList certifications={certifications} colorScheme={colorScheme} variant="compact" />
          </ElegantSection>
        </>
      )}
    </ResumeDocument>
  );
};

export default ElegantTemplate;
