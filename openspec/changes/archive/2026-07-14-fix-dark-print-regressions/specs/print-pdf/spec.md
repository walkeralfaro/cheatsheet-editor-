## MODIFIED Requirements

### Requirement: Print uses compact 2-column layout
The system SHALL render the cheatsheet content in two columns when printing. Text SHALL not overflow by using word-break and auto table layout.

#### Scenario: Print 2-column prevents overflow
- **WHEN** the print dialog is open
- **THEN** table cells use word-break and auto layout to prevent text overflow in narrow columns
