import { useEffect, useRef, useState } from "preact/hooks";
import { hass, view } from "../store";
import type { DashConfig } from "../types";
import { Icon } from "./ui";
import { conditionIcon, eventTime, formatTime, useEvents, useNow, useWeather } from "./widgets";

/** Tracks touches/keys and reports how long the screen has been idle. */
export function useIdle(onIdle: () => void, minutes: number, enabled: boolean) {
  const cb = useRef(onIdle);
  cb.current = onIdle;
  useEffect(() => {
    if (!enabled || minutes <= 0) return;
    const fire = () => cb.current();
    let timer = window.setTimeout(fire, minutes * 60_000);
    const reset = () => {
      clearTimeout(timer);
      timer = window.setTimeout(fire, minutes * 60_000);
    };
    const events = ["pointerdown", "keydown", "wheel", "touchstart"];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
  }, [enabled, minutes]);
}

export function TabletBehaviour({ cfg }: { cfg: DashConfig }) {
  const [saver, setSaver] = useState(false);
  useIdle(() => setSaver(true), cfg.tablet.screensaverMinutes, cfg.tablet.screensaver && !saver);
  useIdle(() => (view.value = null), cfg.tablet.returnHomeMinutes, cfg.tablet.returnHomeMinutes > 0);
  useSidebarHidden(cfg.tablet.hideSidebar);
  if (!saver) return null;
  return <Screensaver cfg={cfg} onWake={() => setSaver(false)} />;
}

function Screensaver({ cfg, onWake }: { cfg: DashConfig; onWake: () => void }) {
  const h = hass.value!;
  const lang = h.locale?.language ?? h.language;
  const now = useNow(1000);
  const weather = useWeather(h, cfg);
  const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const events = useEvents(h, cfg.header.calendars, dayStart, new Date(dayStart.getTime() + 86400000), Math.floor(now.getTime() / 600_000));
  const next = events.find((e) => e.end > now);
  const style = cfg.tablet.screensaverStyle;
  // Drift the clock slowly so a static image never burns into the panel.
  const drift = Math.floor(now.getTime() / 60_000) % 8;
  const offset = [[0, 0], [3, 2], [-3, 4], [4, -3], [-2, -4], [2, 5], [-4, 1], [1, -2]][drift];
  return (
    <div
      class={`screensaver ss-${style}`}
      role="button"
      tabIndex={0}
      aria-label="Tap to wake"
      onPointerDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onWake();
      }}
      onKeyDown={onWake}
    >
      {style !== "black" && (
        <div class="ss-content" style={`transform:translate(${offset[0]}vw,${offset[1]}vh)`}>
          <div class="ss-clock">{formatTime(now, cfg.header.clock24h, lang)}</div>
          <div class="ss-date">{now.toLocaleDateString(lang, { weekday: "long", month: "long", day: "numeric" })}</div>
          {style === "clock" && (
            <div class="ss-extra">
              {weather && (
                <span>
                  <Icon icon={conditionIcon(weather.condition)} size={32} />
                  {weather.temp != null && `${Math.round(weather.temp)}°`}
                </span>
              )}
              {next && (
                <span>
                  <Icon icon="mdi:calendar" size={28} /> {eventTime(next, lang, cfg.header.clock24h)} {next.summary}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Hide the Home Assistant sidebar for a full-screen wall display.
 * Home Assistant has no public API for this, so it is best effort and fails silently.
 * Adding ?menu to the URL keeps the sidebar on that one device.
 */
function useSidebarHidden(hide: boolean) {
  useEffect(() => {
    const keep = new URLSearchParams(location.search).has("menu");
    const apply = (on: boolean) => {
      try {
        const main = document.querySelector("home-assistant")?.shadowRoot?.querySelector("home-assistant-main")?.shadowRoot;
        const drawer = main?.querySelector("ha-drawer") as HTMLElement | null;
        const sidebar = main?.querySelector("ha-sidebar") as HTMLElement | null;
        if (sidebar) sidebar.style.display = on ? "none" : "";
        if (drawer) drawer.style.setProperty("--mdc-drawer-width", on ? "0px" : "");
        const aside = drawer?.shadowRoot?.querySelector(".mdc-drawer") as HTMLElement | null;
        if (aside) aside.style.display = on ? "none" : "";
        const content = drawer?.shadowRoot?.querySelector(".mdc-drawer-app-content") as HTMLElement | null;
        if (content) content.style.marginLeft = on ? "0" : "";
      } catch {
        /* layout changed in a newer Home Assistant; ignore */
      }
    };
    const on = hide && !keep;
    apply(on);
    if (!on) return;
    const t = window.setInterval(() => apply(true), 2000);
    return () => {
      clearInterval(t);
      apply(false);
    };
  }, [hide]);
}
