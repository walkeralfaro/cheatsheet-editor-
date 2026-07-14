## Why

The previous UX fix introduced regressions: the mobile editor toggle is broken because the toolbar is hidden along with the editor, print pagination still doesn't work due to `position: absolute` in print CSS, inline editing doesn't allow modifying the action (onBlur on keys input saves prematurely), and character limits are too permissive.

## What Changes

- Move Toolbar outside the hidden/visible container so the toggle button is always accessible
- Only toggle EditorPanel visibility, not the entire wrapper including Toolbar
- Remove `position: absolute` from print styles to allow natural page breaks
- Change `page-break-inside` to `auto` for proper multi-page PDF
- Remove `onBlur={handleSave}` from keys input in ShortcutCard (keeps editing open for action)
- Change maxLength: keys → 15, action → 30

## Capabilities

### New Capabilities

none

### Modified Capabilities
- `mobile-layout`: Fix editor toggle (Toolbar outside hidden container)
- `print-pdf`: Fix pagination (remove position:absolute from print styles)
- `inline-editing`: Fix action editing (remove premature onBlur on keys)
- `form-editor`: Fix character limits (15/30)

## Impact

- `App.tsx`: restructure layout — Toolbar always visible, only EditorPanel toggles
- `Toolbar.tsx`: no changes needed
- `ShortcutCard.tsx`: remove `onBlur` from keys input, update maxLength values
- `AddShortcutForm.tsx`: update maxLength values
- `global.css`: remove `position: absolute` from print styles
