
import React, { createContext, useContext, useState, useEffect } from "react";
import { defaultResumeData } from "@/lib/constants";
import type { ResumeData, TemplateName } from "@/lib/types";

export type ColorScheme = {
  primary: string;
  secondary: string;
  background: string;
  text: string;
};

export const DEFAULT_COLOR_SCHEME: ColorScheme = {
  primary: "#007BFF",
  secondary: "#222222",
  background: "#FFFFFF",
  text: "#333333"
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
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateName>("modern");
  const [colorScheme, setColorScheme] = useState<ColorScheme>(DEFAULT_COLOR_SCHEME);

  // Load saved data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem("resumeData");
    const savedTemplate = localStorage.getItem("selectedTemplate");
    const savedColorScheme = localStorage.getItem("colorScheme");
    
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved resume data:", e);
        // If parsing fails, use default data
        setResumeData(defaultResumeData);
      }
    }
    
    if (savedTemplate) {
      setSelectedTemplate(savedTemplate as TemplateName);
    }
    
    if (savedColorScheme) {
      try {
        setColorScheme(JSON.parse(savedColorScheme));
      } catch (e) {
        console.error("Failed to parse saved color scheme:", e);
        // If parsing fails, use default color scheme
        setColorScheme(DEFAULT_COLOR_SCHEME);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  // Save template whenever it changes
  useEffect(() => {
    localStorage.setItem("selectedTemplate", selectedTemplate);
  }, [selectedTemplate]);
  
  // Save color scheme whenever it changes
  useEffect(() => {
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
      [section]: { ...prev[section], ...data },
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

  const resetResumeData = () => {
    setResumeData(defaultResumeData);
  };

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
        setColorScheme,
        resetResumeData,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
