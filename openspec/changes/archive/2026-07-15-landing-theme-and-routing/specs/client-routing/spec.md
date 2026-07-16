## MODIFIED Requirements

### Requirement: Cheatsheets are addressable by URL
The system SHALL load the cheatsheet whose id matches the `:id` segment of `/cheatsheet/:id` (making it active), and SHALL render a 404 when no cheatsheet with that id exists. `:id` is a short, URL-safe identifier derived from a UUID.

#### Scenario: Opening a cheatsheet updates the URL
- **WHEN** the user creates a new cheatsheet or switches to an existing one from the sidebar
- **THEN** the application navigates to `/cheatsheet/<shortId>` and loads that cheatsheet as active

#### Scenario: Deep link loads the correct cheatsheet
- **WHEN** the user opens `/cheatsheet/<id>` directly (e.g., shared link or bookmark)
- **THEN** the cheatsheet with that id is loaded as active and its editor and preview are rendered

#### Scenario: Invalid id falls back to home
- **WHEN** the user opens `/cheatsheet/<id>` where `<id>` does not exist in the store
- **THEN** a 404 page is shown (not a different or active cheatsheet)
