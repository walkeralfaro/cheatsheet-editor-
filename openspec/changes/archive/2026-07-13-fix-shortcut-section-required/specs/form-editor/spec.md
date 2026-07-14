## ADDED Requirements

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
