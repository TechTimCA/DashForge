import { createContext, createElement, type ComponentChildren } from "preact";
import { useContext, useEffect, useRef, useState } from "preact/hooks";
import { lineIcon } from "../icons";

/** Which icon set the current style uses: Home Assistant's, or DashForge's own outline icons. */
export const IconStyle = createContext<{ line: boolean; stroke: number }>({ line: false, stroke: 2 });

export function Icon({ icon, size = 24, class: cls }: { icon: string; size?: number; class?: string }) {
  const style = useContext(IconStyle);
  const node = style.line ? lineIcon(icon) : undefined;
  if (node) {
    return (
      <svg
        class={`df-icon ${cls ?? ""}`}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width={style.stroke}
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        {node.map(([tag, attrs]) => createElement(tag, attrs as Record<string, unknown>))}
      </svg>
    );
  }
  return <ha-icon icon={icon} class={cls} style={`--mdc-icon-size:${size}px;width:${size}px;height:${size}px`} />;
}

export function IconButton(props: {
  icon: string;
  label: string;
  onClick: (e: MouseEvent) => void;
  active?: boolean;
  size?: number;
  class?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      class={`icon-btn ${props.active ? "active" : ""} ${props.class ?? ""}`}
      title={props.label}
      aria-label={props.label}
      disabled={props.disabled}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        props.onClick(e);
      }}
    >
      <Icon icon={props.icon} size={props.size ?? 22} />
    </button>
  );
}

export function Button(props: {
  children: ComponentChildren;
  onClick: () => void;
  kind?: "primary" | "ghost" | "danger" | "plain";
  icon?: string;
  disabled?: boolean;
  class?: string;
}) {
  return (
    <button
      type="button"
      class={`btn btn-${props.kind ?? "plain"} ${props.class ?? ""}`}
      disabled={props.disabled}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        props.onClick();
      }}
    >
      {props.icon && <Icon icon={props.icon} size={18} />}
      <span>{props.children}</span>
    </button>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      class={`toggle ${checked ? "on" : ""}`}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
    >
      <span class="knob" />
    </button>
  );
}

/**
 * Touch-friendly slider. Shows the value live while dragging and only calls
 * onCommit when released, so a drag sends one service call, not hundreds.
 */
