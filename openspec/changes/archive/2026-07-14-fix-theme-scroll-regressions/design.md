## Context

The theme system uses CSS custom properties defined in `@theme` (light) and `.dark` overrides. Currently both palettes use Tailwind's `slate` family which has a cool blue-green undertone (RGB 248/250/252 for slate-50). The dark theme additionally has low contrast between `--color-surface-alt` and `--color-key-bg` (both `#334155`), making key badges indistinguishable from their background. The editor left column also lacks proper scroll containment on desktop.

## Goals / Non-Goals

**Goals:**
- Replace all slate-derived colors with stone-derived colors (warm neutral) in both themes
- Ensure key badges are visually distinct from surfaces in both themes
- Fix editor scroll on desktop by adding proper flex containment
- Convert all `bg-white` hardcoded backgrounds to `bg-surface` for correct dark mode rendering

**Non-Goals:**
- No changes to the toggle mechanism, localStorage persistence, or `.dark` class strategy
- No changes to the print PDF layout
- No changes to the data model or reducer

## Decisions

### Decision: Stone palette over slate or neutral
- **Chosen**: Tailwind `stone` family (warm neutral) for both themes
- **Alternatives**: `slate` (current — rejected due to cool blue-green cast), `neutral` (pure gray — viable but warmer tone preferred), `gray` (middle ground)
- **Rationale**: The user perceives slate as "verdes y celestes" and explicitly chose "slightly warm (stone)" for the light theme. Using stone for dark too keeps the palette harmonious.

### Decision: Specific hex values for each token
| Token | Light (stone) | Dark (stone) |
|---|---|---|
| `--color-surface` | `#fafaf9` (50) | `#0c0a09` (950) |
| `--color-surface-alt` | `#f5f5f4` (100) | `#1c1917` (900) |
| `--color-border` | `#e7e5e4` (200) | `#292524` (800) |
| `--color-key-bg` | `#e7e5e4` (200) | `#44403c` (700) |
| `--color-key-text` | `#44403c` (700) | `#e7e5e4` (200) |
| `--color-text` | `#1c1917` (900) | `#fafaf9` (50) |
| `--color-text-muted` | `#78716c` (500) | `#a8a29e` (400) |
| `--color-primary` | `#2563eb` (blue-600) | `#3b82f6` (blue-500) |
| `--color-primary-hover` | `#1d4ed8` (blue-700) | `#60a5fa` (blue-400) |

`--color-primary` stays blue for brand/action color — only the neutral tones change.

### Decision: `flex-1 overflow-hidden` on editor wrapper
- **Problem**: The editor wrapper `<div>` at `App.tsx:226` has `flex-col lg:flex` but no size constraint. Its child `EditorPanel` has `overflow-auto` but can't scroll because the parent doesn't limit its height.
- **Fix**: Add `flex-1 overflow-hidden` to the wrapper. `flex-1` fills remaining vertical space in the left column; `overflow-hidden` constrains the child (disabling `min-height: auto` in flex context), enabling `EditorPanel`'s `overflow-auto` to scroll.
- **Alternatives**: Using `h-0 min-h-0` pattern (more fragile with dynamic toolbar sizes).

### Decision: Replace `bg-white` with `bg-surface`
- **Rationale**: `bg-white` is `background-color: white` which ignores the `.dark` class, leaving white rectangles in dark mode. `bg-surface` resolves to the custom property `--color-surface` which is `#fafaf9` in light (visually near-identical to white) and `#0c0a09` in dark (correct dark background).
- **8 occurrences** across App.tsx, LivePreview.tsx, SectionList.tsx, AddShortcutForm.tsx, Cheatsidebar.tsx, and index.astro.

## Risks / Trade-offs

- [Light mode brightness] → `bg-surface` at `#fafaf9` is slightly darker than pure white `#ffffff`. Cards on `bg-surface` will have a subtle warm tint. This is the intended effect.
- [Input contrast] → Changing input `bg-white` to `bg-surface` reduces their contrast against the form container. Borders (`border-border`) still provide visible separation.
- [Existing spec delta] → The visual-theme spec currently says "slate-based". The delta spec must update this requirement. No other specs are affected.
