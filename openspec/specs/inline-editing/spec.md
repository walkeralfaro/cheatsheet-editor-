## Purpose

Allow users to edit shortcuts directly in the preview by clicking on them, with keyboard and blur-based save/cancel.

## Requirements

### Requirement: User can edit shortcuts by clicking on the preview
The system SHALL allow the user to click on a shortcut rendered in the preview to edit its keys and action inline. The action input SHALL be a multi-line `<textarea>` with auto-resize to content height and cursor positioned at end on activation. Keys and action SHALL be independently editable — clicking keys only edits keys, clicking action only edits action. Each field SHALL save on blur independently.

#### Scenario: Click keys to edit keys independently
- **WHEN** the user clicks on the keys portion of a shortcut row
- **THEN** only the keys input enters edit mode (action remains in display mode)

#### Scenario: Click action to edit action independently
- **WHEN** the user clicks on the action portion of a shortcut row
- **THEN** only the action textarea enters edit mode (keys remain in display mode)

#### Scenario: Cursor at end on activation
- **WHEN** the action textarea enters edit mode
- **THEN** the cursor SHALL be positioned at the end of the existing text

#### Scenario: Textarea auto-resizes to content
- **WHEN** the action textarea content changes
- **THEN** the textarea SHALL resize its height to match the content

#### Scenario: Enter saves, Shift+Enter inserts newline
- **WHEN** the user presses Enter without Shift while editing the action
- **THEN** the action SHALL be saved and the field returns to display mode
- **WHEN** the user presses Shift+Enter while editing the action
- **THEN** a newline SHALL be inserted into the text

#### Scenario: Save keys on blur
- **WHEN** the user edits the keys input and clicks away (blur)
- **THEN** the keys are saved and the field returns to display mode

#### Scenario: Save action on blur
- **WHEN** the user edits the action textarea and clicks away (blur)
- **THEN** the action is saved and the field returns to display mode

#### Scenario: Cancel inline edit on Escape
- **WHEN** the user presses Escape while editing inline
- **THEN** the edit is cancelled and the field returns to display mode with original values

#### Scenario: Multi-line action text displays in preview
- **WHEN** the action contains newlines
- **THEN** the preview row displays the action text with line breaks preserved using `whitespace-pre-wrap`

#### Scenario: MaxLength enforced
- **WHEN** the user types more than 30 characters in the action textarea
- **THEN** additional input is prevented
