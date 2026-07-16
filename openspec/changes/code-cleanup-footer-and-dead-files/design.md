## Context

Three identical footers exist: `App.tsx` (mobile editor), `EditorPanel.tsx` (desktop editor), `Landing.tsx` (landing page). Each differs only in CSS visibility classes. `src/routes/Home.tsx` is dead code leftover from before landing was moved into the SPA.

## Goals / Non-Goals

**Goals:**
- Single `<Footer>` component with `className` prop for visibility control.
- Delete unused code.
- Zero visual changes.

**Non-Goals:**
- No functional changes.
- No dependency changes.

## Decisions

- `Footer` accepts `className?: string` so each consumer controls its own responsive visibility. Default: visible everywhere.
- Keep the internal SVG heart inline (small, no benefit to externalizing).
- `ShortcutCard.tsx`: replace `import type React from "react"` with `import { type KeyboardEvent } from "react"`.
