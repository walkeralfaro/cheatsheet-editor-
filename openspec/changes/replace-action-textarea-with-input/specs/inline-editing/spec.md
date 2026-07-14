## MODIFIED Requirements

### Requirement: User can edit shortcuts by clicking on the preview
The system SHALL allow the user to click on a shortcut rendered in the preview to edit its keys and action inline. The action input SHALL be a `<div contenteditable="true">` styled as a standard input, supporting multi-line text via Shift+Enter. Keys and action SHALL be independently editable — clicking keys only edits keys, clicking action only edits action. Each field SHALL save on blur independently.

#### Scenario: Click keys to edit keys independently
- **WHEN** the user clicks on the keys portion of a shortcut row
- **THEN** only the keys input enters edit mode (action remains in display mode)

#### Scenario: Click action to edit action independently
- **WHEN** the user clicks on the action portion of a shortcut row
- **THEN** only the action field enters edit mode (keys remain in display mode)

#### Scenario: Save keys on blur
- **WHEN** the user edits the keys input and clicks away (blur)
- **THEN** the keys are saved and the field returns to display mode

#### Scenario: Save action on blur
- **WHEN** the user edits the action field and clicks away (blur)
- **THEN** the action is saved and the field returns to display mode

#### Scenario: Cancel inline edit on Escape
- **WHEN** the user presses Escape while editing inline
- **THEN** the edit is cancelled and the field returns to display mode with original values

#### Scenario: Multi-line action text displays in preview
- **WHEN** the action contains newlines
- **THEN** the preview row displays the action text with line breaks preserved using `whitespace-pre-wrap`
