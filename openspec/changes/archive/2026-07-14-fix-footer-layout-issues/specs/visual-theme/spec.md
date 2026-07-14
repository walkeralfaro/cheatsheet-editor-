## Purpose

Delta: Ensure the footer and its parent container use `bg-surface` so the dark theme background applies correctly.

## Changes

### Requirement: Footer and main container use themed background

The `<main>` element and mobile `<footer>` SHALL include `bg-surface` so the dark theme variable cascades properly.

#### Scenario: Mobile footer renders dark background in dark mode
- **WHEN** dark mode is active on mobile viewport
- **THEN** the footer background SHALL be `--color-surface` (not transparent)

#### Scenario: Main container provides stable backdrop
- **WHEN** the page loads in any theme
- **THEN** the `<main>` element SHALL have `bg-surface` so content area does not flash the page-level background
