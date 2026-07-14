## Why

Three regressions: (1) dark mode flashes twice on page refresh because the darkModeSync effect removes the class before the hydrator restores it, (2) refreshing with no saved data accumulates empty cheatsheets because the hydrator saves the SSR-generated cheatsheet each time, and (3) the empty state shows the editor (allowing edits that vanish on refresh) instead of a clear "Create cheatsheet" prompt.

## What Changes

- Skip `darkModeSync` effect's first run using a `useRef` so the inline script's class toggle is the only one that runs on mount
- Remove the save logic from hydrator's else branch (don't persist empty cheatsheets on first visit)
- Add back the autoSave guard (`if (cheatsheetList.length === 0) return;`) since hydrator no longer pre-seeds the list
- Replace the editor panel with a "Create your first cheatsheet" prompt when no saved cheatsheets exist

## Capabilities

### New Capabilities
*(none)*

### Modified Capabilities
- `visual-theme`: dark mode applies without intermediate flash on page load
- `local-persistence`: first-visit empty cheatsheet is NOT persisted; autoSave guard prevents saving when no index exists
- `form-editor`: empty state shows "Create cheatsheet" prompt instead of editable form

## Impact

- `src/components/App.tsx` — add `useRef` for first-run skip in darkModeSync; remove save from hydrator else branch; add back autoSave guard
- `src/components/EditorPanel.tsx` — show "Create first cheatsheet" CTA when `cheatsheet.sections.length === 0 && cheatsheetList.length === 0`
- `src/layouts/Layout.astro` — inline script already exists (no change needed)
