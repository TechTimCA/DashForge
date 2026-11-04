# DashForge

**A free, open-source dashboard for Home Assistant that you build your way.**

DashForge adds a beautiful, touch-friendly dashboard to your Home Assistant sidebar. A step-by-step setup wizard asks you about your rooms, devices, layout and look, so nothing is decided for you, and every choice can be changed afterwards. There are no paid tiers, no device limits, no license keys and no cloud.

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=TechTimCA&repository=DashForge&category=integration)

## Features

Everything is included, for everyone, with no limits on rooms or devices.

**Setup wizard**
- Ten short steps: welcome, rooms, devices, scenes and media, header widgets, layout, look and feel, pages, wall tablet, review.
- Your Home Assistant areas and their devices are offered as suggestions you confirm, untick or rearrange. Rooms without an area and devices from anywhere can be added too.
- Run it again at any time from Settings.

**Four layouts**: Grid, Sidebar, List and Focus. Every screen follows the one you pick.

**Edit mode**
- Drag cards to reorder, tap − to hide, tap ↔ to cycle the size, tap a card to rename it, change its icon or move it to another room.
- Add any device to any room or page, create rooms and custom pages, reorder them.
- Nothing is ever deleted from Home Assistant.

**Cards that do the right thing**
- Lights (brightness, colour temperature, colour, effects), switches, fans (speed, oscillation, presets), blinds and covers (open/stop/close, position, tilt), valves.
- Climate ring with − / + and modes, presets and fan modes.
- Media players with artwork, transport controls, volume and sources. Works with Spotify, Sonos, Cast and anything else Home Assistant supports.
- Locks (unlocking asks for confirmation), alarm panels with code entry, cameras with live snapshots, vacuums, numbers, selects, scenes, scripts and buttons.
- Sensors with a 24-hour history chart.
- Four card sizes: small, medium, large and wide.
- Tap to use, press and hold for details.

**Header and widgets**
- Greeting, date and clock (12 or 24 hours).
- Weather from any Home Assistant weather entity, with hourly and 7-day forecasts. Optional Open-Meteo fallback.
- Calendar with upcoming events and a full month view.
- Reminders from Home Assistant to-do lists: add, tick off, untick.
- One-tap scene strip, and a now-playing chip for your main media player.

**Built-in pages**: Media, Security (locks, alarm, cameras, doors, windows, motion) and Scenes, plus your own pages for anything.

**Look and feel**: light, dark or match Home Assistant; any accent colour; six background presets or your own image; frosted-glass or solid cards; adjustable corner roundness; comfortable or compact spacing.

**Wall tablets**
- Screensaver with a drifting clock, weather and next event, a dim clock, or a black screen.
- Return to the first room after a while.
- Option to hide the Home Assistant sidebar. Add `?menu` to the address to keep it on one device.

**Everything stays in sync**: change the dashboard on one device and every open tablet and phone updates instantly.

**Backup**: export your dashboard to a file and import it again, on the same or another Home Assistant.

## Install

### With HACS (recommended)

1. In Home Assistant, open **HACS**.
2. From the **⋮** menu choose **Custom repositories**, add `https://github.com/TechTimCA/DashForge` with the type **Integration**.
3. Search for **DashForge**, open it and choose **Download**.
4. Restart Home Assistant.
5. Go to **Settings → Devices & services → Add integration** and add **DashForge**.
6. Open **DashForge** from the sidebar and follow the setup wizard.

### Manual

1. Download `dashforge.zip` from the [latest release](https://github.com/TechTimCA/DashForge/releases/latest).
2. Extract it into `config/custom_components/dashforge`.
3. Restart Home Assistant and add the integration as in step 5 above.

Requires Home Assistant 2024.12 or newer. Works on Home Assistant OS, Supervised, Container and Core.

## Options

Under **Settings → Devices & services → DashForge → Configure** you can change:

- **Sidebar title** and **icon**.
- **Only administrators can edit the dashboard** (on by default). Turn it off if a non-admin account on a wall tablet should be able to edit.

## Privacy

DashForge stores only your dashboard design (rooms, cards, layout, theme) in `.storage/dashforge.config`. States, history, camera images, passwords and tokens are never stored by DashForge. The dashboard talks only to your own Home Assistant. The one exception is the optional Open-Meteo weather fallback, which you have to turn on yourself; it sends your home's latitude and longitude to api.open-meteo.com.

## Troubleshooting

- **The old version still shows after updating**: do a full browser refresh (`Ctrl + Shift + R`, or `Cmd + Shift + R` on macOS). On the companion app, pull down to refresh or clear the frontend cache.
- **No forecast**: pick a weather entity that provides forecasts in **Settings → Header & widgets**.
- **Press and hold doesn't open details**: keep your finger on the card body, not on a button or slider.
- **“Only administrators can change this dashboard”**: either sign in as an administrator or turn off the admin-only option described above.

## Development

```bash
cd frontend
npm install
npm run build      # typecheck and build
npm run dev        # rebuild on every change
```

The build writes `custom_components/dashforge/frontend/dashforge-panel.js`, which is committed so HACS installs work without a build step. CI checks that the committed bundle matches the source.

The frontend is written in TypeScript with [Preact](https://preactjs.com/) and [Vite](https://vitejs.dev/), and renders inside its own shadow DOM so it never clashes with Home Assistant's styles. The integration in `custom_components/dashforge` registers the sidebar panel, stores the dashboard and provides a small websocket API (`dashforge/info`, `dashforge/config/get`, `dashforge/config/save`, `dashforge/config/subscribe`).

Contributions, bug reports and translations are welcome. Please open an [issue](https://github.com/TechTimCA/DashForge/issues) or a pull request.

## License

[MIT](LICENSE). Free to use, change and share.

DashForge is an independent project and is not affiliated with Home Assistant, Nabu Casa or the Open Home Foundation.
