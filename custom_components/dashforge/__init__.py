"""DashForge: a free, fully customizable dashboard for Home Assistant."""

from __future__ import annotations

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from . import websocket
from .const import (
    CONF_SIDEBAR_ICON,
    CONF_SIDEBAR_TITLE,
    DATA_STATIC_REGISTERED,
    DATA_WS_REGISTERED,
    DEFAULT_SIDEBAR_ICON,
    DEFAULT_SIDEBAR_TITLE,
    DOMAIN,
    FRONTEND_DIR,
    PANEL_COMPONENT,
    PANEL_FILENAME,
    PANEL_URL_PATH,
    STATIC_URL_BASE,
    VERSION,
)
from .storage import DashForgeStore


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    store = DashForgeStore(hass)
    await store.async_load()
    hass.data[DOMAIN] = {"store": store}

    # Static paths and websocket commands cannot be unregistered, so they are
    # registered once per Home Assistant run and survive integration reloads.
    if not hass.data.get(DATA_STATIC_REGISTERED):
        await hass.http.async_register_static_paths(
            [StaticPathConfig(STATIC_URL_BASE, str(FRONTEND_DIR), False)]
        )
        hass.data[DATA_STATIC_REGISTERED] = True
    if not hass.data.get(DATA_WS_REGISTERED):
        websocket.async_register(hass)
        hass.data[DATA_WS_REGISTERED] = True

    await panel_custom.async_register_panel(
        hass,
        frontend_url_path=PANEL_URL_PATH,
        webcomponent_name=PANEL_COMPONENT,
        module_url=f"{STATIC_URL_BASE}/{PANEL_FILENAME}?v={VERSION}",
        sidebar_title=entry.options.get(CONF_SIDEBAR_TITLE, DEFAULT_SIDEBAR_TITLE),
        sidebar_icon=entry.options.get(CONF_SIDEBAR_ICON, DEFAULT_SIDEBAR_ICON),
        require_admin=False,
        embed_iframe=False,
        config={"version": VERSION},
    )

    entry.async_on_unload(entry.add_update_listener(_async_options_updated))
    return True


async def _async_options_updated(hass: HomeAssistant, entry: ConfigEntry) -> None:
    await hass.config_entries.async_reload(entry.entry_id)


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    frontend.async_remove_panel(hass, PANEL_URL_PATH)
    hass.data.pop(DOMAIN, None)
    return True


async def async_remove_entry(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Delete the saved dashboard when the integration is removed."""
    await DashForgeStore(hass).async_remove()
