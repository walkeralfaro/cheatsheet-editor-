## 1. Fix dark flash with inline background-color

- [x] 1.1 In `Layout.astro`, update the inline script to also set `document.documentElement.style.backgroundColor` to `"#0c0a09"` (dark) or `"#fafaf9"` (light); also added `min-h-screen` to body
- [ ] 1.2 Verify in browser: refresh with dark mode enabled → background is dark on first paint, no white flash

## 2. Convert grid to masonry layout in LivePreview

- [x] 2.1 In `LivePreview.tsx`, replace the outer `<div className="grid ...">` with `<div className="columns-1 md:columns-2 gap-6">`
- [x] 2.2 Add `break-inside-avoid-column` to each section card's `<div>` to prevent column splitting
- [ ] 2.3 Verify in browser: cards with different content heights render at their natural heights in 2 columns

## 3. Verify print preserves masonry order

- [x] 3.1 Check that `@media print` in `global.css` — the existing `column-count: 2` and `break-inside: avoid` rules already match the masonry layout (cards also have `break-inside-avoid-column` Tailwind class)
- [ ] 3.2 Test print preview: section cards appear in the same 2-column order as the screen layout

## 4. Verify no regressions

- [x] 4.1 Run `npm run build` and confirm no type/build errors
- [ ] 4.2 Manual check: toggle dark mode works, auto-save works, multi-cheatsheet switching works
