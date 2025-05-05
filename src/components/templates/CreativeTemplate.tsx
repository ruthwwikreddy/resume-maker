
import React from "react";
import { ResumeData } from "@/lib/types";
import { TEMPLATE_FONTS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { ColorScheme } from "@/contexts/ResumeContext";

interface CreativeTemplateProps {
  data: ResumeData;
  colorScheme: ColorScheme;
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ data, colorScheme }) => {
  const { personalInfo, education, experience, skills, certifications, projects } = data;
  const { heading, body } = TEMPLATE_FONTS.creative;

  return (
    <div className="h-full p-8" style={{ backgroundColor: colorScheme.secondary, color: "#ffffff" }}>
      {/* Header with accent diagonal */}
      <div className="relative mb-10">
        <div 
          className="absolute transform -rotate-3 z-0"
          style={{ 
            width: "120%", 
            left: "-10%", 
            top: "-20%", 
            height: "140%",
            backgroundColor: colorScheme.primary 
          }}
        ></div>
        
        <div className="relative z-10 p-6">
          <h1 className="text-4xl font-bold mb-1">
            {personalInfo.firstName} <span style={{ color: colorScheme.secondary }}>{personalInfo.lastName}</span>
          </h1>
          <p className="text-xl mb-4" style={{ color: colorScheme.secondary }}>{personalInfo.title}</p>
          <div className="flex flex-wrap gap-4 text-sm" style={{ color: colorScheme.secondary }}>
            <span>{personalInfo.email}</span>
            <span>{personalInfo.phone}</span>
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left column */}
        <div className="col-span-1 space-y-8">
          {/* Summary */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3" style={{ color: colorScheme.primary }}>About Me</h2>
            <p className="text-gray-300">{personalInfo.summary}</p>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3" style={{ color: colorScheme.primary }}>Education</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold">{edu.institution}</h3>
                  <p className="text-sm" style={{ color: colorScheme.primary }}>{edu.degree}</p>
                  <p className="text-sm">{edu.field}</p>
                  <p className="text-xs text-gray-400">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills with creative bars */}
          <div>
            <h2 className="text-lg font-bold mb-3" style={{ color: colorScheme.primary }}>Skills</h2>
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between mb-1">
                    <span>{skill.name}</span>
                    {skill.category && <span className="text-xs text-gray-400">{skill.category}</span>}
                  </div>
                  <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full" 
                      style={{ 
                        width: `${skill.level || 0}%`,
                        clipPath: "polygon(0 0, 100% 0, 95% 100%, 0% 100%)",
                        backgroundColor: colorScheme.primary
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="col-span-2 space-y-8">
          {/* Experience with creative timeline */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-5" style={{ color: colorScheme.primary }}>Experience</h2>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div key={exp.id} className="relative">
                  {/* Timeline dot and line */}
                  {index < experience.length - 1 && (
                    <div className="absolute left-3 top-3 bottom-0 w-0.5" style={{ height: "calc(100% + 2rem)", backgroundColor: colorScheme.primary }}></div>
                  )}
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full flex items-center justify-center z-10" style={{ backgroundColor: colorScheme.primary }}>
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  
                  <div className="ml-12">
                    <div className="flex justify-between mb-1">
                      <h3 className="font-bold text-lg">{exp.position}</h3>
                      <p className="text-sm text-gray-400">
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </p>
                    </div>
                    <p className="mb-2" style={{ color: colorScheme.primary }}>{exp.company} {exp.location && `• ${exp.location}`}</p>
                    <p className="text-sm mb-2 text-gray-300">{exp.description}</p>
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="list-disc pl-6 space-y-1 text-sm text-gray-300">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects with creative cards */}
          {projects.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4" style={{ color: colorScheme.primary }}>Projects</h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="bg-gray-800 p-4 rounded-lg border-l-4" style={{ borderColor: colorScheme.primary }}>
                    <div className="flex justify-between mb-2">
                      <h3 className="font-bold">{project.name}</h3>
                      {project.startDate && (
                        <p className="text-xs text-gray-400">
                          {formatDate(project.startDate)}
                          {project.endDate ? ` - ${formatDate(project.endDate)}` : ""}
                        </p>
                      )}
                    </div>
                    <p className="text-sm mb-3 text-gray-300">{project.description}</p>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded-md" 
                                style={{ backgroundColor: `${colorScheme.primary}20`, color: colorScheme.primary }}>
                            {tech}
                          </span>
                        ))}
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
              <h2 className="text-lg font-bold mb-4" style={{ color: colorScheme.primary }}>Certifications</h2>
              <div className="grid grid-cols-2 gap-4">
                {certifications.map((cert) => (
                  <div key={cert.id} className="bg-gray-800 p-3 rounded-lg">
                    <h3 className="font-bold">{cert.name}</h3>
                    <p className="text-sm" style={{ color: colorScheme.primary }}>{cert.issuer}</p>
                    <p className="text-xs text-gray-400">Issued {formatDate(cert.date)}</p>
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

export default CreativeTemplate;
