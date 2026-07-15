## Why

The project's dependencies are pinned to older majors (React Router 7, Vite 6, `@vitejs/plugin-react` 4) while current releases are React Router 8.2, Vite 8.1, and plugin-react 6. Keeping current libraries reduces security exposure, stays compatible with the Netlify build image, and avoids falling behind on ESM-only packages and future major upgrades (React Router v9 is estimated mid-2027). No application code changes are required: the app uses React Router in declarative mode (API-identical between v7 and v8) plus zustand and Tailwind v4, whose current releases are API-compatible minors.

## What Changes

- **BREAKING (peer/runtime)**: Bump `react`/`react-dom` to `^19.2.7` (React Router v8 peer minimum).
- **BREAKING (major)**: `react-router` `^7.0.0` → `^8.2.0`. Declarative-mode API is unchanged; no code edits required.
- **BREAKING (major)**: `vite` `^6.0.0` → `^8.1.4` (Rolldown/Oxc internals; auto-converts existing config via compatibility layer).
- **BREAKING (major)**: `@vitejs/plugin-react` `^4.3.0` → `^6.0.3` (required by Vite 8; drops Babel, uses Oxc for React Refresh).
- **Minor**: `zustand` `^5.0.0` → `^5.0.14`, `tailwindcss` `^4.0.0` → `^4.3.2`, `@tailwindcss/vite` `^4.0.0` → `^4.3.2`.
- **Deploy**: Pin Node to 22 on Netlify (React Router v8 requires Node ≥ 22.22) via `netlify.toml` or `.nvmrc`, since the project has no Node version pin today.
- **Keep**: All application code, routing structure (`/`, `/cheatsheet/:id`), store, components, and `vite.config.ts`.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
<!-- none -->

## Impact

- **Dependencies**: version bumps in `package.json` (see What Changes). No new packages introduced.
- **Files changed**: `package.json` (versions + optional `engines`), and a new `netlify.toml` (or `.nvmrc`) pinning Node 22. `vite.config.ts` unchanged. Source code unchanged.
- **Build/deploy**: `npm install` must resolve Vite 8 + plugin-react 6 + React Router 8; `npm run build` (`tsc --noEmit && vite build`) must pass; Netlify build must run on Node 22.
- **Local env**: requires Node ≥ 22.22 (already satisfied locally at v24.16.0).
