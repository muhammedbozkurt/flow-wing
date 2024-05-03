// import { defineConfig } from "vite"
// import react from "@vitejs/plugin-react"

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()]
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';

export default ({ mode }) => {
  // Ortam değişkenlerini yükle
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    base: process.env.VITE_APP_BASE_URL || '/', // Varsayılan olarak '/'
    plugins: [react()],
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          format: 'esm', // Çıkış formatını ESM olarak belirtin
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'; // Dış bağımlılıkları ayrı bir chunk'a ayır
            }
          }
        }
      }
    }
  });
};
