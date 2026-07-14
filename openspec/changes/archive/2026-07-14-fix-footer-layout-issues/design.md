## Context

The footer exists in two variants: mobile (`index.astro`, below `<App />`) and desktop (`App.tsx`, inside the left column's flex layout). Both have issues:

1. **Mobile dark theme**: The mobile footer and `<main>` lack `bg-surface`, so the footer inherits a transparent background. In dark mode, the inline script sets `<html>` background-color but toggle switching doesn't propagate to elements outside React.

2. **Desktop always visible**: The desktop footer is a flex child of the left column alongside Toolbar and EditorPanel. `flex-1` on EditorPanel pushes the footer to the column bottom, making it always visible in the viewport instead of scrolling with the editor content.

The right column (LivePreview) must remain untouched — it was the source of previous regressions.

## Goals / Non-Goals

**Goals:**
- Mobile footer and main background correctly render `--color-surface` in dark mode
- Desktop footer scrolls with EditorPanel content instead of being pinned to the viewport
- Zero impact on the right column (LivePreview) layout

**Non-Goals:**
- Changing the print behavior of the footer (already hidden via `print:hidden`)
- Restructuring the overall page layout or columns
- Adding new features or styling beyond the footer

## Decisions

- **Move desktop footer into `EditorPanel.tsx`**: The footer needs to be inside the scrollable `overflow-auto` container that EditorPanel already uses. Placing it as the last child of EditorPanel's flex column means it naturally follows the content — scroll down to see it. Alternative was wrapping it in its own scroll container, but that adds complexity without benefit.
- **Add `bg-surface` to `<main>` and mobile `<footer>`**: Both lack an explicit background. The `<main>` should provide a stable backdrop since its children (like `<App />`) may not fill the full height during hydration. The footer needs it so the dark variable applies directly rather than relying on inheritance.
- **No changes to the right column**: Previous regressions were caused by making the right column a `flex flex-col` container and adding `flex-1` to LivePreview. The right column stays as `flex-1 overflow-auto` — no flex container, no footer inside.

## Risks / Trade-offs

- **Layout shift risk in EditorPanel**: Adding the footer at the end of EditorPanel's scrollable content adds ~40px of height. If the panel is already at full content height, a scrollbar appears. Mitigation: the footer is only shown on desktop (`hidden lg:flex`), so mobile is unaffected. The height increase is minimal.
- **No gap coordination**: EditorPanel uses `gap-4` between children. The footer will have a 16px gap above it, plus its own `py-2` padding. This creates ~24px spacing that might differ from the column-level footer which had no gap. Acceptable trade-off for correct scroll behavior.
