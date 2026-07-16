## Context

La app es una SPA React + Vite (React Router v8 declarative, zustand con `persist` key `cheatsheet-store`, Tailwind v4), desplegada como sitio estático en Netlify. Todo el contenido vive en `localStorage` del usuario: no hay páginas públicas que los buscadores puedan indexar. Hoy `index.html` solo tiene `<title>` y el `#root` vacío; no existe `robots.txt`, `sitemap.xml`, ni meta/OG/JSON-LD.

El usuario quiere posicionar **la herramienta** (Path A): una landing que explique qué hace, que es local, que no hay login, que es privada. El editor SPA no se modifica; la landing solo enruta hacia él. El Path B (cheatsheets públicas con backend) es trabajo futuro y queda fuera de alcance.

## Goals / Non-Goals

**Goals:**
- Servir en `/` una landing HTML estática, totalmente crawlable sin JS, con meta SEO y JSON-LD.
- Integrar visualmente la landing con el editor (mismos tokens de color/fuentes, preview del editor) para una transición sin fricción.
- Conectar la landing con el editor vía `/editor` (reanuda el último cheatsheet o crea uno), sin cambiar las URLs de `/cheatsheet/:id`.
- Proveer `robots.txt` + `sitemap.xml` e impedir la indexación del shell del editor (`noindex`).

**Non-Goals:**
- No se introduce backend, base de datos ni login (eso es Path B).
- No se hace SSR/SSG del editor ni de las cheatsheets del usuario.
- No se modifica la lógica interna del editor SPA.
- No se cambian las URLs existentes de `/cheatsheet/:id` (evita romper enlaces y estado persistido).

## Decisions

**D1. Landing como HTML estático en `public/landing.html` (no SPA ni SSR).**
- Rationale: máxima crawlability y velocidad de indexación sin dependencia de JS; despliegue trivial en Netlify (archivo estático). Alternativas consideradas: (a) prerender del editor con React Router framework mode / Vike — demasiado refactor para Path A; (b) una sola SPA con meta dinámica — el HTML inicial sigue vacío y depende de JS.
- La landing lleva su propio CSS inline (tokens replicados de `src/styles/global.css`) y JS vanilla ligero (IntersectionObserver para reveal, hover transitions). No depende del bundle hasheado de Tailwind.

**D2. Separación de rutas vía `_redirects`.**
- `/ /landing.html 200` primero; `/* /index.html 200` después (Netlify usa primera coincidencia). `/editor` y `/cheatsheet/:id` caen en `/*` → SPA.
- Rationale: `/` se vuelve la landing pública; el editor conserva sus rutas. Alternativa considerada: mover el editor a `/app/*` — rompe URLs y es innecesario.

**D3. Entry `/editor` que reanuda estado.**
- Nuevo componente `EditorEntry` en `src/routes/EditorEntry.tsx`: al montar, si `useAppStore.getState().activeId` existe → `<Navigate to={"/cheatsheet/" + activeId} />`; si no → `newCheatsheet()` y navega al id nuevo.
- Se remueve la ruta `index`/`Home` (queda muerta porque `/` ahora es la landing estática).
- Rationale: respeta el cheatsheet en curso del usuario y da una entrada limpia desde el CTA.

**D4. `noindex` en el shell del editor (`index.html`).**
- Rationale: evita que el crawler indexe el `#root` vacío compitiendo con la landing.
- La landing NO lleva `noindex`; lleva `canonical` a la URL canónica.

**D5. Estética "Emil Kowalski / ui ux pro max" aplicada a mano.**
- El skill no está instalado en la sesión; se replica manualmente: tipografía editorial (Inter, tracking tight en headings), un solo acento (`--color-primary`), mucho whitespace, micro-interacciones sutiles (fade/translate-in, hover lift en CTA y cards), preview del editor como card estilizada. Soporte `prefers-color-scheme: dark` con los tokens dark de `global.css`.

**D6. Placeholder `{SITE_URL}` en `robots.txt`/`sitemap.xml`.**
- El dominio real se define al deploy. La landing referencia `/og-image.png` (ruta relativa) para no acoplarse al dominio.

## Risks / Trade-offs

- [Risk] La landing estática no comparte el CSS de Tailwind del build (bundle hasheado) → podría desalinearse visualmente si cambian los tokens. → Mitigation: copiar los tokens exactos de `global.css` y documentar que deben mantenerse en sincronía; agregar un checklist en tasks.
- [Risk] `noindex` en `index.html` podría bloquear la indexación si algún día se quiere indexar el editor. → Mitigation: es correcto para Path A; se revisa en Path B.
- [Risk] Sitemap con 1 URL da poca superficie de indexación. → Mitigation: esperado para Path A; crecerá en Path B con `/s/:id`.
- [Trade-off] HTML estático vs SPA con meta dinámica: perdemos la posibilidad de personalizar meta por ruta del editor, pero ganamos crawlability inmediata y simplicidad.

## Migration Plan

1. Build local (`npm run build`) y `npm run preview` para verificar que `/` sirve la landing y `/editor` carga el SPA.
2. Deploy en Netlify (sin cambios en `netlify.toml`).
3. Pasos manuales (fuera de código): crear Google Search Console, verificar dominio, enviar `sitemap.xml`. (Opcional: Bing Webmaster Tools.)
4. Rollback: revertir el commit; `_redirects` vuelve a `/* /index.html 200` y `/` deja de ser landing.

## Open Questions

- Idioma de la landing: se asume **español** (README y comunicación del usuario en español). Si se requiere bilingüe, es work adicional.
- Dominio real para `{SITE_URL}` se confirma en deploy.
