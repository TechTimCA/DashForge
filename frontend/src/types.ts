// ---------- Home Assistant (the parts DashForge uses) ----------

export interface HassEntityState {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
  last_updated: string;
}

export interface HassArea {
  area_id: string;
  name: string;
  icon?: string | null;
  picture?: string | null;
  floor_id?: string | null;
}

export interface HassFloor {
  floor_id: string;
  name: string;
  level?: number | null;
  icon?: string | null;
}

export interface HassDevice {
  id: string;
  area_id?: string | null;
  name?: string | null;
  name_by_user?: string | null;
}

export interface HassEntityEntry {
  entity_id: string;
  device_id?: string | null;
  area_id?: string | null;
  name?: string | null;
  icon?: string | null;
  hidden?: boolean;
  entity_category?: string | null;
  platform?: string;
}

export interface HassConnection {
  subscribeMessage<T>(
    callback: (msg: T) => void,
    msg: Record<string, unknown>,
  ): Promise<() => Promise<void>>;
}

export interface Hass {
  states: Record<string, HassEntityState>;
  areas?: Record<string, HassArea>;
  floors?: Record<string, HassFloor>;
  devices?: Record<string, HassDevice>;
  entities?: Record<string, HassEntityEntry>;
  services: Record<string, Record<string, unknown>>;
  user?: { id: string; name: string; is_admin: boolean };
  language: string;
  locale?: { language: string; time_format?: string };
  themes?: { darkMode?: boolean };
  config: {
    latitude: number;
    longitude: number;
    location_name: string;
    time_zone: string;
    unit_system: { temperature: string };
  };
  connection: HassConnection;
  callService(
    domain: string,
    service: string,
    data?: Record<string, unknown>,
    target?: Record<string, unknown>,
  ): Promise<unknown>;
  callWS<T>(msg: Record<string, unknown>): Promise<T>;
  callApi<T>(method: "GET" | "POST", path: string, body?: unknown): Promise<T>;
  hassUrl(path?: string): string;
  formatEntityState?(stateObj: HassEntityState, state?: string): string;
}

// ---------- DashForge configuration ----------

export type LayoutId = "auto" | "grid" | "sidebar" | "list" | "focus";
export type CardSize = "sm" | "md" | "lg" | "wide";
export type StyleId = "vivid" | "dashforge" | "apple" | "homey" | "minimal";
export type TapOverride = "auto" | "toggle" | "details" | "more-info" | "none";

export interface CardConfig {
  id: string;
  entity: string;
  name?: string;
  icon?: string;
  size: CardSize;
  hidden?: boolean;
  color?: string;
  tap?: TapOverride;
  favorite?: boolean;
  live?: boolean; // cameras: live MJPEG view instead of snapshots
}

export interface SectionConfig {
  id: string;
  kind: "room" | "page";
  name: string;
  icon: string;
  areaId?: string;
  floorId?: string;
  background?: string; // image URL shown behind this room
  cards: CardConfig[];
}

export interface ThemeConfig {
  style: StyleId;
  mode: "auto" | "light" | "dark";
  accent: string;
  background: string; // preset id or "image"
  backgroundImage?: string;
  cardStyle: "glass" | "solid";
  radius: number;
  density: "comfortable" | "compact";
}

export interface HeaderConfig {
  clock: boolean;
  clock24h: boolean;
  showDate: boolean;
  greeting: boolean;
  weatherEntity?: string;
  weatherFallback: boolean; // use Open-Meteo when no weather entity is chosen
  calendars: string[];
  todoLists: string[];
  sceneStrip: string[];
  mediaPlayer?: string;
}

export interface TabletConfig {
  screensaver: boolean;
  screensaverMinutes: number;
  screensaverStyle: "clock" | "dim" | "black";
  hideSidebar: boolean;
  returnHomeMinutes: number; // 0 = never
}

export interface BuiltinPages {
  home: boolean;
  media: boolean;
  security: boolean;
  scenes: boolean;
  irrigation: boolean;
}

export interface HomeConfig {
  summary: boolean;
  favorites: boolean;
  rooms: boolean;
}

export interface IrrigationConfig {
  zones: string[];
  minutes: number;
  presets: number[];
}

export interface DashConfig {
  schema: 1;
  setupComplete: boolean;
  title: string;
  userName: string;
  layout: LayoutId;
  theme: ThemeConfig;
  header: HeaderConfig;
  tablet: TabletConfig;
  builtinPages: BuiltinPages;
  home: HomeConfig;
  irrigation: IrrigationConfig;
  sections: SectionConfig[];
}
