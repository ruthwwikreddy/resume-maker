
import React, { useState, useEffect } from "react";
import { useResume } from "@/contexts/ResumeContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import ResumeForm from "@/components/builder/ResumeForm";
import ResumePreview from "@/components/builder/ResumePreview";
import TemplateSelector from "@/components/builder/TemplateSelector";
import { DownloadIcon, EyeIcon, PenIcon, LayoutIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Builder = () => {
  const { resumeData, selectedTemplate } = useResume();
  const [activeTab, setActiveTab] = useState("edit");
  const isMobile = useIsMobile();
  const resumePreviewRef = React.useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    toast.info("Generating PDF", {
      description: "Your resume is being prepared for download",
      duration: 2000,
    });
    
    try {
      setTimeout(async () => {
        const resumeElement = document.querySelector(".resume-preview-content");
        if (!resumeElement) {
          throw new Error("Resume element not found");
        }
        
        const canvas = await html2canvas(resumeElement as HTMLElement, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
        });
        
        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        
        const fileName = `${resumeData.personalInfo.firstName}-${resumeData.personalInfo.lastName}-Resume.pdf`;
        pdf.save(fileName);
        
        toast.success("Resume Downloaded", {
          description: "Your resume has been successfully downloaded",
          duration: 3000,
        });
      }, 1000);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Download Failed", {
        description: "There was a problem generating your resume PDF",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    document.title = "Resume Builder | ResumeGen";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow flex flex-col">
        {/* Builder Header */}
        <div className="bg-card border-b border-border p-4">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">Build Your Resume</h1>
            
            <div className="flex items-center gap-2">
              {/* Mobile Tabs */}
              {isMobile && (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:hidden">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="edit" className="data-[state=active]:bg-resume-blue data-[state=active]:text-white">
                      <PenIcon className="mr-2 h-4 w-4" />
                      Edit
                    </TabsTrigger>
                    <TabsTrigger value="preview" className="data-[state=active]:bg-resume-blue data-[state=active]:text-white">
                      <EyeIcon className="mr-2 h-4 w-4" />
                      Preview
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              )}
              
              {/* Download Button */}
              <Button 
                className="bg-resume-blue hover:bg-resume-blue/90 text-white gap-2"
                onClick={handleDownload}
              >
                <DownloadIcon className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
        
        {isMobile ? (
          <div className="flex-grow container mx-auto p-4">
            <TabsContent value="edit" className={activeTab === "edit" ? "block" : "hidden"}>
              <div className="mb-6">
                <TemplateSelector />
              </div>
              <ResumeForm />
            </TabsContent>
            
            <TabsContent value="preview" className={activeTab === "preview" ? "block" : "hidden"}>
              <div ref={resumePreviewRef} className="resume-preview-wrapper">
                <div className="resume-preview-content">
                  <ResumePreview />
                </div>
              </div>
            </TabsContent>
          </div>
        ) : (
          <div className="flex-grow flex">
            {/* Left Side - Editor */}
            <div className="w-1/2 overflow-y-auto border-r border-border p-6">
              <div className="max-w-xl mx-auto">
                <div className="mb-6">
                  <TemplateSelector />
                </div>
                <ResumeForm />
              </div>
            </div>
            
            {/* Right Side - Preview */}
            <div className="w-1/2 overflow-y-auto bg-muted p-6">
              <div ref={resumePreviewRef} className="sticky top-0 resume-preview-wrapper">
                <div className="resume-preview-content">
                  <ResumePreview />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Builder;
