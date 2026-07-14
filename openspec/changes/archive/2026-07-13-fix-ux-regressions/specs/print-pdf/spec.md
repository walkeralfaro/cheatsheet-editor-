## MODIFIED Requirements

### Requirement: User can print the cheatsheet to PDF
The system SHALL provide a print button that triggers the browser's print dialog. The printed output SHALL paginate naturally across multiple pages without using absolute positioning.

#### Scenario: Print button triggers print dialog
- **WHEN** the user clicks the "Print" button
- **THEN** the browser's native print dialog opens

#### Scenario: Print layout hides editor elements
- **WHEN** the print dialog is open
- **THEN** the editor panel, toolbar, and other UI chrome are hidden, showing only the cheatsheet preview

#### Scenario: Print uses landscape orientation
- **WHEN** the print layout is applied
- **THEN** the page uses landscape orientation by default

#### Scenario: Long content paginates across pages
- **WHEN** the cheatsheet content exceeds one page
- **THEN** it splits naturally across multiple pages

### Requirement: Print styling is visually optimized
The system SHALL apply custom print styles that make the cheatsheet look clean and professional on paper.

#### Scenario: Print has clean typography
- **WHEN** the print layout is applied
- **THEN** headings, keys, and actions use print-optimized font sizes and spacing
