## Context

The ShortcutCard component uses a `<textarea>` for inline editing of action text. It currently uses `onInput` to trigger `autoResize`, but this doesn't work reliably because React's controlled component model means the DOM value hasn't updated yet when `onInput` fires. Additionally, the textarea and the keys `<input>` lack `name`/`id` attributes, triggering browser console warnings about form field accessibility.

## Goals / Non-Goals

**Goals:**
- Eliminate browser console warning: "A form field element has neither an id nor a name attribute"
- Make the action textarea reliably auto-resize to content height on activation and while typing
- Keep the textarea as the input type (supports multi-line content)

**Non-Goals:**
- No changes to keys input behavior or form factor
- No changes to shortcut data model or persistence

## Decisions

1. **Use `useEffect` for auto-resize instead of `onInput`** — React's controlled `value` prop means the DOM is updated after the render triggered by `setEditAction`. A `useEffect` watching `editAction` fires after the DOM reflects the new value, so `scrollHeight` is accurate. The `onInput` approach reads stale DOM values because React hasn't committed the new value yet.

2. **Use `name="action"` and `id="action-<shortcut.id>"` on textarea; `name="keys"` and `id="keys-<shortcut.id>"` on input** — Using `shortcut.id` ensures unique IDs per row. The `name` attribute resolves the browser warning; the `id` matches the `name` convention with a unique suffix.

## Risks / Trade-offs

- Auto-resize could cause layout shifts during typing, but since the textarea is inside a table cell which naturally grows, this is acceptable.
- Using `shortcut.id` in the `id` attribute is safe since IDs only need to be unique in the DOM, not persistent across page loads.
