// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { modifiedTime, readingTime } from "./src/lib/utils/remarks.mjs";
// Avoid importing TS modules in config (can break on Vercel during SSR)
// Use environment variables with sane defaults instead
import keystatic from "@keystatic/astro";
import react from "@astrojs/react";
import pagefind from "astro-pagefind";

// Read directly from environment to avoid importing Vite in config during SSR on Vercel
const { RUN_KEYSTATIC, SITE_URL, SITE_BASE } = process.env;

const integrations = [mdx(), sitemap(), pagefind()];

if (RUN_KEYSTATIC === "true") {
  integrations.push(react());
  integrations.push(keystatic());
}

// https://astro.build/config
export default defineConfig({
  site: SITE_URL || "https://astro-news-six.vercel.app",
  base: SITE_BASE || "/",
  markdown: {
    remarkPlugins: [readingTime, modifiedTime],
  },
  image: {
    responsiveStyles: true,
    breakpoints: [640, 1024],
    // Optimize image delivery
    domains: ['files.fivemerr.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.fivemerr.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  integrations,
  vite: {
    // @ts-ignore - Tailwind v4's Vite plugin type differs from Astro's Vite type expectations
    plugins: [tailwindcss()],
  },
});
