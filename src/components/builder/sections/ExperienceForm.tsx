
import React from "react";
import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash, PlusCircle, MinusCircle } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

const ExperienceForm = () => {
  const { resumeData, addListItem, updateListItem, removeListItem } = useResume();
  const { experience } = resumeData;
  
  const handleAddExperience = () => {
    addListItem("experience", {
      id: uuidv4(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      location: "",
      current: false,
      description: "",
      achievements: [""],
    });
  };
  
  const handleChange = (index: number, field: string, value: any) => {
    updateListItem("experience", index, { [field]: value });
  };
  
  const handleRemove = (index: number) => {
    removeListItem("experience", index);
  };
  
  const handleAddAchievement = (expIndex: number) => {
    const exp = experience[expIndex];
    const achievements = [...exp.achievements, ""];
    updateListItem("experience", expIndex, { achievements });
  };
  
  const handleUpdateAchievement = (expIndex: number, achievementIndex: number, value: string) => {
    const exp = experience[expIndex];
    const achievements = [...exp.achievements];
    achievements[achievementIndex] = value;
    updateListItem("experience", expIndex, { achievements });
  };
  
  const handleRemoveAchievement = (expIndex: number, achievementIndex: number) => {
    const exp = experience[expIndex];
    const achievements = [...exp.achievements];
    achievements.splice(achievementIndex, 1);
    updateListItem("experience", expIndex, { achievements });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Work Experience</h2>
        <Button 
          onClick={handleAddExperience}
          variant="outline" 
          className="border-resume-blue text-resume-blue hover:bg-resume-blue/10"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Experience
        </Button>
      </div>
      
      {experience.length === 0 ? (
        <div className="text-center p-8 border border-dashed border-gray-600 rounded-lg">
          <p className="text-gray-400">No experience entries yet. Click the button above to add one.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {experience.map((exp, index) => (
            <Card key={exp.id} className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between py-3">
                <CardTitle className="text-lg">
                  {exp.position ? `${exp.position}${exp.company ? ` at ${exp.company}` : ''}` : "New Experience Entry"}
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleRemove(index)}
                  className="hover:text-red-500"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`company-${index}`}>Company</Label>
                    <Input
                      id={`company-${index}`}
                      value={exp.company}
                      onChange={(e) => handleChange(index, "company", e.target.value)}
                      placeholder="Company Name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`position-${index}`}>Position</Label>
                    <Input
                      id={`position-${index}`}
                      value={exp.position}
                      onChange={(e) => handleChange(index, "position", e.target.value)}
                      placeholder="Your Job Title"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                    <Input
                      id={`startDate-${index}`}
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => handleChange(index, "startDate", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`endDate-${index}`}>End Date</Label>
                    <div className="flex flex-col space-y-2">
                      <Input
                        id={`endDate-${index}`}
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => handleChange(index, "endDate", e.target.value)}
                        disabled={exp.current}
                      />
                      <div className="flex items-center space-x-2 mt-1">
                        <Checkbox 
                          id={`current-${index}`}
                          checked={exp.current}
                          onCheckedChange={(checked) => {
                            handleChange(index, "current", !!checked);
                            if (!!checked) {
                              handleChange(index, "endDate", "");
                            }
                          }}
                        />
                        <label 
                          htmlFor={`current-${index}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I currently work here
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`location-${index}`}>Location</Label>
                  <Input
                    id={`location-${index}`}
                    value={exp.location || ""}
                    onChange={(e) => handleChange(index, "location", e.target.value)}
                    placeholder="e.g. New York, NY"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`description-${index}`}>Job Description</Label>
                  <Textarea
                    id={`description-${index}`}
                    value={exp.description}
                    onChange={(e) => handleChange(index, "description", e.target.value)}
                    placeholder="Describe your responsibilities and role..."
                    rows={3}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label>Key Achievements</Label>
                  {exp.achievements.map((achievement, achievementIndex) => (
                    <div key={achievementIndex} className="flex items-start gap-2">
                      <Textarea
                        value={achievement}
                        onChange={(e) => handleUpdateAchievement(index, achievementIndex, e.target.value)}
                        placeholder="Describe a key achievement or responsibility..."
                        rows={2}
                        className="flex-grow"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveAchievement(index, achievementIndex)}
                        disabled={exp.achievements.length <= 1}
                        className="hover:text-red-500 flex-shrink-0 mt-1"
                      >
                        <MinusCircle className="h-5 w-5" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => handleAddAchievement(index)}
                    className="mt-2 text-resume-blue hover:text-resume-blue/80 hover:bg-background"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" /> Add Achievement
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
