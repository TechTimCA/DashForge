import { signal } from "@preact/signals";
import { useMemo, useState } from "preact/hooks";
import { newCard, newSection } from "../config";
import {
  DOMAIN_LABELS,
  defaultCardSize,
  domainOf,
  entityIcon,
  entityName,
  isDashboardEntity,
  stateLabel,
} from "../entities";
import { cancelEditing, draft, finishEditing, hass, updateDraft, view } from "../store";
import type { CardConfig, CardSize, Hass } from "../types";
import { Button, Field, Icon, IconPicker, Modal, Row, Segmented, TextInput, Toggle } from "./ui";
import { ACCENTS } from "../config";

export const pickerFor = signal<string | null>(null);
export const cardEditor = signal<{ sectionId: string; cardId: string } | null>(null);
export const sectionEditor = signal<string | "new" | null>(null);
export const hiddenTrayFor = signal<string | null>(null);

// ---------- Entity search used by edit mode and the wizard ----------

function areaOf(h: Hass, id: string): string {
  const e = h.entities?.[id];
  const areaId = e?.area_id ?? (e?.device_id ? h.devices?.[e.device_id]?.area_id : null);
  return areaId ? (h.areas?.[areaId]?.name ?? "Other") : "No area";
}

export function EntitySearch(props: {
  isSelected: (id: string) => boolean;
  onToggle: (id: string) => void;
  domains?: string[];
  autofocus?: boolean;
}) {
  const h = hass.value!;
  const [q, setQ] = useState("");
  const [domain, setDomain] = useState("all");
  const all = useMemo(
    () =>
      Object.keys(h.states)
        .filter((id) => isDashboardEntity(h, id) && (!props.domains || props.domains.includes(domainOf(id))))
        .sort((a, b) => entityName(h, a).localeCompare(entityName(h, b))),
    [Object.keys(h.states).length],
  );
  const domains = useMemo(() => [...new Set(all.map(domainOf))].sort(), [all]);
  const needle = q.trim().toLowerCase();
  const matches = all.filter(
    (id) =>
      (domain === "all" || domainOf(id) === domain) &&
      (!needle ||
        id.toLowerCase().includes(needle) ||
        entityName(h, id).toLowerCase().includes(needle) ||
        areaOf(h, id).toLowerCase().includes(needle)),
  );
  const groups = new Map<string, string[]>();
  for (const id of matches.slice(0, 400)) {
    const a = areaOf(h, id);
    groups.set(a, [...(groups.get(a) ?? []), id]);
  }
  return (
    <div class="entity-search">
      <div class="search-bar">
        <Icon icon="mdi:magnify" size={20} />
        <input
          class="input bare"
          value={q}
          placeholder="Search by name, room or entity ID"
          autoFocus={props.autofocus}
          onInput={(e) => setQ((e.target as HTMLInputElement).value)}
        />
      </div>
      {!props.domains && (
        <div class="chips scroll">
          <button type="button" class={`chip ${domain === "all" ? "selected" : ""}`} onClick={() => setDomain("all")}>All</button>
          {domains.map((d) => (
            <button type="button" class={`chip ${domain === d ? "selected" : ""}`} onClick={() => setDomain(d)}>
              {DOMAIN_LABELS[d] ?? d}
            </button>
          ))}
        </div>
      )}
      <div class="entity-list">
        {[...groups.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([area, ids]) => (
          <div class="entity-group">
            <div class="labeled-label">{area}</div>
            {ids.map((id) => (
              <EntityRow id={id} selected={props.isSelected(id)} onToggle={() => props.onToggle(id)} />
            ))}
          </div>
        ))}
        {matches.length === 0 && <p class="muted">No matching devices.</p>}
        {matches.length > 400 && <p class="muted small">Showing the first 400. Search to narrow it down.</p>}
      </div>
    </div>
  );
}

export function EntityRow({ id, selected, onToggle, room }: { id: string; selected: boolean; onToggle: () => void; room?: string }) {
  const h = hass.value!;
  return (
    <button type="button" class={`entity-row ${selected ? "selected" : ""}`} onClick={onToggle} aria-pressed={selected}>
      <Icon icon={entityIcon(h, id)} size={22} />
      <span class="entity-row-text">
        <span>{entityName(h, id, undefined, room)}</span>
        <span class="muted small">{stateLabel(h, h.states[id])} · {id}</span>
      </span>
      <span class={`checkbox ${selected ? "on" : ""}`}>{selected && <Icon icon="mdi:check" size={16} />}</span>
    </button>
  );
}

