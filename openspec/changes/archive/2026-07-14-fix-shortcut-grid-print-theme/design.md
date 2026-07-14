## Context

Three issues exist in the current codebase:

1. **ShortcutCard inline editing**: The component uses a single `editing` boolean. When editing, both key input and action textarea render simultaneously. The key input lacks `onBlur`, so clicking outside the row keeps edit mode active. The `inline-editing` spec even documents "Blur from keys input does not save" as intended behavior, but the user wants per-field independent editing with save-on-blur for both fields.

2. **CSS Columns ordering**: `LivePreview.tsx` uses `columns-1 md:columns-2` which flows items top-to-bottom, left-to-right (column-major). Sections with IDs [1,2,3,4] render as col1: [1,3], col2: [2,4]. The user wants row-major order (col1: [1,2], col2: [3,4]) matching DOM order.

3. **Print theme and order**: The `@media print` block uses `column-count: 2` which is column-major and doesn't match the new grid ordering. It also lacks `print-color-adjust: exact`, so browsers strip theme background colors in print.

## Goals / Non-Goals

**Goals:**
- Each ShortcutCard field (keys, action) is independently editable with its own blur handler
- Section cards render in row-major order (by ID) with natural heights
- Print output matches screen row-major order
- Print output preserves dark/light theme colors
- Blur on any editing field saves and exits edit mode

**Non-Goals:**
- No changes to reducer or data model
- No JavaScript masonry libraries
- No changes to toolbar, sidebar, or editor panel

## Decisions

### D1: Independent editing states per field

**Decision**: Replace single `editing` boolean with `editingKey` and `editingAction` separate states. Each has its own `onBlur` handler that saves just that field.

**Rationale**:
- Clicking the keys area only activates the key input; clicking action only activates the action textarea
- Blur on either field saves independently and exits that field's edit mode
- Tab navigation moves between fields naturally (focus management)
- More intuitive UX than toggling both fields at once

**Alternatives considered**:
- Single `editing` state with `onBlur` on both inputs — simpler but forces both fields into edit mode together
- Click-to-edit with a save button — more explicit but adds UI chrome

### D2: CSS Grid with `items-start` for row-major ordering

**Decision**: Replace `columns-1 md:columns-2` with `grid grid-cols-1 items-start gap-6 md:grid-cols-2`. Each card uses default grid placement which flows left-to-right, top-to-bottom.

**Rationale**:
- CSS Grid places items in row-major order (first item fills column 1, second fills column 2, third wraps to next row)
- `items-start` prevents cards from stretching to equal row heights (each card is at its natural height)
- Order matches DOM order = ascending section ID
- Existing `gap-6` preserves spacing

**Alternatives considered**:
- `flex-flow: row wrap` — items would flow in row-major but each item needs exact width calc (50% minus gap)
- Keeping CSS Columns — column-major ordering doesn't match user's requirement

### D3: Print uses grid + `print-color-adjust`

**Decision**: Replace `column-count: 2` in `@media print` with `display: grid; grid-template-columns: 1fr 1fr; gap: 1rem` on the section container. Add `print-color-adjust: exact` to `.print-area` and `.print-area *`.

**Rationale**:
- Grid in print matches screen row-major order
- `print-color-adjust: exact` forces browsers to render background colors (like dark theme) in print output
- Existing `break-inside: avoid` on cards prevents column splits

**Alternatives considered**:
- Keeping `column-count` — would be column-major, not matching screen
- Only adding `print-color-adjust` without the grid change — screen and print would still have different ordering

## Risks / Trade-offs

- **Grid items-start spacing**: In grid with `items-start`, cards in the same row start at the top of their cell. If one card is very tall and its sibling is short, empty space appears below the short card before the next row. This is acceptable for a row-major layout and is the expected behavior.
- **Print compatibility**: Some browsers handle `print-color-adjust` differently. Mitigation: use both `print-color-adjust` and `-webkit-print-color-adjust` for maximum compatibility.
- **Tab order in edit mode**: With independent editing, Tab from keys moves to action, Tab again moves to next focusable element outside the row. This is standard browser behavior and acceptable.

## Open Questions

None.
