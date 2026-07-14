## ADDED Requirements

### Requirement: Action textarea auto-resizes to content height

The action textarea in ShortcutCard SHALL dynamically resize its height to match the content, both when entering edit mode and while the user types.

#### Scenario: Textarea matches content height on activation
- **WHEN** the user clicks to edit the action field
- **THEN** the textarea SHALL immediately resize to the height of the existing text content

#### Scenario: Textarea resizes while typing
- **WHEN** the user types or deletes text in the action textarea
- **THEN** the textarea SHALL resize to match the new content height after each keystroke
