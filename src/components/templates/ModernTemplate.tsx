
import React from "react";
import { ResumeData } from "@/lib/types";
import { TEMPLATE_FONTS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

interface ModernTemplateProps {
  data: ResumeData;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
  const { personalInfo, education, experience, skills, certifications, projects } = data;
  const { heading, body } = TEMPLATE_FONTS.modern;

  return (
    <div className="flex h-full text-black">
      {/* Sidebar */}
      <div className="w-1/3 bg-[#222222] text-white p-8 flex flex-col">
        {/* Profile */}
        <div className="mb-8 text-center">
          <div className="w-28 h-28 rounded-full bg-[#007BFF] mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
            {personalInfo.firstName.charAt(0)}
            {personalInfo.lastName.charAt(0)}
          </div>
          <h2 className="text-xl font-bold mb-1">
            {personalInfo.firstName} {personalInfo.lastName}
          </h2>
          <p className="text-[#007BFF]">{personalInfo.title}</p>
        </div>

        {/* Contact Info */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold border-b border-[#007BFF] pb-2 mb-3">Contact</h3>
          <ul className="space-y-2">
            <li className="flex flex-col">
              <span className="text-[#007BFF] text-sm">Email</span>
              <span className="text-sm">{personalInfo.email}</span>
            </li>
            <li className="flex flex-col">
              <span className="text-[#007BFF] text-sm">Phone</span>
              <span className="text-sm">{personalInfo.phone}</span>
            </li>
            {personalInfo.linkedin && (
              <li className="flex flex-col">
                <span className="text-[#007BFF] text-sm">LinkedIn</span>
                <span className="text-sm">{personalInfo.linkedin}</span>
              </li>
            )}
            {personalInfo.github && (
              <li className="flex flex-col">
                <span className="text-[#007BFF] text-sm">GitHub</span>
                <span className="text-sm">{personalInfo.github}</span>
              </li>
            )}
            {personalInfo.website && (
              <li className="flex flex-col">
                <span className="text-[#007BFF] text-sm">Website</span>
                <span className="text-sm">{personalInfo.website}</span>
              </li>
            )}
          </ul>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold border-b border-[#007BFF] pb-2 mb-3">Skills</h3>
          <div className="space-y-3">
            {skills.map((skill) => (
              <div key={skill.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{skill.name}</span>
                  {skill.category && <span className="text-gray-400">{skill.category}</span>}
                </div>
                <div className="w-full bg-gray-700 rounded h-1.5">
                  <div 
                    className="bg-[#007BFF] h-1.5 rounded" 
                    style={{ width: `${skill.level || 0}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education - In sidebar for Modern template */}
        <div>
          <h3 className="text-lg font-semibold border-b border-[#007BFF] pb-2 mb-3">Education</h3>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <h4 className="font-semibold">{edu.institution}</h4>
                <p className="text-[#007BFF]">{edu.degree}, {edu.field}</p>
                <p className="text-sm text-gray-400">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </p>
                {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8">
        {/* Summary */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6 text-[#222222]">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <h2 className="text-xl font-bold mb-4 text-[#007BFF]">Professional Summary</h2>
          <p>{personalInfo.summary}</p>
        </div>

        {/* Experience */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 border-b-2 border-[#007BFF] pb-2">Work Experience</h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{exp.position}</h3>
                    <h4 className="text-[#007BFF]">{exp.company}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </p>
                    {exp.location && <p className="text-sm text-gray-500">{exp.location}</p>}
                  </div>
                </div>
                <p className="mt-2">{exp.description}</p>
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="text-sm">{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 border-b-2 border-[#007BFF] pb-2">Projects</h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold">{project.name}</h3>
                    {project.startDate && (
                      <p className="text-sm">
                        {formatDate(project.startDate)}
                        {project.endDate ? ` - ${formatDate(project.endDate)}` : ""}
                      </p>
                    )}
                  </div>
                  <p className="mt-1">{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-gray-100 rounded-md">
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
            <h2 className="text-xl font-bold mb-4 border-b-2 border-[#007BFF] pb-2">
              Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="border border-gray-200 rounded-md p-3">
                  <h3 className="font-bold">{cert.name}</h3>
                  <p className="text-[#007BFF]">{cert.issuer}</p>
                  <p className="text-sm">Issued {formatDate(cert.date)}</p>
                  {cert.credentialID && (
                    <p className="text-sm text-gray-500">ID: {cert.credentialID}</p>
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

export default ModernTemplate;
