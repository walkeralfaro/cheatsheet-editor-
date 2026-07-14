## 1. Fix Mobile Editor Toggle

- [x] 1.1 Move Toolbar outside hidden/visible container in App.tsx
- [x] 1.2 Only toggle EditorPanel visibility, keep Toolbar always visible

## 2. Fix Print Pagination

- [x] 2.1 Remove `position: absolute` from `.print-area` in global.css
- [x] 2.2 Keep `overflow: visible` for natural page breaks

## 3. Fix Inline Editing (Action)

- [x] 3.1 Remove `onBlur={handleSave}` from keys input in ShortcutCard.tsx
- [x] 3.2 Keep onBlur only on the action input

## 4. Fix Character Limits

- [x] 4.1 Change maxLength to 15 on keys inputs (AddShortcutForm + ShortcutCard)
- [x] 4.2 Change maxLength to 30 on action inputs (AddShortcutForm + ShortcutCard)
