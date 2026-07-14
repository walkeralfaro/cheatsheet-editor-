## ADDED Requirements

### Requirement: Print uses compact 2-column layout
The system SHALL render the cheatsheet content in two columns when printing in portrait mode to maximize space utilization. Each section card SHALL remain intact (not split across columns or pages).

#### Scenario: Print renders in 2 columns
- **WHEN** the print dialog is open
- **THEN** the cheatsheet content is arranged in two columns

#### Scenario: Section cards stay intact during print
- **WHEN** a section card spans a column or page break
- **THEN** the entire card moves to the next column or page without splitting