// ---------- Edit bar ----------

export function EditBar() {
  const cfg = draft.value;
  if (!cfg) return null;
  const v = view.value;
  const section = v?.type === "section" ? cfg.sections.find((s) => s.id === v.id) : cfg.sections[0];
  const hidden = section?.cards.filter((c) => c.hidden).length ?? 0;
  return (
    <div class="edit-bar" role="toolbar" aria-label="Edit dashboard">
      <div class="edit-bar-group">
        {section && (
          <>
            <Button icon="mdi:plus" onClick={() => (pickerFor.value = section.id)}>Add device</Button>
            <Button icon="mdi:pencil" onClick={() => (sectionEditor.value = section.id)}>Edit {section.kind === "room" ? "room" : "page"}</Button>
            {hidden > 0 && <Button icon="mdi:eye-off" onClick={() => (hiddenTrayFor.value = section.id)}>Hidden ({hidden})</Button>}
          </>
        )}
        <Button icon="mdi:folder-plus" onClick={() => (sectionEditor.value = "new")}>New room or page</Button>
      </div>
      <div class="edit-bar-group">
        <Button kind="ghost" onClick={cancelEditing}>Cancel</Button>
        <Button kind="primary" icon="mdi:check" onClick={finishEditing}>Done</Button>
      </div>
    </div>
  );
}

// ---------- Add devices to a room/page ----------

export function PickerModal() {
  const id = pickerFor.value;
  const cfg = draft.value;
  const section = cfg?.sections.find((s) => s.id === id);
  if (!section) return null;
  const has = (eid: string) => section.cards.some((c) => c.entity === eid && !c.hidden);
  const toggle = (eid: string) =>
    updateDraft((c) => {
      const s = c.sections.find((x) => x.id === section.id)!;
      const existing = s.cards.find((x) => x.entity === eid);
      if (existing) {
        if (existing.hidden) existing.hidden = false;
        else s.cards = s.cards.filter((x) => x.entity !== eid);
      } else s.cards.push(newCard(eid, defaultCardSize(eid)));
    });
  return (
    <Modal
      title={`Add to ${section.name}`}
      onClose={() => (pickerFor.value = null)}
      wide
      footer={<Button kind="primary" onClick={() => (pickerFor.value = null)}>Done</Button>}
    >
      <EntitySearch isSelected={has} onToggle={toggle} autofocus />
    </Modal>
  );
}

// ---------- Card editor ----------

const SIZE_OPTIONS: { value: CardSize; label: string }[] = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
  { value: "wide", label: "Wide" },
];

