## MODIFIED Requirements

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
