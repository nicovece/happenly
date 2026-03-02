import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    VitePWA({
      manifest: {
        short_name: 'Happenly',
        name: 'Happenly: Discover Events',
        icons: [
          {
            src: 'favicon.ico',
            sizes: '48x48',
            type: 'image/x-icon',
            purpose: 'maskable',
          },
          {
            src: 'happenly-app-144.png',
            type: 'image/png',
            sizes: '144x144',
            purpose: 'any',
          },
          {
            src: 'happenly-app-192.png',
            type: 'image/png',
            sizes: '192x192',
            purpose: 'maskable',
          },
          {
            src: 'happenly-app-512.png',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'maskable',
          },
        ],
        screenshots: [
          {
            src: 'happenly-screenshot-wide.png',
            sizes: '1920x1080',
            type: 'image/png',
            form_factor: 'wide',
          },
          {
            src: 'happenly-screenshot-narrow.png',
            sizes: '1290x2796',
            type: 'image/png',
            form_factor: 'narrow',
          },
        ],
        start_url: '.',
        display: 'standalone',
        theme_color: '#807ce4',
        background_color: '#24232b',
        description:
          'Discover, track, and visualize events that matter. Happenly is your smart event companion.',
        lang: 'en',
      },
      srcDir: 'src', // Update if your service-worker.js is elsewhere
      filename: 'service-worker.js', // Ensure it's accessible in production
      registerType: 'autoUpdate',
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\/.*\.png$/, // Example pattern for caching png images
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 50,
              },
            },
          },
        ],
      },
    }),
  ],
});
