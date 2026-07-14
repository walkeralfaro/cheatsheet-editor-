## Context

The app uses Astro with `client:load` directive, meaning the React component is server-side rendered (SSR) into static HTML during build, then hydrated on the client. `useState` initializer functions in `App.tsx` read directly from `localStorage`:

- `const [cheatsheet, dispatch] = useReducer(..., initialCheatsheet)` — calls `migrateLegacyCheatsheet()` or `loadCheatsheetById()`
- `const [cheatsheetList, setCheatsheetList] = useState(() => loadCheatsheetList())`
- `const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark")`

During SSR, `localStorage` isn't available, so these fall back to defaults (empty cheatsheet, empty list, light mode). During hydration, `localStorage` IS available, so the initial render produces different state — React throws hydration mismatch.

## Goals / Non-Goals

**Goals:**
- Eliminate React hydration mismatch errors in the console
- Ensure SSR and initial client render produce identical DOM
- Preserve all existing functionality (data loading, dark mode persistence)

**Non-Goals:**
- No changes to the data model, storage API, or UI
- No changes to Astro's `client:load` strategy
- No SEO improvements (irrelevant for a local tool)

## Decisions

### Decision: The "three-phase" render pattern

Split rendering into three phases:

```
Phase 1 — SSR + initial client render:   default/empty state (identical)
Phase 2 — useEffect fires:               load from localStorage
Phase 3 — re-render:                     real data displayed
```

This is the idiomatic React pattern for SSR-safe state initialization.

### Decision: Move ALL localStorage reads to useEffect

Four pieces of state need refactoring:

| Current State | SSR-safe init | Load in useEffect |
|---|---|---|
| `cheatsheet` (useReducer) | `createEmptyCheatsheet()` | `loadCheatsheetList()` + `loadCheatsheetById()` |
| `cheatsheetList` | `[]` | `loadCheatsheetList()` |
| `activeCheatsheetId` | `null` | from loaded list (first item) |
| `darkMode` | `false` | `localStorage.getItem("theme") === "dark"` |

### Decision: Dedicated `useStoreHydrator` effect

One `useEffect` runs once on mount (`[]` deps) and orchestrates the entire localStorage load in sequence: load list → load active cheatsheet → set dark mode. This avoids multiple staggered re-renders and ensures data dependencies are respected.

## Risks / Trade-offs

- [Double render on every load] → The initial render shows empty state, then a second render shows real data. This is inherent to the pattern and happens once per page load. For a local tool this is imperceptible.
- [Flash of default state] → User briefly sees "My Cheatsheet" (default title) before the real data loads. Mitigation: add a `isHydrating` boolean to show a subtle loading indicator if needed.
- [Race condition with auto-save] → The existing `useEffect` auto-save (500ms debounce) could trigger during hydration. Mitigation: the hydrator effect runs first (imported first), and the auto-save effect has `[cheatsheet]` deps — it only fires after the reducer state stabilizes.
