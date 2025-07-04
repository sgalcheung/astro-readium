// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import react from "@astrojs/react";

import cloudflare from "@astrojs/cloudflare";
import svgr from "vite-plugin-svgr";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  vite: {
    // reference: https://github.com/withastro/astro/issues/12824
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      alias: import.meta.env.PROD
        ? {
            "react-dom/server": "react-dom/server.edge",
          }
        : undefined,
    },
    ssr: {
      noExternal: ["@edrlab/thorium-web"],
    },
    plugins: [
      svgr({
        include: "**/*.svg?react",
        svgrOptions: {
          plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
          svgoConfig: {
            plugins: [
              "preset-default",
              "removeTitle",
              "removeDesc",
              "removeDoctype",
              "cleanupIds",
            ],
          },
        },
      }),
    ],
  },
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Inter",
        cssVariable: "--font-inter",
        subsets: ["latin"],
      },
    ],
  },

  adapter: cloudflare(),
});
