## Why

Three regressions: (1) dark mode flashes on page refresh because Tailwind CSS variables take longer to apply than the body's default background, (2) section cards in the preview all share the same height (CSS Grid stretch) instead of each having their own height (masonry), and (3) the print output should preserve the same visual column order as the screen layout.

## What Changes

- Inline script in `Layout.astro` also sets `style="background-color: ..."` on `<body>` to prevent the white flash before CSS loads
- Section card container changes from `grid grid-cols-1 md:grid-cols-2` to `columns-1 md:columns-2` with `break-inside-avoid` on each card for masonry layout
- Print CSS already uses `column-count: 2`; verify it matches the screen masonry order and cards don't break across print columns

## Capabilities

### New Capabilities
*(none)*

### Modified Capabilities
- `visual-theme`: dark theme applies without any visible flash on page load (inline style guard)
- `live-preview`: section cards use masonry layout (CSS Columns) instead of equal-height grid
- `print-pdf`: printed output respects the visual masonry order from the screen layout

## Impact

- `src/layouts/Layout.astro` — inline script also sets `style.backgroundColor` on `<body>` when dark theme is active
- `src/components/LivePreview.tsx` — replace `grid` with `columns-*` classes, add `break-inside-avoid` to each card
- `src/styles/global.css` — verify `@media print` column rules preserve card integrity
