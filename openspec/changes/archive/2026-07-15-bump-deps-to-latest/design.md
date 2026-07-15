## Context

The app is a client-side React SPA (Vite + React Router v7 declarative + zustand + Tailwind v4). Dependencies are behind current majors. React Router v8 (released 2026-06) and Vite v8 (released 2026-03) are current. The app's usage pattern (declarative routing, no loaders/actions/middleware; minimal `vite.config.ts`) means upgrading is mostly version bumps with no API migrations.

Verified environment facts:
- Local Node: v24.16.0 (satisfies React Router v8's Node ≥ 22.22 requirement).
- No `react-router-dom` imports in `src/` (all from `react-router`) → RR v8's removal of `react-router-dom` does not affect us.
- No `netlify.toml`, `.nvmrc`, or `engines` → Netlify build may run an older Node image and fail RR v8's Node requirement unless pinned.

## Goals / Non-Goals

**Goals:**
- Update all dependencies to their current released majors/minors.
- Ensure the production build runs on a Node version compatible with React Router v8 (pin Node 22 on Netlify).
- Keep `tsc --noEmit && vite build` and the SPA behaving identically.

**Non-Goals:**
- No application code rewrites; no adoption of React Router data/framework mode, React Compiler, or Rolldown-specific config.
- No new features or behavioral changes.

## Decisions

### D1. React Router 7 → 8 (declarative API unchanged)
Upgrade to `^8.2.0`. In declarative mode the API (`BrowserRouter`, `Routes`, `Route`, `Navigate`, `useNavigate`, `useParams`, `Outlet`) is identical to v7, so `src/` needs no edits. The v8 breaking changes (removed `react-router-dom`, `meta`/`loaderData`, middleware, Cloudflare proxy) all belong to data/framework mode and are not used here.

### D2. Vite 6 → 8 + plugin-react 4 → 6
Upgrade `vite` to `^8.1.4` and `@vitejs/plugin-react` to `^6.0.3`. Vite 8 switches internals to Rolldown/Oxc but ships a compatibility layer that auto-converts `esbuild`/`rollupOptions` configs; the project's `vite.config.ts` (only `plugins`) needs no change. plugin-react v6 uses Oxc for React Refresh (Babel dropped) and is required by Vite 8.

### D3. React 19.2.7, zustand 5.0.14, Tailwind 4.3.2
Bump `react`/`react-dom` to `^19.2.7` to satisfy React Router v8's peer minimum (19.2.7+). zustand and Tailwind bumps are within their current majors (no API changes). The store already uses the v5 `create<T>()(...)` + `persist` + `createJSONStorage` pattern; Tailwind `global.css` already uses v4 `@import "tailwindcss"`, `@theme`, `@variant dark`.

### D4. Pin Node on Netlify
Add `netlify.toml` setting `NODE_VERSION = "22"` (or a `.nvmrc` with `22`) so the Netlify build image uses Node ≥ 22.22, required by React Router v8. This is the only deploy-related change and the main risk mitigations.

## Risks / Trade-offs

- [Risk] Netlify build fails with "Node version unsupported" → Mitigation: pin Node 22 via `netlify.toml`/`NODE_VERSION` (D4).
- [Risk] Vite 8 Rolldown/Oxc produces different bundle/optimization behavior → Mitigation: run `npm run build` and a local smoke test; Vite's compatibility layer handles the minimal config. Clear `node_modules`/`.vite` cache on first install.
- [Risk] plugin-react 6 + React 19 Fast Refresh regressions → Mitigation: manual dev smoke test (`npm run dev`).
- [Trade-off] Bumping majors now means a future React Router v9 (mid-2027) will be a smaller jump, but v8 itself is the current stable and receives security updates.

## Migration Plan

1. Edit `package.json`: bump versions (D1–D3) and add `engines.node >= 22.22` (optional but helpful).
2. Add `netlify.toml` (or `.nvmrc`) pinning Node 22 (D4).
3. `rm -rf node_modules package-lock.json` and `npm install` to get a clean Vite 8 tree.
4. `npm run build` (`tsc --noEmit && vite build`); confirm `dist/` SPA + `_redirects`.
5. Smoke test: `/`, deep link `/cheatsheet/:id`, dark mode, print, refresh no 404.
6. Deploy to Netlify; confirm build uses Node 22 and site works.
7. Rollback: revert the two files and `npm install`; no data/config migration involved.

## Open Questions

- None. All decisions confirmed; no capability or behavioral changes.
