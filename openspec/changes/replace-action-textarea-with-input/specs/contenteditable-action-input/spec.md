## ADDED Requirements

### Requirement: Action field uses contenteditable div

The action inline editor SHALL use a `<div contenteditable="true">` styled as a standard input, replacing the previous `<textarea>`. The div SHALL support multi-line text (Shift+Enter for newline), auto-grow to content height, and save on Enter or blur.

#### Scenario: Action field is contenteditable div
- **WHEN** the user clicks on the action portion of a shortcut row
- **THEN** the edit field SHALL be a `<div contenteditable="true">` styled to match the keys input

#### Scenario: Enter saves action
- **WHEN** the user presses Enter while editing the action field
- **THEN** the action is saved and the field returns to display mode

#### Scenario: Shift+Enter inserts newline
- **WHEN** the user presses Shift+Enter while editing the action field
- **THEN** a newline is inserted into the action text

#### Scenario: Contenteditable div auto-grows
- **WHEN** the user types or inserts newlines in the action field
- **THEN** the div SHALL auto-grow its height to match the content

#### Scenario: MaxLength enforced on input
- **WHEN** the action text exceeds 30 characters
- **THEN** the text SHALL be truncated to 30 characters
