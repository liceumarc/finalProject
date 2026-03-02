import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
    viteCompression({ algorithm: 'brotliCompress' }) // Comprime con Brotli (.br) para máxima compresión
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
})
