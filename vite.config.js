import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Build optimizations
  build: {
    // Target modern browsers for smaller bundle
    target: 'es2020',

    // Enable minification
    minify: 'esbuild',

    // Generate source maps for debugging (disable in prod if needed)
    sourcemap: false,

    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for React
          'react-vendor': ['react', 'react-dom'],
          // Animation library
          'framer': ['framer-motion'],
        },
      },
    },

    // Compress assets
    assetsInlineLimit: 4096,

    // CSS code splitting
    cssCodeSplit: true,

    // Report compressed size
    reportCompressedSize: true,
  },

  // Preview server settings
  preview: {
    port: 4173,
    strictPort: true,
  },

  // Dev server settings
  server: {
    port: 5173,
    strictPort: false,
    open: false,
  },
})
