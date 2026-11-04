import { useEffect, useState } from "preact/hooks";
import type { Hass } from "../types";

export interface Point {
  t: number;
  v: number;
}

/** Numeric history for one entity, refreshed every few minutes. */
export function useHistory(h: Hass, entityId: string, hours = 24, refreshMinutes = 5): Point[] | null {
  const [points, setPoints] = useState<Point[] | null>(null);
  useEffect(() => {
    let alive = true;
    const load = () => {
      const end = new Date();
      const start = new Date(end.getTime() - hours * 3600 * 1000);
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
          setPoints(
            (res[entityId] ?? [])
              .map((r) => ({ t: r.lu * 1000, v: Number(r.s) }))
              .filter((p) => !Number.isNaN(p.v)),
          );
        })
        .catch(() => alive && setPoints([]));
    };
    load();
    const t = window.setInterval(load, refreshMinutes * 60_000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [entityId, hours]);
  return points;
}

/** Step-line chart with a soft fill. `now` is the current value, drawn to the right edge. */
export function LineChart(props: {
  points: Point[];
  now?: number;
  height?: number;
  class?: string;
  label?: string;
  showDot?: boolean;
}) {
  const W = 320;
  const H = props.height ?? 120;
  const pts = [...props.points];
  const end = Date.now();
  if (props.now != null && !Number.isNaN(props.now)) pts.push({ t: end, v: props.now });
  if (pts.length < 2) return null;
  const t0 = pts[0].t;
  const vs = pts.map((p) => p.v);
  let lo = Math.min(...vs);
  let hi = Math.max(...vs);
  if (hi === lo) {
    hi += 1;
    lo -= 1;
  }
  const pad = (hi - lo) * 0.1;
  lo -= pad;
  hi += pad;
  const x = (t: number) => ((t - t0) / (end - t0 || 1)) * W;
  const y = (v: number) => H - ((v - lo) / (hi - lo)) * H;
  let d = `M${x(pts[0].t).toFixed(1)},${y(pts[0].v).toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) d += ` H${x(pts[i].t).toFixed(1)} V${y(pts[i].v).toFixed(1)}`;
  d += ` H${W}`;
  const last = pts[pts.length - 1];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" class={`line-chart ${props.class ?? ""}`} role="img" aria-label={props.label ?? "History"}>
      <defs>
        <linearGradient id="lc-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="var(--chart, var(--accent))" stop-opacity="0.35" />
          <stop offset="1" stop-color="var(--chart, var(--accent))" stop-opacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} V${H} H${x(pts[0].t).toFixed(1)} Z`} fill="url(#lc-fill)" />
      <path d={d} class="chart-line" />
      {props.showDot && <circle cx={W - 2} cy={y(last.v)} r="4" class="chart-dot" />}
    </svg>
  );
}
