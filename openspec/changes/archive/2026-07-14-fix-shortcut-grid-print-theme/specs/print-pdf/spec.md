## MODIFIED Requirements

### Requirement: Print preserves screen column order
The printed output SHALL use the same 2-column row-major layout as the screen preview, matching the section order by ID. The printed output SHALL render the current theme (dark or light) colors, including background colors.

#### Scenario: Print matches screen row-major layout
- **WHEN** the user prints the cheatsheet
- **THEN** the section cards SHALL be arranged in 2 columns in row-major order, matching the screen's grid layout

#### Scenario: Cards do not break across print columns
- **WHEN** a section card spans a print column boundary
- **THEN** the card SHALL avoid being split and SHALL move entirely to the next column

#### Scenario: Print preserves dark theme colors
- **WHEN** the user prints while dark mode is active
- **THEN** the printed output SHALL render dark background colors (not stripped by the browser)
