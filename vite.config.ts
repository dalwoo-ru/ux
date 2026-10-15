import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Компоненты baseui поставляются скомпилированными и содержат собственные чанки React
 * (react-*.js, react-dom-*.js, jsx-runtime-*.js). Чтобы приложение и baseui работали на ОДНОЙ копии React
 * (иначе хуки ломаются), подменяем эти чанки на npm-React приложения.
 */
function baseuiSharedReact(): Plugin {
  const shims: Array<[RegExp, string]> = [
    [/\/react-[\w-]{8}\.js$/, 'import * as m from "react"; export const t = () => m;'],
    [/\/react-dom-[\w-]{8}\.js$/, 'import * as m from "react-dom"; export const t = () => m;'],
    [/\/jsx-runtime-[\w-]{8}\.js$/, 'import * as m from "react/jsx-runtime"; export const t = () => m;'],
  ];
  const PREFIX = '\0baseui-shim:';
  return {
    name: 'baseui-shared-react',
    enforce: 'pre',
    async resolveId(source, importer) {
      if (!importer || !importer.includes('/vendor/baseui/lib/')) return null;
      const i = shims.findIndex(([re]) => re.test(source));
      return i === -1 ? null : PREFIX + i;
    },
    load(id) {
      return id.startsWith(PREFIX) ? shims[Number(id.slice(PREFIX.length))][1] : null;
    },
  };
}

// Dev: фронт на :5173, API (server.js) на :3000 — запросы /api проксируются.
export default defineConfig({
  plugins: [baseuiSharedReact(), react()],
  server: { proxy: { '/api': 'http://localhost:3000' } },
});
