## Why

The app currently supports only a single cheatsheet at a time with no ability to create or switch between multiple. The preview render uses a generic card-per-shortcut layout that lacks the compact table-based design common in cheatsheet tools, and the editor inputs don't support multi-line text entry. This limits the app's usefulness for users who want to organize different topics into separate cheatsheets or display shortcuts in a dense, readable format.

## What Changes

- **Multi-cheatsheet management**: Replace the single-cheatsheet model with a collection of named cheatsheets stored under individual localStorage keys. Add a sidebar (hamburger menu) to list, switch, create, rename, and delete cheatsheets. The "New" button creates a new blank cheatsheet instead of resetting the current one.
- **BREAKING**: Cheatsheet data model gains an `id` field. Storage format changes from a single key to an index-based system.
- **New render style (preview only)**: Replace the grid of standalone shortcut cards with section-level cards containing a `<table>` of shortcuts. Each row shows keys and action side by side with hover tooltips and an inline edit button, matching the referenced HTML design.
- **Editor text wrapping**: Change action `<input>` fields to `<textarea>` in both the add-shortcut form and the inline editing mode to support multi-line action descriptions.

## Capabilities

### New Capabilities
- `cheatsheet-manager`: Managing multiple cheatsheets — create, switch, rename, delete, list, and persist a collection of cheatsheets with sidebar navigation.

### Modified Capabilities
- `live-preview`: The preview render changes from per-shortcut cards to section-level cards with inner tables.
- `form-editor`: The add-shortcut form's action input changes from `<input>` to `<textarea>`.
- `inline-editing`: The inline edit mode's action input changes from `<input>` to `<textarea>`, and the display renders multi-line text.
- `local-persistence`: Storage model changes from single-key to indexed multi-key persistence.

## Impact

- **Data model**: `Cheatsheet` interface gets an `id` field; new `CheatsheetMeta` type added.
- **Reducer**: New actions for multi-cheatsheet operations; `RESET` action removed.
- **Storage**: New `loadCheatsheetList`, `saveCheatsheetList`, `loadCheatsheetById`, `saveCheatsheetById`, `deleteCheatsheetById` functions; existing `clearCheatsheet` removed.
- **Components**: New `CheatsheetSidebar` component; `Toolbar` gets hamburger button and loses "New" button; `LivePreview` and `ShortcutCard` reworked for table-based render; `AddShortcutForm` and `ShortcutCard` edit mode use `<textarea>` for action.
