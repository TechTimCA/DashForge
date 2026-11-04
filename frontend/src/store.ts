import { computed, signal } from "@preact/signals";
import { clone, normalizeConfig } from "./config";
import type { DashConfig, Hass } from "./types";

export const hass = signal<Hass | null>(null);
export const narrow = signal(false);
/** Width of the dashboard in CSS pixels, used by the Auto layout. */
export const width = signal(typeof window !== "undefined" ? window.innerWidth : 1200);

export interface Info {
  version: string;
  can_edit: boolean;
  is_admin: boolean;
}

export const info = signal<Info | null>(null);
export const saved = signal<DashConfig | null>(null);
export const revision = signal(0);
export const loadError = signal<string | null>(null);

/** Working copy while editing. null when not in edit mode. */
export const draft = signal<DashConfig | null>(null);
export const editMode = computed(() => draft.value !== null);
export const config = computed<DashConfig | null>(() => draft.value ?? saved.value);

export type View =
  | { type: "home" }
  | { type: "section"; id: string }
  | { type: "media" }
  | { type: "security" }
  | { type: "scenes" }
  | { type: "irrigation" };

export const view = signal<View | null>(null);

/** This device's choice for the Home Assistant sidebar; null follows the dashboard setting. */
function readSidebarPref(): "hidden" | "shown" | null {
  try {
    const v = localStorage.getItem("dashforge.sidebar");
    return v === "hidden" || v === "shown" ? v : null;
  } catch {
    return null;
  }
}
export const sidebarPref = signal<"hidden" | "shown" | null>(readSidebarPref());
export function setSidebarHidden(hidden: boolean) {
  const v = hidden ? "hidden" : "shown";
  sidebarPref.value = v;
  try {
    localStorage.setItem("dashforge.sidebar", v);
  } catch {
    /* private mode: the choice lasts until the page reloads */
  }
}
export function sidebarHidden(settingHidden: boolean): boolean {
  return sidebarPref.value ? sidebarPref.value === "hidden" : settingHidden;
}
export const settingsOpen = signal(false);
export const wizardOpen = signal(false);
export const toast = signal<{ text: string; kind: "info" | "error" } | null>(null);

let toastTimer: number | undefined;
export function showToast(text: string, kind: "info" | "error" = "info") {
  toast.value = { text, kind };
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => (toast.value = null), 3500);
}

function h(): Hass {
  if (!hass.value) throw new Error("Home Assistant is not connected");
  return hass.value;
}

let unsubscribe: (() => Promise<void>) | null = null;

export async function loadAll(): Promise<void> {
  try {
    const [i, c] = await Promise.all([
      h().callWS<Info>({ type: "dashforge/info" }),
      h().callWS<{ config: unknown; revision: number }>({ type: "dashforge/config/get" }),
    ]);
    info.value = i;
    revision.value = c.revision;
    saved.value = c.config ? normalizeConfig(c.config) : null;
    loadError.value = null;
    if (!unsubscribe) {
      unsubscribe = await h().connection.subscribeMessage<{
        config: unknown;
        revision: number;
      }>(
        (msg) => {
          if (msg.revision === revision.value) return;
          revision.value = msg.revision;
          saved.value = msg.config ? normalizeConfig(msg.config) : null;
        },
        { type: "dashforge/config/subscribe" },
      );
    }
  } catch (err: any) {
    loadError.value = err?.message ?? String(err);
  }
}

export function stopSync() {
  unsubscribe?.().catch(() => undefined);
  unsubscribe = null;
}

export async function saveConfig(next: DashConfig | null): Promise<boolean> {
  try {
    const res = await h().callWS<{ revision: number }>({
      type: "dashforge/config/save",
      config: next,
      revision: revision.value,
    });
    revision.value = res.revision;
    saved.value = next ? normalizeConfig(next) : null;
    return true;
  } catch (err: any) {
    if (err?.code === "conflict") {
      showToast("This dashboard was changed on another device. Reloaded the latest version.", "error");
      await loadAll();
    } else {
      showToast(err?.message ?? "Could not save the dashboard", "error");
    }
    return false;
  }
}

// ---------- Edit mode ----------

export function startEditing() {
  if (saved.value) draft.value = clone(saved.value);
}

export function updateDraft(fn: (c: DashConfig) => void) {
  if (!draft.value) return;
  const next = clone(draft.value);
  fn(next);
  draft.value = next;
}

export async function finishEditing() {
  if (!draft.value) return;
  if (await saveConfig(draft.value)) {
    draft.value = null;
    showToast("Dashboard saved");
  }
}

export function cancelEditing() {
  draft.value = null;
}

// ---------- Service helpers ----------

export function call(domain: string, service: string, data: Record<string, unknown> = {}) {
  return h()
    .callService(domain, service, data)
    .catch((err: any) => showToast(err?.message ?? `${domain}.${service} failed`, "error"));
}

export function moreInfo(entityId: string) {
  panelElement?.dispatchEvent(
    new CustomEvent("hass-more-info", {
      detail: { entityId },
      bubbles: true,
      composed: true,
    }),
  );
}

export let panelElement: HTMLElement | null = null;
export function setPanelElement(el: HTMLElement) {
  panelElement = el;
}
