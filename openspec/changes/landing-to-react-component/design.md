## Context

The app currently has two entry points:
- `/` → served via `_redirects`/`netlify.toml` → `landing.html` (static)
- Everything else → `index.html` (SPA)

This dual-entry approach required a vite plugin (`landingRoot`) for dev/preview and redirect rules for production. The redirect for `/` consistently fails on Netlify (and Vercel), so users see the SPA's NotFound at the root URL.

## Goals / Non-Goals

**Goals:**
- Single entry point: `index.html` handles every route.
- Landing is a React/Tailwind component at route `/`.
- SEO meta lives in `index.html` (static, available at first paint) + JSON-LD rendered by React.
- Land on any Vercel-like host with just a catch-all rewrite rule.

**Non-Goals:**
- No visual redesign — exact same layout as current `landing.html`.
- No backend, no SSR, no new dependencies.

## Decisions

- **Landing outside Shell**: The landing is a full-screen standalone page without the editor header/sidebar/footer. It sits at the top level of `<Routes>`, not inside `<Route element={<Shell />}>`.
- **SEO meta in index.html**: Title, description, canonical, OG, and Twitter meta tags are hardcoded in `index.html` (served before React hydrates). `noindex` is removed so Google can index the landing.
- **JSON-LD in Landing component**: Structured data is rendered by React (it's content, not metadata; Google reads it fine).
- **Theme toggle via zustand**: The Landing component reads `darkMode` + `toggleDark` from the store directly, same as the editor. The inline theme script in `index.html` stays (it sets the correct `.dark` class before React mounts).
- **`<Link to="/">` instead of `window.location.href`**: Since the landing is now inside the SPA, client-side navigation avoids a full page reload.

## Risks / Trade-offs

- [Risk] Removing `noindex` means `/editor` and `/cheatsheet/:id` are technically crawlable. → Mitigated: those routes have no meaningful content without localStorage, so Google gets an empty/dashboard page, which is harmless.
- [Risk] The landing.html's theme toggle script is gone; the React Landing component handles it. → Mitigated: the `index.html` script still sets the initial theme; after React hydrates, the store takes over seamlessly.
