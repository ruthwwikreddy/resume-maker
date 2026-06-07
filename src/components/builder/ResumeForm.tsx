
import React, { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Folder,
  Palette,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import PersonalInfoForm from "./sections/PersonalInfoForm";
import EducationForm from "./sections/EducationForm";
import ExperienceForm from "./sections/ExperienceForm";
import SkillsForm from "./sections/SkillsForm";
import ProjectsForm from "./sections/ProjectsForm";
import CertificationsForm from "./sections/CertificationsForm";
import ColorPickerForm from "./ColorPickerForm";

type TabId =
  | "personalInfo"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "colors";

interface BuilderTab {
  id: TabId;
  label: string;
  title: string;
  icon: LucideIcon;
  group: "content" | "style";
}

const BUILDER_TABS: BuilderTab[] = [
  { id: "personalInfo", label: "Personal", title: "Personal Information", icon: User, group: "content" },
  { id: "experience", label: "Experience", title: "Work Experience", icon: Briefcase, group: "content" },
  { id: "education", label: "Education", title: "Education", icon: GraduationCap, group: "content" },
  { id: "skills", label: "Skills", title: "Skills", icon: Code, group: "content" },
  { id: "projects", label: "Projects", title: "Projects", icon: Folder, group: "content" },
  { id: "certifications", label: "Certs", title: "Certifications", icon: Award, group: "content" },
  { id: "colors", label: "Colors", title: "Color Scheme", icon: Palette, group: "style" },
];

const TAB_ORDER = BUILDER_TABS.map((t) => t.id);

const ResumeForm = () => {
  const [activeTab, setActiveTab] = useState<TabId>("personalInfo");

  const activeMeta = useMemo(
    () => BUILDER_TABS.find((t) => t.id === activeTab) ?? BUILDER_TABS[0],
    [activeTab]
  );

  const stepIndex = TAB_ORDER.indexOf(activeTab);
  const contentTabs = BUILDER_TABS.filter((t) => t.group === "content");
  const styleTabs = BUILDER_TABS.filter((t) => t.group === "style");

  const goTo = (direction: -1 | 1) => {
    const next = stepIndex + direction;
    if (next >= 0 && next < TAB_ORDER.length) {
      setActiveTab(TAB_ORDER[next]);
    }
  };

  return (
    <div className="space-y-5">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabId)}>
        <div className="builder-section-nav">
          <div className="builder-section-nav-scroll">
            <TabsList className="builder-section-tabs">
              {contentTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger key={tab.id} value={tab.id} className="builder-section-tab">
                    <Icon className="builder-section-tab-icon" aria-hidden />
                    <span>{tab.label}</span>
                  </TabsTrigger>
                );
              })}

              <div className="builder-section-divider" aria-hidden />

              {styleTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger key={tab.id} value={tab.id} className="builder-section-tab">
                    <Icon className="builder-section-tab-icon" aria-hidden />
                    <span>{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          <div className="builder-section-meta">
            <p className="builder-section-step">
              Step {stepIndex + 1} of {TAB_ORDER.length}
              <span className="builder-section-step-sep" aria-hidden>·</span>
              <span className="builder-section-step-name">{activeMeta.title}</span>
            </p>
          </div>
        </div>

        <div className="builder-section-content">
          <TabsContent value="personalInfo" className="mt-0">
            <PersonalInfoForm />
          </TabsContent>
          <TabsContent value="experience" className="mt-0">
            <ExperienceForm />
          </TabsContent>
          <TabsContent value="education" className="mt-0">
            <EducationForm />
          </TabsContent>
          <TabsContent value="skills" className="mt-0">
            <SkillsForm />
          </TabsContent>
          <TabsContent value="projects" className="mt-0">
            <ProjectsForm />
          </TabsContent>
          <TabsContent value="certifications" className="mt-0">
            <CertificationsForm />
          </TabsContent>
          <TabsContent value="colors" className="mt-0">
            <ColorPickerForm />
          </TabsContent>
        </div>
      </Tabs>

      <div className="builder-section-footer">
        <button
          type="button"
          onClick={() => goTo(-1)}
          className="builder-section-nav-btn"
          disabled={stepIndex === 0}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>

        <div className="builder-section-dots" role="tablist" aria-label="Resume sections">
          {TAB_ORDER.map((id, i) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={i === stepIndex}
              aria-label={BUILDER_TABS[i].title}
              className={`builder-section-dot ${i === stepIndex ? "active" : ""}`}
              onClick={() => setActiveTab(id)}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(1)}
          className="builder-section-nav-btn builder-section-nav-btn--next"
          disabled={stepIndex === TAB_ORDER.length - 1}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ResumeForm;
