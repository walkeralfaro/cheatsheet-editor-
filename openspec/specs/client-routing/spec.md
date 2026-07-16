## Purpose

Addressable, deep-linkable cheatsheets via client-side routing. Each cheatsheet is reachable at `/cheatsheet/:id` (authoritative URL), unknown ids and unmatched routes render a 404, and browser history navigates between cheatsheets.
## Requirements
### Requirement: Cheatsheets are addressable by URL
The system SHALL load the cheatsheet whose id matches the `:id` segment of `/cheatsheet/:id` (making it active), and SHALL render a 404 when no cheatsheet with that id exists. `:id` is a short, URL-safe identifier derived from a UUID.

#### Scenario: Opening a cheatsheet updates the URL
- **WHEN** the user creates a new cheatsheet or switches to an existing one from the sidebar
- **THEN** the application navigates to `/cheatsheet/<shortId>` and loads that cheatsheet as active

#### Scenario: Deep link loads the correct cheatsheet
- **WHEN** the user opens `/cheatsheet/<id>` directly (e.g., shared link or bookmark)
- **THEN** the cheatsheet with that id is loaded as active and its editor and preview are rendered

#### Scenario: Unknown id shows 404
- **WHEN** the user opens `/cheatsheet/<id>` where `<id>` does not exist in the store
- **THEN** a 404 page is shown (not a different or active cheatsheet)

### Requirement: Browser history navigates between cheatsheets
The system SHALL support browser back/forward navigation between cheatsheet routes.

#### Scenario: Back button returns to previous cheatsheet
- **WHEN** the user clicks the browser back button after navigating from `/cheatsheet/A` to `/cheatsheet/B`
- **THEN** the application navigates to `/cheatsheet/A` and loads cheatsheet A as active

### Requirement: Unknown routes show a custom 404
The system SHALL render a styled "Not Found" page for any unmatched client-side route (catch-all `*`), with a link back to the editor (`/editor`) and to the landing (full reload to `/`).

#### Scenario: Unknown path shows 404
- **WHEN** the user navigates to a path that matches no route (e.g., `/foo`)
- **THEN** a styled 404 page is shown with links to the editor and the landing

