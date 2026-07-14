## MODIFIED Requirements

### Requirement: User can edit shortcuts by clicking on the preview
The system SHALL allow the user to click on a shortcut rendered in the preview to edit its keys and action inline. The action input SHALL be a multi-line `<textarea>`. The save-on-blur mechanism SHALL only trigger from the action input, allowing the user to freely navigate between both fields.

#### Scenario: Click shortcut in preview to edit
- **WHEN** the user clicks on a shortcut row in the preview table
- **THEN** the row switches to edit mode with inline inputs for keys (single-line) and action (multi-line textarea)

#### Scenario: Save inline edit on blur from action input
- **WHEN** the user edits the action textarea and clicks away (blur)
- **THEN** the shortcut is updated and the row returns to display mode

#### Scenario: Blur from keys input does not save
- **WHEN** the user edits the keys input and clicks away (blur)
- **THEN** the edit remains open and no save occurs

#### Scenario: Enter in keys input moves to action
- **WHEN** the user presses Enter while focused on the keys input
- **THEN** focus moves to the action textarea (does not save)

#### Scenario: Enter in action input saves
- **WHEN** the user presses Enter while focused on the action textarea
- **THEN** the shortcut is updated and the row returns to display mode

#### Scenario: Cancel inline edit on Escape
- **WHEN** the user presses Escape while editing inline
- **THEN** the edit is cancelled and the row returns to display mode with original values

#### Scenario: Multi-line action text displays in preview
- **WHEN** the action contains newlines
- **THEN** the preview row displays the action text with line breaks preserved using `whitespace-pre-wrap`
