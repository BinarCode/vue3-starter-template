import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
// @ts-ignore
import path from 'path'
import { extendRoute, pagesDir } from "./src/router/extendRoute";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages({
      extendRoute,
      pagesDir,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  build: {
    sourcemap: false,
  }
})
