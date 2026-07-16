## 1. Dependencies

- [x] 1.1 Install `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`.

## 2. Data layer

- [x] 2.1 Add `RENAME_SECTION` and `REORDER_SECTIONS` to `CheatsheetAction` in `src/lib/types.ts`.
- [x] 2.2 Handle both actions in `src/lib/reducer.ts` (rename maps name; reorder splice-moves, ids unchanged).

## 3. Store

- [x] 3.1 Add `renameSection(sectionId, name)` and `reorderSections(fromIndex, toIndex)` to the interface and implementation in `src/store/useAppStore.ts`.

## 4. Editor UI

- [x] 4.1 In `src/components/SectionList.tsx`, add inline rename (click-to-edit, commit on Enter/blur, Escape cancels).
- [x] 4.2 Wrap the list in `DndContext` + `SortableContext`; make each card `useSortable` with a dedicated drag handle; call `reorderSections` on drag end.

## 5. Verification

- [x] 5.1 `npm run build` passes (tsc + vite).
- [x] 5.2 `npm run preview`: rename persists; drag reorders editor and live preview follows; collapse/delete/active-section still work.
- [x] 5.3 `openspec validate --specs` passes.
