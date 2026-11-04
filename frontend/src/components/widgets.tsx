import { signal } from "@preact/signals";
import { useEffect, useMemo, useState } from "preact/hooks";
import { entityName } from "../entities";
import { call, hass } from "../store";
import type { DashConfig, Hass } from "../types";
import { Button, Checkbox, Icon, IconButton, Modal, TextInput } from "./ui";

export const openWidget = signal<"weather" | "calendar" | "todo" | null>(null);

// ---------- Clock ----------

export function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return now;
}

export function formatTime(d: Date, h24: boolean, lang: string) {
  return d.toLocaleTimeString(lang, { hour: "numeric", minute: "2-digit", hour12: !h24 });
}

export function greeting(d: Date, name: string) {
  const hr = d.getHours();
  const part = hr < 5 ? "Good night" : hr < 12 ? "Good morning" : hr < 18 ? "Good afternoon" : "Good evening";
  return name ? `${part}, ${name}` : part;
}

// ---------- Weather ----------

export interface WeatherData {
  condition: string;
  temp?: number;
  unit: string;
  hourly: { time: string; condition: string; temp: number; precip?: number }[];
  daily: { time: string; condition: string; high: number; low?: number; precip?: number }[];
  source: "entity" | "open-meteo";
}

const CONDITION_ICONS: Record<string, string> = {
  "clear-night": "mdi:weather-night",
  cloudy: "mdi:weather-cloudy",
  exceptional: "mdi:alert-circle-outline",
  fog: "mdi:weather-fog",
  hail: "mdi:weather-hail",
  lightning: "mdi:weather-lightning",
  "lightning-rainy": "mdi:weather-lightning-rainy",
  partlycloudy: "mdi:weather-partly-cloudy",
  pouring: "mdi:weather-pouring",
  rainy: "mdi:weather-rainy",
  snowy: "mdi:weather-snowy",
  "snowy-rainy": "mdi:weather-snowy-rainy",
  sunny: "mdi:weather-sunny",
  windy: "mdi:weather-windy",
  "windy-variant": "mdi:weather-windy-variant",
};

export const conditionIcon = (c: string) => CONDITION_ICONS[c] ?? "mdi:weather-partly-cloudy";
export const conditionLabel = (c: string) =>
  c === "partlycloudy" ? "Partly cloudy" : c === "clear-night" ? "Clear" : c.replace(/-/g, " ").replace(/^\w/, (x) => x.toUpperCase());

function wmoToCondition(code: number, isDay = true): string {
  if (code === 0) return isDay ? "sunny" : "clear-night";
  if (code <= 2) return "partlycloudy";
  if (code === 3) return "cloudy";
  if (code === 45 || code === 48) return "fog";
  if (code >= 51 && code <= 67) return code >= 65 ? "pouring" : "rainy";
  if (code >= 71 && code <= 77) return "snowy";
  if (code >= 80 && code <= 82) return code === 82 ? "pouring" : "rainy";
  if (code === 85 || code === 86) return "snowy";
  if (code >= 95) return "lightning-rainy";
  return "cloudy";
}

function useEntityForecast(h: Hass, entityId: string | undefined, type: "daily" | "hourly") {
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => {
    if (!entityId || !h.states[entityId]) return;
    let unsub: (() => Promise<void>) | undefined;
    let alive = true;
    h.connection
      .subscribeMessage<{ forecast: any[] }>((msg) => alive && setRows(msg.forecast ?? []), {
        type: "weather/subscribe_forecast",
        entity_id: entityId,
        forecast_type: type,
      })
      .then((u) => {
        if (alive) unsub = u;
        else u();
      })
      .catch(() => setRows([]));
    return () => {
      alive = false;
      unsub?.().catch(() => undefined);
    };
  }, [entityId, type, !!h.states[entityId ?? ""]]);
  return rows;
}

