## Context

The app currently uses a three-feature set of issues: the editor panel doesn't scroll because the left column lacks `overflow-hidden`, the print output is in landscape orientation, and there's no dark theme support despite this being a developer-oriented tool.

## Goals / Non-Goals

**Goals:**
- Editor panel scrolls independently when content exceeds viewport height
- Print output uses portrait orientation by default
- Dark theme with toggle button, SVG icon, and localStorage persistence

**Non-Goals:**
- No system-preference detection (manual toggle only)
- No animated theme transitions
- No per-cheatsheet theme — global preference only

## Decisions

**1. Scroll fix: `overflow-hidden` on left column**
- The outer root has `lg:overflow-hidden` but the left column wrapper lacks it
- Adding `overflow-hidden` (or `min-h-0`) to the left column allows the `overflow-auto` on `EditorPanel` to work
- Why not `min-h-0`? Both work; `overflow-hidden` is more explicit

**2. Dark theme: CSS variable overrides via `.dark` class**
- Using Tailwind v4's `@variant dark (&.dark)` directive enables `dark:` variant classes for future use
- `.dark` class overrides all `--color-*` CSS variables defined in `@theme`
- Why not `dark:` variants on every class? Would require touching every component; CSS variable approach is ~10 lines total
- Dark colors: slate-based (similar to Tailwind's default dark palette)

**3. SVG icons: Inline sun/moon SVGs**
- Sun (24x24): shown in dark mode (switch to light)
- Moon (24x24): shown in light mode (switch to dark)
- Why inline? No dependency on icon library; self-contained

**4. Persistence: localStorage**
- Key: `theme` with values `"dark"` or `"light"`
- Read on mount to initialize state; write on toggle

## Risks / Trade-offs

- **[CSS specificity]** The `.dark` class overrides may conflict if other styles set colors with hardcoded values. Mitigation: all colors use CSS variables from `@theme`, so override at that level is clean.
