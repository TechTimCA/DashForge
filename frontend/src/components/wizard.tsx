import { signal } from "@preact/signals";
import { useState } from "preact/hooks";
import { clone, defaultConfig, normalizeConfig } from "../config";
import { hass, saveConfig, saved, settingsOpen, showToast, view, wizardOpen } from "../store";
import type { DashConfig } from "../types";
import {
  DevicesStep,
  LayoutStep,
  PagesStep,
  ReviewStep,
  RoomsStep,
  ScenesMediaStep,
  TabletStep,
  ThemeStep,
  WelcomeStep,
  WidgetsStep,
  makeSetter,
  seedFirstRun,
  type StepProps,
} from "./steps";
import { Button, Icon, Modal, TextInput } from "./ui";

/** Config being edited in the wizard or settings; drives the live preview. */
export const previewConfig = signal<DashConfig | null>(null);

const STEPS: { id: string; title: string; icon: string; C: (p: StepProps) => any }[] = [
  { id: "welcome", title: "Welcome", icon: "mdi:hand-wave", C: WelcomeStep },
  { id: "rooms", title: "Rooms", icon: "mdi:floor-plan", C: RoomsStep },
  { id: "devices", title: "Devices", icon: "mdi:devices", C: DevicesStep },
  { id: "scenes", title: "Scenes & media", icon: "mdi:palette", C: ScenesMediaStep },
  { id: "widgets", title: "Header & widgets", icon: "mdi:weather-partly-cloudy", C: WidgetsStep },
  { id: "layout", title: "Layout", icon: "mdi:view-quilt", C: LayoutStep },
  { id: "theme", title: "Look & feel", icon: "mdi:brush", C: ThemeStep },
  { id: "pages", title: "Pages", icon: "mdi:book-open-page-variant", C: PagesStep },
  { id: "tablet", title: "Wall tablet", icon: "mdi:tablet", C: TabletStep },
  { id: "review", title: "Review", icon: "mdi:check-decagram", C: ReviewStep },
];

export function startWizard() {
  const base = saved.value ? clone(saved.value) : defaultConfig();
  if (!saved.value) seedFirstRun(hass.value!, base);
  previewConfig.value = base;
  settingsOpen.value = false;
  wizardOpen.value = true;
}

