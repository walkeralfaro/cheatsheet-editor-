## Purpose

Provide a real-time rendered preview of the cheatsheet that updates automatically on every edit.

## Requirements

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

### Requirement: Sections arrange in masonry layout
The system SHALL arrange the section cards in a 2-column row-major layout (left-to-right, top-to-bottom) where each card has its own height independent of its column neighbor. The layout SHALL use CSS Grid with `items-start` to achieve row-major ordering while preserving independent heights.

#### Scenario: Cards have independent heights
- **WHEN** two section cards in the same row have different amounts of content
- **THEN** each card SHALL display at its natural height, not stretched to match the taller card

#### Scenario: Cards ordered by creation order
- **WHEN** sections are displayed
- **THEN** sections SHALL appear in row-major order (left-to-right, top-to-bottom) matching their creation order (ascending ID)

#### Scenario: Columns adapt on narrow screens
- **WHEN** the viewport is narrower than the `md` breakpoint (768px)
- **THEN** sections SHALL display in a single column
