## 1. Cleanup

- [x] 1.1 Delete `public/landing.html` and remove the `landingRoot()` plugin from `vite.config.ts`.
- [x] 1.2 Simplify `public/_redirects` to only `/* /index.html 200`.
- [x] 1.3 Simplify `netlify.toml` to only the SPA catch-all redirect.

## 2. SEO meta in index.html

- [x] 2.1 Remove `noindex` from `index.html`. Add landing SEO meta tags: title, description, canonical, OG, Twitter.

## 3. Landing component

- [x] 3.1 Create `src/routes/Landing.tsx` — port the exact visual content from `landing.html` (hero, features, CTA, footer, JSON-LD) to React + Tailwind. Use `darkMode`/`toggleDark` from the zustand store for the theme toggle.

## 4. Routing

- [x] 4.1 In `src/App.tsx`, add `<Route index element={<Landing />} />` outside `<Route element={<Shell />}>`.
- [x] 4.2 Change the Shell header button from `window.location.href` to `<Link to="/">`.
- [x] 4.3 In `src/routes/NotFound.tsx`, change `<a href="/">` to `<Link to="/">`.

## 5. Verification

- [x] 5.1 `npm run build` passes (tsc + vite).
- [x] 5.2 `npm run dev` — `/` shows the Landing component, `/editor` and `/cheatsheet/xxx` still work.
- [x] 5.3 `openspec validate --specs` passes.
