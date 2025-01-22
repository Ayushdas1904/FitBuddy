import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/nutritionix': {
        target: 'https://trackapi.nutritionix.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nutritionix/, ''),
      },
    },
  },
});
