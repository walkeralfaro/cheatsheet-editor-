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

#### Scenario: Theme renders in print output
- **WHEN** the user prints the page in dark mode
- **THEN** the printed output SHALL display dark-themed background and text colors
