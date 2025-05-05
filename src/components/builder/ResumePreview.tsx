
import React from "react";
import { useResume } from "@/contexts/ResumeContext";
import ModernTemplate from "@/components/templates/ModernTemplate";
import ProfessionalTemplate from "@/components/templates/ProfessionalTemplate";
import MinimalTemplate from "@/components/templates/MinimalTemplate";
import CreativeTemplate from "@/components/templates/CreativeTemplate";
import ExecutiveTemplate from "@/components/templates/ExecutiveTemplate";

const ResumePreview = () => {
  const { resumeData, selectedTemplate } = useResume();
  
  // Function to render the selected template
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "modern":
        return <ModernTemplate data={resumeData} />;
      case "professional":
        return <ProfessionalTemplate data={resumeData} />;
      case "minimal":
        return <MinimalTemplate data={resumeData} />;
      case "creative":
        return <CreativeTemplate data={resumeData} />;
      case "executive":
        return <ExecutiveTemplate data={resumeData} />;
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };
  
  return (
    <div className="bg-white text-black rounded-md shadow-lg overflow-hidden">
      <div className="aspect-[8.5/11] w-full h-full max-h-[1000px] overflow-y-auto">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;
