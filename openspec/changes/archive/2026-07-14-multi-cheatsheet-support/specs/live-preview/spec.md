## MODIFIED Requirements

### Requirement: Preview layout is visually polished
The preview SHALL display the cheatsheet in a card-based layout where each section is rendered as a card with a header and an inner table listing shortcuts as rows with keys and action columns.

#### Scenario: Preview renders sections as cards with tables
- **WHEN** a section exists
- **THEN** the preview shows the section as a card with a header containing the section name, and a table where each row shows the shortcut keys in the first column and the action in the second column

#### Scenario: Shortcut row shows edit button on hover
- **WHEN** the user hovers over a shortcut table row
- **THEN** an edit button (✎) appears in the keys column

#### Scenario: Shortcut row shows tooltip on hover
- **WHEN** the user hovers over a shortcut table row
- **THEN** the row displays a tooltip with additional context (if available) matching the design reference

### Requirement: Text does not overflow shortcut cards
The system SHALL prevent text overflow in shortcut display by applying word wrapping and `whitespace-pre-wrap` to both keys and action text in the preview table.

#### Scenario: Multi-line action text wraps inside row
- **WHEN** the action description contains newlines or exceeds the column width
- **THEN** the text wraps to the next line instead of overflowing or being truncated
