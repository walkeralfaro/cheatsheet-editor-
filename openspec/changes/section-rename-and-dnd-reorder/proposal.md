## Why

The editor lets users add and delete sections but offers no way to rename them (the name is a static, non-editable button) and no way to reorder them. Section ordering is only creation-order, and the live preview follows the array order. Users need to fix typos in section names and arrange sections in a meaningful order without deleting/re-adding.

## What Changes

- Add inline renaming of section names in the editor's section list.
- Add drag-and-drop reordering of sections in the editor (not in the live preview) using `@dnd-kit`, updating the section array order so the live preview reflects the new order.
- Section ids remain stable on reorder (order is positional in the array; ids are not sort keys). `activeSectionId` stays valid.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `form-editor`: add requirements for renaming a section and for drag-and-drop reordering of sections.

## Impact

- Dependencies: add `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` (React 19 compatible; peers satisfied).
- `src/lib/types.ts`: add `RENAME_SECTION` and `REORDER_SECTIONS` to `CheatsheetAction`.
- `src/lib/reducer.ts`: handle both new actions (reorder = splice-move, ids unchanged).
- `src/store/useAppStore.ts`: add `renameSection(sectionId, name)` and `reorderSections(fromIndex, toIndex)`.
- `src/components/SectionList.tsx`: inline rename UI + `DndContext`/`SortableContext` with a drag handle.
- `LivePreview` and `EditorPanel` need no changes — they render `sections` in array order.
