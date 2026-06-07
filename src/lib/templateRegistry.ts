import type React from "react";
import ModernTemplate from "@/components/templates/ModernTemplate";
import ProfessionalTemplate from "@/components/templates/ProfessionalTemplate";
import MinimalTemplate from "@/components/templates/MinimalTemplate";
import CreativeTemplate from "@/components/templates/CreativeTemplate";
import ExecutiveTemplate from "@/components/templates/ExecutiveTemplate";
import ClassicTemplate from "@/components/templates/ClassicTemplate";
import CompactTemplate from "@/components/templates/CompactTemplate";
import ElegantTemplate from "@/components/templates/ElegantTemplate";
import AcademicTemplate from "@/components/templates/AcademicTemplate";
import TechTemplate from "@/components/templates/TechTemplate";
import type { ColorScheme } from "@/contexts/ResumeContext";
import type { ResumeData, TemplateName } from "@/lib/types";

export type TemplateComponent = React.FC<{ data: ResumeData; colorScheme: ColorScheme }>;

export const TEMPLATE_MAP: Record<TemplateName, TemplateComponent> = {
  minimal: MinimalTemplate,
  classic: ClassicTemplate,
  professional: ProfessionalTemplate,
  modern: ModernTemplate,
  executive: ExecutiveTemplate,
  elegant: ElegantTemplate,
  compact: CompactTemplate,
  academic: AcademicTemplate,
  tech: TechTemplate,
  creative: CreativeTemplate,
};

export function getTemplateComponent(name: TemplateName): TemplateComponent {
  return TEMPLATE_MAP[name] ?? MinimalTemplate;
}
