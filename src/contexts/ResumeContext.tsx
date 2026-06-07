
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { defaultResumeData, DEFAULT_TEMPLATE } from "@/lib/constants";
import { parseTemplateName } from "@/lib/templates";
import { sanitizeColorScheme } from "@/lib/colorUtils";
import { sanitizeResumeData } from "@/lib/sanitizeResumeData";
import type { ResumeData, TemplateName } from "@/lib/types";

export type ColorScheme = {
  primary: string;
  secondary: string;
  background: string;
  text: string;
};

export const DEFAULT_COLOR_SCHEME: ColorScheme = {
  primary: "#000000",
  secondary: "#000000",
  background: "#ffffff",
  text: "#000000",
};

interface ResumeContextType {
  resumeData: ResumeData;
  updateResumeData: (data: Partial<ResumeData>) => void;
  updateSection: <K extends keyof ResumeData>(
    section: K,
    data: Partial<ResumeData[K]>
  ) => void;
  addListItem: <K extends keyof ResumeData>(
    section: K,
    item: any
  ) => void;
  updateListItem: <K extends keyof ResumeData>(
    section: K,
    index: number,
    item: any
  ) => void;
  removeListItem: <K extends keyof ResumeData>(
    section: K,
    index: number
  ) => void;
  selectedTemplate: TemplateName;
  setSelectedTemplate: (template: TemplateName) => void;
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  resetResumeData: () => void;
  resetAll: () => void;
  isHydrated: boolean;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateName>(DEFAULT_TEMPLATE);
  const [colorScheme, setColorScheme] = useState<ColorScheme>(DEFAULT_COLOR_SCHEME);
  const [isHydrated, setIsHydrated] = useState(false);
  const skipSave = useRef(true);

  useEffect(() => {
    const savedData = localStorage.getItem("resumeData");
    const savedTemplate = localStorage.getItem("selectedTemplate");
    const savedColorScheme = localStorage.getItem("colorScheme");

    if (savedData) {
      try {
        setResumeData(sanitizeResumeData(JSON.parse(savedData)));
      } catch {
        setResumeData(defaultResumeData);
      }
    }

    const parsedTemplate = parseTemplateName(savedTemplate);
    if (parsedTemplate) {
      setSelectedTemplate(parsedTemplate);
    }

    if (savedColorScheme) {
      try {
        setColorScheme(sanitizeColorScheme(JSON.parse(savedColorScheme)));
      } catch {
        setColorScheme(DEFAULT_COLOR_SCHEME);
      }
    }

    skipSave.current = false;
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (skipSave.current) return;
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    if (skipSave.current) return;
    localStorage.setItem("selectedTemplate", selectedTemplate);
  }, [selectedTemplate]);

  useEffect(() => {
    if (skipSave.current) return;
    localStorage.setItem("colorScheme", JSON.stringify(colorScheme));
  }, [colorScheme]);

  const updateResumeData = (data: Partial<ResumeData>) => {
    setResumeData((prev) => ({ ...prev, ...data }));
  };

  const updateSection = <K extends keyof ResumeData>(
    section: K,
    data: Partial<ResumeData[K]>
  ) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: { ...(prev[section] as object), ...data },
    }));
  };

  const addListItem = <K extends keyof ResumeData>(section: K, item: any) => {
    setResumeData((prev) => {
      if (Array.isArray(prev[section])) {
        return {
          ...prev,
          [section]: [...(prev[section] as any[]), item],
        };
      }
      return prev;
    });
  };

  const updateListItem = <K extends keyof ResumeData>(
    section: K,
    index: number,
    item: any
  ) => {
    setResumeData((prev) => {
      if (Array.isArray(prev[section])) {
        const newArray = [...(prev[section] as any[])];
        newArray[index] = { ...newArray[index], ...item };
        return {
          ...prev,
          [section]: newArray,
        };
      }
      return prev;
    });
  };

  const removeListItem = <K extends keyof ResumeData>(
    section: K,
    index: number
  ) => {
    setResumeData((prev) => {
      if (Array.isArray(prev[section])) {
        const newArray = [...(prev[section] as any[])];
        newArray.splice(index, 1);
        return {
          ...prev,
          [section]: newArray,
        };
      }
      return prev;
    });
  };

  const resetResumeData = useCallback(() => {
    setResumeData(defaultResumeData);
  }, []);

  const resetAll = useCallback(() => {
    setResumeData(defaultResumeData);
    setSelectedTemplate(DEFAULT_TEMPLATE);
    setColorScheme(DEFAULT_COLOR_SCHEME);
  }, []);

  const applyColorScheme = useCallback((scheme: ColorScheme) => {
    setColorScheme(sanitizeColorScheme(scheme));
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updateResumeData,
        updateSection,
        addListItem,
        updateListItem,
        removeListItem,
        selectedTemplate,
        setSelectedTemplate,
        colorScheme,
        setColorScheme: applyColorScheme,
        resetResumeData,
        resetAll,
        isHydrated,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
