## ADDED Requirements

### Requirement: Dark mode applies without flash on page load
The system SHALL apply the dark mode class (`class="dark"` on `<html>`) synchronously before the browser paints the page, to prevent a flash of the wrong theme.

#### Scenario: Dark mode class applied before paint
- **WHEN** the user loads the page with `localStorage.theme === "dark"`
- **THEN** the class `dark` is present on `<html>` before the browser renders any content

### Requirement: Print title spans both columns
In print mode, the cheatsheet title SHALL span the full page width above the two-column section layout.

#### Scenario: PDF shows title as full-width header
- **WHEN** printing the page
- **THEN** the cheatsheet title renders centered above the two-column section grid, not inside a column
