## 1. URL autoritativa

- [x] 1.1 En `src/routes/CheatsheetRoute.tsx`, usar `useParams()` para leer `:id`, buscarlo en `cheatsheets`; si existe, `switchTo(id)` y renderizar; si no existe, retornar `<NotFound />` (reemplaza el full-reload a landing de `editor-routing-fixes`).

## 2. Tema landing sincronizado

- [x] 2.1 En `public/landing.html` `<head>`, agregar script inline que resuelva tema (`localStorage["theme"]` → `prefers-color-scheme` → light) y aplique la clase `.dark` a `<html>` + color de fondo inicial (sin parpadeo).
- [x] 2.2 Reemplazar el bloque `@media (prefers-color-scheme: dark) { :root { ... } }` por `.dark { ...tokens dark... }`.
- [x] 2.3 Agregar un botón toggle de tema en el header de la landing que persista `localStorage["theme"]` y togglee la clase `.dark` en `<html>`.

## 3. Default de tema en el editor

- [x] 3.1 En `index.html` (editor), ajustar el script inline para que siga `prefers-color-scheme` cuando no hay tema guardado en `localStorage`.

## 4. Verification

- [x] 4.1 `npm run build` + `npm run preview`: `/cheatsheet/<id válido>` carga ese cheatsheet; `/cheatsheet/<id inexistente>` → 404; el toggle en la landing cambia el tema y se refleja al abrir el editor; el default sigue la preferencia del SO.
