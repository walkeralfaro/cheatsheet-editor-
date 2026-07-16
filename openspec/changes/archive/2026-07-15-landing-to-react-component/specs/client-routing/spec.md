## MODIFIED Requirements

### Requirement: Landing at root serves as the marketing page
The system SHALL render a marketing/landing page at the root URL `/` as a React component within the SPA, rather than serving a separate static HTML file via a server redirect.

#### Scenario: Root renders Landing component
- **WHEN** the user navigates to `/`
- **THEN** the `<Landing />` component is rendered with the same SEO metadata, content, and theme behavior as the previous static landing page

#### Scenario: Catch-all redirect still applies
- **WHEN** the user navigates to any path other than `/`
- **THEN** the SPA handles it via the catch-all route, with `/* /index.html 200` as the only Netlify redirect rule
