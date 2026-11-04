import type { CardConfig, CardSize, DashConfig, SectionConfig, ThemeConfig } from "./types";

export const uid = (): string =>
  Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);

type Panel = Record<string, string>;
export interface Background {
  id: string;
  name: string;
  light: string;
  dark: string;
  /** Card and panel colours that suit this background. */
  panel?: { light?: Panel; dark?: Panel };
}

const NAVY: Panel = {
  "--text": "#e7ecf6",
  "--muted": "#8b96ad",
  "--card-solid": "#131a2c",
  "--surface": "#151d31",
  "--surface-2": "#0f1526",
  "--card-border": "rgba(120,150,210,.16)",
  "--card-shadow": "none",
  "--icon-bg": "rgba(120,150,210,.1)",
  "--line": "rgba(120,150,210,.2)",
  "--chip": "#131a2c",
};
const GRAPHITE: Panel = {
  "--text": "#f4f5f7",
  "--muted": "#9aa0ae",
  "--card-solid": "#1c1e26",
  "--surface": "#1c1e26",
  "--surface-2": "#14161c",
  "--card-border": "rgba(255,255,255,.05)",
  "--card-shadow": "0 1px 2px rgba(0,0,0,.4)",
  "--icon-bg": "rgba(255,255,255,.07)",
  "--line": "rgba(255,255,255,.1)",
  "--chip": "#1c1e26",
};
const CHARCOAL: Panel = { ...GRAPHITE, "--card-solid": "#1e2027", "--surface": "#1e2027", "--surface-2": "#15171c", "--card-border": "rgba(255,255,255,.04)" };
const PAPER: Panel = {
  "--text": "#15171c",
  "--muted": "#5c6170",
  "--card-solid": "#ffffff",
  "--surface": "#ffffff",
  "--surface-2": "#e2e5eb",
  "--card-border": "transparent",
  "--card-shadow": "none",
  "--icon-bg": "#eceef2",
  "--line": "#d9dce3",
};
const AIRY: Panel = {
  "--text": "#1d2433",
  "--muted": "#5f677a",
  "--card": "rgba(255,255,255,.55)",
  "--card-border": "rgba(255,255,255,.7)",
  "--card-shadow": "0 1px 1px rgba(29,36,51,.04), 0 10px 30px -18px rgba(29,36,51,.35)",
  "--icon-bg": "rgba(29,36,51,.06)",
};

