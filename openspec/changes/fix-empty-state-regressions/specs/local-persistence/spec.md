## MODIFIED Requirements

### Requirement: Cheatsheet auto-saves to localStorage
The system SHALL automatically save the active cheatsheet to its individual localStorage key whenever the data changes, with debounced writes. A separate index key SHALL track all cheatsheet metadata. The auto-save SHALL NOT persist an empty state when no cheatsheets exist.

#### Scenario: Auto-save active cheatsheet on edit
- **WHEN** the user makes an edit (title, section, shortcut add/remove/edit)
- **THEN** the active cheatsheet is saved to its individual `cheatsheet:<id>` key after a 500ms debounce, and the index is updated

#### Scenario: Load cheatsheet list on page load
- **WHEN** the page loads
- **THEN** the index `cheatsheet:index` is read to list all saved cheatsheets; the most recently used cheatsheet is loaded

#### Scenario: Auto-save does not persist empty state
- **WHEN** the page loads and no saved cheatsheets exist
- **THEN** the auto-save SHALL NOT write to localStorage

#### Scenario: Auto-save persists after creating first cheatsheet
- **WHEN** the user creates their first cheatsheet
- **THEN** subsequent edits SHALL be saved via auto-save

### Requirement: Empty state on first visit
The system SHALL NOT persist an empty cheatsheet when no saved data exists. On first visit, the UI SHALL show a default empty cheatsheet in-memory only and SHALL NOT write to localStorage until the user explicitly creates a cheatsheet.

#### Scenario: No data written on first visit
- **WHEN** the page loads and no index exists in localStorage
- **THEN** no cheatsheet SHALL be persisted to localStorage and the user SHALL be shown an empty-state prompt

#### Scenario: First cheatsheet created explicitly
- **WHEN** the user clicks "New Cheatsheet" on the empty-state prompt
- **THEN** a new cheatsheet is created and persisted to localStorage

### Requirement: System migrates legacy single-cheatsheet data
The system SHALL detect and migrate a single cheatsheet stored under the old `cheatsheet` key on first load after the update.

#### Scenario: Legacy data migrated automatically
- **WHEN** the page loads and legacy `cheatsheet` key exists
- **THEN** the data is migrated to a new `cheatsheet:<id>` key with a generated ID, the legacy key is removed, and the index is created with one entry
