## Purpose

Automatically persist cheatsheets to localStorage and load them on return, with debounced saves, per-cheatsheet keys, and an index for managing multiple cheatsheets.

## Requirements

### Requirement: Cheatsheet auto-saves to localStorage
The system SHALL automatically save the active cheatsheet to its individual localStorage key whenever the data changes, with debounced writes. A separate index key SHALL track all cheatsheet metadata.

#### Scenario: Auto-save active cheatsheet on edit
- **WHEN** the user makes an edit (title, section, shortcut add/remove/edit)
- **THEN** the active cheatsheet is saved to its individual `cheatsheet:<id>` key after a 500ms debounce, and the index is updated

#### Scenario: Load cheatsheet list on page load
- **WHEN** the page loads
- **THEN** the index `cheatsheet:index` is read to list all saved cheatsheets; the most recently used cheatsheet is loaded

#### Scenario: Empty state on first visit
- **WHEN** the page loads and no index exists in localStorage
- **THEN** a default empty cheatsheet is created and added to a new index

### Requirement: System migrates legacy single-cheatsheet data
The system SHALL detect and migrate a single cheatsheet stored under the old `cheatsheet` key on first load after the update.

#### Scenario: Legacy data migrated automatically
- **WHEN** the page loads and legacy `cheatsheet` key exists
- **THEN** the data is migrated to a new `cheatsheet:<id>` key with a generated ID, the legacy key is removed, and the index is created with one entry
