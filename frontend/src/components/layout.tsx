import { useRef, useState } from "preact/hooks";
import { domainOf, entityIcon, entityName, isDashboardEntity } from "../entities";
import {
  call,
  editMode,
  hass,
  info,
  narrow,
  panelElement,
  setSidebarHidden,
  sidebarHidden,
  width,
  startEditing,
  updateDraft,
  view,
  type View,
} from "../store";
import type { CardConfig, CardSize, DashConfig, SectionConfig } from "../types";
import { Tile } from "./cards";
import { cardEditor, pickerFor } from "./edit";
import { openSettings } from "./wizard";
import { HomeView, RoomControls, floorGroups, hasFloors, roomStatus } from "./home";
import { IrrigationView } from "./irrigation";
import {
  conditionIcon,
  eventTime,
  formatTime,
  greeting,
  openTodoCount,
  openWidget,
  useEvents,
  useNow,
  useWeather,
} from "./widgets";
import { Icon, IconButton } from "./ui";

// ---------- Navigation model ----------

export interface NavItem {
  key: string;
  view: View;
  name: string;
  icon: string;
  group?: string; // floor name, shown as a heading in the sidebar and list layouts
}

export function navItems(cfg: DashConfig): NavItem[] {
  const h = hass.value!;
  const items: NavItem[] = [];
  if (cfg.builtinPages.home && !editMode.value) {
    items.push({ key: "home", view: { type: "home" }, name: "Home", icon: "mdi:home-variant" });
  }
  const rooms = cfg.sections.filter((s) => s.kind === "room");
  const pages = cfg.sections.filter((s) => s.kind === "page");
  const floors = hasFloors(h, rooms);
  for (const g of floorGroups(h, rooms)) {
    for (const s of g.sections) {
      items.push({ key: s.id, view: { type: "section", id: s.id }, name: s.name, icon: s.icon, group: floors ? g.name : undefined });
    }
  }
  for (const s of pages) {
    items.push({ key: s.id, view: { type: "section", id: s.id }, name: s.name, icon: s.icon, group: floors ? "Pages" : undefined });
  }
  if (!editMode.value) {
    if (cfg.builtinPages.irrigation && cfg.irrigation.zones.length)
      items.push({ key: "irrigation", view: { type: "irrigation" }, name: "Irrigation", icon: "mdi:sprinkler-variant", group: floors ? "Pages" : undefined });
    if (cfg.builtinPages.media && mediaEntities(cfg).length)
      items.push({ key: "media", view: { type: "media" }, name: "Media", icon: "mdi:music-box-multiple", group: floors ? "Pages" : undefined });
    if (cfg.builtinPages.security && securityEntities(cfg).length)
      items.push({ key: "security", view: { type: "security" }, name: "Security", icon: "mdi:shield-home", group: floors ? "Pages" : undefined });
    if (cfg.builtinPages.scenes && sceneEntities(cfg).length)
      items.push({ key: "scenes", view: { type: "scenes" }, name: "Scenes", icon: "mdi:palette", group: floors ? "Pages" : undefined });
  }
  return items;
}

export const viewKey = (v: View | null) => (v ? (v.type === "section" ? v.id : v.type) : "");

function allCards(cfg: DashConfig): string[] {
  const seen = new Set<string>();
  for (const s of cfg.sections) for (const c of s.cards) if (!c.hidden) seen.add(c.entity);
  return [...seen];
}

function mediaEntities(cfg: DashConfig) {
  const list = allCards(cfg).filter((e) => domainOf(e) === "media_player");
  if (cfg.header.mediaPlayer && !list.includes(cfg.header.mediaPlayer)) list.unshift(cfg.header.mediaPlayer);
  return list;
}

const SECURITY_BINARY = new Set(["door", "garage_door", "window", "opening", "motion", "occupancy", "smoke", "moisture"]);
function securityEntities(cfg: DashConfig) {
  const h = hass.value!;
  return allCards(cfg).filter((e) => {
    const d = domainOf(e);
    if (d === "lock" || d === "alarm_control_panel" || d === "camera") return true;
    return d === "binary_sensor" && SECURITY_BINARY.has(h.states[e]?.attributes.device_class);
  });
}

