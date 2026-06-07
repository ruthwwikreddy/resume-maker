
import React from "react";
import { useResume, ColorScheme, DEFAULT_COLOR_SCHEME } from "@/contexts/ResumeContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";

const PRESET_COLORS = [
  {
    name: "Black & White",
    scheme: {
      primary: "#000000",
      secondary: "#000000",
      background: "#FFFFFF",
      text: "#000000",
    },
  },
  {
    name: "Charcoal",
    scheme: {
      primary: "#000000",
      secondary: "#1a1a1a",
      background: "#FFFFFF",
      text: "#000000",
    },
  },
  {
    name: "Professional Green",
    scheme: {
      primary: "#38A169",
      secondary: "#2D3748",
      background: "#FFFFFF",
      text: "#1A202C",
    },
  },
  {
    name: "Elegant Purple",
    scheme: {
      primary: "#805AD5",
      secondary: "#2D3748",
      background: "#FFFFFF",
      text: "#1A202C",
    },
  },
  {
    name: "Bold Red",
    scheme: {
      primary: "#E53E3E",
      secondary: "#1A202C",
      background: "#FFFFFF",
      text: "#2D3748",
    },
  },
  {
    name: "Modern Teal",
    scheme: {
      primary: "#319795",
      secondary: "#000000",
      background: "#FFFFFF",
      text: "#1A202C",
    },
  },
];

const tabTriggerClass =
  "builder-tab-active rounded-lg data-[state=inactive]:text-foreground/50";

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
        <Palette className="h-5 w-5 text-foreground/60" />
        <h2 className="text-xl font-semibold text-foreground tracking-tight">Color Preferences</h2>
      </div>

      <Tabs defaultValue="presets">
        <TabsList className="builder-tabs-list grid grid-cols-2 w-full rounded-xl p-1">
          <TabsTrigger value="presets" className={tabTriggerClass}>Color Presets</TabsTrigger>
          <TabsTrigger value="custom" className={tabTriggerClass}>Custom Colors</TabsTrigger>
        </TabsList>

        <TabsContent value="presets" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRESET_COLORS.map((preset, index) => (
              <Button
                key={index}
                variant="outline"
                className={`flex flex-col items-start h-auto p-4 rounded-xl border-2 bg-transparent hover:bg-foreground/5 ${
                  JSON.stringify(colorScheme) === JSON.stringify(preset.scheme)
                    ? "border-foreground/40"
                    : "border-foreground/10"
                }`}
                onClick={() => handlePresetSelect(preset.scheme)}
              >
                <span className="font-medium mb-2 text-foreground">{preset.name}</span>
                <div className="flex space-x-2 w-full">
                  <div className="w-6 h-6 rounded" style={{ backgroundColor: preset.scheme.primary }} />
                  <div className="w-6 h-6 rounded" style={{ backgroundColor: preset.scheme.secondary }} />
                  <div
                    className="w-6 h-6 rounded border border-foreground/20"
                    style={{ backgroundColor: preset.scheme.background }}
                  />
                  <div className="w-6 h-6 rounded" style={{ backgroundColor: preset.scheme.text }} />
                </div>
              </Button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="pt-4 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {(["primary", "secondary", "background", "text"] as const).map((key) => (
              <div key={key}>
                <Label htmlFor={`${key}Color`} className="text-foreground/70 capitalize">
                  {key === "primary" ? "Primary Color (Accents)" :
                   key === "secondary" ? "Secondary Color (Headings)" :
                   key === "background" ? "Background Color" : "Text Color"}
                </Label>
                <div className="flex gap-2 mt-1">
                  <div
                    className="w-10 h-10 rounded-md border border-foreground/10"
                    style={{ backgroundColor: colorScheme[key] }}
                  />
                  <Input
                    id={`${key}Color`}
                    type="color"
                    value={colorScheme[key]}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="w-full h-10 bg-foreground/5 border-foreground/10"
                  />
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              onClick={handleResetColors}
              className="mt-2 glass glass-hover border-foreground/15 text-foreground rounded-xl"
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
