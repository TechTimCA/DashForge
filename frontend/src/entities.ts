import type { CardConfig, CardSize, Hass, HassEntityState } from "./types";

export const domainOf = (entityId: string) => entityId.split(".")[0];

/** Domains that make sense on a dashboard. */
export const DASH_DOMAINS = new Set([
  "light",
  "switch",
  "fan",
  "cover",
  "climate",
  "lock",
  "media_player",
  "input_boolean",
  "vacuum",
  "humidifier",
  "valve",
  "siren",
  "sensor",
  "binary_sensor",
  "camera",
  "scene",
  "script",
  "button",
  "input_button",
  "alarm_control_panel",
  "number",
  "input_number",
  "select",
  "input_select",
  "weather",
  "person",
  "automation",
  "water_heater",
  "lawn_mower",
  "remote",
  "counter",
  "timer",
  "input_text",
  "text",
  "input_datetime",
  "date",
  "time",
  "datetime",
  "update",
  "device_tracker",
  "event",
  "group",
  "image",
  "todo",
  "calendar",
]);

const TOGGLE_DOMAINS = new Set([
  "light",
  "switch",
  "fan",
  "input_boolean",
  "siren",
  "humidifier",
  "automation",
  "remote",
]);

const CONTROL_DOMAINS = new Set([
  ...TOGGLE_DOMAINS,
  "cover",
  "climate",
  "lock",
  "media_player",
  "vacuum",
  "valve",
  "alarm_control_panel",
  "water_heater",
  "lawn_mower",
]);

export const isUnavailable = (s?: HassEntityState) =>
  !s || s.state === "unavailable" || s.state === "unknown";

export function isActive(s?: HassEntityState): boolean {
  if (!s || isUnavailable(s)) return false;
  const d = domainOf(s.entity_id);
  switch (d) {
    case "cover":
    case "valve":
      return s.state === "open" || s.state === "opening";
    case "lock":
      return s.state !== "locked";
    case "climate":
    case "water_heater":
      return s.state !== "off";
    case "media_player":
      return s.state === "playing";
    case "vacuum":
      return s.state === "cleaning";
    case "lawn_mower":
      return s.state === "mowing";
    case "timer":
      return s.state === "active";
    case "device_tracker":
      return s.state === "home";
    case "alarm_control_panel":
      return s.state.startsWith("armed") || s.state === "triggered";
    case "person":
      return s.state === "home";
    case "sensor":
    case "camera":
    case "weather":
    case "number":
    case "input_number":
    case "select":
    case "input_select":
    case "counter":
    case "input_text":
    case "text":
    case "input_datetime":
    case "date":
    case "time":
    case "datetime":
    case "event":
    case "image":
    case "todo":
      return false;
    default:
      return s.state === "on";
  }
}

export type TapAction =
  | "toggle"
  | "activate"
  | "press"
  | "lock"
  | "media"
  | "details"
  | "todo"
  | "calendar"
  | "weather";

export function tapAction(entityId: string, state?: HassEntityState): TapAction {
  const d = domainOf(entityId);
  if (TOGGLE_DOMAINS.has(d) || d === "cover" || d === "valve") return "toggle";
  if (d === "group") return state && (state.state === "on" || state.state === "off") ? "toggle" : "details";
  if (d === "todo" || d === "calendar" || d === "weather") return d;
  if (d === "scene" || d === "script") return "activate";
  if (d === "button" || d === "input_button") return "press";
  if (d === "lock") return "lock";
  if (d === "media_player") return "media";
  return "details";
}

export const isControllable = (entityId: string) => CONTROL_DOMAINS.has(domainOf(entityId));

