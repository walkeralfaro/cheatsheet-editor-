## Why

The contenteditable div introduced in `replace-action-textarea-with-input` causes the cursor to jump to the start of the text on every keystroke, making typing unusable (text appears in reverse). Reverting to `<textarea>` with two key fixes — auto-resize matching content height and cursor positioned at the end on activation — solves both the original textarea issues cleanly.

## What Changes

- Replace `<div contentEditable>` back to `<textarea>` in ShortcutCard's action edit mode
- Fix auto-resize: use `useEffect` watching `editAction` (already in place)
- Fix cursor position: set `setSelectionRange(len, len)` when entering edit mode
- Restore `value`/`onChange` controlled pattern with `maxLength={30}`
- Remove `onInput`, `onPaste`, and `suppressContentEditableWarning` (textarea-specific)
- Simplify `handleActionKeyDown`: Enter saves + Escape cancels (textarea handles Shift+Enter natively)

## Capabilities

### New Capabilities
*(none — reverting and fixing capabilities already covered by existing specs)*

### Modified Capabilities
- `inline-editing`: Delta spec updates action field requirement back to `<textarea>`

## Impact

- `src/components/ShortcutCard.tsx` only
