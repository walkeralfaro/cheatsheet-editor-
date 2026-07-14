## Context

ShortcutCard currently uses a `<div contentEditable>` for action inline editing. This breaks cursor positioning because React re-renders the div's children on every `setEditAction` call, resetting the cursor to the beginning. The fix is to revert to `<textarea>` (which React handles correctly with `value`/`onChange`) while adding proper auto-resize and cursor-at-end behavior.

## Goals / Non-Goals

**Goals:**
- Revert action edit field from contenteditable div to textarea
- Fix cursor position: always at end when entering edit mode
- Fix auto-resize: textarea height matches content on activation and while typing

**Non-Goals:**
- No changes to keys input or any other component
- No changes to data model or persistence

## Decisions

1. **Revert to `<textarea>`** — React's controlled component model works correctly with `<textarea value={...} onChange={...}>`. No cursor jumping because React preserves the selection range when only the value prop changes without re-creating the DOM node.

2. **Cursor at end via `setSelectionRange`** — In the `useEffect([editingAction])`, after `focus()`, call `setSelectionRange(value.length, value.length)`.

3. **Auto-resize via `useEffect([editAction, editingAction])`** — Already implemented and working. The textarea's `scrollHeight` accurately reflects content height after React commits the new value.

4. **Enter saves, Shift+Enter newline** — `handleActionKeyDown` calls `e.preventDefault()` + `handleSaveAction()` on Enter without Shift. Shift+Enter falls through to default behavior (newline).

## Risks / Trade-offs

- [textarea has distinct visual style] → Acceptable, it matches the expected form field appearance
- [maxLength works natively] → No custom enforcement needed since textarea supports `maxLength` attribute
