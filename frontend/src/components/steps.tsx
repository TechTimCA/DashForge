import { useState } from "preact/hooks";
import { ACCENTS, BACKGROUNDS, STYLE_PRESETS, clone, newCard, newSection } from "../config";
import {
  DOMAIN_LABELS,
  defaultCardSize,
  domainOf,
  entitiesForRoom,
  entitiesInArea,
  entitiesWithoutArea,
  entityName,
  roomByName,
  roomsFromNames,
  type RoomRef,
  isIrrigationCandidate,
  isRecommended,
} from "../entities";
import { floorGroups } from "./home";
import { FONTS, fontStack } from "../fonts";
import { hass } from "../store";
import type { CardShape, CardSize, DashConfig, Hass, LayoutId, OnColor, SectionConfig, StyleId, TitleStyle } from "../types";
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

export function roomRefs(h: Hass, sections: SectionConfig[]): RoomRef[] {
  return sections
    .filter((s) => s.kind === "room")
    .map((s) => ({ key: s.id, name: s.name, aliases: s.areaId ? h.areas?.[s.areaId]?.aliases : undefined }));
}

/** A room with its recommended devices ticked: those in its area, plus unplaced devices named after it. */
function seedRoom(h: Hass, areaId: string | undefined, name: string, icon?: string | null, others: RoomRef[] = []): SectionConfig {
  const s = newSection("room", name, icon || guessIcon(name), areaId);
  s.cards = entitiesForRoom(h, { areaId, name }, others)
    .filter((id) => isRecommended(h, id))
    .map((id) => newCard(id, defaultCardSize(id)));
  return s;
}

/**
 * First run: one room per Home Assistant area with devices, then rooms guessed
 * from device names for anything left (so homes without areas still get rooms).
 * Everything is a suggestion the user reviews.
 */
