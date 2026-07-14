## Why

The current code uses `class` instead of `className` in React components, which is invalid JSX and produces React warnings. Additionally, several UX bugs affect mobile usability, text overflow in preview cards, input validation limits, inline editing behavior, and print pagination. These need to be fixed for a polished user experience.

## What Changes

- Replace `class` with `className` in all React `.tsx` components (9 files)
- Add `maxLength` validation to shortcut keys and action inputs
- Fix text overflow in preview cards by adding `break-words` wrapping
- Fix inline editing: only save on Enter when focus is on the last input, not the first
- Fix mobile scroll by removing `overflow-hidden` on the main container
- Add mobile/tablet toggle button to hide/show the editor panel
- Remove `page-break-inside: avoid` on sections for natural print pagination

## Capabilities

### New Capabilities
- `mobile-layout`: Collapsible editor panel on mobile/tablet, scroll fixes

### Modified Capabilities
- `form-editor`: Add maxLength validation on shortcut inputs
- `live-preview`: Add text overflow protection on shortcut cards
- `inline-editing`: Fix save-on-Enter behavior (only save from last input)
- `print-pdf`: Remove page-break avoidance for natural pagination

## Impact

- 9 React components: `class` → `className` rename
- `App.tsx`: layout changes for mobile scroll and editor toggle
- `ShortcutCard.tsx`: inline editing fix and overflow protection
- `AddShortcutForm.tsx` + `ShortcutCard.tsx`: maxLength on inputs
- `global.css`: print pagination fix
- No new dependencies
- No breaking changes to the data model
