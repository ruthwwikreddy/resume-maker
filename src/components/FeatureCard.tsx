
import React from 'react';
import { 
  Layout, Eye, Settings, FileText, Save, Smartphone, 
  User, Briefcase, GraduationCap, Award, Code, Folder
} from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const iconMap: Record<string, React.ElementType> = {
  layout: Layout,
  eye: Eye,
  settings: Settings,
  "file-text": FileText,
  save: Save,
  smartphone: Smartphone,
  user: User,
  briefcase: Briefcase,
  "graduation-cap": GraduationCap,
  code: Code,
  folder: Folder,
};

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  const Icon = iconMap[icon] || Award;

  return (
    <div className="group border border-border/50 p-8 hover:border-foreground/30 transition-all duration-500">
      <div className="mb-6">
        <Icon className="h-5 w-5 text-foreground opacity-60 group-hover:opacity-100 transition-opacity duration-300" strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-medium text-foreground mb-3 tracking-tight">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
