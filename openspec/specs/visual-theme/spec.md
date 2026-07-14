## Purpose

Provide a dark theme option with a toggle button, localStorage persistence, and a clearly distinguishable color palette.

## Requirements

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

### Requirement: Inline style prevents FOUC before CSS loads
The system SHALL set a `background-color` inline style on `<html>` synchronously before the first paint, matching the active theme, so the background color is correct even before the Tailwind stylesheet is applied.

#### Scenario: Dark background set inline before paint
- **WHEN** the page loads with dark mode enabled
- **THEN** `document.documentElement.style.backgroundColor` SHALL be set to "#0c0a09" before the first paint

#### Scenario: Light background set inline before paint
- **WHEN** the page loads with light mode or no saved preference
- **THEN** `document.documentElement.style.backgroundColor` SHALL be set to "#fafaf9" before the first paint

### Requirement: All backgrounds respect theme
Every UI element SHALL use theme-aware background colors (`bg-surface`, `bg-surface-alt`, etc.) instead of hardcoded white or dark backgrounds.

#### Scenario: No hardcoded whites in dark mode
- **WHEN** dark mode is active
- **THEN** no element renders with `background-color: white` (all backgrounds are dark-themed)
