## ADDED Requirements

### Requirement: Shortcut inputs have character limits
The system SHALL enforce a maximum length of 50 characters for shortcut keys and 200 characters for the action/description.

#### Scenario: Keys limited to 50 characters
- **WHEN** the user types more than 50 characters in the keys field
- **THEN** additional input is prevented

#### Scenario: Action limited to 200 characters
- **WHEN** the user types more than 200 characters in the action field
- **THEN** additional input is prevented
