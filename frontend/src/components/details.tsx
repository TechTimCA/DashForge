import { useEffect, useState } from "preact/hooks";
import { domainOf, entityIcon, entityName, isActive, isUnavailable, stateLabel } from "../entities";
import { call, hass, moreInfo } from "../store";
import type { Hass, HassEntityState } from "../types";
import { CameraImage, ClimateRing, MediaControls, activeColor, confirmLock, detail } from "./cards";
import { Button, Icon, Modal, Slider, TextInput, Toggle } from "./ui";

const SWATCHES: [number, number][] = [
  [0, 0], // white handled separately
  [30, 90],
  [50, 90],
  [120, 70],
  [180, 80],
  [220, 90],
  [270, 80],
  [320, 80],
];

const titleCase = (s: string) => s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export function relativeTime(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} h ago`;
  return `${Math.floor(diff / 86400)} d ago`;
}

export function DetailSheet() {
  const d = detail.value;
  const h = hass.value;
  if (!d || !h) return null;
  const s = h.states[d.entity];
  const name = entityName(h, d.entity, d.card, d.room);
  const close = () => (detail.value = null);
  return (
    <Modal
      title={name}
      onClose={close}
      footer={
        <>
          <span class="muted">{s ? `Changed ${relativeTime(s.last_changed)}` : ""}</span>
          <Button
            kind="ghost"
            icon="mdi:open-in-new"
            onClick={() => {
              close();
              moreInfo(d.entity);
            }}
          >
            Home Assistant details
          </Button>
        </>
      }
    >
      <div class="detail-head" style={activeColor(s) ? `--tile-active:${activeColor(s)}` : undefined}>
        <div class={`tile-icon big ${isActive(s) ? "active" : ""}`}>
          <Icon icon={entityIcon(h, d.entity, d.card)} size={32} />
        </div>
        <div class="detail-state">{stateLabel(h, s)}</div>
      </div>
      {s && !isUnavailable(s) ? <Controls h={h} s={s} /> : <p class="muted">This device is not responding right now.</p>}
    </Modal>
  );
}

function Controls({ h, s }: { h: Hass; s: HassEntityState }) {
  const id = s.entity_id;
  const d = domainOf(id);
  const a = s.attributes;
  switch (d) {
    case "light": {
      const modes: string[] = a.supported_color_modes ?? [];
      const dimmable = modes.some((m) => m !== "onoff");
      const ct = modes.includes("color_temp");
      const color = modes.some((m) => ["hs", "rgb", "rgbw", "rgbww", "xy"].includes(m));
      const pct = s.state === "on" && a.brightness != null ? Math.round((a.brightness / 255) * 100) : 0;
      return (
        <div class="controls">
          <BigToggle s={s} />
          {dimmable && (
            <Labeled label="Brightness">
              <Slider value={pct} min={1} max={100} color={activeColor(s)} format={(v) => `${v}%`} onCommit={(v) => call("light", "turn_on", { entity_id: id, brightness_pct: v })} />
            </Labeled>
          )}
          {ct && (
            <Labeled label="Colour temperature">
              <Slider
                class="ct-slider"
                value={a.color_temp_kelvin ?? a.min_color_temp_kelvin ?? 2700}
                min={a.min_color_temp_kelvin ?? 2000}
                max={a.max_color_temp_kelvin ?? 6500}
                step={50}
                format={(v) => `${v} K`}
                onCommit={(v) => call("light", "turn_on", { entity_id: id, color_temp_kelvin: v })}
              />
            </Labeled>
          )}
          {color && (
            <Labeled label="Colour">
              <div class="swatches">
                {SWATCHES.map(([hue, sat], i) =>
                  i === 0 ? (
                    <button type="button" class="swatch" aria-label="White" style="background:#fff" onClick={() => call("light", "turn_on", { entity_id: id, hs_color: [0, 0] })} />
                  ) : (
                    <button
                      type="button"
                      class="swatch"
                      aria-label={`Hue ${hue}`}
                      style={`background:hsl(${hue} ${sat}% 55%)`}
                      onClick={() => call("light", "turn_on", { entity_id: id, hs_color: [hue, sat] })}
                    />
                  ),
                )}
              </div>
            </Labeled>
          )}
          {a.effect_list?.length > 0 && <Chips label="Effect" value={a.effect} options={a.effect_list} onPick={(v) => call("light", "turn_on", { entity_id: id, effect: v })} />}
        </div>
      );
    }
    case "fan":
      return (
        <div class="controls">
          <BigToggle s={s} />
          {a.percentage !== undefined && (
            <Labeled label="Speed">
              <Slider value={s.state === "on" ? (a.percentage ?? 0) : 0} step={a.percentage_step ?? 1} format={(v) => `${Math.round(v)}%`} onCommit={(v) => call("fan", "set_percentage", { entity_id: id, percentage: v })} />
            </Labeled>
          )}
          {a.oscillating !== undefined && (
            <div class="control-row">
              <span>Oscillate</span>
              <Toggle checked={!!a.oscillating} onChange={(v) => call("fan", "oscillate", { entity_id: id, oscillating: v })} />
            </div>
          )}
          {a.preset_modes?.length > 0 && <Chips label="Mode" value={a.preset_mode} options={a.preset_modes} onPick={(v) => call("fan", "set_preset_mode", { entity_id: id, preset_mode: v })} />}
        </div>
      );
    case "cover":
    case "valve":
      return (
        <div class="controls">
          <div class="btn-row">
            <Button icon="mdi:arrow-up" onClick={() => call(d, `open_${d}`, { entity_id: id })}>Open</Button>
            <Button icon="mdi:stop" onClick={() => call(d, `stop_${d}`, { entity_id: id })}>Stop</Button>
            <Button icon="mdi:arrow-down" onClick={() => call(d, `close_${d}`, { entity_id: id })}>Close</Button>
          </div>
          {a.current_position != null && (
            <Labeled label="Position">
              <Slider value={a.current_position} format={(v) => `${v}%`} onCommit={(v) => call(d, `set_${d}_position`, { entity_id: id, position: v })} />
            </Labeled>
          )}
          {a.current_tilt_position != null && (
            <Labeled label="Tilt">
              <Slider value={a.current_tilt_position} format={(v) => `${v}%`} onCommit={(v) => call("cover", "set_cover_tilt_position", { entity_id: id, tilt_position: v })} />
            </Labeled>
          )}
        </div>
      );
    case "climate":
      return (
        <div class="controls">
          <ClimateRing h={h} entityId={id} big />
          {a.hvac_modes?.length > 0 && <Chips label="Mode" value={s.state} options={a.hvac_modes} onPick={(v) => call("climate", "set_hvac_mode", { entity_id: id, hvac_mode: v })} />}
          {a.preset_modes?.length > 0 && <Chips label="Preset" value={a.preset_mode} options={a.preset_modes} onPick={(v) => call("climate", "set_preset_mode", { entity_id: id, preset_mode: v })} />}
          {a.fan_modes?.length > 0 && <Chips label="Fan" value={a.fan_mode} options={a.fan_modes} onPick={(v) => call("climate", "set_fan_mode", { entity_id: id, fan_mode: v })} />}
          {a.current_humidity != null && <p class="muted">Humidity {a.current_humidity}%</p>}
        </div>
      );
    case "media_player": {
      const art = a.entity_picture ? h.hassUrl(a.entity_picture) : null;
      return (
        <div class="controls">
          {art && <img class="media-art-large" src={art} alt="" />}
          {a.media_title && (
            <div class="media-meta">
              <strong>{a.media_title}</strong>
              <span class="muted">{[a.media_artist, a.media_album_name].filter(Boolean).join(" · ")}</span>
            </div>
          )}
          <MediaControls h={h} entityId={id} showVolume />
          {a.source_list?.length > 0 && <Chips label="Source" value={a.source} options={a.source_list} onPick={(v) => call("media_player", "select_source", { entity_id: id, source: v })} />}
          <div class="btn-row">
            <Button icon="mdi:power" onClick={() => call("media_player", s.state === "off" ? "turn_on" : "turn_off", { entity_id: id })}>
              {s.state === "off" ? "Turn on" : "Turn off"}
            </Button>
          </div>
        </div>
      );
    }
    case "lock":
      return (
        <div class="controls">
          <div class="btn-row">
            <Button kind={s.state === "locked" ? "primary" : "plain"} icon="mdi:lock" onClick={() => call("lock", "lock", { entity_id: id })}>Lock</Button>
            <Button kind="danger" icon="mdi:lock-open-variant" onClick={() => (confirmLock.value = id)}>Unlock</Button>
          </div>
        </div>
      );
    case "alarm_control_panel":
      return <AlarmControls s={s} />;
    case "vacuum":
      return (
        <div class="controls">
          <div class="btn-row">
            <Button icon="mdi:play" onClick={() => call("vacuum", "start", { entity_id: id })}>Start</Button>
            <Button icon="mdi:pause" onClick={() => call("vacuum", "pause", { entity_id: id })}>Pause</Button>
            <Button icon="mdi:home-import-outline" onClick={() => call("vacuum", "return_to_base", { entity_id: id })}>Dock</Button>
            <Button icon="mdi:map-marker" onClick={() => call("vacuum", "locate", { entity_id: id })}>Find</Button>
          </div>
          {a.battery_level != null && <p class="muted">Battery {a.battery_level}%</p>}
        </div>
      );
    case "number":
    case "input_number":
      return (
        <div class="controls">
          <Slider value={Number(s.state)} min={a.min ?? 0} max={a.max ?? 100} step={a.step ?? 1} format={(v) => `${v}${a.unit_of_measurement ? " " + a.unit_of_measurement : ""}`} onCommit={(v) => call(d, "set_value", { entity_id: id, value: v })} />
        </div>
      );
    case "select":
    case "input_select":
      return (
        <div class="controls">
          <Chips label="Option" value={s.state} options={a.options ?? []} onPick={(v) => call(d, "select_option", { entity_id: id, option: v })} />
        </div>
      );
    case "camera":
      return (
        <div class="controls">
          <CameraImage h={h} entityId={id} />
        </div>
      );
    case "scene":
    case "script":
      return (
        <div class="controls">
          <Button kind="primary" icon="mdi:play" onClick={() => call(d, "turn_on", { entity_id: id })}>Run</Button>
        </div>
      );
    case "button":
    case "input_button":
      return (
        <div class="controls">
          <Button kind="primary" icon="mdi:gesture-tap" onClick={() => call(d, "press", { entity_id: id })}>Press</Button>
        </div>
      );
    case "sensor":
      return <History h={h} entityId={id} unit={a.unit_of_measurement} />;
    default:
      if (h.services[d]?.toggle) {
        return (
          <div class="controls">
            <BigToggle s={s} />
          </div>
        );
      }
      return null;
  }
}

function BigToggle({ s }: { s: HassEntityState }) {
  const d = domainOf(s.entity_id);
  return (
    <div class="control-row">
      <span>{s.state === "on" ? "On" : "Off"}</span>
      <Toggle checked={s.state === "on"} onChange={() => call(d, "toggle", { entity_id: s.entity_id })} />
    </div>
  );
}

function Labeled({ label, children }: { label: string; children: any }) {
  return (
    <div class="labeled">
      <div class="labeled-label">{label}</div>
      {children}
    </div>
  );
}

function Chips({ label, value, options, onPick }: { label: string; value?: string; options: string[]; onPick: (v: string) => void }) {
  return (
    <Labeled label={label}>
      <div class="chips">
        {options.map((o) => (
          <button type="button" class={`chip ${o === value ? "selected" : ""}`} onClick={() => onPick(o)}>
            {titleCase(o)}
          </button>
        ))}
      </div>
    </Labeled>
  );
}

function AlarmControls({ s }: { s: HassEntityState }) {
  const [code, setCode] = useState("");
  const id = s.entity_id;
  const needsCode = !!s.attributes.code_format;
  const features: number = s.attributes.supported_features ?? 0;
  const run = (service: string) => {
    call("alarm_control_panel", service, needsCode ? { entity_id: id, code } : { entity_id: id });
    setCode("");
  };
  const actions: [number, string, string, string][] = [
    [1, "alarm_arm_home", "Home", "mdi:home-lock"],
    [2, "alarm_arm_away", "Away", "mdi:lock"],
    [4, "alarm_arm_night", "Night", "mdi:weather-night"],
  ];
  return (
    <div class="controls">
      {needsCode && <TextInput type="password" value={code} onInput={setCode} placeholder="Code" />}
      <div class="btn-row">
        {s.state === "disarmed" ? (
          actions.filter(([bit]) => features & bit).map(([, svc, label, icon]) => (
            <Button icon={icon} onClick={() => run(svc)}>{label}</Button>
          ))
        ) : (
          <Button kind="danger" icon="mdi:shield-off" onClick={() => run("alarm_disarm")}>Disarm</Button>
        )}
      </div>
    </div>
  );
}

/** 24-hour history line for numeric sensors. */
function History({ h, entityId, unit }: { h: Hass; entityId: string; unit?: string }) {
  const [points, setPoints] = useState<{ t: number; v: number }[] | null>(null);
  useEffect(() => {
    let alive = true;
    const end = new Date();
    const start = new Date(end.getTime() - 24 * 3600 * 1000);
    h.callWS<Record<string, { s: string; lu: number }[]>>({
      type: "history/history_during_period",
      start_time: start.toISOString(),
      end_time: end.toISOString(),
      entity_ids: [entityId],
      minimal_response: true,
      no_attributes: true,
    })
      .then((res) => {
        if (!alive) return;
        const rows = (res[entityId] ?? [])
          .map((r) => ({ t: r.lu * 1000, v: Number(r.s) }))
          .filter((p) => !Number.isNaN(p.v));
        setPoints(rows);
      })
      .catch(() => alive && setPoints([]));
    return () => {
      alive = false;
    };
  }, [entityId]);

  if (points === null) return <p class="muted">Loading history…</p>;
  if (points.length < 2) return <p class="muted">No numeric history for the last 24 hours.</p>;
  const W = 320;
  const H = 120;
  const t0 = points[0].t;
  const t1 = Date.now();
  const vs = points.map((p) => p.v);
  let lo = Math.min(...vs);
  let hi = Math.max(...vs);
  if (hi === lo) {
    hi += 1;
    lo -= 1;
  }
  const x = (t: number) => ((t - t0) / (t1 - t0)) * W;
  const y = (v: number) => H - 8 - ((v - lo) / (hi - lo)) * (H - 16);
  let d = `M${x(points[0].t)},${y(points[0].v)}`;
  for (let i = 1; i < points.length; i++) {
    d += ` H${x(points[i].t)} V${y(points[i].v)}`;
  }
  d += ` H${W}`;
  const round = (v: number) => (Math.abs(v) >= 100 ? Math.round(v) : Math.round(v * 10) / 10);
  return (
    <div class="history">
      <div class="labeled-label">Last 24 hours</div>
      <svg viewBox={`0 0 ${W} ${H}`} class="history-chart" role="img" aria-label="24 hour history">
        <path d={`${d} V${H} H${x(points[0].t)} Z`} class="history-area" />
        <path d={d} class="history-line" />
      </svg>
      <div class="history-range muted">
        <span>Low {round(lo)} {unit}</span>
        <span>High {round(hi)} {unit}</span>
      </div>
    </div>
  );
}

export function LockConfirm() {
  const id = confirmLock.value;
  const h = hass.value;
  if (!id || !h) return null;
  const close = () => (confirmLock.value = null);
  return (
    <Modal
      title="Unlock?"
      onClose={close}
      footer={
        <>
          <Button kind="ghost" onClick={close}>Cancel</Button>
          <Button
            kind="danger"
            icon="mdi:lock-open-variant"
            onClick={() => {
              call("lock", "unlock", { entity_id: id });
              close();
            }}
          >
            Unlock
          </Button>
        </>
      }
    >
      <p>Unlock {entityName(h, id)}?</p>
    </Modal>
  );
}