const DOMAIN_ICONS: Record<string, [string, string?]> = {
  light: ["mdi:lightbulb", "mdi:lightbulb-outline"],
  switch: ["mdi:toggle-switch", "mdi:toggle-switch-off-outline"],
  input_boolean: ["mdi:toggle-switch", "mdi:toggle-switch-off-outline"],
  fan: ["mdi:fan", "mdi:fan-off"],
  cover: ["mdi:window-shutter-open", "mdi:window-shutter"],
  valve: ["mdi:valve-open", "mdi:valve-closed"],
  climate: ["mdi:thermostat"],
  water_heater: ["mdi:water-boiler"],
  lock: ["mdi:lock-open-variant", "mdi:lock"],
  media_player: ["mdi:speaker-play", "mdi:speaker"],
  vacuum: ["mdi:robot-vacuum"],
  humidifier: ["mdi:air-humidifier", "mdi:air-humidifier-off"],
  siren: ["mdi:bullhorn"],
  sensor: ["mdi:eye"],
  binary_sensor: ["mdi:checkbox-marked-circle", "mdi:checkbox-blank-circle-outline"],
  camera: ["mdi:cctv"],
  scene: ["mdi:palette"],
  script: ["mdi:script-text-play"],
  button: ["mdi:gesture-tap-button"],
  input_button: ["mdi:gesture-tap-button"],
  alarm_control_panel: ["mdi:shield-lock", "mdi:shield-off"],
  number: ["mdi:ray-vertex"],
  input_number: ["mdi:ray-vertex"],
  select: ["mdi:format-list-bulleted"],
  input_select: ["mdi:format-list-bulleted"],
  weather: ["mdi:weather-partly-cloudy"],
  person: ["mdi:account", "mdi:account-outline"],
  automation: ["mdi:robot", "mdi:robot-off"],
  lawn_mower: ["mdi:robot-mower", "mdi:robot-mower-outline"],
  remote: ["mdi:remote", "mdi:remote-off"],
  counter: ["mdi:counter"],
  timer: ["mdi:timer-outline", "mdi:timer-off-outline"],
  input_text: ["mdi:form-textbox"],
  text: ["mdi:form-textbox"],
  input_datetime: ["mdi:calendar-clock"],
  date: ["mdi:calendar"],
  time: ["mdi:clock-outline"],
  datetime: ["mdi:calendar-clock"],
  update: ["mdi:package-up", "mdi:package"],
  device_tracker: ["mdi:map-marker", "mdi:map-marker-off"],
  event: ["mdi:gesture-tap"],
  group: ["mdi:google-circles-communities"],
  image: ["mdi:image"],
  todo: ["mdi:clipboard-list"],
  calendar: ["mdi:calendar"],
};

/** Device categories, used for the colour-coded Homey style. */
export const CATEGORY_COLORS: Record<string, string> = {
  light: "#f5b400",
  power: "#22c55e",
  climate: "#f97316",
  cover: "#14b8a6",
  water: "#3b82f6",
  security: "#ef4444",
  media: "#a855f7",
  robot: "#84cc16",
  sensor: "#64748b",
  scene: "#6366f1",
  info: "#0ea5e9",
};

/** Bright gradients for the Vivid style, one per device category. */
export const CATEGORY_GRADIENTS: Record<string, string> = {
  light: "linear-gradient(135deg,#fbbf24 0%,#f97316 100%)",
  power: "linear-gradient(135deg,#34d399 0%,#06b6d4 100%)",
  climate: "linear-gradient(135deg,#fb923c 0%,#ef4444 100%)",
  cover: "linear-gradient(135deg,#22d3ee 0%,#3b82f6 100%)",
  water: "linear-gradient(135deg,#38bdf8 0%,#6366f1 100%)",
  security: "linear-gradient(135deg,#f43f5e 0%,#c026d3 100%)",
  media: "linear-gradient(135deg,#a855f7 0%,#ec4899 100%)",
  robot: "linear-gradient(135deg,#a3e635 0%,#10b981 100%)",
  sensor: "linear-gradient(135deg,#64748b 0%,#334155 100%)",
  scene: "linear-gradient(135deg,#818cf8 0%,#a855f7 100%)",
  info: "linear-gradient(135deg,#38bdf8 0%,#2563eb 100%)",
};

export function categoryOf(entityId: string, s?: HassEntityState): string {
  const d = domainOf(entityId);
  switch (d) {
    case "light":
      return "light";
    case "switch":
    case "input_boolean":
    case "remote":
    case "group":
    case "automation":
    case "siren":
      return "power";
    case "fan":
    case "climate":
    case "water_heater":
    case "humidifier":
      return "climate";
    case "cover":
      return "cover";
    case "valve":
      return "water";
    case "lock":
    case "alarm_control_panel":
    case "camera":
      return "security";
    case "binary_sensor": {
      const dc = s?.attributes.device_class;
      if (["door", "window", "garage_door", "opening", "motion", "occupancy", "smoke", "safety", "lock", "tamper"].includes(dc)) return "security";
      if (dc === "moisture") return "water";
      return "sensor";
    }
    case "media_player":
      return "media";
    case "vacuum":
    case "lawn_mower":
      return "robot";
    case "scene":
    case "script":
    case "button":
    case "input_button":
      return "scene";
    case "weather":
    case "calendar":
    case "todo":
    case "person":
    case "device_tracker":
    case "update":
      return "info";
    case "sensor": {
      const dc = s?.attributes.device_class;
      if (dc === "temperature") return "climate";
      if (dc === "humidity" || dc === "moisture" || dc === "water" || dc === "precipitation") return "water";
      if (dc === "power" || dc === "energy" || dc === "voltage" || dc === "current" || dc === "battery") return "power";
      return "sensor";
    }
    default:
      return "sensor";
  }
}

