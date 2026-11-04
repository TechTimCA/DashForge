import type { CardConfig, CardSize, DashConfig, SectionConfig } from "./types";

export const uid = (): string =>
  Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);

export const BACKGROUNDS: { id: string; name: string; light: string; dark: string }[] = [
  {
    id: "midnight",
    name: "Midnight",
    light: "linear-gradient(180deg,#eef0f6 0%,#e3e6ef 100%)",
    dark: "radial-gradient(circle at 20% -10%,#1d2030 0%,#121319 50%,#0c0d11 100%)",
  },
  {
    id: "aurora",
    name: "Aurora",
    light: "linear-gradient(135deg,#e0f2fe 0%,#ede9fe 50%,#fce7f3 100%)",
    dark: "linear-gradient(135deg,#0f172a 0%,#1e1b4b 55%,#312e81 100%)",
  },
  {
    id: "forest",
    name: "Forest",
    light: "linear-gradient(160deg,#ecfdf5 0%,#d1fae5 45%,#f0fdfa 100%)",
    dark: "linear-gradient(160deg,#052e16 0%,#064e3b 50%,#0f3d3e 100%)",
  },
  {
    id: "sunset",
    name: "Sunset",
    light: "linear-gradient(150deg,#fff7ed 0%,#ffe4e6 50%,#fef3c7 100%)",
    dark: "linear-gradient(150deg,#1c1917 0%,#431407 55%,#4c0519 100%)",
  },
  {
    id: "ocean",
    name: "Ocean",
    light: "linear-gradient(160deg,#eff6ff 0%,#dbeafe 50%,#e0f2fe 100%)",
    dark: "linear-gradient(160deg,#020617 0%,#0c4a6e 60%,#082f49 100%)",
  },
  {
    id: "graphite",
    name: "Graphite",
    light: "linear-gradient(180deg,#f8fafc 0%,#e2e8f0 100%)",
    dark: "linear-gradient(180deg,#09090b 0%,#18181b 100%)",
  },
  { id: "plain", name: "Plain", light: "#f4f4f5", dark: "#111113" },
  {
    id: "dusk",
    name: "Dusk",
    light: "linear-gradient(160deg,#f7d9c9 0%,#d5dcf2 55%,#ece3f6 100%)",
    dark: "linear-gradient(160deg,#1c2541 0%,#3a2d52 55%,#5b3448 100%)",
  },
  {
    id: "homey",
    name: "Charcoal",
    light: "linear-gradient(180deg,#f3f4f7 0%,#e6e8ee 100%)",
    dark: "radial-gradient(circle at 15% 0%,#262a33 0%,#14161b 55%,#0d0e12 100%)",
  },
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
    theme: { style: "vivid", font: "sora", mode: "dark", background: "midnight", cardStyle: "solid", radius: 22, accent: "#6366f1" },
  },
  {
    id: "dashforge",
    name: "DashForge",
    desc: "Soft gradients and frosted cards with live colour.",
    theme: { style: "dashforge", font: "manrope", background: "aurora", cardStyle: "glass", radius: 20, accent: "#3b82f6" },
  },
  {
    id: "apple",
    name: "Apple Home style",
    desc: "Compact frosted tiles that turn white when on, over a wallpaper.",
    theme: { style: "apple", font: "system", background: "dusk", cardStyle: "glass", radius: 18, accent: "#ff9f0a" },
  },
  {
    id: "homey",
    name: "Homey style",
    desc: "Dark, square tiles with colour-coded device icons.",
    theme: { style: "homey", font: "nunito", mode: "dark", background: "homey", cardStyle: "solid", radius: 22, accent: "#3b82f6" },
  },
  {
    id: "minimal",
    name: "Minimal",
    desc: "Flat, quiet and high contrast. Lots of space.",
    theme: { style: "minimal", font: "dmsans", background: "plain", cardStyle: "solid", radius: 12, accent: "#18181b" },
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

/** Fill in anything missing from a saved config so older saves keep working. */
export function normalizeConfig(raw: unknown): DashConfig {
  const base = defaultConfig();
  if (!raw || typeof raw !== "object") return base;
  const c = raw as Partial<DashConfig>;
  return {
    ...base,
    ...c,
    schema: 1,
    theme: { ...base.theme, ...(c.theme ?? {}) },
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
