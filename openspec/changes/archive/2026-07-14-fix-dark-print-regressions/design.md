## Context

Dark theme from last change used GitHub-dark-inspired colors (`#161b22`) that are too deep and low-contrast. Print 2-column layout overflows because `table-fixed` forces columns to shrink without wrapping. Light theme headers got colored left borders that add unwanted visual noise.

## Goals / Non-Goals

**Goals:**
- Restore dark theme to a readable slate palette (`#1e293b`/`#334155`/`#475569`)
- Fix print column text overflow with word-break and non-fixed tables
- Remove accent header decorations from light theme

**Non-Goals:**
- No new features

## Decisions

**1. Dark palette: Higher contrast slate**

| Token | Value |
|-------|-------|
| `--color-surface` | `#1e293b` (slate-800) |
| `--color-surface-alt` | `#334155` (slate-700) |
| `--color-border` | `#475569` (slate-600) |
| `--color-text` | `#f1f5f9` (slate-50) |
| `--color-text-muted` | `#94a3b8` (slate-400) |
| `--color-key-bg` | `#334155` (slate-700, same as surface-alt to contrast with border) |
| `--color-key-text` | `#e2e8f0` (slate-200) |

**2. Print columns: flexible tables + overflow protection**

- Remove `table-fixed` in print media → table columns auto-size to content
- Add `word-break: break-word` and `overflow-wrap: break-word` on print table cells
- Reduce font size in print to fit more content
- Keep accent headers only in dark mode, not light mode

**3. Light theme: clean headers**

- Remove `card-header-*` accent classes from LivePreview headers
- Restore original flat `bg-surface-alt` header styling

## Risks / Trade-offs

- **[Print 2 columns]** Without `table-fixed`, columns may vary in width. Mitigation: still acceptable for a reference card layout where content length varies naturally.
