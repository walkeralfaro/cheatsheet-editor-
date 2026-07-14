## Why

Four regressions remain after the hydration fix: (1) first-time users lose edits because no initial cheatsheet is persisted, (2) dark mode flashes light theme before switching, (3) sections stack in a single column on desktop instead of a 2-column grid, and (4) the PDF print layout puts the title next to sections instead of above them.

## What Changes

- Re-add saving of the initial empty cheatsheet in the hydrator so first-visit edits persist
- Remove the now-unnecessary autoSave guard (list is always set by hydrator first)
- Add inline script in Layout.astro that reads localStorage.theme before React hydrates, eliminating the dark mode flash
- Switch section container from single column to 2-column grid on desktop (responsive: 1 col mobile, 2 cols md+)
- Add `column-span: all` to the print title so it spans both PDF columns

## Capabilities

### New Capabilities
*(none)*

### Modified Capabilities
- `visual-theme`: dark mode no longer flashes light theme; title spans columns in print PDF
- `live-preview`: sections display in a responsive 2-column grid on desktop
- `local-persistence`: first-visit empty cheatsheet is saved so edits persist

## Impact

- `src/components/App.tsx` — hydrator else branch + remove autoSave guard
- `src/layouts/Layout.astro` — add inline theme script
- `src/components/LivePreview.tsx` — change section container to grid
- `src/styles/global.css` — add column-span to print title
