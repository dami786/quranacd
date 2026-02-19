import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api': {
        target: 'https://quranacd-production.up.railway.app',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('error', (err, req, res) => {
            console.log('[proxy error]', req.url, err.message);
          });
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log('[proxy]', req.method, req.url, '-> Railway');
          });
        },
      },
      '/uploads': {
        target: 'https://quranacd-production.up.railway.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
