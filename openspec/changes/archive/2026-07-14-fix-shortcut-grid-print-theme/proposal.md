## Why

Three issues: (1) clicking outside the keys input in ShortcutCard edit mode does not save/exit, and each field should be independently editable; (2) CSS Columns masonry orders cards top-to-bottom (column-major) instead of left-to-right (row-major) by ID; (3) print output should reflect the current theme (dark/light) and match the screen's row-major ordering.

## What Changes

- ShortcutCard: split editing into independent `editingKey` / `editingAction` states; each field has its own blur handler that saves independently
- LivePreview: replace `columns-*` (CSS Columns) with `grid grid-cols-1 md:grid-cols-2 items-start gap-6` for row-major ordering with natural card heights
- Print CSS: switch from `column-count: 2` to `display: grid; grid-template-columns: 1fr 1fr` to match screen order; add `print-color-adjust: exact` so theme colors render in print

## Capabilities

### New Capabilities
*(none)*

### Modified Capabilities
- `inline-editing`: keys input now has independent blur-based save; editing state is per-field rather than per-row
- `live-preview`: section cards use grid with `items-start` instead of CSS Columns for row-major ordering with independent heights
- `print-pdf`: printed layout uses grid (row-major) matching screen; theme colors render in print
- `visual-theme`: `print-color-adjust: exact` so dark/light theme colors apply in print output

## Impact

- `src/components/ShortcutCard.tsx` — refactor to independent `editingKey`/`editingAction` states, add blur handlers to both inputs
- `src/components/LivePreview.tsx` — replace `columns-1 md:columns-2 break-inside-avoid-column` with `grid grid-cols-1 items-start gap-6 md:grid-cols-2`; remove `mb-6 break-inside-avoid-column` from cards
- `src/styles/global.css` — update `@media print` rules: remove `column-count` from `.print-area`, apply grid to section container, add `print-color-adjust: exact`
