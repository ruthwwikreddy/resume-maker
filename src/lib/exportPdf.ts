import jsPDF from "jspdf";
import { captureResumeCanvas, CAPTURE_SCALE } from "./captureResumePages";
import {
  A4_WIDTH_PX,
  A4_HEIGHT_PX,
  A4_WIDTH_MM,
  A4_HEIGHT_MM,
  RESUME_EXPORT_SOURCE_ID,
} from "./pageFormat";

export interface ExportPdfOptions {
  fileName: string;
  backgroundColor: string;
}

export async function exportResumeToPdf({
  fileName,
  backgroundColor,
}: ExportPdfOptions): Promise<void> {
  const source = document.getElementById(RESUME_EXPORT_SOURCE_ID);
  const element = source?.querySelector(".resume-document") as HTMLElement | null;

  if (!element) {
    throw new Error("Resume document not found. Please wait a moment and try again.");
  }

  const scale = CAPTURE_SCALE;
  const canvas = await captureResumeCanvas(element, backgroundColor);

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageHeightScaled = A4_HEIGHT_PX * scale;
  const pageWidthScaled = A4_WIDTH_PX * scale;
  const pxToMm = A4_WIDTH_MM / A4_WIDTH_PX;

  let pageIndex = 0;

  for (let y = 0; y < canvas.height; y += pageHeightScaled) {
    if (pageIndex > 0) {
      pdf.addPage();
    }

    const sliceHeight = Math.min(pageHeightScaled, canvas.height - y);
    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = pageWidthScaled;
    pageCanvas.height = sliceHeight;

    const ctx = pageCanvas.getContext("2d");
    if (!ctx) {
      throw new Error("Could not create PDF canvas context.");
    }

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
    ctx.drawImage(
      canvas,
      0,
      y,
      pageWidthScaled,
      sliceHeight,
      0,
      0,
      pageWidthScaled,
      sliceHeight
    );

    const isFullPage = sliceHeight >= pageHeightScaled;
    const heightMm = isFullPage ? A4_HEIGHT_MM : (sliceHeight / scale) * pxToMm;

    const imgData = pageCanvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, 0, A4_WIDTH_MM, heightMm);
    pageIndex++;
  }

  pdf.save(fileName);
}

export function buildResumeFileName(firstName: string, lastName: string): string {
  const safe = (s: string) => s.trim().replace(/\s+/g, "-") || "Resume";
  return `${safe(firstName)}-${safe(lastName)}-Resume.pdf`;
}
