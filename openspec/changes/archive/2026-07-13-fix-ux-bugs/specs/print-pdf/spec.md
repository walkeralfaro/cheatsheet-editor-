## REMOVED Requirements

### Requirement: Sections avoid page breaks
**Reason**: Prevents natural pagination; long sections create blank space on pages
**Migration**: Allow the browser to paginate naturally

## ADDED Requirements

### Requirement: Print paginates naturally across pages
The system SHALL allow the cheatsheet to split across multiple pages when printing, without forcing sections to stay on a single page.

#### Scenario: Long section splits across pages
- **WHEN** a section is too long to fit on one page
- **THEN** it splits naturally across multiple pages
