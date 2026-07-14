## Context

`ShortcutCard.tsx` currently shows a pencil icon only next to the keys field. The action field appears as plain text with no visual indicator that it's clickable for editing. Additionally, the entire row background changes on hover via `hover:bg-surface-alt` on the `<tr>`, which is too broad — the user expects a subtle indicator on each field individually.

## Goals / Non-Goals

**Goals:**
- Show pencil icon (✎) next to the action field in view mode, same pattern as keys field
- Hover indication is per-cell (keys cell, action cell) rather than per-row
- Each cell shows its pencil only when hovered over that specific cell
- Hover background change is subtle and confined to the cell

**Non-Goals:**
- No changes to edit logic, save/blur behavior, or keyboard handling
- No changes to the keys pencil (already works correctly)
- No changes to reducer or data model

## Decisions

### D1: Same pencil pattern for action as keys

**Decision**: Replicate the existing pencil markup in the action cell's view mode: `<button>✎</button>` with `opacity-0 group-hover:opacity-100 transition-opacity`.

**Rationale**: Consistent UX — both fields have identical edit affordances. The group class on the parent `<tr>` makes both pencils appear together when hovering any part of the row, which is the desired behavior.

### D2: Per-cell subtle hover instead of row hover

**Decision**: Remove `hover:bg-surface-alt` from the `<tr>`. Add `hover:bg-surface-alt/50` (50% opacity) to each `<td>` cell individually.

**Rationale**: Per-cell hover is more precise — only the cell being hovered changes background. Using 50% opacity of the existing alt color makes the change very subtle (barely perceptible), matching the user's request for "muy sutil."

**Alternatives considered**:
- Keeping row-level hover with lighter color — still too broad for the user's intent
- No hover background at all — would lose the interactive cue, making it unclear that cells are clickable

## Risks / Trade-offs

- **Group hover class**: Both pencils appear on hover over either cell. This is acceptable since the pencils signal which fields are editable regardless of which cell is hovered.
- **Opacity math**: Tailwind v4 handles `bg-surface-alt/50` natively. If the token doesn't support opacity modifiers, a custom class with `rgba()` fallback may be needed.

## Open Questions

None.
