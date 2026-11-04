"""Persistent storage for the DashForge dashboard configuration."""

from __future__ import annotations

import json
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.storage import Store

from .const import (
    MAX_CONFIG_BYTES,
    SIGNAL_CONFIG_UPDATED,
    STORAGE_KEY,
    STORAGE_VERSION,
)


class RevisionConflict(Exception):
    """Raised when a save is based on an outdated revision."""


class ConfigTooLarge(Exception):
    """Raised when a dashboard is bigger than the storage limit."""


class DashForgeStore:
    """Holds the dashboard configuration, shared by every browser and tablet.

    Only interface choices live here (rooms, cards, layout, theme). States,
    history, tokens and passwords are never stored.
    """

    def __init__(self, hass: HomeAssistant) -> None:
        self._hass = hass
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self.config: dict[str, Any] | None = None
        self.revision: int = 0

    async def async_load(self) -> None:
        data = await self._store.async_load()
        if isinstance(data, dict):
            config = data.get("config")
            self.config = config if isinstance(config, dict) else None
            self.revision = int(data.get("revision", 0))

    def as_dict(self) -> dict[str, Any]:
        return {"config": self.config, "revision": self.revision}

    async def async_save(
        self, config: dict[str, Any] | None, base_revision: int | None
    ) -> int:
        """Save a new configuration and notify every open dashboard."""
        if base_revision is not None and base_revision != self.revision:
            raise RevisionConflict
        if config is not None:
            size = len(json.dumps(config, separators=(",", ":")).encode())
            if size > MAX_CONFIG_BYTES:
                raise ConfigTooLarge
        self.config = config
        self.revision += 1
        await self._store.async_save(self.as_dict())
        async_dispatcher_send(self._hass, SIGNAL_CONFIG_UPDATED, self.as_dict())
        return self.revision

    async def async_remove(self) -> None:
        await self._store.async_remove()
