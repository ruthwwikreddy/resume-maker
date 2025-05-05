
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { User, Briefcase, GraduationCap, Award, Code, Folder } from "lucide-react";
import PersonalInfoForm from "./sections/PersonalInfoForm";
import EducationForm from "./sections/EducationForm";
import ExperienceForm from "./sections/ExperienceForm";
import SkillsForm from "./sections/SkillsForm";
import ProjectsForm from "./sections/ProjectsForm";
import CertificationsForm from "./sections/CertificationsForm";

const ResumeForm = () => {
  const [activeTab, setActiveTab] = useState("personalInfo");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="personalInfo" className="flex items-center gap-2 data-[state=active]:bg-resume-blue data-[state=active]:text-white">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">Personal</span>
          </TabsTrigger>
          
          <TabsTrigger value="experience" className="flex items-center gap-2 data-[state=active]:bg-resume-blue data-[state=active]:text-white">
            <Briefcase className="h-4 w-4" />
            <span className="hidden md:inline">Experience</span>
          </TabsTrigger>
          
          <TabsTrigger value="education" className="flex items-center gap-2 data-[state=active]:bg-resume-blue data-[state=active]:text-white">
            <GraduationCap className="h-4 w-4" />
            <span className="hidden md:inline">Education</span>
          </TabsTrigger>
          
          <TabsTrigger value="skills" className="flex items-center gap-2 data-[state=active]:bg-resume-blue data-[state=active]:text-white">
            <Code className="h-4 w-4" />
            <span className="hidden md:inline">Skills</span>
          </TabsTrigger>
          
          <TabsTrigger value="projects" className="flex items-center gap-2 data-[state=active]:bg-resume-blue data-[state=active]:text-white">
            <Folder className="h-4 w-4" />
            <span className="hidden md:inline">Projects</span>
          </TabsTrigger>
          
          <TabsTrigger value="certifications" className="flex items-center gap-2 data-[state=active]:bg-resume-blue data-[state=active]:text-white">
            <Award className="h-4 w-4" />
            <span className="hidden md:inline">Certs</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="personalInfo">
            <PersonalInfoForm />
          </TabsContent>
          
          <TabsContent value="experience">
            <ExperienceForm />
          </TabsContent>
          
          <TabsContent value="education">
            <EducationForm />
          </TabsContent>
          
          <TabsContent value="skills">
            <SkillsForm />
          </TabsContent>
          
          <TabsContent value="projects">
            <ProjectsForm />
          </TabsContent>
          
          <TabsContent value="certifications">
            <CertificationsForm />
          </TabsContent>
        </div>
      </Tabs>
      
      <Separator className="my-4" />
      
      <div className="flex justify-between">
        <button
          onClick={() => {
            const tabs = ["personalInfo", "experience", "education", "skills", "projects", "certifications"];
            const currentIndex = tabs.indexOf(activeTab);
            if (currentIndex > 0) {
              setActiveTab(tabs[currentIndex - 1]);
            }
          }}
          className="px-4 py-2 text-gray-400 hover:text-resume-blue transition-colors"
          disabled={activeTab === "personalInfo"}
        >
          Previous
        </button>
        
        <button
          onClick={() => {
            const tabs = ["personalInfo", "experience", "education", "skills", "projects", "certifications"];
            const currentIndex = tabs.indexOf(activeTab);
            if (currentIndex < tabs.length - 1) {
              setActiveTab(tabs[currentIndex + 1]);
            }
          }}
          className="px-4 py-2 text-resume-blue hover:text-resume-blue/80 transition-colors"
          disabled={activeTab === "certifications"}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ResumeForm;
