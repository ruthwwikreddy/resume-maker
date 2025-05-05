
import React from "react";
import { useResume } from "@/contexts/ResumeContext";
import { Card } from "@/components/ui/card";
import { TEMPLATES } from "@/lib/constants";
import { TemplateName } from "@/lib/types";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Check } from "lucide-react";

const TemplateSelector = () => {
  const { selectedTemplate, setSelectedTemplate } = useResume();
  
  const handleTemplateSelect = (templateId: TemplateName) => {
    setSelectedTemplate(templateId);
  };
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Choose a Template</h2>
      
      <Carousel className="w-full">
        <CarouselContent>
          {TEMPLATES.map((template) => (
            <CarouselItem key={template.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
              <Card
                className={`template-card overflow-hidden ${
                  selectedTemplate === template.id ? "active" : ""
                }`}
                onClick={() => handleTemplateSelect(template.id as TemplateName)}
              >
                <div className="relative aspect-[3/4] bg-card">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    {/* Image placeholder - in a real app, this would be the template preview */}
                    <div className="text-center">
                      <div className="w-16 h-24 mx-auto border-2 border-dashed border-gray-600 mb-2 flex items-center justify-center">
                        {template.id.charAt(0).toUpperCase()}
                      </div>
                      <div className="font-medium">{template.name}</div>
                    </div>
                  </div>
                  
                  {selectedTemplate === template.id && (
                    <div className="absolute top-2 right-2 bg-resume-blue rounded-full p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-1" />
        <CarouselNext className="right-1" />
      </Carousel>
    </div>
  );
};

export default TemplateSelector;
