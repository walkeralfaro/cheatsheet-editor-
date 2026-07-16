## Context

The app is a local-only SPA (React + Vite, zustand with `persist`). The landing page (`public/landing.html`) and the editor share a theme via `localStorage["theme"]` plus the `.dark` class on `<html>`. The landing toggle already reads and writes that key correctly. The editor, however, keeps its own `darkMode` boolean in the zustand store (persisted under the separate `cheatsheet-store` key) and toggles based on that internal value rather than the real applied theme. Because the landing can't update the zustand store, the editor's `darkMode` goes stale whenever the theme is changed on the landing, causing a wrong toolbar icon and a first-click no-op. Additionally, the editor header "Cheatsheet Editor" is a static `<h1>` with no path back to the landing.

## Goals / Non-Goals

**Goals:**
- Editor theme state initializes from `localStorage["theme"]` (→ `prefers-color-scheme` → light), identical to the landing.
- Editor `toggleDark` derives the next state from the actually-applied `.dark` class so it always agrees with the landing toggle.
- Make `localStorage["theme"]` the single source of truth by not persisting `darkMode` in zustand.
- Provide a header control in the editor to return to the landing.

**Non-Goals:**
- No change to landing or index.html theme scripts.
- No backend, routing-table, or new dependency changes.
- No change to the SPA's client routes (the `/` route stays static).

## Decisions

- **Read actual theme, not store state** — `toggleDark` computes `next = !document.documentElement.classList.contains("dark")`. This is the same signal the landing toggle uses, guaranteeing coordination regardless of how the theme was last set.
- **Initialize `darkMode` from `resolveDark()`** — a helper that reads `localStorage["theme"]`, then OS preference, then `false`. Ensures the toolbar icon is correct on load without waiting for a click.
- **Drop `darkMode` from `partialize`** — the editor stop persisting `darkMode` in the zustand store. The single source of truth becomes `localStorage["theme"]` (already read by `index.html` and written by `toggleDark`). Removes the stale cross-page value.
- **Full-page navigation to `/`** — the header control uses `window.location.href = "/"` rather than a client-side `<Link>`. Reason: the landing is served statically at `/` by Netlify (and the dev/preview plugin); the SPA has no `/` route, so a client-side link would hit the no-route catch-all and render blank.

## Risks / Trade-offs

- [Risk] Removing `darkMode` from `partialize` means the value isn't rehydrated from the zustand snapshot — mitigated because `resolveDark()` recomputes it from `localStorage["theme"]` on every load, the same source.
- [Trade-off] `window.location.href` does a full reload to reach the landing — acceptable and necessary given the static hosting model; preserves the no-`noindex` editor separation.
