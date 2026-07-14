## Why

During static SSR generation (Astro build), `localStorage` is unavailable, so `useState` initializers that read from it produce different values than the client hydration pass, where `localStorage` is available. React detects the DOM mismatch, logs an error, and regenerates the entire tree on the client — wasting performance and causing jank on initial load.

## What Changes

- Move all `localStorage` reads from `useState` initializer functions into `useEffect` hooks
- SSR and initial client render: always render the same default state (empty cheatsheet, light mode)
- After hydration, `useEffect` loads the real data from `localStorage` and triggers a re-render

No breaking changes. The user-visible behavior is identical — only the internal rendering strategy changes.

## Capabilities

### New Capabilities
*(none — bug fix, no new requirements)*

### Modified Capabilities
*(none — no spec-level requirement changes)*

## Impact

Only `src/components/App.tsx` — the following `useState`/reducer initializer patterns need refactoring:

1. `cheatsheet` (reducer init via `initialCheatsheet()`)
2. `cheatsheetList` (reads localStorage)
3. `darkMode` (reads localStorage)
4. `activeCheatsheetId` (reads from list)
