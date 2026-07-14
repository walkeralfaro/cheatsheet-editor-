## ADDED Requirements

### Requirement: Cheatsheet auto-saves to localStorage
The system SHALL automatically save the cheatsheet to localStorage whenever the data changes, with debounced writes.

#### Scenario: Auto-save on edit
- **WHEN** the user makes an edit (title, section, shortcut add/remove/edit)
- **THEN** the cheatsheet is saved to localStorage after a 500ms debounce

#### Scenario: Load saved cheatsheet on page load
- **WHEN** the page loads and a saved cheatsheet exists in localStorage
- **THEN** the cheatsheet is loaded and displayed in both editor and preview

#### Scenario: Empty state on first visit
- **WHEN** the page loads and no cheatsheet exists in localStorage
- **THEN** the editor shows an empty cheatsheet with a default title

### Requirement: User can clear the cheatsheet
The system SHALL provide a way to reset the cheatsheet to empty.

#### Scenario: Clear and start fresh
- **WHEN** the user clicks "New cheatsheet"
- **THEN** the current cheatsheet is cleared, localStorage is updated, and the editor resets to empty
