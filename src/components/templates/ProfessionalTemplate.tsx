
import React from "react";
import { ResumeData } from "@/lib/types";
import { TEMPLATE_FONTS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

interface ProfessionalTemplateProps {
  data: ResumeData;
}

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ data }) => {
  const { personalInfo, education, experience, skills, certifications, projects } = data;
  const { heading, body } = TEMPLATE_FONTS.professional;

  return (
    <div className="bg-white text-black h-full">
      {/* Header */}
      <div className="bg-[#222222] text-white p-8">
        <h1 className="text-3xl font-bold mb-1 text-center">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-lg text-[#007BFF] text-center mb-4">{personalInfo.title}</p>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center space-x-1">
            <span className="text-[#007BFF]">Email:</span>
            <span>{personalInfo.email}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-[#007BFF]">Phone:</span>
            <span>{personalInfo.phone}</span>
          </div>
          {personalInfo.linkedin && (
            <div className="flex items-center space-x-1">
              <span className="text-[#007BFF]">LinkedIn:</span>
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center space-x-1">
              <span className="text-[#007BFF]">GitHub:</span>
              <span>{personalInfo.github}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Summary */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-[#007BFF] border-b-2 border-[#007BFF] pb-2">
            Professional Summary
          </h2>
          <p>{personalInfo.summary}</p>
        </div>

        {/* Experience */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-[#007BFF] border-b-2 border-[#007BFF] pb-2">
            Professional Experience
          </h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between mb-1">
                  <h3 className="font-bold text-lg">{exp.position}</h3>
                  <p className="text-sm">
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </p>
                </div>
                <div className="flex justify-between mb-2">
                  <h4 className="italic">{exp.company}</h4>
                  {exp.location && <p className="text-sm">{exp.location}</p>}
                </div>
                <p className="mb-2">{exp.description}</p>
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="list-disc pl-6 space-y-1">
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
          <h2 className="text-xl font-bold mb-3 text-[#007BFF] border-b-2 border-[#007BFF] pb-2">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <h3 className="font-bold">{edu.institution}</h3>
                  <p>{edu.degree} in {edu.field}</p>
                  {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
                </div>
                <div className="text-right">
                  <p className="text-sm">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                  {edu.location && <p className="text-sm">{edu.location}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Skills */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 text-[#007BFF] border-b-2 border-[#007BFF] pb-2">
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#007BFF] rounded-full"></div>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3 text-[#007BFF] border-b-2 border-[#007BFF] pb-2">
                Certifications
              </h2>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <h3 className="font-bold">{cert.name}</h3>
                    <p className="text-sm">
                      {cert.issuer} | {formatDate(cert.date)}
                    </p>
                    {cert.credentialID && (
                      <p className="text-sm">ID: {cert.credentialID}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-3 text-[#007BFF] border-b-2 border-[#007BFF] pb-2">
              Projects
            </h2>
            <div className="space-y-4">
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
                  <p className="mb-1">{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      <span className="text-sm font-semibold">Technologies: </span>
                      <span className="text-sm">{project.technologies.join(", ")}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
