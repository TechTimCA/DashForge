import { signal } from "@preact/signals";
import { domainOf, entityName, isActive, stateLabel } from "../entities";
import { call, hass, view, type View } from "../store";
import type { CardConfig, DashConfig, Hass, SectionConfig } from "../types";
import { Button, Icon, IconButton, Modal } from "./ui";
import { irrigation } from "./irrigation";

// ---------- Floors ----------

export function sectionFloor(h: Hass, s: SectionConfig): string | null {
  if (s.floorId) return s.floorId;
  if (s.areaId) return h.areas?.[s.areaId]?.floor_id ?? null;
  return null;
}

export interface FloorGroup {
  id: string | null;
  name: string;
  icon: string;
  sections: SectionConfig[];
}

/** Rooms grouped by floor, floors in level order, rooms in the user's order. */
export function floorGroups(h: Hass, sections: SectionConfig[]): FloorGroup[] {
  const floors = h.floors ?? {};
  const groups = new Map<string | null, FloorGroup>();
  for (const s of sections) {
    const fid = sectionFloor(h, s);
    const key = fid && floors[fid] ? fid : null;
    if (!groups.has(key)) {
      const f = key ? floors[key] : null;
      groups.set(key, {
        id: key,
        name: f?.name ?? "Other rooms",
        icon: f?.icon ?? (key ? "mdi:home-floor-1" : "mdi:home-outline"),
        sections: [],
      });
    }
    groups.get(key)!.sections.push(s);
  }
  return [...groups.values()].sort((a, b) => {
    if (a.id === null) return 1;
    if (b.id === null) return -1;
    // Main floor first, then upstairs, then basements.
    const key = (lvl: number) => (lvl < 0 ? 1000 - lvl : lvl);
    return key(floors[a.id]?.level ?? 0) - key(floors[b.id]?.level ?? 0);
  });
}

export const hasFloors = (h: Hass, sections: SectionConfig[]) =>
  floorGroups(h, sections).filter((g) => g.id !== null).length > 0;

// ---------- Room status ----------

const visible = (s: SectionConfig) => s.cards.filter((c) => !c.hidden);

export function roomStatus(h: Hass, s: SectionConfig): string {
  const cards = visible(s);
  const parts: string[] = [];
  const temp = cards.find((c) => domainOf(c.entity) === "sensor" && h.states[c.entity]?.attributes.device_class === "temperature");
  const climate = cards.find((c) => domainOf(c.entity) === "climate" && h.states[c.entity]?.attributes.current_temperature != null);
  if (temp) parts.push(stateLabel(h, h.states[temp.entity]));
  else if (climate) parts.push(`${h.states[climate.entity].attributes.current_temperature}°`);
  const hum = cards.find((c) => domainOf(c.entity) === "sensor" && h.states[c.entity]?.attributes.device_class === "humidity");
  if (hum) parts.push(stateLabel(h, h.states[hum.entity]));
  const lightsOn = cards.filter((c) => domainOf(c.entity) === "light" && isActive(h.states[c.entity])).length;
  if (lightsOn) parts.push(lightsOn === 1 ? "1 light on" : `${lightsOn} lights on`);
  const open = cards.filter((c) => {
    const st = h.states[c.entity];
    return domainOf(c.entity) === "binary_sensor" && st?.state === "on" && ["door", "window", "garage_door", "opening"].includes(st.attributes.device_class);
  }).length;
  if (open) parts.push(`${open} open`);
  return parts.join(" · ");
}

function roomLights(h: Hass, s: SectionConfig): string[] {
  return visible(s)
    .map((c) => c.entity)
    .filter((e) => domainOf(e) === "light" && h.states[e]);
}

function toggleLights(h: Hass, ids: string[]) {
  const anyOn = ids.some((e) => isActive(h.states[e]));
  call("light", anyOn ? "turn_off" : "turn_on", { entity_id: ids });
}

/** Above a room's cards: what's going on, plus one tap for all its lights. */
export function RoomControls({ section }: { section: SectionConfig }) {
  const h = hass.value!;
  if (section.kind !== "room") return null;
  const lights = roomLights(h, section);
  const status = roomStatus(h, section);
  if (!lights.length && !status) return null;
  const anyOn = lights.some((e) => isActive(h.states[e]));
  return (
    <div class="room-controls">
      {status && <span class="room-status">{status}</span>}
      {lights.length > 0 && (
        <button type="button" class={`room-lights ${anyOn ? "on" : ""}`} onClick={() => toggleLights(h, lights)}>
          <Icon icon={anyOn ? "mdi:lightbulb-group" : "mdi:lightbulb-group-off-outline"} size={18} />
          {anyOn ? "Lights off" : "Lights on"}
        </button>
      )}
    </div>
  );
}

