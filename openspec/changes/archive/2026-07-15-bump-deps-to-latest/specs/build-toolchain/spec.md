## ADDED Requirements

### Requirement: Build and runtime require Node 22.22 or newer
The project SHALL build and run on Node.js 22.22 or newer, because React Router v8 (and the current Vite-based toolchain) require that minimum Node version.

#### Scenario: Local build on a supported Node version
- **WHEN** a developer runs `npm install` and `npm run build` on Node 22.22 or newer
- **THEN** dependencies install and the production build (`tsc --noEmit && vite build`) completes successfully

#### Scenario: Netlify deploy uses a supported Node version
- **WHEN** Netlify builds the project
- **THEN** the build environment runs Node 22 or newer (pinned via `netlify.toml` `NODE_VERSION` or `.nvmrc`)

### Requirement: Core dependencies stay on current major releases
The project SHALL use current major releases of its core dependencies (React Router, Vite, `@vitejs/plugin-react`, zustand, Tailwind CSS), kept up to date as part of routine maintenance.

#### Scenario: Routine dependency update
- **WHEN** a new major/minor of a core dependency is released
- **THEN** the version is reviewed and bumped, with `npm run build` and a smoke test confirming no regressions before deploy
