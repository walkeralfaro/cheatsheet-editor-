## REMOVED Requirements

### Requirement: Home route redirects to the last active cheatsheet
**Reason**: En Path A, `/` es ahora la landing estática servida por el host (Netlify `_redirects` / plugin Vite), y el SPA ya no posee una ruta `home`.
**Migration**: La landing enlaza a `/editor`, que reanuda el último cheatsheet activo o crea uno nuevo.

## MODIFIED Requirements

### Requirement: Cheatsheets are addressable by URL
The system SHALL expose each cheatsheet at `/cheatsheet/:id`, where `:id` is a short, URL-safe identifier derived from a UUID (not the full 36-character UUID), unique per cheatsheet. The application SHALL reflect the active cheatsheet in the URL.

#### Scenario: Opening a cheatsheet updates the URL
- **WHEN** the user creates a new cheatsheet or switches to an existing one from the sidebar
- **THEN** the application navigates to `/cheatsheet/<shortId>` and loads that cheatsheet as active

#### Scenario: Deep link loads the correct cheatsheet
- **WHEN** the user opens `/cheatsheet/<id>` directly (e.g., shared link or bookmark)
- **THEN** the cheatsheet with that id is loaded as active and its editor and preview are rendered

#### Scenario: Invalid id falls back to home
- **WHEN** the user opens `/cheatsheet/<id>` where `<id>` does not exist (e.g., all cheatsheets were deleted)
- **THEN** the browser performs a full reload to `/` and the landing page is shown

## ADDED Requirements

### Requirement: Unknown routes show a custom 404
The system SHALL render a styled "Not Found" page for any unmatched client-side route (catch-all `*`), with a link back to the editor (`/editor`) and to the landing (full reload to `/`).

#### Scenario: Unknown path shows 404
- **WHEN** the user navigates to a path that matches no route (e.g., `/foo`)
- **THEN** a styled 404 page is shown with links to the editor and the landing
