import { signal } from "@preact/signals";
import { useEffect, useRef, useState } from "preact/hooks";
import {
  CATEGORY_COLORS,
  CATEGORY_GRADIENTS,
  categoryOf,
  domainOf,
  entityIcon,
  entityName,
  isActive,
  isUnavailable,
  stateLabel,
  tapAction,
} from "../entities";
import { call, hass, moreInfo, showToast } from "../store";
import type { CardConfig, Hass, HassEntityState } from "../types";
import { Icon, IconButton, Slider, useLongPress } from "./ui";
import { LineChart, useHistory } from "./charts";

export const detail = signal<{ entity: string; card?: CardConfig; room?: string } | null>(null);
export const confirmLock = signal<string | null>(null);
/** A weather, calendar or to-do card that was tapped. */
export const entityWidget = signal<{ kind: "weather" | "calendar" | "todo"; entity: string } | null>(null);

export function activeColor(s?: HassEntityState): string | undefined {
  if (!s) return undefined;
  const d = domainOf(s.entity_id);
  if (d === "light" && s.state === "on") {
    const rgb = s.attributes.rgb_color;
    if (Array.isArray(rgb)) return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
    return "#fbbf24";
  }
  if (d === "climate") {
    const action = s.attributes.hvac_action ?? s.state;
    if (action === "heating" || action === "heat") return "#f97316";
    if (action === "cooling" || action === "cool") return "#38bdf8";
  }
  if (d === "lock" && s.state !== "locked") return "#ef4444";
  if (d === "binary_sensor" && s.state === "on") {
    const dc = s.attributes.device_class;
    if (["smoke", "moisture", "gas", "problem", "safety"].includes(dc)) return "#ef4444";
  }
  return undefined;
}

export function runTap(h: Hass, entityId: string, card?: CardConfig, room?: string) {
  const s = h.states[entityId];
  const override = card?.tap ?? "auto";
  if (override === "none") return;
  if (override === "details") {
    detail.value = { entity: entityId, card, room };
    return;
  }
  if (override === "more-info") {
    moreInfo(entityId);
    return;
  }
  const action = override === "toggle" ? "toggle" : tapAction(entityId, s);
  if (isUnavailable(s) && action !== "details") {
    showToast(`${entityName(h, entityId, card)} is unavailable`, "error");
    return;
  }
  const d = domainOf(entityId);
  switch (action) {
    case "toggle":
      if (d === "cover" || d === "valve") {
        call(d, s.state === "open" || s.state === "opening" ? `close_${d}` : `open_${d}`, {
          entity_id: entityId,
        });
      } else if (d === "lock") {
        if (s.state === "locked") confirmLock.value = entityId;
        else call("lock", "lock", { entity_id: entityId });
      } else if (h.services[d]?.toggle) call(d, "toggle", { entity_id: entityId });
      else call("homeassistant", "toggle", { entity_id: entityId });
      return;
    case "weather":
    case "calendar":
    case "todo":
      entityWidget.value = { kind: action, entity: entityId };
      return;
    case "activate":
      call(d, "turn_on", { entity_id: entityId });
      showToast(`${entityName(h, entityId, card)} activated`);
      return;
    case "press":
      call(d, "press", { entity_id: entityId });
      return;
    case "lock":
      if (s.state === "locked") confirmLock.value = entityId;
      else call("lock", "lock", { entity_id: entityId });
      return;
    case "media":
      call("media_player", "media_play_pause", { entity_id: entityId });
      return;
    default:
      detail.value = { entity: entityId, card, room };
  }
}

export interface TileProps {
  card: CardConfig;
  room?: string;
  editing?: boolean;
  onRemove?: () => void;
  onResize?: () => void;
  onEdit?: () => void;
  dragging?: boolean;
  index?: number;
}

