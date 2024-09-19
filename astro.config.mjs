import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";
import vercel from '@astrojs/vercel/serverless';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), tailwind()],
  output: 'server',
  adapter: vercel(),
});
