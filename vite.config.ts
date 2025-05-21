import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import prerender from '@prerenderer/rollup-plugin'

import projects from "./src/items/projects/deploy";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    prerender({
      routes: [
        "/",
        "/projects",
        ...projects.map(id => `/projects/${id}`),
        "/404",
      ],
      renderer: "@prerenderer/renderer-puppeteer",
      rendererOptions: {
        maxConcurrentRoutes: 1,
        renderAfterTime: 100,
      },
      postProcess(route) {
        const url = process.env.VITE_BASE_URL || "localhost";
        route.html = route.html
          .replace(/http:/i, "https:")
          .replace(/(https:\/\/)?(localhost|127\.0\.0\.1):\d*/i, url)
        ;
      },
    }),
  ],
})
