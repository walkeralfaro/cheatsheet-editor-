## 1. Dependency Version Bumps

- [x] 1.1 In `package.json`, bump `react` and `react-dom` to `^19.2.7`
- [x] 1.2 Bump `react-router` to `^8.2.0`
- [x] 1.3 Bump `vite` to `^8.1.4`
- [x] 1.4 Bump `@vitejs/plugin-react` to `^6.0.3`
- [x] 1.5 Bump `zustand` to `^5.0.14`
- [x] 1.6 Bump `tailwindcss` and `@tailwindcss/vite` to `^4.3.2`
- [x] 1.7 Add `engines.node` (e.g. `>=22.22`) to `package.json` (optional but recommended)

## 2. Netlify Node Pin

- [x] 2.1 Create `netlify.toml` with `command = "npm run build"`, `publish = "dist"`, and `[build.environment] NODE_VERSION = "22"` (alternative: add `.nvmrc` with `22`)

## 3. Install & Build

- [x] 3.1 Remove `node_modules` and `package-lock.json`, then run `npm install` for a clean Vite 8 tree
- [x] 3.2 Run `npm run build` (`tsc --noEmit && vite build`) and confirm it succeeds
- [x] 3.3 Verify `dist/` contains `index.html`, hashed assets, `favicon.png`, and `_redirects`

## 4. Verification

- [x] 4.1 Local smoke test: `/` redirects to last active cheatsheet; deep link `/cheatsheet/:id` loads; refresh does not 404
- [x] 4.2 Verify dark mode (no flash) and Print PDF still work
- [x] 4.3 Run `npm run dev` to confirm React Fast Refresh (plugin-react 6 / Oxc) works without errors
- [x] 4.4 Deploy to Netlify and confirm the build uses Node 22 and the site behaves correctly
