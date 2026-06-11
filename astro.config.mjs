// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync } from 'fs';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// Build set of blog slugs so we can exclude redirect pages from sitemap
const blogSlugs = new Set(
  readdirSync('./src/content/blog').map(f => f.replace(/\.md$/, ''))
);

// https://astro.build/config
export default defineConfig({
  site: 'https://kustomgarment.com',
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        const url = new URL(page);
        const slug = url.pathname.replace(/^\/|\/$/g, '');
        // Always include /blog/ URLs and other non-redirect pages
        if (url.pathname.startsWith('/blog/')) return true;
        // Exclude root-level URLs that are blog redirects (noindex)
        return !blogSlugs.has(slug);
      },
    }),
  ],
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