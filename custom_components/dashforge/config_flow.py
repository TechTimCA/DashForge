"""Config flow for DashForge."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.config_entries import (
    ConfigEntry,
    ConfigFlow,
    ConfigFlowResult,
    OptionsFlow,
)
from homeassistant.core import callback
from homeassistant.helpers import selector

from .const import (
    CONF_REQUIRE_ADMIN_EDIT,
    CONF_SIDEBAR_ICON,
    CONF_SIDEBAR_TITLE,
    DEFAULT_REQUIRE_ADMIN_EDIT,
    DEFAULT_SIDEBAR_ICON,
    DEFAULT_SIDEBAR_TITLE,
    DOMAIN,
)


def _schema(defaults: dict[str, Any]) -> vol.Schema:
    return vol.Schema(
        {
            vol.Required(
                CONF_SIDEBAR_TITLE,
                default=defaults.get(CONF_SIDEBAR_TITLE, DEFAULT_SIDEBAR_TITLE),
            ): selector.TextSelector(),
            vol.Required(
                CONF_SIDEBAR_ICON,
                default=defaults.get(CONF_SIDEBAR_ICON, DEFAULT_SIDEBAR_ICON),
            ): selector.IconSelector(),
            vol.Required(
                CONF_REQUIRE_ADMIN_EDIT,
                default=defaults.get(CONF_REQUIRE_ADMIN_EDIT, DEFAULT_REQUIRE_ADMIN_EDIT),
            ): selector.BooleanSelector(),
        }
    )


class DashForgeConfigFlow(ConfigFlow, domain=DOMAIN):
    """Add DashForge from Settings → Devices & services."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")
        if user_input is not None:
            return self.async_create_entry(
                title="DashForge", data={}, options=user_input
            )
        return self.async_show_form(step_id="user", data_schema=_schema({}))

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> OptionsFlow:
        return DashForgeOptionsFlow()


class DashForgeOptionsFlow(OptionsFlow):
    """Change the sidebar entry and who may edit the dashboard."""

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        if user_input is not None:
            return self.async_create_entry(data=user_input)
        return self.async_show_form(
            step_id="init", data_schema=_schema(dict(self.config_entry.options))
        )
