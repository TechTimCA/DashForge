import type { FontId } from "./types";

/**
 * DashForge's own typefaces (SIL Open Font License, bundled, work offline).
 * @font-face rules are ignored inside a shadow root, so they are added to the
 * page once; the files are served next to the panel script.
 */
export const FONTS: { id: FontId; name: string; file?: string; stack: string; note: string }[] = [
  { id: "sora", name: "Sora", file: "sora", stack: '"DF Sora"', note: "Modern and techy" },
  { id: "manrope", name: "Manrope", file: "manrope", stack: '"DF Manrope"', note: "Clean and friendly" },
  { id: "lexend", name: "Lexend", file: "lexend", stack: '"DF Lexend"', note: "Very easy to read" },
  { id: "nunito", name: "Nunito", file: "nunito", stack: '"DF Nunito"', note: "Soft and rounded" },
  { id: "dmsans", name: "DM Sans", file: "dm-sans", stack: '"DF DM Sans"', note: "Crisp and compact" },
  { id: "system", name: "Device font", stack: "", note: "Whatever your device uses" },
];

const SYSTEM = 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif';

const LATIN =
  "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD";
const LATIN_EXT =
  "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF";

export function fontStack(id: FontId | undefined): string {
  const f = FONTS.find((x) => x.id === id) ?? FONTS[0];
  return f.stack ? `${f.stack}, ${SYSTEM}` : SYSTEM;
}

let installed = false;

export function installFonts() {
  if (installed || typeof document === "undefined") return;
  installed = true;
  if (document.getElementById("dashforge-fonts")) return;
  const base = import.meta.url.replace(/[?#].*$/, "").replace(/\/[^/]*$/, "") + "/fonts";
  const rules = FONTS.filter((f) => f.file)
    .map((f) =>
      [
        [LATIN, "latin"],
        [LATIN_EXT, "latin-ext"],
      ]
        .map(
          ([range, subset]) =>
            `@font-face{font-family:${f.stack};font-style:normal;font-display:swap;font-weight:100 900;` +
            `src:url("${base}/${f.file}-${subset}-wght-normal.woff2") format("woff2-variations"),url("${base}/${f.file}-${subset}-wght-normal.woff2") format("woff2");unicode-range:${range};}`,
        )
        .join(""),
    )
    .join("");
  const style = document.createElement("style");
  style.id = "dashforge-fonts";
  style.textContent = rules;
  document.head.append(style);
}