// ---------- Home summary ----------

interface Chip {
  key: string;
  icon: string;
  label: string;
  value: string;
  tone?: "warn" | "on";
  onTap?: () => void;
}

const confirmLightsOff = signal<string[] | null>(null);

function allCards(cfg: DashConfig): CardConfig[] {
  const seen = new Set<string>();
  const out: CardConfig[] = [];
  for (const s of cfg.sections) {
    for (const c of s.cards) {
      if (c.hidden || seen.has(c.entity)) continue;
      seen.add(c.entity);
      out.push(c);
    }
  }
  return out;
}

function summaryChips(h: Hass, cfg: DashConfig): Chip[] {
  const cards = allCards(cfg);
  const ids = cards.map((c) => c.entity).filter((e) => h.states[e]);
  const st = (e: string) => h.states[e];
  const chips: Chip[] = [];
  const go = (v: View) => () => (view.value = v);

  const temps = ids
    .filter((e) => domainOf(e) === "sensor" && st(e).attributes.device_class === "temperature")
    .map((e) => Number(st(e).state))
    .filter((n) => !Number.isNaN(n));
  const climates = ids.filter((e) => domainOf(e) === "climate");
  if (temps.length || climates.length) {
    const vals = temps.length ? temps : climates.map((e) => Number(st(e).attributes.current_temperature)).filter((n) => !Number.isNaN(n));
    if (vals.length) {
      const lo = Math.round(Math.min(...vals));
      const hi = Math.round(Math.max(...vals));
      const heating = climates.filter((e) => ["heating", "cooling"].includes(st(e).attributes.hvac_action)).length;
      chips.push({
        key: "climate",
        icon: "mdi:thermometer",
        label: "Climate",
        value: (lo === hi ? `${lo}°` : `${lo}–${hi}°`) + (heating ? ` · ${heating} running` : ""),
      });
    }
  }

  const lightsOn = ids.filter((e) => domainOf(e) === "light" && isActive(st(e)));
  if (ids.some((e) => domainOf(e) === "light")) {
    chips.push({
      key: "lights",
      icon: lightsOn.length ? "mdi:lightbulb-group" : "mdi:lightbulb-group-off-outline",
      label: "Lights",
      value: lightsOn.length ? `${lightsOn.length} on` : "All off",
      tone: lightsOn.length ? "on" : undefined,
      onTap: lightsOn.length ? () => (confirmLightsOff.value = lightsOn) : undefined,
    });
  }

  const unlocked = ids.filter((e) => domainOf(e) === "lock" && st(e).state !== "locked");
  const alarm = ids.find((e) => domainOf(e) === "alarm_control_panel");
  const openings = ids.filter(
    (e) => domainOf(e) === "binary_sensor" && st(e).state === "on" && ["door", "window", "garage_door", "opening"].includes(st(e).attributes.device_class),
  );
  const garage = ids.filter((e) => domainOf(e) === "cover" && st(e).attributes.device_class === "garage" && st(e).state !== "closed");
  if (unlocked.length || alarm || openings.length || garage.length || ids.some((e) => domainOf(e) === "lock")) {
    const bits: string[] = [];
    if (unlocked.length) bits.push(`${unlocked.length} unlocked`);
    if (openings.length + garage.length) bits.push(`${openings.length + garage.length} open`);
    if (!bits.length) bits.push(alarm ? stateLabel(h, st(alarm)) : "Locked");
    chips.push({
      key: "security",
      icon: unlocked.length || openings.length || garage.length ? "mdi:shield-alert" : "mdi:shield-check",
      label: "Security",
      value: bits.join(" · "),
      tone: unlocked.length || openings.length || garage.length ? "warn" : undefined,
      onTap: cfg.builtinPages.security ? go({ type: "security" }) : undefined,
    });
  }

  const playing = ids.filter((e) => domainOf(e) === "media_player" && st(e).state === "playing");
  if (playing.length) {
    chips.push({
      key: "media",
      icon: "mdi:play-circle",
      label: "Playing",
      value: playing.length === 1 ? (st(playing[0]).attributes.media_title ?? entityName(h, playing[0])) : `${playing.length} speakers`,
      tone: "on",
      onTap: cfg.builtinPages.media ? go({ type: "media" }) : undefined,
    });
  }

  const water = irrigation.value?.active;
  if (water) {
    const left = Math.max(0, Math.ceil((new Date(water.ends_at).getTime() - Date.now()) / 60000));
    chips.push({
      key: "water",
      icon: "mdi:sprinkler-variant",
      label: "Watering",
      value: `${entityName(h, water.entity_id)} · ${left} min`,
      tone: "on",
      onTap: go({ type: "irrigation" }),
    });
  }
  return chips;
}

