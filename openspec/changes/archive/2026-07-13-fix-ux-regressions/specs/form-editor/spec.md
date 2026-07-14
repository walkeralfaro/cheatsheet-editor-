## MODIFIED Requirements

### Requirement: Shortcut inputs have character limits
The system SHALL enforce a maximum length of 15 characters for shortcut keys and 30 characters for the action/description.

#### Scenario: Keys limited to 15 characters
- **WHEN** the user types more than 15 characters in the keys field
- **THEN** additional input is prevented

#### Scenario: Action limited to 30 characters
- **WHEN** the user types more than 30 characters in the action field
- **THEN** additional input is prevented
