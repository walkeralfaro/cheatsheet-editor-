## Why

Currently, the add-shortcut form is rendered only when a section is active, but there is no explicit guard preventing shortcut creation when no section exists. If the active section is removed or none was selected, the form should be hidden and the user should be guided to select or create a section first.

## What Changes

- Add explicit validation: shortcuts can only be submitted when a section is selected
- Hide the add-shortcut form when no section is active
- Show a helpful message guiding the user to select or create a section
- Ensure removing the active section resets the selection state

## Capabilities

### New Capabilities

none

### Modified Capabilities
- `form-editor`: Add requirement that shortcuts must have an active section to be created; form must be hidden or disabled when no section is selected

## Impact

- Affects `EditorPanel.tsx`, `AddShortcutForm.tsx`, `App.tsx` in `src/components/`
- No new dependencies
- No breaking changes to the data model