function useOpenMeteo(h: Hass, enabled: boolean): WeatherData | null {
  const [data, setData] = useState<WeatherData | null>(null);
  const fahrenheit = h.config.unit_system.temperature === "°F";
  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    const load = () => {
      const p = new URLSearchParams({
        latitude: String(h.config.latitude),
        longitude: String(h.config.longitude),
        current: "temperature_2m,weather_code,is_day",
        hourly: "temperature_2m,weather_code,precipitation_probability,is_day",
        daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
        timezone: "auto",
        forecast_days: "7",
        temperature_unit: fahrenheit ? "fahrenheit" : "celsius",
      });
      fetch(`https://api.open-meteo.com/v1/forecast?${p}`)
        .then((r) => r.json())
        .then((j) => {
          if (!alive || !j.current) return;
          const nowIdx = Math.max(0, j.hourly.time.findIndex((t: string) => new Date(t) >= new Date()) - 1);
          setData({
            source: "open-meteo",
            unit: fahrenheit ? "°F" : "°C",
            condition: wmoToCondition(j.current.weather_code, !!j.current.is_day),
            temp: j.current.temperature_2m,
            hourly: j.hourly.time.slice(nowIdx, nowIdx + 24).map((t: string, i: number) => ({
              time: t,
              condition: wmoToCondition(j.hourly.weather_code[nowIdx + i], !!j.hourly.is_day[nowIdx + i]),
              temp: j.hourly.temperature_2m[nowIdx + i],
              precip: j.hourly.precipitation_probability?.[nowIdx + i],
            })),
            daily: j.daily.time.map((t: string, i: number) => ({
              time: t,
              condition: wmoToCondition(j.daily.weather_code[i]),
              high: j.daily.temperature_2m_max[i],
              low: j.daily.temperature_2m_min[i],
              precip: j.daily.precipitation_probability_max?.[i],
            })),
          });
        })
        .catch(() => undefined);
    };
    load();
    const t = window.setInterval(load, 30 * 60 * 1000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [enabled, h.config.latitude, h.config.longitude, fahrenheit]);
  return data;
}

export function useWeather(h: Hass, cfg: DashConfig): WeatherData | null {
  return useWeatherFor(h, cfg.header.weatherEntity, cfg.header.weatherFallback);
}

export function useWeatherFor(h: Hass, id: string | undefined, fallback: boolean): WeatherData | null {
  const s = id ? h.states[id] : undefined;
  const daily = useEntityForecast(h, id, "daily");
  const hourly = useEntityForecast(h, id, "hourly");
  const meteo = useOpenMeteo(h, !s && fallback);
  if (s) {
    return {
      source: "entity",
      condition: s.state,
      temp: s.attributes.temperature,
      unit: s.attributes.temperature_unit ?? h.config.unit_system.temperature,
      hourly: hourly.slice(0, 24).map((f) => ({ time: f.datetime, condition: f.condition, temp: f.temperature, precip: f.precipitation_probability })),
      daily: daily.slice(0, 7).map((f) => ({ time: f.datetime, condition: f.condition, high: f.temperature, low: f.templow, precip: f.precipitation_probability })),
    };
  }
  return meteo;
}