export function Tile(props: TileProps) {
  const h = hass.value!;
  const { card } = props;
  const s = h.states[card.entity];
  const active = isActive(s);
  const cat = categoryOf(card.entity, s);
  const color = card.color ?? activeColor(s);
  const catColor = card.color ?? CATEGORY_COLORS[cat];
  const grad = card.color
    ? `linear-gradient(135deg,${card.color} 0%,color-mix(in srgb,${card.color} 60%,#000) 100%)`
    : CATEGORY_GRADIENTS[cat];
  const name = entityName(h, card.entity, card, props.room);
  const domain = domainOf(card.entity);
  const press = useLongPress(
    () => !props.editing && (detail.value = { entity: card.entity, card, room: props.room }),
    () => (props.editing ? props.onEdit?.() : runTap(h, card.entity, card, props.room)),
  );

  const cls = [
    "tile",
    `size-${card.size}`,
    `d-${domain}`,
    `cat-${cat}`,
    card.color ? "custom-color" : "",
    active ? "active" : "",
    isUnavailable(s) ? "unavailable" : "",
    props.editing ? "editing" : "",
    props.dragging ? "dragging" : "",
  ].join(" ");

  return (
    <div
      class={cls}
      data-index={props.index}
      style={`--cat:${catColor};--grad:${grad};${color ? `--tile-active:${color};` : ""}`}
      role="button"
      tabIndex={0}
      aria-label={`${name}, ${stateLabel(h, s)}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          props.editing ? props.onEdit?.() : runTap(h, card.entity, card, props.room);
        }
      }}
      {...press}
    >
      {props.editing && (
        <>
          <button
            type="button"
            class="badge badge-remove"
            aria-label={`Hide ${name}`}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              props.onRemove?.();
            }}
          >
            <Icon icon="mdi:minus" size={16} />
          </button>
          <button
            type="button"
            class="badge badge-resize"
            aria-label={`Resize ${name}`}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              props.onResize?.();
            }}
          >
            <Icon icon="mdi:arrow-expand" size={14} />
          </button>
        </>
      )}
      {card.size !== "sm" && !props.editing ? (
        <BigBody h={h} card={card} s={s} name={name} />
      ) : (
        <SmallBody h={h} card={card} s={s} name={name} />
      )}
    </div>
  );
}

function TileHead({ h, card, s, name }: BodyProps) {
  return (
    <>
      <div class="tile-icon">
        <Icon icon={entityIcon(h, card.entity, card)} size={card.size === "sm" ? 24 : 26} />
      </div>
      <div class="tile-text">
        <div class="tile-name">{name}</div>
        <div class="tile-state">{stateLabel(h, s)}</div>
      </div>
    </>
  );
}

interface BodyProps {
  h: Hass;
  card: CardConfig;
  s?: HassEntityState;
  name: string;
}

function SmallBody(p: BodyProps) {
  const d = domainOf(p.card.entity);
  if (d === "sensor" && p.s && !isUnavailable(p.s) && !Number.isNaN(Number(p.s.state))) {
    return (
      <>
        <div class="tile-icon">
          <Icon icon={entityIcon(p.h, p.card.entity, p.card)} size={24} />
        </div>
        <div class="tile-text">
          <div class="tile-value">{stateLabel(p.h, p.s)}</div>
          <div class="tile-name">{p.name}</div>
        </div>
      </>
    );
  }
  return <TileHead {...p} />;
}

function BigBody(p: BodyProps) {
  const d = domainOf(p.card.entity);
  switch (d) {
    case "light":
      return <LightBig {...p} />;
    case "fan":
      return <FanBig {...p} />;
    case "cover":
      return <CoverBig {...p} />;
    case "climate":
      return <ClimateBig {...p} />;
    case "media_player":
      return <MediaBig {...p} />;
    case "camera":
      return <CameraBig {...p} />;
    case "sensor":
      return <SensorBig {...p} />;
    case "water_heater":
      return <WaterHeaterBig {...p} />;
    case "weather":
      return <WeatherBig {...p} />;
    default:
      return (
        <div class="big-body">
          <TileHead {...p} />
        </div>
      );
  }
}

function LightBig(p: BodyProps) {
  const s = p.s;
  const on = s?.state === "on";
  const pct = on && s?.attributes.brightness != null ? Math.round((s.attributes.brightness / 255) * 100) : 0;
  const dimmable = (s?.attributes.supported_color_modes ?? []).some((m: string) => m !== "onoff");
  return (
    <div class="big-body">
      <div class="big-top">
        <TileHead {...p} />
      </div>
      {dimmable && !isUnavailable(s) && (
        <Slider
          value={pct}
          min={1}
          max={100}
          label={`${p.name} brightness`}
          color={activeColor(s)}
          format={(v) => `${v}%`}
          onCommit={(v) => call("light", "turn_on", { entity_id: p.card.entity, brightness_pct: v })}
        />
      )}
    </div>
  );
}

function FanBig(p: BodyProps) {
  const s = p.s;
  const pct = s?.state === "on" ? (s.attributes.percentage ?? 100) : 0;
  const step = s?.attributes.percentage_step ?? 1;
  return (
    <div class="big-body">
      <div class="big-top">
        <TileHead {...p} />
      </div>
      {s?.attributes.percentage !== undefined && !isUnavailable(s) && (
        <Slider
          value={pct}
          step={step}
          label={`${p.name} speed`}
          format={(v) => (v === 0 ? "Off" : `${Math.round(v)}%`)}
          onCommit={(v) => call("fan", "set_percentage", { entity_id: p.card.entity, percentage: v })}
        />
      )}
    </div>
  );
}

function CoverBig(p: BodyProps) {
  const s = p.s;
  const id = p.card.entity;
  return (
    <div class="big-body cover-big">
      <div class="big-top">
        <TileHead {...p} />
      </div>
      <div class="cover-row">
        <div class="btn-group">
          <IconButton icon="mdi:arrow-up" label="Open" onClick={() => call("cover", "open_cover", { entity_id: id })} />
          <IconButton icon="mdi:stop" label="Stop" onClick={() => call("cover", "stop_cover", { entity_id: id })} />
          <IconButton icon="mdi:arrow-down" label="Close" onClick={() => call("cover", "close_cover", { entity_id: id })} />
        </div>
        {s?.attributes.current_position != null && (
          <Slider
            vertical
            class="cover-slider"
            value={s.attributes.current_position}
            label={`${p.name} position`}
            format={(v) => `${v}%`}
            onCommit={(v) => call("cover", "set_cover_position", { entity_id: id, position: v })}
          />
        )}
      </div>
    </div>
  );
}

/**
 * Target temperature with debounced − / + buttons. Handles a single target
 * ("temperature") and a heat/cool range ("target_temp_low" / "target_temp_high").
 */
export function useTargetTemp(h: Hass, entityId: string) {
  const s = h.states[entityId];
  const a = s?.attributes ?? {};
  const [pending, setPending] = useState<[number, number] | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const step: number = a.target_temp_step ?? (h.config.unit_system.temperature === "°F" ? 1 : 0.5);
  const min: number = a.min_temp ?? 7;
  const max: number = a.max_temp ?? 35;
  const isRange = a.temperature == null && a.target_temp_low != null && a.target_temp_high != null;
  const actual: [number, number] | null = isRange
    ? [a.target_temp_low, a.target_temp_high]
    : a.temperature != null
      ? [a.temperature, a.temperature]
      : null;
  const shown = pending ?? actual;
  const clamp = (v: number) => Math.min(max, Math.max(min, Math.round(v / step) * step));
  const nudge = (dir: 1 | -1) => {
    if (!shown) return;
    const next: [number, number] = [clamp(shown[0] + dir * step), clamp(shown[1] + dir * step)];
    setPending(next);
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      const data = isRange
        ? { entity_id: entityId, target_temp_low: next[0], target_temp_high: next[1] }
        : { entity_id: entityId, temperature: next[0] };
      call("climate", "set_temperature", data).then(() => window.setTimeout(() => setPending(null), 1500));
    }, 800);
  };
  const label = !shown ? "—" : isRange ? `${shown[0]}–${shown[1]}°` : `${shown[0]}°`;
  return { shown, label, isRange, nudge, min, max };
}

export function ClimateRing({ h, entityId, big }: { h: Hass; entityId: string; big?: boolean }) {
  const s = h.states[entityId];
  const { shown, label, isRange, nudge, min, max } = useTargetTemp(h, entityId);
  const cur = s?.attributes.current_temperature;
  const pos = (v: number) => Math.min(1, Math.max(0, (v - min) / (max - min)));
  const from = shown && isRange ? pos(shown[0]) : 0;
  const to = shown ? pos(shown[1]) : 0;
  const r = 52;
  const circ = 2 * Math.PI * r;
  const arc = circ * 0.75;
  const color = activeColor(s) ?? "var(--accent)";
  return (
    <div class={`climate-ring ${big ? "big" : ""}`}>
      <svg viewBox="0 0 128 128" aria-hidden="true">
        <circle
          cx="64"
          cy="64"
          r={r}
          class="ring-track"
          stroke-dasharray={`${arc} ${circ}`}
          transform="rotate(135 64 64)"
        />
        <circle
          cx="64"
          cy="64"
          r={r}
          class="ring-value"
          style={`stroke:${color}`}
          stroke-dasharray={`${Math.max(0.01, arc * (to - from))} ${circ}`}
          stroke-dashoffset={`${-arc * from}`}
          transform="rotate(135 64 64)"
        />
      </svg>
      <div class="ring-center">
        <div class={`ring-target ${isRange ? "range" : ""}`}>{label}</div>
        {cur != null && <div class="ring-current">Now {cur}°</div>}
      </div>
      {shown && (
        <div class="ring-buttons">
          <IconButton icon="mdi:minus" label="Lower temperature" onClick={() => nudge(-1)} />
          <IconButton icon="mdi:plus" label="Raise temperature" onClick={() => nudge(1)} />
        </div>
      )}
    </div>
  );
}

function ClimateBig(p: BodyProps) {
  return (
    <div class="big-body climate-big">
      <div class="big-top">
        <TileHead {...p} />
      </div>
      {!isUnavailable(p.s) && <ClimateRing h={p.h} entityId={p.card.entity} />}
    </div>
  );
}

export function MediaControls({ h, entityId, showVolume }: { h: Hass; entityId: string; showVolume?: boolean }) {
  const s = h.states[entityId];
  const playing = s?.state === "playing";
  const vol = s?.attributes.volume_level;
  return (
    <div class="media-controls">
      <div class="btn-group">
        <IconButton icon="mdi:skip-previous" label="Previous" onClick={() => call("media_player", "media_previous_track", { entity_id: entityId })} />
        <IconButton
          icon={playing ? "mdi:pause" : "mdi:play"}
          label={playing ? "Pause" : "Play"}
          class="play"
          size={28}
          onClick={() => call("media_player", "media_play_pause", { entity_id: entityId })}
        />
        <IconButton icon="mdi:skip-next" label="Next" onClick={() => call("media_player", "media_next_track", { entity_id: entityId })} />
      </div>
      {showVolume && vol != null && (
        <Slider
          value={Math.round(vol * 100)}
          label="Volume"
          format={(v) => `${v}%`}
          onCommit={(v) => call("media_player", "volume_set", { entity_id: entityId, volume_level: v / 100 })}
        />
      )}
    </div>
  );
}

function MediaBig(p: BodyProps) {
  const s = p.s;
  const art = s?.attributes.entity_picture ? p.h.hassUrl(s.attributes.entity_picture) : null;
  return (
    <div class="big-body media-big">
      {art && <div class="media-art-bg" style={`background-image:url("${art}")`} />}
      <div class="big-top">
        <div class="tile-icon">
          {art ? (
            <img
              src={art}
              alt=""
              class="media-art"
              onError={(e) => ((e.target as HTMLImageElement).style.visibility = "hidden")}
            />
          ) : (
            <Icon icon={entityIcon(p.h, p.card.entity, p.card)} />
          )}
        </div>
        <div class="tile-text">
          <div class="tile-name">{s?.attributes.media_title ?? p.name}</div>
          <div class="tile-state">{s?.attributes.media_artist ?? stateLabel(p.h, s)}</div>
        </div>
      </div>
      {!isUnavailable(s) && s?.state !== "off" && <MediaControls h={p.h} entityId={p.card.entity} showVolume={p.card.size === "wide"} />}
    </div>
  );
}

/**
 * Camera picture. Live mode streams MJPEG from Home Assistant's camera proxy,
 * which works for nearly every camera integration; otherwise it refreshes a snapshot.
 */
export function CameraImage({ h, entityId, live }: { h: Hass; entityId: string; live?: boolean }) {
  const [tick, setTick] = useState(0);
  const [liveFailed, setLiveFailed] = useState(false);
  useEffect(() => {
    if (live && !liveFailed) return;
    const t = window.setInterval(() => document.visibilityState === "visible" && setTick((x) => x + 1), 10_000);
    return () => clearInterval(t);
  }, [live, liveFailed]);
  const s = h.states[entityId];
  const pic = s?.attributes.entity_picture;
  const token = s?.attributes.access_token;
  if (live && !liveFailed && token) {
    return (
      <img
        class="camera-img"
        src={h.hassUrl(`/api/camera_proxy_stream/${entityId}?token=${token}`)}
        alt=""
        onError={() => setLiveFailed(true)}
      />
    );
  }
  if (!pic) return <div class="camera-empty"><Icon icon="mdi:cctv-off" /></div>;
  const url = h.hassUrl(pic) + (pic.includes("?") ? "&" : "?") + `t=${tick}`;
  return <img class="camera-img" src={url} alt="" loading="lazy" />;
}

function CameraBig(p: BodyProps) {
  return (
    <div class="big-body camera-big">
      <CameraImage h={p.h} entityId={p.card.entity} live={p.card.live} />
      <div class="camera-label">
        {p.card.live && <span class="live-dot" />}
        {p.name}
      </div>
    </div>
  );
}

function SensorBig(p: BodyProps) {
  const numeric = p.s && !Number.isNaN(Number(p.s.state));
  return (
    <div class={`big-body sensor-big ${numeric ? "with-chart" : ""}`}>
      <div class="big-top">
        <div class="tile-icon">
          <Icon icon={entityIcon(p.h, p.card.entity, p.card)} />
        </div>
        <div class="tile-text">
          <div class="tile-name">{p.name}</div>
          <div class="tile-state">Last 24 hours</div>
        </div>
        <div class="sensor-value">{stateLabel(p.h, p.s)}</div>
      </div>
      {numeric && <SensorChart h={p.h} entityId={p.card.entity} now={Number(p.s!.state)} />}
    </div>
  );
}

function WaterHeaterBig(p: BodyProps) {
  const a = p.s?.attributes ?? {};
  return (
    <div class="big-body">
      <div class="big-top">
        <TileHead {...p} />
      </div>
      <div class="big-number">
        {a.current_temperature != null ? `${Math.round(a.current_temperature)}°` : a.temperature != null ? `${a.temperature}°` : "—"}
        <span class="big-number-label">{a.current_temperature != null ? "Water now" : "Target"}</span>
      </div>
      {a.temperature != null && !isUnavailable(p.s) && (
        <Slider
          value={a.temperature}
          min={a.min_temp ?? 30}
          max={a.max_temp ?? 70}
          step={a.target_temp_step ?? 1}
          label="Target temperature"
          format={(v) => `Target ${v}°`}
          onCommit={(v) => call("water_heater", "set_temperature", { entity_id: p.card.entity, temperature: v })}
        />
      )}
    </div>
  );
}

function WeatherBig(p: BodyProps) {
  const a = p.s?.attributes ?? {};
  return (
    <div class="big-body weather-big">
      <div class="big-top">
        <div class="tile-icon">
          <Icon icon={entityIcon(p.h, p.card.entity, p.card)} />
        </div>
        <div class="tile-text">
          <div class="tile-name">{p.name}</div>
          <div class="tile-state">{stateLabel(p.h, p.s).split(" · ")[1] ?? ""}</div>
        </div>
        <div class="weather-big-temp">{a.temperature != null ? `${Math.round(a.temperature)}°` : ""}</div>
      </div>
      <div class="weather-big-meta">
        {a.humidity != null && <span><Icon icon="mdi:water-percent" size={16} /> {a.humidity}%</span>}
        {a.wind_speed != null && <span><Icon icon="mdi:weather-windy" size={16} /> {Math.round(a.wind_speed)} {a.wind_speed_unit ?? ""}</span>}
        <span class="muted-on">Tap for forecast</span>
      </div>
    </div>
  );
}

function SensorChart({ h, entityId, now }: { h: Hass; entityId: string; now: number }) {
  const points = useHistory(h, entityId, 24, 5);
  if (!points) return <div class="chart-space" />;
  return <LineChart points={points} now={now} class="tile-chart" showDot />;
}
