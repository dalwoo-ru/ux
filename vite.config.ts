import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dev: фронт на :5173, API (server.js) на :3000 — запросы /api проксируются.
export default defineConfig({
  plugins: [react()],
  server: { proxy: { '/api': 'http://localhost:3000' } },
});