const IRRIGATION_WORDS = /zone|sprinkler|irrigat|drip|lawn|garden|hose|station|water(ing)?/i;
const IRRIGATION_DOMAINS = new Set(["switch", "valve", "input_boolean"]);

/** Switches or valves that look like watering zones. Only a suggestion; the user decides. */
export function isIrrigationCandidate(hass: Hass, entityId: string): boolean {
  const d = domainOf(entityId);
  if (!IRRIGATION_DOMAINS.has(d)) return false;
  const s = hass.states[entityId];
  if (d === "valve" && s?.attributes.device_class === "water") return true;
  const name = `${entityId} ${s?.attributes.friendly_name ?? ""}`;
  return IRRIGATION_WORDS.test(name);
}

const SENSOR_CLASS_ICONS: Record<string, string> = {
  temperature: "mdi:thermometer",
  humidity: "mdi:water-percent",
  battery: "mdi:battery",
  power: "mdi:flash",
  energy: "mdi:lightning-bolt",
  illuminance: "mdi:brightness-5",
  pressure: "mdi:gauge",
  carbon_dioxide: "mdi:molecule-co2",
  pm25: "mdi:blur",
  moisture: "mdi:water",
  voltage: "mdi:sine-wave",
  current: "mdi:current-ac",
  gas: "mdi:meter-gas",
  water: "mdi:water",
};

const BINARY_CLASS_ICONS: Record<string, [string, string]> = {
  door: ["mdi:door-open", "mdi:door-closed"],
  garage_door: ["mdi:garage-open", "mdi:garage"],
  window: ["mdi:window-open", "mdi:window-closed"],
  opening: ["mdi:square-outline", "mdi:square"],
  motion: ["mdi:motion-sensor", "mdi:motion-sensor-off"],
  occupancy: ["mdi:home-account", "mdi:home-outline"],
  presence: ["mdi:home-account", "mdi:home-outline"],
  moisture: ["mdi:water-alert", "mdi:water-off"],
  smoke: ["mdi:smoke-detector-alert", "mdi:smoke-detector"],
  battery: ["mdi:battery-alert", "mdi:battery"],
  connectivity: ["mdi:lan-connect", "mdi:lan-disconnect"],
  plug: ["mdi:power-plug", "mdi:power-plug-off"],
};

const COVER_CLASS_ICONS: Record<string, [string, string]> = {
  garage: ["mdi:garage-open", "mdi:garage"],
  door: ["mdi:door-open", "mdi:door-closed"],
  gate: ["mdi:gate-open", "mdi:gate"],
  blind: ["mdi:blinds-open", "mdi:blinds"],
  curtain: ["mdi:curtains", "mdi:curtains-closed"],
  shade: ["mdi:roller-shade", "mdi:roller-shade-closed"],
  shutter: ["mdi:window-shutter-open", "mdi:window-shutter"],
  window: ["mdi:window-open", "mdi:window-closed"],
  awning: ["mdi:awning-outline", "mdi:awning-outline"],
};

export function entityIcon(hass: Hass, entityId: string, card?: CardConfig): string {
  if (card?.icon) return card.icon;
  const entry = hass.entities?.[entityId];
  if (entry?.icon) return entry.icon;
  const s = hass.states[entityId];
  if (s?.attributes.icon) return s.attributes.icon;
  const d = domainOf(entityId);
  const dc = s?.attributes.device_class;
  if (d === "sensor" && dc && SENSOR_CLASS_ICONS[dc]) return SENSOR_CLASS_ICONS[dc];
  if (d === "cover" && dc && COVER_CLASS_ICONS[dc]) {
    const [open, closed] = COVER_CLASS_ICONS[dc];
    return s?.state === "closed" ? closed : open;
  }
  if (d === "binary_sensor" && dc && BINARY_CLASS_ICONS[dc]) {
    const [on, off] = BINARY_CLASS_ICONS[dc];
    return s?.state === "on" ? on : off;
  }
  const pair = DOMAIN_ICONS[d] ?? ["mdi:help-circle-outline"];
  return isActive(s) || !pair[1] ? pair[0] : pair[1];
}

