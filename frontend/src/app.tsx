import { BACKGROUNDS } from "./config";
import { fontStack } from "./fonts";
import { CardEditorModal, EditBar, HiddenTray, PickerModal, SectionEditorModal } from "./components/edit";
import { DetailSheet, LockConfirm } from "./components/details";
import { Header, Layout, SceneStrip } from "./components/layout";
import { SidebarControl, TabletBehaviour } from "./components/tablet";
import { Button, Icon, IconStyle } from "./components/ui";
import { CalendarModal, TodoModal, WeatherModal, openWidget, useWeather, useWeatherFor } from "./components/widgets";
import { entityWidget } from "./components/cards";
import { LightsOffConfirm } from "./components/home";
import { IrrigationSync } from "./components/irrigation";
import { SettingsModal, Wizard, previewConfig, startWizard } from "./components/wizard";
import { config, editMode, hass, info, loadAll, loadError, saved, settingsOpen, toast, wizardOpen } from "./store";
import type { DashConfig, Hass } from "./types";

function themeStyle(cfg: DashConfig, dark: boolean): string {
  const t = cfg.theme;
  let bg: string;
  if (t.background === "image" && t.backgroundImage) {
    const url = t.backgroundImage.replace(/["\\]/g, "");
    bg = `center / cover no-repeat url("${url}")`;
  } else {
    const preset = BACKGROUNDS.find((b) => b.id === t.background) ?? BACKGROUNDS[0];
    bg = dark ? preset.dark : preset.light;
  }
  return `--accent:${t.accent};--radius:${t.radius}px;--page-bg:${bg};--font:${fontStack(t.font).replace(/"/g, "'")};`;
}

const LINE_ICON_STYLES: Record<string, number> = { daylight: 1.75, blocks: 2.4, console: 1.5 };

function Themed({ cfg, children }: { cfg: DashConfig; children: any }) {
  const h = hass.value!;
  const dark = cfg.theme.mode === "dark" || (cfg.theme.mode === "auto" && !!h.themes?.darkMode);
  const stroke = LINE_ICON_STYLES[cfg.theme.style];
  return (
    <IconStyle.Provider value={{ line: stroke !== undefined, stroke: stroke ?? 2 }}>
    <div
      class={`df-root ${dark ? "dark" : "light"} style-${cfg.theme.style ?? "dashforge"} cards-${cfg.theme.cardStyle} density-${cfg.theme.density} ${editMode.value ? "editing" : ""}`}
      style={themeStyle(cfg, dark)}
    >
      {children}
      {toast.value && (
        <div class={`toast ${toast.value.kind}`} role="status">
          {toast.value.text}
        </div>
      )}
    </div>
    </IconStyle.Provider>
  );
}

function Centered({ children }: { children: any }) {
  return <div class="centered">{children}</div>;
}

function EntityWidget({ cfg, h }: { cfg: DashConfig; h: Hass }) {
  const w = entityWidget.value;
  const lang = h.locale?.language ?? h.language;
  const weather = useWeatherFor(h, w?.kind === "weather" ? w.entity : undefined, false);
  if (!w) return null;
  const close = () => (entityWidget.value = null);
  if (w.kind === "weather") return weather ? <WeatherModal data={weather} lang={lang} h24={cfg.header.clock24h} onClose={close} /> : null;
  if (w.kind === "calendar") return <CalendarModal cfg={cfg} lang={lang} calendars={[w.entity]} onClose={close} />;
  return <TodoModal cfg={cfg} lists={[w.entity]} onClose={close} />;
}

function Widgets({ cfg, h }: { cfg: DashConfig; h: Hass }) {
  const weather = useWeather(h, cfg);
  const lang = h.locale?.language ?? h.language;
  return (
    <>
      <EntityWidget cfg={cfg} h={h} />
      {openWidget.value === "weather" && weather && <WeatherModal data={weather} lang={lang} h24={cfg.header.clock24h} />}
      {openWidget.value === "calendar" && <CalendarModal cfg={cfg} lang={lang} />}
      {openWidget.value === "todo" && <TodoModal cfg={cfg} />}
    </>
  );
}

export function App() {
  const h = hass.value;
  if (!h) return null;

  const fallback = previewConfig.value ?? saved.value;
  if (loadError.value) {
    return (
      <div class="df-root light">
        <Centered>
          <Icon icon="mdi:alert-circle-outline" size={48} />
          <h2>DashForge couldn't load</h2>
          <p class="muted">{loadError.value}</p>
          <Button kind="primary" onClick={loadAll}>Try again</Button>
        </Centered>
      </div>
    );
  }
  if (!info.value) {
    return (
      <div class="df-root light">
        <Centered>
          <div class="spinner" aria-label="Loading" />
        </Centered>
      </div>
    );
  }

  if (wizardOpen.value && previewConfig.value) {
    return (
      <Themed cfg={previewConfig.value}>
        <Wizard />
      </Themed>
    );
  }

  const cfg = config.value;
  if (!cfg || !cfg.setupComplete) {
    const base = fallback ?? ({ theme: { mode: "auto", accent: "#3b82f6", background: "aurora", cardStyle: "glass", radius: 20, density: "comfortable" }, layout: "grid" } as DashConfig);
    return (
      <Themed cfg={base}>
        <Centered>
          <div class="welcome-card">
            <Icon icon="mdi:anvil" size={56} />
            <h1>Welcome to DashForge</h1>
            {info.value.can_edit ? (
              <>
                <p>Let's build a dashboard that fits your home. The setup asks you about your rooms, devices, layout and look, one step at a time. It takes about five minutes, and you can change everything afterwards.</p>
                <Button kind="primary" icon="mdi:arrow-right" onClick={startWizard}>Start setup</Button>
              </>
            ) : (
              <p>This dashboard hasn't been set up yet. Ask an administrator of this Home Assistant to open DashForge and finish the setup.</p>
            )}
          </div>
        </Centered>
      </Themed>
    );
  }

  // While Settings is open, the dashboard behind it previews the changes.
  const live = settingsOpen.value && previewConfig.value ? previewConfig.value : cfg;

  return (
    <Themed cfg={live}>
      <div class="dashboard">
        <Header cfg={live} />
        <SceneStrip cfg={live} />
        <Layout cfg={live} />
      </div>
      <EditBar />
      <DetailSheet />
      <LockConfirm />
      <PickerModal />
      <CardEditorModal />
      <SectionEditorModal />
      <HiddenTray />
      <LightsOffConfirm />
      <IrrigationSync />
      <Widgets cfg={live} h={h} />
      {settingsOpen.value && <SettingsModal />}
      {!editMode.value && <TabletBehaviour cfg={live} />}
      <SidebarControl cfg={live} />
    </Themed>
  );
}
