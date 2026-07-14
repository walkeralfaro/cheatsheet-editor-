## 1. Fix first-visit persistence

- [x] 1.1 Re-add `saveCheatsheetById(cheatsheet)` + `saveCheatsheetList([meta])` + `setActiveCheatsheetId(cheatsheet.id)` in hydrator else branch in `App.tsx`
- [x] 1.2 Remove the `if (cheatsheetList.length === 0) return;` guard from autoSave in `App.tsx`

## 2. Fix dark mode FOUC

- [x] 2.1 Add inline `<script>` in `src/layouts/Layout.astro` that reads `localStorage.theme` and applies `classList.add('dark')` on `<html>` before first paint

## 3. Desktop 2-column layout

- [x] 3.1 Change section container in `LivePreview.tsx` from `flex flex-col gap-6` to `grid grid-cols-1 gap-6 md:grid-cols-2`

## 4. Fix PDF title column span

- [x] 4.1 Add `.print-area h2 { column-span: all; }` to the `@media print` block in `global.css`

## 5. Verify

- [x] 5.1 Run `npm run build` and confirm no errors
- [ ] 5.2 Run `npm run dev`: clear localStorage, refresh, confirm no empty cheatsheets accumulate on repeated refreshes
- [ ] 5.3 Toggle dark mode, refresh — confirm NO light flash (inline script applies class before paint)
- [ ] 5.4 Add 4+ sections on desktop — confirm they flow in 2-column grid
- [ ] 5.5 Print PDF (or `Ctrl+P`) — confirm title spans full width, sections in 2 columns below
