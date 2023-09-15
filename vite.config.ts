import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import type { VitePWAOptions } from 'vite-plugin-pwa'
import { VitePWA as vitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

const pwaOptions: Partial<VitePWAOptions> = {
  mode: 'production',
  includeAssets: ['favicon.ico'],
  srcDir: 'src',
  filename: 'sw.ts',
  registerType: 'autoUpdate',
  strategies: 'injectManifest',
  injectManifest: {
    globPatterns: ['**/*.{js,css,html,ico,png,json,svg}'],
  },
  manifest: {
    name: 'Letterboxd',
    short_name: 'Letterboxd',
    description: 'A recreation of the NYT game Letterboxd',
    theme_color: '#FAA6A4',
    background_color: '#FAA6A4',
    display: 'standalone',
    icons: [
      { src: 'favicon-64.png', sizes: '64x64', type: 'image/png', purpose: 'any maskable' },
      { src: 'favicon-128.png', sizes: '128x128', type: 'image/png', purpose: 'any maskable' },
      { src: 'favicon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
      { src: 'favicon-256.png', sizes: '256x256', type: 'image/png', purpose: 'any maskable' },
    ],
  },
}

export default defineConfig({
  plugins: [react(), tsconfigPaths(), vitePWA(pwaOptions)],

  worker: {
    format: 'es',
    plugins: [],
  },

  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: '.vitest/setup',
    include: ['**/*.test.{ts,tsx}'],
  },
})
