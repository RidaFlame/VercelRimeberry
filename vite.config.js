import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Configured for Vercel deployment
// HashRouter uses # for routing (works regardless of base path - no server config needed)
export default defineConfig({
  plugins: [react()],
  base: '/', // Vercel serves from root
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    copyPublicDir: true,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
})

