## Why

Tras separar la landing (`add-seo-landing`), quedaron tres fallas de routing/identidad en el editor SPA:
1. Borrar todos los cheatsheets redirige a `/`, pero el SPA ya no tiene ruta `/` → página en blanco en vez de la landing.
2. Las rutas desconocidas renderizan en blanco, sin un 404 personalizado.
3. El id en la URL es el UUID completo de 36 caracteres, innecesariamente largo.

## What Changes

- El fallback de cheatsheet inexistente navega con **full page reload** a `/` (la landing), no con un `<Navigate>` client-side.
- Se agrega una ruta catch-all `*` que renderiza un **404 personalizado** (estilizado, con links al editor y a la landing).
- El id del cheatsheet pasa a ser **corto**, derivado del UUID (no el UUID completo).

## Capabilities

### New Capabilities
<!-- ninguna -->

### Modified Capabilities
- `client-routing`: se remueve el requerimiento de "home route" (ya es landing estática), se ajusta el fallback a `/` (full reload), se acorta el `:id`, y se agrega el 404.

## Impact

- `src/routes/CheatsheetRoute.tsx` (full-reload a landing), `src/App.tsx` (catch-all 404), `src/routes/NotFound.tsx` (nuevo), `src/lib/reducer.ts` (short id), `src/store/useAppStore.ts` (unicidad del id).
- Delta de spec en `openspec/specs/client-routing/spec.md`.
- Sin backend, sin nuevas dependencias. El editor SPA no cambia su lógica interna más allá de lo descrito.