export function CardEditorModal() {
  const ref = cardEditor.value;
  const cfg = draft.value;
  const h = hass.value;
  const section = cfg?.sections.find((s) => s.id === ref?.sectionId);
  const card = section?.cards.find((c) => c.id === ref?.cardId);
  if (!ref || !section || !card || !h) return null;
  const set = (fn: (c: CardConfig) => void) =>
    updateDraft((c) => {
      const target = c.sections.find((s) => s.id === section.id)?.cards.find((x) => x.id === card.id);
      if (target) fn(target);
    });
  const close = () => (cardEditor.value = null);
  return (
    <Modal
      title="Edit card"
      onClose={close}
      footer={
        <>
          <Button
            kind="danger"
            icon="mdi:delete"
            onClick={() => {
              updateDraft((c) => {
                const s = c.sections.find((x) => x.id === section.id)!;
                s.cards = s.cards.filter((x) => x.id !== card.id);
              });
              close();
            }}
          >
            Remove
          </Button>
          <Button kind="primary" onClick={close}>Done</Button>
        </>
      }
    >
      <p class="muted small">{card.entity}</p>
      <Field label="Name" hint="Leave empty to use the name from Home Assistant.">
        <TextInput value={card.name ?? ""} placeholder={entityName(h, card.entity, undefined, section.name)} onInput={(v) => set((c) => (c.name = v || undefined))} />
      </Field>
      <Field label="Size">
        <Segmented value={card.size} options={SIZE_OPTIONS} onChange={(v) => set((c) => (c.size = v))} />
      </Field>
      <Field label="Icon" hint="Leave empty to use the default icon.">
        <IconPicker value={card.icon ?? ""} onChange={(v) => set((c) => (c.icon = v || undefined))} />
      </Field>
      <Field label="Colour" hint="Used when the device is on. Automatic picks a colour for the kind of device.">
        <div class="swatches">
          <button type="button" class={`swatch auto-swatch ${!card.color ? "selected" : ""}`} aria-label="Automatic" onClick={() => set((c) => (c.color = undefined))}>
            <Icon icon="mdi:auto-fix" size={18} />
          </button>
          {[...ACCENTS, "#f43f5e", "#06b6d4", "#a855f7", "#fbbf24"].map((col) => (
            <button type="button" class={`swatch ${card.color === col ? "selected" : ""}`} aria-label={col} style={`background:${col}`} onClick={() => set((c) => (c.color = col))} />
          ))}
          <input type="color" class="swatch color-input" aria-label="Custom colour" value={card.color ?? "#6366f1"} onInput={(e) => set((c) => (c.color = (e.target as HTMLInputElement).value))} />
        </div>
      </Field>
      <Field label="When tapped">
        <select class="input" value={card.tap ?? "auto"} onChange={(e) => set((c) => (c.tap = ((e.target as HTMLSelectElement).value as CardConfig["tap"]) ?? "auto"))}>
          <option value="auto">Do the usual thing (toggle, run, play…)</option>
          <option value="toggle">Toggle on and off</option>
          <option value="details">Open DashForge controls</option>
          <option value="more-info">Open Home Assistant details</option>
          <option value="none">Do nothing</option>
        </select>
      </Field>
      <Row label="Show on Home" hint="Pin this card to the Favourites on the Home screen">
        <Toggle checked={!!card.favorite} onChange={(v) => set((c) => (c.favorite = v || undefined))} />
      </Row>
      {card.entity.startsWith("camera.") && (
        <Row label="Live video" hint="Stream the camera instead of refreshing a picture every 10 seconds">
          <Toggle checked={!!card.live} onChange={(v) => set((c) => (c.live = v || undefined))} />
        </Row>
      )}
      <Field label="Move to">
        <select
          class="input"
          value={section.id}
          onChange={(e) => {
            const to = (e.target as HTMLSelectElement).value;
            if (to === section.id) return;
            updateDraft((c) => {
              const from = c.sections.find((s) => s.id === section.id)!;
              const dest = c.sections.find((s) => s.id === to)!;
              const moving = from.cards.find((x) => x.id === card.id)!;
              from.cards = from.cards.filter((x) => x.id !== card.id);
              dest.cards.push(moving);
            });
            close();
          }}
        >
          {cfg!.sections.map((s) => (
            <option value={s.id}>{s.name}</option>
          ))}
        </select>
      </Field>
    </Modal>
  );
}

// ---------- Hidden cards ----------

export function HiddenTray() {
  const id = hiddenTrayFor.value;
  const section = draft.value?.sections.find((s) => s.id === id);
  const h = hass.value;
  if (!section || !h) return null;
  const hidden = section.cards.filter((c) => c.hidden);
  return (
    <Modal title="Hidden cards" onClose={() => (hiddenTrayFor.value = null)}>
      {hidden.length === 0 && <p class="muted">No hidden cards.</p>}
      {hidden.map((c) => (
        <div class="row">
          <Icon icon={entityIcon(h, c.entity, c)} />
          <div class="row-text"><div class="row-label">{entityName(h, c.entity, c, section.name)}</div></div>
          <Button
            icon="mdi:eye"
            onClick={() =>
              updateDraft((cfg) => {
                const t = cfg.sections.find((s) => s.id === section.id)?.cards.find((x) => x.id === c.id);
                if (t) t.hidden = false;
              })
            }
          >
            Show
          </Button>
        </div>
      ))}
    </Modal>
  );
}

// ---------- Room / page editor ----------

export function SectionEditorModal() {
  const ref = sectionEditor.value;
  if (!ref || !draft.value || !hass.value) return null;
  return <SectionEditorInner key={ref} ref_={ref} />;
}

