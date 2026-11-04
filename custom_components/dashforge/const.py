"""Constants for DashForge."""

from __future__ import annotations

from pathlib import Path
from typing import Final

DOMAIN: Final = "dashforge"
VERSION: Final = "0.2.0"

PANEL_URL_PATH: Final = "dashforge"
PANEL_COMPONENT: Final = "dashforge-panel"
PANEL_FILENAME: Final = "dashforge-panel.js"

STATIC_URL_BASE: Final = "/dashforge_static"
FRONTEND_DIR: Final = Path(__file__).parent / "frontend"

STORAGE_KEY: Final = "dashforge.config"
STORAGE_VERSION: Final = 1

# Hard ceiling on the size of a saved dashboard, to protect the storage file.
MAX_CONFIG_BYTES: Final = 2_000_000

CONF_SIDEBAR_TITLE: Final = "sidebar_title"
CONF_SIDEBAR_ICON: Final = "sidebar_icon"
CONF_REQUIRE_ADMIN_EDIT: Final = "require_admin_edit"

DEFAULT_SIDEBAR_TITLE: Final = "DashForge"
DEFAULT_SIDEBAR_ICON: Final = "mdi:view-dashboard-variant"
DEFAULT_REQUIRE_ADMIN_EDIT: Final = True

SIGNAL_CONFIG_UPDATED: Final = f"{DOMAIN}_config_updated"
DATA_STATIC_REGISTERED: Final = f"{DOMAIN}_static_registered"
DATA_WS_REGISTERED: Final = f"{DOMAIN}_ws_registered"
