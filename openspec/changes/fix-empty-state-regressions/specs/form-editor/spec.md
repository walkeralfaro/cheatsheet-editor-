## ADDED Requirements

### Requirement: Empty state shows new-cheatsheet prompt
The system SHALL display a "Create your first cheatsheet" prompt when no saved cheatsheets exist. The prompt SHALL contain a single action button that creates a new cheatsheet.

#### Scenario: Show empty-state prompt on first visit
- **WHEN** the page loads and no saved cheatsheets exist in localStorage
- **THEN** the editor panel is replaced with a centered message reading "Create your first cheatsheet" and a "New Cheatsheet" button

#### Scenario: New cheatsheet created from empty-state prompt
- **WHEN** the user clicks "New Cheatsheet" on the empty-state prompt
- **THEN** a new cheatsheet is created and the editor panel appears with the new cheatsheet loaded

#### Scenario: Editor preserved when cheatsheets exist
- **WHEN** at least one saved cheatsheet exists
- **THEN** the editor panel is displayed as normal, even if the active cheatsheet has no sections
