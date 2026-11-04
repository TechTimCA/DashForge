"""Background pictures uploaded from the dashboard.

Files are stored in <config>/dashforge_media and served at /dashforge_media,
the same way Home Assistant serves /local. Only people allowed to edit the
dashboard can upload or delete them.
"""

from __future__ import annotations

from http import HTTPStatus
from pathlib import Path
import re
from typing import Any
import uuid

from aiohttp import web
import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.components.http import KEY_HASS, KEY_HASS_USER, HomeAssistantView
from homeassistant.core import HomeAssistant, callback

from .const import CONF_REQUIRE_ADMIN_EDIT, DEFAULT_REQUIRE_ADMIN_EDIT, DOMAIN

MEDIA_URL = "/dashforge_media"
MEDIA_DIRNAME = "dashforge_media"
MAX_BYTES = 15 * 1024 * 1024
NAME_RE = re.compile(r"^[0-9a-f]{32}\.(jpg|png|webp)$")
SIGNATURES = {
    "jpg": (b"\xff\xd8\xff",),
    "png": (b"\x89PNG\r\n\x1a\n",),
    "webp": (b"RIFF",),
}


def media_dir(hass: HomeAssistant) -> Path:
    return Path(hass.config.path(MEDIA_DIRNAME))


def user_can_edit(hass: HomeAssistant, user: Any) -> bool:
    entries = hass.config_entries.async_entries(DOMAIN)
    require_admin = (
        entries[0].options.get(CONF_REQUIRE_ADMIN_EDIT, DEFAULT_REQUIRE_ADMIN_EDIT)
        if entries
        else DEFAULT_REQUIRE_ADMIN_EDIT
    )
    return bool(user and (user.is_admin or not require_admin))


def _kind(data: bytes) -> str | None:
    for ext, sigs in SIGNATURES.items():
        if any(data.startswith(sig) for sig in sigs):
            if ext == "webp" and data[8:12] != b"WEBP":
                continue
            return ext
    return None


class DashForgeUploadView(HomeAssistantView):
    """POST a picture as multipart field `file`; returns its URL."""

    url = "/api/dashforge/upload"
    name = "api:dashforge:upload"
    requires_auth = True

    async def post(self, request: web.Request) -> web.Response:
        hass: HomeAssistant = request.app[KEY_HASS]
        if not user_can_edit(hass, request[KEY_HASS_USER]):
            return self.json_message("Only administrators can change this dashboard", HTTPStatus.FORBIDDEN)
        reader = await request.multipart()
        field = await reader.next()
        if field is None or getattr(field, "name", None) != "file":
            return self.json_message("Send the picture as a 'file' field", HTTPStatus.BAD_REQUEST)
        data = bytearray()
        while chunk := await field.read_chunk(256 * 1024):
            data.extend(chunk)
            if len(data) > MAX_BYTES:
                return self.json_message("That picture is larger than 15 MB", HTTPStatus.REQUEST_ENTITY_TOO_LARGE)
        ext = _kind(bytes(data[:16]))
        if ext is None:
            return self.json_message("Use a JPEG, PNG or WebP picture", HTTPStatus.UNSUPPORTED_MEDIA_TYPE)
        name = f"{uuid.uuid4().hex}.{ext}"
        folder = media_dir(hass)

        def write() -> None:
            folder.mkdir(parents=True, exist_ok=True)
            (folder / name).write_bytes(bytes(data))

        await hass.async_add_executor_job(write)
        return self.json({"name": name, "url": f"{MEDIA_URL}/{name}"})


@callback
def async_register_ws(hass: HomeAssistant) -> None:
    websocket_api.async_register_command(hass, ws_media_list)
    websocket_api.async_register_command(hass, ws_media_delete)


@websocket_api.websocket_command({vol.Required("type"): "dashforge/media/list"})
@websocket_api.async_response
async def ws_media_list(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    folder = media_dir(hass)

    def scan() -> list[dict[str, Any]]:
        if not folder.is_dir():
            return []
        files = [p for p in folder.iterdir() if NAME_RE.match(p.name)]
        files.sort(key=lambda p: p.stat().st_mtime, reverse=True)
        return [{"name": p.name, "url": f"{MEDIA_URL}/{p.name}", "size": p.stat().st_size} for p in files]

    connection.send_result(msg["id"], {"files": await hass.async_add_executor_job(scan)})


@websocket_api.websocket_command(
    {vol.Required("type"): "dashforge/media/delete", vol.Required("name"): str}
)
@websocket_api.async_response
async def ws_media_delete(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    if not user_can_edit(hass, connection.user):
        connection.send_error(msg["id"], "unauthorized", "Only administrators can change this dashboard")
        return
    name = msg["name"]
    if not NAME_RE.match(name):
        connection.send_error(msg["id"], "invalid", "Unknown picture")
        return
    path = media_dir(hass) / name
    await hass.async_add_executor_job(lambda: path.unlink(missing_ok=True))
    connection.send_result(msg["id"])
