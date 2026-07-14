## Purpose

Enable printing the cheatsheet to PDF with a clean, print-optimized layout.

## Requirements

### Requirement: User can print the cheatsheet to PDF
The system SHALL provide a print button that triggers the browser's print dialog. The printed output SHALL paginate naturally across multiple pages without using absolute positioning.

#### Scenario: Print button triggers print dialog
- **WHEN** the user clicks the "Print" button
- **THEN** the browser's native print dialog opens

#### Scenario: Print layout hides editor elements
- **WHEN** the print dialog is open
- **THEN** the editor panel, toolbar, and other UI chrome are hidden, showing only the cheatsheet preview

#### Scenario: Print uses portrait orientation
- **WHEN** the print layout is applied
- **THEN** the page uses portrait orientation by default

#### Scenario: Long content paginates across pages
- **WHEN** the cheatsheet content is longer than one page
- **THEN** it splits naturally across multiple pages

### Requirement: Print styling is visually optimized
The system SHALL apply custom print styles that make the cheatsheet look clean and professional on paper.

#### Scenario: Print has clean typography
- **WHEN** the print layout is applied
- **THEN** headings, keys, and actions use print-optimized font sizes and spacing

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
