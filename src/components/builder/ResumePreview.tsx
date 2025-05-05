
import React, { useRef } from "react";
import { useResume } from "@/contexts/ResumeContext";
import ModernTemplate from "@/components/templates/ModernTemplate";
import ProfessionalTemplate from "@/components/templates/ProfessionalTemplate";
import MinimalTemplate from "@/components/templates/MinimalTemplate";
import CreativeTemplate from "@/components/templates/CreativeTemplate";
import ExecutiveTemplate from "@/components/templates/ExecutiveTemplate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useToast } from "@/hooks/use-toast";

const ResumePreview = () => {
  const { resumeData, selectedTemplate, colorScheme } = useResume();
  const { toast } = useToast();
  const resumeRef = useRef<HTMLDivElement>(null);
  
  // Function to render the selected template
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "modern":
        return <ModernTemplate data={resumeData} colorScheme={colorScheme} />;
      case "professional":
        return <ProfessionalTemplate data={resumeData} colorScheme={colorScheme} />;
      case "minimal":
        return <MinimalTemplate data={resumeData} colorScheme={colorScheme} />;
      case "creative":
        return <CreativeTemplate data={resumeData} colorScheme={colorScheme} />;
      case "executive":
        return <ExecutiveTemplate data={resumeData} colorScheme={colorScheme} />;
      default:
        return <ModernTemplate data={resumeData} colorScheme={colorScheme} />;
    }
  };

  // Function to download the resume as PDF
  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;
    
    toast({
      title: "Generating PDF",
      description: "Your resume is being prepared for download...",
    });
    
    try {
      // Set a timeout to allow the toast to be displayed
      setTimeout(async () => {
        const element = resumeRef.current;
        if (!element) return;
        
        const canvas = await html2canvas(element, {
          scale: 2, // Higher quality
          useCORS: true,
          logging: false,
          backgroundColor: colorScheme.background,
        });
        
        const imgData = canvas.toDataURL('image/png');
        
        // A4 size: 210 x 297 mm
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        
        const fileName = `${resumeData.personalInfo.firstName}-${resumeData.personalInfo.lastName}-Resume.pdf`;
        pdf.save(fileName);
        
        toast({
          title: "PDF Generated Successfully",
          description: `Your resume has been downloaded as ${fileName}`,
        });
      }, 500);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error Generating PDF",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="bg-white rounded-md shadow-lg overflow-hidden">
      <div 
        ref={resumeRef} 
        className="aspect-[8.5/11] w-full h-full max-h-[1000px] overflow-y-auto"
        style={{ backgroundColor: colorScheme.background }}
      >
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;
