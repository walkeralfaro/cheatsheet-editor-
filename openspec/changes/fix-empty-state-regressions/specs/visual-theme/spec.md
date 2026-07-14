## MODIFIED Requirements

### Requirement: User can toggle dark theme
The system SHALL provide a toggle button in the toolbar that switches between light and dark theme. The preference SHALL persist across page reloads using localStorage. The theme SHALL be applied before the first paint and SHALL NOT produce a visible flash when restoring the persisted preference.

#### Scenario: Toggle to dark mode
- **WHEN** the user clicks the dark mode toggle button while in light mode
- **THEN** the interface switches to dark colors and the button shows a sun icon

#### Scenario: Toggle to light mode
- **WHEN** the user clicks the dark mode toggle button while in dark mode
- **THEN** the interface switches to light colors and the button shows a moon icon

#### Scenario: Theme persists on reload without flash
- **WHEN** the user reloads the page after toggling the theme
- **THEN** the previously selected theme is restored from localStorage AND the page SHALL NOT display a visible light-to-dark or dark-to-light transition during load

### Requirement: Dark theme uses distinct color palette
The dark theme SHALL use a stone-based warm dark color palette that provides sufficient contrast for readability.

#### Scenario: Text remains readable in dark mode
- **WHEN** dark mode is active
- **THEN** text is light-colored (`#fafaf9`) against a dark background (`#0c0a09`) with adequate contrast ratios

### Requirement: Light theme uses warm neutral palette
The light theme SHALL use a stone-based warm neutral palette with no cool (blue/green) undertones.

#### Scenario: Light theme background appears neutral
- **WHEN** the page is displayed in light mode
- **THEN** the background color is `#fafaf9` (stone-50), a warm off-white with no blue or green cast

### Requirement: All backgrounds respect theme
Every UI element SHALL use theme-aware background colors (`bg-surface`, `bg-surface-alt`, etc.) instead of hardcoded white or dark backgrounds.

#### Scenario: No hardcoded whites in dark mode
- **WHEN** dark mode is active
- **THEN** no element renders with `background-color: white` (all backgrounds are dark-themed)
