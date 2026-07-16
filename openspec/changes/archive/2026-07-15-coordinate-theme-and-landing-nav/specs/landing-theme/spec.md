## MODIFIED Requirements

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
