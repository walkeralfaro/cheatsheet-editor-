## Context

Three issues exist in the current codebase:

1. **Dark flash**: The inline script in `Layout.astro` adds `.dark` to `<html>` before paint, and the `darkModeSync` effect in `App.tsx` already skips the first run via `isFirstRender`. Despite this, a white flash still appears because the browser paints the `<body>` with its default background (white) before Tailwind's CSSOM construction applies the CSS custom property `--color-surface: #0c0a09` from the `.dark` class. The flash is a CSS FOUC, not a class-toggle issue.

2. **Equal-height cards**: `LivePreview.tsx` uses `grid grid-cols-1 md:grid-cols-2`. CSS Grid's default `align-items: stretch` makes all cards in a row share the same height. The user wants each card to have its own height independent of its row neighbors (masonry behavior).

3. **Print column order**: `@media print` already uses `column-count: 2` on `.print-area`, which creates a multi-column layout. However, the screen uses `grid`, so the visual column order differs between screen and print. Switching screen to CSS Columns makes both consistent.

## Goals / Non-Goals

**Goals:**
- Eliminate the white flash on page load when dark mode is active
- Section cards render with independent heights (masonry) in the live preview
- Printed PDF preserves the same visual column order as the screen

**Non-Goals:**
- No changes to the dark mode toggle logic, persistence, or `isFirstRender` approach
- No JavaScript masonry library added
- No changes to sidebar, toolbar, or editor panel
- No changes to the print button or print dialog behavior

## Decisions

### D1: Set background-color inline before CSS loads

**Decision**: In the existing inline `<script>` in `Layout.astro`, after adding `.dark` to `<html>`, also set `document.body.style.backgroundColor = "#0c0a09"` when dark theme is active. For light theme, set it to `"#fafaf9"`.

**Rationale**:
- `classList.add("dark")` applies the CSS custom property `--color-surface: #0c0a09` via `.dark { --color-surface: #0c0a09; }`, but the CSS custom property is processed by the CSSOM, which may not be ready before the first paint.
- Setting `style.backgroundColor` directly on the body element is synchronous and applies before the first paint — no FOUC possible.
- After the CSS loads, the Tailwind classes on the body (`bg-surface`) will override the inline style, so there's no conflict.
- The `isFirstRender` skip in the React effect already prevents the effect from interfering.

**Alternatives considered**:
- Using a `<style>` block in `<head>` with `.dark body { background-color: #0c0a09; }` — would work but adds a blocking style sheet. The inline script approach is lighter and already exists.
- Removing `bg-surface` from the body's class and relying entirely on inline style — would break transitions and theme toggling.

### D2: CSS Columns for masonry layout

**Decision**: Replace `grid grid-cols-1 md:grid-cols-2 gap-6` with `columns-1 md:columns-2` and add `break-inside-avoid-column` to each section card.

**Rationale**:
- CSS Columns (`columns-*`) flow items top-to-bottom within each column, giving each item its own height.
- `break-inside-avoid` prevents cards from being split across columns.
- No JavaScript, no external dependencies, works in all modern browsers.
- Compatible with the existing print CSS which already uses `column-count: 2`.

**Alternatives considered**:
- CSS Grid with `grid-template-rows: masonry` — only supported in Firefox.
- Flexbox with `flex-flow: column wrap` — requires fixed height container, impractical for dynamic content.
- JavaScript masonry library (e.g., Masonry.js) — unnecessary dependency for a 2-column layout.

### D3: Print preserves screen column order

**Decision**: Keep the existing `@media print` rules as-is. Since both screen and print will use CSS Columns, the visual order is inherently consistent. Add `.print-area > div > div { break-inside: avoid; }` to ensure cards aren't clipped at print column breaks (already present in global.css:81-83).

**Rationale**:
- No additional changes needed to the print CSS once screen is migrated to CSS Columns.
- The existing `break-inside: avoid` rule already covers this.

## Risks / Trade-offs

- **CSS Columns ordering**: Items flow top-to-bottom, left-to-right in CSS Columns. If the user has sections A, B, C, D, the visual order is: left column [A, C], right column [B, D]. This is different from Grid's left-to-right row order [A, B] / [C, D]. This is the expected masonry behavior but users should be aware of the column-major ordering.
- **Column imbalance**: If one column has much taller cards than the other, the layout may look unbalanced. Mitigation: this is inherent to masonry layouts and is acceptable.
- **Body style override**: Setting `style.backgroundColor` on the body will be overridden by Tailwind's `bg-surface` class after CSS loads, but during the transition there could be a slight color shift. Mitigation: The inline value matches the final value exactly (#0c0a09 for dark, #fafaf9 for light), so any shift is imperceptible.

## Open Questions

None.