export function Slider(props: {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  vertical?: boolean;
  onCommit: (v: number) => void;
  label?: string;
  color?: string;
  format?: (v: number) => string;
  class?: string;
}) {
  const min = props.min ?? 0;
  const max = props.max ?? 100;
  const step = props.step ?? 1;
  const [live, setLive] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const value = live ?? props.value;
  const pct = max === min ? 0 : ((value - min) / (max - min)) * 100;

  const fromPointer = (e: PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const ratio = props.vertical
      ? 1 - (e.clientY - r.top) / r.height
      : (e.clientX - r.left) / r.width;
    const raw = min + Math.min(1, Math.max(0, ratio)) * (max - min);
    return Math.round(raw / step) * step;
  };

  const onDown = (e: PointerEvent) => {
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setLive(fromPointer(e));
  };
  const onMove = (e: PointerEvent) => {
    if (live === null) return;
    e.stopPropagation();
    setLive(fromPointer(e));
  };
  const onUp = (e: PointerEvent) => {
    if (live === null) return;
    e.stopPropagation();
    const v = fromPointer(e);
    setLive(null);
    props.onCommit(v);
  };
  const onKey = (e: KeyboardEvent) => {
    const delta = ["ArrowUp", "ArrowRight"].includes(e.key)
      ? step
      : ["ArrowDown", "ArrowLeft"].includes(e.key)
        ? -step
        : 0;
    if (!delta) return;
    e.preventDefault();
    props.onCommit(Math.min(max, Math.max(min, props.value + delta * (e.shiftKey ? 10 : 1))));
  };

  return (
    <div
      ref={ref}
      class={`slider ${props.vertical ? "vertical" : ""} ${live !== null ? "dragging" : ""} ${props.class ?? ""}`}
      role="slider"
      tabIndex={0}
      aria-label={props.label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      style={props.color ? `--slider-color:${props.color}` : undefined}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={() => setLive(null)}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={onKey}
    >
      <div
        class="slider-fill"
        style={props.vertical ? `height:${pct}%` : `width:${pct}%`}
      />
      {props.format && <span class="slider-label">{props.format(value)}</span>}
    </div>
  );
}

export function Modal(props: {
  title: string;
  onClose: () => void;
  children: ComponentChildren;
  wide?: boolean;
  footer?: ComponentChildren;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && props.onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [props.onClose]);
  return (
    <div class="modal-backdrop" onClick={props.onClose}>
      <div
        class={`modal ${props.wide ? "wide" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={props.title}
        onClick={(e) => e.stopPropagation()}
      >
        <div class="modal-head">
          <h2>{props.title}</h2>
          <IconButton icon="mdi:close" label="Close" onClick={props.onClose} />
        </div>
        <div class="modal-body">{props.children}</div>
        {props.footer && <div class="modal-foot">{props.footer}</div>}
      </div>
    </div>
  );
}

export function Segmented<T extends string>(props: {
  value: T;
  options: { value: T; label: string; icon?: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div class="segmented" role="radiogroup">
      {props.options.map((o) => (
        <button
          type="button"
          role="radio"
          aria-checked={o.value === props.value}
          class={o.value === props.value ? "selected" : ""}
          onClick={(e) => {
            e.stopPropagation();
            props.onChange(o.value);
          }}
        >
          {o.icon && <Icon icon={o.icon} size={18} />}
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Field(props: { label: string; hint?: string; children: ComponentChildren }) {
  return (
    <label class="field">
      <span class="field-label">{props.label}</span>
      {props.children}
      {props.hint && <span class="field-hint">{props.hint}</span>}
    </label>
  );
}

export function TextInput(props: {
  value: string;
  onInput: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      class="input"
      type={(props.type ?? "text") as "text"}
      value={props.value}
      placeholder={props.placeholder}
      onInput={(e) => props.onInput((e.target as HTMLInputElement).value)}
    />
  );
}

export function Row(props: { label: string; hint?: string; children: ComponentChildren }) {
  return (
    <div class="row">
      <div class="row-text">
        <div class="row-label">{props.label}</div>
        {props.hint && <div class="row-hint">{props.hint}</div>}
      </div>
      <div class="row-control">{props.children}</div>
    </div>
  );
}

export function Checkbox({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      class={`checkbox ${checked ? "on" : ""}`}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
    >
      {checked && <Icon icon="mdi:check" size={16} />}
    </button>
  );
}

const COMMON_ICONS = [
  "mdi:sofa",
  "mdi:bed",
  "mdi:silverware-fork-knife",
  "mdi:stove",
  "mdi:shower",
  "mdi:desk",
  "mdi:garage",
  "mdi:tree",
  "mdi:stairs",
  "mdi:television",
  "mdi:washing-machine",
  "mdi:baby-carriage",
  "mdi:dumbbell",
  "mdi:home",
  "mdi:door",
  "mdi:lightbulb-group",
  "mdi:flower",
  "mdi:server",
  "mdi:car",
  "mdi:star",
  "mdi:shield-home",
  "mdi:music",
  "mdi:gamepad-variant",
  "mdi:coffee",
];

/** Pick from a few common icons, or type any mdi: name. */
export function IconPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div class="icon-picker">
      <div class="icon-grid">
        {COMMON_ICONS.map((i) => (
          <button
            type="button"
            class={`icon-choice ${value === i ? "selected" : ""}`}
            aria-label={i}
            onClick={(e) => {
              e.stopPropagation();
              onChange(i);
            }}
          >
            <Icon icon={i} size={22} />
          </button>
        ))}
      </div>
      <TextInput value={value} onInput={onChange} placeholder="mdi:icon-name" />
    </div>
  );
}

/** Press and hold detection that does not break scrolling or normal taps. */
export function useLongPress(onLong: () => void, onTap: () => void, ms = 500) {
  const timer = useRef<number | undefined>(undefined);
  const long = useRef(false);
  const start = useRef<{ x: number; y: number } | null>(null);
  return {
    onPointerDown: (e: PointerEvent) => {
      long.current = false;
      start.current = { x: e.clientX, y: e.clientY };
      timer.current = window.setTimeout(() => {
        long.current = true;
        onLong();
      }, ms);
    },
    onPointerMove: (e: PointerEvent) => {
      if (!start.current) return;
      if (Math.abs(e.clientX - start.current.x) > 8 || Math.abs(e.clientY - start.current.y) > 8) {
        clearTimeout(timer.current);
        start.current = null;
      }
    },
    onPointerUp: () => {
      clearTimeout(timer.current);
      const wasTap = start.current && !long.current;
      start.current = null;
      if (wasTap) onTap();
    },
    onPointerLeave: () => {
      clearTimeout(timer.current);
      start.current = null;
    },
    onContextMenu: (e: Event) => e.preventDefault(),
  };
}
