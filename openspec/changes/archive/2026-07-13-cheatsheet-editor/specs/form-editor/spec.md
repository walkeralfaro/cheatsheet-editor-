## ADDED Requirements

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
