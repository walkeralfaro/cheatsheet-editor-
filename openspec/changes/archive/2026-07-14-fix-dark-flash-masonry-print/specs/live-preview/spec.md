## ADDED Requirements

### Requirement: Sections arrange in masonry layout
The system SHALL arrange the section cards in a 2-column masonry layout where each card has its own height independent of its column neighbor. The layout SHALL use CSS Columns (not CSS Grid) to achieve this behavior.

#### Scenario: Cards have independent heights
- **WHEN** two section cards in the same row have different amounts of content
- **THEN** each card SHALL display at its natural height, not stretched to match the taller card

#### Scenario: Cards do not split across columns
- **WHEN** a section card is taller than a column break point
- **THEN** the card SHALL remain whole and move entirely to the next column

#### Scenario: Columns adapt on narrow screens
- **WHEN** the viewport is narrower than the `md` breakpoint (768px)
- **THEN** sections SHALL display in a single column
