import { ColorScheme } from "@/contexts/ResumeContext";

const KNOWN_BLUE_HEX = new Set([
  "#007bff",
  "#1d4ed8",
  "#2563eb",
  "#2c5282",
  "#3182ce",
  "#4299e1",
  "#646cff",
  "#0f172a",
  "#334155",
  "#475569",
]);

function normalizeHex(hex: string): string {
  const h = hex.trim().toLowerCase();
  if (/^#[0-9a-f]{3}$/.test(h)) {
    return `#${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}`;
  }
  return h;
}

/** Detect blue-ish hex colors (high blue channel vs red/green). */
export function isBlueColor(hex: string): boolean {
  const normalized = normalizeHex(hex);
  if (KNOWN_BLUE_HEX.has(normalized)) return true;

  const raw = normalized.replace("#", "");
  if (raw.length !== 6) return false;

  const r = parseInt(raw.slice(0, 2), 16);
  const g = parseInt(raw.slice(2, 4), 16);
  const b = parseInt(raw.slice(4, 6), 16);

  return b > 120 && b > r + 30 && b >= g;
}

export function blueToBlack(hex: string): string {
  return isBlueColor(hex) ? "#000000" : hex;
}

/** Replace any blue tones in a saved scheme with black. */
export function sanitizeColorScheme(scheme: ColorScheme): ColorScheme {
  return {
    primary: blueToBlack(scheme.primary),
    secondary: blueToBlack(scheme.secondary),
    background: scheme.background,
    text: isBlueColor(scheme.text) ? "#000000" : scheme.text,
  };
}
