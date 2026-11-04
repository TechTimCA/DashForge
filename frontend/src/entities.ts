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
]);

const TOGGLE_DOMAINS = new Set([
  "light",
  "switch",
  "fan",
  "input_boolean",
  "siren",
  "humidifier",
  "automation",
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
      return false;
    default:
      return s.state === "on";
  }
}

export type TapAction = "toggle" | "activate" | "press" | "lock" | "media" | "details";

export function tapAction(entityId: string): TapAction {
  const d = domainOf(entityId);
  if (TOGGLE_DOMAINS.has(d) || d === "cover" || d === "valve") return "toggle";
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
};

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

export function entityIcon(hass: Hass, entityId: string, card?: CardConfig): string {
  if (card?.icon) return card.icon;
  const entry = hass.entities?.[entityId];
  if (entry?.icon) return entry.icon;
  const s = hass.states[entityId];
  if (s?.attributes.icon) return s.attributes.icon;
  const d = domainOf(entityId);
  const dc = s?.attributes.device_class;
  if (d === "sensor" && dc && SENSOR_CLASS_ICONS[dc]) return SENSOR_CLASS_ICONS[dc];
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
  if (d === "climate") return "lg";
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
};
