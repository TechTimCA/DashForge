import { useState } from "preact/hooks";
import { ACCENTS, BACKGROUNDS, clone, newCard, newSection } from "../config";
import {
  DOMAIN_LABELS,
  defaultCardSize,
  domainOf,
  entitiesInArea,
  entitiesWithoutArea,
  entityName,
  isRecommended,
} from "../entities";
import { hass } from "../store";
import type { CardSize, DashConfig, Hass, LayoutId, SectionConfig } from "../types";
import { EntityRow, EntitySearch } from "./edit";
import { Button, Checkbox, Field, Icon, IconButton, IconPicker, Modal, Row, Segmented, Slider, TextInput, Toggle } from "./ui";

export type Setter = (fn: (c: DashConfig) => void) => void;
export interface StepProps {
  cfg: DashConfig;
  set: Setter;
}

export function makeSetter(get: () => DashConfig, put: (c: DashConfig) => void): Setter {
  return (fn) => {
    const next = clone(get());
    fn(next);
    put(next);
  };
}

const ICON_GUESSES: [RegExp, string][] = [
  [/kitchen/i, "mdi:stove"],
  [/living|lounge|family/i, "mdi:sofa"],
  [/bed|master|guest room/i, "mdi:bed"],
  [/bath|ensuite|toilet|washroom|powder/i, "mdi:shower"],
  [/office|study|den/i, "mdi:desk"],
  [/garage/i, "mdi:garage"],
  [/garden|yard|patio|deck|outdoor|outside|porch/i, "mdi:tree"],
  [/dining/i, "mdi:silverware-fork-knife"],
  [/basement|stairs/i, "mdi:stairs"],
  [/laundry|utility/i, "mdi:washing-machine"],
  [/kid|nursery|baby|child/i, "mdi:baby-carriage"],
  [/gym|workout|fitness/i, "mdi:dumbbell"],
  [/entry|hall|foyer|mudroom/i, "mdi:door"],
  [/media|theat|tv/i, "mdi:television"],
  [/server|network|rack/i, "mdi:server"],
];

export const guessIcon = (name: string) => ICON_GUESSES.find(([re]) => re.test(name))?.[1] ?? "mdi:home";

function seedRoom(h: Hass, areaId: string, name: string, icon?: string | null): SectionConfig {
  const s = newSection("room", name, icon || guessIcon(name), areaId);
  s.cards = entitiesInArea(h, areaId)
    .filter((id) => isRecommended(h, id))
    .map((id) => newCard(id, defaultCardSize(id)));
  return s;
}

/** First run: suggest every area that has devices. The user reviews this on the Rooms step. */
export function seedFirstRun(h: Hass, cfg: DashConfig) {
  if (cfg.sections.length) return;
  const floors = h.floors ?? {};
  const areas = Object.values(h.areas ?? {}).sort(
    (a, b) =>
      (floors[a.floor_id ?? ""]?.level ?? 99) - (floors[b.floor_id ?? ""]?.level ?? 99) || a.name.localeCompare(b.name),
  );
  for (const a of areas) {
    if (entitiesInArea(h, a.area_id).length) cfg.sections.push(seedRoom(h, a.area_id, a.name, a.icon));
  }
  const weather = Object.keys(h.states).find((id) => domainOf(id) === "weather");
  if (weather) cfg.header.weatherEntity = weather;
}

// ---------- 1. Welcome ----------

export function WelcomeStep({ cfg, set }: StepProps) {
  return (
    <div class="step">
      <p class="lead">
        DashForge builds a dashboard around the way you use your home. Each step asks you one thing; nothing is decided for you, and you can change all of it later in Settings or edit mode.
      </p>
      <Field label="Dashboard name">
        <TextInput value={cfg.title} onInput={(v) => set((c) => (c.title = v))} placeholder="Home" />
      </Field>
      <Field label="Your name" hint="Used for the greeting. Optional.">
        <TextInput value={cfg.userName} onInput={(v) => set((c) => (c.userName = v))} placeholder="Alex" />
      </Field>
      <Row label="Show a greeting" hint="“Good morning, Alex” instead of the dashboard name">
        <Toggle checked={cfg.header.greeting} onChange={(v) => set((c) => (c.header.greeting = v))} />
      </Row>
    </div>
  );
}

