## Context

The dark theme uses basic Tailwind slate colors that don't match the provided design reference (`card_dark_styles.html`). Print output renders in a single column, wasting space in portrait mode.

## Goals / Non-Goals

**Goals:**
- Match dark theme colors to design reference (`#161b22` surface, `#30363d` border, `#e2e8f0` text, 10px radius)
- Add per-section accent header colors cycling through green, blue, purple, orange, teal
- Print output renders section cards in 2 columns

**Non-Goals:**
- No system-preference accent color selection
- No drag handles or column count customization

## Decisions

**1. Dark palette: Direct from design reference**
- Surface: `#161b22` (card_dark_styles.html background)
- Surface-alt: `#1c2333` (slightly lighter for alternate surfaces)
- Border: `#30363d` (card_dark_styles.html border)
- Text: `#e2e8f0` (card_dark_styles.html color)
- Key-bg: `#30363d`, Key-text: `#e2e8f0`
- Card border-radius: 10px (design ref)

**2. Accent header colors: CSS classes cycling by section index**
- Define `.card-header.green`, `.blue`, `.purple`, `.orange`, `.teal` in global.css
- LivePreview picks color by `sectionIndex % 5`
- Each has a distinct left border accent and subdued background variant
- Colors chosen for good contrast on both light and dark backgrounds

**3. Print 2 columns: CSS multi-column (`column-count`)**
- Use `column-count: 2` on `.print-area` inside `@media print`
- Use `break-inside: avoid` on section cards to prevent splitting
- Simpler than CSS Grid for this use case; content flows naturally into columns

## Risks / Trade-offs

- **[Accent colors in light mode]** The accent headers should work in light mode too. Mitigation: use CSS variables so colors adapt automatically with the `.dark` class.<｜end▁of▁thinking｜>
