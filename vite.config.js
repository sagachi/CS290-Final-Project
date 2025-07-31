import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/exercises': 'http://localhost:3000', // Redirect to your backend API
    },
  },
});
