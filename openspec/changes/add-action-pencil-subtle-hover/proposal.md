## Why

When editing shortcuts inline, the pencil icon (✎) only appears next to the keys field, not the action field. The user has no visual hint that the action text is clickable for editing. Additionally, the row-level hover background is too broad — each field should have its own subtle hover indicator.

## What Changes

- Add pencil icon (✎) to the action field in ShortcutCard view mode, with the same `opacity-0 group-hover:opacity-100` pattern as the keys field
- Move background hover from the `<tr>` (whole row) to individual `<td>` cells with a more subtle color
- Each field (keys, action) shows its own pencil on hover over that specific cell

## Capabilities

### New Capabilities
*(none)*

### Modified Capabilities
- `inline-editing`: edit pencil now appears in both keys and action columns on hover; hover indication is per-cell not per-row

## Impact

- `src/components/ShortcutCard.tsx` — add pencil button to action cell; replace row-level hover with per-cell subtle hover
