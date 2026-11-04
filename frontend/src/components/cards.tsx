import { signal } from "@preact/signals";
import { useEffect, useRef, useState } from "preact/hooks";
import {
  domainOf,
  entityIcon,
  entityName,
  isActive,
  isUnavailable,
  stateLabel,
  tapAction,
} from "../entities";
import { call, hass, showToast } from "../store";
import type { CardConfig, Hass, HassEntityState } from "../types";
import { Icon, IconButton, Slider, useLongPress } from "./ui";

export const detail = signal<{ entity: string; card?: CardConfig; room?: string } | null>(null);
export const confirmLock = signal<string | null>(null);

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
  if (isUnavailable(s) && tapAction(entityId) !== "details") {
    showToast(`${entityName(h, entityId, card)} is unavailable`, "error");
    return;
  }
  const d = domainOf(entityId);
  switch (tapAction(entityId)) {
    case "toggle":
      if (d === "cover" || d === "valve") {
        call(d, s.state === "open" || s.state === "opening" ? `close_${d}` : `open_${d}`, {
          entity_id: entityId,
        });
      } else call(d, "toggle", { entity_id: entityId });
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
  const color = activeColor(s);
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
    active ? "active" : "",
    isUnavailable(s) ? "unavailable" : "",
    props.editing ? "editing" : "",
    props.dragging ? "dragging" : "",
  ].join(" ");

  return (
    <div
      class={cls}
      data-index={props.index}
      style={color ? `--tile-active:${color}` : undefined}
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

export function useTargetTemp(h: Hass, entityId: string) {
  const s = h.states[entityId];
  const actual: number | undefined = s?.attributes.temperature;
  const [pending, setPending] = useState<number | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const step: number =
    s?.attributes.target_temp_step ?? (h.config.unit_system.temperature === "°F" ? 1 : 0.5);
  const min: number = s?.attributes.min_temp ?? 7;
  const max: number = s?.attributes.max_temp ?? 35;
  const shown = pending ?? actual;
  const nudge = (dir: 1 | -1) => {
    if (shown == null) return;
    const next = Math.min(max, Math.max(min, Math.round((shown + dir * step) / step) * step));
    setPending(next);
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      call("climate", "set_temperature", { entity_id: entityId, temperature: next }).then(() =>
        window.setTimeout(() => setPending(null), 1500),
      );
    }, 800);
  };
  return { shown, nudge, min, max };
}

export function ClimateRing({ h, entityId, big }: { h: Hass; entityId: string; big?: boolean }) {
  const s = h.states[entityId];
  const { shown, nudge, min, max } = useTargetTemp(h, entityId);
  const cur = s?.attributes.current_temperature;
  const ratio = shown != null ? (shown - min) / (max - min) : 0;
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
          stroke-dasharray={`${arc * ratio} ${circ}`}
          transform="rotate(135 64 64)"
        />
      </svg>
      <div class="ring-center">
        <div class="ring-target">{shown != null ? `${shown}°` : "—"}</div>
        {cur != null && <div class="ring-current">Now {cur}°</div>}
      </div>
      <div class="ring-buttons">
        <IconButton icon="mdi:minus" label="Lower temperature" onClick={() => nudge(-1)} />
        <IconButton icon="mdi:plus" label="Raise temperature" onClick={() => nudge(1)} />
      </div>
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
          {art ? <img src={art} alt="" class="media-art" /> : <Icon icon={entityIcon(p.h, p.card.entity, p.card)} />}
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

export function CameraImage({ h, entityId }: { h: Hass; entityId: string }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => document.visibilityState === "visible" && setTick((x) => x + 1), 10_000);
    return () => clearInterval(t);
  }, []);
  const pic = h.states[entityId]?.attributes.entity_picture;
  if (!pic) return <div class="camera-empty"><Icon icon="mdi:cctv-off" /></div>;
  const url = h.hassUrl(pic) + (pic.includes("?") ? "&" : "?") + `t=${tick}`;
  return <img class="camera-img" src={url} alt="" loading="lazy" />;
}

function CameraBig(p: BodyProps) {
  return (
    <div class="big-body camera-big">
      <CameraImage h={p.h} entityId={p.card.entity} />
      <div class="camera-label">{p.name}</div>
    </div>
  );
}

function SensorBig(p: BodyProps) {
  return (
    <div class="big-body sensor-big">
      <div class="tile-icon">
        <Icon icon={entityIcon(p.h, p.card.entity, p.card)} />
      </div>
      <div class="sensor-value">{stateLabel(p.h, p.s)}</div>
      <div class="tile-name">{p.name}</div>
    </div>
  );
}
