## 1. Fix Dark Theme Colors

- [x] 1.1 Update `.dark` CSS variables in `global.css` to slate-based palette with proper contrast (`#1e293b` surface, `#334155` surface-alt, `#475569` border, `#f1f5f9` text)

## 2. Fix Print 2-Column Layout

- [x] 2.1 Add print-specific CSS in `global.css`: override `table-fixed` to `table-auto`, add `word-break: break-word` and `overflow-wrap: break-word` on table cells, reduce font size
- [x] 2.2 Update `LivePreview.tsx`: remove `table-fixed` class and add print-friendly wrapping on table cells

## 3. Restore Clean Light Theme Headers

- [x] 3.1 Remove `card-header-*` accent classes from `LivePreview.tsx` section headers; restore plain `bg-surface-alt` styling
