## 1. Fix `class` → `className`

- [x] 1.1 Replace `class` with `className` in all 9 React `.tsx` components

## 2. Add Input Validation

- [x] 2.1 Add `maxLength={50}` to keys inputs in AddShortcutForm and ShortcutCard
- [x] 2.2 Add `maxLength={200}` to action inputs in AddShortcutForm and ShortcutCard

## 3. Fix Text Overflow in Preview

- [x] 3.1 Add `break-words` class to shortcut card text elements in ShortcutCard.tsx

## 4. Fix Inline Editing Enter Behavior

- [x] 4.1 Update ShortcutCard keys input to move focus to action input on Enter (not save)
- [x] 4.2 Keep Enter-save only on the action input

## 5. Fix Mobile Scroll

- [x] 5.1 Remove `overflow-hidden` from main container; use independent scroll per panel on desktop
- [x] 5.2 Ensure preview panel scrolls on mobile without being clipped

## 6. Add Mobile Editor Toggle

- [x] 6.1 Add `editorVisible` state to App.tsx
- [x] 6.2 Add toggle button in Toolbar for mobile
- [x] 6.3 Conditionally show/hide editor panel based on state and screen size

## 7. Fix Print Pagination

- [x] 7.1 Remove `page-break-inside: avoid` from section rule in global.css
