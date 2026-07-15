## Purpose

Addressable, deep-linkable cheatsheets via client-side routing. Each cheatsheet is reachable at `/cheatsheet/:id`, the home route redirects to the last active cheatsheet, and browser history navigates between cheatsheets.

## Requirements

### Requirement: Cheatsheets are addressable by URL
The system SHALL expose each cheatsheet at the route `/cheatsheet/:id`, where `:id` is the cheatsheet's unique identifier, and SHALL reflect the active cheatsheet in the URL.

#### Scenario: Opening a cheatsheet updates the URL
- **WHEN** the user creates a new cheatsheet or switches to an existing one from the sidebar
- **THEN** the application navigates to `/cheatsheet/<id>` and loads that cheatsheet as active

#### Scenario: Deep link loads the correct cheatsheet
- **WHEN** the user opens `/cheatsheet/<id>` directly (e.g., shared link or bookmark)
- **THEN** the cheatsheet with that id is loaded as active and its editor and preview are rendered

#### Scenario: Invalid id falls back to home
- **WHEN** the user opens `/cheatsheet/<id>` where `<id>` does not exist
- **THEN** the application redirects to `/`

### Requirement: Home route redirects to the last active cheatsheet
The system SHALL, on the `/` route, navigate to the last active cheatsheet when one exists, and SHALL show the empty state otherwise.

#### Scenario: Returning user lands on their last cheatsheet
- **WHEN** the page loads at `/` and a last active cheatsheet id is persisted
- **THEN** the application redirects to `/cheatsheet/<lastActiveId>`

#### Scenario: First-time user sees empty state
- **WHEN** the page loads at `/` and no cheatsheet exists
- **THEN** the application shows the "Create your first cheatsheet" empty state

### Requirement: Browser history navigates between cheatsheets
The system SHALL support browser back/forward navigation between cheatsheet routes and the home route.

#### Scenario: Back button returns to previous cheatsheet
- **WHEN** the user clicks the browser back button after navigating from `/cheatsheet/A` to `/cheatsheet/B`
- **THEN** the application navigates to `/cheatsheet/A` and loads cheatsheet A as active
