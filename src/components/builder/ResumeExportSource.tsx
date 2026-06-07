import { createPortal } from "react-dom";
import { useResume } from "@/contexts/ResumeContext";
import { getTemplateComponent } from "@/lib/templateRegistry";
import { RESUME_EXPORT_SOURCE_ID } from "@/lib/pageFormat";

/** Always-mounted hidden resume — single source of truth for PDF export and preview capture. */
const ResumeExportSource = () => {
  const { resumeData, selectedTemplate, colorScheme } = useResume();
  const Template = getTemplateComponent(selectedTemplate);

  return createPortal(
    <div id={RESUME_EXPORT_SOURCE_ID} aria-hidden className="resume-export-source">
      <Template data={resumeData} colorScheme={colorScheme} />
    </div>,
    document.body
  );
};

export default ResumeExportSource;
