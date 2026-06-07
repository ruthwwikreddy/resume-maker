import html2canvas from "html2canvas";
import { A4_WIDTH_PX, A4_HEIGHT_PX, RESUME_EXPORT_SOURCE_ID } from "./pageFormat";

const CAPTURE_SCALE = 2;

function waitForLayout(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

function prepareExportSource(): () => void {
  const source = document.getElementById(RESUME_EXPORT_SOURCE_ID);
  if (!source) return () => {};

  const prev = {
    opacity: source.style.opacity,
    position: source.style.position,
    left: source.style.left,
    top: source.style.top,
    zIndex: source.style.zIndex,
    visibility: source.style.visibility,
  };

  source.style.opacity = "1";
  source.style.visibility = "visible";
  source.style.position = "fixed";
  source.style.left = "-12000px";
  source.style.top = "0";
  source.style.zIndex = "-1";

  return () => {
    source.style.opacity = prev.opacity;
    source.style.position = prev.position;
    source.style.left = prev.left;
    source.style.top = prev.top;
    source.style.zIndex = prev.zIndex;
    source.style.visibility = prev.visibility;
  };
}

export async function captureResumeCanvas(
  element: HTMLElement,
  backgroundColor: string
): Promise<HTMLCanvasElement> {
  element.style.width = `${A4_WIDTH_PX}px`;
  element.style.maxWidth = `${A4_WIDTH_PX}px`;
  element.style.boxSizing = "border-box";

  if (document.fonts?.ready) {
    await document.fonts.ready;
  }
  await waitForLayout();

  const restoreExportSource = prepareExportSource();
  await waitForLayout();

  const contentHeight = element.scrollHeight;

  try {
    return await html2canvas(element, {
      scale: CAPTURE_SCALE,
      width: A4_WIDTH_PX,
      height: contentHeight,
      windowWidth: A4_WIDTH_PX,
      windowHeight: contentHeight,
      useCORS: true,
      logging: false,
      backgroundColor,
      scrollX: 0,
      scrollY: 0,
      letterRendering: true,
      onclone: (clonedDoc) => {
        const source = clonedDoc.getElementById(RESUME_EXPORT_SOURCE_ID);
        if (source) {
          source.style.opacity = "1";
          source.style.visibility = "visible";
          source.style.position = "static";
          source.style.left = "auto";
          source.style.top = "auto";
          source.style.zIndex = "auto";
        }

        const doc = clonedDoc.querySelector(".resume-document") as HTMLElement | null;
        if (doc) {
          doc.style.opacity = "1";
          doc.style.visibility = "visible";
          doc.style.width = `${A4_WIDTH_PX}px`;
          doc.style.maxWidth = `${A4_WIDTH_PX}px`;
          doc.style.backgroundColor = backgroundColor;
        }

        clonedDoc.querySelectorAll(".resume-badge-row").forEach((row) => {
          (row as HTMLElement).style.display = "block";
        });
      },
    });
  } finally {
    restoreExportSource();
  }
}

export function sliceCanvasToPageImages(
  canvas: HTMLCanvasElement,
  backgroundColor: string,
  pageCount: number
): string[] {
  const pageHeightScaled = A4_HEIGHT_PX * CAPTURE_SCALE;
  const pageWidthScaled = A4_WIDTH_PX * CAPTURE_SCALE;
  const images: string[] = [];

  for (let page = 0; page < pageCount; page++) {
    const y = page * pageHeightScaled;
    const sliceHeight = Math.min(pageHeightScaled, canvas.height - y);
    if (sliceHeight <= 0) break;

    const slice = document.createElement("canvas");
    slice.width = pageWidthScaled;
    slice.height = pageHeightScaled;
    const ctx = slice.getContext("2d");
    if (!ctx) continue;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, slice.width, slice.height);
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

    images.push(slice.toDataURL("image/png"));
  }

  return images;
}

export async function captureResumePageImages(
  element: HTMLElement,
  backgroundColor: string,
  pageCount: number
): Promise<string[]> {
  const canvas = await captureResumeCanvas(element, backgroundColor);
  return sliceCanvasToPageImages(canvas, backgroundColor, pageCount);
}

export { CAPTURE_SCALE };
