## Context

The codebase has accumulated several UX issues: invalid JSX (`class` instead of `className`), missing input validation, text overflow in preview cards, broken inline editing flow, mobile scroll problems, and suboptimal print pagination.

## Goals / Non-Goals

**Goals:**
- Fix all `class` → `className` in React components
- Add `maxLength` validation to shortcut keys (50) and action (200)
- Prevent text overflow in preview cards with `break-words`
- Fix inline editing: Enter only saves from the last input, Tab navigates between inputs
- Make mobile layout scrollable and add editor toggle
- Allow natural page breaks in print PDF
- No visual regressions on desktop

**Non-Goals:**
- Rewriting the component tree or state management
- Adding animations or transitions
- Changing the data model

## Decisions

1. **Global search-and-replace for `class` → `className`** — Simple regex replacement across all `.tsx` files. Verified by build since className is a React requirement.

2. **maxLength values** — Keys: 50 characters (keyboard shortcuts are short). Action: 200 characters (descriptions should be concise).

3. **Inline editing Enter behavior** — Only the action (second) input saves on Enter. The keys input uses Enter to move focus to the action input. Blur still saves from either input. This lets the user type keys → Enter → action → Enter to save.

4. **Mobile editor toggle** — New `editorVisible` state in `App.tsx`. A toggle button in the toolbar shows/hides the editor. On mobile (below lg breakpoint), the editor panel is hidden by default and shown via toggle. On desktop it's always visible. The editor panel scrolls naturally with the page (no sticky).

5. **Mobile scroll fix** — Remove `overflow-hidden` from the main container on mobile. On desktop (lg+), keep the side-by-side layout with independent scroll.

6. **Print pagination** — Remove `page-break-inside: avoid` from the `section` rule. The browser will naturally paginate long content.

## Risks / Trade-offs

- **class → className** — Purely mechanical change, no risk. Verified by build.
- **Mobile toggle** — Adds state complexity but solves the core mobile UX issue.
- **Print pagination** — Without page-break avoidance, sections may split awkwardly. But this is preferred over large blank spaces.
