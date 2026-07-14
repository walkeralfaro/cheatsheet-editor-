## 1. Revert to Textarea with Fixes

- [x] 1.1 Change `actionRef` type from `HTMLDivElement` back to `HTMLTextAreaElement`
- [x] 1.2 Replace contenteditable div JSX with `<textarea>` using `value={editAction}`, `onChange`, `maxLength={30}`, `name`, `id`
- [x] 1.3 Restore `handleActionKeyDown`: Enter saves (preventDefault), Escape cancels
- [x] 1.4 Add cursor-at-end in `useEffect([editingAction])`: `setSelectionRange(value.length, value.length)`
- [x] 1.5 Remove `onInput`, `onPaste`, `suppressContentEditableWarning` from JSX

## 2. Auto-Resize

- [x] 2.1 Change `autoResize` back to `HTMLTextAreaElement`
- [x] 2.2 Verify `useEffect([editAction, editingAction])` calls `autoResize` (already wired)

## 3. Cleanup and Verify

- [x] 3.1 Verify no broken imports or unused handlers
- [x] 3.2 Run `npm run build` and confirm no errors
