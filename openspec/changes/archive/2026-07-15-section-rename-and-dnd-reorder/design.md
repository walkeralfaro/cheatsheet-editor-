## Context

Sections are `{ id, name, shortcuts[] }` rendered in array order by both `SectionList` (editor) and `LivePreview`. Order is positional; ids are stable identifiers referenced by `activeSectionId`. No drag-and-drop library is currently installed.

## Goals / Non-Goals

**Goals:**
- Inline rename of section names via the existing `applyToActive` reducer flow.
- Accessible drag-and-drop reorder in the editor using `@dnd-kit`.
- Keep `LivePreview` automatically in sync (it reads the same array).

**Non-Goals:**
- No reordering in the live preview (pinned in the editor only).
- No id regeneration on reorder (ids are not sort keys; regenerating would orphan `activeSectionId`).

## Decisions

- **@dnd-kit over native DnD**: `@dnd-kit/core` + `@dnd-kit/sortable` + `@dnd-kit/utilities` give keyboard a11y, sensors, and animation with minimal code; native HTML5 DnD is fiddly and not accessible. Peers (`react >=16.8.0`) are satisfied by React 19.
- **Dedicated drag handle (⠿)**: attach `listeners`/`attributes` only to a handle so it doesn't conflict with the collapse toggle, name edit, and delete button.
- **Positional reorder via `REORDER_SECTIONS { fromIndex, toIndex }`**: reducer splices the array. Ids unchanged → `activeSectionId` and shortcut references remain valid.
- **Inline rename via `RENAME_SECTION { sectionId, name }`**: commit on Enter/blur, cancel on Escape; empty/whitespace ignored.

## Risks / Trade-offs

- [Risk] `@dnd-kit` adds 3 deps (~small). → Mitigated: tree-shakeable, React 19 compatible, widely used.
- [Risk] Drag handle overlapping collapse/delete clicks. → Mitigated: handle is a separate button; only it carries drag listeners.
