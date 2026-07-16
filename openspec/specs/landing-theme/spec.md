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
The landing and the editor SHALL each provide a theme toggle that reads and persists the choice to `localStorage["theme"]`, and the editor SHALL initialize its theme state from `localStorage["theme"]` (falling back to `prefers-color-scheme`, then light) so both toggles remain in sync.

#### Scenario: Toggling on the landing syncs the editor
- **WHEN** the user toggles the theme on the landing page
- **THEN** the choice is stored in `localStorage["theme"]` and the editor uses it on next load

#### Scenario: Editor toggle reads the actual applied theme
- **WHEN** the theme was last changed on the landing (or via OS preference) and the user opens the editor
- **THEN** the editor's toolbar icon reflects the actual applied theme and the first editor toggle changes the theme correctly (no no-op)

#### Scenario: Editor and landing agree after any toggle
- **WHEN** the user toggles the theme in either the editor or the landing
- **THEN** the resulting `localStorage["theme"]` value and the applied `.dark` class are identical, so the other surface adopts the same theme on next load