/** Friendly name, with the room name trimmed off the front ("Kitchen Lamp" → "Lamp"). */
export function entityName(
  hass: Hass,
  entityId: string,
  card?: CardConfig,
  roomName?: string,
): string {
  if (card?.name) return card.name;
  const s = hass.states[entityId];
  let name: string = s?.attributes.friendly_name ?? hass.entities?.[entityId]?.name ?? entityId;
  if (roomName) {
    const prefix = roomName.toLowerCase() + " ";
    if (name.toLowerCase().startsWith(prefix) && name.length > prefix.length + 1) {
      name = name.slice(prefix.length);
      name = name.charAt(0).toUpperCase() + name.slice(1);
    }
  }
  return name;
}

const BINARY_LABELS: Record<string, [string, string]> = {
  door: ["Open", "Closed"],
  garage_door: ["Open", "Closed"],
  window: ["Open", "Closed"],
  opening: ["Open", "Closed"],
  motion: ["Motion", "Clear"],
  occupancy: ["Occupied", "Clear"],
  presence: ["Home", "Away"],
  moisture: ["Wet", "Dry"],
  smoke: ["Smoke!", "Clear"],
  battery: ["Low", "OK"],
  connectivity: ["Connected", "Offline"],
  lock: ["Unlocked", "Locked"],
  plug: ["Plugged in", "Unplugged"],
};

const titleCase = (s: string) =>
  s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export function stateLabel(hass: Hass, s?: HassEntityState): string {
  if (!s) return "Not found";
  if (s.state === "unavailable") return "Unavailable";
  if (s.state === "unknown") return "Unknown";
  const d = domainOf(s.entity_id);
  if (d === "binary_sensor") {
    const pair = BINARY_LABELS[s.attributes.device_class] ?? ["On", "Off"];
    return s.state === "on" ? pair[0] : pair[1];
  }
  if (d === "light" && s.state === "on" && s.attributes.brightness != null) {
    return `${Math.round((s.attributes.brightness / 255) * 100)}%`;
  }
  if (d === "cover" && s.attributes.current_position != null && s.state === "open") {
    return `Open · ${s.attributes.current_position}%`;
  }
  if (d === "climate") {
    const a = s.attributes;
    const mode = titleCase(a.hvac_action ?? s.state);
    if (a.temperature != null) return `${mode} · ${a.temperature}°`;
    if (a.target_temp_low != null && a.target_temp_high != null)
      return `${mode} · ${a.target_temp_low}–${a.target_temp_high}°`;
    return a.current_temperature != null ? `${mode} · ${a.current_temperature}°` : mode;
  }
  if (d === "media_player" && s.attributes.media_title) {
    return s.attributes.media_artist
      ? `${s.attributes.media_title} · ${s.attributes.media_artist}`
      : s.attributes.media_title;
  }
  if (d === "scene" || d === "script" || d === "button" || d === "input_button") {
    return d === "script" && s.state === "on" ? "Running" : "Tap to run";
  }
  if (d === "todo") {
    const n = Number(s.state) || 0;
    return n === 0 ? "All done" : n === 1 ? "1 to do" : `${n} to do`;
  }
  if (d === "calendar") {
    return s.state === "on" ? `Now: ${s.attributes.message ?? "event"}` : s.attributes.message ? `Next: ${s.attributes.message}` : "No events";
  }
  if (d === "weather" && s.attributes.temperature != null) {
    const cond = s.state === "partlycloudy" ? "Partly cloudy" : titleCase(s.state.replace(/-/g, " "));
    return `${Math.round(s.attributes.temperature)}° · ${cond}`;
  }
  if (d === "update") {
    return s.state === "on" ? `Update to ${s.attributes.latest_version ?? "new version"}` : "Up to date";
  }
  if (hass.formatEntityState) {
    try {
      return hass.formatEntityState(s);
    } catch {
      /* fall through */
    }
  }
  const unit = s.attributes.unit_of_measurement;
  const num = Number(s.state);
  if (unit && !Number.isNaN(num)) {
    const rounded = Math.abs(num) >= 100 ? Math.round(num) : Math.round(num * 10) / 10;
    return `${rounded} ${unit}`;
  }
  return titleCase(s.state);
}

