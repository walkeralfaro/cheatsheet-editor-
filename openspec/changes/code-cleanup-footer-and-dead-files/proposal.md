## Why

The codebase has accumulated dead code (`src/routes/Home.tsx` is no longer imported since the landing refactor) and a duplicated footer component (the "made with ❤️ by Walker Alfaro" block appears in 3 files with different visibility classes). Extracting a reusable Footer component removes duplication and makes the code easier to maintain.

## What Changes

- Delete unused `src/routes/Home.tsx`.
- Create `src/components/Footer.tsx` — reusable footer accepting an optional `className` prop.
- Replace inline footers in `App.tsx`, `EditorPanel.tsx`, and `Landing.tsx` with the new component.
- Clean up `ShortcutCard.tsx` import style.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
<!-- none -->

## Impact

- `src/routes/Home.tsx` — deleted
- `src/components/Footer.tsx` — new file
- `src/App.tsx` — use `<Footer />` in place of inline footer
- `src/components/EditorPanel.tsx` — use `<Footer />` in place of inline footer
- `src/routes/Landing.tsx` — use `<Footer />` in place of inline footer
- `src/components/ShortcutCard.tsx` — cleaner import
