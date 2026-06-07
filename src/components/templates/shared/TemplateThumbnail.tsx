import React from "react";
import { TemplateName } from "@/lib/types";
import { cn } from "@/lib/utils";

const THUMB_LAYOUTS: Record<TemplateName, React.ReactNode> = {
  modern: (
    <div className="flex h-full w-full">
      <div className="w-[32%] bg-white/10 shrink-0" />
      <div className="flex-1 p-1.5 space-y-1">
        <div className="h-1 w-3/4 bg-white/20 rounded-full" />
        <div className="h-0.5 w-full bg-white/10 rounded-full" />
        <div className="h-0.5 w-5/6 bg-white/10 rounded-full" />
        <div className="h-0.5 w-full bg-white/10 rounded-full mt-2" />
        <div className="h-0.5 w-4/5 bg-white/8 rounded-full" />
      </div>
    </div>
  ),
  professional: (
    <div className="flex flex-col h-full w-full">
      <div className="h-[28%] bg-white/12 shrink-0 flex flex-col items-center justify-center gap-0.5 px-2">
        <div className="h-1 w-2/3 bg-white/25 rounded-full" />
        <div className="h-0.5 w-1/2 bg-white/15 rounded-full" />
      </div>
      <div className="flex-1 p-1.5 space-y-1">
        <div className="h-0.5 w-full bg-white/12 rounded-full" />
        <div className="h-0.5 w-5/6 bg-white/8 rounded-full" />
        <div className="h-0.5 w-full bg-white/10 rounded-full" />
      </div>
    </div>
  ),
  minimal: (
    <div className="flex flex-col h-full w-full items-center p-2 gap-1">
      <div className="h-1 w-2/3 bg-white/22 rounded-full" />
      <div className="h-0.5 w-1/2 bg-white/12 rounded-full" />
      <div className="h-px w-full bg-white/8 my-0.5" />
      <div className="h-0.5 w-full bg-white/10 rounded-full" />
      <div className="h-0.5 w-4/5 bg-white/8 rounded-full" />
      <div className="h-0.5 w-full bg-white/10 rounded-full" />
    </div>
  ),
  creative: (
    <div className="flex flex-col h-full w-full">
      <div className="h-[22%] bg-gradient-to-r from-white/20 to-white/5 shrink-0" />
      <div className="flex flex-1">
        <div className="w-[35%] p-1 space-y-0.5 border-r border-white/5">
          <div className="h-0.5 w-full bg-white/12 rounded-full" />
          <div className="h-0.5 w-4/5 bg-white/8 rounded-full" />
        </div>
        <div className="flex-1 p-1 space-y-0.5">
          <div className="h-0.5 w-full bg-white/12 rounded-full" />
          <div className="h-0.5 w-5/6 bg-white/8 rounded-full" />
        </div>
      </div>
    </div>
  ),
  executive: (
    <div className="flex flex-col h-full w-full">
      <div className="h-[24%] bg-white/10 shrink-0 p-1.5 flex justify-between items-end">
        <div className="space-y-0.5">
          <div className="h-1 w-10 bg-white/22 rounded-full" />
          <div className="h-0.5 w-8 bg-white/12 rounded-full" />
        </div>
        <div className="h-0.5 w-6 bg-white/10 rounded-full" />
      </div>
      <div className="flex-1 p-1.5 grid grid-cols-2 gap-1">
        <div className="space-y-0.5">
          <div className="h-0.5 w-full bg-white/10 rounded-full" />
          <div className="h-0.5 w-4/5 bg-white/8 rounded-full" />
        </div>
        <div className="space-y-0.5">
          <div className="h-0.5 w-full bg-white/10 rounded-full" />
          <div className="h-0.5 w-3/4 bg-white/8 rounded-full" />
        </div>
      </div>
    </div>
  ),
  classic: (
    <div className="flex flex-col h-full w-full p-2 gap-1 items-center">
      <div className="h-1 w-3/4 bg-white/20 rounded-full" />
      <div className="h-0.5 w-1/2 bg-white/10 rounded-full" />
      <div className="h-px w-full bg-white/15 my-0.5" />
      <div className="w-full space-y-0.5">
        <div className="h-0.5 w-1/3 bg-white/18 rounded-full" />
        <div className="h-0.5 w-full bg-white/10 rounded-full" />
        <div className="h-0.5 w-5/6 bg-white/8 rounded-full" />
        <div className="h-0.5 w-1/3 bg-white/18 rounded-full mt-1" />
        <div className="h-0.5 w-full bg-white/10 rounded-full" />
      </div>
    </div>
  ),
  compact: (
    <div className="flex h-full w-full p-1 gap-1">
      <div className="w-[38%] space-y-0.5">
        <div className="h-0.5 w-full bg-white/15 rounded-full" />
        <div className="h-0.5 w-4/5 bg-white/8 rounded-full" />
        <div className="h-0.5 w-full bg-white/10 rounded-full" />
        <div className="h-0.5 w-3/4 bg-white/8 rounded-full" />
      </div>
      <div className="flex-1 space-y-0.5">
        <div className="h-0.5 w-full bg-white/12 rounded-full" />
        <div className="h-0.5 w-5/6 bg-white/8 rounded-full" />
        <div className="h-0.5 w-full bg-white/10 rounded-full" />
      </div>
    </div>
  ),
  elegant: (
    <div className="flex flex-col h-full w-full items-center px-3 py-2 gap-1">
      <div className="h-1.5 w-1/2 bg-white/18 rounded-full" />
      <div className="h-px w-8 bg-white/20" />
      <div className="h-0.5 w-2/5 bg-white/10 rounded-full" />
      <div className="h-px w-full bg-white/8 my-0.5" />
      <div className="w-full space-y-1">
        <div className="h-0.5 w-1/4 bg-white/15 rounded-full mx-auto" />
        <div className="h-0.5 w-full bg-white/8 rounded-full" />
        <div className="h-0.5 w-4/5 bg-white/6 rounded-full mx-auto" />
      </div>
    </div>
  ),
  academic: (
    <div className="flex flex-col h-full w-full p-2 gap-1">
      <div className="h-1 w-2/3 bg-white/20 rounded-full" />
      <div className="h-0.5 w-1/2 bg-white/10 rounded-full" />
      <div className="h-0.5 w-1/3 bg-white/18 rounded-full mt-1" />
      <div className="h-0.5 w-full bg-white/12 rounded-full" />
      <div className="h-0.5 w-5/6 bg-white/8 rounded-full" />
      <div className="h-0.5 w-1/3 bg-white/18 rounded-full mt-1" />
      <div className="h-0.5 w-full bg-white/10 rounded-full" />
    </div>
  ),
  tech: (
    <div className="flex flex-col h-full w-full p-1.5 gap-1">
      <div className="flex justify-between items-start">
        <div className="h-1 w-8 bg-white/20 rounded-full" />
        <div className="h-0.5 w-6 bg-white/10 rounded-full" />
      </div>
      <div className="flex flex-wrap gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-1.5 w-3 bg-white/12 rounded-sm" />
        ))}
      </div>
      <div className="flex-1 space-y-0.5">
        <div className="h-0.5 w-full bg-white/12 rounded-full" />
        <div className="h-0.5 w-5/6 bg-white/8 rounded-full" />
        <div className="h-0.5 w-full bg-white/10 rounded-full" />
      </div>
    </div>
  ),
};

interface TemplateThumbnailProps {
  templateId: TemplateName;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const TemplateThumbnail = ({ templateId, className, size = "md" }: TemplateThumbnailProps) => {
  const sizes = {
    sm: "h-20 w-14",
    md: "aspect-[3/4] w-full",
    lg: "aspect-[3/4] w-full max-w-[200px]",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-foreground/8 bg-foreground/[0.04]",
        sizes[size],
        className
      )}
    >
      {THUMB_LAYOUTS[templateId]}
    </div>
  );
};

export default TemplateThumbnail;
