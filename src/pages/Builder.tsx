
import React, { useState, useEffect } from "react";
import { useResume } from "@/contexts/ResumeContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import ResumeForm from "@/components/builder/ResumeForm";
import ResumePreview from "@/components/builder/ResumePreview";
import TemplateSelector from "@/components/builder/TemplateSelector";
import { DownloadIcon, EyeIcon, PenIcon, LayoutIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Builder = () => {
  const { resumeData, selectedTemplate } = useResume();
  const [activeTab, setActiveTab] = useState("edit");
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleDownload = async () => {
    // This is a placeholder for PDF generation functionality
    toast({
      title: "Generating PDF",
      description: "Your resume is being prepared for download",
      duration: 2000,
    });
    
    // In a real implementation, we would generate the PDF here
    setTimeout(() => {
      toast({
        title: "Resume Downloaded",
        description: "Your resume has been successfully downloaded",
        duration: 3000,
      });
    }, 2000);
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
              <ResumePreview />
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
              <div className="sticky top-0">
                <ResumePreview />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Builder;
