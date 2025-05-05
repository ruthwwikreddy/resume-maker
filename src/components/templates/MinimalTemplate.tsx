
import React from "react";
import { ResumeData } from "@/lib/types";
import { TEMPLATE_FONTS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { ColorScheme } from "@/contexts/ResumeContext";

interface MinimalTemplateProps {
  data: ResumeData;
  colorScheme: ColorScheme;
}

const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ data, colorScheme }) => {
  const { personalInfo, education, experience, skills, certifications, projects } = data;
  const { heading, body } = TEMPLATE_FONTS.minimal;

  return (
    <div className="h-full p-10" style={{ background: colorScheme.background, color: colorScheme.text }}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="mb-2" style={{ color: colorScheme.primary }}>{personalInfo.title}</p>
        <div className="flex flex-wrap justify-center gap-x-4 text-sm">
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <p className="pl-4 italic" style={{ borderLeftWidth: "4px", borderLeftColor: colorScheme.primary }}>
          {personalInfo.summary}
        </p>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 uppercase tracking-wider" style={{ color: colorScheme.primary }}>
          Experience
        </h2>
        <div className="space-y-4">
          {experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between mb-1">
                <h3 className="font-bold">{exp.position}</h3>
                <p className="text-sm">
                  {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                </p>
              </div>
              <p className="text-sm font-medium mb-1">{exp.company} {exp.location && `· ${exp.location}`}</p>
              <p className="text-sm mb-2">{exp.description}</p>
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 uppercase tracking-wider" style={{ color: colorScheme.primary }}>
          Education
        </h2>
        <div className="space-y-3">
          {education.map((edu) => (
            <div key={edu.id}>
              <div className="flex justify-between">
                <h3 className="font-bold">{edu.institution}</h3>
                <p className="text-sm">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </p>
              </div>
              <p className="text-sm">{edu.degree} in {edu.field}</p>
              {edu.gpa && <p className="text-xs">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 uppercase tracking-wider" style={{ color: colorScheme.primary }}>
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill.id}
              className="inline-block px-2 py-1 text-sm rounded-full"
              style={{ border: `1px solid ${colorScheme.primary}` }}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 uppercase tracking-wider" style={{ color: colorScheme.primary }}>
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between mb-1">
                  <h3 className="font-bold">{project.name}</h3>
                  {project.startDate && (
                    <p className="text-sm">
                      {formatDate(project.startDate)}
                      {project.endDate ? ` - ${formatDate(project.endDate)}` : ""}
                    </p>
                  )}
                </div>
                <p className="text-sm mb-1">{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 text-xs">
                    <span className="font-semibold">Technologies:</span>
                    <span>{project.technologies.join(", ")}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3 uppercase tracking-wider" style={{ color: colorScheme.primary }}>
            Certifications
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="font-semibold text-sm">{cert.name}</h3>
                <p className="text-xs">{cert.issuer} | {formatDate(cert.date)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;
