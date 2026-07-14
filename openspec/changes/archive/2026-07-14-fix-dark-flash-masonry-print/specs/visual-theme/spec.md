## MODIFIED Requirements

### Requirement: User can toggle dark theme
The system SHALL provide a toggle button in the toolbar that switches between light and dark theme. The preference SHALL persist across page reloads using localStorage. The page SHALL NOT display a visible white flash when loading in dark mode.

#### Scenario: Toggle to dark mode
- **WHEN** the user clicks the dark mode toggle button while in light mode
- **THEN** the interface switches to dark colors and the button shows a sun icon

#### Scenario: Toggle to light mode
- **WHEN** the user clicks the dark mode toggle button while in dark mode
- **THEN** the interface switches to light colors and the button shows a moon icon

#### Scenario: Theme persists on reload without flash
- **WHEN** the user reloads the page after toggling the theme to dark
- **THEN** the page SHALL display a dark background on the very first paint, with no visible white flash

## ADDED Requirements

### Requirement: Inline style prevents FOUC before CSS loads
The system SHALL set a `background-color` inline style on `<body>` synchronously before the first paint, matching the active theme, so the background color is correct even before the Tailwind stylesheet is applied.

#### Scenario: Dark background set inline before paint
- **WHEN** the page loads with dark mode enabled
- **THEN` document.body.style.backgroundColor SHALL be set to "#0c0a09" before the first paint

#### Scenario: Light background set inline before paint
- **WHEN** the page loads with light mode or no saved preference
- **THEN` document.body.style.backgroundColor SHALL be set to "#fafaf9" before the first paint
