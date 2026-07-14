## Why

The action textarea has layout issues: it starts with a fixed height that doesn't match short content, and its resize handle and multi-line border make it look different from a standard input field. Replacing it with a contenteditable div styled as an input gives a cleaner, more uniform look while preserving multi-line support and auto-growing behavior.

## What Changes

- Replace the `<textarea>` in ShortcutCard's action edit mode with a `<div contenteditable="true">`
- Style the div to look like a standard input (border, background, no resize handle)
- Auto-grow the div to match content height on activation and while typing
- Handle keyboard: Enter saves, Shift+Enter inserts a newline (or vice versa — match the current behavior where Enter saves)
- Read content from `innerText` instead of `value`

## Capabilities

### New Capabilities

- `contenteditable-action-input`: Action field uses a contenteditable div styled as an input, supporting line breaks and auto-grow

### Modified Capabilities

- `inline-editing`: Update the spec to reflect that action editing uses a contenteditable div instead of a `<textarea>`

## Impact

- `src/components/ShortcardCard.tsx` — textarea replaced with contenteditable div
- `openspec/specs/inline-editing/spec.md` — delta spec for the change from textarea to contenteditable
