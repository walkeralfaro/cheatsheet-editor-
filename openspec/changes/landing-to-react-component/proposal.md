## Why

The static landing page (`public/landing.html`) requires a complex redirect setup (`_redirects` + `netlify.toml` + `landingRoot` vite plugin) that has proven unreliable — it returns 404 on both Netlify and Vercel. Moving the landing into the SPA as a React component eliminates the redirect layer entirely: the catch-all `/* → /index.html` is the only rule needed, and `/` becomes a standard React Router route.

## What Changes

- Delete `public/landing.html` (static landing) and the `landingRoot` vite plugin.
- Create `src/routes/Landing.tsx` — React component with Tailwind, porting the exact same visual content, SEO meta, JSON-LD, and theme toggle.
- Add `Route index element={<Landing />}` to `App.tsx` outside `Shell` so the landing renders standalone.
- Remove `noindex` from `index.html` and add landing SEO meta tags (title, description, OG, Twitter, canonical).
- Simplify `_redirects` to only `/* /index.html 200`.
- Simplify `netlify.toml` to only `/* → /index.html`.
- Switch Shell header link from `window.location.href` to `<Link to="/">`.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `client-routing`: root `/` renders <Landing /> component instead of being served as a static file via redirect.

## Impact

- `public/landing.html` — deleted
- `public/index.html` — remove `noindex`, add landing SEO meta
- `netlify.toml` — simplify to only SPA catch-all redirect
- `public/_redirects` — simplify to only `/* /index.html 200`
- `vite.config.ts` — remove `landingRoot` plugin
- `src/App.tsx` — add Route index + move Landing outside Shell; change header to `<Link to="/">`
- `src/routes/Landing.tsx` — new file, full landing component
- `src/routes/NotFound.tsx` — change `<a href="/">` to `<Link to="/">`
