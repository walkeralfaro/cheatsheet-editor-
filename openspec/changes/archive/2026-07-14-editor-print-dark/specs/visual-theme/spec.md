## ADDED Requirements

### Requirement: User can toggle dark theme
The system SHALL provide a toggle button in the toolbar that switches between light and dark theme. The preference SHALL persist across page reloads using localStorage.

#### Scenario: Toggle to dark mode
- **WHEN** the user clicks the dark mode toggle button while in light mode
- **THEN** the interface switches to dark colors and the button shows a sun icon

#### Scenario: Toggle to light mode
- **WHEN** the user clicks the dark mode toggle button while in dark mode
- **THEN** the interface switches to light colors and the button shows a moon icon

#### Scenario: Theme persists on reload
- **WHEN** the user reloads the page after toggling the theme
- **THEN** the previously selected theme is restored from localStorage

### Requirement: Dark theme uses distinct color palette
The dark theme SHALL use a slate-based dark color palette that provides sufficient contrast for readability.

#### Scenario: Text remains readable in dark mode
- **WHEN** dark mode is active
- **THEN** text is light-colored against a dark background with adequate contrast ratios
