## Context

A single-page web application for creating and printing keyboard shortcut cheatsheets. Users build cheatsheets via a visual form, see a live preview, and print to PDF. No backend — all data lives in localStorage. Built with Astro + React + Tailwind CSS v4.

## Goals / Non-Goals

**Goals:**
- Visual form-based editor (JSON is hidden from the user)
- Live preview that renders the cheatsheet in real-time
- Inline editing: click on rendered elements to edit
- Print cheatsheet to PDF via `window.print()` with custom print styles
- Save/load cheatsheets from localStorage
- Single-user, no auth, no backend

**Non-Goals:**
- Multi-user or collaboration features
- Cloud sync or export to formats other than PDF
- Native mobile app
- User accounts or authentication

## Decisions

1. **Astro + React islands** — Astro handles the static shell and routing; React islands power the interactive editor and preview. React is familiar and has rich ecosystem for form handling.

2. **Component tree**:
   ```
   App
   ├── EditorPanel (form inputs for title, sections, shortcuts)
   │   ├── AddSectionForm
   │   ├── AddShortcutForm
   │   └── SectionList (collapsible)
   │       └── ShortcutRow (display only in editor)
   ├── LivePreview (renders cheatsheet visually)
   │   └── ShortcutCard (clickable → editable)
   └── Toolbar (new, print buttons)
   ```

3. **State management** — React `useState` + `useReducer` at the App level. The cheatsheet object is the single source of truth. Both editor and preview read from it. On every change, the preview re-renders automatically.

4. **Inline editing** — Preview renders each shortcut as a card. On click, the card switches from display mode to input mode (inline inputs for keys/action). Blur or Enter saves and switches back.

5. **Print via CSS** — `window.print()` + `@media print` with `@page { size: landscape; margin: 1cm; }`. Print styles hide the editor and toolbar, showing only the rendered cheatsheet. `page-break-inside: avoid` on section groups.

6. **localStorage** — `localStorage.setItem('cheatsheet', JSON.stringify(data))` on every change (debounced 500ms). Load on mount. Single key — one cheatsheet at a time MVP.

7. **Section selection model** — The last section added is auto-selected. The user can click any section header in the editor to make it the active section. The add-shortcut form always targets the active section. This removes the need for dropdowns or complex selection UI.

8. **Development tooling (MCP servers)** — Development uses MCP `context7` for Astro/Tailwind/React best practices and `grep` for codebase-aware search. These guide implementation patterns and ensure idiomatic, up-to-date usage of the stack.

9. **Design system** — UI follows patterns from Emil Kowalski's component design philosophy (clean, minimal, purposeful) and UI UX Pro Max (polished interactions, spacing, and typography hierarchy). The cheatsheet preview should feel like a designed artifact, not a debug view.

## Risks / Trade-offs

- **localStorage limits (~5MB)** — Not an issue for text-only cheatsheets but would limit images if added later
- **No backend** — No cloud backup; clearing browser data loses work. Acceptable for MVP.
- **Print fidelity** — `@media print` varies slightly across browsers. Mitigation: test on Chrome/Firefox, keep print CSS simple.
- **Inline editing UX** — Clicking to edit could feel undiscoverable. Mitigation: subtle edit icon on hover, plus form-based add as primary workflow.
