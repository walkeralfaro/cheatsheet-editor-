import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import type { Plugin } from "vite";
import type { NextHandleFunction } from "connect";

// In production (Netlify), `public/_redirects` serves `/` as the static
// landing page. Vite's dev and preview servers don't process `_redirects`,
// so we mirror that behavior here: rewrite the root to `/landing.html`.
function landingRoot(): Plugin {
  const rewrite: NextHandleFunction = (req, _res, next) => {
    if (req.url === "/") req.url = "/landing.html";
    next();
  };
  return {
    name: "landing-root",
    configureServer(server) {
      server.middlewares.use(rewrite);
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), landingRoot()],
});
