## Context

The previous UX fix (`fix-ux-bugs`) introduced regressions: the mobile editor toggle hid the toolbar with the editor (making the toggle unreachable), print styles used `position: absolute` which prevents natural pagination, inline editing would save prematurely when tabbing from keys to action, and character limits were too generous.

## Goals / Non-Goals

**Goals:**
- Mobile toggle button always visible (toolbar outside hidden container)
- PDF print generates multiple pages naturally
- Inline editing allows editing both keys and action
- Character limits: 15 for keys, 30 for action

**Non-Goals:**
- No new features
- No changes to the data model

## Decisions

1. **Toolbar always visible** — Move the Toolbar outside the editor container. Only the EditorPanel div gets `hidden`/`block` toggling on mobile. On desktop (lg+), the editor is always visible regardless of state.

2. **Print without position:absolute** — Remove `position: absolute` from `.print-area` in print CSS. Instead use `overflow: visible` and let the browser paginate naturally. The print area is already the main content area.

3. **Remove onBlur from keys input** — Only the action (second) input has `onBlur={handleSave}`. The keys input uses Enter to move focus to action, Escape to cancel. This lets the user edit both fields without premature save.

4. **Adjust maxLength** — Keys: 15 characters. Action: 30 characters.

## Risks / Trade-offs

- **Print without position:absolute** — May cause slight visual differences in print preview, but enables multi-page PDFs which is the primary goal.
