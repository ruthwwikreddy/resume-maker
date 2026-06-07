
import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useResume } from "@/contexts/ResumeContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import PageShell from "@/components/PageShell";
import { FounderStrip, FoundedBy } from "@/components/FounderCredit";
import ResumeForm from "@/components/builder/ResumeForm";
import ResumePreview from "@/components/builder/ResumePreview";
import ResumeExportSource from "@/components/builder/ResumeExportSource";
import TemplateSelector from "@/components/builder/TemplateSelector";
import { parseTemplateName } from "@/lib/templates";
import { exportResumeToPdf, buildResumeFileName } from "@/lib/exportPdf";
import { DownloadIcon, EyeIcon, PenIcon, RotateCcw, Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Builder = () => {
  const { resumeData, colorScheme, setSelectedTemplate, resetAll, isHydrated } = useResume();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("edit");
  const [isExporting, setIsExporting] = useState(false);
  const isMobile = useIsMobile();

  const handleDownload = useCallback(async () => {
    if (isExporting) return;

    setIsExporting(true);

    toast.info("Generating PDF", {
      description: "Your resume is being prepared for download",
    });

    try {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

      await exportResumeToPdf({
        fileName: buildResumeFileName(
          resumeData.personalInfo.firstName,
          resumeData.personalInfo.lastName
        ),
        backgroundColor: colorScheme.background,
      });

      toast.success("Resume downloaded", {
        description: "Your PDF is ready",
      });
    } catch (error) {
      toast.error("Download failed", {
        description: error instanceof Error ? error.message : "Please try again",
      });
    } finally {
      setIsExporting(false);
    }
  }, [isExporting, resumeData.personalInfo, colorScheme.background]);

  const handleReset = () => {
    if (window.confirm("Reset all resume data, template, and colors to defaults?")) {
      resetAll();
      toast.success("Resume reset", { description: "Starting fresh with default content" });
    }
  };

  useEffect(() => {
    document.title = "Resume Builder | ResumeGen";
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    const templateParam = parseTemplateName(searchParams.get("template"));
    if (templateParam) {
      setSelectedTemplate(templateParam);
    }
  }, [searchParams, setSelectedTemplate, isHydrated]);

  if (!isHydrated) {
    return (
      <PageShell>
        <main className="flex-grow flex items-center justify-center pt-32 pb-20">
          <div className="flex flex-col items-center gap-3 text-foreground/50">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="text-sm">Loading your resume…</p>
          </div>
        </main>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <ResumeExportSource />
      <main className="flex-grow flex flex-col pt-24 md:pt-28 min-h-0">
        <div className="px-4 pb-4 shrink-0">
          <div className="container mx-auto max-w-7xl">
            <div className="glass-strong rounded-2xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <p className="section-label mb-1">Builder</p>
                <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
                  Build Your Resume
                </h1>
                <FoundedBy className="mt-1 text-[11px]" />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <button
                  type="button"
                  className="btn-glass px-4 py-2.5"
                  onClick={handleReset}
                  title="Reset to defaults"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
                <button
                  type="button"
                  className="btn-primary px-5 py-2.5 flex-1 md:flex-none disabled:opacity-50"
                  onClick={handleDownload}
                  disabled={isExporting}
                >
                  {isExporting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <DownloadIcon className="h-4 w-4" />
                  )}
                  {isExporting ? "Exporting…" : "Download PDF"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {isMobile ? (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow flex flex-col min-h-0">
            <div className="px-4 pb-4 shrink-0">
              <div className="container mx-auto max-w-7xl">
                <TabsList className="builder-tabs-list grid w-full grid-cols-2 rounded-xl p-1 h-11">
                  <TabsTrigger
                    value="edit"
                    className="builder-tab-active rounded-lg data-[state=inactive]:text-foreground/50"
                  >
                    <PenIcon className="mr-2 h-4 w-4" />
                    Edit
                  </TabsTrigger>
                  <TabsTrigger
                    value="preview"
                    className="builder-tab-active rounded-lg data-[state=inactive]:text-foreground/50"
                  >
                    <EyeIcon className="mr-2 h-4 w-4" />
                    Preview
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <div className="flex-grow container mx-auto max-w-7xl px-4 pb-8 overflow-y-auto">
              <TabsContent value="edit" className="mt-0 space-y-4">
                <div className="glass-card rounded-2xl p-5 md:p-6">
                  <TemplateSelector />
                </div>
                <div className="glass-card rounded-2xl p-5 md:p-6">
                  <ResumeForm />
                </div>
              </TabsContent>

              <TabsContent value="preview" className="mt-0 h-full">
                <div className="glass-strong rounded-2xl overflow-hidden border border-foreground/[0.06] h-[calc(100vh-14rem)] min-h-[480px]">
                  <ResumePreview className="h-full" />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        ) : (
          <div className="flex-grow flex container mx-auto max-w-7xl px-4 pb-8 gap-4 min-h-0 overflow-hidden">
            <div className="w-1/2 overflow-y-auto pr-1">
              <div className="glass-card rounded-2xl p-6 mb-4">
                <TemplateSelector />
              </div>
              <div className="glass-card rounded-2xl p-6">
                <ResumeForm />
              </div>
            </div>

            <div className="w-1/2 flex flex-col min-h-0 pl-1">
              <div className="sticky top-24 z-10 flex flex-col h-[calc(100vh-7.5rem)] glass-strong rounded-2xl overflow-hidden border border-foreground/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
                <ResumePreview className="flex-1 min-h-0" />
              </div>
            </div>
          </div>
        )}
      </main>
      <FounderStrip />
    </PageShell>
  );
};

export default Builder;