function sceneEntities(cfg: DashConfig) {
  const h = hass.value!;
  const set = new Set([...cfg.header.sceneStrip, ...allCards(cfg).filter((e) => ["scene", "script"].includes(domainOf(e)))]);
  for (const id of Object.keys(h.states)) {
    if (domainOf(id) === "scene" && isDashboardEntity(h, id)) set.add(id);
  }
  return [...set].filter((e) => h.states[e]);
}

// ---------- Header ----------

export function Header({ cfg }: { cfg: DashConfig }) {
  const h = hass.value!;
  const lang = h.locale?.language ?? h.language;
  const now = useNow(cfg.header.clock ? 1000 : 60_000);
  const weather = useWeather(h, cfg);
  const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const horizon = new Date(dayStart.getTime() + 2 * 86400000);
  const events = useEvents(h, cfg.header.calendars, dayStart, horizon, Math.floor(now.getTime() / 600_000));
  const next = events.find((e) => e.end > now);
  const todos = openTodoCount(h, cfg.header.todoLists);
  const menuHidden = sidebarHidden(cfg.tablet.hideSidebar);
  const showMenu = narrow.value && !menuHidden;
  const player = cfg.header.mediaPlayer ? h.states[cfg.header.mediaPlayer] : undefined;

  return (
    <header class="header">
      <div class="header-left">
        {showMenu && (
          <IconButton
            icon="mdi:menu"
            label="Home Assistant menu"
            onClick={() => panelElement?.dispatchEvent(new Event("hass-toggle-menu", { bubbles: true, composed: true }))}
          />
        )}
        <div>
          <h1 class="title">{cfg.header.greeting ? greeting(now, cfg.userName) : cfg.title}</h1>
          {cfg.header.showDate && (
            <div class="subtitle">{now.toLocaleDateString(lang, { weekday: "long", month: "long", day: "numeric" })}</div>
          )}
        </div>
      </div>
      <div class="header-right">
        {cfg.header.clock && <div class="clock">{formatTime(now, cfg.header.clock24h, lang)}</div>}
        <div class="header-chips">
          {weather && (
            <button type="button" class="chip-btn" onClick={() => (openWidget.value = "weather")}>
              <Icon icon={conditionIcon(weather.condition)} size={22} />
              {weather.temp != null && <span>{Math.round(weather.temp)}°</span>}
            </button>
          )}
          {cfg.header.calendars.length > 0 && (
            <button type="button" class="chip-btn event-chip" onClick={() => (openWidget.value = "calendar")}>
              <Icon icon="mdi:calendar" size={20} />
              <span class="ellipsis">
                {next
                  ? `${next.start.toDateString() === now.toDateString() || next.start < now ? "" : "Tomorrow · "}${eventTime(next, lang, cfg.header.clock24h)} ${next.summary}`
                  : "No events"}
              </span>
            </button>
          )}
          {cfg.header.todoLists.length > 0 && (
            <button type="button" class="chip-btn" onClick={() => (openWidget.value = "todo")} aria-label={`${todos} reminders`}>
              <Icon icon="mdi:format-list-checks" size={20} />
              {todos > 0 && <span class="count">{todos}</span>}
            </button>
          )}
          {player && player.state === "playing" && (
            <button
              type="button"
              class="chip-btn player-chip"
              onClick={() => call("media_player", "media_play_pause", { entity_id: player.entity_id })}
              title="Pause"
            >
              <Icon icon="mdi:pause" size={20} />
              <span class="ellipsis">{player.attributes.media_title ?? entityName(h, player.entity_id)}</span>
            </button>
          )}
          {!narrow.value && (
            <IconButton
              icon={menuHidden ? "mdi:dock-left" : "mdi:fullscreen"}
              label={menuHidden ? "Show the Home Assistant menu" : "Hide the Home Assistant menu"}
              onClick={() => setSidebarHidden(!menuHidden)}
            />
          )}
          {narrow.value && menuHidden && (
            <IconButton icon="mdi:dock-left" label="Show the Home Assistant menu" onClick={() => setSidebarHidden(false)} />
          )}
          {info.value?.can_edit && !editMode.value && (
            <>
              <IconButton icon="mdi:pencil" label="Edit dashboard" onClick={startEditing} />
              <IconButton icon="mdi:cog" label="Settings" onClick={openSettings} />
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export function SceneStrip({ cfg }: { cfg: DashConfig }) {
  const h = hass.value!;
  const ids = cfg.header.sceneStrip.filter((id) => h.states[id]);
  if (!ids.length) return null;
  return (
    <div class="scene-strip">
      {ids.map((id) => (
        <button
          type="button"
          class="scene-chip"
          onClick={() => call(domainOf(id), "turn_on", { entity_id: id })}
        >
          <Icon icon={entityIcon(h, id)} size={18} />
          {entityName(h, id)}
        </button>
      ))}
    </div>
  );
}

// ---------- Nav ----------

export function Nav({ cfg, vertical, current: cur }: { cfg: DashConfig; vertical?: boolean; current?: string }) {
  const items = navItems(cfg);
  const current = cur ?? viewKey(view.value);
  return (
    <nav class={vertical ? "nav-vertical" : "nav-pills"} aria-label="Rooms and pages">
      {items.map((it, i) => {
        const section = cfg.sections.find((s) => s.id === it.key);
        const status = section && vertical ? roomStatus(hass.value!, section) : "";
        const heading = vertical && it.group && it.group !== items[i - 1]?.group;
        return (
          <>
          {heading && <div class="nav-group">{it.group}</div>}
          <button
            type="button"
            class={`nav-item ${current === it.key ? "selected" : ""}`}
            aria-current={current === it.key ? "page" : undefined}
            onClick={() => (view.value = it.view)}
          >
            <Icon icon={it.icon} size={vertical ? 22 : 18} />
            <span class="nav-text">
              <span>{it.name}</span>
              {status && <span class="nav-status">{status}</span>}
            </span>
          </button>
          </>
        );
      })}
    </nav>
  );
}

// ---------- Card grid with drag-to-reorder ----------

const SIZES: CardSize[] = ["sm", "md", "lg", "wide"];

export function CardGrid({ section, cards, room, list }: { section?: SectionConfig; cards: CardConfig[]; room?: string; list?: boolean }) {
  const editing = editMode.value && !!section;
  const [dragId, setDragId] = useState<string | null>(null);
  const drag = useRef<{ id: string; x: number; y: number; active: boolean } | null>(null);
  const shown = editing ? cards.filter((c) => !c.hidden) : cards.filter((c) => !c.hidden && hass.value!.states[c.entity]);

  const mutate = (fn: (s: SectionConfig) => void) =>
    updateDraft((c) => {
      const s = c.sections.find((x) => x.id === section!.id);
      if (s) fn(s);
    });

  const onPointerDown = (e: PointerEvent, id: string) => {
    if (!editing) return;
    drag.current = { id, x: e.clientX, y: e.clientY, active: false };
  };
  const onPointerMove = (e: PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    if (!d.active) {
      if (Math.hypot(e.clientX - d.x, e.clientY - d.y) < 10) return;
      d.active = true;
      setDragId(d.id);
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }
    const root = (e.currentTarget as HTMLElement).getRootNode() as ShadowRoot | Document;
    const el = root.elementFromPoint(e.clientX, e.clientY)?.closest?.("[data-card-id]") as HTMLElement | null;
    const overId = el?.dataset.cardId;
    if (overId && overId !== d.id) {
      mutate((s) => {
        const from = s.cards.findIndex((c) => c.id === d.id);
        const to = s.cards.findIndex((c) => c.id === overId);
        if (from < 0 || to < 0) return;
        const [moved] = s.cards.splice(from, 1);
        s.cards.splice(to, 0, moved);
      });
    }
  };
  const endDrag = () => {
    drag.current = null;
    setDragId(null);
  };

  return (
    <div
      class={`grid ${list ? "as-list" : ""} ${editing ? "is-editing" : ""}`}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {shown.map((card, i) => (
        <div
          class={`cell size-${list ? "sm" : card.size}`}
          data-card-id={card.id}
          key={card.id}
          onPointerDown={(e) => onPointerDown(e, card.id)}
        >
          <Tile
            card={list ? { ...card, size: "sm" } : card}
            room={room}
            index={i}
            editing={editing}
            dragging={dragId === card.id}
            onRemove={() => mutate((s) => {
              const c = s.cards.find((x) => x.id === card.id);
              if (c) c.hidden = true;
            })}
            onResize={() => mutate((s) => {
              const c = s.cards.find((x) => x.id === card.id);
              if (c) c.size = SIZES[(SIZES.indexOf(c.size) + 1) % SIZES.length];
            })}
            onEdit={() => (cardEditor.value = { sectionId: section!.id, cardId: card.id })}
          />
        </div>
      ))}
      {editing && (
        <button type="button" class="cell size-sm add-tile" onClick={() => (pickerFor.value = section!.id)}>
          <Icon icon="mdi:plus" size={28} />
          <span>Add device</span>
        </button>
      )}
      {!editing && shown.length === 0 && (
        <div class="empty">
          <Icon icon="mdi:view-grid-plus-outline" size={36} />
          <p>Nothing here yet.{info.value?.can_edit ? " Tap the pencil to add devices." : ""}</p>
        </div>
      )}
    </div>
  );
}

// ---------- Views ----------

const asCards = (ids: string[], size: CardSize = "sm"): CardConfig[] => ids.map((e) => ({ id: e, entity: e, size }));

export function ViewContent({ cfg, v, list }: { cfg: DashConfig; v: View; list?: boolean }) {
  if (v.type === "home") {
    const c = list ? { ...cfg, home: { ...cfg.home, rooms: false } } : cfg;
    return <HomeView cfg={c} renderCards={(cards) => <CardGrid cards={cards} list={list} />} />;
  }
  if (v.type === "irrigation") return <IrrigationView cfg={cfg} />;
  if (v.type === "section") {
    const s = cfg.sections.find((x) => x.id === v.id);
    if (!s) return null;
    return (
      <>
        {!editMode.value && <RoomControls section={s} />}
        <CardGrid section={s} cards={s.cards} room={s.kind === "room" ? s.name : undefined} list={list} />
      </>
    );
  }
  if (v.type === "media") return <CardGrid cards={asCards(mediaEntities(cfg), list ? "sm" : "wide")} list={list} />;
  if (v.type === "security") {
    const ids = securityEntities(cfg);
    const order = (e: string) => ["alarm_control_panel", "lock", "binary_sensor", "camera"].indexOf(domainOf(e));
    ids.sort((a, b) => order(a) - order(b));
    return <CardGrid cards={ids.map((e) => ({ id: e, entity: e, size: domainOf(e) === "camera" && !list ? "wide" : "sm" }))} list={list} />;
  }
  return <CardGrid cards={asCards(sceneEntities(cfg))} list={list} />;
}

export function viewTitle(cfg: DashConfig, v: View) {
  if (v.type === "section") return cfg.sections.find((s) => s.id === v.id)?.name ?? "";
  if (v.type === "home") return cfg.title || "Home";
  if (v.type === "irrigation") return "Irrigation";
  return v.type === "media" ? "Media" : v.type === "security" ? "Security" : "Scenes";
}

/**
 * One dashboard for every screen. "Auto" picks tabs on phones and tablets and a
 * side list on big screens; any layout still adapts its grid to the space it has.
 */
export function effectiveLayout(cfg: DashConfig) {
  if (cfg.layout === "list" || cfg.layout === "focus") return cfg.layout;
  const nav = cfg.theme.nav ?? "auto";
  if (nav === "side") return "sidebar";
  if (nav === "tabs" || nav === "dock") return "grid";
  if (cfg.layout !== "auto") return cfg.layout;
  return width.value >= 1100 ? "sidebar" : "grid";
}

/** How rooms are shown: tabs across the top, a side list, or an app-style dock. */
export function effectiveNav(cfg: DashConfig): "tabs" | "side" | "dock" | "none" {
  const layout = effectiveLayout(cfg);
  if (layout === "list" || layout === "focus") return "none";
  if (cfg.theme.nav === "dock") return "dock";
  return layout === "sidebar" && width.value >= 720 ? "side" : "tabs";
}

export function Layout({ cfg }: { cfg: DashConfig }) {
  const items = navItems(cfg);
  const v = view.value && items.some((i) => i.key === viewKey(view.value)) ? view.value : items[0]?.view;
  if (!v) {
    return (
      <div class="empty big-empty">
        <Icon icon="mdi:home-plus-outline" size={48} />
        <p>No rooms or pages yet.</p>
        {info.value?.can_edit && <p class="muted">Open edit mode and add a room to get started.</p>}
      </div>
    );
  }
  const layout = effectiveLayout(cfg);
  const current = viewKey(v);
  const wallpaperSection = v.type === "section" ? cfg.sections.find((s) => s.id === v.id) : undefined;
  const wallpaper =
    layout !== "list" && wallpaperSection?.background ? (
      <div class="room-wallpaper" style={`background-image:url("${wallpaperSection.background.replace(/["\\]/g, "")}")`} />
    ) : null;

  if (layout === "list") {
    return (
      <div class="layout-list">
        {items.map((it, i) => (
          <>
            {it.group && it.group !== items[i - 1]?.group && <h2 class="floor-title list-floor">{it.group}</h2>}
            <section class="list-section" key={it.key}>
              {it.key !== "home" && (
                <h2 class="section-title">
                  <Icon icon={it.icon} size={20} /> {it.name}
                </h2>
              )}
              <ViewContent cfg={cfg} v={it.view} list />
            </section>
          </>
        ))}
      </div>
    );
  }

  if (layout === "sidebar" && !narrow.value && width.value >= 720) {
    return (
      <div class="layout-sidebar">
        {wallpaper}
        <Nav cfg={cfg} vertical current={current} />
        <main class="content">
          <h2 class="section-title">{viewTitle(cfg, v)}</h2>
          <ViewContent cfg={cfg} v={v} />
        </main>
      </div>
    );
  }

  if (layout === "focus") {
    const idx = items.findIndex((i) => i.key === viewKey(v));
    const go = (n: number) => (view.value = items[(idx + n + items.length) % items.length].view);
    return (
      <>
        {wallpaper}
        <FocusLayout cfg={cfg} v={v} idx={idx} count={items.length} go={go} items={items} />
      </>
    );
  }

  return (
    <div class="layout-grid">
      {wallpaper}
      <Nav cfg={cfg} current={current} />
      <main class="content">
        {(cfg.theme.nav === "dock" || cfg.theme.titles === "big" || cfg.theme.titles === "bold") && <h2 class="section-title page-title">{viewTitle(cfg, v)}</h2>}
        <ViewContent cfg={cfg} v={v} />
      </main>
    </div>
  );
}

function FocusLayout(p: { cfg: DashConfig; v: View; idx: number; count: number; go: (n: number) => void; items: NavItem[] }) {
  const start = useRef<number | null>(null);
  return (
    <div
      class="layout-focus"
      onTouchStart={(e) => (start.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (start.current === null || editMode.value) return;
        const dx = e.changedTouches[0].clientX - start.current;
        start.current = null;
        if (Math.abs(dx) > 70) p.go(dx < 0 ? 1 : -1);
      }}
    >
      <div class="focus-head">
        <IconButton icon="mdi:chevron-left" label="Previous room" onClick={() => p.go(-1)} />
        <h2 class="focus-title">{viewTitle(p.cfg, p.v)}</h2>
        <IconButton icon="mdi:chevron-right" label="Next room" onClick={() => p.go(1)} />
      </div>
      <div class="focus-dots">
        {p.items.map((it, i) => (
          <button type="button" class={`dot ${i === p.idx ? "on" : ""}`} aria-label={it.name} onClick={() => (view.value = it.view)} />
        ))}
      </div>
      <main class="content">
        <ViewContent cfg={p.cfg} v={p.v} />
      </main>
    </div>
  );
}

