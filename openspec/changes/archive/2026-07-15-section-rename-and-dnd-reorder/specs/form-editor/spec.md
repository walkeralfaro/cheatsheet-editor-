## ADDED Requirements

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
