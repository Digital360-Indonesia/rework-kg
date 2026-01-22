// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://kustomgarment.com',
  integrations: [react(), sitemap()],
  image: {
    domains: ['kustomgarment.com'],
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: 'lightningcss'
    }
  }
});