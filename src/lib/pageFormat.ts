/** A4 at 96 CSS px/in — matches jsPDF A4 output */
export const A4_WIDTH_PX = 794;
export const A4_HEIGHT_PX = 1123;
export const A4_WIDTH_MM = 210;
export const A4_HEIGHT_MM = 297;

export function getPageCount(contentHeightPx: number): number {
  return Math.max(1, Math.ceil(contentHeightPx / A4_HEIGHT_PX));
}

export const RESUME_EXPORT_SOURCE_ID = "resume-export-source";
