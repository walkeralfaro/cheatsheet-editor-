## Why

The dark theme colors from the last change are too dark and lack contrast (surface `#161b22` barely distinguishable from `#1c2333`). The print 2-column layout breaks table cells with text overflow. The light theme header accent borders add visual noise that wasn't there before.

## What Changes

- **Dark theme**: Replace `#161b22`/`#1c2333`/`#30363d` colors with higher-contrast slate palette (`#1e293b`/`#334155`/`#475569`). Keep key-bg distinct from border.
- **Print columns**: Fix text overflow by removing `table-fixed` in print and adding `word-break`/`overflow-wrap` on table cells. Use smaller font size in print.
- **Light theme headers**: Remove accent border-left and background tint from card headers; restore clean flat header styling.

## Capabilities

- `visual-theme`: Fix dark palette for contrast
- `print-pdf`: Fix 2-column print layout so content doesn't overflow

## Impact

- `src/styles/global.css`: Update `.dark` color values; add print-specific table cell styles
- `src/components/LivePreview.tsx`: Remove accent header classes, restore flat headers; add print-specific table cell handling
