## 1. Redirect to landing on missing cheatsheet

- [x] 1.1 En `src/routes/CheatsheetRoute.tsx`, reemplazar el `<Navigate to="/" replace />` por una navegación full-page a `/` (landing) cuando no hay cheatsheet activo. Usar `window.location.href = "/"` (o `replace`) para forzar recarga del servidor.

## 2. Custom 404

- [x] 2.1 Crear `src/routes/NotFound.tsx` con una página 404 estilizada (mensaje + links a `/editor` vía SPA y a la landing vía `<a href="/">` full reload).
- [x] 2.2 En `src/App.tsx`, agregar `<Route path="*" element={<NotFound />} />` dentro del `Shell`.

## 3. Short URL id

- [x] 3.1 Añadir `shortId()` en `src/lib/reducer.ts` derivado de `crypto.randomUUID()` (p.ej. `crypto.randomUUID().replace(/-/g, "").slice(0, 12)`).
- [x] 3.2 Usar `shortId()` en `createEmptyCheatsheet()` para el id del cheatsheet (sections/shortcuts mantienen `uid()` con UUID completo).
- [x] 3.3 En `src/store/useAppStore.ts` (`newCheatsheet`), garantizar unicidad del id regenerando si la key ya existe en `cheatsheets`.

## 4. Verification

- [x] 4.1 `npm run build` + `npm run preview`: borrar todos los cheatsheets → muestra la landing (no blank); ruta desconocida (p.ej. `/foo`) → 404; crear cheatsheet → URL corta (`/cheatsheet/<12 hex>`).
