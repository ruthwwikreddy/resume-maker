
import React from "react";
import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash, X } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

const ProjectsForm = () => {
  const { resumeData, addListItem, updateListItem, removeListItem } = useResume();
  const { projects } = resumeData;
  
  const handleAddProject = () => {
    addListItem("projects", {
      id: uuidv4(),
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      url: "",
      technologies: [],
    });
  };
  
  const handleChange = (index: number, field: string, value: any) => {
    updateListItem("projects", index, { [field]: value });
  };
  
  const handleRemove = (index: number) => {
    removeListItem("projects", index);
  };
  
  const handleTechChange = (index: number, value: string) => {
    if (value.trim() === "") return;
    
    const lastChar = value.slice(-1);
    if (lastChar === "," || lastChar === ";") {
      const tech = value.slice(0, -1).trim();
      if (tech) {
        const technologies = [
          ...(projects[index].technologies || []),
          tech
        ];
        updateListItem("projects", index, { technologies });
        return "";
      }
    }
    return value;
  };
  
  const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Enter" || e.key === "," || e.key === ";") {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      const tech = target.value.trim();
      
      if (tech) {
        const technologies = [
          ...(projects[index].technologies || []),
          tech
        ];
        updateListItem("projects", index, { technologies });
        target.value = "";
      }
    }
  };
  
  const handleRemoveTech = (projectIndex: number, techIndex: number) => {
    const technologies = [...(projects[projectIndex].technologies || [])];
    technologies.splice(techIndex, 1);
    updateListItem("projects", projectIndex, { technologies });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Projects</h2>
        <Button 
          onClick={handleAddProject}
          variant="outline" 
          className="border-resume-blue text-resume-blue hover:bg-resume-blue/10"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Project
        </Button>
      </div>
      
      {projects.length === 0 ? (
        <div className="text-center p-8 border border-dashed border-gray-600 rounded-lg">
          <p className="text-gray-400">No projects added yet. Click the button above to add one.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project, index) => (
            <Card key={project.id} className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between py-3">
                <CardTitle className="text-lg">
                  {project.name || "New Project"}
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
                  <Label htmlFor={`name-${index}`}>Project Name</Label>
                  <Input
                    id={`name-${index}`}
                    value={project.name}
                    onChange={(e) => handleChange(index, "name", e.target.value)}
                    placeholder="Project Name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`description-${index}`}>Description</Label>
                  <Textarea
                    id={`description-${index}`}
                    value={project.description}
                    onChange={(e) => handleChange(index, "description", e.target.value)}
                    placeholder="Describe your project..."
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                    <Input
                      id={`startDate-${index}`}
                      type="month"
                      value={project.startDate || ""}
                      onChange={(e) => handleChange(index, "startDate", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`endDate-${index}`}>End Date</Label>
                    <Input
                      id={`endDate-${index}`}
                      type="month"
                      value={project.endDate || ""}
                      onChange={(e) => handleChange(index, "endDate", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`url-${index}`}>Project URL</Label>
                  <Input
                    id={`url-${index}`}
                    value={project.url || ""}
                    onChange={(e) => handleChange(index, "url", e.target.value)}
                    placeholder="https://example.com/project"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`technologies-${index}`}>Technologies Used</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {(project.technologies || []).map((tech, techIndex) => (
                      <div 
                        key={techIndex} 
                        className="flex items-center bg-muted rounded-md px-2 py-1"
                      >
                        <span className="text-sm">{tech}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveTech(index, techIndex)}
                          className="h-5 w-5 ml-1 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      id={`technologies-${index}`}
                      placeholder="Add technologies (press Enter or comma to add)"
                      onKeyDown={(e) => handleTechKeyDown(e, index)}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Press Enter, comma, or semicolon after each technology to add it to the list
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsForm;