export function WeatherModal({ data, lang, h24, onClose }: { data: WeatherData; lang: string; h24: boolean; onClose?: () => void }) {
  const close = onClose ?? (() => (openWidget.value = null));
  return (
    <Modal title="Weather" onClose={close} wide>
      <div class="weather-now">
        <Icon icon={conditionIcon(data.condition)} size={56} />
        <div>
          <div class="weather-temp">{data.temp != null ? `${Math.round(data.temp)}${data.unit}` : "—"}</div>
          <div class="muted">{conditionLabel(data.condition)}</div>
        </div>
      </div>
      {data.hourly.length > 0 && (
        <>
          <div class="labeled-label">Next hours</div>
          <div class="hourly">
            {data.hourly.map((f) => (
              <div class="hour">
                <span class="muted">{formatTime(new Date(f.time), h24, lang).replace(":00", "")}</span>
                <Icon icon={conditionIcon(f.condition)} size={26} />
                <strong>{Math.round(f.temp)}°</strong>
                {f.precip != null && f.precip > 0 && <span class="precip">{f.precip}%</span>}
              </div>
            ))}
          </div>
        </>
      )}
      {data.daily.length > 0 && (
        <>
          <div class="labeled-label">Next 7 days</div>
          <div class="daily">
            {data.daily.map((f, i) => (
              <div class="day">
                <span class="day-name">{i === 0 ? "Today" : new Date(f.time).toLocaleDateString(lang, { weekday: "long" })}</span>
                <Icon icon={conditionIcon(f.condition)} size={24} />
                <span class="precip">{f.precip ? `${f.precip}%` : ""}</span>
                <span class="day-temps">
                  <strong>{Math.round(f.high)}°</strong>
                  {f.low != null && <span class="muted"> {Math.round(f.low)}°</span>}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
      {data.source === "open-meteo" && <p class="muted small">Forecast by Open-Meteo for your home location.</p>}
    </Modal>
  );
}

// ---------- Calendar ----------

export interface CalEvent {
  summary: string;
  start: Date;
  end: Date;
  allDay: boolean;
  location?: string;
  calendar: string;
}

function parseWhen(w: { dateTime?: string; date?: string }): [Date, boolean] {
  if (w.dateTime) return [new Date(w.dateTime), false];
  const [y, m, d] = (w.date ?? "").split("-").map(Number);
  return [new Date(y, m - 1, d), true];
}

export function useEvents(h: Hass, calendars: string[], start: Date, end: Date, refreshKey = 0) {
  const [events, setEvents] = useState<CalEvent[]>([]);
  const key = `${calendars.join(",")}|${start.toISOString()}|${end.toISOString()}|${refreshKey}`;
  useEffect(() => {
    if (!calendars.length) {
      setEvents([]);
      return;
    }
    let alive = true;
    const q = `start=${encodeURIComponent(start.toISOString())}&end=${encodeURIComponent(end.toISOString())}`;
    Promise.all(
      calendars.map((c) =>
        h
          .callApi<any[]>("GET", `calendars/${c}?${q}`)
          .then((rows) =>
            rows.map((r) => {
              const [s, allDay] = parseWhen(r.start);
              const [e] = parseWhen(r.end);
              return { summary: r.summary, start: s, end: e, allDay, location: r.location, calendar: c } as CalEvent;
            }),
          )
          .catch(() => [] as CalEvent[]),
      ),
    ).then((all) => alive && setEvents(all.flat().sort((a, b) => a.start.getTime() - b.start.getTime())));
    return () => {
      alive = false;
    };
  }, [key]);
  return events;
}

export function eventTime(e: CalEvent, lang: string, h24: boolean) {
  if (e.allDay) return "All day";
  return formatTime(e.start, h24, lang);
}

export function CalendarModal({ cfg, lang, calendars, onClose }: { cfg: DashConfig; lang: string; calendars?: string[]; onClose?: () => void }) {
  const h = hass.value!;
  const [month, setMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [selected, setSelected] = useState(() => new Date().toDateString());
  const gridStart = useMemo(() => {
    const s = new Date(month);
    s.setDate(1 - s.getDay());
    return s;
  }, [month]);
  const gridEnd = useMemo(() => {
    const e = new Date(gridStart);
    e.setDate(e.getDate() + 42);
    return e;
  }, [gridStart]);
  const events = useEvents(h, calendars ?? cfg.header.calendars, gridStart, gridEnd);
  const byDay = new Map<string, CalEvent[]>();
  for (const e of events) {
    // multi-day events appear on each day they cover
    const d = new Date(e.start);
    d.setHours(0, 0, 0, 0);
    const last = new Date(e.allDay ? e.end.getTime() - 1 : e.end.getTime());
    do {
      const k = d.toDateString();
      byDay.set(k, [...(byDay.get(k) ?? []), e]);
      d.setDate(d.getDate() + 1);
    } while (d <= last);
  }
  const days = Array.from({ length: 42 }, (_, i) => {
    const d = new Date(gridStart);
    d.setDate(d.getDate() + i);
    return d;
  });
  const today = new Date().toDateString();
  const dayEvents = byDay.get(selected) ?? [];
  const shift = (n: number) => setMonth(new Date(month.getFullYear(), month.getMonth() + n, 1));
  return (
    <Modal title="Calendar" onClose={onClose ?? (() => (openWidget.value = null))} wide>
      <div class="cal-head">
        <IconButton icon="mdi:chevron-left" label="Previous month" onClick={() => shift(-1)} />
        <strong>{month.toLocaleDateString(lang, { month: "long", year: "numeric" })}</strong>
        <IconButton icon="mdi:chevron-right" label="Next month" onClick={() => shift(1)} />
      </div>
      <div class="cal-grid">
        {days.slice(0, 7).map((d) => (
          <div class="cal-dow">{d.toLocaleDateString(lang, { weekday: "narrow" })}</div>
        ))}
        {days.map((d) => {
          const k = d.toDateString();
          const n = byDay.get(k)?.length ?? 0;
          return (
            <button
              type="button"
              class={`cal-day ${d.getMonth() !== month.getMonth() ? "other" : ""} ${k === today ? "today" : ""} ${k === selected ? "selected" : ""}`}
              onClick={() => setSelected(k)}
            >
              <span>{d.getDate()}</span>
              {n > 0 && <span class="cal-dots">{"•".repeat(Math.min(n, 3))}</span>}
            </button>
          );
        })}
      </div>
      <div class="labeled-label">{new Date(selected).toLocaleDateString(lang, { weekday: "long", month: "long", day: "numeric" })}</div>
      {dayEvents.length === 0 ? (
        <p class="muted">Nothing planned.</p>
      ) : (
        <ul class="agenda">
          {dayEvents.map((e) => (
            <li>
              <span class="agenda-time">{eventTime(e, lang, cfg.header.clock24h)}</span>
              <span class="agenda-text">
                <strong>{e.summary}</strong>
                <span class="muted small">{[e.location, entityName(h, e.calendar)].filter(Boolean).join(" · ")}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
}

// ---------- Reminders (to-do lists) ----------

interface TodoItem {
  uid: string;
  summary: string;
  status: "needs_action" | "completed";
  due?: string;
}

function useTodo(h: Hass, entityId: string) {
  const [items, setItems] = useState<TodoItem[]>([]);
  useEffect(() => {
    let alive = true;
    let unsub: (() => Promise<void>) | undefined;
    h.connection
      .subscribeMessage<{ items: TodoItem[] }>((m) => alive && setItems(m.items ?? []), {
        type: "todo/item/subscribe",
        entity_id: entityId,
      })
      .then((u) => {
        if (alive) unsub = u;
        else u();
      })
      .catch(() =>
        h
          .callWS<{ items: TodoItem[] }>({ type: "todo/item/list", entity_id: entityId })
          .then((r) => alive && setItems(r.items))
          .catch(() => undefined),
      );
    return () => {
      alive = false;
      unsub?.().catch(() => undefined);
    };
  }, [entityId]);
  return items;
}

export function openTodoCount(h: Hass, lists: string[]): number {
  return lists.reduce((n, id) => n + (Number(h.states[id]?.state) || 0), 0);
}

function TodoList({ entityId }: { entityId: string }) {
  const h = hass.value!;
  const items = useTodo(h, entityId);
  const [text, setText] = useState("");
  const open = items.filter((i) => i.status === "needs_action");
  const done = items.filter((i) => i.status === "completed").slice(0, 5);
  const add = () => {
    if (!text.trim()) return;
    call("todo", "add_item", { entity_id: entityId, item: text.trim() });
    setText("");
  };
  const set = (i: TodoItem, completed: boolean) =>
    call("todo", "update_item", { entity_id: entityId, item: i.uid, status: completed ? "completed" : "needs_action" });
  return (
    <div class="todo">
      <div class="labeled-label">{entityName(h, entityId)}</div>
      <form
        class="todo-add"
        onSubmit={(e) => {
          e.preventDefault();
          add();
        }}
      >
        <TextInput value={text} onInput={setText} placeholder="Add a reminder" />
        <Button icon="mdi:plus" onClick={add}>Add</Button>
      </form>
      <ul class="todo-items">
        {open.map((i) => (
          <li>
            <Checkbox checked={false} onChange={() => set(i, true)} />
            <span>{i.summary}</span>
            {i.due && <span class="muted small">{new Date(i.due).toLocaleDateString()}</span>}
          </li>
        ))}
        {done.map((i) => (
          <li class="done">
            <Checkbox checked onChange={() => set(i, false)} />
            <span>{i.summary}</span>
          </li>
        ))}
        {items.length === 0 && <li class="muted">All clear.</li>}
      </ul>
    </div>
  );
}

export function TodoModal({ cfg, lists, onClose }: { cfg: DashConfig; lists?: string[]; onClose?: () => void }) {
  return (
    <Modal title="Reminders" onClose={onClose ?? (() => (openWidget.value = null))} wide>
      {(lists ?? cfg.header.todoLists).map((id) => (
        <TodoList entityId={id} />
      ))}
    </Modal>
  );
}
