## Why

La aplicación es hoy una SPA 100% client-side: los buscadores solo encuentran un `<title>` y un `#root` vacío, por lo que la herramienta no es discoverable en Google. El objetivo (Path A) es posicionar **la herramienta** como un creador de cheatsheets local, rápido y privado, sin introducir backend ni tocar el editor SPA (que se mantiene intacto y solo se enruta desde la landing). El Path B (cheatsheets públicas con backend) queda fuera de este change.

## What Changes

- Se añade una **landing page estática** servida en `/` (`public/landing.html`) con HTML real, meta SEO completos y JSON-LD, diseñada con estética pulida (estilo Emil Kowalski / "ui ux pro max") y visualmente integrada con el editor.
- La landing enruta hacia el editor SPA vía una nueva ruta `/editor`, que reanuda el último cheatsheet del usuario (o crea uno nuevo) y navega a `/cheatsheet/:id`. Las URLs del editor no cambian.
- Se añaden `public/robots.txt` y `public/sitemap.xml` para indexación.
- Se ajusta `public/_redirects` para servir la landing en `/` y el SPA en el resto.
- Se marca el shell del editor (`index.html`) con `meta robots noindex` para evitar indexar contenido duplicado/vacío.

## Capabilities

### New Capabilities
- `marketing-site`: Página pública estática en `/` con meta SEO (title, description, Open Graph, Twitter Card, canonical), JSON-LD `SoftwareApplication`, `robots.txt`, `sitemap.xml`, y un entry `/editor` que conecta la landing con el editor SPA sin modificar sus URLs.

### Modified Capabilities
<!-- Ninguna capacidad existente cambia a nivel de requisito. -->

## Impact

- **Nuevos archivos**: `public/landing.html`, `public/og-image.png` (asset), `public/robots.txt`, `public/sitemap.xml`, `src/routes/EditorEntry.tsx`.
- **Editados**: `public/_redirects` (nueva regla `/ /landing.html 200`), `index.html` (meta `noindex`), `src/App.tsx` (ruta `/editor`; se remueve la ruta `index`/`Home` que queda muerta).
- **Sin backend, sin SSR, sin nuevas dependencias de runtime.** El editor SPA no se modifica salvo el enrutado de entrada.
- **Deploy**: Netlify sirve los archivos estáticos de `dist/`; no requiere cambios en `netlify.toml`.
