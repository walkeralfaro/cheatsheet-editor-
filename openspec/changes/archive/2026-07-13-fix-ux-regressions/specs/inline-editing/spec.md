## MODIFIED Requirements

### Requirement: User can edit shortcuts by clicking on the preview
The system SHALL allow the user to click on a shortcut rendered in the preview to edit its keys and action inline. The save-on-blur mechanism SHALL only trigger from the action input, allowing the user to freely navigate between both fields.

#### Scenario: Click shortcut in preview to edit
- **WHEN** the user clicks on a shortcut card in the preview
- **THEN** the card switches to edit mode with inline inputs for keys and action

#### Scenario: Save inline edit on blur from action input
- **WHEN** the user clicks away from the action input (blur)
- **THEN** the shortcut is updated and the card returns to display mode

#### Scenario: Blur from keys input does not save
- **WHEN** the user clicks away from the keys input
- **THEN** the edit mode remains open and no save occurs

#### Scenario: Enter in keys input moves to action
- **WHEN** the user presses Enter while focused on the keys input
- **THEN** focus moves to the action input

#### Scenario: Enter in action input saves
- **WHEN** the user presses Enter while focused on the action input
- **THEN** the shortcut is updated and the card returns to display mode

#### Scenario: Cancel inline edit on Escape
- **WHEN** the user presses Escape while editing inline
- **THEN** the edit is cancelled and the card returns to display mode with original values
