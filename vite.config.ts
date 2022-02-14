import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import styleImport, { VantResolve } from 'vite-plugin-style-import';
import { viteMockServe } from "vite-plugin-mock"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()],
    }),
    viteMockServe({
      supportTs: false,
      watchFiles: true,
      mockPath: "mock"
    })
  ],
    server: {
    port: 9527,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:9527',
        rewrite: (path) => path.replace(/^\/api/, ''),
        changeOrigin: true,
      }
    }
  }
})
