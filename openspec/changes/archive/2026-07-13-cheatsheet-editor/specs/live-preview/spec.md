## ADDED Requirements

### Requirement: Cheatsheet preview renders in real-time
The system SHALL render a live visual preview of the cheatsheet that updates automatically as the user edits.

#### Scenario: Preview updates on title change
- **WHEN** the user changes the title in the editor
- **THEN** the preview title updates immediately

#### Scenario: Preview updates on section add
- **WHEN** the user adds a new section
- **THEN** the preview shows the new section immediately

#### Scenario: Preview updates on shortcut add
- **WHEN** the user adds a new shortcut
- **THEN** the preview shows the new shortcut immediately

#### Scenario: Preview updates on delete
- **WHEN** the user removes a section or shortcut
- **THEN** the preview reflects the removal immediately

### Requirement: Preview layout is visually polished
The preview SHALL display the cheatsheet in a clean, card-based layout with sections grouped and shortcuts presented as rows or cards.

#### Scenario: Preview renders sections with headers
- **WHEN** a section exists
- **THEN** the preview shows the section name as a header followed by its shortcuts
