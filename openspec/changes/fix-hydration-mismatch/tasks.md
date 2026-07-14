## 1. Refactor state to avoid hydration mismatch

- [x] 1.1 Make `cheatsheetList` SSR-safe: change `useState(() => loadCheatsheetList())` → `useState<CheatsheetMeta[]>([])` + load in useEffect
- [x] 1.2 Make `activeCheatsheetId` SSR-safe: start as `null`, derive from loaded list in useEffect
- [x] 1.3 Make `cheatsheet` reducer SSR-safe: change from `useReducer(reducer, null, initialCheatsheet)` → `useReducer(reducer, createEmptyCheatsheet())` + load real data in useEffect
- [x] 1.4 Make `darkMode` SSR-safe: change `useState(() => localStorage.getItem("theme") === "dark")` → `useState(false)` + load in useEffect

## 2. Add hydrator useEffect

- [x] 2.1 Create a single `useEffect` that loads list → loads active cheatsheet → reads dark mode preference, with proper dependency ordering

## 3. Fix post-hydration bugs

- [x] 3.1 Fix dark mode: move hydrator BEFORE darkModeSync so theme is read before being overwritten
- [x] 3.2 Fix autoSave: add `if (cheatsheetList.length === 0) return;` guard to prevent wiping the index
- [x] 3.3 Fix empty cheatsheet accumulation: remove `saveCheatsheetById`/`saveCheatsheetList` from hydrator else branch

## 4. Verify

- [x] 4.1 Run `npm run build` and confirm no hydration mismatch errors during dev
- [ ] 4.2 Run `npm run dev` and confirm localStorage data loads correctly after hydration
- [ ] 4.3 Confirm dark mode toggle still works and persists across reloads
- [ ] 4.4 Confirm multi-cheatsheet switching (create, rename, delete) still works
- [ ] 4.5 Clear localStorage (backup first), refresh, confirm no empty cheatsheets appear
