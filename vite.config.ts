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
    globPatterns: ['**/*.{js,css,html,ico,json,svg}'],
  },
  manifest: {
    name: 'Letterboxd',
    short_name: 'Letterboxd',
    description: 'A recreation of the NYT game Letterboxd',
    theme_color: '#000000',
    background_color: '#FAA6A4',
    display: 'standalone',
    icons: [
      {
        src: 'logo.svg',
        sizes: '48x48 72x72 96x96 128x128 256x256 512x512',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  },
  devOptions: {
    enabled: false,
    type: 'module',
    navigateFallback: 'index.html',
  },
}

export default defineConfig({
  plugins: [react(), tsconfigPaths(), vitePWA(pwaOptions)],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: '.vitest/setup',
    include: ['**/*.test.{ts,tsx}'],
  },
})
