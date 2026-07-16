## 1. Editor theme coordination

- [x] 1.1 Add a `resolveDark()` helper in `src/store/useAppStore.ts` that reads `localStorage["theme"]`, then `prefers-color-scheme`, then defaults to `false`.
- [x] 1.2 Initialize store `darkMode` with `resolveDark()` instead of `false`.
- [x] 1.3 Rewrite `toggleDark` to compute `next = !document.documentElement.classList.contains("dark")`, persist `localStorage["theme"]`, toggle `.dark`, and return `{ darkMode: next }`.
- [x] 1.4 Remove `darkMode` from the `partialize` list so it is no longer persisted in the zustand store.

## 2. Editor header to landing

- [x] 2.1 In `src/App.tsx` Shell header, make the "Cheatsheet Editor" title a clickable control that navigates to `/` via `window.location.href = "/"`.

## 3. Verification

- [x] 3.1 Run `npm run build` and `npm run preview`; verify theme sync and header navigation behave as specified.
- [x] 3.2 Run `openspec validate --specs` to confirm specs still pass.
