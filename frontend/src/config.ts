import type { CardConfig, CardSize, DashConfig, SectionConfig } from "./types";

export const uid = (): string =>
  Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);

export const BACKGROUNDS: { id: string; name: string; light: string; dark: string }[] = [
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
    layout: "grid",
    theme: {
      mode: "auto",
      accent: ACCENTS[0],
      background: "aurora",
      cardStyle: "glass",
      radius: 20,
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
    builtinPages: { media: true, security: true, scenes: true },
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
