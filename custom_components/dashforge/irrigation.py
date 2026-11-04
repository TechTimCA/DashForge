"""Irrigation zone timers that run inside Home Assistant.

The dashboard only asks for a run; Home Assistant turns the zone off when the
time is up. A tablet that sleeps, reloads or loses Wi-Fi can never leave the
water running.
"""

from __future__ import annotations

from collections.abc import Callable
from datetime import timedelta
import logging
from typing import Any

from homeassistant.const import EVENT_HOMEASSISTANT_STOP
from homeassistant.core import CALLBACK_TYPE, Event, HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.event import async_call_later
from homeassistant.util import dt as dt_util

from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)

SIGNAL_IRRIGATION_UPDATED = f"{DOMAIN}_irrigation_updated"
MAX_MINUTES = 240
ZONE_DOMAINS = ("switch", "valve", "input_boolean", "light", "fan")


def zone_domain_ok(entity_id: str) -> bool:
    return entity_id.split(".", 1)[0] in ZONE_DOMAINS


class IrrigationController:
    """Runs one zone at a time; extra zones wait in a queue."""

    def __init__(self, hass: HomeAssistant) -> None:
        self._hass = hass
        self.active: dict[str, Any] | None = None
        self.queue: list[dict[str, Any]] = []
        self._cancel_timer: CALLBACK_TYPE | None = None
        self._unsub_stop: Callable[[], None] | None = hass.bus.async_listen_once(
            EVENT_HOMEASSISTANT_STOP, self._async_on_stop
        )

    # ---------- public ----------

    def status(self) -> dict[str, Any]:
        return {
            "active": self.active,
            "queue": [q["entity_id"] for q in self.queue],
            "queue_minutes": [q["minutes"] for q in self.queue],
        }

    async def async_run(self, entity_ids: list[str], minutes: float) -> None:
        """Run zones one after another for `minutes` each, replacing any current run."""
        minutes = max(0.1, min(float(minutes), MAX_MINUTES))
        zones = [e for e in entity_ids if zone_domain_ok(e)]
        if not zones:
            return
        await self.async_stop(notify=False)
        self.queue = [{"entity_id": e, "minutes": minutes} for e in zones]
        await self._async_next()

    async def async_stop(self, notify: bool = True) -> None:
        self.queue = []
        if self._cancel_timer:
            self._cancel_timer()
            self._cancel_timer = None
        if self.active:
            await self._async_switch(self.active["entity_id"], False)
            self.active = None
        if notify:
            self._notify()

    async def async_skip(self) -> None:
        """Stop the current zone and move on to the next one."""
        if self._cancel_timer:
            self._cancel_timer()
            self._cancel_timer = None
        if self.active:
            await self._async_switch(self.active["entity_id"], False)
            self.active = None
        await self._async_next()

    @callback
    def async_shutdown(self) -> None:
        if self._unsub_stop:
            self._unsub_stop()
            self._unsub_stop = None
        if self._cancel_timer:
            self._cancel_timer()
            self._cancel_timer = None
        if self.active:
            # Never leave water running when the integration unloads.
            self._hass.async_create_task(self._async_switch(self.active["entity_id"], False))
            self.active = None
        self.queue = []

    # ---------- internal ----------

    async def _async_next(self) -> None:
        if not self.queue:
            self.active = None
            self._notify()
            return
        job = self.queue.pop(0)
        entity_id = job["entity_id"]
        if not await self._async_switch(entity_id, True):
            await self._async_next()
            return
        now = dt_util.utcnow()
        ends = now + timedelta(minutes=job["minutes"])
        self.active = {
            "entity_id": entity_id,
            "started_at": now.isoformat(),
            "ends_at": ends.isoformat(),
            "minutes": job["minutes"],
        }
        self._cancel_timer = async_call_later(
            self._hass, job["minutes"] * 60, self._async_timer_done
        )
        self._notify()

    async def _async_timer_done(self, _now: Any) -> None:
        self._cancel_timer = None
        if self.active:
            await self._async_switch(self.active["entity_id"], False)
            self.active = None
        await self._async_next()

    async def _async_switch(self, entity_id: str, on: bool) -> bool:
        domain = entity_id.split(".", 1)[0]
        if domain == "valve":
            service_domain, service = "valve", "open_valve" if on else "close_valve"
        else:
            service_domain, service = "homeassistant", "turn_on" if on else "turn_off"
        try:
            await self._hass.services.async_call(
                service_domain, service, {"entity_id": entity_id}, blocking=True
            )
        except Exception:  # noqa: BLE001 - a missing or broken zone must not stop the program
            _LOGGER.exception("Could not %s irrigation zone %s", "start" if on else "stop", entity_id)
            return False
        return True

    async def _async_on_stop(self, _event: Event) -> None:
        self._unsub_stop = None
        if self.active:
            await self._async_switch(self.active["entity_id"], False)
            self.active = None

    @callback
    def _notify(self) -> None:
        async_dispatcher_send(self._hass, SIGNAL_IRRIGATION_UPDATED, self.status())