export function Wizard() {
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const cfg = previewConfig.value;
  if (!cfg) return null;
  const set = makeSetter(() => previewConfig.value!, (c) => (previewConfig.value = c));
  const S = STEPS[step];
  const last = step === STEPS.length - 1;
  const firstRun = !saved.value?.setupComplete;

  const finish = async () => {
    setBusy(true);
    const ok = await saveConfig({ ...cfg, setupComplete: true });
    setBusy(false);
    if (ok) {
      wizardOpen.value = false;
      previewConfig.value = null;
      view.value = null;
      showToast("Your dashboard is ready");
    }
  };

  return (
    <div class="wizard" role="dialog" aria-modal="true" aria-label="DashForge setup">
      <aside class="wizard-steps">
        <div class="brand">
          <Icon icon="mdi:anvil" size={28} />
          <span>DashForge</span>
        </div>
        <ol>
          {STEPS.map((s, i) => (
            <li>
              <button type="button" class={`wstep ${i === step ? "current" : ""} ${i < step ? "done" : ""}`} onClick={() => setStep(i)} aria-current={i === step ? "step" : undefined}>
                <Icon icon={i < step ? "mdi:check-circle" : s.icon} size={20} />
                <span>{s.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </aside>
      <section class="wizard-main">
        <div class="wizard-progress" aria-hidden="true">
          <div style={`width:${((step + 1) / STEPS.length) * 100}%`} />
        </div>
        <div class="wizard-head">
          <span class="muted small">Step {step + 1} of {STEPS.length}</span>
          <h2>{S.title}</h2>
        </div>
        <div class="wizard-body">
          <S.C cfg={cfg} set={set} />
        </div>
        <div class="wizard-foot">
          {!firstRun ? (
            <Button
              kind="ghost"
              onClick={() => {
                wizardOpen.value = false;
                previewConfig.value = null;
              }}
            >
              Cancel
            </Button>
          ) : (
            <span />
          )}
          <div class="btn-row">
            {step > 0 && (
              <Button kind="ghost" icon="mdi:arrow-left" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            {last ? (
              <Button kind="primary" icon="mdi:check" disabled={busy} onClick={finish}>
                {firstRun ? "Finish setup" : "Save"}
              </Button>
            ) : (
              <Button kind="primary" icon="mdi:arrow-right" onClick={() => setStep(step + 1)}>
                Next
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// ---------- Settings ----------

const SETTINGS_TABS = STEPS.filter((s) => s.id !== "review").map((s) => (s.id === "welcome" ? { ...s, title: "General", icon: "mdi:cog" } : s));

export function openSettings() {
  previewConfig.value = clone(saved.value!);
  settingsOpen.value = true;
}

export function SettingsModal() {
  const [tab, setTab] = useState("welcome");
  const [busy, setBusy] = useState(false);
  const cfg = previewConfig.value;
  if (!cfg) return null;
  const set = makeSetter(() => previewConfig.value!, (c) => (previewConfig.value = c));
  const close = () => {
    settingsOpen.value = false;
    previewConfig.value = null;
  };
  const save = async () => {
    setBusy(true);
    const ok = await saveConfig(cfg);
    setBusy(false);
    if (ok) {
      close();
      showToast("Settings saved");
    }
  };
  const T = SETTINGS_TABS.find((t) => t.id === tab);
  return (
    <Modal
      title="Settings"
      onClose={close}
      wide
      footer={
        <>
          <Button kind="ghost" onClick={close}>Cancel</Button>
          <Button kind="primary" icon="mdi:check" disabled={busy} onClick={save}>Save</Button>
        </>
      }
    >
      <div class="settings">
        <nav class="settings-tabs">
          {SETTINGS_TABS.map((t) => (
            <button type="button" class={`wstep ${tab === t.id ? "current" : ""}`} onClick={() => setTab(t.id)}>
              <Icon icon={t.icon} size={20} />
              <span>{t.title}</span>
            </button>
          ))}
          <button type="button" class={`wstep ${tab === "backup" ? "current" : ""}`} onClick={() => setTab("backup")}>
            <Icon icon="mdi:backup-restore" size={20} />
            <span>Backup & reset</span>
          </button>
        </nav>
        <div class="settings-body">{T ? <T.C cfg={cfg} set={set} /> : <BackupTab cfg={cfg} onReplace={(c) => (previewConfig.value = c)} />}</div>
      </div>
    </Modal>
  );
}

function BackupTab({ cfg, onReplace }: { cfg: DashConfig; onReplace: (c: DashConfig) => void }) {
  const [text, setText] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);
  const download = () => {
    const blob = new Blob([JSON.stringify(cfg, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `dashforge-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  const importText = (raw: string) => {
    try {
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.sections)) throw new Error("bad");
      onReplace({ ...normalizeConfig(parsed), setupComplete: true });
      showToast("Imported. Press Save to keep it.");
      setText("");
    } catch {
      showToast("That file isn't a DashForge backup", "error");
    }
  };
  return (
    <div class="step">
      <div class="labeled-label">Export</div>
      <p class="muted small">Download your whole dashboard as a file, to keep a copy or move it to another Home Assistant.</p>
      <Button icon="mdi:download" onClick={download}>Download backup</Button>
      <div class="labeled-label">Import</div>
      <input
        type="file"
        accept="application/json,.json"
        class="input"
        onChange={(e) => {
          const f = (e.target as HTMLInputElement).files?.[0];
          f?.text().then(importText);
        }}
      />
      <p class="muted small">Or paste a backup:</p>
      <TextInput value={text} onInput={setText} placeholder='{"schema":1,…}' />
      <Button icon="mdi:upload" disabled={!text.trim()} onClick={() => importText(text)}>Import pasted backup</Button>
      <div class="labeled-label">Start over</div>
      <div class="btn-row">
        <Button icon="mdi:wizard-hat" onClick={startWizard}>Run the setup wizard again</Button>
        <Button kind="danger" icon="mdi:restore" onClick={() => setConfirmReset(true)}>Reset dashboard</Button>
      </div>
      {confirmReset && (
        <Modal
          title="Reset the dashboard?"
          onClose={() => setConfirmReset(false)}
          footer={
            <>
              <Button kind="ghost" onClick={() => setConfirmReset(false)}>Cancel</Button>
              <Button
                kind="danger"
                onClick={async () => {
                  if (await saveConfig(null)) {
                    setConfirmReset(false);
                    settingsOpen.value = false;
                    previewConfig.value = null;
                  }
                }}
              >
                Reset
              </Button>
            </>
          }
        >
          <p>This removes every room, page and setting from DashForge and starts the setup wizard. Nothing in Home Assistant itself is changed. Download a backup first if you might want it back.</p>
        </Modal>
      )}
    </div>
  );
}
