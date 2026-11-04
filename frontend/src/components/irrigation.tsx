import { signal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";
import { entityIcon, entityName, isActive, isUnavailable } from "../entities";
import { hass, showToast } from "../store";
import type { DashConfig } from "../types";
import { Button, Icon } from "./ui";

export interface IrrigationStatus {
  active: { entity_id: string; started_at: string; ends_at: string; minutes: number } | null;
  queue: string[];
  queue_minutes: number[];
}

export const irrigation = signal<IrrigationStatus | null>(null);

/** Keeps the irrigation status live; timers themselves run inside Home Assistant. */
export function IrrigationSync() {
  const h = hass.value;
  const ready = !!h;
  useEffect(() => {
    if (!h) return;
    let unsub: (() => Promise<void>) | undefined;
    let alive = true;
    h.connection
      .subscribeMessage<IrrigationStatus>((m) => alive && (irrigation.value = m), { type: "dashforge/irrigation/subscribe" })
      .then((u) => {
        if (alive) unsub = u;
        else u();
      })
      .catch(() => undefined);
    return () => {
      alive = false;
      unsub?.().catch(() => undefined);
    };
  }, [ready]);
  return null;
}

async function run(zones: string[], minutes: number) {
  try {
    await hass.value!.callWS({ type: "dashforge/irrigation/run", entity_ids: zones, minutes });
  } catch (err: any) {
    showToast(err?.message ?? "Could not start watering", "error");
  }
}

async function stop(skip = false) {
  try {
    await hass.value!.callWS({ type: "dashforge/irrigation/stop", skip });
  } catch (err: any) {
    showToast(err?.message ?? "Could not stop watering", "error");
  }
}

function useSecondTick(on: boolean) {
  const [, set] = useState(0);
  useEffect(() => {
    if (!on) return;
    const t = window.setInterval(() => set((x) => x + 1), 1000);
    return () => clearInterval(t);
  }, [on]);
}

const fmt = (sec: number) => `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, "0")}`;

export function IrrigationView({ cfg }: { cfg: DashConfig }) {
  const h = hass.value!;
  const st = irrigation.value;
  const active = st?.active ?? null;
  useSecondTick(!!active);
  const [minutes, setMinutes] = useState(cfg.irrigation.minutes);
  const zones = cfg.irrigation.zones.filter((z) => h.states[z]);
  const presets = cfg.irrigation.presets.length ? cfg.irrigation.presets : [5, 10, 15, 30];

  if (!zones.length) {
    return (
      <div class="empty">
        <Icon icon="mdi:sprinkler-variant" size={40} />
        <p>No watering zones yet. Choose your zones in Settings → Pages → Irrigation.</p>
      </div>
    );
  }

  let left = 0;
  let pct = 0;
  if (active) {
    const end = new Date(active.ends_at).getTime();
    const start = new Date(active.started_at).getTime();
    left = Math.max(0, (end - Date.now()) / 1000);
    pct = Math.min(100, Math.max(0, ((Date.now() - start) / (end - start)) * 100));
  }
  // A zone that someone switched on outside DashForge (or a controller's own schedule)
  const manual = zones.filter((z) => isActive(h.states[z]) && z !== active?.entity_id);

  return (
    <div class="irrigation">
      <div class={`irr-status ${active ? "running" : ""}`}>
        {active ? (
          <>
            <div class="irr-status-head">
              <Icon icon="mdi:sprinkler-variant" size={30} />
              <div class="irr-status-text">
                <strong>{entityName(h, active.entity_id)}</strong>
                <span>
                  {fmt(left)} left
                  {st!.queue.length > 0 && ` · then ${st!.queue.map((q) => entityName(h, q)).join(", ")}`}
                </span>
              </div>
              <div class="btn-row">
                {st!.queue.length > 0 && <Button icon="mdi:skip-next" onClick={() => stop(true)}>Next zone</Button>}
                <Button kind="danger" icon="mdi:stop" onClick={() => stop()}>Stop</Button>
              </div>
            </div>
            <div class="irr-progress">
              <div style={`width:${pct}%`} />
            </div>
          </>
        ) : (
          <div class="irr-status-head">
            <Icon icon="mdi:water-off-outline" size={30} />
            <div class="irr-status-text">
              <strong>Not watering</strong>
              <span>Run every zone in turn, or tap a zone below.</span>
            </div>
          </div>
        )}
        <div class="irr-runall">
          <span class="muted small">Each zone for</span>
          <div class="chips">
            {presets.map((m) => (
              <button type="button" class={`chip ${minutes === m ? "selected" : ""}`} onClick={() => setMinutes(m)}>
                {m} min
              </button>
            ))}
          </div>
          <Button kind="primary" icon="mdi:play" onClick={() => run(zones, minutes)}>
            Run all {zones.length} zones
          </Button>
        </div>
      </div>

      {manual.length > 0 && (
        <p class="muted small">
          <Icon icon="mdi:information-outline" size={16} /> {manual.map((z) => entityName(h, z)).join(", ")} {manual.length === 1 ? "is" : "are"} on outside DashForge, so there's no timer for {manual.length === 1 ? "it" : "them"}.
        </p>
      )}

      <div class="zone-grid">
        {zones.map((z, i) => {
          const s = h.states[z];
          const running = active?.entity_id === z;
          const queued = st?.queue.includes(z);
          const on = isActive(s);
          return (
            <div class={`zone ${running ? "running" : ""} ${on ? "on" : ""} ${isUnavailable(s) ? "unavailable" : ""}`}>
              <div class="zone-head">
                <span class="zone-num">{i + 1}</span>
                <Icon icon={entityIcon(h, z)} size={22} />
                <span class="zone-name">{entityName(h, z)}</span>
              </div>
              <div class="zone-state">
                {running ? `Watering · ${fmt(left)} left` : queued ? "Waiting in line" : on ? "On" : isUnavailable(s) ? "Unavailable" : "Off"}
              </div>
              {running ? (
                <Button kind="danger" icon="mdi:stop" onClick={() => stop()}>Stop</Button>
              ) : (
                <div class="chips">
                  {presets.map((m) => (
                    <button type="button" class="chip" disabled={isUnavailable(s)} onClick={() => run([z], m)}>
                      {m} min
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p class="muted small">
        Timers run inside Home Assistant, so watering stops on time even if this screen sleeps. Automations can use the same programs with the <code>dashforge.run_zones</code> action.
      </p>
    </div>
  );
}
