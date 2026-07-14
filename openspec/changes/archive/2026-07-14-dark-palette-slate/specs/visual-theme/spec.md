## Purpose

Delta: Update the dark theme color values from the stone palette to the slate palette.

## MODIFIED Requirements

### Requirement: Dark theme uses distinct color palette

#### Scenario: Text remains readable in dark mode
- **WHEN** dark mode is active
- **THEN** text is light-colored (`#f8fafc`) against a dark background (`#020617`) with adequate contrast ratios

### Requirement: Inline style prevents FOUC before CSS loads

#### Scenario: Dark background set inline before paint
- **WHEN** the page loads with dark mode enabled
- **THEN** `document.documentElement.style.backgroundColor` SHALL be set to "#020617" before the first paint