function SectionEditorInner({ ref_: ref }: { ref_: string }) {
  const cfg = draft.value!;
  const h = hass.value!;
  const [form, setForm] = useState<{ name: string; icon: string; kind: "room" | "page"; areaId?: string; floorId?: string; background?: string } | null>(null);
  const existing = ref === "new" ? null : cfg.sections.find((s) => s.id === ref);
  const f = form ?? (existing ? { name: existing.name, icon: existing.icon, kind: existing.kind, areaId: existing.areaId, floorId: existing.floorId, background: existing.background } : { name: "", icon: "mdi:home", kind: "room" as const });
  const close = () => {
    setForm(null);
    sectionEditor.value = null;
  };
  const idx = existing ? cfg.sections.indexOf(existing) : -1;
  const save = () => {
    if (!f.name.trim()) return;
    updateDraft((c) => {
      if (existing) {
        const s = c.sections.find((x) => x.id === existing.id)!;
        Object.assign(s, { name: f.name.trim(), icon: f.icon, kind: f.kind, areaId: f.areaId, floorId: f.floorId, background: f.background || undefined });
      } else {
        const s = newSection(f.kind, f.name.trim(), f.icon, f.areaId);
        s.floorId = f.floorId;
        s.background = f.background || undefined;
        c.sections.push(s);
        view.value = { type: "section", id: s.id };
      }
    });
    close();
  };
  const move = (dir: -1 | 1) =>
    updateDraft((c) => {
      const i = c.sections.findIndex((s) => s.id === existing!.id);
      const j = i + dir;
      if (j < 0 || j >= c.sections.length) return;
      [c.sections[i], c.sections[j]] = [c.sections[j], c.sections[i]];
    });
  return (
    <Modal
      title={existing ? `Edit ${existing.name}` : "New room or page"}
      onClose={close}
      footer={
        <>
          {existing && (
            <Button
              kind="danger"
              icon="mdi:delete"
              onClick={() => {
                if (!confirm(`Delete ${existing.name} and its cards from the dashboard? Nothing is deleted from Home Assistant.`)) return;
                updateDraft((c) => (c.sections = c.sections.filter((s) => s.id !== existing.id)));
                close();
              }}
            >
              Delete
            </Button>
          )}
          <Button kind="primary" onClick={save} disabled={!f.name.trim()}>
            {existing ? "Save" : "Create"}
          </Button>
        </>
      }
    >
      <Field label="Type">
        <Segmented
          value={f.kind}
          options={[
            { value: "room", label: "Room", icon: "mdi:sofa" },
            { value: "page", label: "Custom page", icon: "mdi:view-dashboard" },
          ]}
          onChange={(kind) => setForm({ ...f, kind })}
        />
      </Field>
      <Field label="Name">
        <TextInput value={f.name} onInput={(name) => setForm({ ...f, name })} placeholder={f.kind === "room" ? "Living room" : "Garden"} />
      </Field>
      {f.kind === "room" && Object.keys(h.areas ?? {}).length > 0 && (
        <Field label="Linked Home Assistant area" hint="Used to suggest devices. Optional.">
          <select class="input" value={f.areaId ?? ""} onChange={(e) => setForm({ ...f, areaId: (e.target as HTMLSelectElement).value || undefined })}>
            <option value="">None</option>
            {Object.values(h.areas ?? {}).map((a) => (
              <option value={a.area_id}>{a.name}</option>
            ))}
          </select>
        </Field>
      )}
      {f.kind === "room" && Object.keys(h.floors ?? {}).length > 0 && (
        <Field label="Floor" hint="Rooms are grouped by floor on the Home screen and in the room list.">
          <select class="input" value={f.floorId ?? ""} onChange={(e) => setForm({ ...f, floorId: (e.target as HTMLSelectElement).value || undefined })}>
            <option value="">{f.areaId && h.areas?.[f.areaId]?.floor_id ? `Same as the area (${h.floors?.[h.areas[f.areaId].floor_id!]?.name})` : "No floor"}</option>
            {Object.values(h.floors ?? {})
              .sort((a, b) => (a.level ?? 0) - (b.level ?? 0))
              .map((fl) => (
                <option value={fl.floor_id}>{fl.name}</option>
              ))}
          </select>
        </Field>
      )}
      <Field label="Icon">
        <IconPicker value={f.icon} onChange={(icon) => setForm({ ...f, icon })} />
      </Field>
      <Field label="Wallpaper" hint="Optional picture behind this room, e.g. /local/living-room.jpg from your config/www folder.">
        <TextInput value={f.background ?? ""} onInput={(background) => setForm({ ...f, background })} placeholder="/local/room.jpg" />
      </Field>
      {existing && cfg.sections.length > 1 && (
        <Field label="Order">
          <div class="btn-row">
            <Button icon="mdi:arrow-left" disabled={idx === 0} onClick={() => move(-1)}>Move earlier</Button>
            <Button icon="mdi:arrow-right" disabled={idx === cfg.sections.length - 1} onClick={() => move(1)}>Move later</Button>
          </div>
        </Field>
      )}
    </Modal>
  );
}
