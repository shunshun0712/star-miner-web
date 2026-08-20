import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';

function copyLocalReadme(): Plugin {
  return {
    name: 'copy-local-readme',
    closeBundle() {
      const src = resolve(process.cwd(), 'static/README-本地运行说明.md');
      const dest = resolve(process.cwd(), '../outputs/StarMinerWeb/README-本地运行说明.md');
      try {
        writeFileSync(dest, readFileSync(src));
      } catch (err) {
        console.warn('[copy-local-readme] 未复制运行说明：', err);
      }
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [copyLocalReadme()],
  build: {
    outDir: '../outputs/StarMinerWeb',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 5173,
  },
});
