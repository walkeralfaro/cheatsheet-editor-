## 1. Update CSS variables in global.css

- [x] 1.1 Replace all hex values in `@theme` block with stone palette colors
- [x] 1.2 Replace all hex values in `.dark` block with stone palette colors

## 2. Fix editor scroll on desktop

- [x] 2.1 Add `flex-1 overflow-hidden` to the editor wrapper `<div>` at `App.tsx:226`

## 3. Replace hardcoded bg-white with theme-aware bg-surface

- [x] 3.1 Change `bg-white` to `bg-surface` in `src/components/App.tsx:217` (left column)
- [x] 3.2 Change `bg-white` to `bg-surface` in `src/pages/index.astro:8` (page header)
- [x] 3.3 Change `bg-white` to `bg-surface` in `src/components/LivePreview.tsx:26` (section card)
- [x] 3.4 Change `bg-white` to `bg-surface` in `src/components/SectionList.tsx:43` (section item)
- [x] 3.5 Change `bg-white` to `bg-surface` in `src/components/AddShortcutForm.tsx:30,38` (input and textarea)
- [x] 3.6 Change `bg-white` to `bg-surface` in `src/components/Cheatsidebar.tsx:47,80` (sidebar panel and rename input)

## 4. Verify the changes

- [ ] 4.1 Run the dev server and confirm light theme has no green/blue tint
- [ ] 4.2 Toggle to dark theme and confirm colors look correct and readable
- [ ] 4.3 Add multiple sections and shortcuts and confirm editor scrolls on desktop
- [ ] 4.4 Confirm no white backgrounds appear in dark mode
- [x] 4.5 Run `npm run build` to verify no build errors
