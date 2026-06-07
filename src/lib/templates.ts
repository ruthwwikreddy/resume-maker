import { TemplateName } from "./types";
import { TEMPLATES } from "./constants";

const VALID_TEMPLATE_IDS = new Set(TEMPLATES.map((t) => t.id));

export function isValidTemplateName(value: string | null | undefined): value is TemplateName {
  return !!value && VALID_TEMPLATE_IDS.has(value as TemplateName);
}

export function parseTemplateName(value: string | null | undefined): TemplateName | null {
  return isValidTemplateName(value) ? value : null;
}
