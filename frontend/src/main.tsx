import { render } from "preact";
import { App } from "./app";
import { hass, loadAll, narrow, setPanelElement, stopSync } from "./store";
import type { Hass } from "./types";
import styles from "./styles.css?inline";

class DashForgePanel extends HTMLElement {
  private mount?: HTMLDivElement;
  private started = false;

  set hass(value: Hass) {
    hass.value = value;
    if (!this.started && this.isConnected) this.start();
  }

  set narrow(value: boolean) {
    narrow.value = value;
  }

  // Home Assistant also sets `route` and `panel`; DashForge doesn't need them.
  set route(_v: unknown) {}
  set panel(_v: unknown) {}

  connectedCallback() {
    if (!this.shadowRoot) {
      const root = this.attachShadow({ mode: "open" });
      const style = document.createElement("style");
      style.textContent = styles;
      this.mount = document.createElement("div");
      this.mount.className = "df-mount";
      root.append(style, this.mount);
    }
    setPanelElement(this);
    render(<App />, this.mount!);
    if (hass.value && !this.started) this.start();
  }

  disconnectedCallback() {
    if (this.mount) render(null, this.mount);
    stopSync();
    this.started = false;
  }

  private start() {
    this.started = true;
    loadAll();
  }
}

if (!customElements.get("dashforge-panel")) {
  customElements.define("dashforge-panel", DashForgePanel);
}
