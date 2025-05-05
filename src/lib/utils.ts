
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ColorScheme } from "@/contexts/ResumeContext"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  try {
    // For YYYY-MM format (month inputs)
    if (/^\d{4}-\d{2}$/.test(dateString)) {
      const date = new Date(dateString + '-01');
      return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short' }).format(date);
    }
    
    // For full dates
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short' }).format(date);
  } catch (e) {
    console.error("Error formatting date:", e);
    return dateString;
  }
}

// Generate CSS variable style object from color scheme
export function getColorVariables(colorScheme: ColorScheme): React.CSSProperties {
  return {
    "--color-primary": colorScheme.primary,
    "--color-secondary": colorScheme.secondary,
    "--color-background": colorScheme.background,
    "--color-text": colorScheme.text,
  } as React.CSSProperties;
}

// Adjust color brightness (make it lighter or darker)
export function adjustColorBrightness(color: string, percent: number): string {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  
  return "#" + (
    0x1000000 +
    (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 0 ? 0 : B) : 255)
  ).toString(16).slice(1);
}

// Convert hex color to rgba
export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
