
import React, {
  memo,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { useResume } from "@/contexts/ResumeContext";
import { captureResumePageImages } from "@/lib/captureResumePages";
import { getTemplateComponent } from "@/lib/templateRegistry";
import { TEMPLATES } from "@/lib/constants";
import {
  A4_WIDTH_PX,
  A4_HEIGHT_PX,
  getPageCount,
  RESUME_EXPORT_SOURCE_ID,
} from "@/lib/pageFormat";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileText,
  Radio,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

const PAGE_GAP = 32;
const PAGE_LABEL_HEIGHT = 40;
const MIN_ZOOM = 0.38;
const MAX_ZOOM = 1.25;
const CAPTURE_DEBOUNCE_MS = 320;

function stackHeight(pageCount: number): number {
  if (pageCount <= 1) return A4_HEIGHT_PX;
  return (
    pageCount * A4_HEIGHT_PX +
    (pageCount - 1) * PAGE_GAP +
    pageCount * PAGE_LABEL_HEIGHT
  );
}

function getExportDocument(): HTMLElement | null {
  return document
    .getElementById(RESUME_EXPORT_SOURCE_ID)
    ?.querySelector(".resume-document") as HTMLElement | null;
}

interface PageImageSheetProps {
  src: string;
  pageIndex: number;
  pageCount: number;
  isActive: boolean;
  onNavigate: () => void;
}

const PageImageSheet = memo(function PageImageSheet({
  src,
  pageIndex,
  pageCount,
  isActive,
  onNavigate,
}: PageImageSheetProps) {
  return (
    <div
      className={`resume-page-sheet ${isActive ? "resume-page-sheet--active" : ""}`}
      data-page={pageIndex + 1}
      onClick={onNavigate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onNavigate()}
    >
      <div className="resume-page-viewport">
        <img
          src={src}
          alt={`Resume page ${pageIndex + 1}`}
          width={A4_WIDTH_PX}
          height={A4_HEIGHT_PX}
          className="resume-page-image"
          draggable={false}
        />
      </div>
      {pageCount > 1 && (
        <div className="resume-page-footer">
          <span className="resume-page-label">
            Page {pageIndex + 1} of {pageCount}
          </span>
        </div>
      )}
    </div>
  );
});

interface DomPageSliceProps {
  pageIndex: number;
  pageCount: number;
  isActive: boolean;
  onNavigate: () => void;
  children: React.ReactNode;
}

const DomPageSlice = memo(function DomPageSlice({
  pageIndex,
  pageCount,
  isActive,
  onNavigate,
  children,
}: DomPageSliceProps) {
  return (
    <div
      className={`resume-page-sheet ${isActive ? "resume-page-sheet--active" : ""}`}
      data-page={pageIndex + 1}
      onClick={onNavigate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onNavigate()}
    >
      <div
        className="resume-page-viewport"
        style={{ width: A4_WIDTH_PX, height: A4_HEIGHT_PX }}
      >
        <div
          className="resume-page-content-shift"
          style={{ transform: `translateY(-${pageIndex * A4_HEIGHT_PX}px)` }}
        >
          {children}
        </div>
      </div>
      {pageCount > 1 && (
        <div className="resume-page-footer">
          <span className="resume-page-label">
            Page {pageIndex + 1} of {pageCount}
          </span>
        </div>
      )}
    </div>
  );
});

interface ResumePreviewProps {
  className?: string;
}

const ResumePreview = ({ className = "" }: ResumePreviewProps) => {
  const { resumeData, selectedTemplate, colorScheme } = useResume();
  const Template = getTemplateComponent(selectedTemplate);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [pageCount, setPageCount] = useState(1);
  const [pageImages, setPageImages] = useState<string[]>([]);
  const [useDomFallback, setUseDomFallback] = useState(false);
  const [isUpdating, setIsUpdating] = useState(true);
  const [activePage, setActivePage] = useState(0);
  const [containerWidth, setContainerWidth] = useState(A4_WIDTH_PX);
  const [containerHeight, setContainerHeight] = useState(600);
  const [zoomMode, setZoomMode] = useState<"fit" | "fit-height" | "manual">("fit");
  const [manualZoom, setManualZoom] = useState(0.72);

  const templateProps = useMemo(
    () => ({ data: resumeData, colorScheme }),
    [resumeData, colorScheme]
  );

  const templateMeta = useMemo(
    () => TEMPLATES.find((t) => t.id === selectedTemplate),
    [selectedTemplate]
  );

  const fitWidthZoom = useMemo(() => {
    const padding = 64;
    return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, (containerWidth - padding) / A4_WIDTH_PX));
  }, [containerWidth]);

  const fitHeightZoom = useMemo(() => {
    const padding = 80;
    const total = stackHeight(pageCount);
    return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, (containerHeight - padding) / total));
  }, [containerHeight, pageCount]);

  const zoom = useMemo(() => {
    if (zoomMode === "fit") return fitWidthZoom;
    if (zoomMode === "fit-height") return Math.min(fitWidthZoom, fitHeightZoom);
    return manualZoom;
  }, [zoomMode, fitWidthZoom, fitHeightZoom, manualZoom]);

  const measurePages = useCallback(() => {
    const doc = getExportDocument();
    if (!doc) return 1;
    return getPageCount(doc.scrollHeight);
  }, []);

  useLayoutEffect(() => {
    const update = () => setPageCount(measurePages());
    update();

    const doc = getExportDocument();
    if (!doc) return;
    const observer = new ResizeObserver(update);
    observer.observe(doc);
    return () => observer.disconnect();
  }, [resumeData, selectedTemplate, colorScheme, measurePages]);

  useEffect(() => {
    let cancelled = false;
    setIsUpdating(true);

    const timer = setTimeout(async () => {
      const doc = getExportDocument();
      if (!doc || cancelled) return;

      const count = getPageCount(doc.scrollHeight);
      setPageCount(count);

      try {
        const images = await captureResumePageImages(doc, colorScheme.background, count);
        if (!cancelled && images.length > 0) {
          setPageImages(images);
          setPageCount(images.length);
          setUseDomFallback(false);
        }
      } catch {
        if (!cancelled) setUseDomFallback(true);
      } finally {
        if (!cancelled) setIsUpdating(false);
      }
    }, CAPTURE_DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [resumeData, selectedTemplate, colorScheme]);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      setContainerWidth(el.clientWidth);
      setContainerHeight(el.clientHeight);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || pageCount <= 1) return;

    const onScroll = () => {
      const center = el.scrollTop + el.clientHeight / 2;
      let closest = 0;
      let minDist = Infinity;
      pageRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const refCenter = ref.offsetTop + ref.offsetHeight / 2;
        const dist = Math.abs(center - refCenter);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActivePage(closest);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [pageCount, pageImages.length, useDomFallback, zoom]);

  const scrollToPage = useCallback((index: number) => {
    pageRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
    setActivePage(index);
  }, []);

  const handleZoomIn = useCallback(() => {
    setManualZoom((z) => Math.min(MAX_ZOOM, (zoomMode !== "manual" ? zoom : z) + 0.1));
    setZoomMode("manual");
  }, [zoomMode, zoom]);

  const handleZoomOut = useCallback(() => {
    setManualZoom((z) => Math.max(MIN_ZOOM, (zoomMode !== "manual" ? zoom : z) - 0.1));
    setZoomMode("manual");
  }, [zoomMode, zoom]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        handleZoomIn();
      }
      if (e.key === "-") {
        e.preventDefault();
        handleZoomOut();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleZoomIn, handleZoomOut]);

  const totalStackHeight = stackHeight(pageCount);
  const scaledWidth = A4_WIDTH_PX * zoom;
  const scaledHeight = totalStackHeight * zoom;
  const showImages = !useDomFallback && pageImages.length > 0;
  const displayPageCount = showImages ? pageImages.length : pageCount;

  return (
    <div className={`live-preview ${className}`}>
      <div className="live-preview-toolbar">
        <div className="live-preview-toolbar-left">
          <div className="live-preview-icon-wrap">
            <FileText className="h-3.5 w-3.5 text-foreground/50" />
          </div>
          <div>
            <p className="live-preview-title">Live Preview</p>
            <p className="live-preview-subtitle">
              {templateMeta?.name ?? "Resume"} · A4 · {displayPageCount}{" "}
              {displayPageCount === 1 ? "page" : "pages"}
              {showImages ? " · PDF match" : ""}
            </p>
          </div>
        </div>

        <div className="live-preview-toolbar-right">
          <span className={`live-preview-live-badge ${isUpdating ? "updating" : ""}`}>
            <Radio className="h-2.5 w-2.5" />
            {isUpdating ? "Updating" : "Live"}
          </span>
          <div className="live-preview-zoom">
            <button type="button" className="live-preview-zoom-btn" onClick={handleZoomOut} aria-label="Zoom out">
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="live-preview-zoom-value">{Math.round(zoom * 100)}%</span>
            <button type="button" className="live-preview-zoom-btn" onClick={handleZoomIn} aria-label="Zoom in">
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              className={`live-preview-zoom-btn ${zoomMode !== "manual" ? "active" : ""}`}
              onClick={() => {
                if (zoomMode === "manual") {
                  setZoomMode("fit");
                } else if (zoomMode === "fit" && displayPageCount > 1) {
                  setZoomMode("fit-height");
                } else {
                  setZoomMode("fit");
                }
              }}
              title={displayPageCount > 1 ? "Fit width / fit all pages" : "Fit width"}
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="live-preview-body">
        {displayPageCount > 1 && (showImages || useDomFallback) && (
          <nav className="live-preview-page-nav" aria-label="Page navigation">
            {Array.from({ length: displayPageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                className={`live-preview-page-dot ${activePage === i ? "active" : ""}`}
                onClick={() => scrollToPage(i)}
                aria-label={`Go to page ${i + 1}`}
                aria-current={activePage === i ? "true" : undefined}
              >
                {i + 1}
              </button>
            ))}
            <div className="live-preview-page-nav-divider" />
            <button
              type="button"
              className="live-preview-page-nav-arrow"
              onClick={() => scrollToPage(Math.max(0, activePage - 1))}
              disabled={activePage === 0}
              aria-label="Previous page"
            >
              <ChevronUp className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              className="live-preview-page-nav-arrow"
              onClick={() => scrollToPage(Math.min(displayPageCount - 1, activePage + 1))}
              disabled={activePage >= displayPageCount - 1}
              aria-label="Next page"
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </nav>
        )}

        <div ref={scrollRef} className="live-preview-stage">
          <div className="live-preview-stage-vignette" aria-hidden />
          <div className="live-preview-stage-inner">
            <div
              className={`live-preview-scaler ${isUpdating ? "live-preview-scaler--updating" : ""}`}
              style={{ width: scaledWidth, height: scaledHeight }}
            >
              <div
                className="live-preview-stack"
                style={{
                  width: A4_WIDTH_PX,
                  transform: `scale(${zoom})`,
                  transformOrigin: "top left",
                  transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {showImages
                  ? pageImages.map((src, pageIndex) => (
                      <div
                        key={pageIndex}
                        ref={(el) => {
                          pageRefs.current[pageIndex] = el;
                        }}
                      >
                        <PageImageSheet
                          src={src}
                          pageIndex={pageIndex}
                          pageCount={displayPageCount}
                          isActive={activePage === pageIndex}
                          onNavigate={() => scrollToPage(pageIndex)}
                        />
                      </div>
                    ))
                  : useDomFallback
                    ? Array.from({ length: pageCount }).map((_, pageIndex) => (
                        <div
                          key={pageIndex}
                          ref={(el) => {
                            pageRefs.current[pageIndex] = el;
                          }}
                        >
                          <DomPageSlice
                            pageIndex={pageIndex}
                            pageCount={pageCount}
                            isActive={activePage === pageIndex}
                            onNavigate={() => scrollToPage(pageIndex)}
                          >
                            <Template {...templateProps} />
                          </DomPageSlice>
                        </div>
                      ))
                    : Array.from({ length: pageCount }).map((_, i) => (
                        <div key={i} className="resume-page-sheet resume-page-sheet--skeleton">
                          <div
                            className="resume-page-viewport resume-page-skeleton"
                            style={{ width: A4_WIDTH_PX, height: A4_HEIGHT_PX }}
                          />
                        </div>
                      ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
