## 1. Refactor ShortcutCard to independent per-field editing

- [x] 1.1 Replace single `editing` state with `editingKey` and `editingAction` in `ShortcutCard.tsx`
- [x] 1.2 Add click handlers: click on keys cell → `setEditingKey(true)`, click on action cell → `setEditingAction(true)`
- [x] 1.3 Add `onBlur={handleSaveKey}` on the keys input and `onBlur={handleSaveAction}` on the action textarea
- [ ] 1.4 Verify: clicking keys edits only keys, clicking action edits only action, blur saves independently

## 2. Convert LivePreview to CSS Grid row-major ordering

- [x] 2.1 In `LivePreview.tsx`, replace `columns-1 md:columns-2` with `grid grid-cols-1 items-start gap-6 md:grid-cols-2`
- [x] 2.2 Remove `mb-6 break-inside-avoid-column` from each section card
- [ ] 2.3 Verify: sections display in row-major order (left-to-right, top-to-bottom) with natural heights

## 3. Update print CSS for grid layout and theme colors

- [x] 3.1 Remove `column-count: 2` and `column-gap: 1rem` from `.print-area` in `@media print`
- [x] 3.2 Add `.print-area .grid` rules with `grid-template-columns: 1fr 1fr` for row-major print; add `grid-column: 1 / -1` to h2; `break-inside: avoid` to grid children; removed old `> div > div` selector
- [x] 3.3 Add `print-color-adjust: exact` and `-webkit-print-color-adjust: exact` to `.print-area, .print-area *`
- [ ] 3.4 Verify print preview: 2-column row-major layout with theme colors preserved

## 4. Verify no regressions

- [x] 4.1 Run `npm run build` and confirm no type/build errors
- [ ] 4.2 Manual check: toggle dark mode, inline editing, auto-save, multi-cheatsheet switching, print preview
