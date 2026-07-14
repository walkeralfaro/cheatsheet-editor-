## Purpose

Ensure the editor UI works well on mobile and tablet viewports. (TBD)

## Requirements

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

### Requirement: Toolbar is always visible on mobile
The system SHALL keep the toolbar visible at all times on mobile regardless of whether the editor panel is shown or hidden.

#### Scenario: Toggle button visible when editor hidden
- **WHEN** the editor panel is hidden on mobile
- **THEN** the toolbar with the toggle button is still visible

#### Scenario: Toggle button visible when editor shown
- **WHEN** the editor panel is visible on mobile
- **THEN** the toolbar and toggle button remain visible above the editor

### Requirement: Page scrolls naturally on mobile
The system SHALL allow the page to scroll naturally on mobile without clipping content.

#### Scenario: Scroll full page on mobile
- **WHEN** the user is on a mobile device
- **THEN** the entire page content scrolls vertically
