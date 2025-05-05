
import React from "react";
import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Plus, Trash } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { SKILL_LEVELS } from "@/lib/constants";

const SkillsForm = () => {
  const { resumeData, addListItem, updateListItem, removeListItem } = useResume();
  const { skills } = resumeData;
  
  const handleAddSkill = () => {
    addListItem("skills", {
      id: uuidv4(),
      name: "",
      level: 60,
      category: "",
    });
  };
  
  const handleChange = (index: number, field: string, value: any) => {
    updateListItem("skills", index, { [field]: value });
  };
  
  const handleRemove = (index: number) => {
    removeListItem("skills", index);
  };
  
  const getSkillLevelText = (level: number) => {
    const skillLevel = SKILL_LEVELS.find(
      (item) => level <= item.value
    );
    return skillLevel ? skillLevel.label : "Expert";
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Skills</h2>
        <Button 
          onClick={handleAddSkill}
          variant="outline" 
          className="border-resume-blue text-resume-blue hover:bg-resume-blue/10"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Skill
        </Button>
      </div>
      
      {skills.length === 0 ? (
        <div className="text-center p-8 border border-dashed border-gray-600 rounded-lg">
          <p className="text-gray-400">No skills added yet. Click the button above to add one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <Card key={skill.id} className="bg-card border-border">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2 flex-grow">
                    <Label htmlFor={`skill-${index}`}>Skill Name</Label>
                    <Input
                      id={`skill-${index}`}
                      value={skill.name}
                      onChange={(e) => handleChange(index, "name", e.target.value)}
                      placeholder="e.g. JavaScript"
                    />
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleRemove(index)}
                    className="hover:text-red-500 ml-2"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`category-${index}`}>Category (Optional)</Label>
                  <Input
                    id={`category-${index}`}
                    value={skill.category || ""}
                    onChange={(e) => handleChange(index, "category", e.target.value)}
                    placeholder="e.g. Programming, Design, etc."
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor={`level-${index}`}>Proficiency Level</Label>
                    <span className="text-sm text-gray-400">
                      {getSkillLevelText(skill.level || 50)}
                    </span>
                  </div>
                  <Slider
                    id={`level-${index}`}
                    defaultValue={[skill.level || 50]}
                    max={100}
                    step={20}
                    onValueChange={(value) => handleChange(index, "level", value[0])}
                    className="py-4"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsForm;
