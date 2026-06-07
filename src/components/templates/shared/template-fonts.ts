import { TemplateName } from "@/lib/types";
import { TemplateFonts } from "./resume-primitives";

export const TEMPLATE_FONT_FAMILIES: Record<TemplateName, TemplateFonts> = {
  modern: {
    heading: "'Inter', system-ui, sans-serif",
    body: "'Roboto', system-ui, sans-serif",
  },
  professional: {
    heading: "'Merriweather', Georgia, serif",
    body: "'Open Sans', system-ui, sans-serif",
  },
  minimal: {
    heading: "'Lato', system-ui, sans-serif",
    body: "'Lato', system-ui, sans-serif",
  },
  creative: {
    heading: "'Playfair Display', Georgia, serif",
    body: "'Open Sans', system-ui, sans-serif",
  },
  executive: {
    heading: "'Merriweather', Georgia, serif",
    body: "'Roboto', system-ui, sans-serif",
  },
  classic: {
    heading: "'Merriweather', Georgia, serif",
    body: "'Open Sans', system-ui, sans-serif",
  },
  compact: {
    heading: "'Inter', system-ui, sans-serif",
    body: "'Roboto', system-ui, sans-serif",
  },
  elegant: {
    heading: "'Playfair Display', Georgia, serif",
    body: "'Lato', system-ui, sans-serif",
  },
  academic: {
    heading: "'Merriweather', Georgia, serif",
    body: "'Open Sans', system-ui, sans-serif",
  },
  tech: {
    heading: "'Inter', system-ui, sans-serif",
    body: "'Roboto', system-ui, sans-serif",
  },
};
