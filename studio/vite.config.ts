import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

/* Studio 构建产物直接输出到主站的 dist/studio，
   随 GitHub Pages 一并部署到 /homepage/studio/。
   环境变量读取项目根目录的 .env（与主站共用一份配置）。 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(here, '..'), '');
  const base = env.VITE_SANITY_STUDIO_BASE_PATH || '/homepage/studio/';

  return {
    root: here,
    envDir: path.resolve(here, '..'),
    base,
    build: {
      outDir: path.resolve(here, '../dist/studio'),
      emptyOutDir: true,
      chunkSizeWarningLimit: 4000,
      sourcemap: false,
    },
    plugins: [react()],
    server: { port: 3333, host: true },
  };
});