export const BACKGROUNDS: Background[] = [
  { id: "midnight", name: "Midnight", light: "linear-gradient(180deg,#eef0f6,#e3e6ef)", dark: "radial-gradient(circle at 20% -10%,#1d2030 0%,#121319 50%,#0c0d11 100%)", panel: { dark: GRAPHITE } },
  { id: "night", name: "Night sky", light: "linear-gradient(180deg,#e7ecf6,#dfe5f1)", dark: "radial-gradient(ellipse at 50% -20%,#1a2747 0%,#0e1424 55%,#0a0f1c 100%)", panel: { dark: NAVY } },
  { id: "daybreak", name: "Daybreak", light: "linear-gradient(170deg,#cfe0f5 0%,#e8e4f3 45%,#f8e3d6 100%)", dark: "linear-gradient(170deg,#1b2640 0%,#2c2a45 50%,#45303a 100%)", panel: { light: AIRY } },
  { id: "paper", name: "Paper", light: "#eceef2", dark: "#17181d", panel: { light: PAPER, dark: { ...GRAPHITE, "--card-solid": "#24262d", "--surface": "#24262d", "--card-border": "transparent", "--card-shadow": "none" } } },
  { id: "aurora", name: "Aurora", light: "linear-gradient(135deg,#e0f2fe 0%,#ede9fe 50%,#fce7f3 100%)", dark: "linear-gradient(135deg,#0f172a 0%,#1e1b4b 55%,#312e81 100%)" },
  { id: "northern", name: "Northern lights", light: "linear-gradient(160deg,#d9f7ee 0%,#dbeafe 50%,#ede4ff 100%)", dark: "radial-gradient(ellipse at 20% 0%,rgba(52,211,153,.35),transparent 55%),radial-gradient(ellipse at 80% 10%,rgba(139,92,246,.35),transparent 50%),#0b1220", panel: { dark: NAVY } },
  { id: "dusk", name: "Dusk", light: "linear-gradient(160deg,#f7d9c9 0%,#d5dcf2 55%,#ece3f6 100%)", dark: "linear-gradient(160deg,#1c2541 0%,#3a2d52 55%,#5b3448 100%)" },
  { id: "sunset", name: "Sunset", light: "linear-gradient(150deg,#fff7ed 0%,#ffe4e6 50%,#fef3c7 100%)", dark: "linear-gradient(150deg,#1c1917 0%,#431407 55%,#4c0519 100%)" },
  { id: "ember", name: "Ember", light: "linear-gradient(160deg,#ffedd5,#fee2e2)", dark: "radial-gradient(ellipse at 80% 100%,rgba(249,115,22,.35),transparent 55%),#140d0b", panel: { dark: CHARCOAL } },
  { id: "forest", name: "Forest", light: "linear-gradient(160deg,#ecfdf5 0%,#d1fae5 45%,#f0fdfa 100%)", dark: "linear-gradient(160deg,#052e16 0%,#064e3b 50%,#0f3d3e 100%)" },
  { id: "meadow", name: "Meadow", light: "linear-gradient(170deg,#f7fee7 0%,#dcfce7 50%,#e0f2fe 100%)", dark: "linear-gradient(170deg,#1a2e05 0%,#14532d 55%,#0c4a6e 100%)" },
  { id: "ocean", name: "Ocean", light: "linear-gradient(160deg,#eff6ff 0%,#dbeafe 50%,#e0f2fe 100%)", dark: "linear-gradient(160deg,#020617 0%,#0c4a6e 60%,#082f49 100%)" },
  { id: "lagoon", name: "Lagoon", light: "linear-gradient(150deg,#ccfbf1,#cffafe 50%,#e0e7ff)", dark: "linear-gradient(150deg,#042f2e,#083344 55%,#1e1b4b)" },
  { id: "candy", name: "Candy", light: "linear-gradient(135deg,#fce7f3 0%,#ede9fe 50%,#dbeafe 100%)", dark: "linear-gradient(135deg,#500724 0%,#3b0764 50%,#172554 100%)" },
  { id: "mesh", name: "Colour mesh", light: "radial-gradient(at 0% 0%,#fde68a 0,transparent 50%),radial-gradient(at 100% 0%,#f9a8d4 0,transparent 50%),radial-gradient(at 50% 100%,#93c5fd 0,transparent 55%),#f5f3ff", dark: "radial-gradient(at 0% 0%,rgba(234,179,8,.35) 0,transparent 50%),radial-gradient(at 100% 0%,rgba(236,72,153,.35) 0,transparent 50%),radial-gradient(at 50% 100%,rgba(59,130,246,.4) 0,transparent 55%),#0b0b14", panel: { dark: GRAPHITE } },
  { id: "homey", name: "Charcoal", light: "linear-gradient(180deg,#f3f4f7 0%,#e6e8ee 100%)", dark: "radial-gradient(circle at 15% 0%,#262a33 0%,#14161b 55%,#0d0e12 100%)", panel: { dark: CHARCOAL } },
  { id: "graphite", name: "Graphite", light: "linear-gradient(180deg,#f8fafc 0%,#e2e8f0 100%)", dark: "linear-gradient(180deg,#09090b 0%,#18181b 100%)" },
  { id: "slate", name: "Slate", light: "#e8ecf1", dark: "#1e2530", panel: { dark: { ...GRAPHITE, "--card-solid": "#28303d", "--surface": "#28303d" } } },
  { id: "plain", name: "Plain", light: "#f4f4f5", dark: "#111113" },
];

