## Purpose

Automatically persist cheatsheets to localStorage and load them on return via a single persisted store key, with a one-time migration of legacy multi-key data.

## Requirements

### Requirement: Cheatsheet auto-saves to localStorage
The system SHALL automatically persist all cheatsheets and the active cheatsheet id to a single localStorage key (`cheatsheet-store`) via the zustand `persist` middleware whenever state changes. Transient UI state (sidebar open, editor visible, active section) SHALL NOT be persisted.

#### Scenario: Auto-save on edit
- **WHEN** the user makes an edit (title, section, shortcut add/remove/edit) or switches cheatsheets
- **THEN** the updated `cheatsheets` map, `list`, `activeId`, and `darkMode` are written to the `cheatsheet-store` key in localStorage

#### Scenario: Load cheatsheet list on page load
- **WHEN** the page loads
- **THEN** the `cheatsheet-store` key is rehydrated to restore the list, all cheatsheets, the last active id, and the dark-mode preference

#### Scenario: Empty state on first visit
- **WHEN** the page loads and no `cheatsheet-store` key exists and no legacy data exists
- **THEN** an empty state is shown and a default cheatsheet is created on first user action

### Requirement: System migrates legacy multi-key data
The system SHALL detect and migrate cheatsheets stored under the legacy layout (the single `cheatsheet` key and/or the `cheatsheet:index` + `cheatsheet:<id>` keys) into the new `cheatsheet-store` on first load, before the `persist` middleware takes over.

#### Scenario: Legacy data migrated automatically
- **WHEN** the page loads, `cheatsheet-store` does not exist, and legacy `cheatsheet` or `cheatsheet:index` keys exist
- **THEN** all legacy cheatsheets are read, assigned stable ids, loaded into the store's `cheatsheets` map and `list`, the legacy keys are removed, and the store is rehydrated with the migrated data
