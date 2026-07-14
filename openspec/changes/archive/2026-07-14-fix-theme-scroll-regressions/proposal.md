## Why

The light theme has a cool blue-green cast from the slate palette that makes colors look "verdes y celestes" instead of neutral, and the dark theme lacks sufficient contrast with key backgrounds blending into surfaces. Additionally, the editor panel does not scroll on desktop when sections grow, making shortcuts inaccessible.

## What Changes

- Light theme palette: switch from slate (blue-green undertones) to stone (warm neutral) for `--color-surface`, `--color-surface-alt`, `--color-border`, `--color-text`, `--color-text-muted`, `--color-key-bg`, `--color-key-text`
- Dark theme palette: switch from slate to stone with deeper backgrounds and better contrast between surfaces and key badges
- Editor scroll: add `flex-1 overflow-hidden` to the editor wrapper div so the inner `EditorPanel` can scroll
- Dark mode consistency: replace all `bg-white` hardcoded white backgrounds with `bg-surface` to ensure proper dark mode rendering everywhere

## Capabilities

### New Capabilities
*(none)*

### Modified Capabilities
- `visual-theme`: color palette changes from slate to stone in both light and dark themes; dark theme contrast requirements updated

## Impact

- `src/styles/global.css` — all hex color values replaced
- `src/components/App.tsx` — scroll fix + bg-white → bg-surface
- `src/components/LivePreview.tsx` — bg-white → bg-surface
- `src/components/SectionList.tsx` — bg-white → bg-surface
- `src/components/AddShortcutForm.tsx` — bg-white → bg-surface
- `src/components/Cheatsidebar.tsx` — bg-white → bg-surface
- `src/pages/index.astro` — bg-white → bg-surface
