
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
  SkillBars,
  EducationList,
  ExperienceList,
  ProjectList,
  CertificationList,
} from "./shared/resume-primitives";

interface CreativeTemplateProps {
  data: ResumeData;
  colorScheme: ColorScheme;
}

const lightScheme = (colorScheme: ColorScheme): ColorScheme => ({
  ...colorScheme,
  text: "#ffffff",
  secondary: "#ffffff",
});

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ data, colorScheme }) => {
  const { personalInfo, education, experience, skills, certifications, projects } = data;
  const fonts = TEMPLATE_FONT_FAMILIES.creative;
  const onDark = lightScheme(colorScheme);

  return (
    <ResumeDocument style={{ ...resumeStyle(colorScheme, fonts), backgroundColor: colorScheme.secondary, color: "#ffffff" }}>
      <header className="relative px-8 pt-8 pb-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background: `linear-gradient(135deg, ${colorScheme.primary} 0%, ${hexToRgba(colorScheme.primary, 0.7)} 50%, transparent 100%)`,
          }}
        />
        <div className="relative z-10">
          <h1
            className="text-[26px] font-bold leading-tight mb-1"
            style={{ fontFamily: fonts.heading }}
          >
            {personalInfo.firstName}{" "}
            <span className="opacity-80">{personalInfo.lastName}</span>
          </h1>
          <p className="text-[12px] font-medium mb-3 opacity-90">{personalInfo.title}</p>
          <ContactRow personalInfo={personalInfo} colorScheme={colorScheme} light />
        </div>
      </header>

      <div className="grid grid-cols-[1fr_1.6fr] gap-6 px-8 pb-8">
        <div className="space-y-6">
          <div>
            <SectionTitle colorScheme={colorScheme} variant="caps">About</SectionTitle>
            <p className="text-[10px] leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
              {personalInfo.summary}
            </p>
          </div>

          <div>
            <SectionTitle colorScheme={colorScheme} variant="caps">Education</SectionTitle>
            <EducationList education={education} colorScheme={colorScheme} light variant="compact" />
          </div>

          <div>
            <SectionTitle colorScheme={colorScheme} variant="caps">Skills</SectionTitle>
            <SkillBars skills={skills} colorScheme={colorScheme} light />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <SectionTitle colorScheme={colorScheme} variant="caps">Experience</SectionTitle>
            <ExperienceList experience={experience} colorScheme={onDark} variant="timeline" />
          </div>

          {projects.length > 0 && (
            <div>
              <SectionTitle colorScheme={colorScheme} variant="caps">Projects</SectionTitle>
              <ProjectList projects={projects} colorScheme={onDark} variant="card" />
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              <SectionTitle colorScheme={colorScheme} variant="caps">Certifications</SectionTitle>
              <CertificationList certifications={certifications} colorScheme={onDark} variant="grid" />
            </div>
          )}
        </div>
      </div>
    </ResumeDocument>
  );
};

export default CreativeTemplate;
