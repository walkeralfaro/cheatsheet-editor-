## 1. Fix dark flash

- [ ] 1.1 Add `isFirstRender = useRef(true)` to `App.tsx` and guard `darkModeSync` effect to skip first run
- [ ] 1.2 Verify in browser: refresh with dark mode enabled → no flash

## 2. Stop empty cheatsheet accumulation

- [ ] 2.1 Remove `persistActiveCheatsheet(...)` call from hydrator's else branch in `App.tsx`
- [ ] 2.2 Re-add autoSave guard: `if (cheatsheetList.length === 0) return;`

## 3. Add empty-state new-cheatsheet prompt

- [ ] 3.1 In `App.tsx`, when `hydrated && cheatsheetList.length === 0`, render an empty-state UI with "Create your first cheatsheet" text and a "New Cheatsheet" button that calls `handleNew`
- [ ] 3.2 Style the empty-state prompt to be centered and visually prominent
- [ ] 3.3 Verify: first visit shows prompt, clicking button creates cheatsheet and shows editor

## 4. Verify no regressions

- [ ] 4.1 Run `npm run build` and confirm no type/build errors
- [ ] 4.2 Manual check: toggle dark mode works, print works, auto-save works after creating a cheatsheet, multi-cheatsheet switching works
