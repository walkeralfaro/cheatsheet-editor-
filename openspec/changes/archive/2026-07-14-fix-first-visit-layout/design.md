## Context

Four issues surfaced after the hydration fix. Three are visual/layout (dark flash, desktop columns, PDF title), one is a logic regression (first-visit save was removed, leaving edits unpersisted).

## Goals / Non-Goals

**Goals:**
- First visit: persist the initial empty cheatsheet so edits survive refresh
- Dark mode: no FOUC (flash of wrong theme) on page load
- Desktop: sections display in 2-column grid (fill left then right)
- Print PDF: title spans both columns, sections flow below

**Non-Goals:**
- No changes to the toggle mechanism, localStorage persistence strategy, or data model
- No changes to mobile single-column layout
- No changes to the editor or inline editing

## Decisions

### Decision: Inline script for dark mode (FOUC fix)
- **Chosen**: Synchronous `<script>` in HTML `<head>` that reads `localStorage.theme` and toggles `classList` on `<html>` before any paint
- **Rationale**: Must run before React hydrates, before CSSOM is fully constructed, and before the first paint. Inline scripts in `<head>` are the only reliable way to prevent a flash
- **Alternatives**: `@media (prefers-color-scheme: dark)` — doesn't reflect user's manual toggle; `client:visible` or similar — too late, flash already happened

### Decision: CSS Grid for desktop 2-column sections
- **Chosen**: `grid grid-cols-1 gap-6 md:grid-cols-2` on the section container
- **Rationale**: More predictable than CSS multi-column (`columns-2`). Each section stays in its own grid cell, items flow in row order (1→left, 2→right, 3→below-left, 4→below-right). `break-inside` not needed since grid doesn't split cells
- **Alternatives**: `columns-2` — items can split between columns; `flex flex-wrap` — less control over fill order

### Decision: `column-span` for PDF title
- **Chosen**: `column-span: all` on `.print-area h2` in the print CSS
- **Rationale**: The existing print CSS uses `column-count: 2` on `.print-area`. Adding `column-span: all` to the title pulls it out of the multi-column flow, making it full-width above the 2-column sections
- **Risk**: `column-span` interacts poorly with deeply nested wrappers (LivePreview's inner divs). If it fails, restructure so the title is a direct child of the multicol container

### Decision: Re-add initial save in hydrator
- **Chosen**: In hydrator's else branch, save the empty cheatsheet and create the index entry
- **Rationale**: AutoSave has a debounce and depends on list state. By saving in hydrator (which runs once, immediately after mount), the index exists before any user interaction. AutoSave then picks up changes normally. The previous bug was caused by autoSave running BEFORE hydrator set the list — now hydrator runs first
- **Trade-off**: One empty cheatsheet is persisted on first visit. This matches user expectation (they can edit it and the changes persist)

## Risks / Trade-offs

- [Empty cheatsheet on first visit] → Persisted once. User edits it, autoSave saves changes. Refresh loads the same cheatsheet. No accumulation because hydrator's else branch only runs when `loadCheatsheetList()` returns empty.
- [Grid on mobile] → `grid-cols-1` keeps single column on mobile. `md:grid-cols-2` kicks in at 768px.
- [column-span browser support] → Chrome 50+, Firefox 71+, Safari 9+. If unsupported, the title falls back to single-column position (inside the multicol flow).
