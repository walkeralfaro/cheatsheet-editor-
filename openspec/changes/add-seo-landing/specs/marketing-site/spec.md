## ADDED Requirements

### Requirement: Static SEO landing at root
The system SHALL serve a static HTML page at `/` (`public/landing.html`) that is fully crawlable without JavaScript, containing a `<title>`, a `meta description`, Open Graph tags, a Twitter Card tag, and a `canonical` link.

#### Scenario: Crawler fetches root
- **WHEN** a search engine crawler requests `/`
- **THEN** the server returns `landing.html` with complete SEO meta tags in the response HTML (no JavaScript execution required to see them)

#### Scenario: Canonical URL present
- **WHEN** the landing page is served
- **THEN** it includes a `<link rel="canonical">` pointing to the site root URL

### Requirement: Structured data for the application
The landing page SHALL include a JSON-LD `SoftwareApplication` script describing the tool (name, description, application category, operating system, free offer, and author).

#### Scenario: JSON-LD present and valid
- **WHEN** the landing HTML is parsed
- **THEN** a `<script type="application/ld+json">` with `@type: SoftwareApplication` is present and parseable

### Requirement: Robots and sitemap files
The system SHALL publish `public/robots.txt` (allowing crawling and referencing the sitemap) and `public/sitemap.xml` (listing the public landing URL).

#### Scenario: Robots allows and references sitemap
- **WHEN** a crawler requests `/robots.txt`
- **THEN** it receives `User-agent: *`, `Allow: /`, and a `Sitemap:` directive

#### Scenario: Sitemap lists public URL
- **WHEN** a crawler requests `/sitemap.xml`
- **THEN** it receives a valid sitemap containing at least the root URL

### Requirement: Editor shell not indexed
The SPA entry `index.html` SHALL include `<meta name="robots" content="noindex">` so the editor shell is not indexed.

#### Scenario: Shell is noindex
- **WHEN** the editor SPA HTML is served
- **THEN** it contains a `noindex` robots meta tag

### Requirement: Landing routes into the editor
The system SHALL provide an entry route `/editor` in the SPA that resumes the user's last active cheatsheet (persisted `activeId`) or creates a new one, then navigates to `/cheatsheet/:id`, without changing existing `/cheatsheet/:id` URLs.

#### Scenario: Returning user with active cheatsheet
- **WHEN** a user with a persisted `activeId` opens `/editor`
- **THEN** the app navigates to `/cheatsheet/<activeId>`

#### Scenario: New user
- **WHEN** a user without any cheatsheet opens `/editor`
- **THEN** the app creates a new cheatsheet and navigates to its `/cheatsheet/:id`

### Requirement: Visual integration with the editor
The landing page SHALL use the same design tokens (colors and fonts) as the editor and SHALL present a visual preview of the editor so the transition into the app feels seamless.

#### Scenario: Matching tokens
- **WHEN** the landing page is rendered
- **THEN** its colors and fonts match `src/styles/global.css` tokens and it shows an editor-style preview card

### Requirement: Root redirect serves landing, rest serves SPA
`public/_redirects` SHALL route `/` to `landing.html` and all other paths to `index.html` (SPA), with the `/` rule first.

#### Scenario: Root serves landing
- **WHEN** a request to `/` is made
- **THEN** Netlify serves `landing.html`

#### Scenario: Editor routes serve SPA
- **WHEN** a request to `/editor` or `/cheatsheet/abc` is made
- **THEN** Netlify serves `index.html` (SPA)
