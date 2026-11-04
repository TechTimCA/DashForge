"""Websocket API used by the DashForge panel."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect

from .const import (
    CONF_REQUIRE_ADMIN_EDIT,
    DEFAULT_REQUIRE_ADMIN_EDIT,
    DOMAIN,
    SIGNAL_CONFIG_UPDATED,
    VERSION,
)
from .storage import ConfigTooLarge, DashForgeStore, RevisionConflict


def _store(hass: HomeAssistant) -> DashForgeStore | None:
    data = hass.data.get(DOMAIN)
    return data["store"] if data else None


def _can_edit(hass: HomeAssistant, connection: websocket_api.ActiveConnection) -> bool:
    entries = hass.config_entries.async_entries(DOMAIN)
    require_admin = (
        entries[0].options.get(CONF_REQUIRE_ADMIN_EDIT, DEFAULT_REQUIRE_ADMIN_EDIT)
        if entries
        else DEFAULT_REQUIRE_ADMIN_EDIT
    )
    return connection.user.is_admin or not require_admin


@callback
def async_register(hass: HomeAssistant) -> None:
    websocket_api.async_register_command(hass, ws_info)
    websocket_api.async_register_command(hass, ws_get)
    websocket_api.async_register_command(hass, ws_save)
    websocket_api.async_register_command(hass, ws_subscribe)


@websocket_api.websocket_command({vol.Required("type"): "dashforge/info"})
@callback
def ws_info(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    connection.send_result(
        msg["id"],
        {
            "version": VERSION,
            "can_edit": _can_edit(hass, connection),
            "is_admin": connection.user.is_admin,
            "loaded": _store(hass) is not None,
        },
    )


@websocket_api.websocket_command({vol.Required("type"): "dashforge/config/get"})
@callback
def ws_get(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    store = _store(hass)
    if store is None:
        connection.send_error(msg["id"], "not_loaded", "DashForge is not set up")
        return
    connection.send_result(msg["id"], store.as_dict())


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dashforge/config/save",
        vol.Required("config"): vol.Any(dict, None),
        vol.Optional("revision"): vol.Coerce(int),
    }
)
@websocket_api.async_response
async def ws_save(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    store = _store(hass)
    if store is None:
        connection.send_error(msg["id"], "not_loaded", "DashForge is not set up")
        return
    if not _can_edit(hass, connection):
        connection.send_error(
            msg["id"], "unauthorized", "Only administrators can change this dashboard"
        )
        return
    try:
        revision = await store.async_save(msg["config"], msg.get("revision"))
    except RevisionConflict:
        connection.send_error(
            msg["id"],
            "conflict",
            "The dashboard was changed on another device. Reload and try again.",
        )
        return
    except ConfigTooLarge:
        connection.send_error(msg["id"], "too_large", "The dashboard is too large")
        return
    connection.send_result(msg["id"], {"revision": revision})


@websocket_api.websocket_command({vol.Required("type"): "dashforge/config/subscribe"})
@callback
def ws_subscribe(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Push every saved change to open dashboards, so all tablets stay in sync."""

    @callback
    def forward(data: dict[str, Any]) -> None:
        connection.send_message(websocket_api.event_message(msg["id"], data))

    connection.subscriptions[msg["id"]] = async_dispatcher_connect(
        hass, SIGNAL_CONFIG_UPDATED, forward
    )
    connection.send_result(msg["id"])
