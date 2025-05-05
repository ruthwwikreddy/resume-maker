
import React from "react";
import { useResume } from "@/contexts/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const PersonalInfoForm = () => {
  const { resumeData, updateSection } = useResume();
  const { personalInfo } = resumeData;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateSection("personalInfo", { [name]: value });
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={personalInfo.firstName}
            onChange={handleChange}
            placeholder="Your first name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={personalInfo.lastName}
            onChange={handleChange}
            placeholder="Your last name"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="title">Professional Title</Label>
        <Input
          id="title"
          name="title"
          value={personalInfo.title}
          onChange={handleChange}
          placeholder="e.g. Software Engineer"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={personalInfo.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={personalInfo.phone}
            onChange={handleChange}
            placeholder="(123) 456-7890"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            name="linkedin"
            value={personalInfo.linkedin || ""}
            onChange={handleChange}
            placeholder="linkedin.com/in/yourprofile"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="github">GitHub</Label>
          <Input
            id="github"
            name="github"
            value={personalInfo.github || ""}
            onChange={handleChange}
            placeholder="github.com/yourusername"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          name="website"
          value={personalInfo.website || ""}
          onChange={handleChange}
          placeholder="yourwebsite.com"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          name="summary"
          value={personalInfo.summary}
          onChange={handleChange}
          placeholder="Write a brief summary of your professional background and key strengths..."
          rows={4}
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;
