## MODIFIED Requirements

### Requirement: Dark theme uses distinct color palette
The dark theme SHALL use the color palette defined in the design reference (`card_dark_styles.html`): surface `#161b22`, border `#30363d`, text `#e2e8f0`, with 10px border-radius on cards.

#### Scenario: Dark mode matches design reference colors
- **WHEN** dark mode is active
- **THEN** the background is `#161b22`, borders are `#30363d`, text is `#e2e8f0`, and cards have 10px border-radius

## ADDED Requirements

### Requirement: Section card headers use accent colors
The system SHALL display each section card header with a distinct accent color that cycles through a set of predefined colors (green, blue, purple, orange, teal) based on section index.

#### Scenario: Section headers have colored accent
- **WHEN** a section card is rendered
- **THEN** its header displays an accent color (left border or background tint) that differs from adjacent sections

#### Scenario: Accent color cycles per section
- **WHEN** there are multiple sections
- **THEN** each section receives the next accent color in sequence, cycling through the set
