## 1. Landing page (static, SEO)

- [x] 1.1 Crear `public/landing.html` con estructura semántica (`header`/`main`/`footer`), `<html lang="es">`, contenedor max-width, hero con `<h1>` + subtítulo, secciones (local / sin login / privado / imprimible), FAQ y CTA `<a href="/editor">Abrir editor</a>`.
- [x] 1.2 Añadir CSS inline con los tokens de `src/styles/global.css` (light + `prefers-color-scheme: dark`) e incluir micro-interacciones (hover lift en CTA/cards, reveal en scroll vía `IntersectionObserver`).
- [x] 1.3 Incluir en `<head>` `title`, `meta description`, `meta keywords`, Open Graph (`og:title/description/type/url/image`), Twitter Card `summary_large_image`, `canonical` y `theme-color`.
- [x] 1.4 Incluir JSON-LD `SoftwareApplication` (name, description, applicationCategory, operatingSystem="Web", offers price 0, author).
- [x] 1.5 Agregar un preview del editor estilizado (card con header "Cheatsheet Editor" + tabla faux con keycaps usando `--color-key-bg`/`--color-key-text`) para integración visual.
- [x] 1.6 Referenciar `/og-image.png` en `og:image` y Twitter `image`.

## 2. SEO infra (robots / sitemap / redirect)

- [x] 2.1 Crear `public/robots.txt` con `User-agent: *`, `Allow: /` y `Sitemap: https://{SITE_URL}/sitemap.xml`.
- [x] 2.2 Crear `public/sitemap.xml` con un `<url>` para `/` (usar placeholder `{SITE_URL}`).
- [x] 2.3 Editar `public/_redirects`: añadir `/ /landing.html 200` como primera regla, mantener `/* /index.html 200`.
- [x] 2.4 Editar `index.html` (SPA) para añadir `<meta name="robots" content="noindex">` en `<head>`.
- [x] 2.5 Generar el asset `public/og-image.png` (1200×630) con nombre + tagline.

## 3. Editor entry routing

- [x] 3.1 Crear `src/routes/EditorEntry.tsx`: al montar, si `useAppStore.getState().activeId` existe → `<Navigate to={"/cheatsheet/" + activeId} />`, si no → `newCheatsheet()` y navega al id nuevo.
- [x] 3.2 En `src/App.tsx`: añadir `<Route path="editor" element={<EditorEntry />} />` dentro del `Shell`, y remover la ruta `index`/`Home` (queda muerta).

## 4. Verification

- [x] 4.1 Ejecutar `npm run build` y `npm run preview`; verificar que `/` sirve `landing.html` con meta/JSON-LD y que `/editor` carga el SPA (reanuda o crea cheatsheet).
- [x] 4.2 Confirmar que los tokens de la landing coinciden con `global.css` y que el preview del editor se ve integrado.
- [ ] 4.3 (Manual, fuera de código) Registrar la propiedad en Google Search Console, verificar dominio y enviar `sitemap.xml`.

## 5. Dev/preview parity (regresión)

- [x] 5.1 Añadir plugin `landingRoot` en `vite.config.ts` que reescribe `/` → `/landing.html` en `configureServer` y `configurePreviewServer`, para que `npm run dev`/`preview` muestren la landing en `/` (Vite no procesa `_redirects`).
- [x] 5.2 Verificar con `vite preview`: `GET /` devuelve la landing (title + hero) y `GET /editor` + `GET /cheatsheet/:id` devuelven el SPA (`<div id="root">`).
