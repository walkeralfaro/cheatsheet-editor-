## 1. Dark Theme Color Refinement

- [x] 1.1 Update `.dark` CSS variables in `global.css` to match design reference: surface `#161b22`, border `#30363d`, text `#e2e8f0`, 10px border-radius
- [x] 1.2 Add accent color classes (`.card-header.green`, `.blue`, `.purple`, `.orange`, `.teal`) with CSS variable-based colors for light/dark support

## 2. Accent Headers in LivePreview

- [x] 2.1 Update `LivePreview.tsx` to cycle accent color classes on section card headers based on `sectionIndex % 5`

## 3. Print 2 Columns

- [x] 3.1 Add `column-count: 2` and `break-inside: avoid` to `.print-area` in `@media print` section of `global.css`
