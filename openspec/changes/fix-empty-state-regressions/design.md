## Context

Three regressions were introduced by prior changes:

1. **Dark flash**: `Layout.astro` has an inline script that reads `localStorage.theme` and adds `.dark` before React hydrates. But `App.tsx`'s `darkModeSync` effect runs on every render — including the first one — and calls `document.documentElement.classList.remove('dark')` before the hydrator has restored `darkMode=true`. This produces a visible: dark → light → dark flash.

2. **Empty cheatsheet accumulation**: `fix-first-visit-layout` re-added a save in the hydrator's else branch (no saved data → create default cheatsheet → save it). But on every subsequent refresh with no data, it appends a new empty cheatsheet to the index and persists it. Combine that with autoSave also kicking in on the empty state, and the index grows each refresh.

3. **No new-cheatsheet prompt**: When no saved data exists, the SSR-rendered editor shows an empty form that *looks* editable but its content vanishes on refresh. There's no call-to-action telling the user to create their first cheatsheet.

## Goals / Non-Goals

**Goals:**
- Eliminate the dark → light → dark visual flash on page load
- Stop empty cheatsheets from accumulating in localStorage on refresh
- Show a "Create your first cheatsheet" prompt instead of the editor when no data exists
- Preserve all existing functionality (dark mode toggle, multi-cheatsheet, print, etc.)

**Non-Goals:**
- No changes to the inline script in Layout.astro (it works correctly)
- No changes to the theme toggle logic
- No migration of existing stored data

## Decisions

### D1: Skip first effect run with useRef instead of effect cleanup

**Decision**: Use a `useRef<boolean>(true)` gate in `darkModeSync` — on first render, set the ref to `false` and return early without touching the classList.

**Rationale**:
- The inline script in `Layout.astro` already sets the correct class before paint. The effect should not override it on mount.
- Avoids adding another dependency like `useEffect` order hacks or `useLayoutEffect`.
- Simple, readable, and follows the React docs' own pattern for skipping initial effect runs.

**Alternatives considered**:
- `useLayoutEffect` — would run synchronously after DOM mutations but still run on every render. Wouldn't solve the issue of overriding the inline script's class.
- Removing the inline script and using a blocking script in the head — same approach, different placement. The current inline script is already correct; the problem is the effect undoing it.

### D2: Remove save from hydrator else branch + re-add autoSave guard

**Decision**: Remove the `persistActiveCheatsheet(...)` call from the hydrator's else branch so nothing is saved on first visit. Re-add the autoSave guard `if (cheatsheetList.length === 0) return` to prevent autoSave from persisting an empty state.

**Rationale**:
- The SSR renders a default empty cheatsheet for the initial page load. This is fine as UI state — it should not be persisted until the user explicitly creates a cheatsheet.
- The autoSave guard was removed in `fix-hydration-mismatch` to fix a save timing issue. With the hydrator no longer pre-seeding, the guard is safe to restore.

**Alternatives considered**:
- Keeping the save but deduplicating — adds complexity with no benefit since no save should happen at all on first visit.
- Saving a "new" cheatsheet immediately on the first create action — already handled by `handleNew`.

### D3: Empty-state CTA overlaid on editor

**Decision**: In `App.tsx`, when `cheatsheetList.length === 0` after hydration, render a "Create your first cheatsheet" prompt instead of the editor + preview layout. The prompt should contain a single "New Cheatsheet" button that calls `handleNew`.

**Rationale**:
- Shows a clear action to the user instead of a confusing empty form.
- Reuses the existing `handleNew` action.
- The editor panel should still be rendered when `cheatsheetList.length > 0` even if the active cheatsheet is empty (user may have deleted all sections).

**Alternatives considered**:
- Adding the prompt inside `EditorPanel` — would require passing `cheatsheetList` down and mixing concerns.
- Always rendering the editor with a placeholder message inside it — less prominent CTA.

## Risks / Trade-offs

- **Timing edge case**: If the user opens a new tab and immediately creates a cheatsheet before the hydrator finishes, the autoSave guard could prevent the save. Mitigation: the guard only blocks saves when `cheatsheetList.length === 0`; `handleNew` already creates a new entry in the index, so subsequent autoSaves will pass the guard.
- **Existing users with accumulated empty cheatsheets**: Their index may already contain empty entries. Those will appear as unnamed cheatsheets in the sidebar. Mitigation: this is an existing problem not addressed by this change. Users can delete them manually.

## Open Questions

None.
