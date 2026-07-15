## Context

The project is a 100% client-side cheatsheet editor. Today it runs as a React SPA wrapped in Astro: `src/pages/index.astro` only mounts `<App client:load />`, and `src/layouts/Layout.astro` provides the HTML document, Google Fonts, a dark-mode anti-flash script, and the favicon. All application logic lives in React (`App.tsx` plus 9 components) and pure TS (`lib/reducer.ts`, `lib/storage.ts`, `lib/types.ts`). Tailwind v4 is wired through `@tailwindcss/vite`.

Astro contributes no content collections, no SSR, no multi-page routing, and only a single React island. It is effectively a redundant build/deploy abstraction. The goal is to drop Astro and run a native Vite + React SPA, while adopting React Router (declarative mode) for deep-linkable cheatsheets and zustand for unified global state.

## Goals / Non-Goals

**Goals:**
- Replace Astro with Vite + `@vitejs/plugin-react`; keep Tailwind v4 output identical.
- Provide URL-addressable cheatsheets at `/cheatsheet/:id` with working back/forward and deep links.
- Consolidate all global state into a single zustand store with `persist`, reusing `cheatsheetReducer` as a pure helper.
- Migrate existing users' localStorage data from the legacy multi-key layout into the new store.
- Keep Netlify deploy working (`dist/` from `npm run build`) with SPA fallback.

**Non-Goals:**
- No server-side rendering, no data loaders/actions (React Router data mode is intentionally avoided).
- No change to the visual design, print/PDF layout, dark-mode behavior, or component UX.
- No new product features beyond URL routing of existing cheatsheets.

## Decisions

### D1. Build tool: Vite + `@vitejs/plugin-react`
Replace `astro.config.mjs` with `vite.config.ts` that registers `react()` and `@tailwindcss/vite`. `index.html` replaces `index.astro`/`Layout.astro` as the document shell, importing `/src/main.tsx`.
- *Alternative considered*: keep Astro and add `entrypoint` SPA mode. Rejected: adds config and still carries the Astro dependency for no benefit.

### D2. Routing: React Router v7 declarative mode
Use `BrowserRouter` + `<Routes>` (the official "Declarative mode"), importing from `react-router`. Route tree:
```
<BrowserRouter>
  <Routes>
    <Route element={<Shell/>}>            // header + sidebar + <Outlet/>
      <Route index element={<Home/>} />   // redirects to last active or shows empty state
      <Route path="cheatsheet/:id" element={<CheatsheetRoute/>} />
    </Route>
  </Routes>
</BrowserRouter>
```
- *Alternative considered*: `createBrowserRouter` (data mode). Rejected: we have no server data, loaders, or actions; data mode would be unnecessary ceremony.

### D3. State: single zustand store with `persist`
One store (`useAppStore`) holds data (`list`, `cheatsheets: Record<id, Cheatsheet>`, `activeId`) and UI (`darkMode`, `sidebarOpen`, `editorVisible`, `activeSectionId`). Mutations on the active document call the existing pure `cheatsheetReducer`, e.g. `addSection` does `set(s => ({ cheatsheets: { ...s.cheatsheets, [active.id]: cheatsheetReducer(active, action) }, ... }))`. `useReducer` is removed from `App.tsx`.
- *Alternative considered*: multiple stores (cheatsheets/editor/ui). Rejected per user preference for a single store; slices were unnecessary at this size.

### D4. Persistence: single key via `persist`, with legacy migration
`persist` writes one key `cheatsheet-store`. `partialize` persists only `list`, `cheatsheets`, `activeId`, `darkMode` (transient UI like `sidebarOpen`/`editorVisible` is excluded). `lib/storage.ts` is reduced to a one-time `migrateLegacyCheatsheet()` reader; on first load (`init()` called from `main.tsx`) it reads the old `cheatsheet` + `cheatsheet:index` + `cheatsheet:<id>` keys and populates the store. After rehydration, `persist` owns all writes and the old keys are no longer used.
- *Alternative considered*: keep the multi-key layout behind a custom `StateStorage`. Rejected: a single key is simpler and the legacy format is only needed once.

### D5. Ids: `crypto.randomUUID()`
`reducer.ts`'s module-level `let nextId` counter (reset via `Date.now()` on `LOAD`) is replaced by `crypto.randomUUID()` for sections and shortcuts. Removes a fragile global and matches how cheatsheets are already created.

### D6. Dark mode anti-flash
The inline `<head>` script in `index.html` keeps reading `localStorage.getItem("theme") === "dark"` (unchanged contract). `toggleDark` therefore continues to write the `theme` key in addition to updating the store, so the pre-hydration script works without parsing the zustand store JSON.

### D7. Netlify SPA fallback
Add `public/_redirects` containing `/* /index.html 200`. Vite copies `public/` into `dist/`, so deep-linked refreshes serve `index.html` and the client router takes over. No change to the Netlify build command or publish dir.

## Risks / Trade-offs

- [Risk] Direct refresh of `/cheatsheet/:id` 404s on Netlify → Mitigation: `public/_redirects` rewrite to `index.html` (200).
- [Risk] Legacy users lose data → Mitigation: one-time `migrateLegacyCheatsheet()` on first load before `persist` takes over; if both old and new keys exist, old data is merged/kept.
- [Risk] `crypto.randomUUID()` requires a secure context → Mitigation: app already runs on https (Netlify) and localhost; acceptable.
- [Risk] Removing the 500ms save debounce changes write frequency (now per change) → Mitigation: at this data scale localStorage writes are negligible; optional throttle can be added later via `subscribe` if needed.
- [Risk] Stale `:id` in URL → Mitigation: `CheatsheetRoute` validates the id against `cheatsheets`; invalid id redirects to `/`.
- [Trade-off] Single store is slightly less modular than slices, but matches the user's explicit preference and the app's size.

## Migration Plan

1. Swap dependencies and config (`package.json`, `vite.config.ts`, `tsconfig.json`).
2. Add `index.html`, `src/main.tsx`, router shell + routes, `useAppStore.ts`, `_redirects`.
3. Refactor the ~7 components from prop-drilling to `useAppStore`.
4. Reduce `storage.ts` to legacy reader; update `reducer.ts` ids.
5. Verify locally with `npm run build` + `tsc --noEmit` + manual smoke test, then deploy to Netlify (same settings).
6. Rollback: revert the deploy on Netlify; old `cheatsheet:*` keys remain untouched until the new build runs migration, so downgrading is safe.

## Open Questions

- None outstanding; all design decisions were confirmed by the user (routing shape, single store, legacy migration, `crypto.randomUUID`, persisted `activeId`, `reducer.ts` kept as helper).
