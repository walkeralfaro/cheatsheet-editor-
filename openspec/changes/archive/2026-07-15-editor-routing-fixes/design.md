## Context

La app es SPA React + Vite (React Router v8, zustand con `persist` key `cheatsheet-store`). Tras `add-seo-landing`, `/` es la landing estática servida por Netlify (`_redirects`), y en dev/preview un plugin de Vite reescribe `/` → `/landing.html`. El SPA solo conoce las rutas `editor` y `cheatsheet/:id`; ya no tiene ruta `index`/`home`.

Hoy `CheatsheetRoute` usa `<Navigate to="/" replace />` cuando no hay cheatsheet activo (`CheatsheetRoute.tsx:13-15`). Como esa navegación es client-side, el SPA queda en `/` sin ruta → en blanco. El id del cheatsheet se genera con `crypto.randomUUID()` (`reducer.ts:8`), dando URLs de 36 caracteres.

## Goals / Non-Goals

**Goals:**
- Al no haber cheatsheet (borrar todos), llevar al usuario a la **landing** real, no a una página en blanco.
- Mostrar un **404 personalizado** para rutas no coincidentes dentro del SPA.
- Acortar el **id de la URL** derivándolo del UUID, manteniéndolo único y URL-safe.

**Non-Goals:**
- No se cambia la lógica de carga del editor (el store sigue usando `activeId`; el parámetro `:id` de la URL es decorativo y no se usa para seleccionar cheatsheet).
- No se modifican los ids internos de `Section`/`Shortcut` (no van a la URL).
- No se introduce backend ni nuevas dependencias.

## Decisions

**D1. Full-reload a la landing en vez de `<Navigate>`.**
- Rationale: un `<Navigate to="/">` client-side se queda dentro del SPA, que no tiene ruta `/` → blank. Un `window.location.href = "/"` fuerza recarga completa y el servidor sirve `landing.html` (prod vía `_redirects`, dev vía el plugin `landingRoot`).
- Alternativa considerada: redirigir a `/editor` (recrea un cheatsheet). Descartada: el usuario pidió explícitamente ir a la landing.

**D2. 404 dentro del `Shell`.**
- Rationale: el `NotFound` se renderiza dentro de `<Shell>` para mantener header/footer y consistencia visual. Enlaza a `/editor` (navegación SPA) y a la landing vía `<a href="/">` (full reload, porque un link SPA a `/` daría blank).
- Alternativa considerada: 404 fuera del Shell (página aislada). Descartada: rompe la cohesión visual con el resto de la app.

**D3. Short id derivado del UUID.**
- `shortId()` = `crypto.randomUUID().replace(/-/g, "").slice(0, 12)` → 12 hex (48 bits), URL-safe, "relacionado al UUID". Solo se aplica al id del cheatsheet (`createEmptyCheatsheet`); sections/shortcuts mantienen UUID completo vía `uid()`.
- Unicidad: en `useAppStore.newCheatsheet` se regenera si la key ya existe en `cheatsheets`.
- Alternativas consideradas: (a) slug interno separado + mapa slug→id → más complejidad sin beneficio para un usuario local; (b) base62 del UUID completo (~22 chars) → no más corto que 12 hex. Descartadas.
- Riesgo de colisión de 12 hex es astronómicamente improbable (~2.8×10¹⁴ combinaciones); el retry la descarta de todos modos.

## Risks / Trade-offs

- [Risk] Un full-reload a `/` recarga la página (pérdida del estado de la sesión SPA en memoria). → Mitigation: es exactamente el comportamiento deseado (ir a la landing); el estado persiste en localStorage, no se pierde.
- [Risk] Colisión de `shortId` entre cheatsheets del mismo usuario. → Mitigation: retry en `newCheatsheet` hasta encontrar una key libre.
- [Trade-off] 12 hex reduce legibilidad frente al UUID completo, pero es suficiente para unicidad local y acorta la URL de 36 a 12 caracteres.

## Migration Plan

1. Editar `CheatsheetRoute.tsx` (D1), crear `NotFound.tsx` + rutarlo en `App.tsx` (D2), editar `reducer.ts` y `useAppStore.ts` (D3).
2. `npm run build` + `npm run preview` para verificar: borrar todos → landing; ruta desconocida → 404; crear cheatsheet → URL corta.
3. El delta de `client-routing` se aplica al archivar el change.

## Open Questions

- ¿Archivar primero `add-seo-landing` para evitar solapar deltas sobre `client-routing`? (Recomendado archivar `add-seo-landing` antes de aplicar/archive este change.)
