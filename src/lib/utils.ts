
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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

