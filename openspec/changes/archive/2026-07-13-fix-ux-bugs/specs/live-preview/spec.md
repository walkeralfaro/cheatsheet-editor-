## ADDED Requirements

### Requirement: Text does not overflow shortcut cards
The system SHALL prevent text overflow in shortcut cards by applying word wrapping to both keys and action text.

#### Scenario: Long action text wraps inside card
- **WHEN** the action description exceeds the card width
- **THEN** the text wraps to the next line instead of overflowing
