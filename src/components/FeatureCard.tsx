
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Layout, Eye, Settings, FileText, Save, Smartphone, 
  User, Briefcase, GraduationCap, Award, Code, Folder
} from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  const getIcon = () => {
    switch (icon) {
      case "layout":
        return <Layout className="h-6 w-6 text-resume-blue" />;
      case "eye":
        return <Eye className="h-6 w-6 text-resume-blue" />;
      case "settings":
        return <Settings className="h-6 w-6 text-resume-blue" />;
      case "file-text":
        return <FileText className="h-6 w-6 text-resume-blue" />;
      case "save":
        return <Save className="h-6 w-6 text-resume-blue" />;
      case "smartphone":
        return <Smartphone className="h-6 w-6 text-resume-blue" />;
      case "user":
        return <User className="h-6 w-6 text-resume-blue" />;
      case "briefcase":
        return <Briefcase className="h-6 w-6 text-resume-blue" />;
      case "graduation-cap":
        return <GraduationCap className="h-6 w-6 text-resume-blue" />;
      case "code":
        return <Code className="h-6 w-6 text-resume-blue" />;
      case "folder":
        return <Folder className="h-6 w-6 text-resume-blue" />;
      default:
        return <Award className="h-6 w-6 text-resume-blue" />;
    }
  };

  return (
    <Card className="bg-card border border-border hover:border-resume-blue transition-all duration-300 hover:shadow-md">
      <CardContent className="pt-6">
        <div className="mb-4">
          {getIcon()}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
