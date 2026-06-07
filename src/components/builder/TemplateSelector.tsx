
import React from "react";
import { useResume } from "@/contexts/ResumeContext";
import { TEMPLATES } from "@/lib/constants";
import { TemplateName } from "@/lib/types";
import TemplateThumbnail from "@/components/templates/shared/TemplateThumbnail";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Check } from "lucide-react";

const TemplateSelector = () => {
  const { selectedTemplate, setSelectedTemplate } = useResume();

  const handleTemplateSelect = (templateId: TemplateName) => {
    setSelectedTemplate(templateId);
  };

  return (
    <div>
      <p className="section-label mb-2">Template</p>
      <h2 className="text-lg font-semibold text-foreground tracking-tight mb-1">
        Choose a Template
      </h2>
      <p className="text-sm text-foreground/40 mb-4">
        Start with <span className="text-foreground/60">Minimal</span> for a clean professional base —{" "}
        {TEMPLATES.length} layouts available
      </p>

      <Carousel className="w-full">
        <CarouselContent className="-ml-3">
          {TEMPLATES.map((template) => (
            <CarouselItem key={template.id} className="pl-3 basis-[45%] sm:basis-[38%] md:basis-[30%] lg:basis-[22%]">
              <div
                className={`template-card no-hover overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedTemplate === template.id ? "active ring-2 ring-foreground/30" : ""
                }`}
                onClick={() => handleTemplateSelect(template.id as TemplateName)}
              >
                <div className="relative p-3">
                  <TemplateThumbnail templateId={template.id as TemplateName} size="md" />

                  <div className="mt-2.5">
                    <p className="text-[10px] uppercase tracking-wider text-foreground/35">{template.tag}</p>
                    <p className="text-sm font-medium text-foreground/80">{template.name}</p>
                  </div>

                  {selectedTemplate === template.id && (
                    <div className="absolute top-5 right-5 bg-foreground rounded-full p-1 shadow-lg">
                      <Check className="h-3.5 w-3.5 text-background" />
                    </div>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 glass border-foreground/10 text-foreground hover:bg-foreground/10" />
        <CarouselNext className="right-0 glass border-foreground/10 text-foreground hover:bg-foreground/10" />
      </Carousel>
    </div>
  );
};

export default TemplateSelector;