// ---------- 2. Rooms ----------

export function RoomsStep({ cfg, set }: StepProps) {
  const h = hass.value!;
  const [editing, setEditing] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const rooms = cfg.sections.filter((s) => s.kind === "room");
  const used = new Set(rooms.map((r) => r.areaId).filter(Boolean));
  const available = Object.values(h.areas ?? {})
    .filter((a) => !used.has(a.area_id))
    .sort((a, b) => a.name.localeCompare(b.name));

  const move = (id: string, dir: -1 | 1) =>
    set((c) => {
      const i = c.sections.findIndex((s) => s.id === id);
      let j = i + dir;
      while (j >= 0 && j < c.sections.length && c.sections[j].kind !== "room") j += dir;
      if (j < 0 || j >= c.sections.length) return;
      [c.sections[i], c.sections[j]] = [c.sections[j], c.sections[i]];
    });

  return (
    <div class="step">
      <p class="lead">Which rooms should be on your dashboard, and in what order? Areas from Home Assistant that have devices are suggested; remove any you don't want.</p>
      <div class="labeled-label">Your rooms ({rooms.length})</div>
      {rooms.length === 0 && <p class="muted">No rooms yet. Add one below.</p>}
      <div class="room-list">
        {rooms.map((r, i) => (
          <div class="room-item">
            <div class="room-row">
              <button type="button" class="icon-choice" aria-label="Change icon" onClick={() => setEditing(editing === r.id ? null : r.id)}>
                <Icon icon={r.icon} />
              </button>
              <input
                class="input"
                value={r.name}
                aria-label="Room name"
                onInput={(e) => {
                  const v = (e.target as HTMLInputElement).value;
                  set((c) => (c.sections.find((s) => s.id === r.id)!.name = v));
                }}
              />
              <span class="muted small nowrap">{r.areaId ? h.areas?.[r.areaId]?.name ?? "" : "Custom"}</span>
              <IconButton icon="mdi:arrow-up" label="Move up" disabled={i === 0} onClick={() => move(r.id, -1)} />
              <IconButton icon="mdi:arrow-down" label="Move down" disabled={i === rooms.length - 1} onClick={() => move(r.id, 1)} />
              <IconButton icon="mdi:close" label={`Remove ${r.name}`} onClick={() => set((c) => (c.sections = c.sections.filter((s) => s.id !== r.id)))} />
            </div>
            {editing === r.id && <IconPicker value={r.icon} onChange={(v) => set((c) => (c.sections.find((s) => s.id === r.id)!.icon = v))} />}
          </div>
        ))}
      </div>
      {available.length > 0 && (
        <>
          <div class="labeled-label">Add an area from Home Assistant</div>
          <div class="chips">
            {available.map((a) => (
              <button type="button" class="chip" onClick={() => set((c) => c.sections.push(seedRoom(h, a.area_id, a.name, a.icon)))}>
                <Icon icon="mdi:plus" size={16} /> {a.name}
                <span class="muted small">{entitiesInArea(h, a.area_id).length}</span>
              </button>
            ))}
          </div>
        </>
      )}
      <div class="labeled-label">Or add a room by name</div>
      <form
        class="inline-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!newName.trim()) return;
          set((c) => c.sections.push(newSection("room", newName.trim(), guessIcon(newName))));
          setNewName("");
        }}
      >
        <TextInput value={newName} onInput={setNewName} placeholder="e.g. Back yard" />
        <Button
          icon="mdi:plus"
          disabled={!newName.trim()}
          onClick={() => {
            set((c) => c.sections.push(newSection("room", newName.trim(), guessIcon(newName))));
            setNewName("");
          }}
        >
          Add room
        </Button>
      </form>
    </div>
  );
}

// ---------- 3. Devices ----------

const SIZE_LABELS: Record<CardSize, string> = { sm: "Small", md: "Medium", lg: "Large", wide: "Wide" };