// ---------- Suggestions for the setup wizard ----------

function entityArea(hass: Hass, entityId: string): string | null {
  const entry = hass.entities?.[entityId];
  if (!entry) return null;
  if (entry.area_id) return entry.area_id;
  if (entry.device_id) return hass.devices?.[entry.device_id]?.area_id ?? null;
  return null;
}

export function isDashboardEntity(hass: Hass, entityId: string): boolean {
  if (!DASH_DOMAINS.has(domainOf(entityId))) return false;
  const entry = hass.entities?.[entityId];
  if (entry?.hidden || entry?.entity_category) return false;
  return true;
}

export function entitiesInArea(hass: Hass, areaId: string): string[] {
  return Object.keys(hass.states)
    .filter((id) => isDashboardEntity(hass, id) && entityArea(hass, id) === areaId)
    .sort(byImportance(hass));
}

export function entitiesWithoutArea(hass: Hass): string[] {
  return Object.keys(hass.states)
    .filter((id) => isDashboardEntity(hass, id) && !entityArea(hass, id))
    .sort(byImportance(hass));
}

const RECOMMENDED_SENSORS = new Set(["temperature", "humidity", "carbon_dioxide", "pm25"]);
const RECOMMENDED_BINARY = new Set([
  "door",
  "garage_door",
  "window",
  "opening",
  "motion",
  "occupancy",
  "moisture",
  "smoke",
]);

/** Whether the wizard should tick this entity by default (the user can untick it). */
export function isRecommended(hass: Hass, entityId: string): boolean {
  const d = domainOf(entityId);
  if (CONTROL_DOMAINS.has(d) || d === "camera") return d !== "automation";
  const dc = hass.states[entityId]?.attributes.device_class;
  if (d === "sensor") return RECOMMENDED_SENSORS.has(dc);
  if (d === "binary_sensor") return RECOMMENDED_BINARY.has(dc);
  return false;
}

const DOMAIN_ORDER = [
  "light",
  "switch",
  "fan",
  "cover",
  "valve",
  "climate",
  "media_player",
  "lock",
  "camera",
  "vacuum",
  "humidifier",
  "alarm_control_panel",
  "scene",
  "script",
  "button",
  "input_button",
  "input_boolean",
  "sensor",
  "binary_sensor",
];

export function byImportance(hass: Hass) {
  return (a: string, b: string) => {
    const da = DOMAIN_ORDER.indexOf(domainOf(a));
    const db = DOMAIN_ORDER.indexOf(domainOf(b));
    const ra = da === -1 ? 99 : da;
    const rb = db === -1 ? 99 : db;
    if (ra !== rb) return ra - rb;
    return entityName(hass, a).localeCompare(entityName(hass, b));
  };
}

export function defaultCardSize(entityId: string): CardSize {
  const d = domainOf(entityId);
  if (d === "camera" || d === "media_player") return "wide";
  if (d === "climate" || d === "water_heater") return "lg";
  if (d === "weather") return "md";
  return "sm";
}

export const DOMAIN_LABELS: Record<string, string> = {
  light: "Lights",
  switch: "Switches",
  fan: "Fans",
  cover: "Blinds & covers",
  valve: "Valves",
  climate: "Climate",
  media_player: "Media",
  lock: "Locks",
  camera: "Cameras",
  vacuum: "Vacuums",
  humidifier: "Humidifiers",
  alarm_control_panel: "Alarms",
  scene: "Scenes",
  script: "Scripts",
  button: "Buttons",
  input_button: "Buttons",
  input_boolean: "Toggles",
  sensor: "Sensors",
  binary_sensor: "Binary sensors",
  number: "Numbers",
  input_number: "Numbers",
  select: "Selects",
  input_select: "Selects",
  siren: "Sirens",
  weather: "Weather",
  person: "People",
  automation: "Automations",
  water_heater: "Water heaters",
  lawn_mower: "Lawn mowers",
  remote: "Remotes",
  counter: "Counters",
  timer: "Timers",
  input_text: "Text",
  text: "Text",
  input_datetime: "Date & time",
  date: "Date & time",
  time: "Date & time",
  datetime: "Date & time",
  update: "Updates",
  device_tracker: "Device trackers",
  event: "Events",
  group: "Groups",
  image: "Images",
  todo: "To-do lists",
  calendar: "Calendars",
};
