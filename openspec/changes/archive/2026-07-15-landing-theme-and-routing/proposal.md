## Why

Tres issues tras `add-seo-landing`:
1. `/cheatsheet/:id` ignora el parámetro y usa el cheatsheet activo del store, así que la URL no coincide con lo mostrado. El spec `client-routing` ya pide "deep link loads the correct cheatsheet" y hoy no se cumple.
2. La landing elige tema con `@media (prefers-color-scheme)` mientras el editor usa `localStorage["theme"]` → temas desincronizados; la landing se ve dark en unos navegadores y light en otros.
3. El default de tema debe seguir el navegador (SO); si no está definido, light.

## What Changes

- El `:id` de la URL pasa a ser **autoritativo**: carga ese cheatsheet (lo activa); si no existe en el store → **404**.
- La landing resuelve tema igual que el editor (`localStorage["theme"]` → SO → light), usa la clase `.dark` y suma un **botón toggle** que persiste en la misma key → sincronizado.
- `index.html` del editor también sigue `prefers-color-scheme` cuando no hay tema guardado.

## Capabilities

### New Capabilities
- `landing-theme`: la landing usa el mismo tema que el editor (misma key `localStorage`), con toggle y default SO/light.

### Modified Capabilities
- `client-routing`: el `:id` de la URL se vuelve autoritativo y un id inválido renderiza 404 (en vez del full-reload a landing definido en `editor-routing-fixes`).

## Impact

- `src/routes/CheatsheetRoute.tsx` (usa `:id` param, autoritativo, 404 si falta).
- `public/landing.html` (script de tema en `<head>`, `.dark` en vez de media query, botón toggle).
- `index.html` (editor: script de tema sigue SO cuando no hay guardado).
- Delta de spec en `openspec/specs/client-routing/spec.md` y nueva `openspec/specs/landing-theme/spec.md`.
- Sin backend, sin nuevas dependencias. Recomendado: archivar primero `editor-routing-fixes` para no solapar deltas de `client-routing`.
