# landing-theme Specification

## Purpose
TBD - created by archiving change landing-theme-and-routing. Update Purpose after archive.
## Requirements
### Requirement: Landing theme matches the editor
The landing page SHALL resolve its theme from `localStorage["theme"]`; if unset, from the browser's `prefers-color-scheme`; if undefined, it SHALL default to light — identical to the editor's theme resolution.

#### Scenario: Landing follows the stored theme
- **WHEN** the user toggled dark mode in the editor and later opens the landing page
- **THEN** the landing renders in dark mode

#### Scenario: Landing defaults to browser preference
- **WHEN** there is no stored theme and the browser prefers dark
- **THEN** the landing renders in dark mode; if no preference is set, it renders light

### Requirement: Landing has a theme toggle synced with the editor
The landing SHALL provide a theme toggle that persists the choice to `localStorage["theme"]` so it applies to the editor on next load.

#### Scenario: Toggling on the landing syncs the editor
- **WHEN** the user toggles the theme on the landing page
- **THEN** the choice is stored in `localStorage["theme"]` and the editor uses it on next load

