import { defineConfig, UserConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        comingSoon: './coming-soon.html',
        // Dodaj kolejne pliki według potrzeb
      }
    }
  }
}) satisfies UserConfig;