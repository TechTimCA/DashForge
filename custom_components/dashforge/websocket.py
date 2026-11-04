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
from .irrigation import MAX_MINUTES, SIGNAL_IRRIGATION_UPDATED, IrrigationController
from .storage import ConfigTooLarge, DashForgeStore, RevisionConflict


def _store(hass: HomeAssistant) -> DashForgeStore | None:
    data = hass.data.get(DOMAIN)
    return data["store"] if data else None


def _irrigation(hass: HomeAssistant) -> IrrigationController | None:
    data = hass.data.get(DOMAIN)
    return data["irrigation"] if data else None


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
    websocket_api.async_register_command(hass, ws_irrigation_subscribe)
    websocket_api.async_register_command(hass, ws_irrigation_run)
    websocket_api.async_register_command(hass, ws_irrigation_stop)


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


@websocket_api.websocket_command({vol.Required("type"): "dashforge/irrigation/subscribe"})
@callback
def ws_irrigation_subscribe(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    ctrl = _irrigation(hass)
    if ctrl is None:
        connection.send_error(msg["id"], "not_loaded", "DashForge is not set up")
        return

    @callback
    def forward(data: dict[str, Any]) -> None:
        connection.send_message(websocket_api.event_message(msg["id"], data))

    connection.subscriptions[msg["id"]] = async_dispatcher_connect(
        hass, SIGNAL_IRRIGATION_UPDATED, forward
    )
    connection.send_result(msg["id"])
    forward(ctrl.status())


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dashforge/irrigation/run",
        vol.Required("entity_ids"): [str],
        vol.Required("minutes"): vol.All(vol.Coerce(float), vol.Range(min=0.1, max=MAX_MINUTES)),
    }
)
@websocket_api.async_response
async def ws_irrigation_run(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    ctrl = _irrigation(hass)
    if ctrl is None:
        connection.send_error(msg["id"], "not_loaded", "DashForge is not set up")
        return
    await ctrl.async_run(msg["entity_ids"], msg["minutes"])
    connection.send_result(msg["id"], ctrl.status())


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dashforge/irrigation/stop",
        vol.Optional("skip", default=False): bool,
    }
)
@websocket_api.async_response
async def ws_irrigation_stop(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    ctrl = _irrigation(hass)
    if ctrl is None:
        connection.send_error(msg["id"], "not_loaded", "DashForge is not set up")
        return
    if msg["skip"]:
        await ctrl.async_skip()
    else:
        await ctrl.async_stop()
    connection.send_result(msg["id"], ctrl.status())
