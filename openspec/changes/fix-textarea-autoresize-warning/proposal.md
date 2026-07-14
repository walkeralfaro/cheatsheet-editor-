## Why

The action textarea in ShortcutCard has two issues: (1) it triggers a browser console warning because it lacks `name`/`id` attributes, and (2) its auto-resize to content height doesn't work on first activation or during typing, making it look awkward when the action text is short. The keys input has the same attribute warning.

## What Changes

- Add `name` and `id` attributes to the action textarea and keys input in `ShortcutCard.tsx`
- Fix the auto-resize mechanism for the action textarea so it always matches content height:
  - Replace `onInput`-based resize with a `useEffect` that triggers on `editAction` changes
  - Call resize when editing is first activated (already done)
- Keep `<textarea>` over `<input>` since `<input>` does not support line breaks

## Capabilities

### New Capabilities

- `fix-form-field-warnings`: Browser console warnings for missing `name`/`id` on form fields are eliminated
- `fix-textarea-autoresize`: Action textarea dynamically resizes to match content height on activation and during typing

### Modified Capabilities

*(none)*

## Impact

- `src/components/ShortcutCard.tsx` only — no other files affected
