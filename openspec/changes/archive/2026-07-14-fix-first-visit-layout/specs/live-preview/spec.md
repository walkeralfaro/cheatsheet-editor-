## ADDED Requirements

### Requirement: Sections display in responsive 2-column grid on desktop
The section cards in the preview SHALL display in a two-column grid on desktop screens (≥768px) and a single column on mobile.

#### Scenario: Sections flow left-to-right in 2 columns
- **WHEN** the viewport is at least 768px wide and 3+ sections exist
- **THEN** section 1 is in the left column, section 2 in the right column, section 3 below section 1, section 4 below section 2 (natural grid fill order)
