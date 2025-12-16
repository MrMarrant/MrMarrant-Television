import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      build: {
        target: "es2022"
      },
      server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
          '/pastebin': {
            target: 'https://pastebin.com',
            changeOrigin: true,
            secure: true,
            rewrite: (path) => path.replace(/^\/pastebin/, '/raw')
          }
        },
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
