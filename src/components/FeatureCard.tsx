
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
    <div className="glass-card rounded-2xl p-8 transition-all duration-500 cursor-default group">
      <div className="mb-5 w-10 h-10 rounded-xl glass flex items-center justify-center group-hover:border-foreground/15 transition-all duration-300">
        <Icon className="h-4 w-4 text-foreground/60 group-hover:text-foreground transition-colors duration-300" strokeWidth={1.5} />
      </div>
      <h3 className="text-base font-medium text-foreground mb-2.5 tracking-tight">{title}</h3>
      <p className="text-sm text-foreground/40 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
