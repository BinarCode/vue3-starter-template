import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
// @ts-ignore
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages({
      pagesDir: [
        {
          dir: "src/pages",
          baseRoute: ""
        },
        {
          dir: "src/modules/**/**/pages",
          baseRoute: ""
        }
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  optimizeDeps: {
    include: [
      'date-fns/locale/en-US',
    ]
  },
  build: {
    sourcemap: false,
  }
})
