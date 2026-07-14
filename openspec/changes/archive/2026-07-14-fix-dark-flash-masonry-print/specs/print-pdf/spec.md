## ADDED Requirements

### Requirement: Print preserves screen column order
The printed output SHALL use the same 2-column CSS Columns layout as the screen preview, so section cards appear in the same visual order on paper as they do on screen.

#### Scenario: Print matches screen layout
- **WHEN** the user prints the cheatsheet
- **THEN** the section cards SHALL be arranged in 2 columns matching the screen's masonry order

#### Scenario: Cards do not break across print columns
- **WHEN** a section card spans a print column boundary
- **THEN** the card SHALL avoid being split and SHALL move entirely to the next column
