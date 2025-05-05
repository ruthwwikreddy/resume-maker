
import React from "react";
import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

const EducationForm = () => {
  const { resumeData, addListItem, updateListItem, removeListItem } = useResume();
  const { education } = resumeData;
  
  const handleAddEducation = () => {
    addListItem("education", {
      id: uuidv4(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      location: "",
      gpa: "",
      description: "",
    });
  };
  
  const handleChange = (index: number, field: string, value: string) => {
    updateListItem("education", index, { [field]: value });
  };
  
  const handleRemove = (index: number) => {
    removeListItem("education", index);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Education</h2>
        <Button 
          onClick={handleAddEducation}
          variant="outline" 
          className="border-resume-blue text-resume-blue hover:bg-resume-blue/10"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Education
        </Button>
      </div>
      
      {education.length === 0 ? (
        <div className="text-center p-8 border border-dashed border-gray-600 rounded-lg">
          <p className="text-gray-400">No education entries yet. Click the button above to add one.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu, index) => (
            <Card key={edu.id} className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between py-3">
                <CardTitle className="text-lg">
                  {edu.institution || "New Education Entry"}
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
                <div className="space-y-2">
                  <Label htmlFor={`institution-${index}`}>Institution</Label>
                  <Input
                    id={`institution-${index}`}
                    value={edu.institution}
                    onChange={(e) => handleChange(index, "institution", e.target.value)}
                    placeholder="University or School Name"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`degree-${index}`}>Degree</Label>
                    <Input
                      id={`degree-${index}`}
                      value={edu.degree}
                      onChange={(e) => handleChange(index, "degree", e.target.value)}
                      placeholder="e.g. Bachelor of Science"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`field-${index}`}>Field of Study</Label>
                    <Input
                      id={`field-${index}`}
                      value={edu.field}
                      onChange={(e) => handleChange(index, "field", e.target.value)}
                      placeholder="e.g. Computer Science"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                    <Input
                      id={`startDate-${index}`}
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => handleChange(index, "startDate", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`endDate-${index}`}>End Date</Label>
                    <Input
                      id={`endDate-${index}`}
                      type="month"
                      value={edu.endDate}
                      onChange={(e) => handleChange(index, "endDate", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`location-${index}`}>Location</Label>
                    <Input
                      id={`location-${index}`}
                      value={edu.location || ""}
                      onChange={(e) => handleChange(index, "location", e.target.value)}
                      placeholder="e.g. New York, NY"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`gpa-${index}`}>GPA</Label>
                    <Input
                      id={`gpa-${index}`}
                      value={edu.gpa || ""}
                      onChange={(e) => handleChange(index, "gpa", e.target.value)}
                      placeholder="e.g. 3.8/4.0"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`description-${index}`}>Description</Label>
                  <Textarea
                    id={`description-${index}`}
                    value={edu.description || ""}
                    onChange={(e) => handleChange(index, "description", e.target.value)}
                    placeholder="Additional details about your education..."
                    rows={3}
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

export default EducationForm;
