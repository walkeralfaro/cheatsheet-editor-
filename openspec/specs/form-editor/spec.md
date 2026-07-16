## Purpose

Provide a visual form-based editor for creating and managing cheatsheets without exposing raw JSON.

## Requirements

### Requirement: User can create a cheatsheet via visual form
The system SHALL provide a visual form-based editor for creating a cheatsheet. The editor SHALL NOT expose raw JSON to the user.

#### Scenario: Add a title
- **WHEN** the user types in the title input field
- **THEN** the title is updated in the cheatsheet data model

#### Scenario: Add a section
- **WHEN** the user clicks "Add section" and enters a section name
- **THEN** a new section is added to the cheatsheet with the given name

#### Scenario: Add a shortcut to a section
- **WHEN** the user fills in keys and action in the add-shortcut form and submits
- **THEN** the shortcut is added to the currently selected section

#### Scenario: Remove a section
- **WHEN** the user clicks delete on a section
- **THEN** the section and all its shortcuts are removed

#### Scenario: Remove a shortcut
- **WHEN** the user clicks delete on a shortcut
- **THEN** the shortcut is removed from its section

### Requirement: Sections are collapsible
The system SHALL display sections as collapsible panels in the editor.

#### Scenario: Collapse a section
- **WHEN** the user clicks the collapse toggle on a section
- **THEN** the section's shortcuts are hidden

### Requirement: Shortcut creation requires an active section
The system SHALL only allow shortcut creation when a section is selected. If no section is active, the add-shortcut form SHALL be hidden and a guidance message SHALL be shown.

#### Scenario: Form hidden when no section selected
- **WHEN** the user has not selected any section
- **THEN** the add-shortcut form is not displayed

#### Scenario: Guidance shown when no section selected
- **WHEN** the user has not selected any section
- **THEN** a message reads "Select a section to add shortcuts"

#### Scenario: Form shown when a section is active
- **WHEN** the user selects a section
- **THEN** the add-shortcut form appears for that section

### Requirement: Removing active section clears selection
The system SHALL reset the active section to none when the currently selected section is removed.

#### Scenario: Remove active section
- **WHEN** the user removes the section that is currently active
- **THEN** the active section is cleared and the add-shortcut form is hidden

### Requirement: Shortcut inputs have character limits
The system SHALL enforce a maximum length of 15 characters for shortcut keys and 30 characters for the action/description.

#### Scenario: Keys limited to 15 characters
- **WHEN** the user types more than 15 characters in the keys field
- **THEN** additional input is prevented

#### Scenario: Action limited to 30 characters
- **WHEN** the user types more than 30 characters in the action field
- **THEN** additional input is prevented

### Requirement: Action input supports multi-line text
The system SHALL use a `<textarea>` element for the action input in the add-shortcut form to allow multi-line action descriptions.

#### Scenario: Action input is multi-line
- **WHEN** the user types in the action field
- **THEN** the input SHALL accept newlines and display multiple lines of text

#### Scenario: Action textarea shows placeholder
- **WHEN** the action field is empty
- **THEN** a placeholder "e.g. Copy" is shown

### Requirement: User can rename a section
The system SHALL allow the user to rename a section from the editor's section list via an inline edit control.

#### Scenario: Rename a section
- **WHEN** the user activates the rename control on a section and submits a new name
- **THEN** the section name is updated and persisted

#### Scenario: Empty rename is ignored
- **WHEN** the user submits an empty or whitespace-only name
- **THEN** the section name is unchanged

### Requirement: User can reorder sections via drag-and-drop
The system SHALL allow the user to reorder sections in the editor by dragging, using a dedicated drag handle. The new order SHALL be persisted and reflected in the live preview.

#### Scenario: Reorder sections
- **WHEN** the user drags a section to a new position using its drag handle
- **THEN** the section order changes in the editor and the live preview shows the same order

#### Scenario: Reorder keeps section identity
- **WHEN** the user reorders sections
- **THEN** each section retains its existing id and shortcuts, and the active section selection remains valid