export function seedFirstRun(h: Hass, cfg: DashConfig) {
  if (cfg.sections.length) return;
  const floors = h.floors ?? {};
  const areas = Object.values(h.areas ?? {}).sort(
    (a, b) =>
      (floors[a.floor_id ?? ""]?.level ?? 99) - (floors[b.floor_id ?? ""]?.level ?? 99) || a.name.localeCompare(b.name),
  );
  const areaRefs: RoomRef[] = areas.map((a) => ({ key: a.area_id, name: a.name, aliases: a.aliases }));
  for (const a of areas) {
    const room = seedRoom(h, a.area_id, a.name, a.icon, areaRefs);
    if (room.cards.length || entitiesInArea(h, a.area_id).length) cfg.sections.push(room);
  }
  // Devices nobody has placed yet: look for room names in their names.
  const placed = new Set(cfg.sections.flatMap((s) => s.cards.map((c) => c.entity)));
  const leftovers = entitiesWithoutArea(h).filter((id) => !placed.has(id) && isRecommended(h, id) && !roomByName(h, id, areaRefs));
  const minDevices = areas.length ? 2 : 1;
  for (const [name, ids] of roomsFromNames(h, leftovers)) {
    if (ids.length < minDevices) continue;
    const s = newSection("room", name, guessIcon(name));
    s.cards = ids.map((id) => newCard(id, defaultCardSize(id)));
    cfg.sections.push(s);
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
      {floorGroups(h, rooms).map((g) => (
      <div class="room-list">
        {(g.id !== null || Object.keys(h.floors ?? {}).length > 0) && (
          <div class="floor-label">
            <Icon icon={g.icon} size={18} /> {g.name}
          </div>
        )}
        {g.sections.map((r) => {
          const i = rooms.indexOf(r);
          return (
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
            {Object.keys(h.floors ?? {}).length > 0 && (
              <select
                class="input floor-select"
                aria-label={`Floor for ${r.name}`}
                value={r.floorId ?? ""}
                onChange={(e) => {
                  const v = (e.target as HTMLSelectElement).value || undefined;
                  set((c) => (c.sections.find((s) => s.id === r.id)!.floorId = v));
                }}
              >
                <option value="">{r.areaId && h.areas?.[r.areaId]?.floor_id ? `Floor: same as area` : "No floor"}</option>
                {Object.values(h.floors ?? {})
                  .sort((a, b) => (a.level ?? 0) - (b.level ?? 0))
                  .map((fl) => (
                    <option value={fl.floor_id}>Floor: {fl.name}</option>
                  ))}
              </select>
            )}
            {editing === r.id && <IconPicker value={r.icon} onChange={(v) => set((c) => (c.sections.find((s) => s.id === r.id)!.icon = v))} />}
          </div>
          );
        })}
      </div>
      ))}
      {available.length > 0 && (
        <>
          <div class="labeled-label">Add an area from Home Assistant</div>
          <div class="chips">
            {available.map((a) => (
              <button type="button" class="chip" onClick={() => set((c) => c.sections.push(seedRoom(h, a.area_id, a.name, a.icon, roomRefs(h, c.sections))))}>
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
          set((c) => c.sections.push(seedRoom(h, undefined, newName.trim(), guessIcon(newName), roomRefs(h, c.sections))));
          setNewName("");
        }}
      >
        <TextInput value={newName} onInput={setNewName} placeholder="e.g. Back yard" />
        <Button
          icon="mdi:plus"
          disabled={!newName.trim()}
          onClick={() => {
            set((c) => c.sections.push(seedRoom(h, undefined, newName.trim(), guessIcon(newName), roomRefs(h, c.sections))));
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
  const refs = roomRefs(h, cfg.sections);
  const placedAnywhere = new Set(cfg.sections.flatMap((s) => s.cards.map((c) => c.entity)));
  const unassigned = entitiesWithoutArea(h).filter((id) => !placedAnywhere.has(id) && !roomByName(h, id, refs)).length;

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
          <Icon icon="mdi:information-outline" size={16} /> {unassigned} devices aren't in a room yet. Devices named after a room are suggested there automatically; use “Add other devices” for the rest.
        </p>
      )}
      <div class="accordion">
        {rooms.map((r) => {
          const inArea = entitiesForRoom(h, { areaId: r.areaId, name: r.name }, refs);
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
  { id: "auto", name: "Auto", desc: "Recommended. One dashboard that fits every screen: tabs on phones and tablets, a side list on big screens." },
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
      {id === "auto" && (
        <>
          <rect x="6" y="10" width="20" height="44" rx="3" class="pv-tile" />
          <rect x="9" y="16" width="14" height="6" rx="1.5" class="pv-accent" />
          <rect x="9" y="25" width="14" height="6" rx="1.5" class="pv-bg" />
          <rect x="32" y="8" width="62" height="48" rx="4" class="pv-tile" />
          <rect x="36" y="12" width="14" height="5" rx="2" class="pv-accent" />
          {[0, 1, 2].map((i) => <rect x={36 + i * 19} y="21" width="16" height="12" rx="2" class="pv-bg" />)}
          {[0, 1, 2].map((i) => <rect x={36 + i * 19} y="36" width="16" height="12" rx="2" class="pv-bg" />)}
        </>
      )}
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
      <Field label="Navigation" hint="How you move between rooms. Auto uses tabs on phones and tablets and a side list on big screens.">
        <Segmented
          value={cfg.theme.nav ?? "auto"}
          options={[
            { value: "auto", label: "Auto" },
            { value: "tabs", label: "Tabs on top" },
            { value: "side", label: "Side list" },
            { value: "dock", label: "Bottom dock" },
          ]}
          onChange={(v) => set((c) => (c.theme.nav = v))}
        />
      </Field>
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

export function StylePreview({ id }: { id: StyleId }) {
  if (id === "daylight") {
    return (
      <svg viewBox="0 0 100 64" class="layout-preview" aria-hidden="true">
        <defs>
          <linearGradient id="pv-day" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#cfe0f5" />
            <stop offset=".5" stop-color="#e8e4f3" />
            <stop offset="1" stop-color="#f8e3d6" />
          </linearGradient>
        </defs>
        <rect width="100" height="64" rx="6" fill="url(#pv-day)" />
        <rect x="7" y="7" width="38" height="7" rx="2" fill="#1d2433" />
        {[0, 1, 2, 3].map((i) => (
          <g>
            <rect x={7 + (i % 2) * 44} y={20 + Math.floor(i / 2) * 20} width="41" height="16" rx="6" fill={i === 0 ? "#fdecc8" : "rgba(255,255,255,.7)"} />
            <circle cx={15 + (i % 2) * 44} cy={28 + Math.floor(i / 2) * 20} r="4.5" fill={i === 0 ? "#f59e0b" : "rgba(29,36,51,.12)"} />
            <rect x={23 + (i % 2) * 44} y={26 + Math.floor(i / 2) * 20} width="18" height="3" rx="1.5" fill="#1d2433" opacity=".55" />
          </g>
        ))}
      </svg>
    );
  }
  if (id === "blocks") {
    const fills = ["#ffc21a", "#ffffff", "#34c3ff", "#ffffff", "#ff7a30", "#ffffff"];
    return (
      <svg viewBox="0 0 100 64" class="layout-preview" aria-hidden="true">
        <rect width="100" height="64" rx="6" fill="#eceef2" />
        {fills.map((f, i) => (
          <g>
            <rect x={6 + (i % 3) * 30} y={7 + Math.floor(i / 3) * 28} width="27" height="24" rx="6" fill={f} />
            <circle cx={27 + (i % 3) * 30} cy={13 + Math.floor(i / 3) * 28} r="3" fill="none" stroke={f === "#ffffff" ? "#9aa0ae" : "#15171c"} stroke-width="1.6" />
            <rect x={10 + (i % 3) * 30} y={23 + Math.floor(i / 3) * 28} width="14" height="3.5" rx="1" fill="#15171c" opacity={f === "#ffffff" ? 0.5 : 0.9} />
          </g>
        ))}
      </svg>
    );
  }
  if (id === "console") {
    return (
      <svg viewBox="0 0 100 64" class="layout-preview" aria-hidden="true">
        <rect width="100" height="64" rx="6" fill="#0e1424" />
        {[0, 1, 2, 3].map((i) => (
          <g>
            <rect x={6 + (i % 2) * 45} y={7 + Math.floor(i / 2) * 19} width="43" height="16" rx="5" fill="#131a2c" stroke={i === 0 ? "#ffb23e" : i === 3 ? "#3fd8ff" : "#26304a"} stroke-width=".8" />
            <circle cx={14 + (i % 2) * 45} cy={15 + Math.floor(i / 2) * 19} r="4.5" fill="none" stroke={i === 0 ? "#ffb23e" : i === 3 ? "#3fd8ff" : "#3b4560"} stroke-width="1.4" />
          </g>
        ))}
        <rect x="22" y="50" width="56" height="9" rx="4.5" fill="#131a2c" stroke="#26304a" stroke-width=".8" />
        {[0, 1, 2, 3, 4].map((i) => <circle cx={30 + i * 10} cy="54.5" r="1.8" fill={i === 1 ? "#3fd8ff" : "#5b6680"} />)}
      </svg>
    );
  }
  if (id === "vivid") {
    const g: [string, string][] = [
      ["#fbbf24", "#f97316"],
      ["#22d3ee", "#3b82f6"],
      ["#a855f7", "#ec4899"],
    ];
    return (
      <svg viewBox="0 0 100 64" class="layout-preview" aria-hidden="true">
        <defs>
          {g.map(([a, b], i) => (
            <linearGradient id={`pv-v${i}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color={a} />
              <stop offset="1" stop-color={b} />
            </linearGradient>
          ))}
        </defs>
        <rect width="100" height="64" rx="6" fill="#121319" />
        <rect x="6" y="7" width="27" height="23" rx="5" fill="url(#pv-v0)" />
        <rect x="36" y="7" width="27" height="23" rx="5" fill="#1c1e26" />
        <rect x="66" y="7" width="28" height="23" rx="5" fill="url(#pv-v1)" />
        <rect x="6" y="34" width="57" height="23" rx="5" fill="url(#pv-v2)" />
        <rect x="66" y="34" width="28" height="23" rx="5" fill="#1c1e26" />
        <circle cx="13" cy="14" r="3.5" fill="rgba(255,255,255,.45)" />
        <circle cx="43" cy="14" r="3.5" fill="#22c55e" opacity=".7" />
        <circle cx="73" cy="14" r="3.5" fill="rgba(255,255,255,.45)" />
        <path d="M69 52 L74 47 L78 50 L83 42 L90 45" fill="none" stroke="#38bdf8" stroke-width="1.6" />
      </svg>
    );
  }
  if (id === "apple") {
    return (
      <svg viewBox="0 0 100 64" class="layout-preview" aria-hidden="true">
        <defs>
          <linearGradient id="pv-apple" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#f7c9b0" />
            <stop offset="1" stop-color="#b9c6ee" />
          </linearGradient>
        </defs>
        <rect width="100" height="64" rx="6" fill="url(#pv-apple)" />
        <rect x="6" y="6" width="34" height="5" rx="2" fill="#1c1c1e" opacity=".75" />
        {[0, 1, 2].map((r) =>
          [0, 1].map((c) => (
            <g>
              <rect x={6 + c * 45} y={16 + r * 15} width="42" height="12" rx="4" fill={r === 0 && c === 0 ? "#fff" : "rgba(255,255,255,.45)"} />
              <circle cx={12 + c * 45} cy={22 + r * 15} r="3.2" fill={r === 0 && c === 0 ? "#ff9f0a" : "rgba(60,60,67,.35)"} />
              <rect x={18 + c * 45} y={20 + r * 15} width="18" height="2.5" rx="1" fill="#1c1c1e" opacity=".6" />
            </g>
          )),
        )}
      </svg>
    );
  }
  if (id === "homey") {
    const cols = ["#f5b400", "#22c55e", "#f97316", "#3b82f6", "#a855f7", "#ef4444"];
    return (
      <svg viewBox="0 0 100 64" class="layout-preview" aria-hidden="true">
        <rect width="100" height="64" rx="6" fill="#121318" />
        {cols.map((col, i) => (
          <g>
            <rect x={6 + (i % 3) * 30} y={7 + Math.floor(i / 3) * 28} width="27" height="24" rx="5" fill="#1e2027" />
            <circle cx={19.5 + (i % 3) * 30} cy={16 + Math.floor(i / 3) * 28} r="5" fill={i < 3 ? col : "none"} stroke={col} stroke-width="1.4" />
            <rect x={13 + (i % 3) * 30} y={24 + Math.floor(i / 3) * 28} width="13" height="2" rx="1" fill="#e5e7eb" opacity=".7" />
          </g>
        ))}
      </svg>
    );
  }
  if (id === "minimal") {
    return (
      <svg viewBox="0 0 100 64" class="layout-preview" aria-hidden="true">
        <rect width="100" height="64" rx="6" fill="#fafafa" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect x={6 + (i % 3) * 30} y={8 + Math.floor(i / 3) * 27} width="27" height="23" rx="3" fill="#fff" stroke={i === 0 ? "#18181b" : "#e4e4e7"} />
        ))}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 64" class="layout-preview" aria-hidden="true">
      <defs>
        <linearGradient id="pv-df" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#dbeafe" />
          <stop offset=".5" stop-color="#ede9fe" />
          <stop offset="1" stop-color="#fce7f3" />
        </linearGradient>
      </defs>
      <rect width="100" height="64" rx="6" fill="url(#pv-df)" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g>
          <rect x={6 + (i % 3) * 30} y={8 + Math.floor(i / 3) * 27} width="27" height="23" rx="5" fill={i === 1 ? "#dbe6fe" : "rgba(255,255,255,.75)"} />
          <circle cx={13 + (i % 3) * 30} cy={15 + Math.floor(i / 3) * 27} r="3.5" fill={i === 1 ? "#3b82f6" : "#e2e8f0"} />
        </g>
      ))}
    </svg>
  );
}

// ---------- Previews for each look option ----------

function ShapePreview({ id }: { id: CardShape }) {
  const on = "#f59e0b";
  const off = "var(--line)";
  const box = (x: number, y: number, w: number, hh: number, fill: string, r = 4) => <rect x={x} y={y} width={w} height={hh} rx={r} fill={fill} />;
  return (
    <svg viewBox="0 0 100 60" class="option-preview" aria-hidden="true">
      {id === "tiles" && [0, 1, 2, 3, 4, 5].map((i) => (
        <g>
          {box(6 + (i % 3) * 30, 6 + Math.floor(i / 3) * 26, 27, 22, i === 1 ? "color-mix(in srgb,#f59e0b 30%,transparent)" : off, 5)}
          <circle cx={13 + (i % 3) * 30} cy={13 + Math.floor(i / 3) * 26} r="3.5" fill={i === 1 ? on : "var(--muted)"} />
        </g>
      ))}
      {id === "rows" && [0, 1, 2, 3].map((i) => (
        <g>
          {box(6, 6 + i * 13, 88, 10, i === 1 ? "color-mix(in srgb,#f59e0b 30%,transparent)" : off, 5)}
          <circle cx="13" cy={11 + i * 13} r="3.3" fill={i === 1 ? on : "var(--muted)"} />
          {box(20, 10 + i * 13, 28, 2.4, "var(--muted)", 1)}
        </g>
      ))}
      {id === "blocks" && [0, 1, 2, 3, 4, 5].map((i) => (
        <g>
          {box(6 + (i % 3) * 30, 6 + Math.floor(i / 3) * 26, 27, 22, i === 1 ? "#ffc21a" : i === 3 ? "#3156ff" : off, 6)}
          <circle cx={27 + (i % 3) * 30} cy={12 + Math.floor(i / 3) * 26} r="3" fill="none" stroke={i === 1 || i === 3 ? "#15171c" : "var(--muted)"} stroke-width="1.6" />
          {box(9 + (i % 3) * 30, 22 + Math.floor(i / 3) * 26, 14, 3, i === 1 || i === 3 ? "#15171c" : "var(--muted)", 1)}
        </g>
      ))}
      {id === "dials" && [0, 1, 2].map((i) => (
        <g>
          {box(6, 6 + i * 17, 88, 14, off, 5)}
          <circle cx="15" cy={13 + i * 17} r="4.6" fill="none" stroke={i === 0 ? "#ffb23e" : "var(--muted)"} stroke-width="1.6" />
          {box(24, 12 + i * 17, 30, 2.4, "var(--muted)", 1)}
        </g>
      ))}
      {id === "pills" && [0, 1, 2, 3, 4, 5].map((i) => (
        <g>
          {box(6 + (i % 2) * 45, 6 + Math.floor(i / 2) * 17, 42, 13, i === 0 ? "#ffffff" : off, 5)}
          <circle cx={13 + (i % 2) * 45} cy={12.5 + Math.floor(i / 2) * 17} r="3" fill={i === 0 ? on : "var(--muted)"} />
        </g>
      ))}
      {id === "squares" && [0, 1, 2, 3, 4, 5].map((i) => (
        <g>
          {box(6 + (i % 3) * 30, 6 + Math.floor(i / 3) * 26, 27, 22, off, 5)}
          <circle cx={19.5 + (i % 3) * 30} cy={15 + Math.floor(i / 3) * 26} r="5" fill={i < 2 ? ["#f5b400", "#22c55e"][i] : "none"} stroke={["#f5b400", "#22c55e", "#f97316", "#3b82f6", "#a855f7", "#ef4444"][i]} stroke-width="1.4" />
        </g>
      ))}
    </svg>
  );
}

const ON_LOOKS: Record<OnColor, { on: string; off: string; ring?: string; border?: string }> = {
  gradient: { on: "linear-gradient(135deg,#fbbf24,#f97316)", off: "#1c1e26" },
  flat: { on: "#ffc21a", off: "#ffffff" },
  glow: { on: "radial-gradient(circle at 25% 50%,rgba(255,178,62,.35),#131a2c 60%)", off: "#131a2c", ring: "#ffb23e" },
  soft: { on: "linear-gradient(90deg,#fde7c2,#ffffff 75%)", off: "rgba(255,255,255,.7)" },
  white: { on: "#ffffff", off: "rgba(120,120,128,.35)" },
  tint: { on: "color-mix(in srgb,#f59e0b 26%,#ffffff)", off: "#ffffff" },
  ring: { on: "#1e2027", off: "#1e2027", ring: "#f5b400" },
  outline: { on: "#ffffff", off: "#ffffff", border: "#18181b" },
};

function OnPreview({ id }: { id: OnColor }) {
  const l = ON_LOOKS[id];
  return (
    <span class="on-preview">
      <span class="on-tile" style={`background:${l.off};`} />
      <span
        class="on-tile"
        style={`background:${l.on};${l.ring ? `box-shadow:inset 0 0 0 2px ${l.ring},0 0 14px ${l.ring}55;` : ""}${l.border ? `outline:2px solid ${l.border};outline-offset:-2px;` : ""}`}
      />
    </span>
  );
}

const SHAPES: { id: CardShape; name: string; note: string }[] = [
  { id: "tiles", name: "Tiles", note: "Classic squares" },
  { id: "rows", name: "Rows", note: "Wide, calm rows" },
  { id: "blocks", name: "Blocks", note: "Big icon, bold name" },
  { id: "dials", name: "Dials", note: "Round glowing dials" },
  { id: "pills", name: "Pills", note: "Compact, Apple-like" },
  { id: "squares", name: "Squares", note: "Centred icons" },
];

const ON_COLORS: { id: OnColor; name: string }[] = [
  { id: "gradient", name: "Bright gradient" },
  { id: "flat", name: "Flat colour" },
  { id: "glow", name: "Glow" },
  { id: "soft", name: "Soft wash" },
  { id: "white", name: "Turns white" },
  { id: "tint", name: "Light tint" },
  { id: "ring", name: "Colour ring" },
  { id: "outline", name: "Outline" },
];

const TITLES: { id: TitleStyle; name: string }[] = [
  { id: "normal", name: "Regular" },
  { id: "big", name: "Big" },
  { id: "bold", name: "Extra bold" },
  { id: "light", name: "Light" },
];

function OptionGrid<T extends string>(props: {
  value: T;
  options: { id: T; name: string; note?: string }[];
  onPick: (v: T) => void;
  preview: (id: T) => any;
  small?: boolean;
}) {
  return (
    <div class={`option-grid ${props.small ? "small" : ""}`}>
      {props.options.map((o) => (
        <button type="button" class={`option ${props.value === o.id ? "selected" : ""}`} aria-pressed={props.value === o.id} onClick={() => props.onPick(o.id)}>
          {props.preview(o.id)}
          <strong>{o.name}</strong>
          {o.note && <span class="muted small">{o.note}</span>}
        </button>
      ))}
    </div>
  );
}

// ---------- Background pictures ----------

interface MediaFile {
  name: string;
  url: string;
}

async function resizeForBackground(file: File): Promise<Blob> {
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, 2560 / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((ok) => canvas.toBlob(ok, "image/jpeg", 0.86));
    return blob ?? file;
  } catch {
    return file;
  }
}

function BackgroundPicker({ cfg, set }: StepProps) {
  const h = hass.value!;
  const t = cfg.theme;
  const [photos, setPhotos] = useState<MediaFile[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const load = () =>
    h
      .callWS<{ files: MediaFile[] }>({ type: "dashforge/media/list" })
      .then((r) => setPhotos(r.files))
      .catch(() => setPhotos([]));
  if (photos === null) load();

  const upload = async (file: File) => {
    setBusy(true);
    setError(null);
    try {
      const body = new FormData();
      body.append("file", await resizeForBackground(file), "background.jpg");
      const res = h.fetchWithAuth
        ? await h.fetchWithAuth("/api/dashforge/upload", { method: "POST", body })
        : await fetch("/api/dashforge/upload", { method: "POST", body, headers: { Authorization: `Bearer ${h.auth?.data?.access_token ?? ""}` } });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message ?? "Upload failed");
      set((c) => {
        c.theme.background = "image";
        c.theme.backgroundImage = json.url;
      });
      load();
    } catch (err: any) {
      setError(err?.message ?? "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (p: MediaFile) => {
    if (!confirm("Delete this picture?")) return;
    await h.callWS({ type: "dashforge/media/delete", name: p.name }).catch(() => undefined);
    if (t.backgroundImage === p.url) set((c) => (c.theme.background = "midnight"));
    load();
  };

  return (
    <>
      <div class="bg-grid">
        {BACKGROUNDS.map((b) => (
          <button type="button" class={`bg-choice ${t.background === b.id ? "selected" : ""}`} onClick={() => set((c) => (c.theme.background = b.id))}>
            <span class="bg-swatch" style={`background:${b.light}`} />
            <span class="bg-swatch" style={`background:${b.dark}`} />
            <span class="small">{b.name}</span>
          </button>
        ))}
      </div>
      <div class="labeled-label">Your pictures</div>
      <div class="photo-grid">
        <label class={`photo-upload ${busy ? "busy" : ""}`}>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/*"
            onChange={(e) => {
              const f = (e.target as HTMLInputElement).files?.[0];
              if (f) upload(f);
              (e.target as HTMLInputElement).value = "";
            }}
          />
          <Icon icon={busy ? "mdi:upload" : "mdi:plus"} size={26} />
          <span class="small">{busy ? "Uploading…" : "Upload a picture"}</span>
        </label>
        {(photos ?? []).map((p) => (
          <div class={`photo ${t.background === "image" && t.backgroundImage === p.url ? "selected" : ""}`}>
            <button
              type="button"
              class="photo-pick"
              aria-label="Use this picture"
              style={`background-image:url("${p.url}")`}
              onClick={() =>
                set((c) => {
                  c.theme.background = "image";
                  c.theme.backgroundImage = p.url;
                })
              }
            />
            <IconButton icon="mdi:close" label="Delete picture" class="photo-delete" onClick={() => remove(p)} />
          </div>
        ))}
      </div>
      {error && <p class="error-text">{error}</p>}
      <Field label="Or use a picture from a web address" hint="For example /local/wallpaper.jpg from your config/www folder, or any https:// address.">
        <TextInput
          value={t.background === "image" ? (t.backgroundImage ?? "") : ""}
          onInput={(v) =>
            set((c) => {
              c.theme.backgroundImage = v;
              if (v) c.theme.background = "image";
            })
          }
          placeholder="/local/wallpaper.jpg"
        />
      </Field>
    </>
  );
}

export function ThemeStep({ cfg, set }: StepProps) {
  const t = cfg.theme;
  const [more, setMore] = useState(false);
  return (
    <div class="step">
      <p class="lead">Pick a style and a background. That's all most people need. Under “More options” you can change every other part of the look.</p>
      <Field label="Start from a style">
        <div class="choice-grid">
          {STYLE_PRESETS.map((p) => (
            <button
              type="button"
              class={`choice ${t.style === p.id ? "selected" : ""}`}
              aria-pressed={t.style === p.id}
              onClick={() => set((c) => Object.assign(c.theme, p.theme))}
            >
              <StylePreview id={p.id} />
              <strong>{p.name}</strong>
              <span class="muted small">{p.desc}</span>
            </button>
          ))}
        </div>
      </Field>
      <Field label="Background">
        <BackgroundPicker cfg={cfg} set={set} />
      </Field>
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
      <button type="button" class="more-toggle" aria-expanded={more} onClick={() => setMore(!more)}>
        <Icon icon={more ? "mdi:chevron-up" : "mdi:chevron-down"} size={20} />
        {more ? "Fewer options" : "More options: card shape, colours when on, icons, typeface, titles, corners"}
      </button>
      {more && (
        <div class="more-options">
      <Field label="Card shape">
        <OptionGrid value={t.shape} options={SHAPES} onPick={(v) => set((c) => (c.theme.shape = v))} preview={(id) => <ShapePreview id={id} />} />
      </Field>
      <Field label="How cards look when a device is on">
        <OptionGrid value={t.color} options={ON_COLORS} small onPick={(v) => set((c) => (c.theme.color = v))} preview={(id) => <OnPreview id={id} />} />
      </Field>
      <Field label="Icons">
        <Segmented
          value={t.icons}
          options={[
            { value: "dashforge", label: "DashForge outline icons" },
            { value: "ha", label: "Home Assistant icons" },
          ]}
          onChange={(v) => set((c) => (c.theme.icons = v))}
        />
      </Field>
      <Field label="Typeface">
        <div class="font-grid">
          {FONTS.map((f) => (
            <button
              type="button"
              class={`font-choice ${t.font === f.id ? "selected" : ""}`}
              aria-pressed={t.font === f.id}
              style={`font-family:${fontStack(f.id).replace(/"/g, "'")}`}
              onClick={() => set((c) => (c.theme.font = f.id))}
            >
              <span class="font-sample">Aa</span>
              <strong>{f.name}</strong>
              <span class="muted small">{f.note}</span>
            </button>
          ))}
        </div>
      </Field>
      <Field label="Titles">
        <OptionGrid value={t.titles} options={TITLES} small onPick={(v) => set((c) => (c.theme.titles = v))} preview={(id) => <span class={`title-preview tp-${id}`}>Kitchen</span>} />
      </Field>
      <Field label="Card surface">
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
      )}
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
      <Row label="Home" hint="A start screen with status at a glance, your favourite cards and every room by floor">
        <Toggle checked={cfg.builtinPages.home} onChange={(v) => set((c) => (c.builtinPages.home = v))} />
      </Row>
      {cfg.builtinPages.home && (
        <div class="sub-options">
          <label class="check-item">
            <Checkbox checked={cfg.home.summary} onChange={(v) => set((c) => (c.home.summary = v))} />
            <span>Status chips (climate, lights, security, media, watering)</span>
          </label>
          <label class="check-item">
            <Checkbox checked={cfg.home.favorites} onChange={(v) => set((c) => (c.home.favorites = v))} />
            <span>Favourite cards</span>
          </label>
          <label class="check-item">
            <Checkbox checked={cfg.home.rooms} onChange={(v) => set((c) => (c.home.rooms = v))} />
            <span>Room tiles grouped by floor</span>
          </label>
        </div>
      )}
      <Row label="Media" hint="Every media player on your dashboard in one place">
        <Toggle checked={cfg.builtinPages.media} onChange={(v) => set((c) => (c.builtinPages.media = v))} />
      </Row>
      <Row label="Security" hint="Locks, alarm, cameras, doors, windows and motion">
        <Toggle checked={cfg.builtinPages.security} onChange={(v) => set((c) => (c.builtinPages.security = v))} />
      </Row>
      <Row label="Scenes" hint="All your scenes and scripts">
        <Toggle checked={cfg.builtinPages.scenes} onChange={(v) => set((c) => (c.builtinPages.scenes = v))} />
      </Row>
      <IrrigationOptions cfg={cfg} set={set} />
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

function PresetInput({ value, onCommit }: { value: number[]; onCommit: (v: number[]) => void }) {
  const [text, setText] = useState(value.join(", "));
  const commit = () => {
    const list = text
      .split(/[,\s]+/)
      .map((x) => Number(x))
      .filter((n) => n > 0 && n <= 240);
    if (list.length) {
      const clean = [...new Set(list)].slice(0, 6);
      onCommit(clean);
      setText(clean.join(", "));
    } else setText(value.join(", "));
  };
  return (
    <input
      class="input"
      value={text}
      inputMode="numeric"
      onInput={(e) => setText((e.target as HTMLInputElement).value)}
      onBlur={commit}
      onKeyDown={(e) => e.key === "Enter" && commit()}
    />
  );
}

function IrrigationOptions({ cfg, set }: StepProps) {
  const h = hass.value!;
  const candidates = Object.keys(h.states).filter((id) => isIrrigationCandidate(h, id));
  const zones = cfg.irrigation.zones;
  const toggleZone = (id: string) =>
    set((c) => {
      c.irrigation.zones = c.irrigation.zones.includes(id) ? c.irrigation.zones.filter((z) => z !== id) : [...c.irrigation.zones, id];
    });
  return (
    <>
      <Row label="Irrigation" hint="Water zones with one tap. Timers run inside Home Assistant, so a sleeping tablet never leaves the water on.">
        <Toggle
          checked={cfg.builtinPages.irrigation}
          onChange={(v) =>
            set((c) => {
              c.builtinPages.irrigation = v;
              if (v && !c.irrigation.zones.length) c.irrigation.zones = candidates;
            })
          }
        />
      </Row>
      {cfg.builtinPages.irrigation && (
        <div class="sub-options">
          <div class="labeled-label">Watering zones, in the order they run ({zones.length})</div>
          {zones.map((z, i) => (
            <div class="room-row">
              <span class="zone-num">{i + 1}</span>
              <span class="grow">{entityName(h, z)}</span>
              <IconButton
                icon="mdi:arrow-up"
                label="Run earlier"
                disabled={i === 0}
                onClick={() => set((c) => ([c.irrigation.zones[i - 1], c.irrigation.zones[i]] = [c.irrigation.zones[i], c.irrigation.zones[i - 1]]))}
              />
              <IconButton icon="mdi:close" label={`Remove ${entityName(h, z)}`} onClick={() => toggleZone(z)} />
            </div>
          ))}
          {candidates.length > 0 && zones.length === 0 && <p class="muted small">No zones chosen yet.</p>}
          <div class="labeled-label">Add zones (switches and valves)</div>
          <div class="picker-box">
            <EntitySearch domains={["switch", "valve", "input_boolean"]} isSelected={(id) => zones.includes(id)} onToggle={toggleZone} />
          </div>
          <Field label="Usual run time per zone">
            <Slider value={cfg.irrigation.minutes} min={1} max={60} format={(v) => `${v} min`} onCommit={(v) => set((c) => (c.irrigation.minutes = v))} />
          </Field>
          <Field label="Quick buttons (minutes)" hint="Comma separated, e.g. 5, 10, 15, 30">
            <PresetInput
              value={cfg.irrigation.presets}
              onCommit={(list) => set((c) => (c.irrigation.presets = list))}
            />
          </Field>
        </div>
      )}
    </>
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
      <Row label="Hide the Home Assistant sidebar" hint="The starting choice for every device. Anyone can still hide or show it on their own device with the button at the top of the dashboard.">
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
    ["Layout", LAYOUTS.find((l) => l.id === cfg.layout)?.name ?? cfg.layout],
    ["Style", STYLE_PRESETS.find((p) => p.id === cfg.theme.style)?.name ?? "Custom"],
    ["Pages", [cfg.builtinPages.home && "Home", cfg.builtinPages.irrigation && `Irrigation (${cfg.irrigation.zones.length} zones)`, cfg.builtinPages.media && "Media", cfg.builtinPages.security && "Security", cfg.builtinPages.scenes && "Scenes", ...pages.map((p) => p.name)].filter(Boolean).join(", ") || "None"],
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