function SummaryChips({ cfg }: { cfg: DashConfig }) {
  const h = hass.value!;
  const chips = summaryChips(h, cfg);
  if (!chips.length) return null;
  return (
    <div class="summary">
      {chips.map((c) => (
        <button type="button" class={`summary-chip ${c.tone ?? ""}`} onClick={c.onTap} disabled={!c.onTap}>
          <Icon icon={c.icon} size={22} />
          <span class="summary-text">
            <span class="summary-label">{c.label}</span>
            <span class="summary-value">{c.value}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

export function LightsOffConfirm() {
  const ids = confirmLightsOff.value;
  const h = hass.value;
  if (!ids || !h) return null;
  const close = () => (confirmLightsOff.value = null);
  return (
    <Modal
      title={`Turn off ${ids.length} ${ids.length === 1 ? "light" : "lights"}?`}
      onClose={close}
      footer={
        <>
          <Button kind="ghost" onClick={close}>Cancel</Button>
          <Button
            kind="primary"
            icon="mdi:lightbulb-off"
            onClick={() => {
              call("light", "turn_off", { entity_id: ids });
              close();
            }}
          >
            Turn off
          </Button>
        </>
      }
    >
      <ul class="plain-list">
        {ids.map((e) => (
          <li>{entityName(h, e)}</li>
        ))}
      </ul>
    </Modal>
  );
}

// ---------- Home view ----------

function RoomCard({ s }: { s: SectionConfig }) {
  const h = hass.value!;
  const lights = roomLights(h, s);
  const anyOn = lights.some((e) => isActive(h.states[e]));
  const status = roomStatus(h, s);
  const bg = s.background ? `background-image:linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.55)),url("${s.background.replace(/["\\]/g, "")}")` : undefined;
  return (
    <div
      class={`room-card ${s.background ? "has-bg" : ""} ${anyOn ? "lit" : ""}`}
      style={bg}
      role="button"
      tabIndex={0}
      onClick={() => (view.value = { type: "section", id: s.id })}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (view.value = { type: "section", id: s.id })}
    >
      <div class="room-card-top">
        <span class="room-card-icon">
          <Icon icon={s.icon} size={24} />
        </span>
        {lights.length > 0 && (
          <IconButton
            icon={anyOn ? "mdi:lightbulb-on" : "mdi:lightbulb-outline"}
            label={anyOn ? `Turn off ${s.name} lights` : `Turn on ${s.name} lights`}
            active={anyOn}
            onClick={() => toggleLights(h, lights)}
          />
        )}
      </div>
      <div>
        <div class="room-card-name">{s.name}</div>
        <div class="room-card-status">{status || `${visible(s).length} devices`}</div>
      </div>
    </div>
  );
}

export function HomeView({ cfg, renderCards }: { cfg: DashConfig; renderCards: (cards: CardConfig[]) => any }) {
  const h = hass.value!;
  const favs = cfg.home.favorites ? allCards(cfg).filter((c) => c.favorite && h.states[c.entity]) : [];
  const rooms = cfg.sections.filter((s) => s.kind === "room");
  const pages = cfg.sections.filter((s) => s.kind === "page");
  const groups = floorGroups(h, rooms);
  const showFloorNames = groups.length > 1 || groups[0]?.id !== null;
  return (
    <div class="home-view">
      {cfg.home.summary && <SummaryChips cfg={cfg} />}
      {favs.length > 0 && (
        <section class="home-block">
          <h2 class="section-title">
            <Icon icon="mdi:star" size={20} /> Favourites
          </h2>
          {renderCards(favs)}
        </section>
      )}
      {cfg.home.rooms &&
        groups.map((g) => (
          <section class="home-block">
            {showFloorNames && (
              <h2 class="section-title floor-title">
                <Icon icon={g.icon} size={20} /> {g.name}
              </h2>
            )}
            <div class="room-grid">
              {g.sections.map((s) => (
                <RoomCard s={s} />
              ))}
            </div>
          </section>
        ))}
      {cfg.home.rooms && pages.length > 0 && (
        <section class="home-block">
          <h2 class="section-title">
            <Icon icon="mdi:view-dashboard" size={20} /> Pages
          </h2>
          <div class="room-grid">
            {pages.map((s) => (
              <RoomCard s={s} />
            ))}
          </div>
        </section>
      )}
      {!favs.length && cfg.home.favorites && (
        <p class="muted small home-hint">
          <Icon icon="mdi:star-outline" size={16} /> Tip: in edit mode, tap a card and turn on “Show on Home” to pin it here.
        </p>
      )}
    </div>
  );
}
