## Context

The ShortcutCard component currently uses a `<textarea>` for inline action editing. This triggers an auto-resize mechanism to match content height, but the textarea's visual appearance (resize handle, multi-line border, fixed starting height) differs from the keys `<input>` and creates an inconsistent editing experience. The user wants an input-like field that supports line breaks and grows with content.

## Goals / Non-Goals

**Goals:**
- Replace `<textarea>` with a `<div contenteditable="true">` styled as a standard input
- Support multi-line content (Shift+Enter for newline)
- Auto-grow to match content height on activation and while typing
- Save on blur or Enter; cancel on Escape
- Keep same maxLength constraint (30 chars)

**Non-Goals:**
- No changes to the keys input or any other part of ShortcutCard
- No changes to the data model or persistence layer

## Decisions

1. **Use `<div contenteditable="true">` instead of `<textarea>`** — A native `<input>` cannot display line breaks. `<textarea>` has a distinct visual style (three-dimensional border, resize handle, monospace default) that differs from the keys input. A contenteditable div is fully styleable to match the input exactly.

2. **Enter saves, Shift+Enter inserts newline** — Matches the current behavior where Enter in the textarea saves the action. Shift+Enter provides the newline escape hatch.

3. **Content read via `innerText`** — React's controlled component pattern doesn't work directly with contenteditable. Instead, read `innerText` on save. The edit state (`editAction`) is updated via `onInput` events reading `e.currentTarget.innerText`.

4. **Auto-resize using `scrollHeight`** — Same technique as the textarea: set height to "auto", then to `scrollHeight + "px"`. Works on any block element with content.

5. **MaxLength enforcement** — Since contenteditable doesn't support `maxLength`, enforce via `onInput` by truncating `innerText` to 30 characters when exceeded.

6. **Styled as input** — Use same border, border-radius, background, padding, and font-size as the keys input. Remove `resize` (not applicable), add `overflow-hidden`.

## Risks / Trade-offs

- [Contenteditable is not a form control] → No `name`/`id` for form autofill. Acceptable since this is an inline editor, not a form.
- [Paste can insert HTML] → Read `innerText` (strips HTML) on save. Also handle paste event to insert plain text.
- [Caret position can be lost during resize] → Save and restore selection before/after resize. Mitigated by only resizing when content changes, not on every frame.
