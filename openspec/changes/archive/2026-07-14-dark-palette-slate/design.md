## Context

The dark theme color tokens in `global.css` use stone shades. The user wants slate instead. This is a pure CSS variable swap — no structural, component, or behavior changes.

## Goals / Non-Goals

**Goals:**
- All dark mode CSS custom properties use slate-equivalent values
- The FOUC-prevention inline script uses the new dark surface color
- Light theme colors remain unchanged (stone palette)

**Non-Goals:**
- Any component, layout, or behavior changes
- Changing the light theme palette
- Changing the primary/hover blue colors

## Decisions

- **Direct token mapping**: Each stone token maps to the same-named slate token (e.g., stone-950 → slate-950 for `surface`, stone-400 → slate-400 for `text-muted`). This keeps the visual hierarchy identical — only the hue shifts from warm to cool.
- **No light theme changes**: The light theme stays stone. The two palettes are independent — changing dark doesn't require changing light.
- **Primary colors unchanged**: Blue-500/blue-400 are neutral across palettes.

## Risks / Trade-offs

- **FOUC script must match**: The inline `backgroundColor` in `Layout.astro` must be updated to `#020617` or the flash will use the old stone color. Low risk — single value change.
- **Spec must reflect new values**: Since the visual-theme spec documents exact hex values, those scenarios need updating. Low risk — clear search-and-replace.
