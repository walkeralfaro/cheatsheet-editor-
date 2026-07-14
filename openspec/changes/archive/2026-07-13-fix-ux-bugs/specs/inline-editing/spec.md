## MODIFIED Requirements

### Requirement: User can edit shortcuts by clicking on the preview
The system SHALL allow the user to click on a shortcut rendered in the preview to edit its keys and action inline. Pressing Enter in the keys input SHALL move focus to the action input. Pressing Enter in the action input SHALL save and close edit mode.

#### Scenario: Click shortcut in preview to edit
- **WHEN** the user clicks on a shortcut card in the preview
- **THEN** the card switches to edit mode with inline inputs for keys and action

#### Scenario: Save inline edit on blur
- **WHEN** the user edits an inline input and clicks away (blur)
- **THEN** the shortcut is updated and the card returns to display mode

#### Scenario: Enter in keys input moves to action
- **WHEN** the user presses Enter while focused on the keys input
- **THEN** focus moves to the action input (does not save)

#### Scenario: Enter in action input saves
- **WHEN** the user presses Enter while focused on the action input
- **THEN** the shortcut is updated and the card returns to display mode

#### Scenario: Cancel inline edit on Escape
- **WHEN** the user presses Escape while editing inline
- **THEN** the edit is cancelled and the card returns to display mode with original values

#### Scenario: Visual edit indicator on hover
- **WHEN** the user hovers over a shortcut card in the preview
- **THEN** the card shows a visual indicator that it is clickable (e.g., edit icon or border highlight)
