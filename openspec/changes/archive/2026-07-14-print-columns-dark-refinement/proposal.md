## Why

The dark theme uses generic slate colors that don't match the refined design reference in `openspec/specs/design/card_dark*.html`. The print output wastes space by using a single column in portrait — shortening a table-based cheatsheet into 2 columns would be more compact and readable.

## What Changes

- **Dark theme refinement**: Update `.dark` CSS variables to match the design reference (`#161b22` for surface, `#30363d` for border, `#e2e8f0` for text, 10px border-radius). Add per-section accent color classes (green, blue, purple, orange, etc.) on card headers that cycle by section index.
- **Print 2 columns**: Add `column-count: 2` (CSS multi-column) to the `.print-area` in `@media print`. Use `break-inside: avoid` on section cards to keep each card intact. Keep portrait orientation.

## Capabilities

### New Capabilities
(none)

### Modified Capabilities
- `visual-theme`: Dark color palette requirement updated to match design reference colors; new requirement for section accent header colors.
- `print-pdf`: New requirement for compact 2-column print layout.

## Impact

- `src/styles/global.css`: Update `.dark` color values; add `.card-header.green`, `.card-header.blue`, etc. classes; add print 2-column CSS
- `src/components/LivePreview.tsx`: Cycle accent color classes on section card headers based on section index
- `openspec/specs/visual-theme/spec.md`: Updated palette + accent headers requirement
- `openspec/specs/print-pdf/spec.md`: Added 2-column print requirement