/** One tap to a complete look; every part can still be changed afterwards. */
export const STYLE_PRESETS: {
  id: import("./types").StyleId;
  name: string;
  desc: string;
  theme: Partial<import("./types").ThemeConfig>;
}[] = [
  {
    id: "vivid",
    name: "Vivid",
    desc: "Dark and colourful: bright gradient tiles that pop when devices are on.",
    theme: { style: "vivid", font: "sora", shape: "tiles", color: "gradient", icons: "dashforge", titles: "normal", nav: "auto", mode: "dark", background: "midnight", cardStyle: "solid", radius: 22, accent: "#6366f1" },
  },
  {
    id: "daylight",
    name: "Daylight",
    desc: "Calm and airy over a dawn sky. Big room names, devices in soft rows.",
    theme: { style: "daylight", font: "manrope", shape: "rows", color: "soft", icons: "dashforge", titles: "big", nav: "auto", mode: "light", background: "daybreak", cardStyle: "glass", radius: 26, accent: "#f59e0b" },
  },
  {
    id: "blocks",
    name: "Blocks",
    desc: "Flat, saturated colour blocks and bold type. Playful and easy to read.",
    theme: { style: "blocks", font: "sora", shape: "blocks", color: "flat", icons: "dashforge", titles: "bold", nav: "auto", mode: "light", background: "paper", cardStyle: "solid", radius: 28, accent: "#3156ff" },
  },
  {
    id: "console",
    name: "Console",
    desc: "A night-blue instrument panel with glowing dials and an app-style dock.",
    theme: { style: "console", font: "lexend", shape: "dials", color: "glow", icons: "dashforge", titles: "light", nav: "dock", mode: "dark", background: "night", cardStyle: "solid", radius: 22, accent: "#3fd8ff" },
  },
  {
    id: "dashforge",
    name: "DashForge",
    desc: "Soft gradients and frosted cards with live colour.",
    theme: { style: "dashforge", font: "manrope", shape: "tiles", color: "tint", icons: "dashforge", titles: "normal", nav: "auto", mode: "auto", background: "aurora", cardStyle: "glass", radius: 20, accent: "#3b82f6" },
  },
  {
    id: "apple",
    name: "Apple Home style",
    desc: "Compact frosted tiles that turn white when on, over a wallpaper.",
    theme: { style: "apple", font: "system", shape: "pills", color: "white", icons: "dashforge", titles: "big", nav: "auto", mode: "auto", background: "dusk", cardStyle: "glass", radius: 18, accent: "#ff9f0a" },
  },
  {
    id: "homey",
    name: "Homey style",
    desc: "Dark, square tiles with colour-coded device icons.",
    theme: { style: "homey", font: "nunito", shape: "squares", color: "ring", icons: "dashforge", titles: "normal", nav: "auto", mode: "dark", background: "homey", cardStyle: "solid", radius: 22, accent: "#3b82f6" },
  },
  {
    id: "minimal",
    name: "Minimal",
    desc: "Flat, quiet and high contrast. Lots of space.",
    theme: { style: "minimal", font: "dmsans", shape: "tiles", color: "outline", icons: "dashforge", titles: "normal", nav: "auto", mode: "light", background: "plain", cardStyle: "solid", radius: 12, accent: "#18181b" },
  },
];

export const ACCENTS = [
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#14b8a6",
  "#64748b",
];

export function defaultConfig(): DashConfig {
  return {
    schema: 1,
    setupComplete: false,
    title: "Home",
    userName: "",
    layout: "auto",
    theme: {
      style: "vivid",
      font: "sora",
      shape: "tiles",
      color: "gradient",
      icons: "dashforge",
      titles: "normal",
      nav: "auto",
      mode: "dark",
      accent: "#6366f1",
      background: "midnight",
      cardStyle: "solid",
      radius: 22,
      density: "comfortable",
    },
    header: {
      clock: true,
      clock24h: false,
      showDate: true,
      greeting: true,
      weatherFallback: false,
      calendars: [],
      todoLists: [],
      sceneStrip: [],
    },
    tablet: {
      screensaver: false,
      screensaverMinutes: 5,
      screensaverStyle: "clock",
      hideSidebar: false,
      returnHomeMinutes: 0,
    },
    builtinPages: { home: true, media: true, security: true, scenes: true, irrigation: false },
    home: { summary: true, favorites: true, rooms: true },
    irrigation: { zones: [], minutes: 10, presets: [5, 10, 15, 30] },
    sections: [],
  };
}

/** Every option a style preset sets, so older saves pick up sensible defaults. */
function presetTheme(style?: string): Partial<ThemeConfig> {
  const p = STYLE_PRESETS.find((x) => x.id === style);
  if (!p) return {};
  const { mode: _m, background: _b, accent: _a, radius: _r, cardStyle: _c, ...axes } = p.theme;
  return axes;
}

/** Fill in anything missing from a saved config so older saves keep working. */
export function normalizeConfig(raw: unknown): DashConfig {
  const base = defaultConfig();
  if (!raw || typeof raw !== "object") return base;
  const c = raw as Partial<DashConfig>;
  return {
    ...base,
    ...c,
    schema: 1,
    theme: { ...base.theme, ...presetTheme(c.theme?.style), ...(c.theme ?? {}) },
    header: { ...base.header, ...(c.header ?? {}) },
    tablet: { ...base.tablet, ...(c.tablet ?? {}) },
    builtinPages: { ...base.builtinPages, ...(c.builtinPages ?? {}) },
    home: { ...base.home, ...(c.home ?? {}) },
    irrigation: { ...base.irrigation, ...(c.irrigation ?? {}) },
    sections: Array.isArray(c.sections)
      ? c.sections.map((s) => ({
          ...s,
          cards: Array.isArray(s.cards) ? s.cards.filter((x) => x && x.entity) : [],
        }))
      : [],
  };
}

export const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v));

export function newCard(entity: string, size: CardSize = "sm"): CardConfig {
  return { id: uid(), entity, size };
}

export function newSection(
  kind: SectionConfig["kind"],
  name: string,
  icon: string,
  areaId?: string,
): SectionConfig {
  return { id: uid(), kind, name, icon, areaId, cards: [] };
}
