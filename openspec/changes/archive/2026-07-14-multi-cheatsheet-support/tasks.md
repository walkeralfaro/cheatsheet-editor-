## 1. Data Model & Storage Foundation

- [x] 1.1 Add `id` field to `Cheatsheet` interface and create `CheatsheetMeta` type in `types.ts`
- [x] 1.2 Update reducer with multi-cheatsheet actions: `SET_CHEATSHEETS`, `ADD_CHEATSHEET`, `DELETE_CHEATSHEET`, `RENAME_CHEATSHEET`; remove `RESET` action
- [x] 1.3 Rewrite `storage.ts`: index key (`cheatsheet:index`) for metadata, per-cheatsheet keys (`cheatsheet:<id>`) for data
- [x] 1.4 Add legacy migration: detect old `cheatsheet` key on load, migrate to new format, remove old key

## 2. Multi-Cheatsheet Sidebar & App Wiring

- [x] 2.1 Create `CheatsheetSidebar` component: slide-in panel listing all cheatsheets with active highlight, rename, and delete controls
- [x] 2.2 Update `Toolbar`: replace "New" button with hamburger (☰) button, keep Print PDF and Editor toggle
- [x] 2.3 Update `App.tsx`: manage `cheatsheets` array + `activeCheatsheetId` state, sidebar open/close, handleNew creates new cheatsheet, switch auto-saves current
- [x] 2.4 Wire auto-save to persist only active cheatsheet + update index on each change

## 3. Preview Render Restyle (Table-based Cards)

- [x] 3.1 Rewrite `LivePreview.tsx`: render each section as a card with header and `<table>`, shortcuts as table rows, data-* attributes for tooltip/example
- [x] 3.2 Rework `ShortcutCard.tsx` to render as a `<tr>` element in the preview table, with inline editing still functional inside table cells
- [x] 3.3 Add `whitespace-pre-wrap` CSS to action display cells in preview table for multi-line support

## 4. Editor Text Wrapping

- [x] 4.1 In `AddShortcutForm.tsx`: change action `<input>` to `<textarea rows={3}>`, keep `maxLength={30}`
- [x] 4.2 In `ShortcutCard.tsx` edit mode: change action `<input>` to `<textarea>`, keep `maxLength={30}`
