## 1. Toolchain & Dependencies

- [x] 1.1 Remove `astro` and `@astrojs/react` from `package.json` dependencies
- [x] 1.2 Add dependencies: `react-router`, `zustand`, `vite`, `@vitejs/plugin-react`, `typescript`, `@types/react`, `@types/react-dom`
- [x] 1.3 Create `vite.config.ts` registering `react()` and `@tailwindcss/vite` plugins
- [x] 1.4 Update `package.json` scripts: `dev` -> `vite`, `build` -> `tsc --noEmit && vite build`, `preview` -> `vite preview`
- [x] 1.5 Update `tsconfig.json` for Vite/React (bundler resolution, jsx react-jsx, include `src`)
- [x] 1.6 Delete `astro.config.mjs` and the `.astro` cache directory

## 2. HTML Shell & Entry Point

- [x] 2.1 Create `index.html` with `<head>`: Google Fonts preconnect/links, favicon, dark-mode anti-flash inline script, `<div id="root">`, and `<script type="module" src="/src/main.tsx">`
- [x] 2.2 Create `src/main.tsx`: `createRoot`, wrap `<App/>` in `<BrowserRouter>`, call `useAppStore.getState().init()` for legacy migration before render, import `global.css`
- [x] 2.3 Delete `src/pages/index.astro` and `src/layouts/Layout.astro`

## 3. State Store (zustand)

- [x] 3.1 Create `src/store/useAppStore.ts` with `create()(persist(...))`: state `list`, `cheatsheets`, `activeId`, `darkMode`, `sidebarOpen`, `editorVisible`, `activeSectionId`, `hydrated`
- [x] 3.2 Implement actions: `newCheatsheet`, `switchTo`, `rename`, `remove`, `setTitle`, `addSection`, `removeSection`, `addShortcut`, `updateShortcut`, `removeShortcut`, `setActiveSection`, `toggleSidebar`, `toggleEditor`, `toggleDark`, `init`
- [x] 3.3 Route active-document mutations through the existing pure `cheatsheetReducer` (e.g. `addSection` = `set(s => ({ cheatsheets: { ...s.cheatsheets, [active.id]: cheatsheetReducer(active, action) } }))`)
- [x] 3.4 Configure `persist` with `name: "cheatsheet-store"` and `partialize` persisting only `list`, `cheatsheets`, `activeId`, `darkMode`
- [x] 3.5 Ensure `toggleDark` also writes `localStorage["theme"]` to preserve the anti-flash script contract

## 4. Reducer & Storage Refactor

- [x] 4.1 In `src/lib/reducer.ts`, replace the `let nextId` counter with `crypto.randomUUID()` in `uid()` for section/shortcut ids
- [x] 4.2 Reduce `src/lib/storage.ts` to a read-only `migrateLegacyCheatsheet()` (and helpers) that reads legacy `cheatsheet`, `cheatsheet:index`, `cheatsheet:<id>` keys; remove write functions

## 5. Routing & App Shell

- [x] 5.1 Create `src/App.tsx` with `<BrowserRouter>` + `<Routes>`: a `Shell` layout route (`header` + `CheatsheetSidebar` + `<Outlet/>`), index route `Home`, and `cheatsheet/:id` route `CheatsheetRoute`
- [x] 5.2 Create `src/routes/Home.tsx`: if a valid `activeId` exists, `<Navigate to={"/cheatsheet/"+activeId}/>`; otherwise render the empty state
- [x] 5.3 Create `src/routes/CheatsheetRoute.tsx`: read `useParams().id`, validate against `cheatsheets`, set `activeId`/`activeSectionId`, render `EditorPanel` + `LivePreview`; invalid id -> `<Navigate to="/"/>`
- [x] 5.4 Wire sidebar "switch" to `navigate("/cheatsheet/"+id)` and "new" to create + navigate; remove `activeCheatsheetId` prop threading

## 6. Component Refactor (remove prop-drilling)

- [x] 6.1 Refactor `Toolbar.tsx` to consume `darkMode`, `editorVisible`, `sidebarOpen` and their toggles from `useAppStore` (drop props)
- [x] 6.2 Refactor `EditorPanel.tsx` and `SectionList.tsx` to read `cheatsheet`/`activeSectionId` from store and call store actions instead of receiving `dispatch`
- [x] 6.3 Refactor `LivePreview.tsx`, `ShortcutRow.tsx`, `ShortcutCard.tsx`, `AddSectionForm.tsx`, `AddShortcutForm.tsx` to use `useAppStore` instead of passed props/`dispatch`
- [x] 6.4 Refactor `CheatsheetSidebar.tsx` to read `list`/`activeId` from store and call `switchTo`/`rename`/`remove`/`newCheatsheet`

## 7. Netlify & Verification

- [x] 7.1 Create `public/_redirects` with `/* /index.html 200` (Vite copies `public/` to `dist/`)
- [x] 7.2 Run `npm run build` and confirm a `dist/` SPA is produced with `index.html` and hashed assets
- [x] 7.3 Run `tsc --noEmit` and confirm no type errors
- [x] 7.4 Manual smoke test: create/edit/delete cheatsheets, deep-link `/cheatsheet/:id` refresh (no 404), dark mode (no flash), print/PDF, and `/` redirect to last active
- [x] 7.5 Verify legacy data migration by loading a profile that has the old `cheatsheet`/`cheatsheet:index` keys
