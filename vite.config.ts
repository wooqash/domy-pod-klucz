import { defineConfig } from 'vite';
// import { readdirSync } from 'fs';
// import { resolve } from 'path';
// import path from "path";
import type { UserConfig } from 'vite'

// const htmlFiles = {};
// readdirSync('./src/pages').forEach(file => {
//   if (file.endsWith('.html')) {
//     const name = file.replace('.html', '');
//     htmlFiles[name] = resolve(__dirname, 'src/pages', file);
//   }
// });

// export default defineConfig({
//   base: "./",
//   root: './src/pages/',
//   build: {
//     outDir: '../../dist',
//     rollupOptions: {
//       // input: getHtmlInputs('src/pages')
//       input: htmlFiles
//     }
//   },
//   // server: {
//   //   // Wymuś serwowanie plików HTML z src/pages
//   //   middlewareMode: true,
//   // },
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "src"),
//       "@@": path.resolve(__dirname),
//     },
//   },
// }) satisfies UserConfig;

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        comingSoon: './coming-soon.html',
        work: './work.html',
        // Dodaj kolejne pliki według potrzeb
      }
    }
  }
}) satisfies UserConfig;