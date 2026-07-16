## Context

La app es SPA React + Vite (React Router v8, zustand con `persist`). Tras `add-seo-landing`, `/` es la landing estática; tras `editor-routing-fixes`, las rutas `editor` y `cheatsheet/:id` existen y hay un 404 global (`*`).

Hoy `CheatsheetRoute` lee `activeId` del store e ignora el parámetro `:id` de la URL (`src/routes/CheatsheetRoute.tsx`): tipear `/cheatsheet/cualquier-cosa` "funciona" mostrando el cheatsheet activo, lo cual no tiene sentido. La landing (`public/landing.html`) define sus tokens dark vía `@media (prefers-color-scheme: dark)` y no lee `localStorage`; el editor (`index.html`) aplica tema con un script inline que lee `localStorage["theme"]` (default light, sin consultar SO). Por eso la landing varía según el navegador y desentona con el editor.

## Goals / Non-Goals

**Goals:**
- Hacer que `/cheatsheet/:id` cargue el cheatsheet correspondiente al id de la URL (autoritativo) y muestre 404 si no existe.
- Sincronizar el tema de la landing con el del editor vía la misma key `localStorage["theme"]`, con un toggle en la landing.
- Default de tema = preferencia del SO; si no está definida, light (en ambas páginas).

**Non-Goals:**
- No se cambia la lógica interna de edición ni el store más allá de lo necesario para el URL autoritativo.
- No se introduce backend ni dependencias.

## Decisions

**D1. URL autoritativa.** `CheatsheetRoute` usa `useParams()` → busca en `cheatsheets`; si existe, `switchTo(id)` y renderiza; si no, retorna `<NotFound />` (dentro del `Shell`). Alternativa descartada: validar pero mantener el activo (la URL seguiría sin sentido). Esto además cumple el requerimiento existente "Deep link loads the correct cheatsheet".

**D2. Tema landing vía `.dark`.** Script inline en `<head>` (antes del body, para evitar parpadeo) que resuelve tema y aplica `.dark` a `<html>` + color de fondo inicial, igual que `index.html`. El bloque `@media (prefers-color-scheme: dark)` se reemplaza por `.dark { ...tokens dark... }` (los tokens ya coinciden con `global.css`). Así el tema se controla por la clase, no por media query.

**D3. Toggle sincronizado.** Botón en el header de la landing que invierte el tema y persiste `localStorage["theme"]`; el editor lo lee al cargar → sincronizados. Misma key y mismos valores (`"dark"`/`"light"`) que `useAppStore.toggleDark`.

**D4. Default SO/light.** Resolución: `stored || (prefersDark ? "dark" : "light")`. Se aplica en landing y editor. El script de `index.html` se ajusta para consultar `prefers-color-scheme` cuando no hay tema guardado.

## Risks / Trade-offs

- [Risk] Cheatsheets legacy con id UUID largo dejan de coincidir con URLs cortas anteriores. → Mitigation: los ids son opacos; el contenido sigue accesible vía el sidebar/editor. No hay deep-links públicos (es local).
- [Risk] Parpadeo de tema si el script corre tarde. → Mitigation: script inline en `<head>` antes del body.
- [Trade-off] Hacer la URL autoritativa cambia el modelo mental "un solo cheatsheet activo"; ahora la URL es fuente de verdad. Es el comportamiento deseado según el usuario.

## Migration Plan

1. Editar `CheatsheetRoute.tsx` (D1), `landing.html` (D2/D3), `index.html` (D4).
2. `npm run build` + `npm run preview`: `/cheatsheet/<id válido>` carga ese cheatsheet; `/cheatsheet/<id inexistente>` → 404; toggle en landing cambia tema y se refleja al abrir el editor; default sigue el SO.
3. Archivar `editor-routing-fixes` antes de apply/archive para no solapar deltas de `client-routing`.

## Open Questions

- ¿Archivar `editor-routing-fixes` primero? (Recomendado para evitar conflictos de delta en `client-routing`.)
