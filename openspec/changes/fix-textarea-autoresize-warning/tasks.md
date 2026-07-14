## 1. Form Field Attributes

- [x] 1.1 Add `name="keys"` and `id="keys-{shortcut.id}"` to the keys `<input>` in ShortcutCard.tsx
- [x] 1.2 Add `name="action"` and `id="action-{shortcut.id}"` to the action `<textarea>` in ShortcutCard.tsx

## 2. Textarea Auto-Resize

- [x] 2.1 Replace `onInput` handler on the textarea with a `useEffect` watching `editAction` that calls `autoResize`
- [x] 2.2 Ensure the existing `useEffect` for `editingAction` already calls `autoResize` on activation

## 3. Verification

- [x] 3.1 Run `npm run build` and confirm no errors
- [ ] 3.2 Open the browser, verify no console warning about missing name/id
- [ ] 3.3 Click an action field to edit: textarea should match content height
- [ ] 3.4 Type in the action textarea: height should grow/shrink with content
- [ ] 3.5 Verify keys input still works: click to edit, blur saves, Escape cancels
