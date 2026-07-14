## ADDED Requirements

### Requirement: Editor panel is collapsible on mobile
The system SHALL provide a toggle button to show/hide the editor panel on mobile and tablet screens. On desktop the editor is always visible.

#### Scenario: Toggle button visible on mobile
- **WHEN** the screen is below the desktop breakpoint
- **THEN** a toggle button is shown in the toolbar to hide/show the editor

#### Scenario: Editor hidden by default on mobile
- **WHEN** the page loads on a mobile screen
- **THEN** the editor panel is hidden and only the preview is visible

#### Scenario: Tapping toggle shows editor
- **WHEN** the user taps the toggle button on mobile
- **THEN** the editor panel appears

#### Scenario: Tapping toggle hides editor
- **WHEN** the editor is visible and the user taps the toggle button
- **THEN** the editor panel hides

### Requirement: Page scrolls naturally on mobile
The system SHALL allow the page to scroll naturally on mobile without clipping content.

#### Scenario: Scroll full page on mobile
- **WHEN** the user is on a mobile device
- **THEN** the entire page content scrolls vertically
