## Why

The app is already a fully client-side React SPA, but it is wrapped in Astro, which now contributes only an HTML shell (`index.astro`, `Layout.astro`) and the build pipeline. Astro adds no value here (no content collections, no SSR, no multi-page routing, only a single React island) while adding framework overhead and a redundant abstraction layer. Migrating to a native Vite + React SPA removes that overhead, simplifies the toolchain, and lets us adopt proper client-side routing (deep-linkable cheatsheets) and a single global store with zustand.

## What Changes

- **BREAKING (toolchain)**: Remove Astro (`astro`, `@astrojs/react`) and replace the build with Vite + `@vitejs/plugin-react`. `npm run dev`/`build`/`preview` now run Vite.
- **BREAKING (routing)**: Introduce React Router v7 (declarative mode). Cheatsheets become addressable by URL at `/cheatsheet/:id`; `/` shows the home/empty state and redirects to the last active cheatsheet. Browser back/forward and deep links work.
- **BREAKING (state)**: Replace `useReducer` + scattered `useState` in `App.tsx` with a single zustand store (`useAppStore`) wrapped with the `persist` middleware. The `cheatsheetReducer` is kept as a pure helper invoked by store actions.
- **BREAKING (persistence layout)**: Replace the multi-key localStorage scheme (`cheatsheet:index` + `cheatsheet:<id>` + legacy `cheatsheet` key) with a single persisted store key (`cheatsheet-store`). Existing users' data is migrated once on first load.
- **Keep**: Tailwind CSS v4 (via `@tailwindcss/vite`), all React components' behavior, print/PDF layout, dark-mode (no flash), and Netlify deployment to `dist/`.
- **Netlify SPA support**: Add `public/_redirects` (`/* /index.html 200`) so deep-linked routes survive refresh/deploy without 404s.

## Capabilities

### New Capabilities
- `client-routing`: Addressable, deep-linkable cheatsheets via `/cheatsheet/:id`; `/` redirects to the last active cheatsheet; browser history (back/forward) navigates between cheatsheets; invalid ids fall back to `/`.

### Modified Capabilities
- `local-persistence`: Persistence requirement changes from a multi-key localStorage layout to a single persisted store key, and adds a one-time migration of legacy data (`cheatsheet` + `cheatsheet:index` + `cheatsheet:<id>` keys) into the new store on first load.

## Impact

- **Dependencies**: remove `astro`, `@astrojs/react`; add `react-router`, `zustand`, `vite`, `@vitejs/plugin-react`, `typescript`, `@types/react`, `@types/react-dom`.
- **Files removed**: `astro.config.mjs`, `src/pages/index.astro`, `src/layouts/Layout.astro`.
- **Files added**: `index.html`, `vite.config.ts`, `src/main.tsx`, `src/App.tsx` (router shell), `src/routes/Home.tsx`, `src/routes/CheatsheetRoute.tsx`, `src/store/useAppStore.ts`, `public/_redirects`.
- **Files changed**: `package.json`, `tsconfig.json`, `src/lib/reducer.ts` (`uid()` -> `crypto.randomUUID()`), `src/lib/storage.ts` (legacy-reader only), and ~7 components refactored from prop-drilling (`cheatsheet`/`dispatch`/`activeSectionId`) to `useAppStore()`.
- **Deployment**: Netlify continues to build `dist/` from `npm run build`; `_redirects` ensures SPA fallback.
