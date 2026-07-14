## MODIFIED Requirements

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
