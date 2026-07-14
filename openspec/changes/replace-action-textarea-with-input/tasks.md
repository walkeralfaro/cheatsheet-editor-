## 1. Replace Action Textarea with Contenteditable Div

- [x] 1.1 Change `actionRef` type from `HTMLTextAreaElement` to `HTMLDivElement` and update the ref assignment in JSX
- [x] 1.2 Replace the `<textarea>` JSX with a `<div contenteditable="true">` using the same styling classes as the keys input (border, bg, padding, font, rounded, focus ring)
- [x] 1.3 Add `onInput` handler that reads `e.currentTarget.innerText` and calls `setEditAction`
- [x] 1.4 Add `onKeyDown` that saves on Enter (preventDefault + handleSaveAction) and inserts newline on Shift+Enter
- [x] 1.5 Add `onBlur` handler that saves (reuse `handleSaveAction`)
- [x] 1.6 Add paste handler that strips HTML (`e.preventDefault()`, insert plain text from clipboard)

## 2. Auto-Resize and MaxLength

- [x] 2.1 Update `autoResize` to work with `HTMLDivElement` (same logic: height = "auto", then scrollHeight)
- [x] 2.2 Add maxLength enforcement in the `onInput` handler: if `innerText.length > 30`, truncate and restore cursor position
- [x] 2.3 Ensure the existing `useEffect` watching `editAction` calls `autoResize` (already wired for the new ref type)

## 3. Cleanup and Verification

- [x] 3.1 Remove the `maxLength` prop (not supported on divs) and `onInput` from the old textarea code
- [x] 3.2 Run `npm run build` and confirm no errors
- [ ] 3.3 Open browser and verify: click action → contenteditable div appears, Enter saves, Shift+Enter inserts newline, div auto-grows, paste strips HTML
