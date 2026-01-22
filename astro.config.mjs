// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
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