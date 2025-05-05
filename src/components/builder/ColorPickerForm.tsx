
import React from "react";
import { useResume, ColorScheme, DEFAULT_COLOR_SCHEME } from "@/contexts/ResumeContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";

const PRESET_COLORS = [
  {
    name: "Default Blue",
    scheme: {
      primary: "#007BFF",
      secondary: "#222222",
      background: "#FFFFFF",
      text: "#333333"
    }
  },
  {
    name: "Professional Green",
    scheme: {
      primary: "#38A169",
      secondary: "#2D3748",
      background: "#FFFFFF",
      text: "#1A202C"
    }
  },
  {
    name: "Elegant Purple",
    scheme: {
      primary: "#805AD5",
      secondary: "#2D3748",
      background: "#FFFFFF",
      text: "#1A202C"
    }
  },
  {
    name: "Bold Red",
    scheme: {
      primary: "#E53E3E",
      secondary: "#1A202C",
      background: "#FFFFFF",
      text: "#2D3748"
    }
  },
  {
    name: "Modern Teal",
    scheme: {
      primary: "#319795",
      secondary: "#2C5282",
      background: "#FFFFFF",
      text: "#1A202C"
    }
  }
];

const ColorPickerForm = () => {
  const { colorScheme, setColorScheme } = useResume();

  const handleColorChange = (key: keyof ColorScheme, value: string) => {
    setColorScheme({ ...colorScheme, [key]: value });
  };

  const handlePresetSelect = (preset: ColorScheme) => {
    setColorScheme(preset);
  };

  const handleResetColors = () => {
    setColorScheme(DEFAULT_COLOR_SCHEME);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="h-5 w-5 text-resume-blue" />
        <h2 className="text-xl font-bold">Color Preferences</h2>
      </div>

      <Tabs defaultValue="presets">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="presets">Color Presets</TabsTrigger>
          <TabsTrigger value="custom">Custom Colors</TabsTrigger>
        </TabsList>
        
        <TabsContent value="presets" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRESET_COLORS.map((preset, index) => (
              <Button
                key={index}
                variant="outline"
                className={`flex flex-col items-start h-auto p-4 border-2 ${
                  JSON.stringify(colorScheme) === JSON.stringify(preset.scheme)
                    ? "border-resume-blue"
                    : "border-border"
                }`}
                onClick={() => handlePresetSelect(preset.scheme)}
              >
                <span className="font-medium mb-2">{preset.name}</span>
                <div className="flex space-x-2 w-full">
                  <div
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: preset.scheme.primary }}
                  />
                  <div
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: preset.scheme.secondary }}
                  />
                  <div
                    className="w-6 h-6 rounded border border-gray-200"
                    style={{ backgroundColor: preset.scheme.background }}
                  />
                  <div
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: preset.scheme.text }}
                  />
                </div>
              </Button>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="custom" className="pt-4 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="primaryColor">Primary Color (Accents)</Label>
              <div className="flex gap-2 mt-1">
                <div 
                  className="w-10 h-10 rounded-md border"
                  style={{ backgroundColor: colorScheme.primary }}
                />
                <Input
                  id="primaryColor"
                  type="color"
                  value={colorScheme.primary}
                  onChange={(e) => handleColorChange("primary", e.target.value)}
                  className="w-full h-10"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="secondaryColor">Secondary Color (Headings)</Label>
              <div className="flex gap-2 mt-1">
                <div 
                  className="w-10 h-10 rounded-md border"
                  style={{ backgroundColor: colorScheme.secondary }}
                />
                <Input
                  id="secondaryColor"
                  type="color"
                  value={colorScheme.secondary}
                  onChange={(e) => handleColorChange("secondary", e.target.value)}
                  className="w-full h-10"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="backgroundColor">Background Color</Label>
              <div className="flex gap-2 mt-1">
                <div 
                  className="w-10 h-10 rounded-md border"
                  style={{ backgroundColor: colorScheme.background }}
                />
                <Input
                  id="backgroundColor"
                  type="color"
                  value={colorScheme.background}
                  onChange={(e) => handleColorChange("background", e.target.value)}
                  className="w-full h-10"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="textColor">Text Color</Label>
              <div className="flex gap-2 mt-1">
                <div 
                  className="w-10 h-10 rounded-md border"
                  style={{ backgroundColor: colorScheme.text }}
                />
                <Input
                  id="textColor"
                  type="color"
                  value={colorScheme.text}
                  onChange={(e) => handleColorChange("text", e.target.value)}
                  className="w-full h-10"
                />
              </div>
            </div>
            
            <Button 
              variant="outline" 
              onClick={handleResetColors}
              className="mt-2"
            >
              Reset to Default Colors
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ColorPickerForm;