export function DevicesStep({ cfg, set }: StepProps) {
  const h = hass.value!;
  const rooms = cfg.sections.filter((s) => s.kind === "room");
  const [open, setOpen] = useState<string | null>(rooms[0]?.id ?? null);
  const [adding, setAdding] = useState<string | null>(null);
  const unassigned = entitiesWithoutArea(h).length;

  const toggle = (roomId: string, eid: string) =>
    set((c) => {
      const s = c.sections.find((x) => x.id === roomId)!;
      if (s.cards.some((x) => x.entity === eid)) s.cards = s.cards.filter((x) => x.entity !== eid);
      else s.cards.push(newCard(eid, defaultCardSize(eid)));
    });

  if (!rooms.length) return <p class="muted">Add a room on the previous step first.</p>;

  return (
    <div class="step">
      <p class="lead">Pick the devices for each room. Suggestions are ticked; untick anything you don't want, choose a card size, or add devices from anywhere in your home.</p>
      {unassigned > 0 && (
        <p class="muted small">
          <Icon icon="mdi:information-outline" size={16} /> {unassigned} devices aren't in any Home Assistant area. Use “Add other devices” to place them.
        </p>
      )}
      <div class="accordion">
        {rooms.map((r) => {
          const inArea = r.areaId ? entitiesInArea(h, r.areaId) : [];
          const extra = r.cards.map((c) => c.entity).filter((e) => !inArea.includes(e));
          const list = [...inArea, ...extra];
          const groups = new Map<string, string[]>();
          for (const id of list) {
            const d = DOMAIN_LABELS[domainOf(id)] ?? domainOf(id);
            groups.set(d, [...(groups.get(d) ?? []), id]);
          }
          const isOpen = open === r.id;
          return (
            <div class={`acc-item ${isOpen ? "open" : ""}`}>
              <button type="button" class="acc-head" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : r.id)}>
                <Icon icon={r.icon} />
                <span class="acc-title">{r.name}</span>
                <span class="muted small">{r.cards.length} selected</span>
                <Icon icon={isOpen ? "mdi:chevron-up" : "mdi:chevron-down"} />
              </button>
              {isOpen && (
                <div class="acc-body">
                  <div class="btn-row">
                    <Button
                      kind="ghost"
                      onClick={() =>
                        set((c) => {
                          const s = c.sections.find((x) => x.id === r.id)!;
                          for (const id of list) if (!s.cards.some((x) => x.entity === id)) s.cards.push(newCard(id, defaultCardSize(id)));
                        })
                      }
                    >
                      Select all
                    </Button>
                    <Button kind="ghost" onClick={() => set((c) => (c.sections.find((x) => x.id === r.id)!.cards = []))}>Clear</Button>
                    <Button icon="mdi:plus" onClick={() => setAdding(r.id)}>Add other devices</Button>
                  </div>
                  {list.length === 0 && <p class="muted">No devices in this area yet. Use “Add other devices”.</p>}
                  {[...groups.entries()].map(([label, ids]) => (
                    <div class="entity-group">
                      <div class="labeled-label">{label}</div>
                      {ids.map((id) => {
                        const card = r.cards.find((c) => c.entity === id);
                        return (
                          <div class="device-line">
                            <EntityRow id={id} room={r.name} selected={!!card} onToggle={() => toggle(r.id, id)} />
                            {card && (
                              <select
                                class="input size-select"
                                aria-label={`Card size for ${entityName(h, id)}`}
                                value={card.size}
                                onChange={(e) => {
                                  const v = (e.target as HTMLSelectElement).value as CardSize;
                                  set((c) => (c.sections.find((x) => x.id === r.id)!.cards.find((x) => x.entity === id)!.size = v));
                                }}
                              >
                                {(Object.keys(SIZE_LABELS) as CardSize[]).map((s) => (
                                  <option value={s}>{SIZE_LABELS[s]}</option>
                                ))}
                              </select>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {adding && (
        <Modal title={`Add to ${rooms.find((r) => r.id === adding)?.name}`} onClose={() => setAdding(null)} wide footer={<Button kind="primary" onClick={() => setAdding(null)}>Done</Button>}>
          <EntitySearch
            autofocus
            isSelected={(id) => !!cfg.sections.find((s) => s.id === adding)?.cards.some((c) => c.entity === id)}
            onToggle={(id) => toggle(adding, id)}
          />
        </Modal>
      )}
    </div>
  );
}

// ---------- 4. Scenes & media ----------

export function ScenesMediaStep({ cfg, set }: StepProps) {
  const h = hass.value!;
  const players = Object.keys(h.states).filter((id) => domainOf(id) === "media_player").sort();
  return (
    <div class="step">
      <p class="lead">Scenes and scripts you pick here appear as one-tap buttons along the top of the dashboard.</p>
      <div class="labeled-label">Quick scenes ({cfg.header.sceneStrip.length})</div>
      <div class="picker-box">
        <EntitySearch
          domains={["scene", "script"]}
          isSelected={(id) => cfg.header.sceneStrip.includes(id)}
          onToggle={(id) =>
            set((c) => {
              const l = c.header.sceneStrip;
              c.header.sceneStrip = l.includes(id) ? l.filter((x) => x !== id) : [...l, id];
            })
          }
        />
      </div>
      <Field label="Main media player" hint="Shown in the header while it plays, and first on the Media page. Works with Spotify, Sonos, Cast and any other media player.">
        <select class="input" value={cfg.header.mediaPlayer ?? ""} onChange={(e) => set((c) => (c.header.mediaPlayer = (e.target as HTMLSelectElement).value || undefined))}>
          <option value="">None</option>
          {players.map((id) => (
            <option value={id}>{entityName(h, id)}</option>
          ))}
        </select>
      </Field>
    </div>
  );
}

// ---------- 5. Home screen widgets ----------

function MultiPick({ domain, value, onChange, empty }: { domain: string; value: string[]; onChange: (v: string[]) => void; empty: string }) {
  const h = hass.value!;
  const ids = Object.keys(h.states).filter((id) => domainOf(id) === domain).sort();
  if (!ids.length) return <p class="muted small">{empty}</p>;
  return (
    <div class="check-list">
      {ids.map((id) => (
        <label class="check-item">
          <Checkbox checked={value.includes(id)} onChange={(on) => onChange(on ? [...value, id] : value.filter((x) => x !== id))} />
          <span>{entityName(h, id)}</span>
        </label>
      ))}
    </div>
  );
}

export function WidgetsStep({ cfg, set }: StepProps) {
  const h = hass.value!;
  const weathers = Object.keys(h.states).filter((id) => domainOf(id) === "weather");
  const weatherValue = cfg.header.weatherEntity ?? (cfg.header.weatherFallback ? "__open_meteo" : "");
  return (
    <div class="step">
      <p class="lead">Choose what the top of your dashboard shows.</p>
      <Row label="Clock">
        <Toggle checked={cfg.header.clock} onChange={(v) => set((c) => (c.header.clock = v))} />
      </Row>
      {cfg.header.clock && (
        <Row label="24-hour time">
          <Toggle checked={cfg.header.clock24h} onChange={(v) => set((c) => (c.header.clock24h = v))} />
        </Row>
      )}
      <Row label="Date">
        <Toggle checked={cfg.header.showDate} onChange={(v) => set((c) => (c.header.showDate = v))} />
      </Row>
      <Field label="Weather" hint="Tap the weather in the header to see the hourly and 7-day forecast.">
        <select
          class="input"
          value={weatherValue}
          onChange={(e) => {
            const v = (e.target as HTMLSelectElement).value;
            set((c) => {
              c.header.weatherEntity = v && v !== "__open_meteo" ? v : undefined;
              c.header.weatherFallback = v === "__open_meteo";
            });
          }}
        >
          <option value="">No weather</option>
          {weathers.map((id) => (
            <option value={id}>{entityName(h, id)}</option>
          ))}
          <option value="__open_meteo">Open-Meteo for my home location (internet)</option>
        </select>
      </Field>
      <div class="labeled-label">Calendars</div>
      <MultiPick domain="calendar" value={cfg.header.calendars} onChange={(v) => set((c) => (c.header.calendars = v))} empty="No calendars in Home Assistant. Add one (Google, CalDAV, Local calendar…) to show events here." />
      <div class="labeled-label">Reminders (to-do lists)</div>
      <MultiPick domain="todo" value={cfg.header.todoLists} onChange={(v) => set((c) => (c.header.todoLists = v))} empty="No to-do lists in Home Assistant. Add the Local to-do or Shopping list integration to use reminders." />
    </div>
  );
}

// ---------- 6. Layout ----------

const LAYOUTS: { id: LayoutId; name: string; desc: string }[] = [
  { id: "grid", name: "Grid", desc: "Rooms as tabs along the top, cards in a grid. Great all-rounder." },
  { id: "sidebar", name: "Sidebar", desc: "Rooms in a side list with live status. Best on tablets and desktops." },
  { id: "list", name: "List", desc: "Every room on one scrolling page in compact rows. Best on phones." },
  { id: "focus", name: "Focus", desc: "One room at a time with big cards. Swipe between rooms. Best on wall tablets." },
];

function LayoutPreview({ id }: { id: LayoutId }) {
  const tile = (x: number, y: number, w = 14, hgt = 12) => <rect x={x} y={y} width={w} height={hgt} rx="3" class="pv-tile" />;
  return (
    <svg viewBox="0 0 100 64" class="layout-preview" aria-hidden="true">
      <rect x="0" y="0" width="100" height="64" rx="6" class="pv-bg" />
      {id === "grid" && (
        <>
          <rect x="6" y="6" width="18" height="6" rx="3" class="pv-accent" />
          <rect x="27" y="6" width="14" height="6" rx="3" class="pv-tile" />
          <rect x="44" y="6" width="14" height="6" rx="3" class="pv-tile" />
          {[0, 1, 2, 3, 4].map((i) => tile(6 + i * 18, 18))}
          {[0, 1, 2, 3, 4].map((i) => tile(6 + i * 18, 34))}
          {tile(6, 50, 32, 8)}
        </>
      )}
      {id === "sidebar" && (
        <>
          <rect x="5" y="5" width="24" height="54" rx="4" class="pv-tile" />
          <rect x="8" y="9" width="18" height="5" rx="2" class="pv-accent" />
          <rect x="8" y="17" width="18" height="5" rx="2" class="pv-bg" />
          <rect x="8" y="25" width="18" height="5" rx="2" class="pv-bg" />
          {[0, 1, 2, 3].map((i) => tile(34 + i * 16, 8, 13))}
          {[0, 1, 2, 3].map((i) => tile(34 + i * 16, 24, 13))}
          {tile(34, 40, 29, 18)}
        </>
      )}
      {id === "list" && [0, 1, 2, 3, 4, 5].map((i) => <rect x="6" y={6 + i * 9.5} width={i % 3 === 0 ? 40 : 88} height={i % 3 === 0 ? 4 : 7} rx="2" class={i % 3 === 0 ? "pv-accent" : "pv-tile"} />)}
      {id === "focus" && (
        <>
          <rect x="34" y="5" width="32" height="6" rx="3" class="pv-accent" />
          {tile(8, 16, 26, 20)}
          {tile(37, 16, 26, 20)}
          {tile(66, 16, 26, 20)}
          {tile(8, 39, 41, 20)}
          {tile(52, 39, 40, 20)}
        </>
      )}
    </svg>
  );
}

export function LayoutStep({ cfg, set }: StepProps) {
  return (
    <div class="step">
      <p class="lead">How should your rooms be arranged? Every screen follows the layout you pick.</p>
      <div class="choice-grid">
        {LAYOUTS.map((l) => (
          <button type="button" class={`choice ${cfg.layout === l.id ? "selected" : ""}`} aria-pressed={cfg.layout === l.id} onClick={() => set((c) => (c.layout = l.id))}>
            <LayoutPreview id={l.id} />
            <strong>{l.name}</strong>
            <span class="muted small">{l.desc}</span>
          </button>
        ))}
      </div>
      <Field label="Card spacing">
        <Segmented
          value={cfg.theme.density}
          options={[
            { value: "comfortable", label: "Comfortable" },
            { value: "compact", label: "Compact" },
          ]}
          onChange={(v) => set((c) => (c.theme.density = v))}
        />
      </Field>
    </div>
  );
}

// ---------- 7. Look & feel ----------

export function ThemeStep({ cfg, set }: StepProps) {
  const t = cfg.theme;
  return (
    <div class="step">
      <p class="lead">Make it yours. The preview updates as you choose.</p>
      <Field label="Appearance">
        <Segmented
          value={t.mode}
          options={[
            { value: "auto", label: "Match Home Assistant", icon: "mdi:theme-light-dark" },
            { value: "light", label: "Light", icon: "mdi:white-balance-sunny" },
            { value: "dark", label: "Dark", icon: "mdi:weather-night" },
          ]}
          onChange={(v) => set((c) => (c.theme.mode = v))}
        />
      </Field>
      <Field label="Accent colour">
        <div class="swatches">
          {ACCENTS.map((a) => (
            <button type="button" class={`swatch ${t.accent === a ? "selected" : ""}`} aria-label={a} style={`background:${a}`} onClick={() => set((c) => (c.theme.accent = a))} />
          ))}
          <input type="color" class="swatch color-input" aria-label="Custom colour" value={t.accent} onInput={(e) => set((c) => (c.theme.accent = (e.target as HTMLInputElement).value))} />
        </div>
      </Field>
      <Field label="Background">
        <div class="bg-grid">
          {BACKGROUNDS.map((b) => (
            <button type="button" class={`bg-choice ${t.background === b.id ? "selected" : ""}`} onClick={() => set((c) => (c.theme.background = b.id))}>
              <span class="bg-swatch" style={`background:${b.light}`} />
              <span class="bg-swatch" style={`background:${b.dark}`} />
              <span class="small">{b.name}</span>
            </button>
          ))}
          <button type="button" class={`bg-choice ${t.background === "image" ? "selected" : ""}`} onClick={() => set((c) => (c.theme.background = "image"))}>
            <span class="bg-swatch image"><Icon icon="mdi:image" size={18} /></span>
            <span class="small">Your image</span>
          </button>
        </div>
      </Field>
      {t.background === "image" && (
        <Field label="Image URL" hint="For example /local/wallpaper.jpg (a file in your config/www folder) or any https:// address.">
          <TextInput value={t.backgroundImage ?? ""} onInput={(v) => set((c) => (c.theme.backgroundImage = v))} placeholder="/local/wallpaper.jpg" />
        </Field>
      )}
      <Field label="Card style">
        <Segmented
          value={t.cardStyle}
          options={[
            { value: "glass", label: "Frosted glass" },
            { value: "solid", label: "Solid" },
          ]}
          onChange={(v) => set((c) => (c.theme.cardStyle = v))}
        />
      </Field>
      <Field label="Corner roundness">
        <Slider value={t.radius} min={4} max={32} format={(v) => `${v}px`} onCommit={(v) => set((c) => (c.theme.radius = v))} />
      </Field>
    </div>
  );
}

// ---------- 8. Pages ----------

export function PagesStep({ cfg, set }: StepProps) {
  const [name, setName] = useState("");
  const pages = cfg.sections.filter((s) => s.kind === "page");
  const add = () => {
    if (!name.trim()) return;
    set((c) => c.sections.push(newSection("page", name.trim(), guessIcon(name) === "mdi:home" ? "mdi:view-dashboard" : guessIcon(name))));
    setName("");
  };
  return (
    <div class="step">
      <p class="lead">Besides rooms, DashForge can show pages that gather devices from all over your home.</p>
      <Row label="Media" hint="Every media player on your dashboard in one place">
        <Toggle checked={cfg.builtinPages.media} onChange={(v) => set((c) => (c.builtinPages.media = v))} />
      </Row>
      <Row label="Security" hint="Locks, alarm, cameras, doors, windows and motion">
        <Toggle checked={cfg.builtinPages.security} onChange={(v) => set((c) => (c.builtinPages.security = v))} />
      </Row>
      <Row label="Scenes" hint="All your scenes and scripts">
        <Toggle checked={cfg.builtinPages.scenes} onChange={(v) => set((c) => (c.builtinPages.scenes = v))} />
      </Row>
      <div class="labeled-label">Your own pages</div>
      <p class="muted small">Make a page for anything: the garden, the garage, energy, a hobby. Add its devices in edit mode afterwards.</p>
      {pages.map((p) => (
        <div class="room-row">
          <Icon icon={p.icon} />
          <input class="input" value={p.name} aria-label="Page name" onInput={(e) => set((c) => (c.sections.find((s) => s.id === p.id)!.name = (e.target as HTMLInputElement).value))} />
          <IconButton icon="mdi:close" label={`Remove ${p.name}`} onClick={() => set((c) => (c.sections = c.sections.filter((s) => s.id !== p.id)))} />
        </div>
      ))}
      <form
        class="inline-form"
        onSubmit={(e) => {
          e.preventDefault();
          add();
        }}
      >
        <TextInput value={name} onInput={setName} placeholder="e.g. Energy" />
        <Button icon="mdi:plus" disabled={!name.trim()} onClick={add}>Add page</Button>
      </form>
    </div>
  );
}

// ---------- 9. Wall tablet ----------

export function TabletStep({ cfg, set }: StepProps) {
  const t = cfg.tablet;
  return (
    <div class="step">
      <p class="lead">Settings for a tablet mounted on the wall. Skip these if you only use phones and computers.</p>
      <Row label="Screensaver" hint="Shows a clock after a while with no touches">
        <Toggle checked={t.screensaver} onChange={(v) => set((c) => (c.tablet.screensaver = v))} />
      </Row>
      {t.screensaver && (
        <>
          <Field label="Start after">
            <Slider value={t.screensaverMinutes} min={1} max={60} format={(v) => `${v} min`} onCommit={(v) => set((c) => (c.tablet.screensaverMinutes = v))} />
          </Field>
          <Field label="Screensaver style">
            <Segmented
              value={t.screensaverStyle}
              options={[
                { value: "clock", label: "Clock & weather" },
                { value: "dim", label: "Dim clock" },
                { value: "black", label: "Black screen" },
              ]}
              onChange={(v) => set((c) => (c.tablet.screensaverStyle = v))}
            />
          </Field>
        </>
      )}
      <Row label="Return to the first room" hint="Go back home after a while with no touches">
        <Segmented
          value={String(t.returnHomeMinutes) as "0" | "2" | "5" | "15"}
          options={[
            { value: "0", label: "Never" },
            { value: "2", label: "2 min" },
            { value: "5", label: "5 min" },
            { value: "15", label: "15 min" },
          ]}
          onChange={(v) => set((c) => (c.tablet.returnHomeMinutes = Number(v)))}
        />
      </Row>
      <Row label="Hide the Home Assistant sidebar" hint="Full-screen dashboard. Add ?menu to the address to show it again on one device.">
        <Toggle checked={t.hideSidebar} onChange={(v) => set((c) => (c.tablet.hideSidebar = v))} />
      </Row>
    </div>
  );
}

// ---------- 10. Review ----------

export function ReviewStep({ cfg }: StepProps) {
  const rooms = cfg.sections.filter((s) => s.kind === "room");
  const pages = cfg.sections.filter((s) => s.kind === "page");
  const cards = cfg.sections.reduce((n, s) => n + s.cards.length, 0);
  const lines: [string, string][] = [
    ["Rooms", rooms.map((r) => r.name).join(", ") || "None"],
    ["Devices", `${cards} cards`],
    ["Layout", LAYOUTS.find((l) => l.id === cfg.layout)!.name],
    ["Pages", [cfg.builtinPages.media && "Media", cfg.builtinPages.security && "Security", cfg.builtinPages.scenes && "Scenes", ...pages.map((p) => p.name)].filter(Boolean).join(", ") || "None"],
    ["Weather", cfg.header.weatherEntity ? "Home Assistant" : cfg.header.weatherFallback ? "Open-Meteo" : "Off"],
    ["Calendars", String(cfg.header.calendars.length)],
    ["Wall tablet", cfg.tablet.screensaver ? `Screensaver after ${cfg.tablet.screensaverMinutes} min` : "Screensaver off"],
  ];
  return (
    <div class="step">
      <p class="lead">Here's your dashboard. Finish to start using it. Tap the pencil any time to rearrange cards, and the gear to change these choices.</p>
      <dl class="review">
        {lines.map(([k, v]) => (
          <>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </>
        ))}
      </dl>
    </div>
  );
}
