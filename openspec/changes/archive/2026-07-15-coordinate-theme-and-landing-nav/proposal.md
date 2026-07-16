## Why

The landing page and the editor each have a theme toggle that writes the same `localStorage["theme"]` key, but the editor's toggle is desynced on load: the store initializes `darkMode` to `false` and flips its own internal state instead of reading the actual persisted/OS theme. After toggling on the landing and opening the editor, the toolbar icon is wrong and the first editor toggle is a visual no-op. Separately, the editor header "Cheatsheet Editor" is a static heading with no way to return to the landing, forcing users to manually hit `/`.

## What Changes

- Make the editor's theme state initialize from `localStorage["theme"]` (falling back to `prefers-color-scheme`, then light), matching the landing's resolution.
- Rewrite the editor's `toggleDark` to compute the next theme from the actual current `.dark` class (not the store's internal `darkMode`), so it always agrees with the landing toggle.
- Stop persisting `darkMode` in the zustand store so `localStorage["theme"]` is the single source of truth (prevents a stale cross-page value).
- Make the editor header "Cheatsheet Editor" a clickable control that performs a full-page navigation to `/` (the static landing), since the SPA has no `/` route.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `landing-theme`: editor toggle SHALL read the stored/OS theme on load and SHALL derive its toggle action from the actual applied theme, keeping it in sync with the landing toggle (currently only the landing side is specified).

## Impact

- `src/store/useAppStore.ts`: `darkMode` initial value, `toggleDark` logic, and `partialize` (remove `darkMode`).
- `src/App.tsx`: Shell header title becomes a clickable control navigating to `/`.
- No API, dependency, or routing-table changes. `public/landing.html` and `public/index.html` theme scripts are unaffected.
