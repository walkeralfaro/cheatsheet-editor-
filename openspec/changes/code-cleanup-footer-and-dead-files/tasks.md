## 1. Dead code

- [x] 1.1 Delete `src/routes/Home.tsx`.

## 2. Footer component

- [x] 2.1 Create `src/components/Footer.tsx` with the "made with ❤️ by Walker Alfaro" content and an optional `className` prop.
- [x] 2.2 Update `src/App.tsx` — replace inline footer with `<Footer className="lg:hidden print:hidden" />`.
- [x] 2.3 Update `src/components/EditorPanel.tsx` — replace inline footer with `<Footer className="hidden lg:flex lg:items-center lg:justify-center print:hidden" />`.
- [x] 2.4 Update `src/routes/Landing.tsx` — (NO change, landing footer is intentionally different text, kept as-is).

## 3. Import cleanup

- [x] 3.1 In `src/components/ShortcutCard.tsx`, change `import type React from "react"` to `import { type KeyboardEvent } from "react"` and update usages.

## 4. Verification

- [x] 4.1 `npm run build` passes.
