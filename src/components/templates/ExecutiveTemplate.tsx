
import React from "react";
import { ResumeData } from "@/lib/types";
import { TEMPLATE_FONTS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

interface ExecutiveTemplateProps {
  data: ResumeData;
}

const ExecutiveTemplate: React.FC<ExecutiveTemplateProps> = ({ data }) => {
  const { personalInfo, education, experience, skills, certifications, projects } = data;
  const { heading, body } = TEMPLATE_FONTS.executive;

  return (
    <div className="bg-white text-[#333] h-full">
      {/* Header */}
      <div className="bg-[#222222] text-white px-8 py-10 relative">
        <h1 className="text-4xl font-bold">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-xl text-[#007BFF] mt-1 mb-4">{personalInfo.title}</p>
        
        <div className="absolute right-8 bottom-4 text-right">
          <p className="mb-1">{personalInfo.email}</p>
          <p className="mb-1">{personalInfo.phone}</p>
          {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Summary with executive style */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-[#222222] uppercase tracking-wider border-b-2 border-[#007BFF] pb-2">
            Executive Summary
          </h2>
          <p className="leading-relaxed">{personalInfo.summary}</p>
        </div>
        
        {/* Professional Experience */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-[#222222] uppercase tracking-wider border-b-2 border-[#007BFF] pb-2">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between mb-1">
                  <h3 className="font-bold text-lg">{exp.position}</h3>
                  <p>
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </p>
                </div>
                <p className="text-[#007BFF] font-semibold mb-2">
                  {exp.company} {exp.location && `| ${exp.location}`}
                </p>
                <p className="mb-3">{exp.description}</p>
                {exp.achievements && exp.achievements.length > 0 && (
                  <div>
                    <p className="font-semibold">Key Achievements:</p>
                    <ul className="list-disc pl-8 space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Education */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-[#222222] uppercase tracking-wider border-b-2 border-[#007BFF] pb-2">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold">{edu.institution}</h3>
                  <p className="text-[#007BFF]">{edu.degree}, {edu.field}</p>
                  <p className="text-sm">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                  {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-[#222222] uppercase tracking-wider border-b-2 border-[#007BFF] pb-2">
              Areas of Expertise
            </h2>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-[#007BFF] mr-2"></div>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Projects */}
          {projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4 text-[#222222] uppercase tracking-wider border-b-2 border-[#007BFF] pb-2">
                Strategic Projects
              </h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="border-l-4 border-[#007BFF] pl-4">
                    <h3 className="font-bold">{project.name}</h3>
                    <p className="mb-1">{project.description}</p>
                    {project.technologies && project.technologies.length > 0 && (
                      <p className="text-sm italic">
                        Technologies: {project.technologies.join(", ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-[#222222] uppercase tracking-wider border-b-2 border-[#007BFF] pb-2">
                Professional Certifications
              </h2>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <h3 className="font-bold">{cert.name}</h3>
                    <p>
                      {cert.issuer} | {formatDate(cert.date)}
                    </p>
                    {cert.credentialID && <p className="text-sm">ID: {cert.credentialID}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExecutiveTemplate;
